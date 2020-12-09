import {Routes} from "@angular/router";
import {NguoiDungComponent} from "./nguoi-dung/nguoi-dung.component";
import {QuyenHanComponent} from "./quyen-han/quyen-han.component";
import {NguoiDungUpdateComponent} from "./nguoi-dung/nguoi-dung-update.component";
import {NguoiDungResolve} from "./nguoi-dung/nguoi-dung-resolve";

export const quanLyNguoiDungRoute:Routes=[
    {
        path:'',
        children:[
            {
                path:'nguoidung',
                component:NguoiDungComponent

            },
            {
                path:'nguoidung/update/:userId',
                component:NguoiDungUpdateComponent,
                resolve:{nguoiDungDTO:NguoiDungResolve}
            },
            {
                path:'nguoidung/new',
                component:NguoiDungUpdateComponent
            },
            {
                path:'quyenhan',
                component:QuyenHanComponent
            }
        ]
    }
]
