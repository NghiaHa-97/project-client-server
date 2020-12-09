import {Component, OnInit, ViewChild} from "@angular/core";
import {MonHocService} from "./mon-hoc.service";
import * as moment from "moment";
import {filter, map, tap} from "rxjs/operators";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MonHoc} from "../model/MonHoc.model";
import {GiangVienService} from "../quanlygiangvien/giang-vien/giangvien.service";
import {GiangVienPhanCongDTO} from "../model/GiangVienPhanCongDTO.model";
import {DataPhanCong, DataPhanCongModel} from "../model/DataPhanCong.model";



// interface DataTable {
//     headerRow: string[];
//     dataRows: string[][];
// }

declare const $: any;
@Component({
    selector:'app-mon-hoc',
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
    public totalItemsPc: number;
    public page: number=1;
    public pagePc: number=1;
    public itemsPerPage: number =10;
    public itemsPerPagePc: number =10;
    public headerRow:string[];
    message:string="Bạn có muốn xóa môn học này";
    isDelete:boolean;
    showAlert: boolean=false;
    refModal:NgbModalRef;
    searchText: string;
    searchGvPc: string;
    idMonHoc:number;
    private userName: string='';
    private userId: number;
    giangVienPhanCongDTOS:GiangVienPhanCongDTO[];
    giangVienPhanCongDTOSCopy:GiangVienPhanCongDTO[]=[];
    listRequest:GiangVienPhanCongDTO[]=[];

    lsitMonHoc:MonHoc[]=[];

    year: number;
    private monHoc: number;

    constructor(private monHocService:MonHocService,
                private modalService: NgbModal,
                private router:Router,
                private activateRouter:ActivatedRoute,
                private toastr:ToastrService,
                private giangVienService:GiangVienService)  {}
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
            // console.log(data);
            // console.log(parseInt(data.headers.get('X-Total-Count'), 10))
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

    openPhanCong(id:number) {
        this.monHoc=id;
        this.giangVienPhanCongDTOS=[];
        this.giangVienPhanCongDTOSCopy=[];
        this.pagePc=1;
        this.itemsPerPagePc=10;
        this.year=new Date().getFullYear();

        this.refModal=this.modalService.open(this.test,{
            size: 'lg',
            windowClass: 'width-80',
            backdrop: 'static'
        });

        $('#datatablesAddPhanCong').DataTable({
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
        this.monHocService.getGVDcPhanCongMonHocId({idMonHoc:this.monHoc,namHoc:this.year}).subscribe(data=>{
            this.giangVienPhanCongDTOSCopy=data.body;
            this.giangVienPhanCongDTOSCopy.forEach(x=>x.isCheck=true);
            this.listRequest=data.body;
            this.listRequest.forEach(x=>x.isCheck=true);
            console.log(this.giangVienPhanCongDTOSCopy);
            this.getPageGVPhanCong();
        })



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
        this.router.navigate(['monhoc/new'],{relativeTo:this.activateRouter});
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


    changeGvPhanCong(item: GiangVienPhanCongDTO) {

        item.isCheck=!item.isCheck;
        if(item.isCheck){
            this.giangVienPhanCongDTOSCopy.push(item);
            console.log(this.giangVienPhanCongDTOSCopy);

        }else{
            this.giangVienPhanCongDTOSCopy=this.giangVienPhanCongDTOSCopy.filter(x=>x.id!==item.id);
            console.log(this.giangVienPhanCongDTOSCopy);
        }


    }

    savePhanCong() {
        if(this.giangVienPhanCongDTOSCopy.length<=2){
            let requestPc:DataPhanCongModel[]=[];

             this.giangVienPhanCongDTOSCopy.forEach(x=>{
                 requestPc.push(new DataPhanCongModel(x.id,this.monHoc,this.year));
            })
            this.monHocService.savePhanCong(requestPc).subscribe(data=>{

                this.toastr.success("Lưu thành công");
                // this.listCheckRole=[];
                // this.getPageUserDetails();
                this.closePopup();
                this.monHoc=null;
                this.giangVienPhanCongDTOSCopy=[];
                this.listRequest=[];
            },error => {
                this.toastr.error("Lưu thất bại");
            })
        }else{
            this.toastr.error("Số giảng viên không được lớn hớn 2");
        }
    }

    selectedItemPerPagePc() {
        this.getPageGVPhanCong()
    }

    loadPageGVPc() {
        this.getPageGVPhanCong()
    }

    private getPageGVPhanCong() {
        this.giangVienService.getPageGiangVienPhanBo({
            page:this.pagePc-1,
            size:this.itemsPerPagePc,
            sort:["id,asc"],
            search:this.searchGvPc? this.searchGvPc:''
        }).subscribe(response=>{
            this.giangVienPhanCongDTOS=response.body;
            console.log(parseInt(response.headers.get('X-Total-Count'), 10))
            this.totalItemsPc=parseInt(response.headers.get('X-Total-Count'), 10);
            let temp;
            this.giangVienPhanCongDTOS.forEach(x=>{
                temp=this.giangVienPhanCongDTOSCopy.find(i=>i.id===x.id);
                if(temp){
                    x.isCheck=temp.isCheck;
                }
            })
            // this.giangVienPhanCongDTOSCopy= this.giangVienPhanCongDTOS.map(a=>Object.assign({},a));

        },error => {
            this.toastr.error("Không tìm đc giảng viên.")
        })
    }

    searchGvPhanCong() {
        this.pagePc=1;
        this.getPageGVPhanCong();
    }

    getDataPc() {
        this.giangVienPhanCongDTOSCopy=[];
        this.listRequest=[];
        this.giangVienPhanCongDTOS.forEach(x=>x.isCheck=false);
        this.monHocService.getGVDcPhanCongMonHocId({idMonHoc:this.monHoc,namHoc:this.year}).subscribe(data=>{
            this.giangVienPhanCongDTOSCopy=data.body;
            this.giangVienPhanCongDTOSCopy.forEach(x=>x.isCheck=true);
            this.listRequest=data.body;
            this.listRequest.forEach(x=>x.isCheck=true);
            console.log(this.giangVienPhanCongDTOSCopy);
            let temp;
            this.giangVienPhanCongDTOS.forEach(x=>{
                temp=this.giangVienPhanCongDTOSCopy.find(i=>i.id===x.id);
                if(temp){
                    x.isCheck=temp.isCheck;
                }
            })
        })
    }
}
