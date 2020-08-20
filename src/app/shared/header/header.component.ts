import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }
  isAutheticated = false;
  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe((response: any) => {
      this.isAutheticated = response;
    });
  }

  Logout() {
    this.authService.Logout();
  }

}
