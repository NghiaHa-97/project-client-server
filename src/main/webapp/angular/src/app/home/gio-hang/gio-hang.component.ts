import {Component, OnInit} from "@angular/core";
import {HomService} from "../hom.service";
import {ShoppingCart} from "../../model/ShoppingCart.model";
import {SanPhamDTO} from "../../model/SanPhamDTO.model";
import {ToastrService} from "ngx-toastr";
import {WebSocketService} from "../../shared/navbar/web-socket.service";

 interface  TableData {
    headerRow: string[];
     dataRows:string[][];
}
@Component({
    selector:'app-gio-hang',
    templateUrl:'gio-hang.component.html',
    styleUrls:['gio-hang.component.css']
})
export class GioHangComponent implements OnInit{

    public tableData3: TableData;
    shoppingCarts:ShoppingCart[]=[];
    sanPhamDTO:SanPhamDTO[]=[];
    message: string='Bạn đồng ý mua hàng ? ';
    showAlert: boolean=false;
    constructor(private homeService:HomService,
                private toastr:ToastrService,private websocket:WebSocketService) {
    }


    ngOnInit(): void {
        if(sessionStorage.getItem("gio-hang")){
            this.shoppingCarts=JSON.parse(sessionStorage.getItem('gio-hang'));
            if(this.shoppingCarts.length>0){
                this.homeService.getDataGioHang(this.shoppingCarts).subscribe(response=>{
                    console.log(response.body);
                    this.sanPhamDTO=response.body;
                    this.sanPhamDTO.forEach(x=>{
                        x.soLuong=this.shoppingCarts.find(i=>x.idSp===i.idSp).soLuong;
                        x.tongTien=x.soLuong*(x.gia?x.gia:0);
                    })
                    this.getTotal();
                })
            }

        }


        this.tableData3 = {
            headerRow: [ '', 'Tên Sản phẩm', 'Nhà sản xuất', 'Ngày sản xuát', 'Giá bán', 'Số lượng', 'Tổng tiền'],
            dataRows: [
                // ['product1', '#jacket', 'Spring Jacket', 'by Dolce&Gabbana', 'Red', 'M', '549', '1', '549'],
                // ['product2', '#pants',  'Short Pants', 'by Pucci', 'Purple', 'M', '499', '2', '998'],
                // ['product3', '#nothing', 'Pencil Skirt', 'by Valentino', 'White', 'XL', '799', '1', '799'],
                // ['product2', '#pants',  'Short Pants', 'by Pucci', 'Purple', 'M', '499', '2', '998'],
                // ['product3', '#nothing', 'Pencil Skirt', 'by Valentino', 'White', 'XL', '799', '1', '799'],
                // ['product2', '#pants',  'Short Pants', 'by Pucci', 'Purple', 'M', '499', '2', '998'],
                // ['product3', '#nothing', 'Pencil Skirt', 'by Valentino', 'White', 'XL', '799', '1', '799'],
                // ['product2', '#pants',  'Short Pants', 'by Pucci', 'Purple', 'M', '499', '2', '998'],
                // ['product3', '#nothing', 'Pencil Skirt', 'by Valentino', 'White', 'XL', '799', '1', '799'],
                // ['product2', '#pants',  'Short Pants', 'by Pucci', 'Purple', 'M', '499', '2', '998'],
                // ['product3', '#nothing', 'Pencil Skirt', 'by Valentino', 'White', 'XL', '799', '1', '799'],
                // ['product2', '#pants',  'Short Pants', 'by Pucci', 'Purple', 'M', '499', '2', '998'],
                // ['product3', '#nothing', 'Pencil Skirt', 'by Valentino', 'White', 'XL', '799', '1', '799'],
                // ['product2', '#pants',  'Short Pants', 'by Pucci', 'Purple', 'M', '499', '2', '998'],
                // ['product3', '#nothing', 'Pencil Skirt', 'by Valentino', 'White', 'XL', '799', '1', '799']
            ]
        };
    }

    getTotal() {
        let total = 0;
        for (let i = 0; i < this.sanPhamDTO.length; i++) {
            total += this.sanPhamDTO[i].tongTien;
        }
        return total;
    };


    giamSoLuong(idSp: number) {
        let item=this.sanPhamDTO.find(x=>x.idSp===idSp);
        let  itemShopping=this.shoppingCarts.find(x=>x.idSp===idSp);
        if(item.soLuong){
            --item.soLuong;
            item.tongTien=item.soLuong*(item.gia?item.gia:0);
            --itemShopping.soLuong;

            sessionStorage.setItem('gio-hang',JSON.stringify(this.shoppingCarts));
            this.getTotal();
        }
    }

    tangSoLuong(idSp: number) {
        let item=this.sanPhamDTO.find(x=>x.idSp===idSp);
        let  itemShopping=this.shoppingCarts.find(x=>x.idSp===idSp);

        ++item.soLuong;
        item.tongTien=item.soLuong*(item.gia?item.gia:0);
        ++itemShopping.soLuong;
        sessionStorage.setItem('gio-hang',JSON.stringify(this.shoppingCarts));

        this.getTotal();

    }

    removeItem(idSp: number) {


        let item=this.sanPhamDTO.indexOf(this.sanPhamDTO.find(x=>x.idSp===idSp));
        let item1=this.shoppingCarts.indexOf(this.shoppingCarts.find(x=>x.idSp===idSp));
        this.sanPhamDTO.splice(item,1);
        this.shoppingCarts.splice(item1,1);
        sessionStorage.setItem('gio-hang',JSON.stringify(this.shoppingCarts));
        this.getTotal();

    }


    pay() {
        console.log(sessionStorage.getItem('auth'));
        if(!sessionStorage.getItem('auth')){
            this.message="Bạn chưa đăng nhập vui lòng đăng nhập để mua hàng"
        }
        this.showAlert=true;
    }

    onCloseAlert() {
        this.showAlert=false;
    }

    onAccept() {

        if(sessionStorage.getItem('auth')){
            this.showAlert=false;
            this.websocket.sendMessage("Tài khoản " +JSON.parse(sessionStorage.getItem('auth')).username+' vữa thanh toán '+ this.getTotal());
            this.shoppingCarts=[];
            this.sanPhamDTO=[];
            sessionStorage.removeItem("gio-hang");
            this.toastr.success("Bạn đã mua thành công");
        }else{
            this.showAlert=false;
        }


    }
}
