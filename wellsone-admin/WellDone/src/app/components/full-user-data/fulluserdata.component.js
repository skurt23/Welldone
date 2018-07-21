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
var user_1 = require("../../models/user");
var fulluserdata_service_1 = require("../../services/fulluserdata.service");
var promos_1 = require("../models/promos");
var FulluserdataComponent = (function () {
    function FulluserdataComponent(fulluserdataService) {
        this.fulluserdataService = fulluserdataService;
        this.updateInfo();
    }
    FulluserdataComponent.prototype.ngOnInit = function () {
        this.fulluserdataService.get();
    };
    FulluserdataComponent.prototype.updateInfo = function () {
        this.user = new user_1.User();
        this.promos = new promos_1.Promos();
        var identity = JSON.parse(localStorage.getItem('torridentity'));
        var promosactivas = localStorage.getItem('torrpromos');
        if (promosactivas !== "undefined" && promosactivas != null) {
            var promosactivas_1 = JSON.parse(localStorage.getItem('torrpromos'));
            if (promosactivas_1) {
                this.promos = promosactivas_1;
            }
        }
        if (identity) {
            this.user = identity;
        }
    };
    return FulluserdataComponent;
}());
FulluserdataComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'fulluserdata',
        templateUrl: 'src/app/components/full-user-data/fulluserdata.component.html'
        //appInjector: [FulluserdataService]
    }),
    __metadata("design:paramtypes", [fulluserdata_service_1.FulluserdataService])
], FulluserdataComponent);
exports.FulluserdataComponent = FulluserdataComponent;
//# sourceMappingURL=fulluserdata.component.js.map
