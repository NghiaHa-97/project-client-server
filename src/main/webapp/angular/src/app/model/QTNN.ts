

export class QTNN {
    id:number;
    ngoaiNguId: number;
    ngayKhaiBoSung: Date;
    giangVienId: number;

    constructor(ngoaiNguId: number, ngayKhaiBoSung: Date, giangVienId: number) {
        this.ngoaiNguId = ngoaiNguId;
        this.ngayKhaiBoSung = ngayKhaiBoSung;
        this.giangVienId = giangVienId;
      }
}