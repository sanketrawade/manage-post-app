import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPostComponent } from './posts/list-post/list-post.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
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
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
