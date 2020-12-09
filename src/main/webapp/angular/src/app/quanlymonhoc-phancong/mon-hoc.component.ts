import {Component, OnInit, ViewChild} from "@angular/core";
import {MonHocService} from "./mon-hoc.service";
import * as moment from "moment";
import {filter, map, tap} from "rxjs/operators";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MonHoc} from "../model/MonHoc.model";



// interface DataTable {
//     headerRow: string[];
//     dataRows: string[][];
// }

declare const $: any;
@Component({
    selector:'app-nguoi-dung',
    templateUrl:'./mon-hoc.component.html',
    styleUrls:['./mon-hoc.component.css']
})
export  class MonHocComponent implements OnInit{
    // public dataTable: DataTable={
    //     headerRow:[]=[],
    //     dataRows:[]=[]
    // };
    @ViewChild('test') test;
    public totalItems: number;
    public page: number=1;
    public itemsPerPage: number =10;
    public headerRow:string[];
    message:string="Bạn có muốn xóa môn học này";
    isDelete:boolean;
    showAlert: boolean=false;
    refModal:NgbModalRef;
    searchText: string;
    idMonHoc:number;
    private userName: string='';
    private userId: number;

    lsitMonHoc:MonHoc[]=[];

    constructor(private monHocService:MonHocService,
                private modalService: NgbModal,
                private router:Router,
                private activateRouter:ActivatedRoute,
                private toastr:ToastrService)  {}
    ngOnInit() {

         this.headerRow = [ 'Mã môn học', 'Tên môn học', 'Số tín chỉ', 'Số tiết học giảng dậy','Acction','STT'];
        this.getPageMonHoc();



    }
    getPageMonHoc(){
        this.monHocService.getAllMonHoc({
            page:this.page-1,
            size:this.itemsPerPage,
            sort:["id,asc","mamonhoc,asc"],
            search:this.searchText? this.searchText:''
        }).subscribe(data=>{
            this.lsitMonHoc=data.body;
            console.log(data);
            console.log(parseInt(data.headers.get('X-Total-Count'), 10))
            this.totalItems=parseInt(data.headers.get('X-Total-Count'), 10);
        })
    }

    loadPage(page: any) {
        this.getPageMonHoc();
    }

    selectedItemPerPage() {
        this.getPageMonHoc();
    }

