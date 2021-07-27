import {Moment} from "moment";
import {ChungChiKinhNghiem} from "./ChungChi.model";
import {BacSiNgoaiNgu, NgoaiNgu} from "./NgoaiNgu.model";



export interface IBacSi{
    id:number;
    maBS:string;
    hoTen:string;
    ngaySinh:Moment;
    gioiTinh:boolean;
    hocVi:string;
    donViCongTac:string;
    diaChi:string;
    dienThoai:string;
    email:string;
    khoaId:number;
    anh:string;
    gioiThieu:string;
    chucVu:string;

}

export class BacSi implements IBacSi{
   public id:number;
   public maBS:string;
   public hoTen:string;
   public ngaySinh:Moment;
   public gioiTinh:boolean;
   public hocVi:string;
   public donViCongTac:string;
   public diaChi:string;
   public dienThoai:string;
   public email:string;
   public khoaId:number;
   public anh:string;
   public gioiThieu:string;
   public chucVu:string;
    public chungChi:ChungChiKinhNghiem[];
    public kinhNghiem:ChungChiKinhNghiem[];
    public ngoaiNgu:NgoaiNgu[];
    public bacSiNgoaiNgu:BacSiNgoaiNgu[];
    constructor() {
        this.chungChi=[]
        this.kinhNghiem=[]
        this.ngoaiNgu=[]
        this.bacSiNgoaiNgu=[]
    }
}
