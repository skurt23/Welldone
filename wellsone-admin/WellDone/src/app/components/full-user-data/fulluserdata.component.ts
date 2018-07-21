import { Component } from '@angular/core';
import {User} from "../../models/user";
import {FulluserdataService} from "../../services/fulluserdata.service";



@Component({
    moduleId: module.id,
    selector: 'fulluserdata',
    templateUrl: './fulluserdata.component.html'
})

export class FulluserdataComponent {
    public user: User;


    constructor( private fulluserdataService: FulluserdataService) {
        this.updateInfo();
    }

    ngOnInit() {
        this.fulluserdataService.get();
    }

    public updateInfo () {
        this.user = new User ();

        let identity = JSON.parse(localStorage.getItem('welldone_identity'));

        if (identity) {
            this.user = identity;
        }

    }

}
