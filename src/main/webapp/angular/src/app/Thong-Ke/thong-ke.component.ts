import {Component, OnInit, ViewChild} from "@angular/core";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GiangVienService} from "../quanlygiangvien/giang-vien/giangvien.service";
import {ThongKeService} from "./thong-ke.service";
import {DoTuoiDTO} from "../model/DoTuoiDTO.Model";



// interface DataTable {
//     headerRow: string[];
//     dataRows: string[][];
// }

declare const $: any;
@Component({
    selector:'app-thong-ke',
    templateUrl:'thong-ke.component.html',
    styleUrls:['thong-ke.component.css']
})
export  class ThongKeComponent implements OnInit{
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
    idMonHoc:number;

    listThongKe:DoTuoiDTO[]=[];

    year: number=new Date().getFullYear();

    constructor(private thongKeService:ThongKeService,
                private modalService: NgbModal,
                private router:Router,
                private activateRouter:ActivatedRoute,
                private toastr:ToastrService,
                private giangVienService:GiangVienService)  {}
    ngOnInit() {

         this.headerRow = [ 'Stt', 'Nhóm tuổi', 'Số lượng Gv', 'Tổng số tiết','Số tiết TB'];
        // this.getPageMonHoc();


    }
    getPageMonHoc(){
        this.thongKeService.getNhomTuoi({
            nam:this.year
        }).subscribe(data=>{
            this.listThongKe=data.body;
           console.log(this.listThongKe);
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


    search() {
        this.getPageMonHoc();
    }
}
