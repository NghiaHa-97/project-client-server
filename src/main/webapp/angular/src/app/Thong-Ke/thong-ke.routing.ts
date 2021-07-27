import {Routes} from "@angular/router";

import {ThongKeComponent} from "./thong-ke.component";

export const thongKeRoutes:Routes=[
    {
        path:'',
        children:[
            {
                path:'tin-moi-nhat',
                component:ThongKeComponent

            }

        ]
    }
]
