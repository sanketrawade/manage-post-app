import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ValidatePassword } from '../password.validator';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signFormGroup: FormGroup;
  isSubmitted = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.signFormGroup = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    }, { validators: ValidatePassword });
  }

  get g() {
    return this.signFormGroup.controls;
  }

  Signup() {
    this.isSubmitted = true;
    if (this.signFormGroup.invalid) {
      return;
    }
    const userDetails = {
      username: this.signFormGroup.value.username,
      password: this.signFormGroup.value.password
    };
    this.authService.SignUp(userDetails.username, userDetails.password).subscribe((resp: any) => {
      this.router.navigate(['']);
    });
  }
}

  // tslint:disable-next-line: max-line-length
//   ValidatePassword({ passwordControl, confirmPasswordControl }: { passwordControl: AbstractControl; confirmPasswordControl: AbstractControl; }): {[msg: string]: boolean} | null{
//     if(passwordControl.value === confirmPasswordControl.value){
//       return { 'password not matched': true };
//     }
//     return null
