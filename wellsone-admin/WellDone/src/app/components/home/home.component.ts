import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";



@Component({
    moduleId: module.id,
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;

    constructor(private userService: UserService, private _router: Router) {

      this.currentUser = JSON.parse(localStorage.getItem('welldone_identity'));
      this._router.navigate(['favorites']);
    }

    ngOnInit() {
        if (this.currentUser) {
            // this.headerdataService.success(this.currentUser.email );
            console.log("Success!!")
        }
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        //this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
