import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MdModule} from "../md/md.module";
import {MaterialModule, NgZorroAntdModule, PrimeModule} from "../app.module";
import {RouterModule} from "@angular/router";
import {AlertModule} from "../shared/alert/alert.module";
import {FieldErrorDisplayModule} from "../shared/field-error-display/field-error-display.module";
import {MonHocUpdateComponent} from "./mon-hoc-update.component";
import {MonHocComponent} from "./mon-hoc.component";
import {monHocPhanCongRuotes} from "./monhoc-phancong.routing";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdModule,
        MaterialModule,
        RouterModule.forChild(monHocPhanCongRuotes),
        AlertModule,
        FieldErrorDisplayModule,
        ReactiveFormsModule,
        PrimeModule,
        NgZorroAntdModule
    ],
    declarations:[
        MonHocUpdateComponent,
        MonHocComponent
    ]

})
export class MonhocphancongModul{}
