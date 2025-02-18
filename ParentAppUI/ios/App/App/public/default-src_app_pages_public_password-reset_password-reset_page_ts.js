(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_pages_public_password-reset_password-reset_page_ts"],{

/***/ 89191:
/*!********************************************************************!*\
  !*** ./src/app/pages/public/password-reset/password-reset.page.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PasswordResetPage: () => (/* binding */ PasswordResetPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _password_reset_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./password-reset.page.html?ngResource */ 62985);
/* harmony import */ var _password_reset_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./password-reset.page.scss?ngResource */ 97175);
/* harmony import */ var _password_reset_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_password_reset_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 90852);
/* harmony import */ var _rxweb_reactive_form_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @rxweb/reactive-form-validators */ 61661);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);










let PasswordResetPage = class PasswordResetPage {
  constructor(document, formBuilder, authClient, translate, modalCtrl) {
    this.document = document;
    this.formBuilder = formBuilder;
    this.authClient = authClient;
    this.translate = translate;
    this.modalCtrl = modalCtrl;
    this.isSubmitted = false;
    this.passwordVisible = false;
    this.confirmPasswordVisible = false;
    this.forgotPasswordForm = this.formBuilder.group({
      password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.minLength(8)]],
      confirmPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _rxweb_reactive_form_validators__WEBPACK_IMPORTED_MODULE_4__.RxwebValidators.compare({
        fieldName: 'password'
      })]],
      schoolCode: [''],
      token: ['']
    });
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }
  ngOnInit() {
    this.document.body.classList.add('reset-page-body');
    this.forgotPasswordForm.get('schoolCode').setValue(this.schoolCode);
  }
  get f() {
    return this.forgotPasswordForm.controls;
  }
  ChangePassword() {
    this.isSubmitted = true;
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    let resetPasswordDto = this.forgotPasswordForm.getRawValue();
    resetPasswordDto.token = this.token;
    this.authClient.changePassword(resetPasswordDto).subscribe(() => {
      return this.modalCtrl.dismiss(true, 'success');
    });
  }
  close() {
    return this.modalCtrl.dismiss(false, 'cancel');
  }
  ngOnDestroy() {
    this.document.body.classList.remove('reset-page-body');
  }
  static #_ = this.ctorParameters = () => [{
    type: Document,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Inject,
      args: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.DOCUMENT]
    }]
  }, {
    type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_2__.AuthServiceProxy
  }, {
    type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateService
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController
  }];
};
PasswordResetPage = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  selector: 'app-password-reset',
  template: _password_reset_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_password_reset_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], PasswordResetPage);


/***/ }),

