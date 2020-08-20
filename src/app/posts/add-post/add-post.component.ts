import { Component, ViewChild, ElementRef, Output, OnInit } from '@angular/core';
import { Post } from '../post.modal';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  public mode = 'add';
  public id = null;
  postSub: Subscription;
  post: Post;
  postFormGroup: FormGroup;
  imagePreview = '';
  // @ViewChild('postForm') postForm: NgForm;
  public isSubmitted = false;
  title = null;
  content = null;
  creater: string;
  // tslint:disable-next-line: max-line-length
  constructor(public postService: PostService, private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit() {
    this.postFormGroup = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      content: [null, [Validators.required]]
      // image: [null, [Validators.required]]
    });
    this.creater = this.authService.GetUserId();
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.mode = 'edit';
        this.id = params.id;
        this.GetPostById(this.id);
      }
      else {
        this.mode = 'add';
        this.id = null;
      }
    });
  }

  // @Output() AddPost = new EventEmitter();

  get g() {
    return this.postFormGroup.controls;
  }

  fileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postFormGroup.controls.image.setValue(file);
    this.postFormGroup.controls.image.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  Save() {
    this.isSubmitted = true;
    if (this.postFormGroup.invalid) {
      return;
    }
    const post: Post = {
      _id: null,
      title: this.postFormGroup.value.title,
      content: this.postFormGroup.controls.content.value,
      creator: this.creater
    };
    this.isSubmitted = false;
    if (this.mode === 'add') {
      this.postService.AddPost(post).subscribe((resp: any) => {
        this.router.navigate(['']);
      });
    }
    else {
      post._id = this.id;
      this.postService.UpdatePost(post).subscribe((resp: any) => {
        this.router.navigate(['']);
      });
    }
    this.postFormGroup.reset();
  }

  GetPostById(id) {
    this.postSub = this.postService.GetPostById(id).subscribe((resp: any) => {
      this.post = resp.data;
      console.log(this.post);
      this.BindForm(this.post);
    });
  }

  BindForm(post: Post) {
    this.postFormGroup.controls.title.setValue(post.title);
    this.postFormGroup.controls.content.setValue(post.content);
  }
}

