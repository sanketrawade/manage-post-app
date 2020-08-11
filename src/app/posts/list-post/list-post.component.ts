import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.modal';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-app',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit , OnDestroy{
  posts: Post[];
  panelOpenState: boolean;
  postSub: Subscription;
  constructor(private postService: PostService){
  }

  ngOnInit(){
   this.GetPostList();
  }

  GetUpdatedList(){
    this.postService.GetUpdatedPost().subscribe((resp) => {
      this.posts = resp;
    });
  }

  GetPostList(){
    this.postService.GetPostList().subscribe((resp: {messege: string, posts: Post[]}) => {
      this.posts = resp.posts;
      this.postService.InitializePost(this.posts);
    });
  }

  Delete(id){
    console.log('id is:' + id);
    this.postService.DeletePost(id).subscribe((resp) => {
      this.GetPostList();
    });
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
}
