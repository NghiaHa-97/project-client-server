import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {AuthenticationResponse} from "../../model/AuthenticationResponse";
import {AuthenticationRequest} from "../../model/AuthenticationRequest";
import {SERVER_API_URL} from "../../const/app.const";
import {WebSocketService} from "../../shared/navbar/web-socket.service";
import {Router} from "@angular/router";


@Injectable({providedIn:"root"})
export class LoginService{

    private url=SERVER_API_URL;
    private userSubject=new BehaviorSubject<AuthenticationResponse>(null);


    constructor(private http:HttpClient,
                public webSocketService:WebSocketService,
                private router:Router,) {
    }
    getUserSubject():Observable<AuthenticationResponse> {
        return this.userSubject.asObservable();
    }
    setUserSubject(value:AuthenticationResponse){
        this.userSubject.next(value);
    }

    login(req:AuthenticationRequest):Observable<AuthenticationResponse>{
        return this.http.post<AuthenticationResponse>(this.url+"api/authenticate",req,{
            observe:"body"
        });
    }

    logout(isLogin:boolean,name:string) {

        this.webSocketService.closeWebSocket();
        sessionStorage.removeItem('auth');
        sessionStorage.clear();
        isLogin=false;
        name=null;
        this.router.navigate(['/home']);

        // this.getUserSubject().subscribe(data=>{
        //     console.log(data);
        // })
    }

}
