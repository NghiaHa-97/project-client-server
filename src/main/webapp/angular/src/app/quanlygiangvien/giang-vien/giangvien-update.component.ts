import {Component} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import * as moment from "moment";
import {DDMMYYYY} from "../../const/app.const";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GiangVienService} from './giangvien.service';
import { GiangVien } from "src/app/model/GiangVien";
import {ConfirmationService, LazyLoadEvent, SortEvent} from "primeng/api";
import {errorState, rowExpansionTrigger} from "../../shared/animations";
import {ChungChiKinhNghiem} from "../../model/httt-yte/ChungChi.model";
import {BacSiNgoaiNgu, NgoaiNgu} from "../../model/httt-yte/NgoaiNgu.model";
import {BacSi} from "../../model/httt-yte/BacSi.model";
import * as _ from "lodash";
import {IKhoa} from "../../model/httt-yte/Khoa.model";
import {DangKyKhamService} from "../../shared/dang-ky-kham/dang-ky-kham.service";
import {response} from "express";




export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}


export interface TreeNodeInterface {
    key: string;
    label:string,
    childrenChungChiKinhNghiem?: ChungChiKinhNghiem[];//key=1,2
    childrenNN?: BacSiNgoaiNgu[];//key=3
}
@Component({
    selector: 'app-giangvien-update',
    templateUrl: 'giangvien-update.component.html',
    styleUrls:['./giangvien-update.component.css'],
    animations:[rowExpansionTrigger,errorState]
})
export class GiangVienUpdateComponent{


    frozenCols = [
        { field: 'key', header: 'key' },
        // { field: 'address', header: 'address' }
    ];

    scrollableCols = [
        { field: 'name', header: 'name' },
        { field: 'age', header: 'age' },

        { field: 'address', header: 'address' }
    ];

    products:TreeNodeInterface[] = [
        {
            key: `1`,
            label:'Chứng chỉ',
            childrenChungChiKinhNghiem: [],
            childrenNN: [],

        },
        {key: `2`,
            label:'Kinh nghiệm',
            childrenChungChiKinhNghiem: [],
            childrenNN: [],
        },
        {key: `3`,
            label:'Ngoại ngữ',
            childrenChungChiKinhNghiem: [],
            childrenNN: [],
        },


    ];
    loading: boolean;


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
    formBacSi : FormGroup;
    startDate:Date = new Date(1990, 1, 1);
    giangvien: GiangVien;


    khoas:IKhoa[];
    bacSi:BacSi;
    ngoaiNgus:NgoaiNgu[];

    fileList:FileList=null;

    constructor(private formBuilder: FormBuilder,
                private giangvienService:GiangVienService,
                private activateRouter:ActivatedRoute,
                private router:Router,
                private toarService:ToastrService,
                private confirmationService: ConfirmationService,
                private dangKyKhamService: DangKyKhamService
                ) {
        this.loading = true;
        this.bacSi=new BacSi();
    }

    getNameEnglish(id){
        const i=this.ngoaiNgus.find(x=>x.id===id);
        return i ? i.tenNgoaiNgu: null;

    }

    onRowEditInit(product: TreeNodeInterface) {
        // this.clonedProducts[product.id] = {...product};
    }

    onRowEditSave(product: TreeNodeInterface) {
        console.log(this.products);
        // if (product.price > 0) {
        //     delete this.clonedProducts[product.id];
        //     this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
        // }
        // else {
        //     this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
        // }
    }

    onRowEditCancel( index: number,key:string) {
        // this.products2[index] = this.clonedProducts[product.id];
        // delete this.products2[product.id];
        console.log(key,index);
        if(key==='1'){
            this.bacSi.chungChi.splice(index,1);
        }else if(key==='2'){
            this.bacSi.kinhNghiem.splice(index,1);
        }else{
            this.bacSi.bacSiNgoaiNgu.splice(index,1);
        }

    }



