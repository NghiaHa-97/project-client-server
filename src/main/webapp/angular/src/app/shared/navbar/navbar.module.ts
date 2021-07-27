import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule} from "@angular/forms";
import {MenubarModule} from "primeng/menubar";
import {SharedModule} from "primeng/api";

@NgModule({
    imports: [RouterModule,
        CommonModule,
        MatButtonModule,
        FormsModule,
        MenubarModule,
        SharedModule],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
