import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { User } from '../interface/user';
import { UserService } from '../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user = new User();
  public users = [];
  public result;
  roles = ['admin', 'supervisor'];
  constructor(
    private userService: UserService,
    private _fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSubmit() {
    console.table(this.user);
    this.userService.insertUser(this.user).subscribe(data => {
      this.result = data;
    }, error => {
      console.log(error);
    }, () => {
      console.log('Sucessfully Added');
      this.router.navigateByUrl('home');
    });
  }

  _uuid() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  editFamily(item) {
    console.log(item);
  }


  viewFamily(item) {
    this.router.navigate(['/user', item._id]);
  }


  deleteFamily(item) {
    this.userService.deleteUser(item._id).subscribe(user => {
      console.log('Successfully deleted');
      this.result = user;
      this.ngOnInit();
    });
  }

}
