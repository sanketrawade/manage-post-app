import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject , Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseApiUrl = 'http://localhost:3000/user';
  public registerUserApiUrl = '/api/regusr';
  public loginUserApiUrl = '/api/lgnusr';
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public userId = new Subject<string>();


  constructor(private http: HttpClient) {
  }

  SignUp(username: string, password: string) {
    return this.http.post(this.baseApiUrl + this.registerUserApiUrl, { username, password });
  }

  Login(username: string, password: string) {
    return this.http.post(this.baseApiUrl + this.loginUserApiUrl, { username, password });
  }

  IsUserAuthenticated() {
    return (localStorage.getItem('token') != null ? true : false);
  }

  SetUserId(userId = null){
    this.userId.next(userId);
    return;
  }

  GetUserId(){
    return this.userId.asObservable();
  }

  Logout() {
    this.SetUserId();
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    this.isAuthenticated.next(false);
  }

  GetToken() {
   const authData = {
     token: localStorage.getItem('token'),
     expiredIn: localStorage.getItem('expiresIn')
   };
   return authData;
  }

  SetAuthData(authData: { token: string , expiredIn: number }) {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('expiresIn', authData.expiredIn.toString());
  }
}
