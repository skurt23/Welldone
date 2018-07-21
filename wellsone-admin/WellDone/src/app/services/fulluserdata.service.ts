import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {User} from "../models/user";

@Injectable()
export class FulluserdataService {
    _user: User;
    constructor() {
        this._user = new User ();
        let identity = JSON.parse(localStorage.getItem('welldone_identity'));
        if (identity) {
            this._user = identity;
        }
    }

    set() {
        let identity = JSON.parse(localStorage.getItem('welldone_identity'));
        if (identity) {
            this._user = identity;
        }
        else {
            this._user = null;
        }
    }
    get() {
       return this._user;
    }
}
