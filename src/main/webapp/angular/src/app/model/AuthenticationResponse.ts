export class AuthenticationResponse{
    public jwt:string;
    public username:string;

    constructor(jwt: string, username: string) {
        this.jwt = jwt;
        this.username = username;
    }
}
