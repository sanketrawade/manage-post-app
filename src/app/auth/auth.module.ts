import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [FormsModule, ReactiveFormsModule, MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,],
  exports: [],
  providers: [],
  bootstrap: []
})
export class AuthModule {}