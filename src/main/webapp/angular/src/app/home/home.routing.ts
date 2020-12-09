import {Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {GioHangComponent} from "./gio-hang/gio-hang.component";

export const homeRoute:Routes=[
    {
        path:'',
        children:[
            {
                path:'home',
                component:HomeComponent
            },
            {
                path:'gio-hang',
                component:GioHangComponent
            }
        ]
    }
]
