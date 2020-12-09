import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import {AuthenticationRequest} from "../../model/AuthenticationRequest";
import {LoginService} from "./login.service";
import {ToastrService} from "ngx-toastr";
import {AuthenticationResponse} from "../../model/AuthenticationResponse";
import {Router} from "@angular/router";
import {WebSocketService} from "../../shared/navbar/web-socket.service";

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    private authenticationRequest:AuthenticationRequest

    constructor(private element: ElementRef,
                private loginService:LoginService,
                private toars:ToastrService,
                private router:Router,
                private webSocket:WebSocketService
    ) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
        this.authenticationRequest=new AuthenticationRequest();
        this.authenticationRequest.username="";
        this.authenticationRequest.password="";
    }

    ngOnInit() {

        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
    }
    sidebarToggle() {
        // var toggleButton = this.toggleButton;
        // var body = document.getElementsByTagName('body')[0];
        // var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        // if (this.sidebarVisible == false) {
        //     setTimeout(function() {
        //         toggleButton.classList.add('toggled');
        //     }, 500);
        //     body.classList.add('nav-open');
        //     this.sidebarVisible = true;
        // } else {
        //     this.toggleButton.classList.remove('toggled');
        //     this.sidebarVisible = false;
        //     body.classList.remove('nav-open');
        // }
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
    }

    login() {
        this.loginService.login(this.authenticationRequest).subscribe(reponse=>{
            reponse.username=this.authenticationRequest.username;
            this.loginService.setUserSubject(reponse);

            this.loginService.getUserSubject().subscribe(x=>{
                sessionStorage.setItem("auth",JSON.stringify(x));
                // console.log( JSON.parse(localStorage.getItem("auth")).username);
                this.webSocket.openWebSocket(x.username);
                console.log(this.webSocket.webSocket.readyState);
                this.router.navigate(["/home"]);

            });
        },error =>{
            console.log(error);
            this.toars.error("Đăng nhập không thành công")
        } )
    }


}
