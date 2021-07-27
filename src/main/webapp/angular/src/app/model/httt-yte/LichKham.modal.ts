import {Moment} from "moment";


export interface ILichKham{
    id:number;
    gioiTinh:boolean;
    hoTen:string;
    ngaySinh:Moment;
    sDT:string;
    diaChi:string;
    khoaId:number;
    thoiGian:Moment;
}

export class LichKham implements ILichKham{
    public id:number;
    public gioiTinh:boolean;
    public hoTen:string;
    public ngaySinh:Moment;
    public sDT:string;
    public diaChi:string;
    public khoaId:number;
    public thoiGian:Moment
    constructor() {
    }
}
