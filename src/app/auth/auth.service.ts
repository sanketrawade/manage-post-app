import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseApiUrl = 'http://localhost:3000/user';
  public registerUserApiUrl = '/api/regusr';
  public loginUserApiUrl = '/api/lgnusr';
  public isAuthenticated = new BehaviorSubject<boolean>(false);


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

  Logout() {
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
