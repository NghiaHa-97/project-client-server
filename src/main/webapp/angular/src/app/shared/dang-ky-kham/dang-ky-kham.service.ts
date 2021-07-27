import {Injectable} from "@angular/core";
import {SERVER_API_URL} from "../../const/app.const";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {createRequestOption} from "../../common/common";
import {MonHoc} from "../../model/MonHoc.model";
import {IKhoa} from "../../model/httt-yte/Khoa.model";
import {LichKham} from "../../model/httt-yte/LichKham.modal";


@Injectable({
    providedIn:"root"
})
export class DangKyKhamService{
    url:string=SERVER_API_URL;
    constructor(private http:HttpClient) {
    }


    getAllKhoa(req?:any):Observable<any>{
        const param=createRequestOption(req);
        return this.http.get<IKhoa[]>(`${this.url}api/khoa/get-all-khoa`,{
            observe:'response',
            params: param
        })
    }

    save(req?:any):Observable<any>{
        // const param=createRequestOption(req);
        return this.http.post<LichKham>(`${this.url}api/dang-ky-kham/save`,req,{
            observe:'response'
        })
    }
}
