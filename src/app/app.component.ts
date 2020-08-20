import { Component, OnInit } from '@angular/core';
import { Post } from './posts/post.modal';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router){
  }

  ngOnInit(){
    if (this.authService.AutoLogin() !== true){
      this.router.navigate(['/auth']);
    }
  }
}
