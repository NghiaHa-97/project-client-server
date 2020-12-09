import * as moment from "moment";

import { Moment } from "moment";

export class GiangVien {
    id:any;
    //giangvienId: number;
    maGV:string;
    hoTen:string;
    ngaySinhDate:Moment;
    gioiTinh:boolean;
    noiSinh:string;
    queQuan:string;
    danToc:string;
    hocVi:string;
    namNhanHV:number;
    nuocNhanHV:string;
    namBoNhiem:number;
    chucVu:string;
    donViCongTac:string;
    diaChi:string;
    dienThoai:string;
    email:string;
    // constructor(){
    //     this.ngaySinhDate=new Date(1990,0,1);
    // }
    ngaySinh:Moment;
    ngaySinhFormat?:string;

}