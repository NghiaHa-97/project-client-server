import {Injectable} from "@angular/core";
import {DDMMYYYY, SERVER_API_URL} from "../const/app.const";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {createRequestOption} from "../common/common";
import {map} from "rxjs/operators";
import * as moment from "moment";
import {ShoppingCart} from "../model/ShoppingCart.model";

@Injectable({
    providedIn:"root"
})
export class HomService{
    url:string=SERVER_API_URL;
    constructor(private http:HttpClient) {
    }

    getPageSanPham(request:any):Observable<any>{
        let params=createRequestOption(request);
        return this.http.get<any>(`${this.url}api/sanpham/get-page-san-pham`,{
            observe:'response',
            params:params
        }).pipe(
            map((x)=>{
                x.body.forEach(i=>{
                    if(i.ngaySx){
                        i.ngaySxFormat=moment(i.ngaySx).format(DDMMYYYY);
                    }
                });
                return x;
            }));
    }
    ///sanpham/get-data-gio-hang

    getDataGioHang(request:ShoppingCart[]):Observable<any>{

        return this.http.post<any>(`${this.url}api/sanpham/get-data-gio-hang`,request,{
            observe:'response'
        }).pipe(
            map((x)=>{
                x.body.forEach(i=>{
                    if(i.ngaySx){
                        i.ngaySxFormat=moment(i.ngaySx).format(DDMMYYYY);
                    }
                });
                return x;
            }));
    }
}
