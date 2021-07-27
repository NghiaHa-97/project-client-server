import {AfterViewInit, Component, OnInit} from "@angular/core";
import {HomService} from "./hom.service";
import {SanPhamDTO} from "../model/SanPhamDTO.model";
import {ShoppingCart} from "../model/ShoppingCart.model";
import {ToastrService} from "ngx-toastr";

@Component({
    selector:'app-home',
    templateUrl:'home.component.html',
    styleUrls:['home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit{
    // simpleSlider = 40;
    // doubleSlider = [20, 60];
    //
    // regularItems = ['Pizza', 'Pasta', 'Parmesan'];
    // touch: boolean;
    //
    // selectedValue: string;
    shoppingCarts:ShoppingCart[]=[];
    currentCity: string[];

    cities = [
        {value: 'paris-0', viewValue: 'Paris'},
        {value: 'miami-1', viewValue: 'Miami'},
        {value: 'bucharest-2', viewValue: 'Bucharest'},
        {value: 'new-york-3', viewValue: 'New York'},
        {value: 'london-4', viewValue: 'London'},
        {value: 'barcelona-5', viewValue: 'Barcelona'},
        {value: 'moscow-6', viewValue: 'Moscow'},
    ];
    totalItems:number= 50;
    itemsPerPage: number=10;
    page: number=1;
    sanPhamDTOs:SanPhamDTO[]=[];
    search:string;
    events1=[];


    constructor(private homeService:HomService,
                private toastrService:ToastrService) {}

    ngOnInit(): void {
        // this.getPageSanPham(this.search);
        this.events1 = [
            {status: 'Ordered', date: '15/10/2020 10:30', color: '#9C27B0', image: 'game-controller.jpg'},
            {status: 'Processing', date: '15/10/2020 14:00', color: '#673AB7'},
            {status: 'Shipped', date: '15/10/2020 16:15', color: '#FF9800'},
            {status: 'Delivered', date: '16/10/2020 10:00', color: '#607D8B'}
        ];
    }

    ngAfterViewInit() {

    }

    getPageSanPham(search?:string){
        this.homeService.getPageSanPham({
            page:this.page-1,
            size:this.itemsPerPage,
            sort:[['idsp','asc'],['tensanpham','asc']],
            search:search?search:''
        }).subscribe(resp=>{
            this.totalItems=parseInt(resp.headers.get('X-Total-Count'), 10);
            this.sanPhamDTOs=resp.body;
            console.log(this.sanPhamDTOs);

        })
    }

    selectedItemPerPage() {
        this.getPageSanPham(this.search);
    }

    loadPage(page: any) {
        this.getPageSanPham(this.search);
    }

    addShoppingCart(idSp: number) {
        // const item=new ShoppingCart(idSp,1);


        if(sessionStorage.getItem('gio-hang')){
            this.shoppingCarts=JSON.parse(sessionStorage.getItem('gio-hang'));
            console.log(this.shoppingCarts);
            let isExist=false;
            this.shoppingCarts.forEach(x=>{
                if(x.idSp===idSp){
                    x.soLuong+=1;
                    isExist=true;
                }
            });

            if(!isExist){
                const item=new ShoppingCart(idSp,1);
                this.shoppingCarts.push(item);
            }
            sessionStorage.setItem('gio-hang',JSON.stringify(this.shoppingCarts));
            this.toastrService.success("Thêm vào giỏ hàng thành công")

        }else{
            const item=new ShoppingCart(idSp,1);
            this.shoppingCarts.push(item);
            sessionStorage.setItem('gio-hang',JSON.stringify(this.shoppingCarts));
            console.log(sessionStorage.getItem('gio-hang'));
            this.toastrService.success("Thêm vào giỏ hàng thành công");
        }
    }

}
