import {Component, ViewChild} from "@angular/core";
import {NguoiDungCTDTO} from "../../model/NguoiDungCTDTO.modet";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Role} from "../../model/Role.model";
import {NguoiDungService} from "../nguoi-dung/nguoi-dung.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

import {quyenHanService} from "./quyen-han.service";
import {RolePermission, RolePermissionDetaiList} from "../../model/RolePermission.model";
import {RequestRolePermission} from "../../model/RequestRolePermission.model";
import {IN, SUA, THEM, XEM, XOA} from "../../const/app.const";

declare const $: any;
@Component({
    selector:'app-quyen-han',
    templateUrl:'quyen-han.component.html',
    styleUrls:['quyen-han.component.css']
})
export  class  QuyenHanComponent{
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
    private roleName: string='';
    private rolesTemp: Role[]=[];
    private roleId: number;
    private isAdmin: boolean=false;
    private rolePopup: Role;

    rolePermissions :RolePermission[]=[];
    rolePermissionDetaiList :RolePermissionDetaiList[]=[];
    listChangePermission:RequestRolePermission[]=[];
    constructor(private quyenHanService:quyenHanService,
                private nguoiDungService:NguoiDungService,
                private modalService: NgbModal,
                private router:Router,
                private activateRouter:ActivatedRoute,
                private toastr:ToastrService)  {}
    ngOnInit() {

        this.headerRow = [ 'Tài khoản', 'Admin', 'Họ tên', 'Giới tính','Ngày sinh','Địa chỉ', 'So tiền', 'SDT','Email' ,'Acction','STT'];
        this.getAllRole();
        this.rolePermissions =[];
        this.rolePermissionDetaiList =[];


    }