    customSort(event: SortEvent) {
        console.log('customSort');
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (event.order * result);
        });
    }

    loadCustomers(event: LazyLoadEvent) {

        // console.log('loadCustomers');
        // console.log(event.sortOrder);
        // this.loading = true;
        //
        //
        //
        // setTimeout(() => {
        //     this.products[0].childrenChungChiKinhNghiem=this.bacSi.chungChi;
        //     this.products[1].childrenChungChiKinhNghiem=this.bacSi.kinhNghiem;
        //     this.products[2].childrenNN=this.bacSi.ngoaiNgu;
        //
        //     this.loading = false;
        // }, 0);
    }

    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }


    onSubmit(event:Event) {
        event.preventDefault();

        //"1979-12-31T17:00:00.000+00:00"
        // console.log(new Date("1979-12-31T17:00:00.000+00:00") );
        // console.log(moment.utc(new Date("1979-12-31T17:00:00.000+00:00")).format('DD//MM/YYYY') );
        // console.log(moment.utc("1979-12-31T17:00:00.000+00:00").format('DD//MM/YYYY') );
        // console.log(moment('15/10/1997','DD/MM/YYYY'));

        // this.confirmationService.confirm({
        //     target: event.target,
        //     message: "Are you sure that you want to proceed?",
        //     icon: "pi pi-exclamation-triangle",
        //     accept: () => {
        //         // this.messageService.add({
        //         //     severity: "info",
        //         //     summary: "Confirmed",
        //         //     detail: "You have accepted"
        //         // });
        //     },
        //     reject: () => {
        //         // this.messageService.add({
        //         //     severity: "error",
        //         //     summary: "Rejected",
        //         //     detail: "You have rejected"
        //         // });
        //     }
        // });

        // console.log(this.products[0].childrenChungChiKinhNghiem.filter(x=>!_.isEmpty(x)))
        if (this.formBacSi.valid) {
            // console.log("aaaaaaa");
            // console.log(this.type);

            // this.giangvien=this.formBacSi.value;
            // this.giangvien.ngaySinh=moment(this.giangvien.ngaySinhDate);
            // //this.giangvien.ngaySinhFormat=moment(this.giangvien.ngaySinh).format(DDMMYYYY);
            //
            // console.log("url: ",this.router.url);
            // if (this.router.url.includes("update")) {
            //     this.giangvienService.updateGiangVien(this.giangvien.id, this.giangvien).subscribe( response=> {
            //         this.toarService.success("Sửa thành công");
            //         this.router.navigate(['/quanlygiangvien/giangvien']);
            //         }, error => {
            //             this.toarService.error("Sửa thất bại");
            //         }
            //     )
            // } else if (this.router.url.includes("giangvien/new")) {
            //     this.giangvienService.saveGiangVien(this.giangvien).subscribe(
            //         response=>{
            //             this.toarService.success("Lưu thành công");
            //             this.resetForm();
            //             return;
            //         },
            //         error => {
            //             this.toarService.error("Lưu thất bại");
            //     });
            // }

            const request={id:this.bacSi.id,chungChi:this.products[0].childrenChungChiKinhNghiem.filter(x=>!_.isEmpty(x)),
                kinhNghiem:this.products[1].childrenChungChiKinhNghiem.filter(x=>!_.isEmpty(x)),
                bacSiNgoaiNgu:this.products[2].childrenNN.filter(x=>!_.isEmpty(x)),
                ...this.formBacSi.value};

            console.log(request);
            if(this.fileList){
                this.giangvienService.upload(this.fileList[0]).subscribe(response=>{
                    console.log('Anh1111111111111',response.body);
                    request['anh']=response.body.name;

                    this.giangvienService.saveBacSi(request).subscribe(x=>{
                        this.toarService.success("Lưu thành công");
                    });
                })
            }else{
                if(this.bacSi.anh){
                    request['anh']=this.bacSi.anh;
                }
                this.giangvienService.saveBacSi(request).subscribe(x=>{
                    this.toarService.success("Lưu thành công");
                });
            }



            // console.log(request);

           

        } else {
            this.validateAllFormFields(this.formBacSi);
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

        this.dangKyKhamService.getAllKhoa().subscribe((resp)=>{
            this.khoas=resp.body;
            // console.log(this.khoas);
            this.giangvienService.getAllNN().subscribe(x=>{
                this.ngoaiNgus=x.body;
            })

            this.activateRouter.data.subscribe(data=>{

                // console.log(data['giangvien']);
                if(!_.isEmpty(data['giangvien'])){
                    this.bacSi=data['giangvien'].body;
                    // console.log(moment.utc(this.bacSi.ngaySinh,'YYYY-MM-DD').format('DD/MM/YYYY'));
                    this.formBacSi.setValue({
                        maBS: this.bacSi.maBS,
                        hoTen: this.bacSi.hoTen,
                        ngaySinh: (moment.utc(this.bacSi.ngaySinh,'YYYY-MM-DD').format('DD/MM/YYYY')),
                        gioiTinh: this.bacSi.gioiTinh,
                        hocVi: this.bacSi.hocVi,
                        donViCongTac: this.bacSi.donViCongTac,
                        diaChi: this.bacSi.diaChi,
                        dienThoai: this.bacSi.dienThoai ,
                        email: this.bacSi.email,
                        khoaId: this.bacSi.khoaId,
                        anh:this.bacSi.anh,
                        gioiThieu:this.bacSi.gioiThieu
                    })


                    this.products[0].childrenChungChiKinhNghiem=this.bacSi.chungChi;
                    this.products[1].childrenChungChiKinhNghiem=this.bacSi.kinhNghiem;
                    this.products[2].childrenNN=this.bacSi.bacSiNgoaiNgu   ;

                    console.log('this.bacSi.bacSiNgoaiNgu',this.bacSi.bacSiNgoaiNgu)
                    console.log('tthis.products',this.products)
                }}
            )





        })
        this.formBacSi = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            // text: [null, Validators.required],
            maBS: [null, Validators.required],
            hoTen: [null, Validators.required],
            // ngaySinh: [new Date(2022,10-1,15), Validators.required],
            ngaySinh: [null, Validators.required],
            gioiTinh: [0],
            hocVi: [null, Validators.required],
            donViCongTac: [null, Validators.required],
            diaChi: [null, Validators.required],
            dienThoai: [null, Validators.required],
            email: [null, Validators.required],
            khoaId: [null, Validators.required],
            anh: [null],
            gioiThieu: [null, Validators.required]
            // number: [null, Validators.required],
            // url: [null , Validators.required],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.

        }, {
            //validator: PasswordValidation.MatchPassword // your validation method
        });

        this.bacSi=new BacSi();
        this.products[0].childrenChungChiKinhNghiem=this.bacSi.chungChi;
        this.products[1].childrenChungChiKinhNghiem=this.bacSi.kinhNghiem;
        this.products[2].childrenNN=this.bacSi.bacSiNgoaiNgu   ;



    }



    back() {
        this.router.navigate(['quanlybacsi/bacsi']);
    }


    resetForm(){


        // this.formBacSi.setValue({
        //     id:null,
        //     maGV: null,
        //     noiSinh: null,
        //     hoTen: null,
        //     queQuan: null,
        //     danToc: null,
        //     dienThoai: null,
        //     hocVi: null,
        //     chucVu: null,
        //     diaChi: null,
        //     donViCongTac: null,
        //
        //     ngaySinhDate:[new Date(1801,0,1)],
        //     gioiTinh:'true',
        //     email: null,
        // });
    }

    addNeweRow(key) {
        if(key==='1'){
            this.bacSi.chungChi.push(new ChungChiKinhNghiem());
        }else if(key==='2'){
            this.bacSi.kinhNghiem.push(new ChungChiKinhNghiem());
        }else{
            const bs=new BacSiNgoaiNgu();
            // bs.bacSiId=this.bacSi.id;
            this.bacSi.bacSiNgoaiNgu.push(bs);
        }
    }

    changeFileInput(event: any) {
        event.preventDefault();
        this.fileList=event.target.files;
    }
}
