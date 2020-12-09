import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SERVER_API_URL} from "../../const/app.const";

@Injectable({
    providedIn:"root"
})
export class FileService{
    baseUrl=SERVER_API_URL
    constructor(private http: HttpClient) { }

    upload(file: File): Observable<any> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        // const req = new HttpRequest('POST', `${this.baseUrl}upload`, formData, {
        //     reportProgress: true,
        //     responseType: 'json'
        // });

        return this.http.post(`${this.baseUrl}api/upload`,formData,{
            observe:"response"
        })
    }

    getFiles(): Observable<any> {
        return this.http.get(`${this.baseUrl}api/files`);
    }
}
