import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MdModule} from "../md/md.module";
import {MaterialModule, NgZorroAntdModule,PrimeModule} from "../app.module";
import { RouterModule} from "@angular/router";
import {homeRoute} from "./home.routing";
import {GioHangComponent} from "./gio-hang/gio-hang.component";
import {AlertModule} from "../shared/alert/alert.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdModule,
    MaterialModule,
    RouterModule.forChild(homeRoute),
    AlertModule,
    NgZorroAntdModule,
    PrimeModule,
    ReactiveFormsModule
  ],
    declarations:[
        HomeComponent,
        GioHangComponent
    ]
})
export class HomeModule{}
