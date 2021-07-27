import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { NzModalRef } from 'ng-zorro-antd/modal';

import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {errorState} from "../animations";
import {ILichKham, LichKham} from "../../model/httt-yte/LichKham.modal";
import { jsPDF } from "jspdf";
import {DangKyKhamService} from "./dang-ky-kham.service";
import {IKhoa} from "../../model/httt-yte/Khoa.model";
import {MessageService} from "primeng/api";

@Component({
    selector:'app-dang-ky-kham',
    templateUrl:'./dang-ky-kham.component.html',
    styleUrls:['./dang-ky-kham.component.css'],
    animations: [
        errorState
    ]
})
export class DangKyKhamComponent implements OnInit{
    isConfirmLoading= false;
    // date :Date;
    licKham:LichKham;
    formReg: FormGroup;

    khoas:IKhoa[];
    constructor(private modal: NzModalRef,
                private formBuild:FormBuilder,
                private dangKyKhamService:DangKyKhamService,
                private messageService: MessageService) {


    }

    ngOnInit(): void {
        this.formReg=this.formBuild.group({
            hoTen: [null, Validators.required],
            gioiTinh: [0],
            ngaySinh: [null, Validators.required],
            diaChi: [null, Validators.required],
            sDT: [null, Validators.required],
            khoaId: [null, Validators.required],
            thoiGian:[null,[Validators.required],]
        });

        this.dangKyKhamService.getAllKhoa().subscribe((resp)=>{
            this.khoas=resp.body;
            // console.log(this.khoas);
        })


        // console.log('INIT',this.isFieldValid(this.formReg,'name'))
    }

    destroyModal(): void {
        this.modal.destroy();
    }
    onChange(result: Date): void {
        console.log('onChange: ', result);
    }

    handleOk() {
        this.isConfirmLoading = true;
        if(this.formReg.valid){
            console.log(this.formReg.value);
            this.licKham=this.formReg.value;

            this.dangKyKhamService.save(this.licKham).subscribe((resp)=>{
                console.log(resp.body);
                if(resp.body){
                    this.messageService.add({severity:'success', summary:'Thành công', detail:'Đăng ký lịch khám thành công'});
                    this.resetForm();
                    this.formReg.get('gioiTinh').setValue(0);
                    this.isConfirmLoading=false;
                }

            })
            // const doc = new jsPDF('landscape');
            // // doc.text("Hello world!", 10, 10);
            // doc.html(document.getElementById('divElement'),{
            //     margin:15
            // })
            // doc.save("LichKham.pdf");
        }else{
            this.validateAllFormFields(this.formReg);
        }


    }

    submitForm() {

    }

    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    change() {

    }

    resetForm(){
        this.formReg.reset();
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
}
