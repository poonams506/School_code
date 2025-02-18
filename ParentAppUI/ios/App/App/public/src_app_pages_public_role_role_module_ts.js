(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_public_role_role_module_ts"],{

/***/ 18099:
/*!**********************************************************!*\
  !*** ./src/app/pages/public/role/role-routing.module.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RolePageRoutingModule: () => (/* binding */ RolePageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _role_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./role.page */ 37973);




const routes = [{
  path: ':RoleList',
  component: _role_page__WEBPACK_IMPORTED_MODULE_0__.RolePage
}];
let RolePageRoutingModule = class RolePageRoutingModule {};
RolePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], RolePageRoutingModule);


/***/ }),

/***/ 74738:
/*!**************************************************!*\
  !*** ./src/app/pages/public/role/role.module.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RolePageModule: () => (/* binding */ RolePageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _role_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./role-routing.module */ 18099);
/* harmony import */ var _role_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./role.page */ 37973);
/* harmony import */ var swiper_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! swiper/angular */ 72443);







// Swiper

let RolePageModule = class RolePageModule {};
RolePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _role_routing_module__WEBPACK_IMPORTED_MODULE_0__.RolePageRoutingModule, swiper_angular__WEBPACK_IMPORTED_MODULE_7__.SwiperModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule],
  declarations: [_role_page__WEBPACK_IMPORTED_MODULE_1__.RolePage]
})], RolePageModule);


/***/ }),

/***/ 37973:
/*!************************************************!*\
  !*** ./src/app/pages/public/role/role.page.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RolePage: () => (/* binding */ RolePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _role_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./role.page.html?ngResource */ 71487);
/* harmony import */ var _role_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./role.page.scss?ngResource */ 5245);
/* harmony import */ var _role_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_role_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper */ 36705);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/toast/toast.service */ 33545);
/* harmony import */ var crypto_js___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! crypto-js/ */ 75720);
/* harmony import */ var crypto_js___WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(crypto_js___WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment */ 45312);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var src_app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/storage/storage.service */ 85217);





swiper__WEBPACK_IMPORTED_MODULE_2__["default"].use([swiper__WEBPACK_IMPORTED_MODULE_2__.Pagination]);







let RolePage = class RolePage {
  constructor(router, ref, toastService, route, userService, storageService) {
    this.router = router;
    this.ref = ref;
    this.toastService = toastService;
    this.route = route;
    this.userService = userService;
    this.storageService = storageService;
    this.addClass = false;
    this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroup({
      role: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required)
    });
  }
  ngOnInit() {
    this.route.params.subscribe(data => {
      const queryParamValue = data.RoleList;
      if (queryParamValue) {
        let decryptedString = crypto_js___WEBPACK_IMPORTED_MODULE_4__.AES.decrypt(queryParamValue, src_environments_environment__WEBPACK_IMPORTED_MODULE_5__.environment.ENCRYPTION_PASSWORD).toString(crypto_js___WEBPACK_IMPORTED_MODULE_4__.enc.Utf8);
        this.userLoginReponse = JSON.parse(decryptedString);
        this.roles = this.userLoginReponse.roles;
      }
    });
  }
  get f() {
    return this.form.controls;
  }
  getClassNameByRoleKey(roleKey) {
    if (roleKey == 'Parent') {
      return 'parent';
    } else if (roleKey == 'Teacher') {
      return 'teacher';
    } else if (roleKey == 'Cab_Driver') {
      return 'driver';
    }
    return '';
  }
  submit() {
    if (!this.form.valid) {
      this.toastService.presentToast('Error', 'Please select your role', 'top', 'danger', 2000);
      return;
    }
    let roleId = this.roles.filter(x => x.roleKey == this.form.value.role).map(x => x.roleId)[0];
    if (roleId > 0) {
      let encryptedString = crypto_js___WEBPACK_IMPORTED_MODULE_4__.AES.encrypt(JSON.stringify(roleId), src_environments_environment__WEBPACK_IMPORTED_MODULE_5__.environment.ENCRYPTION_PASSWORD).toString();
      this.userService.CurrentUserRoleId = encryptedString;
      this.userService.UserToken = this.userLoginReponse.token;
      this.storageService.setStorage("TOKEN", this.userService.UserToken);
      setTimeout(() => {
        this.userService.getUser(true).subscribe(userDetail => {
          this.toastService.presentToast('Success', 'Welcome!,' + userDetail.userFullNameByRole, 'top', 'success', 2000);
          let radioValue = this.form.value;
          if (radioValue.role === 'Parent') {
            this.router.navigateByUrl('/parent-app');
          } else if (radioValue.role === 'Teacher') {
            this.router.navigateByUrl('/teacher-app');
          } else if (radioValue.role === 'Cab_Driver') {
            this.router.navigateByUrl('/driver-app');
          }
        });
      }, 500);
    }
  }
  static #_ = this.ctorParameters = () => [{
    type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.Router
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ChangeDetectorRef
  }, {
    type: src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_3__.ToastService
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_6__.UserService
  }, {
    type: src_app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_7__.StorageService
  }];
};
RolePage = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
  selector: 'app-role',
  template: _role_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewEncapsulation.None,
  styles: [(_role_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], RolePage);


