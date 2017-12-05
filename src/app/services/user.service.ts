import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get('/api/users/')
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
