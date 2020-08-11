import { Component, ViewChild, ElementRef, Output } from '@angular/core';
import { Post } from '../post.modal';
import { NgForm } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent{

  constructor(public postService: PostService){
  }

@ViewChild('postForm') postForm: NgForm;
public isSubmitted = false;
// @Output() AddPost = new EventEmitter();

get g(){
  return this.postForm.controls;
}

Save(){
  this.isSubmitted = true;
  if (this.postForm.invalid){
    return;
  }
  const post: Post = {
  _id: null,
  title : this.postForm.controls.title.value,
  content : this.postForm.controls.content.value
};
  this.isSubmitted = false;
  this.postService.AddPost(post).subscribe((resp: any) => {
  });
  this.postForm.resetForm();
  }
}

