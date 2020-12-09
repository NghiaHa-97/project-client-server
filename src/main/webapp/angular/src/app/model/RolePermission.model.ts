export class RolePermission{
  public  id:number;
  public  roleName:string;
  public  permissionId:number;
  public  permissionName:string;
  public  permissionCode:string;
  public  permissionDetailId:number;
  public  permissionDetailCode:string;
  public  permissionDetailName:string;
  public  isCheck:boolean;
  public  isHide:boolean;


  constructor(isHide: boolean,isCheck :boolean) {
    this.isHide = isHide;
    this.isCheck = isCheck;

  }
}

export class RolePermissionDetaiList{
  public  premissionName:string;
  public  permissionXem:RolePermission;
  public  permissionSua:RolePermission;
  public  permissionThem:RolePermission;
  public  permissionXoa:RolePermission;
  public  permissionIn:RolePermission;


  constructor() {
    this.permissionXem=new RolePermission(true,false);
    this.permissionSua=new RolePermission(true,false);
    this.permissionThem=new RolePermission(true,false);
    this.permissionXoa=new RolePermission(true,false);
    this.permissionIn=new RolePermission(true,false);
  }
}
