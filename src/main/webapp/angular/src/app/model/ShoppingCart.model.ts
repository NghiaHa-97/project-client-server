export interface ShoppingCartModel{
    idSp:number;
    soLuong:number;
}

export class ShoppingCart implements ShoppingCartModel{
    idSp: number;
    soLuong: number;

    constructor(idSp: number, soLuong: number) {
        this.idSp = idSp;
        this.soLuong = soLuong;
    }
}
