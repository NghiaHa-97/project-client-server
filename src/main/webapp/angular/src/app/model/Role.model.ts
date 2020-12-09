export class Role{
  public id:number;
  public roleName:string;
  public check:boolean;

  constructor(id: number, roleName: string) {
    this.id = id;
    this.roleName = roleName;
  }
}
