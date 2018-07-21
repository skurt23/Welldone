import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {User} from "../../models/user";
import {AlertService} from "../../services/alert.service";
import {UserService} from "../../services/user.service";
import {FulluserdataService} from "../../services/fulluserdata.service";


@Component({
    moduleId: module.id,
    templateUrl: 'edituser.component.html'
})

export class EdituserComponent implements OnInit{
    //model: any = {};
    loading = false;
    public user: any = {};
    public token: string;


    constructor(
      private router: Router,
      private userService: UserService,
      private alertService: AlertService,
      private fulluserdataService: FulluserdataService)
    {
      let tok = localStorage.getItem('welldone_token');
      let identity = JSON.parse(localStorage.getItem('welldone_identity'));

      this.user = new User();
      if (tok!= "undefined") {
          this.token = tok;
      }
    }

    ngOnInit(){
      this.userService.getAll(this.token).subscribe((users:any) => {
        let results = users.results.forEach((user)=>{

          if (user.username === this.user){
            if (typeof user.profile !== 'undefined' && user.profile !== null){
              console.log(typeof this.user)
              this.user.email = user.email;
              this.user.first_name = user.first_name;
              this.user.last_name = user.last_name;
              this.user.title = user.profile.title;
              this.user.avatar = user.profile.avatar;
              this.user.history = user.profile.history;
              return true;
            }
          }
        });
      })
    }

    editUser() {
        this.loading = true;

        this.userService.update(this.user, this.token)
            .subscribe(
                data => {
                  this.alertService.success('Cambios guardados', true);
                  this.fulluserdataService.set();
                  this.fulluserdataService.get();

                  this.router.navigate(['/']);
                },
                error => {
                  this.loading = false;
                  this.alertService.error('Error en operación', error.errorMessage);

                });
    }
}
