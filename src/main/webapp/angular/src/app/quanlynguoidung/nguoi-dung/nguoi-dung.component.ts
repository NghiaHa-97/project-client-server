import {Component, OnInit, ViewChild} from "@angular/core";
import {NguoiDungCTDTO} from "../../model/NguoiDungCTDTO.modet";
import {NguoiDungService} from "./nguoi-dung.service";
import * as moment from "moment";
import {DDMMYYYY} from "../../const/app.const";
import {filter, map, tap} from "rxjs/operators";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Role} from "../../model/Role.model";
import {RequestUserRole} from "../../model/RequestUserRole.model";



// interface DataTable {
//     headerRow: string[];
//     dataRows: string[][];
// }

declare const $: any;
@Component({
    selector:'app-nguoi-dung',
    templateUrl:'./nguoi-dung.component.html',
    styleUrls:['./nguoi-dung.component.css']
})
export  class NguoiDungComponent implements OnInit{
    // public dataTable: DataTable={
    //     headerRow:[]=[],
    //     dataRows:[]=[]
    // };
    @ViewChild('test') test;
    public totalItems: number;
    public page: number=1;
    public itemsPerPage: number =10;
    public nguoiDungCts:NguoiDungCTDTO[]=[];
    public headerRow:string[];
    message:string="Bạn có muốn xóa người dùng này";
    isDelete:boolean;
    showAlert: boolean=false;
    refModal:NgbModalRef;
    searchText: string;
    idUserDelete:number;
    private roles: Role[]=[];
    private userName: string='';
    private rolesTemp: Role[]=[];
    private rolesById: Role[]=[];
    private listCheckRole: RequestUserRole[]=[];
    private userId: number;
    constructor(private nguoiDungService:NguoiDungService,
                private modalService: NgbModal,
                private router:Router,
                private activateRouter:ActivatedRoute,
                private toastr:ToastrService)  {}
    ngOnInit() {

         this.headerRow = [ 'Tài khoản', 'Admin', 'Họ tên', 'Giới tính','Ngày sinh','Địa chỉ', 'So tiền', 'SDT','Email' ,'Acction','STT'];
        this.getPageUserDetails();
        this.getAllRole();


    }
    getPageUserDetails(){
        this.nguoiDungService.getAllUserDetails({
            page:this.page-1,
            size:this.itemsPerPage,
            sort:["userId,asc","userDetailId,asc"],
            search:this.searchText? this.searchText:''
        }).pipe(
            map((x)=>{
                x.body.forEach(i=>{
                    i.nngaySinhFormat=moment(i.ngaySinh).format(DDMMYYYY);
                });
                return x;
            })).subscribe(data=>{
            this.nguoiDungCts=data.body;
            console.log(data);
            console.log(parseInt(data.headers.get('X-Total-Count'), 10))
            this.totalItems=parseInt(data.headers.get('X-Total-Count'), 10);
        })
    }

    loadPage(page: any) {
        this.getPageUserDetails();
    }

    selectedItemPerPage() {
        this.getPageUserDetails();
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


            $('#datatablesRole').DataTable({
                "scrollX": true,
                "scrollY": 270,
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


    onCloseAlert() {
        this.showAlert=false;
    }

    onDelete() {
        this.showAlert=false;
        if(this.idUserDelete){
            this.nguoiDungService.deleteById(this.idUserDelete).subscribe(resp=>{
                this.toastr.success("Xóa thành công");
                this.getPageUserDetails();
            },error =>{
                this.toastr.success("Xóa thất bại");
            })
        }
        console.log("DELETE");
    }

    deleteUser(userId: number, userDetailId: number) {
        this.showAlert=true;
        this.idUserDelete=userId;
    }


    getAllRole(){
        this.nguoiDungService.getAllRole().subscribe(dataRole=>{

            dataRole.forEach(x=>x.check=false);
            this.roles=dataRole;
            this.rolesTemp=this.roles.map(a=>Object.assign({},a));
        })
    }

    editRole(userId: number,userName:string) {
        console.log(this.roles);
        this.rolesTemp=[];
        this.rolesTemp=this.roles.map(a=>Object.assign({},a));
        this.userName='';
        this.userName= "của tài khoản "+(userName ? userName:'...');
        this.userId=userId
        if(userId){
            this.nguoiDungService.getAllRoleById(userId).subscribe(response=>{

                if(response.body[0]!=null){
                    response.body.forEach(x=>{
                        this.rolesTemp.find(i=>i.id===x.id).check=true;
                    })
                }

            },error => {
                this.toastr.error("Đã có lỗi không tải được role");
            })
        }


        this.refModal=this.modalService.open(this.test,{
            size: 'lg',
            windowClass: 'width-80',
            backdrop: 'static'
        });

        $('#datatablesAddRole').DataTable({
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

    viewDetail(userId: number) {
        this.router.navigate(["update",userId],{relativeTo:this.activateRouter});
    }

    closePopup() {
        this.refModal.close();
    }

    search() {
        this.page=1;
        this.getPageUserDetails();
    }

    new() {
        this.router.navigate(['new'],{relativeTo:this.activateRouter});
    }

    getRoleByUserId(userId: number,userName:string) {
        this.rolesById=[];
        this.userName='';
        this.userName= "của tài khoản "+(userName ? userName:'...');
        if(userId){
            this.nguoiDungService.getAllRoleById(userId).subscribe(response=>{
                this.rolesById=response.body;
            },error => {
                this.toastr.error("Đã có lỗi không tải được role");
            })
        }

    }


    changeRole(item: Role) {

        if(this.userId){
            let id= this.userId;
            item.check=!item.check;
            if(this.listCheckRole.length===0){
                this.listCheckRole.push(new RequestUserRole(item.id,id,item.check));
            }else{
                if(this.listCheckRole.filter(x=>x.roleId===item.id).length>0){
                    this.listCheckRole=this.listCheckRole.filter(x=>x.roleId!==item.id);
                }else{
                    this.listCheckRole.push(new RequestUserRole(item.id,id,item.check));
                }
            }
            console.log(this.listCheckRole);
        }

    }

    saveRole() {
        if(this.listCheckRole.length>0){
            this.nguoiDungService.saveUserRole(this.listCheckRole).subscribe(data=>{
                this.toastr.success("Lưu thành công");
                this.listCheckRole=[];
                this.getPageUserDetails();
                this.closePopup();
            },error => {
                this.toastr.error("Lưu thất bại");
            })
        }else{
            this.toastr.error("Không có gì thay đổi");
        }
    }
}
