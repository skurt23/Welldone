import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
    moduleId: module.id,
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'

        // this.returnUrl = GLOBAL.url + ':' + GLOBAL.port_client + this.route.snapshot.queryParams['returnUrl'] || '/';
        // console.log ("this.returnUrl: ", this.returnUrl);
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                  if(this.returnUrl){
                    this.router.navigate([this.returnUrl]);
                  }else{
                    this.router.navigate(['articles']);
                  }

                    // console.log ("DATA OK: ", this.returnUrl);
                },
                error => {
                    this.loading = false;
                });
    }
}
