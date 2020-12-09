import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {NguoiDungCTDTO} from "../../model/NguoiDungCTDTO.modet";
import {Observable} from "rxjs";
import {NguoiDungService} from "./nguoi-dung.service";

@Injectable({
    providedIn:"root"
})
export class NguoiDungResolve implements Resolve<NguoiDungCTDTO>{

    constructor(private nguoiDungService:NguoiDungService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<NguoiDungCTDTO> | Promise<NguoiDungCTDTO> | NguoiDungCTDTO {
       // console.log(+route.params['userId'])
        return this.nguoiDungService.findById(+route.params['userId']);
    }

}
