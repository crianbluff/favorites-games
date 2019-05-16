export interface JwtResponse {
  dataUser: {
    id:number;
    username:string;
    accesToken:string;
    expiresIn:string;
  }
}
 