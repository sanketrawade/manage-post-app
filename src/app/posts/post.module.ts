import { NgModule } from '@angular/core';
import { AddPostComponent } from './add-post/add-post.component';
import { ListPostComponent } from './list-post/list-post.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddPostComponent,
    ListPostComponent
  ],
  imports: [SharedModule]
})
export class PostModule {

}
