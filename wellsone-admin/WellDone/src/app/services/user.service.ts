import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { GLOBAL } from './global';
import {User} from "../models/user";



@Injectable()
export class UserService {
    public url: String;
    public identity: User;
    public token:string;
    public user_register: User;
    public user_update: User;

    constructor(private http: Http) {
      this.url = GLOBAL.url + ':' + GLOBAL.port + GLOBAL.api;
      this.user_register = new User();
    }

    getAll(token: string) {
        //return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
        let headers = new Headers({ 'Content-type': 'application/json' });
        headers.append('Authorization', `JWT ${token}`);

        let options = new RequestOptions({ headers: headers });

        return this.http.get('http://localhost:8000/apiv1/users/', options).map((response: Response) => response.json());
    }

    getById(id: string) {
        return this.http.get(this.url + '/users/?id=' + id, this.jwt()).map((response: Response) => {
            let resp = response.json();
            console.log (response);
            localStorage.removeItem("welldone_identity");
            localStorage.setItem('welldone_identity', JSON.stringify(resp));
        });
    }

    create(user_to_register: User) {
      let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
      let model: any = {};
      let profile: any = {};

      // Hay que crear el objeto con su profile
      profile.title = user_to_register.title;
      profile.avatar = user_to_register.avatar;
      profile.history = user_to_register.history;
      profile.premium = false;


      model.first_name = user_to_register.first_name;
      model.last_name = user_to_register.last_name;
      model.username = user_to_register.username;
      model.password = user_to_register.password;

      model.email = user_to_register.email;
      model.profile = new Object();
      model.profile.title = profile.title;
      model.profile.avatar = profile.avatar;
      model.profile.history = profile.history;
      model.profile.premium = profile.premium;


      // return this.http.post(this.url + '/users/', user_to_register, {headers: headers}).map((response: Response) => response.json());
      return this.http.post(this.url + '/users/', model, {headers: headers}).map((response: Response) => response.json());
    }

    update(user_to_update: User, token: String) {
      let headers_auth = new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'JWT ' + token.toString(),
      });
      let model: any = {};
      let profile: any = {};

      // Hay que crear el objeto con su profile
      profile.title = user_to_update.title;
      profile.avatar = user_to_update.avatar;
      profile.history = user_to_update.history;
      profile.premium = false;


      model.first_name = user_to_update.first_name;
      model.last_name = user_to_update.last_name;
      model.username = user_to_update.username;

      // model.password = user_to_update.password;

      model.email = user_to_update.email;
      model.profile = new Object();
      model.profile.title = profile.title;
      model.profile.avatar = profile.avatar;
      model.profile.history = profile.history;
      model.profile.premium = profile.premium;


      return this.http.put( this.url + '/users/' + user_to_update._id + '/', model, {headers: headers_auth})
        .map((response: Response) => {
          //response.json()
          let resp = response.json();
          let success = resp['success'];


          if (success===true) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.removeItem('welldone_identity');
            localStorage.setItem('welldone_identity', JSON.stringify(user_to_update));
          }
        });
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    getIdentity () {
        let identity = JSON.parse(localStorage.getItem('welldone_identity'));
        if (identity != "undefined") {
            this.identity = identity;
        }
        else {
            this.identity = null;
        }
        return this.identity;
    }

    getToken() {
        let token = localStorage.getItem('welldone_token');
        if (token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = this.getIdentity();
        let token = this.getToken();
        if (currentUser && token) {
            let headers = new Headers({ 'x-access-token': token });
            return new RequestOptions({ headers: headers });
        }
    }
}
