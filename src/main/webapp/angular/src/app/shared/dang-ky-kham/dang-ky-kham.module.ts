import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DangKyKhamComponent} from "./dang-ky-kham.component";
import {NzButtonModule} from "ng-zorro-antd/button";
import { NzModalModule } from 'ng-zorro-antd/modal';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {CalendarModule} from "primeng/calendar";
import {RadioButtonModule} from "primeng/radiobutton";
import {MessageModule} from "primeng/message";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputMaskModule} from "primeng/inputmask";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from 'primeng/toast';
import {MessageService} from "primeng/api";



@NgModule({
    imports: [CommonModule,
        FormsModule,
        NzButtonModule,
        NzModalModule,
        NzFormModule,
        NzInputModule,
        NzRadioModule,
        NzDatePickerModule,
        NzTabsModule,
        ReactiveFormsModule,
        CalendarModule,
        RadioButtonModule,
        MessageModule,
        InputTextareaModule,
        InputMaskModule,
        DropdownModule,
        InputTextModule,
        ToastModule


    ],
    declarations: [ DangKyKhamComponent ],
    exports:[DangKyKhamComponent],
    providers:[MessageService]
})

export class DangKyKhamModule {}
