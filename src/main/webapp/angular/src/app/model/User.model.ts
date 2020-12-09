export class User{
  public id:number;
  public userName:string;
  public admin:boolean;
  public password : string;


  constructor(username: string, password: string) {
    this.userName = username;
    this.password = password;
  }

}
