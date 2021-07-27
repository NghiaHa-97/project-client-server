import * as moment from "moment";
import {Moment} from "moment";


export class ChungChiKinhNghiem{
    public id:number;
    public tuNgay:Moment;
    public denNgay:Moment;
    public noiDung:string;
    public bacSiId:number;



    constructor() {
    }
    // get tuNgayTemp(){
    //     console.log('get','this.tungay',this.tuNgay,moment(this.tuNgay).format('DD/MM/YYYY'));
    //     return moment(this.tuNgay).format('DD/MM/YYYY');
    // }
    //
    // set tuNgayTemp( value:string ){
    //     this.tuNgay=moment(value,'DD/MM/YYYY');
    //     console.log('set','this.tungay',this.tuNgay);
    //
    // }
}
