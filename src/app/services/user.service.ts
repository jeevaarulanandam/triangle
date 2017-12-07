import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';


@Injectable()
export class UserService {

  constructor(
    private _http: Http,
    private authenticationService: AuthenticationService
  ) { }

  getUsers() {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    const options = new RequestOptions({ headers: headers });
    return this._http.get('/api/users/', options)
      .map(res => res.json());
  }

  insertUser(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('/api/user/',
      { data: data },
      { headers: headers })
      .map(res => res.json());
  }

  updateUser(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put('/api/user/',
      { data: data },
      { headers: headers })
      .map(res => res.json());
  }

  deleteUser(data) {
    const body = JSON.stringify({
      'Id': data
    });
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({
      headers: headers,
      body: body
    });

    return this._http.delete('/api/user/', options)
      .map(res => res.json());

  }

  getaUser(data) {
    return this._http.get('/api/user/' + data)
      .map(res => res.json());
  }

}
