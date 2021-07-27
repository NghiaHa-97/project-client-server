import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {SERVER_API_URL} from "../../const/app.const";
import {createRequestOption} from "../../common/common";
import { GiangVien } from "src/app/model/GiangVien";
import {GiangVienPhanCongDTO} from "../../model/GiangVienPhanCongDTO.model";
import {BacSi} from "../../model/httt-yte/BacSi.model";
import {NgoaiNgu} from "../../model/httt-yte/NgoaiNgu.model";
import * as moment from "moment";


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
    private urlGetPageGiangVienPhanCong = SERVER_API_URL + "api/giangvien-phanbo";

    private urlNgoaiNgu = SERVER_API_URL + "api/ngoaingu";
    private urlQTNN =SERVER_API_URL+"api/getQTNNByLatestDay";
    private urlsaveQTNN=SERVER_API_URL+"api/quatrinhngoaingu";


    private urlPageBacSi=SERVER_API_URL+"api/bac-si/page-bac-si";
    private urlPageBieuHien=SERVER_API_URL+"api/bac-si/page-bieu-hien";
    private urlGetChuanDoan=SERVER_API_URL+"api/bac-si/chuan-doan";
    private urlFindOne=SERVER_API_URL+"api/bac-si/get-by-id/";
    private urlSave=SERVER_API_URL+"api/bac-si/save";
    private urlUploadFile=SERVER_API_URL+"api/bac-si/upload";
    private urlAllNN=SERVER_API_URL+"api/nn/get-all-nn";


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

    getPageGiangVienPhanBo(req?:any):Observable<any>{
        const param=createRequestOption(req);
        return this.http.get<GiangVienPhanCongDTO[]>(`${this.urlGetPageGiangVienPhanCong}`,{
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



    getAllBacSi(req?:any):Observable<any>{
        const param=createRequestOption(req);
        return this.http.get<BacSi[]>(`${this.urlPageBacSi}`,{
            observe:'response',
            params: param
        })
    }

    getPageBieuHien(req?:any):Observable<any>{
        const param=createRequestOption(req);
        return this.http.get<BacSi[]>(`${this.urlPageBieuHien}`,{
            observe:'response',
            params: param
        })
    }

    getOneBacSi(id:number,req?:any):Observable<any>{
        const param=createRequestOption(req);
        return this.http.get<BacSi[]>(`${this.urlFindOne}${id}`,{
            observe:'response',
            params: param
        })
    }

    getAllNN(req?:any):Observable<any>{
        const param=createRequestOption(req);
        return this.http.get<NgoaiNgu[]>(`${this.urlAllNN}`,{
            observe:'response',
            params: param
        })
    }
    getChuanDoan(req?:any):Observable<any>{
        return this.http.post<any>(`${this.urlGetChuanDoan}`,req,{
            observe:'response'
        })
    }

    upload(file: File): Observable<any> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        // const req = new HttpRequest('POST', `${this.baseUrl}upload`, formData, {
        //     reportProgress: true,
        //     responseType: 'json'
        // });

        return this.http.post(this.urlUploadFile,formData,{
            observe:"response"
        })
    }

    saveBacSi(bs: any): Observable<any> {

        bs.ngaySinh=(moment(bs.ngaySinh,'DD/MM/YYYY'))

        if(bs.chungChi){
            bs.chungChi.forEach(i=>{
                i.tuNgay=(moment(i.tuNgay,'DD/MM/YYYY'))
                i.denNgay=(moment(i.denNgay,'DD/MM/YYYY'))
            })
        }

        if(bs.kinhNghiem){
            bs.kinhNghiem.forEach(i=>{
                i.tuNgay=(moment(i.tuNgay,'DD/MM/YYYY'))
                i.denNgay=(moment(i.denNgay,'DD/MM/YYYY'))
            })
        }

        return this.http.post(this.urlSave, bs , { observe:'response'});
    }

}
