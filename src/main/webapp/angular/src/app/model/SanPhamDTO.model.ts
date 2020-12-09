import {Moment} from "moment";

export interface SanPhamDTO{
    idSp:number;
    idUser:number;
    username:string;
    tenSanPham:string;
    gia:number;
    soLuong:number;
    anh:string;
    ngaySx:Moment;
    mota:string;
    tenNsx:string;
    tenLoai:string;
    ngaySxFormat?:string;
    tongTien?:number;
}
