

export class NgoaiNgu{
    public  id:number;
    public tenNgoaiNgu:string;
    constructor() {
    }
}

export class BacSiNgoaiNgu{
    public  id:number;
    public  ngoaiNguId:number;
    public bacSiId:number;
    public ngoaiNgu:NgoaiNgu;
    // public tenNgoaiNgu:string;
    constructor() {
    }
}
