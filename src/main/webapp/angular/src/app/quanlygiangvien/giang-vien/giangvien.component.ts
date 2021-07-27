// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation
import { ViewChild, OnDestroy, AfterViewInit, Component, OnInit } from '@angular/core';
import { GiangVienService } from './giangvien.service';
import { GiangVien } from '../../model/GiangVien';
import { Observable, Subject  } from 'rxjs'; 
import { Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {NgoaiNgu} from '../../model/NgoaiNgu';
import { QTNN } from 'src/app/model/QTNN';
import {TreeNodeInterface} from "./giangvien-update.component";
import {BacSi} from "../../model/httt-yte/BacSi.model";


declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-data-table-cmp',
    templateUrl: './giangvien.component.html',
    styleUrls:['./giangvien.component.css']
})

export class GiangVienComponent implements OnInit, AfterViewInit {
    private ngoaiNgus: NgoaiNgu[];

    constructor(private giangvienService:GiangVienService, private router: Router, private activateRouter:ActivatedRoute, private toastr:ToastrService,
        private modalService: NgbModal){}

    @ViewChild('test') test;
    public headerRow:string[];
    public giangvienList: GiangVien[]=[];
    public ngoainguList: NgoaiNgu[]=[];
    public ngoainguTemp: NgoaiNgu;
    public QTNN: QTNN;
    public dataTable: DataTable;
    public totalItems: number;
    public page: number=1;
    public itemsPerPage: number =8;
    searchText: string;
    isDelete:boolean;
    showAlert: boolean=false;
    refModal:NgbModalRef;
    idUserDelete:number;
    private giangvienId: number;
    private namegiangvien: string;
    message:string= "Bạn có chắc chắn muốn xóa";
    displayModal:boolean;

    listBacSi:BacSi[];
    bacSiModal:BacSi;
    isNoEdit:boolean;

    ngOnInit() {
        if(this.router.url.includes('thong-tin-bac-si')){
            this.isNoEdit=true;
        }
        // this.headerRow= [ 'Mã GV', 'Họ Tên', 'Giới Tính', 'Email', 'Ngày Sinh', 'Nơi Sinh', 'Dân Tộc', 'Học Vị','Chức Vụ', 'Số Điện Thoai', 'Action' ],
        this.getPageUserDetails();
        this.displayModal=false;

        this.giangvienService.getAllNN().subscribe(x=>{
            this.ngoaiNgus=x.body;
        })


    }

    getNameEnglish(id){
        const i=this.ngoaiNgus.find(x=>x.id===id);
        return i ? i.tenNgoaiNgu: null;

    }

    showModal(id:number) {

        this.giangvienService.getOneBacSi(id).subscribe((resp)=>{
            console.log(resp.body);
            this.bacSiModal=resp.body;
            console.log(this.bacSiModal);
        })
        this.displayModal=true;
    }

    getPageUserDetails(){
        console.log(this.page);
        this.giangvienService.getAllBacSi({
            page:this.page-1,
            size:this.itemsPerPage,
            sort:["id,asc","maBS,asc"],
            search:this.searchText? this.searchText:''
        }).subscribe(data=>{
            this.listBacSi=data.body;
            this.totalItems=parseInt(data.headers.get('X-Total-Count'), 10);
        },error => {
            // this.toastr.error("Không tìm thấy Giảng viên vào")
        })
    }

    newArr(lenght: number): any[] {
        if (lenght > 0) {
            return new Array(lenght);
        } else {
            return new Array(0);
        }
    }

    loadPage(page: any) {
        this.getPageUserDetails();
    }

    selectedItemPerPage() {
        this.getPageUserDetails();
    }

    ngAfterViewInit() {
        $(document).ready(function() {

            $('.card .material-datatables label').addClass('form-group');
        })
    }


    new = function() {
        this.router.navigate(['new'],{relativeTo:this.activateRouter});
    }

    search = function (event) {
        this.page=1;
        this.getPageUserDetails();
    }

    editgiangvien = function(id: any) {
        this.router.navigate(['update',id],{relativeTo:this.activateRouter});
    }

    onCloseAlert() {
        this.showAlert=false;
    }

    onDelete = function() {
        this.showAlert=false;
        if (this.idUserDelete) {
            this.giangvienService.deleteGiangVien(this.idUserDelete).subscribe( data => {
                this.toastr.success("Xóa thành công");
                this.getPageUserDetails();
            },error =>{
                this.toastr.success("Xóa thất bại");
            })
        } 
    }


    deletegiangvien(userId: number) {
        this.showAlert=true;
        this.idUserDelete=userId;
    }


    addNgoaingu(id: number, hoten: string) {
        this.namegiangvien = hoten;
        this.giangvienId = id;
        if (id) {
            this.giangvienService.getQTNN_NearestDayByGiangVienId(id).subscribe(response => {
                this.QTNN = response;
                if (this.QTNN) {
                    this.giangvienService.getAllNgoaiNgu().subscribe(response => {
                        this.ngoainguList = response;
                        if (response != null) {
                            response.forEach(element => {
                                if (element.id == this.QTNN.ngoaiNguId) {
                                    element.check = true;
                                }
                            });                             
                        }
                    })
                }
            },error => {
                if (error.status == 404) {
                    this.giangvienService.getAllNgoaiNgu().subscribe(response => {
                        this.ngoainguList = response;
                        this.ngoainguList.forEach(x=>x.check=false);
                    })
                } else if (error.status == 400) {
                    this.toastr.error("Đã có lỗi");
                }
            })
        }



        this.refModal=this.modalService.open(this.test,{
            size: 'lg',
            windowClass: 'width-80',
            backdrop: 'static'
        });



    }

    changeNgoaiNgu(item: NgoaiNgu) {
        this.QTNN = new QTNN(item.id, new Date(), this.giangvienId);
    }

    saveNgoaiNgu() {
        this.giangvienService.saveQuaTrinhNgoaiNgu(this.QTNN).subscribe(
            response=>{
                this.toastr.success("Lưu thành công");
                this.QTNN = {} as QTNN;
                this.getPageUserDetails();
                this.closePopup();
            },
            error => {
                this.toastr.error("Lưu thất bại");
        });
    }

    closePopup() {
        this.refModal.close();
    }


    changPage(event) {
        this.page=event.page+1;
        this.getPageUserDetails();
    }

    editBacSi(id: number) {
        this.router.navigate(['update',id],{relativeTo:this.activateRouter});
    }
}
