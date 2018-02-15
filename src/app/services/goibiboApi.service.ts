import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';


@Injectable()
export class GoibiboApiService {

  constructor(
    private _http: Http,
    private authenticationService: AuthenticationService
  ) { }

  searchBus(searchBusQuery) {
    const headers = new Headers();
    const options = new RequestOptions({ headers: headers });
    return this._http.get('/api/searchBus/', options)
      .map(res => res.json());
  }

}
