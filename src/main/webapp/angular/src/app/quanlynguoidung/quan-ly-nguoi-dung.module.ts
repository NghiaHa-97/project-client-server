import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MdModule} from "../md/md.module";
import {MaterialModule} from "../app.module";
import {RouterModule} from "@angular/router";
import {NguoiDungComponent} from "./nguoi-dung/nguoi-dung.component";
import {QuyenHanComponent} from "./quyen-han/quyen-han.component";
import {quanLyNguoiDungRoute} from "./quan-ly-nguoi-dung.routing";
import {AlertModule} from "../shared/alert/alert.module";
import {NguoiDungUpdateComponent} from "./nguoi-dung/nguoi-dung-update.component";
import {FieldErrorDisplayModule} from "../shared/field-error-display/field-error-display.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdModule,
        MaterialModule,
        RouterModule.forChild(quanLyNguoiDungRoute),
        AlertModule,
        FieldErrorDisplayModule,
        ReactiveFormsModule
    ],
    declarations:[
        NguoiDungComponent,
        QuyenHanComponent,
        NguoiDungUpdateComponent
    ]

})
export class QuanLyNguoiDungModule{}
