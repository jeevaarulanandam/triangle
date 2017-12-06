import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    public token: string;
    public currentUser: any;

    constructor(private http: Http) {
        // set token if saved in local storage
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.currentUser && this.currentUser.token;
    }

    addHours(h) {
        const d1 = new Date();
        const d2 = new Date();
        d2.setHours(d1.getHours() + h);
        return d2;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('/api/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const token = response.json() && response.json().token;
                const user = response.json() && response.json().user;
                if (token) {
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: user, token: token, expires: this.addHours(1) }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
