import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
  logdUser: any;
  constructor(private router: Router) { }
  canActivate() {
    if (localStorage.getItem('currentUser')) {
      this.logdUser = JSON.parse(localStorage.getItem('currentUser'));
      if (new Date(this.logdUser.expires) > new Date()) {
        // logged in so return true
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
