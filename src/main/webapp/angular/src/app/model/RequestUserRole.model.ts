export class RequestUserRole{
 public roleId:number;
  public userId:number;
  public check:boolean;


  constructor(roleId: number, userId: number, check: boolean) {
    this.roleId = roleId;
    this.userId = userId;
    this.check = check;
  }
}
