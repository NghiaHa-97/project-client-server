import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {DDMMYYYY, SERVER_API_URL} from "../../const/app.const";
import {NguoiDungCTDTO} from "../../model/NguoiDungCTDTO.modet";
import {Observable} from "rxjs";
import {Role} from "../../model/Role.model";
import * as moment from "moment";
import {createRequestOption} from "../../common/common";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {RequestUserRole} from "../../model/RequestUserRole.model";


@Injectable({
    providedIn:"root"
})
export class NguoiDungService{
    url:string=SERVER_API_URL;
    constructor(private http:HttpClient) {
    }

    getAllUserDetails(req?:any):Observable<any>{
        const param=createRequestOption(req);
        return this.http.get<NguoiDungCTDTO[]>(`${this.url}api/user/get-all-user-details`,{
            observe:'response',
            params: param
        })
    }
    ///user/save
    saveUser(user:NguoiDungCTDTO){
        console.log("save");
        return this.http.post<boolean>(`${this.url}api/user/save`,user,{
            observe:'response'
        })
    }


    findById(req:number):Observable<NguoiDungCTDTO> {

        let param=new HttpParams().set('userId',''+req);
        return this.http.get<NguoiDungCTDTO>(`${this.url}api/user/findbyid`,{
            observe:'body',
            params:param
        })
    }

    deleteById(req:number){

        let param=new HttpParams().set('userId',''+req);
        return this.http.delete<boolean>(`${this.url}api/user/delete`,{
            observe:'body',
            params:param
        })
    }

    //get-all-role-by-iduser
    getAllRoleById(req:number):Observable<any> {
        let param=new HttpParams().set('userId',''+req);
        console.log(req);
        return this.http.get<Role[]>(`${this.url}api/get-all-role-by-iduser`,{
            observe:'response',
            params:param
        })
    }

    getAllRole():Observable<Role[]>{
        return this.http.get<Role[]>(this.url+'api/get-all-role',{
            observe:"body"
        })
    }

    saveUserRole(request:RequestUserRole[]):Observable<boolean>{
        return this.http.post<boolean>(this.url+'api/save-user-role',request,{
            observe:"body"
        })
    }
}
