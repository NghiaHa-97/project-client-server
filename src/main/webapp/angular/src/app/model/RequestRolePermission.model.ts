export class RequestRolePermission{
  permissionDetaiId : number;
  roleId:number;
  isCheck:boolean

  constructor(permissionDetaiId: number, roleId: number,isCheck:boolean) {
    this.permissionDetaiId = permissionDetaiId;
    this.roleId = roleId;
    this.isCheck = isCheck;
  }
}
