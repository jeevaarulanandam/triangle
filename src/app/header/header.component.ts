import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../services/auth.guard';
import { AuthenticationService } from '../services/authentication.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Triangle';
  constructor(
    private authGaurd: AuthGuard,
    private authentication: AuthenticationService
  ) { }

  isAuth = false;

  isAuthenticatedStatus(): boolean {
    return this.authGaurd.canActivate();
  }

  userLogout() {
    return this.authentication.logout();
  }

  ngOnInit() {

  }

}
