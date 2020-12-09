import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {SERVER_API_URL} from "../../const/app.const";
import {createRequestOption} from "../../common/common";
import { GiangVien } from "src/app/model/GiangVien";


const httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })
};

const PARAM_MA_GIANGVIEN = "MaGV";
const PARAM_KEY_SEARCH= "keyword";

@Injectable({providedIn:"root"})
export class GiangVienService {

    private url=SERVER_API_URL;
    private urlGiangVien =  SERVER_API_URL + "api/giangvien";
    private urlGetGVByHoTenOrMaGV = SERVER_API_URL + "api/giangvienByHoTenOrMaGV";
    private urlNgoaiNgu = SERVER_API_URL + "api/ngoaingu";
    private urlQTNN =SERVER_API_URL+"api/getQTNNByLatestDay";
    private urlsaveQTNN=SERVER_API_URL+"api/quatrinhngoaingu";
    

    constructor(private http:HttpClient) {}


    getGiangVienList(): Observable<any> {
        return this.http.get(this.urlGiangVien, httpOptions);
    }

    getGiangVienByHoTenOrMaGV(value: any) : Observable<any> {
        let params = new HttpParams().set(PARAM_KEY_SEARCH, value);
        return this.http.get(this.urlGetGVByHoTenOrMaGV, { headers: httpOptions.headers, params: params });
        
    }

    saveGiangVien(giangvien: Object): Observable<Object> {
        return this.http.post(this.urlGiangVien, giangvien , {headers: httpOptions.headers});
    }

    getGiangVienById(value: any): Observable<any> {
        return this.http.get(`${this.urlGiangVien}/${value}`, { headers: httpOptions.headers});
    }

    deleteGiangVien(value: any): Observable<any> {
        return this.http.delete(`${this.urlGiangVien}/${value}`, { headers: httpOptions.headers});
    }
    updateGiangVien(value: any, giangvien: object):Observable<Object> {
        return this.http.put(`${this.urlGiangVien}/${value}`, giangvien, {headers: httpOptions.headers});
    }

    getAllGiangVien(req?:any):Observable<any>{
        const param=createRequestOption(req);
        return this.http.get<GiangVien[]>(`${this.urlGiangVien}`,{
            observe:'response',
            params: param
        })
    }

    getAllNgoaiNgu(): Observable<any> {
        return this.http.get(this.urlNgoaiNgu, httpOptions);
    }

    getQTNN_NearestDayByGiangVienId(id: number): Observable<any> {
        return this.http.get(`${this.urlQTNN}/${id}`, { headers: httpOptions.headers});
    } 

    saveQuaTrinhNgoaiNgu(qtnn: Object): Observable<Object> {
        return  this.http.post(this.urlsaveQTNN, qtnn, {headers: httpOptions.headers});
    } 

}