/***/ }),

/***/ 33545:
/*!*************************************************!*\
  !*** ./src/app/services/toast/toast.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToastService: () => (/* binding */ ToastService)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ 37401);




let ToastService = class ToastService {
  constructor(toastController) {
    this.toastController = toastController;
  }
  presentToast(header, message, position, color, duration, icon) {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!icon) {
        switch (color) {
          case 'success':
            icon = 'checkmark-outline';
            break;
          case 'medium':
            icon = 'information-circle-outline';
            break;
          case 'danger':
            icon = 'warning-outline';
            break;
        }
      }
      const toast = yield _this.toastController.create({
        header: header,
        message: message,
        duration: duration,
        position: position,
        color: color,
        icon: icon
      });
      yield toast.present();
    })();
  }
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.ToastController
  }];
};
ToastService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
  providedIn: 'root'
})], ToastService);


/***/ }),

/***/ 5245:
/*!*************************************************************!*\
  !*** ./src/app/pages/public/role/role.page.scss?ngResource ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.roles-boxes {
  display: block;
  --background:#fff;
}
.roles-boxes ion-segment-button {
  background-color: #fff;
  border: 2px solid #3c5bac;
  --color: #3c5bac;
  margin-bottom: 20px;
  padding: 15px 20px;
  border-radius: 8px;
}
.roles-boxes ion-segment-button .inside {
  display: flex;
  align-items: center;
  width: 100%;
}
.roles-boxes ion-segment-button .inside .image {
  width: 70px;
  margin-right: 30px;
}
.roles-boxes ion-segment-button .inside .text {
  font-size: 20px;
  text-transform: initial;
  text-align: left;
}
.roles-boxes ion-segment-button .inside .text p {
  font-size: 13px;
  margin: 0;
  letter-spacing: normal;
}
.roles-boxes ion-segment-button.parent {
  border: 2px solid #3075ff;
  --color: #3075ff;
}
.roles-boxes ion-segment-button.parent.segment-button-checked {
  background-color: #d8e3ff;
  border: 2px solid #3075ff;
  --indicator-color:#3075ff;
  --color: #3075ff;
}
.roles-boxes ion-segment-button.parent.segment-button-checked .text {
  color: #3075ff;
}
.roles-boxes ion-segment-button.teacher {
  border: 2px solid #ea7322;
  --color: #ea7322;
}
.roles-boxes ion-segment-button.teacher.segment-button-checked {
  background-color: #ffedbd;
  border: 2px solid #ea7322;
  --indicator-color:#ea7322;
  --color: #ea7322;
}
.roles-boxes ion-segment-button.teacher.segment-button-checked .text {
  color: #ea7322;
}
.roles-boxes ion-segment-button.driver {
  border: 2px solid #009688;
  --color: #009688;
}
.roles-boxes ion-segment-button.driver.segment-button-checked {
  background-color: #c6ede9;
  border: 2px solid #009688;
  --indicator-color:#009688;
  --color: #009688;
}
.roles-boxes ion-segment-button.driver.segment-button-checked .text {
  color: #009688;
}

.text-h1 {
  text-align: center;
  padding: 30px 0;
  font-size: 22px;
  font-weight: 500;
  color: var(--dark-color);
}`, "",{"version":3,"sources":["webpack://./src/app/pages/public/role/role.page.scss"],"names":[],"mappings":"AAiBA;EACE,cAAA;EACA,iBAAA;AAhBF;AAiBE;EACE,sBAAA;EAGA,yBAAA;EACA,gBAAA;EACA,mBAAA;EACA,kBAAA;EACA,kBAAA;AAjBJ;AAkBI;EACE,aAAA;EACA,mBAAA;EACA,WAAA;AAhBN;AAiBM;EACE,WAAA;EACA,kBAAA;AAfR;AAiBM;EACE,eAAA;EACA,uBAAA;EACA,gBAAA;AAfR;AAgBQ;EACE,eAAA;EACA,SAAA;EACA,sBAAA;AAdV;AAkBI;EACE,yBAAA;EACA,gBAAA;AAhBN;AAiBM;EACE,yBAAA;EACA,yBAAA;EACA,yBAAA;EACA,gBAAA;AAfR;AAgBQ;EACE,cAAA;AAdV;AAmBI;EACE,yBAAA;EACA,gBAAA;AAjBN;AAkBM;EACE,yBAAA;EACA,yBAAA;EACA,yBAAA;EAEA,gBAAA;AAjBR;AAkBQ;EACE,cAAA;AAhBV;AAqBI;EACE,yBAAA;EACA,gBAAA;AAnBN;AAoBM;EACE,yBAAA;EACA,yBAAA;EACA,yBAAA;EACA,gBAAA;AAlBR;AAmBQ;EACE,cAAA;AAjBV;;AA4BA;EACE,kBAAA;EACA,eAAA;EACA,eAAA;EACA,gBAAA;EACA,wBAAA;AAzBF","sourcesContent":["// .role-radio {\n//   ion-item {\n//     --background: #d8e3ff;\n//     --background-activated: green;\n//     --background-focused: green;\n//     --background-hover: currentColor;\n//     --background-activated-opacity: 1;\n//     --color:#fff;\n//     margin-bottom: 20px;\n//     --min-height:100px;\n//     ion-radio {\n//       --color:#fff;\n//       --color-checked:blue\n//     }\n//   }\n// }\n\n.roles-boxes {\n  display: block;\n  --background:#fff;\n  ion-segment-button {\n    background-color: #fff;\n    // border: 2px solid #b0b1b5;\n    // --color: #8a8d95;\n    border: 2px solid #3c5bac;\n    --color: #3c5bac;\n    margin-bottom: 20px;\n    padding: 15px 20px;\n    border-radius: 8px;\n    .inside {\n      display: flex;\n      align-items: center;\n      width: 100%;\n      .image {\n        width: 70px;\n        margin-right: 30px;\n      }\n      .text {\n        font-size: 20px;\n        text-transform:initial;\n        text-align: left;\n        p {\n          font-size: 13px;\n          margin: 0;\n          letter-spacing: normal;\n        }\n      }\n    }\n    &.parent {\n      border: 2px solid #3075ff; \n      --color: #3075ff;\n      &.segment-button-checked {\n        background-color: #d8e3ff;\n        border: 2px solid #3075ff; \n        --indicator-color:#3075ff;\n        --color: #3075ff;\n        .text {\n          color: #3075ff;\n        }\n      }\n    }\n\n    &.teacher {\n      border: 2px solid #ea7322;\n      --color: #ea7322;\n      &.segment-button-checked {\n        background-color: #ffedbd;\n        border: 2px solid #ea7322;\n        --indicator-color:#ea7322;\n\n        --color: #ea7322;\n        .text {\n          color: #ea7322;\n        }\n      }\n      \n    }\n    &.driver {\n      border: 2px solid #009688;\n      --color: #009688;\n      &.segment-button-checked {\n        background-color: #c6ede9;\n        border: 2px solid #009688;\n        --indicator-color:#009688;\n        --color: #009688;\n        .text {\n          color: #009688;\n        }\n      }\n      \n    }\n   \n  }\n\n\n}\n\n.text-h1 {\n  text-align: center;\n  padding: 30px 0;\n  font-size: 22px;\n  font-weight: 500;\n  color: var(--dark-color);\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 71487:
/*!*************************************************************!*\
  !*** ./src/app/pages/public/role/role.page.html?ngResource ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n\n  \n<ion-content>\n \n\n  <div class=\"form-padding\">\n    <form class=\"form-default\" [formGroup]=\"form\">\n\n<h1 class=\"text-h1\">Select your role</h1>\n      <ion-segment class=\"roles-boxes\" name=\"role\" formControlName=\"role\">\n        <ion-segment-button value=\"{{role.roleKey}}\" class=\"{{getClassNameByRoleKey(role.roleKey)}}\" *ngFor=\"let role of roles\">\n          <div class=\"inside\">\n            <div class=\"image\">\n              <img *ngIf=\"role.roleKey=='Parent'\" src=\"../../../../assets/parents.svg\" />\n              <img *ngIf=\"role.roleKey=='Teacher'\" src=\"../../../../assets/teacher.svg\" />\n              <img *ngIf=\"role.roleKey=='Cab_Driver'\" src=\"../../../../assets/driver1.svg\" />\n            </div>\n            <div class=\"text\">\n              {{role.roleName}} <p>Select this if your {{role.roleName}}</p>\n            </div>\n          </div> \n        </ion-segment-button>\n      \n      </ion-segment>\n\n      \n    </form>\n    </div>\n\n\n</ion-content>\n\n<ion-footer class=\"continue-btn-footer animate__animated animate__fadeInUp\">\n  <ion-button class=\"continue-btn\" round=\"0\" (click)=\"submit()\">\nContinue  </ion-button>\n\n</ion-footer>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_public_role_role_module_ts.js.map