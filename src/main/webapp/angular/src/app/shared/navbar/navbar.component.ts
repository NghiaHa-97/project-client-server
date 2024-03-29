import {Component, OnInit, Renderer2, ViewChild, ElementRef, Directive, OnDestroy} from '@angular/core';
import { ROUTES } from '../.././sidebar/sidebar.component';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {NgForm} from "@angular/forms";
import {WebSocketService} from "./web-socket.service";
import {LoginService} from "../../pages/login/login.service";
import {MenuItem} from 'primeng/api';
import {NzModalService} from "ng-zorro-antd/modal";
import {DangKyKhamComponent} from "../dang-ky-kham/dang-ky-kham.component";
import {IKhoa} from "../../model/httt-yte/Khoa.model";
import {DangKyKhamService} from "../dang-ky-kham/dang-ky-kham.service";

const misc: any = {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
};

declare var $: any;
@Component({
    selector: 'app-navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavbarComponent implements OnInit,OnDestroy {
    items: MenuItem[];
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private nativeElement: Node;
    private toggleButton: any;
    private sidebarVisible: boolean;
    private _router: Subscription;

    public isLogin:boolean=sessionStorage.getItem('auth') !== null;
    public name:string;

    @ViewChild('app-navbar-cmp') button: any;
    khoas:IKhoa[];

    constructor(location: Location,
                private renderer: Renderer2,
                private element: ElementRef,
                private router: Router,
                private webSocketService:WebSocketService,
                private loginService:LoginService,
                private modalService: NzModalService,
                private dangKyKhamService:DangKyKhamService) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }
    minimizeSidebar(){
      const body = document.getElementsByTagName('body')[0];

      if (misc.sidebar_mini_active === true) {
          body.classList.remove('sidebar-mini');
          misc.sidebar_mini_active = false;

      } else {
          setTimeout(function() {
              body.classList.add('sidebar-mini');

              misc.sidebar_mini_active = true;
          }, 300);
      }

      // we simulate the window Resize so the charts will get updated in realtime.
      const simulateWindowResize = setInterval(function() {
          window.dispatchEvent(new Event('resize'));
      }, 180);

      // we stop the simulation of Window Resize after the animations are completed
      setTimeout(function() {
          clearInterval(simulateWindowResize);
      }, 1000);
    }
    hideSidebar(){
      const body = document.getElementsByTagName('body')[0];
      const sidebar = document.getElementsByClassName('sidebar')[0];

      if (misc.hide_sidebar_active === true) {
          setTimeout(function() {
              body.classList.remove('hide-sidebar');
              misc.hide_sidebar_active = false;
          }, 300);
          setTimeout(function () {
              sidebar.classList.remove('animation');
          }, 600);
          sidebar.classList.add('animation');

      } else {
          setTimeout(function() {
            body.classList.add('hide-sidebar');
              // $('.sidebar').addClass('animation');
              misc.hide_sidebar_active = true;
          }, 300);
      }

      // we simulate the window Resize so the charts will get updated in realtime.
      const simulateWindowResize = setInterval(function() {
          window.dispatchEvent(new Event('resize'));
      }, 180);

      // we stop the simulation of Window Resize after the animations are completed
      setTimeout(function() {
          clearInterval(simulateWindowResize);
      }, 1000);
    }

    ngOnInit() {
        this.items = [
            {
                label:'Trang chủ',
                icon:' pi pi-fw pi-home',
                styleClass:'font-menubar-ul',
                routerLink:['/home']
            },
            // {
            //     label:'Tìm bác sỹ',
            //     styleClass:'font-menubar-ul',
            //     icon:' pi pi-fw pi-search-plus',
            //     routerLink:['/thong-tin-bac-si/danh-sach']
            //
            // },
            // {
            //     label:'Chuyên khoa',
            //     styleClass:'font-menubar-ul',
            //     icon:'pi pi-fw pi-user',
            //     items:[
            //         // {
            //         //     label:'New',
            //         //     icon:'pi pi-fw pi-bars',
            //         //     styleClass:'font-menubar',
            //         //
            //         // },
            //         // {
            //         //     label:'Delete',
            //         //     icon:'pi pi-fw pi-bars',
            //         //     styleClass:'font-menubar',
            //         //
            //         // },
            //         // {
            //         //     label:'Search',
            //         //     icon:'pi pi-fw pi-bars',
            //         //     styleClass:'font-menubar',
            //         //     // items:[
            //         //     //     {
            //         //     //         label:'Filter',
            //         //     //         icon:'pi pi-fw pi-filter',
            //         //     //         items:[
            //         //     //             {
            //         //     //                 label:'Print',
            //         //     //                 icon:'pi pi-fw pi-print'
            //         //     //
            //         //     //             }
            //         //     //         ]
            //         //     //     },
            //         //     //     {
            //         //     //         icon:'pi pi-fw pi-bars',
            //         //     //         label:'List'
            //         //     //     }
            //         //     // ]
            //         // }
            //     ]
            // },
            // {
            //     label:'Sự kiện',
            //     styleClass:'font-menubar-ul',
            //     icon:'pi pi-fw pi-calendar',
            //     // items:[
            //     //     {
            //     //         label:'Edit',
            //     //         icon:'pi pi-fw pi-pencil',
            //     //         styleClass:'font-menubar',
            //     //         items:[
            //     //             {
            //     //                 label:'Save',
            //     //                 icon:'pi pi-fw pi-calendar-plus'
            //     //             },
            //     //             {
            //     //                 label:'Delete',
            //     //                 icon:'pi pi-fw pi-calendar-minus'
            //     //             },
            //     //
            //     //         ]
            //     //     },
            //     //     {
            //     //         label:'Archieve',
            //     //         icon:'pi pi-fw pi-calendar-times',
            //     //         items:[
            //     //             {
            //     //                 label:'Remove',
            //     //                 icon:'pi pi-fw pi-calendar-minus'
            //     //             }
            //     //         ]
            //     //     }
            //     // ]
            // },
            // {
            //     label:'',
            //     command:(event)=>{
            //         console.log(event);
            //         this.showModal2();
            //     },
            //     styleClass:'font-menubar-ul',
            //     icon:'pi pi-fw pi-pencil'
            // }
        ];
        this.dangKyKhamService.getAllKhoa().subscribe((resp)=>{
            this.khoas=resp.body;
            this.khoas.forEach(item=>{

                this.items[2].items.push({
                    label:item.tenKhoa,
                    icon:'pi pi-fw pi-bars',
                    styleClass:'font-menubar',
                    routerLink:`/gioi-thieu/${item.gioiThieu}`
                })
            })

        });

        if(this.isLogin){
            this.name=JSON.parse(sessionStorage.getItem('auth')).username;
            this.webSocketService.openWebSocket(this.name);
        }
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        if (body.classList.contains('sidebar-mini')) {
            misc.sidebar_mini_active = true;
        }
        if (body.classList.contains('hide-sidebar')) {
            misc.hide_sidebar_active = true;
        }
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
          this.sidebarClose();

          const $layer = document.getElementsByClassName('close-layer')[0];
          if ($layer) {
            $layer.remove();
          }
        });



    }

    showModal2(): void {
        this.modalService.create({
            nzContent: DangKyKhamComponent,
            nzWidth:900
        });
    }

    onResize(event) {
      if ($(window).width() > 991) {
        return false;
      }
      return true;
    }
    sidebarOpen() {
      var $toggle = document.getElementsByClassName('navbar-toggler')[0];
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');
        setTimeout(function() {
            $toggle.classList.add('toggled');
        }, 430);

        var $layer = document.createElement('div');
        $layer.setAttribute('class', 'close-layer');


        if (body.querySelectorAll('.main-panel')) {
            document.getElementsByClassName('main-panel')[0].appendChild($layer);
        }else if (body.classList.contains('off-canvas-sidebar')) {
            document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
        }

        setTimeout(function() {
            $layer.classList.add('visible');
        }, 100);

        $layer.onclick = function() { //asign a function
          body.classList.remove('nav-open');
          this.mobile_menu_visible = 0;
          this.sidebarVisible = false;

          $layer.classList.remove('visible');
          setTimeout(function() {
              $layer.remove();
              if($toggle)
                $toggle.classList.remove('toggled');
          }, 400);
        }.bind(this);

        body.classList.add('nav-open');
        this.mobile_menu_visible = 1;
        this.sidebarVisible = true;
    };
    sidebarClose() {
      var $toggle = document.getElementsByClassName('navbar-toggler')[0];
        const body = document.getElementsByTagName('body')[0];
        if(this.toggleButton){
            this.toggleButton.classList.remove('toggled');
        }
        var $layer = document.createElement('div');
        $layer.setAttribute('class', 'close-layer');

        this.sidebarVisible = false;
        body.classList.remove('nav-open');
        // $('html').removeClass('nav-open');
        body.classList.remove('nav-open');
        if ($layer) {
            $layer.remove();
        }

        setTimeout(function() {
            if($toggle)
                $toggle.classList.remove('toggled');
        }, 400);

        this.mobile_menu_visible = 0;
    };
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    getTitle() {
        let titlee: any = this.location.prepareExternalUrl(this.location.path());
        for (let i = 0; i < this.listTitles.length; i++) {
            if (this.listTitles[i].type === "link" && this.listTitles[i].path === titlee) {
                return this.listTitles[i].title;
            } else if (this.listTitles[i].type === "sub") {
                for (let j = 0; j < this.listTitles[i].children.length; j++) {
                    let subtitle = this.listTitles[i].path + '/' + this.listTitles[i].children[j].path;
                    if (subtitle === titlee) {
                        return this.listTitles[i].children[j].title;
                    }
                }
            }
        }
        return 'Dashboard';
    }
    getPath() {
        return this.location.prepareExternalUrl(this.location.path());
    }



    sendMessage(form: NgForm) {
        // console.log(form.value.search);
        // const mess: Message=new Message('nghia',form.value.search);
        // this.webSocketService.sendMessage(mess);
        // form.reset();
        console.log(sessionStorage.getItem('auth') !== null);
    }




    ngOnDestroy(): void {
        // this.webSocketService.closeWebSocket();
    }

    logout() {
        this.loginService.logout(this.isLogin,this.name);
        location.reload();
    }

    goToShopCart() {
        this.router.navigate(['gio-hang']);
    }

    goHome() {
        this.router.navigate(['home']);
    }
}
