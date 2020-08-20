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
  public userId = new BehaviorSubject<string>(null);
  private tokenExpirationTimer;


  constructor(private http: HttpClient) {
  }

  SignUp(username: string, password: string) {
    return this.http.post(this.baseApiUrl + this.registerUserApiUrl, { username, password });
  }

  Login(username: string, password: string) {
    return this.http.post(this.baseApiUrl + this.loginUserApiUrl, { username, password });
  }

  AutoLogin(){
    if (localStorage.getItem('expiresIn') != null){
        return this.CheckTokenExpiry() != null ? true : false;
    }
  }

  AutoLogout(expiredIn){
    console.log(expiredIn);
    this.tokenExpirationTimer = setTimeout(() => {
      this.Logout();
    }, expiredIn);
  }

  CheckTokenExpiry(){
    if (localStorage.getItem('expiresIn')){
      const tokenExpiredDate: Date = JSON.parse(localStorage.getItem('expiresIn'));
      if (new Date() > tokenExpiredDate){
        this.Logout();
        // console.log('expire token');
        return null;
      }
      else{
        // console.log('not expire token');
        this.isAuthenticated.next(true);
        return tokenExpiredDate;
      }
    }
  }

  IsUserAuthenticated() {
    return (localStorage.getItem('token') != null ? true : false);
  }

  SetUserId(userId){
    if (!localStorage.getItem('userId')){
      localStorage.removeItem('userId');
    }
    this.userId.next(userId);
    localStorage.setItem('userId', userId);
  }

  GetUserId(){
    return localStorage.getItem('userId');
  }

  Logout() {
    if (this.tokenExpirationTimer){
     clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    this.isAuthenticated.next(false);
    this.userId.next(null);
  }

  GetToken() {
   const authData = {
     token: localStorage.getItem('token'),
     expiredIn: localStorage.getItem('expiresIn')
   };
   return authData;
  }

  SetAuthData(authData: { token: string , expiredIn: number }) {
    const currentDate = new Date();
    const expireDate = new Date ( currentDate );
    expireDate.setMinutes( currentDate.getMinutes() + 30 );
    // expireDate.setMinutes(0, expireDate.getMinutes() + authData.expiredIn);
    // expireDate.setMilliseconds(authData.expiredIn);
    localStorage.setItem('token', authData.token);
    // tslint:disable-next-line: no-debugger
    debugger;
    localStorage.setItem('expiresIn', JSON.stringify(expireDate));
    this.AutoLogout(1800000);
  }
}
