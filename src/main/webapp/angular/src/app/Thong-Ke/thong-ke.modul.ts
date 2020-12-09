import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MdModule} from "../md/md.module";
import {MaterialModule} from "../app.module";
import {RouterModule} from "@angular/router";
import {AlertModule} from "../shared/alert/alert.module";
import {FieldErrorDisplayModule} from "../shared/field-error-display/field-error-display.module";

import {ThongKeComponent} from "./thong-ke.component";
import {thongKeRoutes} from "./thong-ke.routing";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdModule,
        MaterialModule,
        RouterModule.forChild(thongKeRoutes),
        AlertModule,
        FieldErrorDisplayModule,
        ReactiveFormsModule
    ],
    declarations:[
        ThongKeComponent
    ]

})
export class ThongKeModul{}
