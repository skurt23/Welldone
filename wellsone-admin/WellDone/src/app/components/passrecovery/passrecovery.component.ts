import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {PassrecoveryService} from "../../services/passrecovery.service";
import {AlertService} from "../../services/alert.service";



@Component({
    moduleId: module.id,
    templateUrl: 'passrecovery.component.html'
})

export class PassrecoveryComponent {
  loading = false;
  model: any = {};
  email: String;

  constructor(
    private router: Router,
    private passrecoveryService: PassrecoveryService,
    private alertService: AlertService) { }

  passRecovery() {
    this.loading = true;
    //console.log("email: ", this.model.email);

    // this.passrecoveryService.recovery(this.model.email)
    //   .subscribe(
    //     data => {
    //         this.alertService.success('Solicitud enviada: Revise su correo - ' + this.model.email + ' - para actualizar contraseña.', true);
    //         this.router.navigate(['/login']);
    //     },
    //     error => {
    //         this.alertService.error("Error en operación");
    //         this.loading = false;
    //     });


  }
}
