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
import {IBieuHien} from "../model/httt-yte/BieuHien.model";
import {IResultChuanDoan} from "../model/httt-yte/ResultChuanDoan.model";



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
    /////////
    listOfData = [
        {
            id: 1,
            name: 'Benh A',
            age: 32,
            expand: false,
            address: '',
            description: 'Mô tả'
        },
        {
            id: 2,
            name: 'Benh B',
            age: 32,
            expand: false,
            address: '',
            description: 'Mô tả'
        },
        {
            id: 3,
            name: 'Benh C',
            age: 32,
            expand: false,
            address: '',
            description: 'Mô tả'
        },
    ];
    expandSet = new Set<number>();

    year: number;
    private monHoc: number;

    loading = false;



    customersTrue:{name:string,lua:boolean}[];
    displayModal: boolean;
    data1:any;
    rows: number;
    first: number;
    bieuHiens:IBieuHien[];
    bieuHienCheck: IBieuHien[]=[];
    resultChuanDoan:IResultChuanDoan[];

    constructor(private monHocService:MonHocService,
                private modalService: NgbModal,
                private router:Router,
                private activateRouter:ActivatedRoute,
                private toastr:ToastrService,
                private giangVienService:GiangVienService)  {}
    ngOnInit() {
        this.rows=10;
        this.first=0;
        // this.getPageMonHoc();
        this.page=1;
        this.itemsPerPage=10;
        this.getPageBieuHienDetails();
        this.displayModal=false;
        this.data1 = {
            labels: ['Biểu hiện 1','Biểu hiện 2'],
            datasets: [
                {
                    data: [70, 30],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        // "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        // "#FFCE56"
                    ]
                }]
        };

    }

    getPageBieuHienDetails(){
        console.log(this.page);
        this.giangVienService.getPageBieuHien({
            page:this.first,
            size:this.rows,
            sort:["id,asc","maBieuHien,asc"],
            search:this.searchText? this.searchText:''
        }).subscribe(data=>{
            this.bieuHiens=data.body;
            if(this.bieuHienCheck.length>0){
                this.bieuHienCheck.forEach((item)=>{
                    const index=this.bieuHiens.findIndex(x=>x.id===item.id);
                    if(index>=0){
                        this.bieuHiens[index]=item;
                    }
                })
            }
            console.log(data);
            this.totalItems=parseInt(data.headers.get('X-Total-Count'), 10);
            console.log(this.totalItems);
        },error => {
            // this.toastr.error("Không tìm thấy Giảng viên vào")
        })
    }

    onChangPage($event: any) {
        console.log($event);
        this.rows=$event.rows,
        this.first=Math.trunc($event.first/$event.rows),
        this.getPageBieuHienDetails();
    }



    onSearch() {
        console.log(this.searchText);
        this.getPageBieuHienDetails();
    }

    select(bieuHien: IBieuHien) {
        if(bieuHien.check){
            this.bieuHienCheck.push(bieuHien);
        }else{
            const index=this.bieuHienCheck.findIndex(x=>x.id===bieuHien.id);
            if(index>=0){
                this.bieuHienCheck.splice(index,1);
            }
        }
    }


    remove(bieuHien: IBieuHien,index:number) {
        this.bieuHienCheck.splice(index,1);
    }

    removeAll() {
        this.bieuHienCheck.forEach(x=>x.check=false);
        this.bieuHienCheck=[];
    }

    load() {
        const listId=this.bieuHienCheck.map(x=>x.id).sort((a, b)=>a-b);
        console.log(listId);

        if(listId.length>0){
            this.loading = true;
            this.giangVienService.getChuanDoan(listId).subscribe(resp=>{
                this.resultChuanDoan=resp.body;
                console.log(this.resultChuanDoan);

                this.resultChuanDoan.forEach(item=>{
                   item.dataChart= {
                                        labels: [`Tỷ lệ mắc ${item.tenBenhChiTiet}`,`Tỷ lệ không mắc ${item.tenBenhChiTiet}`],
                                        datasets: [
                                            {
                                                data: [item.phanTram, 100-item.phanTram],
                                                backgroundColor: [
                                                    "#ff6384",
                                                    "#2ed610",
                                                    // "#FFCE56"
                                                ],
                                                hoverBackgroundColor: [
                                                    "#c0032a",
                                                    "#1d8b05",
                                                    // "#FFCE56"
                                                ]
                                            }]
                                    };
                });
                this.loading = false;
                this.displayModal = true;

            });
        }

    }































    onExpandChange(id: number, checked: boolean): void {
        if (checked) {
            this.expandSet.add(id);
        } else {
            this.expandSet.delete(id);
        }
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
