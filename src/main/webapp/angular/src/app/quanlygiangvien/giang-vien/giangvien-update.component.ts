import {Component} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import * as moment from "moment";
import {DDMMYYYY} from "../../const/app.const";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GiangVienService} from './giangvien.service';
import { GiangVien } from "src/app/model/GiangVien";

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-giangvien-update',
    templateUrl: 'giangvien-update.component.html',
    styleUrls:['./giangvien-update.component.css']
})
export class GiangVienUpdateComponent{

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    validEmailRegister: boolean = false;

    validEmailLogin: boolean = false;

    validTextType: boolean = false;
    validEmailType: boolean = false;
    validNumberType: boolean = false;
    validUrlType: boolean = false;
    pattern = "https?://.+";
    validSourceType: boolean = false;
    validDestinationType: boolean = false;

    matcher = new MyErrorStateMatcher();
    type : FormGroup;
    startDate:Date = new Date(1990, 1, 1);
    giangvien: GiangVien;


    constructor(private formBuilder: FormBuilder,
                private giangvienService:GiangVienService,
                private activateRouter:ActivatedRoute,
                private router:Router,
                private toarService:ToastrService) {}

    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }


    onType() {
        console.log("vo ham Ontype()");
        if (this.type.valid) {
            // console.log("aaaaaaa");
            // console.log(this.type);

            this.giangvien=this.type.value;
            this.giangvien.ngaySinh=moment(this.giangvien.ngaySinhDate);
            //this.giangvien.ngaySinhFormat=moment(this.giangvien.ngaySinh).format(DDMMYYYY);

            console.log("url: ",this.router.url);
            if (this.router.url.includes("update")) {
                this.giangvienService.updateGiangVien(this.giangvien.id, this.giangvien).subscribe( response=> {
                    this.toarService.success("Sửa thành công");
                    this.router.navigate(['/quanlygiangvien/giangvien']);
                    }, error => {
                        this.toarService.error("Sửa thất bại");
                    }
                )
            } else if (this.router.url.includes("giangvien/new")) {
                this.giangvienService.saveGiangVien(this.giangvien).subscribe(
                    response=>{
                        this.toarService.success("Lưu thành công");
                        this.resetForm();
                        return;
                    },
                    error => {
                        this.toarService.error("Lưu thất bại");
                });
            }


           

        } else {
            this.validateAllFormFields(this.type);
        }
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
    ngOnInit() {
        this.type = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            // text: [null, Validators.required],
            id:null,
            maGV: [null, Validators.required],
            noiSinh: [null, Validators.required],
            hoTen: [null, Validators.required],
            queQuan: [null, Validators.required],
            danToc: [null, Validators.required],
            dienThoai: [null, Validators.required],
            hocVi: [null, Validators.required],
            chucVu: [null, Validators.required],
            diaChi: [null, Validators.required],
            donViCongTac: [null, Validators.required],

            ngaySinhDate:[new Date(1990,0,1)],
            //ngaySinh:[new Date(1801,0,1)],
            gioiTinh:['true'],
            email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            // number: [null, Validators.required],
            // url: [null , Validators.required],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.

        }, {
            //validator: PasswordValidation.MatchPassword // your validation method
        });

        this.activateRouter.data.subscribe(data=>{
            this.giangvien=data['giangvien'];
            if(this.giangvien){
                this.type.setValue({

                        id: this.giangvien.id,
                        maGV: this.giangvien.maGV,
                        noiSinh: this.giangvien.noiSinh,
                        hoTen: this.giangvien.hoTen,
                        queQuan: this.giangvien.queQuan,
                        danToc: this.giangvien.danToc,
                        dienThoai: this.giangvien.dienThoai,
                        hocVi: this.giangvien.hocVi,
                        chucVu: this.giangvien.chucVu,
                        diaChi: this.giangvien.diaChi,
                        donViCongTac: this.giangvien.donViCongTac,
            
                        ngaySinhDate:this.giangvien.ngaySinh,
                        gioiTinh:this.giangvien.gioiTinh+'',
                        email: this.giangvien.email
                })
            }}
        )

    }

    emailValidationRegister(e){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(e).toLowerCase())) {
            this.validEmailRegister = true;
        } else {
            this.validEmailRegister = false;
        }
    }

    emailValidationLogin(e){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(e).toLowerCase())) {
            this.validEmailLogin= true;
        } else {
            this.validEmailLogin = false;
        }
    }

    textValidationType(e){
        if (e) {
            this.validTextType = true;
        }else{
            this.validTextType = false;
        }
    }
    emailValidationType(e){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(e).toLowerCase())) {
            this.validEmailType = true;
        } else {
            this.validEmailType = false;
        }
    }
    numberValidationType(e){
        if (e) {
            this.validNumberType = true;
        }else{
            this.validNumberType = false;
        }
    }
    urlValidationType(e){
        try {
            new URL(e);
            this.validUrlType = true;
        } catch (_) {
            this.validUrlType = false;
        }
    }
    sourceValidationType(e){
        if (e) {
            this.validSourceType = true;
        }else{
            this.validSourceType = false;
        }
    }
    confirmDestinationValidationType(e){
        if (this.type.controls['password'].value === e) {
            this.validDestinationType = true;
        }else{
            this.validDestinationType = false;
        }
    }

    back() {
        this.router.navigate(['quanlygiangvien/giangvien']);
    }


    resetForm(){


        this.type.setValue({
            id:null,
            maGV: null,
            noiSinh: null,
            hoTen: null,
            queQuan: null,
            danToc: null,
            dienThoai: null,
            hocVi: null,
            chucVu: null,
            diaChi: null,
            donViCongTac: null,

            ngaySinhDate:[new Date(1801,0,1)],
            gioiTinh:'true',
            email: null,
        });
    }

}