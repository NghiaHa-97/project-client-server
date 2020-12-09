import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SERVER_API_URL} from "../../const/app.const";
import {Observable} from "rxjs";
import {Role} from "../../model/Role.model";
import {RolePermission} from "../../model/RolePermission.model";
import {RequestRolePermission} from "../../model/RequestRolePermission.model";



@Injectable({
    providedIn:"root"
})
export class quyenHanService{
    url:string=SERVER_API_URL;
    constructor(private http:HttpClient) {
    }


    getAllRole():Observable<Role[]>{
        return this.http.get<Role[]>(this.url+'api/get-all-role',{
            observe:"body"
        })
    }



    ///role/delete

    deleteRole(request:number):Observable<boolean>{
        return this.http.delete<boolean>(this.url+'api/role/delete',{
            observe:"body",
            params:new HttpParams().set('id',request+'')
        })
    }


    saveRole(request:Role){
        return this.http.post<boolean>(this.url+'api/role/save',request,{
            observe:"body"
        })
    }
    getPermissionByRoleId(id:number):Observable<RolePermission[]>{
        return this.http.get<RolePermission[]>(`${this.url}api/get-all-permission-by-roleid-dto-page/${id}`,{
            observe:"body"
        })
    }

    getAllPermission():Observable<RolePermission[]>{
        return this.http.get<RolePermission[]>(`${this.url}api/get-all-permission-detail`,{
            observe:"body"
        })
    }

    //save-permission-detail-role

    savePermissionRole(requests:RequestRolePermission[]):Observable<boolean>{
        return this.http.post<boolean>(`${this.url}api/save-permission-detail-role`,requests,
            {
                observe:"body"
            })
    }

}
