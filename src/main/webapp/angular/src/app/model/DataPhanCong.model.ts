export interface DataPhanCong{
    giangVienId:number;
    monHocId:number;
    namHoc:number;

}
export  class DataPhanCongModel implements DataPhanCong{
    giangVienId: number;
    monHocId: number;
    namHoc: number;

    constructor(giangVienid,monHocId,namHoc) {
        this.giangVienId=giangVienid;
        this.monHocId=monHocId;
        this.namHoc=namHoc;
    }
}
