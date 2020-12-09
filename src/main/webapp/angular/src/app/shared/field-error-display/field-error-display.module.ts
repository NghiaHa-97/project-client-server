import {NgModule} from "@angular/core";
import {FieldErrorDisplayComponent} from "./field-error-display.component";
import {CommonModule} from "@angular/common";


@NgModule({
    imports:[CommonModule],
    declarations:[FieldErrorDisplayComponent],
    exports:[FieldErrorDisplayComponent]
})
export class FieldErrorDisplayModule{}
