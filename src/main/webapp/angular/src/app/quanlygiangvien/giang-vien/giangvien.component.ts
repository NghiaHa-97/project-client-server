// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation
import { ViewChild, OnDestroy, AfterViewInit, Component, OnInit } from '@angular/core';
import { GiangVienService } from './giangvien.service';
import { GiangVien } from '../../model/GiangVien';
import { Observable, Subject  } from 'rxjs'; 
import { Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from "ngx-toastr";


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

    constructor(private giangvienService:GiangVienService, private router: Router, private activateRouter:ActivatedRoute, private toastr:ToastrService){}


    public headerRow:string[];
    public giangvienList: GiangVien[]=[];
    public dataTable: DataTable;
    @ViewChild('test') test;
    public totalItems: number;
    public page: number=1;
    public itemsPerPage: number =10;
    searchText: string;
    isDelete:boolean;
    showAlert: boolean=false;
    idUserDelete:number;
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
            console.log(data);
            console.log("data: ",data.body);
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
}
