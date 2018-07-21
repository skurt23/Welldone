import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { GLOBAL } from './global';

import {AlertService} from "./alert.service";
import {Router} from "@angular/router";

@Injectable()
export class PassrecoveryService {
    public url: String;

  constructor(private router: Router, private http: Http, private alertService: AlertService ) {
    this.url = GLOBAL.url + ':' + GLOBAL.port + GLOBAL.api;
  }

    recovery(email: String) {
        let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
        let resp = {"email": email};

        console.log("EMAIL: " + this.url + '/users/recovery');

        return this.http.post(this.url + '/users/recovery', resp, {headers: headers}).map((response: Response) => response.json());

        // return this.http.post(this.url + '/users/recovery', resp, {headers: headers}).map((response: Response) => {
        //         console.log ("RESPONSE: OK");
        //         let resp = response.json();
        //         let success = resp['success'];
        //
        //         if (success===true) {
        //             // store user details and jwt token in local storage to keep user logged in between page refreshes
        //             this.alertService.success('Solicitud enviada: Revise su correo para actualizar contraseña.', true);
        //             this.router.navigate(['/login']);
        //             // console.log ("SET ITEMS OK");
        //         }
        //         else {
        //             this.alertService.error("Error en operación");
        //
        //         }
        //     }
        // );

    }

}
