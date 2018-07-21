import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { GLOBAL } from './global';
import {User} from "../models/user";
import {LocalStorageService} from "ngx-webstorage";

@Injectable()
export class AuthenticationService {
    public url: String;
    public user: User;
    public token:string;

    constructor(private http: Http, private _localStorage: LocalStorageService) {
        this.url = GLOBAL.url + GLOBAL.port + GLOBAL.api;
        this.user = new User();
    }

    login(username: string, password: string) {
        let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});

        return this.http.post(this.url + '/users/login', JSON.stringify({ username: username, password: password }), {headers: headers})
           .map((response: Response) => {

             console.log ("RESPONSE: OK");
             let resp = response.json();
             let user = resp['username'];

             let token = resp['token'];
             let success = resp['success'];

             if (success===true && token) {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
               localStorage.setItem('welldone_identity', JSON.stringify(user));
               localStorage.setItem('welldone_token', token);
               this._localStorage.store('welldone_identity', JSON.stringify(user));
               this._localStorage.store('welldone_token', token);

               console.log ("SET ITEMS OK: " + JSON.stringify(localStorage.getItem('welldone_identity')) + " -> " + JSON.stringify(localStorage.getItem('welldone_token')));

             }
           }
        );
     }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('welldone_identity');
        localStorage.removeItem('welldone_token');
        this._localStorage.clear();
    }
}
