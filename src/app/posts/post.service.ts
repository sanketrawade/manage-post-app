import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.modal';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {
  }
  private posts: Post[] = [
  ];
  private addedPost = new Subject<Post[]>();

  GetPostList(pageSize, currentPage) {
    return this.http.post('http://localhost:3000/post', { pageSize, currentPage });
  }

  GetPostById(id) {
    const postDetails = {
      Id: id
    };
    return this.http.post('http://localhost:3000/post/api/gtpstbyid', postDetails);
  }

  AddPost(post: Post) {
    // this.posts.push(post);
    // this.addedPost.next([...this.posts]);
    console.log(post);
    return this.http.post('http://localhost:3000/post/api/adpst', post);
  }

  UpdatePost(post: Post) {
    return this.http.post('http://localhost:3000/post/api/updtpst', post);
  }

  DeletePost(id) {
    const post = {
      _id: id
    };
    console.log(post);
    return this.http.post('http://localhost:3000/post/api/dlpst', post);
  }

  GetUpdatedPost() {
    return this.addedPost.asObservable();
  }

  InitializePost(posts: Post[]) {
    this.posts = posts;
    this.addedPost.next([...this.posts]);
  }

}
