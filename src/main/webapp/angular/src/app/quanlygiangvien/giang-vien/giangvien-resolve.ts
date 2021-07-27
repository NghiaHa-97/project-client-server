import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {NguoiDungCTDTO} from "../../model/NguoiDungCTDTO.modet";
import {Observable} from "rxjs";

import { GiangVienService } from "./giangvien.service";
import {GiangVien} from "../../model/GiangVien";
import {BacSi} from "../../model/httt-yte/BacSi.model";
import {map} from "rxjs/operators";
import * as moment from "moment";

@Injectable({
    providedIn:"root"
})
export class GiangVienResolve implements Resolve<BacSi>{

    constructor(private giangvienService:GiangVienService) {
    }

    // resolve(route: ActivatedRouteSnapshot,
    //         state: RouterStateSnapshot): Observable<GiangVien> | Promise<GiangVien> | GiangVien {
    //     console.log(+route.params['id'])
    //     let id = route.params['id'];
    //     console.log(id);
    //     return this.giangvienService.getGiangVienById(id);
    // }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<BacSi> | Promise<BacSi> | BacSi {
        console.log(+route.params['id'])
        let id = route.params['id'];
        console.log(id);
        return this.giangvienService.getOneBacSi(id).pipe(
            map(x=>{
                if(x.body.chungChi){
                    x.body.chungChi.forEach(i=>{
                        i.tuNgay=(moment(i.tuNgay).format('DD/MM/YYYY'))
                        i.denNgay=(moment(i.denNgay).format('DD/MM/YYYY'))
                    })
                }

                if(x.body.kinhNghiem){
                    x.body.kinhNghiem.forEach(i=>{
                        i.tuNgay=(moment(i.tuNgay).format('DD/MM/YYYY'))
                        i.denNgay=(moment(i.denNgay).format('DD/MM/YYYY'))
                    })
                }

                // if(!x.body.ngoaiNgu){
                //     x.body.ngoaiNgu=[];
                // }
                // if(x.body.bacSiNgoaiNgu){
                //     x.body.bacSiNgoaiNgu.forEach(i=>{
                //         i.tenNgoaiNgu=i.ngoaiNgu[0]?i.ngoaiNgu[0].tenNgoaiNgu:null
                //
                //     })
                // }


                return x;
            })
        );
    }

}
