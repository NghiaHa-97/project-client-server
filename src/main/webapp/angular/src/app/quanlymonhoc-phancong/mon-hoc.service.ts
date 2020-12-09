import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import * as moment from "moment";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {MonHoc} from "../model/MonHoc.model";
import {SERVER_API_URL} from "../const/app.const";
import {createRequestOption} from "../common/common";
import {DataPhanCongModel} from "../model/DataPhanCong.model";
import {GiangVienPhanCongDTO} from "../model/GiangVienPhanCongDTO.model";


@Injectable({
    providedIn:"root"
})
export class MonHocService{
    url:string=SERVER_API_URL;
    constructor(private http:HttpClient) {
    }

    getAllMonHoc(req?:any):Observable<any>{
        const param=createRequestOption(req);
        return this.http.get<MonHoc[]>(`${this.url}api/mon-hoc/get-page-mon-hoc`,{
            observe:'response',
            params: param
        })
    }

    // savePhanCong(user:NguoiDungCTDTO){
    //     console.log("save");
    //     return this.http.post<boolean>(`${this.url}api/user/save`,user,{
    //         observe:'response'
    //     })
    // }


    findById(req:number):Observable<any> {

        return this.http.get<MonHoc>(`${this.url}api/mon-hoc/getById/${req}`,{
            observe:'response'
        })
    }

    deleteById(req:number){

        return this.http.delete(`${this.url}api/mon-hoc/delete/${req}`,{
            observe:'response'
        })
    }
    //
    // //get-all-role-by-iduser
    // getAllRoleById(req:number):Observable<any> {
    //     let param=new HttpParams().set('userId',''+req);
    //     console.log(req);
    //     return this.http.get<Role[]>(`${this.url}api/get-all-role-by-iduser`,{
    //         observe:'response',
    //         params:param
    //     })
    // }
    //
    // getAllRole():Observable<Role[]>{
    //     return this.http.get<Role[]>(this.url+'api/get-all-role',{
    //         observe:"body"
    //     })
    // }
    //
    saveMonHoc(request:MonHoc){
        return this.http.post(this.url+'api/mon-hoc/save',request,{
            observe:"response"
        })
    }

    savePhanCong(requestPc: DataPhanCongModel[]) {
        return this.http.post(this.url+'api/mon-hoc/savephancong',requestPc,{
            observe:"response"
        })
    }


    getGVDcPhanCongMonHocId(req?:any):Observable<any>{
        const param=createRequestOption(req);
        return this.http.get<GiangVienPhanCongDTO[]>(`${this.url}api/mon-hoc/get-gv-dc-phancong`,{
            observe:'response',
            params:param
        })
    }
}
