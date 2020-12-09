import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SERVER_API_URL} from "../const/app.const";
import {createRequestOption} from "../common/common";
import {DoTuoiDTO} from "../model/DoTuoiDTO.Model";


@Injectable({
    providedIn:"root"
})
export class ThongKeService{
    url:string=SERVER_API_URL;
    constructor(private http:HttpClient) {
    }

    getNhomTuoi(req?:any):Observable<any>{
        const param=createRequestOption(req);
        return this.http.get<DoTuoiDTO[]>(`${this.url}api/thong-ke/get-nhom-do-tuoi-so-tiet`,{
            observe:'response',
            params: param
        })
    }


}
