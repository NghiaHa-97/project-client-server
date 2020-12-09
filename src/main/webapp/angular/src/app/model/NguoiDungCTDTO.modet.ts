import {Moment} from "moment";

export interface NguoiDungCTDTO{
    userId?:number;
    userName:string;
    admin?:boolean;
    userDetailId?:number;
    hoTen:string;
    gioiTinh:boolean;
    ngaySinh:Moment;
    diaChi:string;
    taiKhoan:number;
    sdt:string;
    email:string;
    nngaySinhFormat?:string;
    password?:string;
    ngaySinhDate:Moment;
}
