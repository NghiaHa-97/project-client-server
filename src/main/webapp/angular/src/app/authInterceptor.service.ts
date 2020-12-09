import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(sessionStorage.getItem("auth")!==null){
            const  modifParam=req.clone({
                headers:req.headers.append('Authorization',`Bearer ${JSON.parse(sessionStorage.getItem("auth")).jwt}`)
            });

            return next.handle(modifParam);
        }

        return next.handle(req);
    }

}
