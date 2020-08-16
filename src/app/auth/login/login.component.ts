import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  token = null;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  get g() {
    return this.loginFormGroup.controls;
  }

  Login() {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }
    const loginDetails = {
      username: this.loginFormGroup.value.username,
      password: this.loginFormGroup.value.password
    };
    this.authService.Login(loginDetails.username, loginDetails.password).subscribe((response: any) => {
      const token = response?.token;
      const expiredIn = response?.expiredIn * 1000;
      this.authService.SetAuthData({ token , expiredIn});
      this.authService.isAuthenticated.next(true);
      this.isSubmitted = false;
      this.loginFormGroup.reset();
      setTimeout(() => {
        this.authService.Logout();
      }, expiredIn);
      this.router.navigate(['']);
    },
    (error) => {
      alert('user not authenticated');
    });
  }
}
