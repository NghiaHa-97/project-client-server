import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {NguoiDungCTDTO} from "../../model/NguoiDungCTDTO.modet";
import {Observable} from "rxjs";

import { GiangVienService } from "./giangvien.service";
import {GiangVien} from "../../model/GiangVien";

@Injectable({
    providedIn:"root"
})
export class GiangVienResolve implements Resolve<GiangVien>{

    constructor(private giangvienService:GiangVienService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<GiangVien> | Promise<GiangVien> | GiangVien {
        console.log(+route.params['id'])
        let id = route.params['id'];
        console.log(id);
        return this.giangvienService.getGiangVienById(id);
    }

}
