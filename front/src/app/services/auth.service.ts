import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { JwtResponse } from '../models/JwtResponse';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject} from 'rxjs';

@Injectable()
export class AuthService {

  AUTH_SERVER:string = 'http://localhost:3000/api/auth';
  authSubject = new BehaviorSubject(false);
  private token:string;


  constructor(private httpClient:HttpClient) { }

  register(user:User):Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/register`,
    user).pipe( tap(
      (res:JwtResponse) => {
        console.log(res);
        if (res) {
          // Guardar Token
          this.saveToken(res.Authorization.token, res.Authorization.expiredIn);
        }
      })
    );
  }

  login(user:User):Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/login`,
    user).pipe( tap(
      (res:JwtResponse) => {
        if (res) {
          // Guardar Token
          console.log(res);
          this.saveToken(res.Authorization.token, res.Authorization.expiredIn);
        }
      })
    );
  }

  logout():void {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
  }

  private saveToken(token:string, expiresIn:string):void {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EXPIRES_IN', expiresIn);
    this.token = token;
  }

  private getToken():string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }

    return this.token;
  }
}
