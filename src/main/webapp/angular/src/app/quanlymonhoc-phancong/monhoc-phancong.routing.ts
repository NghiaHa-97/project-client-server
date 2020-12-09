import {Routes} from "@angular/router";
import {MonHocComponent} from "./mon-hoc.component";
import {MonHocResolve} from "./mon-hoc-resolve";
import {MonHocUpdateComponent} from "./mon-hoc-update.component";

export const monHocPhanCongRuotes:Routes=[
    {
        path:'',
        children:[
            {
                path:'monhocphancong',
                component:MonHocComponent

            },
            {
                path:'monhocphancong/monhoc/update/:monhocid',
                component:MonHocUpdateComponent,
                resolve:{MonHoc:MonHocResolve}
            },
            {
                path:'monhocphancong/monhoc/new',
                component:MonHocUpdateComponent
            }

        ]
    }
]