    setPermissionDetail( id :number,rolename:string){
        this.quyenHanService.getAllPermission().subscribe(res=>{
            this.rolePermissions=res;
            this.rolePermissionDetaiList =[];
            let i=this.rolePermissions[0].permissionCode;
            let j=0;
            let per=new RolePermissionDetaiList();
            per.premissionName=this.rolePermissions[0].permissionName;
            this.rolePermissionDetaiList.push(per);
            this.rolePermissions.sort((a,b)=>{
                if(a.permissionCode>b.permissionCode){
                    return 1;
                }else if(a.permissionCode<b.permissionCode){
                    return -1
                }
                return 0;
            }).forEach(x=>{
                x.isCheck=false;
                x.isHide=false;
                if(i!==x.permissionCode){
                    i=x.permissionCode;
                    let per1=new RolePermissionDetaiList();
                    per1.premissionName=x.permissionName;
                    j++;
                    this.rolePermissionDetaiList.push(per1);
                }

                switch (x.permissionDetailName){
                    case XEM:
                        this.rolePermissionDetaiList[j].permissionXem=x;
                        break
                    case THEM:
                        this.rolePermissionDetaiList[j].permissionThem=x;
                        break
                    case SUA:
                        this.rolePermissionDetaiList[j].permissionSua=x;
                        break
                    case XOA:
                        this.rolePermissionDetaiList[j].permissionXoa=x;
                        break
                    case IN:
                        this.rolePermissionDetaiList[j].permissionIn=x;
                        break
                }
            })
            console.log(this.rolePermissions);
            console.log('==========================');
            console.log(this.rolePermissionDetaiList);

            this.quyenHanService.getPermissionByRoleId(id).subscribe(response=>{

                console.log(response);
                //this.roleName=response[0].roleName;
                response.forEach(x=>{
                    let i:RolePermissionDetaiList;
                    i=this.rolePermissionDetaiList.find(y=>y.premissionName===x.permissionName);
                    if(i){

                        switch (x.permissionDetailName){
                            case XEM:
                                i.permissionXem.isCheck=true;
                                break
                            case THEM:
                                i.permissionThem.isCheck=true;
                                break
                            case SUA:
                                i.permissionSua.isCheck=true;
                                break
                            case XOA:
                                i.permissionXoa.isCheck=true;
                                break
                            case IN:
                                i.permissionIn.isCheck=true;
                                break
                        }
                    }

                });
                if(rolename==='Admin'){
                    this.isAdmin=true;
                    this.rolePermissionDetaiList.forEach(x=>{
                        x.permissionSua.isCheck=true;
                        x.permissionXem.isCheck=true;
                        x.permissionIn.isCheck=true;
                        x.permissionXoa.isCheck=true;
                        x.permissionThem.isCheck=true;
                    })
                }else{
                    this.isAdmin=false;
                }

            })
        })

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


    onCloseAlert() {
        this.showAlert=false;
    }

    onDelete() {
        this.showAlert=false;
        if(this.roleId){
            this.quyenHanService.deleteRole(this.roleId).subscribe(resp=>{
                this.toastr.success("Xóa thành công");
                this.getAllRole();
                this.rolePermissionDetaiList=[];
                this.roleName='';
            },error =>{
                this.toastr.error("Xóa thất bại");
            })
        }
        console.log("DELETE");
    }

    deleteRole(roleId: number) {
        this.showAlert=true;
        this.roleId=roleId;
    }


    getAllRole(){
        this.nguoiDungService.getAllRole().subscribe(dataRole=>{

            dataRole.forEach(x=>x.check=false);
            this.roles=dataRole;
            // this.rolesTemp=this.roles.map(a=>Object.assign({},a));
            this.rolesTemp=this.roles.filter(x=>x);
        })
    }

    editRole(role: Role) {
        this.rolePopup=role;

        this.refModal=this.modalService.open(this.test,{
            size: 'lg',
            windowClass: 'width-80',
            backdrop: 'static'
        });


    }

    viewDetail(userId: number) {

    }

    closePopup() {
        this.refModal.close();
    }

    search() {

        this.rolesTemp=this.roles.filter(x=>x.roleName.includes(this.searchText?this.searchText:''));

    }

    new() {
        this.rolePopup=new Role(null,null);
        this.refModal=this.modalService.open(this.test,{
            size: 'lg',
            windowClass: 'width-80',
            backdrop: 'static'
        });
    }



    // saveRole() {
    //     if(this.listCheckRole.length>0){
    //         this.nguoiDungService.saveUserRole(this.listCheckRole).subscribe(data=>{
    //             this.toastr.success("Lưu thành công");
    //             this.listCheckRole=[];
    //             this.closePopup();
    //         },error => {
    //             this.toastr.error("Lưu thất bại");
    //         })
    //     }else{
    //         this.toastr.error("Không có gì thay đổi");
    //     }
    // }

    saveRole() {
        console.log(this.rolePopup);
        this.quyenHanService.saveRole(this.rolePopup).subscribe(data=>{
            this.toastr.success("Lưu thành công");
            this.closePopup();
            this.getAllRole();
        },error => {
            this.toastr.error("Lưu thất bại");
        });
    }

    editPermission(role: Role) {
        this.roleName=role.roleName;
        this.roleId=role.id;
        this.listChangePermission=[];
        this.setPermissionDetail(role.id,role.roleName);

    }

    checkItem(item:RolePermission){

        item.isCheck=!item.isCheck;
        console.log(item.isCheck);
        let i=this.listChangePermission.find(x=>x.permissionDetaiId===item.permissionDetailId);
        console.log("iiiii" + i)
        if(!i){
            this.listChangePermission.push(new RequestRolePermission(item.permissionDetailId,this.roleId,item.isCheck));
        }else{
            //let index=this.listChangePermission.findIndex(x=>x.permissionDetaiId===item.permissionDetailId);
            //console.log("index "+ index);
            this.listChangePermission=this.listChangePermission.filter(x=>x.permissionDetaiId!==item.permissionDetailId);
        }
        console.log(this.listChangePermission);


    }

    savePermission() {
        if(this.listChangePermission.length>0){
            let list=this.listChangePermission;
            this.quyenHanService.savePermissionRole(list).subscribe(res=>{
                if(res){
                    this.toastr.success("Lưu thành công");
                    this.listChangePermission=[];
                }else{
                    this.toastr.error("Đã có lỗi")
                }
            })
        }else{
            this.toastr.error("Không có sư thay đổi nào")
        }

    }

    getPermissionByRoleId(id:number){

    }

}
