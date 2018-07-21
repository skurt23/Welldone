import { Component } from '@angular/core';
import {HeaderdataService} from "../../services/headerdata.service";


@Component({
    moduleId: module.id,
    selector: 'headerdata',
    templateUrl: './headerdata.component.html'
})

export class HeaderdataComponent {
    message: string;

    constructor(private headerdataService: HeaderdataService) { }

    ngOnInit() {
        this.headerdataService.getMessage().subscribe(message => { this.message = message; });
    }
}