    newArr(lenght: number): any[] {
        if (lenght > 0) {
            return new Array(lenght);
        } else {
            return new Array(0);
        }
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


            // $('#datatablesRole').DataTable({
            //     "scrollX": true,
            //     "scrollY": 270,
            //     "bPaginate": false,
            //     "bSort": false,
            //     responsive: true,
            //     "bLengthChange": false,
            //     "bFilter": false,
            //     "bInfo": true,
            //     "bAutoWidth": true,
            //     "bSearching": false,
            //     "language": {
            //         "decimal":        "",
            //         "emptyTable":     "",
            //         "info":           "",
            //         "infoEmpty":      "",
            //         "infoFiltered":   "",
            //         "infoPostFix":    "",
            //         "thousands":      ",",
            //         "lengthMenu":     "",
            //         "loadingRecords": "Loading...",
            //         "processing":     "Processing...",
            //         "search":         "Search:",
            //         "zeroRecords":    "",
            //         "paginate": {
            //             "first":      "First",
            //             "last":       "Last",
            //             "next":       "Next",
            //             "previous":   "Previous"
            //         },
            //         "aria": {
            //             "sortAscending":  ": activate to sort column ascending",
            //             "sortDescending": ": activate to sort column descending"
            //         }
            //     }
            // });



            $('.card .material-datatables label').addClass('form-group');
        })
    }


    onCloseAlert() {
        this.showAlert=false;
    }

    onDelete() {
        this.showAlert=false;
        if(this.idMonHoc){
            this.monHocService.deleteById(this.idMonHoc).subscribe(resp=>{
                this.toastr.success("Xóa thành công");
                this.getPageMonHoc();
            },error =>{
                this.toastr.error("Xóa thất bại");
            })
        }
        console.log("DELETE");
    }

    deleteMonHoc(idMonHoc: number) {
        this.showAlert=true;
        this.idMonHoc=idMonHoc;
    }


    getAllRole(){
        // this.nguoiDungService.getAllRole().subscribe(dataRole=>{
        //
        //     dataRole.forEach(x=>x.check=false);
        //     this.roles=dataRole;
        //     this.rolesTemp=this.roles.map(a=>Object.assign({},a));
        // })
    }

    editRole(userId: number,userName:string) {
        // console.log(this.roles);
        // this.rolesTemp=[];
        // this.rolesTemp=this.roles.map(a=>Object.assign({},a));
        // this.userName='';
        // this.userName= "của tài khoản "+(userName ? userName:'...');
        // this.userId=userId
        // if(userId){
        //     this.nguoiDungService.getAllRoleById(userId).subscribe(response=>{
        //
        //         if(response.body[0]!=null){
        //             response.body.forEach(x=>{
        //                 this.rolesTemp.find(i=>i.id===x.id).check=true;
        //             })
        //         }
        //
        //     },error => {
        //         this.toastr.error("Đã có lỗi không tải được role");
        //     })
        // }
        //
        //
        // this.refModal=this.modalService.open(this.test,{
        //     size: 'lg',
        //     windowClass: 'width-80',
        //     backdrop: 'static'
        // });
        //
        // $('#datatablesAddRole').DataTable({
        //     "scrollX": true,
        //     "scrollY": 300,
        //     "bPaginate": false,
        //     "bSort": false,
        //     responsive: true,
        //     "bLengthChange": false,
        //     "bFilter": false,
        //     "bInfo": true,
        //     "bAutoWidth": false,
        //     "bSearching": false,
        //     "language": {
        //         "decimal":        "",
        //         "emptyTable":     "",
        //         "info":           "",
        //         "infoEmpty":      "",
        //         "infoFiltered":   "",
        //         "infoPostFix":    "",
        //         "thousands":      ",",
        //         "lengthMenu":     "",
        //         "loadingRecords": "Loading...",
        //         "processing":     "Processing...",
        //         "search":         "Search:",
        //         "zeroRecords":    "",
        //         "paginate": {
        //             "first":      "First",
        //             "last":       "Last",
        //             "next":       "Next",
        //             "previous":   "Previous"
        //         },
        //         "aria": {
        //             "sortAscending":  ": activate to sort column ascending",
        //             "sortDescending": ": activate to sort column descending"
        //         }
        //     }
        // });

    }

    viewDetail(monHocId: number) {
        this.router.navigate(["monhoc/update",monHocId],{relativeTo:this.activateRouter});
    }

    closePopup() {
        this.refModal.close();
    }

    search() {
        this.page=1;
        this.getPageMonHoc();
    }

    new() {
        this.router.navigate(['new'],{relativeTo:this.activateRouter});
    }

    getRoleByUserId(userId: number,userName:string) {
        // this.rolesById=[];
        // this.userName='';
        // this.userName= "của tài khoản "+(userName ? userName:'...');
        // if(userId){
        //     this.nguoiDungService.getAllRoleById(userId).subscribe(response=>{
        //         this.rolesById=response.body;
        //     },error => {
        //         this.toastr.error("Đã có lỗi không tải được role");
        //     })
        // }

    }


    changeRole(item: any) {

        // if(this.userId){
        //     let id= this.userId;
        //     item.check=!item.check;
        //     if(this.listCheckRole.length===0){
        //         this.listCheckRole.push(new RequestUserRole(item.id,id,item.check));
        //     }else{
        //         if(this.listCheckRole.filter(x=>x.roleId===item.id).length>0){
        //             this.listCheckRole=this.listCheckRole.filter(x=>x.roleId!==item.id);
        //         }else{
        //             this.listCheckRole.push(new RequestUserRole(item.id,id,item.check));
        //         }
        //     }
        //     console.log(this.listCheckRole);
        // }

    }

    saveRole() {
        // if(this.listCheckRole.length>0){
        //     this.nguoiDungService.saveUserRole(this.listCheckRole).subscribe(data=>{
        //         this.toastr.success("Lưu thành công");
        //         this.listCheckRole=[];
        //         this.getPageUserDetails();
        //         this.closePopup();
        //     },error => {
        //         this.toastr.error("Lưu thất bại");
        //     })
        // }else{
        //     this.toastr.error("Không có gì thay đổi");
        // }
    }
}
