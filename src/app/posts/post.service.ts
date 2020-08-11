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

  GetPostList() {
    return this.http.get('http://localhost:3000/api/gtpst');
  }

  AddPost(post: Post){
    this.posts.push(post);
    this.addedPost.next([...this.posts]);
    return this.http.post('http://localhost:3000/api/adpst', post);
  }

  DeletePost(id)
  {
    const post = {
      _id: id
    };
    return this.http.post('http://localhost:3000/api/dlpst', post);
  }

  GetUpdatedPost() {
    return this.addedPost.asObservable();
  }

  InitializePost(posts: Post[])
  {
    this.posts = posts;
    this.addedPost.next([...this.posts]);
  }

}
