import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HeaderdataService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = true;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string) {
        let identity = JSON.parse(localStorage.getItem('welldone_identity'));
        let mess:String;
        if (identity) {
            mess = identity.email;
        }
        else {
            mess = message;
        }
        this.subject.next({ type: 'success', text: mess });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
