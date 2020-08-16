import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPostComponent } from './posts/list-post/list-post.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Routes = [
  {
    path: '',
    component: ListPostComponent
  },
  {
    path: 'create',
    component: AddPostComponent
  },
  {
    path: 'create/:id',
    component: AddPostComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
