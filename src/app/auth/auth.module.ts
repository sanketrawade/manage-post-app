import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth.routing.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [FormsModule, ReactiveFormsModule, MatCardModule,
    AuthRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, CommonModule,
    SharedModule],
  exports: [],
  providers: [],
  bootstrap: []
})
export class AuthModule { }
