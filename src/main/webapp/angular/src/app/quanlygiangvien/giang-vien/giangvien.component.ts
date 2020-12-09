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
    public itemsPerPage: number =10;
    searchText: string;
    isDelete:boolean;
    showAlert: boolean=false;
    refModal:NgbModalRef;
    idUserDelete:number;
    private giangvienId: number;
    private namegiangvien: string;
    message:string= "Bạn có chắc chắn muốn xóa";
    ngOnInit() {
        this.headerRow= [ 'Mã GV', 'Họ Tên', 'Giới Tính', 'Email', 'Ngày Sinh', 'Nơi Sinh', 'Dân Tộc', 'Học Vị','Chức Vụ', 'Số Điện Thoai', 'Action' ],
        this.getPageUserDetails();


    }

    getPageUserDetails(){
        this.giangvienService.getAllGiangVien({
            page:this.page-1,
            size:this.itemsPerPage,
            sort:["giangvienId,asc","maGV,asc"],
            search:this.searchText? this.searchText:''
        }).subscribe(data=>{
            this.giangvienList=data.body;
            this.totalItems=parseInt(data.headers.get('X-Total-Count'), 10);
        },error => {
            this.toastr.error("Không tìm thấy Giảng viên vào")
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
            $('#datatables').DataTable({
                "scrollX": true,
                "scrollY": 470,
                "bPaginate": false,
                "bSort": false,
                responsive: true,
                "bLengthChange": false,
                "bFilter": false,
                "bInfo": true,
                "bAutoWidth": true,
                "bSearching": false,
                "language": {
                    "decimal":        "",
                    "emptyTable":     "",
                    "info":           "",
                    "infoEmpty":      "",
                    "infoFiltered":   "",
                    "infoPostFix":    "",
                    "thousands":      ",",
                    "lengthMenu":     "",
                    "loadingRecords": "Loading...",
                    "processing":     "Processing...",
                    "search":         "Search:",
                    "zeroRecords":    "",
                    "paginate": {
                        "first":      "First",
                        "last":       "Last",
                        "next":       "Next",
                        "previous":   "Previous"
                    },
                    "aria": {
                        "sortAscending":  ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    }
                }
            });
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

        $('#datatablesAddNgoaiNgu').DataTable({
            "scrollX": true,
            "scrollY": 300,
            "bPaginate": false,
            "bSort": false,
            responsive: true,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": true,
            "bAutoWidth": false,
            "bSearching": false,
            "language": {
                "decimal":        "",
                "emptyTable":     "",
                "info":           "",
                "infoEmpty":      "",
                "infoFiltered":   "",
                "infoPostFix":    "",
                "thousands":      ",",
                "lengthMenu":     "",
                "loadingRecords": "Loading...",
                "processing":     "Processing...",
                "search":         "Search:",
                "zeroRecords":    "",
                "paginate": {
                    "first":      "First",
                    "last":       "Last",
                    "next":       "Next",
                    "previous":   "Previous"
                },
                "aria": {
                    "sortAscending":  ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            }
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
}
