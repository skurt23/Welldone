import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { routes } from './app.routing';
import {UserService} from "./services/user.service";
import {LocalStorageService} from "ngx-webstorage";
import {AuthenticationService} from "./services/authentication.service";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public routes: any = routes;
  public search: any = {};
  public hash: string = '';
  public exceptions: string[] = ['login', 'edit/:postId', 'detail/:pk', '**'];
  public logged: boolean = false;
  private token: string;
  public username: string;
  public user: any = {};

  private router: Router;

  public constructor(private _router: Router, private _authSevice: AuthenticationService, private _localStorage: LocalStorageService) {
    this.router = _router;
    this.routes = this.routes[0].children;
    this.routes = this.routes.filter((v: any) =>{
      if (!this.exceptions.includes(v.path)){
        return v.path
      }
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.hash = event.url;
      }
    });

  }

  ngOnInit(){

    this.token = localStorage.getItem('welldone_token');
    this.username = localStorage.getItem('welldone_identity').replace(/\"/g, '');

    if (typeof this.token !== 'undefined'){
      this.logged = true;
    }else{
      this.logged = false;
    }

   this._localStorage.observe('welldone_token').subscribe((value)=>{
     if (typeof value !== 'undefined' && value !== null){
       this.token = value;
       this.logged = true;
     }else{
       this.logged = false;
     }
   });
   this._localStorage.observe('welldone_identity').subscribe((value)=>{
     if (typeof value !== 'undefined' && value !== null){
       this.username = value;
       this.logged = true;
     }else{
       this.logged = false;
     }
    });

  }

  public logout(){
    this._authSevice.logout();
    this._router.navigate(['/login']);
  }
}


