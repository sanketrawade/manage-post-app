import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginFormGroup: FormGroup;
  isSubmitted = false;
  constructor(private fb: FormBuilder){

  }

  ngOnInit(){
    this.loginFormGroup = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  get g(){
    return this.loginFormGroup.controls;
  }

  Login(){
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid){
      return;
    }
  }

}
