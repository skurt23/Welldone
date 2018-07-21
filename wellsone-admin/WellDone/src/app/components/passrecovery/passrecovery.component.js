"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_1 = require("../_services/index");
var PassrecoveryComponent = (function () {
    //email: String;
    function PassrecoveryComponent(router, passrecoveryService, alertService) {
        this.router = router;
        this.passrecoveryService = passrecoveryService;
        this.alertService = alertService;
        this.loading = false;
        this.model = {};
    }
    PassrecoveryComponent.prototype.passRecovery = function () {
        var _this = this;
        this.loading = true;
        //console.log("email: ", this.model.email);
        this.passrecoveryService.recovery(this.model.email)
            .subscribe(function (data) {
            _this.alertService.success('Solicitud enviada: Revise su correo - ' + _this.model.email + ' - para actualizar contraseña.', true);
            _this.router.navigate(['/login']);
        }, function (error) {
            _this.alertService.error("Error en operación");
            _this.loading = false;
        });
    };
    return PassrecoveryComponent;
}());
PassrecoveryComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'passrecovery.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.PassrecoveryService,
        index_1.AlertService])
], PassrecoveryComponent);
exports.PassrecoveryComponent = PassrecoveryComponent;
//# sourceMappingURL=passrecovery.component.js.map