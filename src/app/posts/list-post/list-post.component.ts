import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.modal';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Paginator } from 'src/app/paginator';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-list-app',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit, OnDestroy {
  posts: Post[];
  panelOpenState: boolean;
  postSub: Subscription;
  pagination: Paginator;
  isLoading = false;
  post: Post;
  totalRecords = 5;
  pageSize = 1;
  pageSizeOption = [2, 10];
  isLogin = null;
  userId: string = null;
  constructor(private postService: PostService, private router: Router, public authService: AuthService) {
  }

  ngOnInit() {
    this.pagination = new Paginator();
    this.GetPostList();
    // this.userId = this.authService.GetUserId();
    this.authService.userId.subscribe((response) =>  {
      this.userId = response;
    });
    this.authService.isAuthenticated.subscribe((response) => {
      this.isLogin = response;
    });
  }


  GetUpdatedList() {
    this.postService.GetUpdatedPost().subscribe((resp) => {
      this.posts = resp;
    });
  }

  GetPostList() {
    this.isLoading = true;
    // tslint:disable-next-line: max-line-length
    this.postSub = this.postService.GetPostList(this.pagination.pageSize, this.pagination.pageIndex).subscribe((resp: { messege: string, data: Post[], count: number }) => {
      this.posts = resp.data;
      // console.log(this.posts);
      this.pagination.length = resp.count;
      this.isLoading = false;
    });
  }

  Edit(id) {
    this.router.navigate(['create', id]);
  }

  Delete(id) {
    console.log(id);
    this.postService.DeletePost(id).subscribe((resp) => {
      this.GetPostList();
    });
  }

  ChangePage(event: PageEvent) {
    // tslint:disable-next-line: no-unused-expression
    this.pagination.pageIndex = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;
    this.pagination.length = event.length;
    this.GetPostList();
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