/***/ 97175:
/*!*********************************************************************************!*\
  !*** ./src/app/pages/public/password-reset/password-reset.page.scss?ngResource ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.form-default {
  margin-top: 0px;
}
.form-default ion-item {
  --border-radius: 0px;
  margin-bottom: 0px;
  --padding-start: 0px;
  --inner-padding-end: 0;
  background-color: #fff !important;
  --background: #fff !important;
  --background-activated: #fff !important;
  --background-focused: #fff !important;
  --background-hover: #fff !important;
  --border: 0 !important;
  border: 0 !important;
  --highlight: #fff !important;
  position: relative;
}
.form-default ion-item ion-icon {
  position: absolute;
  right: 10px;
  top: 42px;
  z-index: 3;
}
.form-default ion-item.item-interactive.ion-valid {
  --highlight-background: #fff !important;
}
.form-default ion-item ion-input {
  background-color: #fff !important;
  border: 1px solid #ccc;
  padding-left: 10px !important;
  border-radius: 40px !important;
  font-size: 13px !important;
  color: #000 !important;
  position: relative;
  padding-right: 36px !important;
}
.form-default ion-item ion-input.input-disabled {
  background: #ededf0 !important;
  opacity: 1;
}
.form-default ion-item ion-label {
  margin-bottom: 10px;
  color: #000 !important;
  opacity: 1 !important;
}
.form-default ion-item.item-interactive-disabled ion-input {
  background: #ededf0 !important;
}
.form-default .label-floating {
  max-width: -moz-fit-content !important;
  max-width: fit-content !important;
}

ion-button {
  position: absolute;
  bottom: 60px;
  width: 95%;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding-left: 0px;
  padding-right: 0px;
  font-size: 16px;
  height: 40px;
  --border-radius: 50px;
  border-radius: 50px;
  margin-top: 15px;
  --box-shadow: none;
  box-shadow: none;
  background: linear-gradient(135deg, #da8e63, #c754aa);
  color: var(--white-color);
  --background: linear-gradient(135deg, #da8e63, #c754aa);
  --color: var(--white-color);
}

.logo-container {
  text-align: center;
  padding-top: 90px;
}
.logo-container h1 {
  font-size: 22px;
  font-weight: 500;
  margin: 20px 0 40px !important;
}
.logo-container p {
  margin-bottom: 42px;
}

ion-toolbar {
  background-color: var(--ion-color-primary-contrast);
}`, "",{"version":3,"sources":["webpack://./src/app/pages/public/password-reset/password-reset.page.scss"],"names":[],"mappings":"AAAA;EACE,eAAA;AACF;AAAE;EACE,oBAAA;EACA,kBAAA;EACA,oBAAA;EACA,sBAAA;EACA,iCAAA;EACA,6BAAA;EACA,uCAAA;EACA,qCAAA;EACA,mCAAA;EACA,sBAAA;EACA,oBAAA;EACA,4BAAA;EACA,kBAAA;AAEJ;AADI;EACE,kBAAA;EACJ,WAAA;EACA,SAAA;EACA,UAAA;AAGF;AAAI;EACE,uCAAA;AAEN;AAAI;EACE,iCAAA;EACA,sBAAA;EACA,6BAAA;EACA,8BAAA;EACA,0BAAA;EACA,sBAAA;EACA,kBAAA;EACA,8BAAA;AAEN;AAAM;EACE,8BAAA;EACA,UAAA;AAER;AACI;EACE,mBAAA;EACA,sBAAA;EACA,qBAAA;AACN;AAGM;EACE,8BAAA;AADR;AAKE;EACE,sCAAA;EAAA,iCAAA;AAHJ;;AAOA;EACE,kBAAA;EACE,YAAA;EACA,UAAA;EACA,OAAA;EACA,QAAA;EACA,cAAA;EACA,iBAAA;EACA,kBAAA;EACA,eAAA;EACA,YAAA;EACA,qBAAA;EACA,mBAAA;EACA,gBAAA;EACA,kBAAA;EACA,gBAAA;EACA,qDAAA;EACA,yBAAA;EACI,uDAAA;EACF,2BAAA;AAJN;;AAOA;EACE,kBAAA;EACA,iBAAA;AAJF;AAME;EACE,eAAA;EACA,gBAAA;EACA,8BAAA;AAJJ;AAOE;EACE,mBAAA;AALJ;;AAQA;EACE,mDAAA;AALF","sourcesContent":[".form-default {\n  margin-top: 0px;\n  ion-item {\n    --border-radius: 0px;\n    margin-bottom: 0px;\n    --padding-start: 0px;\n    --inner-padding-end: 0;\n    background-color: #fff !important;\n    --background: #fff !important;\n    --background-activated: #fff !important;\n    --background-focused: #fff !important;\n    --background-hover: #fff !important;\n    --border: 0 !important;\n    border: 0 !important;\n    --highlight: #fff !important;\n    position: relative;\n    ion-icon {\n      position: absolute;\n  right: 10px;\n  top: 42px;\n  z-index: 3;\n    }\n\n    &.item-interactive.ion-valid {\n      --highlight-background: #fff !important;\n    }\n    ion-input {\n      background-color: #fff !important;\n      border: 1px solid #ccc;\n      padding-left: 10px !important;\n      border-radius: 40px !important;\n      font-size: 13px !important;\n      color: #000 !important;\n      position: relative;\n      padding-right: 36px !important;\n     \n      &.input-disabled {\n        background: #ededf0 !important;\n        opacity: 1;\n      }\n    }\n    ion-label {\n      margin-bottom: 10px;\n      color: #000 !important;\n      opacity: 1 !important;\n    }\n  \n    &.item-interactive-disabled {\n      ion-input {\n        background: #ededf0 !important;\n      }\n    }\n  }\n  .label-floating {\n    max-width: fit-content !important;\n  }\n}\n\nion-button {\n  position: absolute;\n    bottom: 60px;\n    width: 95%;\n    left: 0;\n    right: 0;\n    margin: 0 auto;\n    padding-left: 0px;\n    padding-right: 0px;\n    font-size: 16px;\n    height: 40px;\n    --border-radius: 50px;\n    border-radius: 50px;\n    margin-top: 15px;\n    --box-shadow: none;\n    box-shadow: none;\n    background: linear-gradient(135deg, #da8e63, #c754aa);\n    color: var(--white-color);\n        --background: linear-gradient(135deg, #da8e63, #c754aa);\n      --color: var(--white-color);\n}\n\n.logo-container {\n  text-align: center;\n  padding-top: 90px;\n\n  h1 {\n    font-size: 22px;\n    font-weight: 500;\n    margin: 20px 0 40px!important;\n  }\n\n  p {\n    margin-bottom: 42px;\n  }\n}\nion-toolbar {\n  background-color: var(--ion-color-primary-contrast);\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 62985:
/*!*********************************************************************************!*\
  !*** ./src/app/pages/public/password-reset/password-reset.page.html?ngResource ***!
  \*********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n\n<ion-content>\n\n  <div class=\"ion-padding ion-full-height ion-flex ion-flex-center\">\n\n    <div class=\"logo-container\">\n      <h1 class=\"animate__animated animate__fadeInUp\">\n        <ion-text class=\"dark-color\">Reset Password</ion-text>\n      </h1>\n    </div>\n\n    <form class=\"form-default\" [formGroup]=\"forgotPasswordForm\">\n\n      <ion-item lines=\"none\">\n        <ion-label position=\"stacked\">\n         New Password        \n        </ion-label>\n        <ion-input type=\"{{passwordVisible ? 'text' : 'password'}}\" formControlName=\"password\" placeholder=\"Password\"></ion-input>\n        <ion-icon name=\"{{passwordVisible ? 'eye' : 'eye-off'}}\" (click)=\"togglePasswordVisibility()\"></ion-icon>\n        <ion-note *ngIf=\"f['password'].touched && f['password'].hasError('minlength')\" slot=\"error\">Password should be at least of 8 characters.</ion-note>\n        <ion-note *ngIf=\"isSubmitted && f['password'].hasError('required')\" slot=\"error\">New Password is required.</ion-note>\n      </ion-item>\n\n      <ion-item lines=\"none\">\n        <ion-label position=\"stacked\">\n          Confirm New Password        \n        </ion-label>\n        <ion-input type=\"{{confirmPasswordVisible ? 'text' : 'password'}}\" formControlName=\"confirmPassword\" placeholder=\"Confirm Password\"></ion-input>\n        <ion-icon name=\"{{confirmPasswordVisible ? 'eye' : 'eye-off'}}\" (click)=\"toggleConfirmPasswordVisibility()\"></ion-icon>\n        <ion-note *ngIf=\"isSubmitted && f['confirmPassword'].hasError('required')\" slot=\"error\">Confirm New Password is required.</ion-note>\n        <ion-note *ngIf=\"f['confirmPassword'].touched && !f['confirmPassword'].hasError('required') && f['confirmPassword'].hasError('compare')\" slot=\"error\">New Password and Confirm New Password should match.</ion-note>\n      </ion-item>\n      \n      <ion-button expand=\"block\" (click)=\"ChangePassword()\">\n        Reset password\n      </ion-button>\n    </form>\n\n  </div>\n\n</ion-content>\n\n";

/***/ })

}]);
//# sourceMappingURL=default-src_app_pages_public_password-reset_password-reset_page_ts.js.map