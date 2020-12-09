import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {MonHocService} from "./mon-hoc.service";
import {MonHoc} from "../model/MonHoc.model";

@Injectable({
    providedIn:"root"
})
export class MonHocResolve implements Resolve<MonHoc>{

    constructor(private monHocService:MonHocService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<MonHoc> | Promise<MonHoc> | MonHoc {

        return this.monHocService.findById(+route.params['monhocid']);
    }

}
