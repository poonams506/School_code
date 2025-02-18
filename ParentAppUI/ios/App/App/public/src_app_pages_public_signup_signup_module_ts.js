(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_public_signup_signup_module_ts"],{

/***/ 70983:
/*!**************************************************************!*\
  !*** ./src/app/pages/public/signup/signup-routing.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignupPageRoutingModule: () => (/* binding */ SignupPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _signup_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signup.page */ 6057);




const routes = [{
  path: '',
  component: _signup_page__WEBPACK_IMPORTED_MODULE_0__.SignupPage
}];
let SignupPageRoutingModule = class SignupPageRoutingModule {};
SignupPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], SignupPageRoutingModule);


/***/ }),

/***/ 56822:
/*!******************************************************!*\
  !*** ./src/app/pages/public/signup/signup.module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignupPageModule: () => (/* binding */ SignupPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _signup_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signup-routing.module */ 70983);
/* harmony import */ var _signup_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./signup.page */ 6057);







let SignupPageModule = class SignupPageModule {};
SignupPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _signup_routing_module__WEBPACK_IMPORTED_MODULE_0__.SignupPageRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule],
  declarations: [_signup_page__WEBPACK_IMPORTED_MODULE_1__.SignupPage]
})], SignupPageModule);


/***/ }),

/***/ 6057:
/*!****************************************************!*\
  !*** ./src/app/pages/public/signup/signup.page.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignupPage: () => (/* binding */ SignupPage)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _signup_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./signup.page.html?ngResource */ 26939);
/* harmony import */ var _signup_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./signup.page.scss?ngResource */ 66645);
/* harmony import */ var _signup_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_signup_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/toast/toast.service */ 33545);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 95072);









let SignupPage = class SignupPage {
  constructor(loadingController, formBuilder, toastService, router) {
    this.loadingController = loadingController;
    this.formBuilder = formBuilder;
    this.toastService = toastService;
    this.router = router;
    this.current_year = new Date().getFullYear();
    this.submit_attempt = false;
  }
  ngOnInit() {
    // Setup form
    this.signup_form = this.formBuilder.group({
      email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.email, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required])],
      password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.minLength(6), _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required])],
      password_repeat: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.minLength(6), _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required])]
    });
    // DEBUG: Prefill inputs
    this.signup_form.get('email').setValue('john.doe@mail.com');
    this.signup_form.get('password').setValue('123456');
  }
  // Sign up
  signUp() {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.submit_attempt = true;
      // If email or password empty
      if (_this.signup_form.value.email == '' || _this.signup_form.value.password == '' || _this.signup_form.value.password_repeat == '') {
        _this.toastService.presentToast('Error', 'Please fill in all fields', 'top', 'danger', 4000);
        // If passwords do not match
      } else if (_this.signup_form.value.password != _this.signup_form.value.password_repeat) {
        _this.toastService.presentToast('Error', 'Passwords must match', 'top', 'danger', 4000);
      } else {
        // Proceed with loading overlay
        const loading = yield _this.loadingController.create({
          cssClass: 'default-loading',
          message: '<p>Signing up...</p><span>Please be patient.</span>',
          spinner: 'crescent'
        });
        yield loading.present();
        // TODO: Add your sign up logic
        // ...
        // Success messages + routing
        _this.toastService.presentToast('Welcome!', 'Lorem ipsum', 'top', 'success', 2000);
        yield _this.router.navigate(['/home']);
        loading.dismiss();
      }
    })();
  }
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.LoadingController
  }, {
    type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder
  }, {
    type: src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_3__.ToastService
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router
  }];
};
SignupPage = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-signup',
  template: _signup_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_signup_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], SignupPage);


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

/***/ 66645:
/*!*****************************************************************!*\
  !*** ./src/app/pages/public/signup/signup.page.scss?ngResource ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:host body {
  background-color: var(--ion-color-dark);
}
:host ion-content {
  --background: linear-gradient(135deg, var(--ion-color-dark), var(--ion-color-primary));
}
:host ion-item {
  --border-radius: 8px;
  margin-bottom: 8px;
}
:host .logo-container {
  text-align: center;
}
:host .logo-container h1 {
  font-size: 32px;
  font-weight: 800;
}
:host .logo-container p {
  margin-bottom: 42px;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/public/signup/signup.page.scss"],"names":[],"mappings":"AACE;EACE,uCAAA;AAAJ;AAGE;EACI,sFAAA;AADN;AAIE;EACE,oBAAA;EACA,kBAAA;AAFJ;AAKE;EACE,kBAAA;AAHJ;AAKI;EACE,eAAA;EACA,gBAAA;AAHN;AAMI;EACE,mBAAA;AAJN","sourcesContent":[":host {\n  body {\n    background-color: var(--ion-color-dark);\n  }\n\n  ion-content {\n      --background: linear-gradient(135deg, var(--ion-color-dark), var(--ion-color-primary));\n  }\n\n  ion-item {\n    --border-radius: 8px;\n    margin-bottom: 8px;\n  }\n\n  .logo-container {\n    text-align: center;\n\n    h1 {\n      font-size: 32px;\n      font-weight: 800;\n    }\n\n    p {\n      margin-bottom: 42px;\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 26939:
/*!*****************************************************************!*\
  !*** ./src/app/pages/public/signup/signup.page.html?ngResource ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n\n<ion-content>\n\n  <div class=\"ion-padding ion-full-height ion-flex ion-flex-center\">\n\n    <div class=\"logo-container\">\n      <h1 class=\"animate__animated animate__fadeInUp\">\n        <ion-text color=\"light\">Sign Up</ion-text>\n      </h1>\n      <p class=\"animate__animated animate__fadeInUp\">\n        <ion-text color=\"secondary\">Create a free account.</ion-text>\n      </p>\n    </div>\n\n\n    <form class=\"form-default\" [formGroup]=\"signup_form\" (submit)=\"signUp()\">\n      <ion-item color=\"dark\" class=\"animate__animated animate__fadeInUp\">\n        <ion-label position=\"floating\">\n          <ion-icon name=\"mail\" item-start></ion-icon>\n          Email\n        </ion-label>\n        <ion-input color=\"secondary\" type=\"email\" autocomplete=\"off\" formControlName=\"email\"></ion-input>\n      </ion-item>\n\n      <ion-item color=\"dark\" class=\"animate__animated animate__fadeInUp\">\n        <ion-label position=\"floating\">\n          <ion-icon name=\"lock-closed-outline\"></ion-icon>\n          Password\n        </ion-label>\n        <ion-input color=\"secondary\" formControlName=\"password\" type=\"password\" placeholder=\"Your password\"></ion-input>\n      </ion-item>\n\n      <ion-item color=\"dark\" class=\"animate__animated animate__fadeInUp\">\n        <ion-label position=\"floating\">\n          <ion-icon name=\"lock-closed-outline\"></ion-icon>\n          Password repeat\n        </ion-label>\n        <ion-input color=\"secondary\" formControlName=\"password_repeat\" type=\"password\" placeholder=\"Password repeat\"></ion-input>\n      </ion-item>\n\n      <ion-button class=\"ion-margin-top\" type=\"submit\" expand=\"block\" size=\"large\" color=\"secondary\">\n        Sign up free\n      </ion-button>\n    </form>\n\n    <div class=\"ion-text-center ion-margin-top\">\n      <ion-text color=\"medium\">\n        <small>&copy;{{current_year}} Firmino.dev</small>\n      </ion-text>\n    </div>\n\n  </div>\n\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_public_signup_signup_module_ts.js.map