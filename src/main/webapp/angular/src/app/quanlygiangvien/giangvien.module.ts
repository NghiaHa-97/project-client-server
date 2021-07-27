import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MaterialModule, PrimeModule} from '../app.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GiangVienRoutes } from './giangvien.routing';
import {AlertModule} from "../shared/alert/alert.module";
import {FieldErrorDisplayModule} from "../shared/field-error-display/field-error-display.module";
import { GiangVienComponent } from './giang-vien/giangvien.component';
import { GiangVienUpdateComponent } from './giang-vien/giangvien-update.component';
import {ConfirmationService} from "primeng/api";


//import {FormGiangVienComponent} from './addgiangvien/form-giangvien.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(GiangVienRoutes),
        FormsModule,
        AlertModule,
        FieldErrorDisplayModule,
        MaterialModule,
        ReactiveFormsModule,
        PrimeModule,
    ],
  declarations: [
    GiangVienComponent,
    GiangVienUpdateComponent
  ],
  providers:[ConfirmationService]
})

export class GiangVienModule {}
