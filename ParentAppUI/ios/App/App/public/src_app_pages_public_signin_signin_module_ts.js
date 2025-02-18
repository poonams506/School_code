(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_public_signin_signin_module_ts"],{

/***/ 21743:
/*!**************************************************************!*\
  !*** ./src/app/pages/public/signin/signin-routing.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SigninPageRoutingModule: () => (/* binding */ SigninPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _signin_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signin.page */ 65921);




const routes = [{
  path: '',
  component: _signin_page__WEBPACK_IMPORTED_MODULE_0__.SigninPage
}];
let SigninPageRoutingModule = class SigninPageRoutingModule {};
SigninPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], SigninPageRoutingModule);


/***/ }),

/***/ 27006:
/*!******************************************************!*\
  !*** ./src/app/pages/public/signin/signin.module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SigninPageModule: () => (/* binding */ SigninPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _signin_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signin-routing.module */ 21743);
/* harmony import */ var _signin_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./signin.page */ 65921);







let SigninPageModule = class SigninPageModule {};
SigninPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _signin_routing_module__WEBPACK_IMPORTED_MODULE_0__.SigninPageRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule],
  declarations: [_signin_page__WEBPACK_IMPORTED_MODULE_1__.SigninPage]
})], SigninPageModule);


/***/ }),

/***/ 65921:
/*!****************************************************!*\
  !*** ./src/app/pages/public/signin/signin.page.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SigninPage: () => (/* binding */ SigninPage)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _signin_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./signin.page.html?ngResource */ 88971);
/* harmony import */ var _signin_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./signin.page.scss?ngResource */ 85753);
/* harmony import */ var _signin_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_signin_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngx-translate/core */ 90852);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment */ 45312);
/* harmony import */ var crypto_js___WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! crypto-js/ */ 75720);
/* harmony import */ var crypto_js___WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(crypto_js___WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _password_reset_password_reset_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../password-reset/password-reset.page */ 89191);
/* harmony import */ var src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/toast/toast.service */ 33545);
/* harmony import */ var src_app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/storage/storage.service */ 85217);
/* harmony import */ var src_app_services_fcm_fcm_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/fcm/fcm.service */ 93881);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @capacitor/core */ 14070);




















let SigninPage = class SigninPage {
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  constructor(document, formBuilder, authClient, router, commonMethods, translate, userService, modalController, toastService, routerOutlet, storageService, fcmService) {
    this.document = document;
    this.formBuilder = formBuilder;
    this.authClient = authClient;
    this.router = router;
    this.commonMethods = commonMethods;
    this.translate = translate;
    this.userService = userService;
    this.modalController = modalController;
    this.toastService = toastService;
    this.routerOutlet = routerOutlet;
    this.storageService = storageService;
    this.fcmService = fcmService;
    this.isError = false;
    this.isLocationError = false;
    this.showLoginPage = true;
    this.password = '';
    this.passwordVisible = false;
    this.isModalOpen = false;
    translate.addLangs(['en', 'hn', 'mr']);
    translate.setDefaultLang('en');
    this.appVersion = src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.APP_VERSION;
  }
  ionViewDidEnter() {
    this.checkIfAlreadyLoggedIn();
  }
  checkIfAlreadyLoggedIn() {
    if (this.userService.isAuthenticated()) {
      this.userService.getUser().subscribe(result => {
        let roleId = localStorage.getItem("id");
        if (roleId && roleId != '') {
          let decryptedString = crypto_js___WEBPACK_IMPORTED_MODULE_7__.AES.decrypt(roleId, src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.ENCRYPTION_PASSWORD).toString(crypto_js___WEBPACK_IMPORTED_MODULE_7__.enc.Utf8);
          if (decryptedString == "3") {
            this.router.navigate(['/teacher-app']);
          } else if (decryptedString == "5") {
            this.router.navigate(['/parent-app']);
          } else if (decryptedString == "6") {
            this.router.navigate(['/driver-app']);
          }
        }
      });
    }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      code: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required]],
      username: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required]],
      password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required]],
      fcmToken: ['']
    });
    this.document.body.classList.add('login-page-body');
    this.translate.use('en');
    this.translate.setDefaultLang('en');
    this.checkIfAlreadyLoggedIn();
  }
  ionViewDidLeave() {
    this.document.body.classList.remove('login-page-body');
  }
  ngOnDestroy() {
    this.document.body.classList.remove('login-page-body');
  }
  get f() {
    return this.loginForm.controls;
  }
  login() {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.loginForm.markAllAsTouched();
      if (_this.loginForm.valid) {
        const formData = _this.loginForm.getRawValue();
        _this.authClient.applogin(formData).subscribe( /*#__PURE__*/function () {
          var _ref = (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (successResult) {
            _this.isError = false;
            if (successResult.isFirstTimeLogin) {
              const modal = yield _this.modalController.create({
                component: _password_reset_password_reset_page__WEBPACK_IMPORTED_MODULE_8__.PasswordResetPage,
                componentProps: {
                  token: successResult.resetPasswordObj.token,
                  schoolCode: formData.code
                },
                presentingElement: _this.routerOutlet.nativeEl
              });
              yield modal.present();
              // Apply filter from modal
              let {
                data
              } = yield modal.onWillDismiss();
              if (data) {
                _this.toastService.presentToast('Success', 'Password reset successfully', 'top', 'success', 2000);
              }
            } else {
              if (successResult.roles.length > 1) {
                let encryptedString = crypto_js___WEBPACK_IMPORTED_MODULE_7__.AES.encrypt(JSON.stringify(successResult), src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.ENCRYPTION_PASSWORD).toString();
                _this.router.navigate(['/role', encryptedString], {
                  replaceUrl: true
                });
              } else {
                let encryptedString = crypto_js___WEBPACK_IMPORTED_MODULE_7__.AES.encrypt(successResult.roles[0].roleId?.toString(), src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.ENCRYPTION_PASSWORD).toString();
                localStorage.setItem("id", encryptedString);
                _this.userService.UserToken = successResult.token;
                _this.storageService.setStorage("TOKEN", _this.userService.UserToken);
                setTimeout(() => {
                  if (successResult.roles[0].roleKey == "Teacher") {
                    _this.router.navigate(['/teacher-app']);
                  } else if (successResult.roles[0].roleKey == "Parent") {
                    _this.router.navigate(['/parent-app']);
                  } else if (successResult.roles[0].roleKey == "Cab_Driver") {
                    _this.router.navigate(['/driver-app']);
                  }
                }, 500);
              }
            }
            if (_capacitor_core__WEBPACK_IMPORTED_MODULE_12__.Capacitor.getPlatform() !== 'web') {
              yield _this.fcmService.clearFCMTokenAndRemoveListener();
              yield _this.fcmService.registerPush();
            }
          });
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }(), /*#__PURE__*/function () {
          var _ref2 = (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (error) {
            _this.isError = true;
            _this.router.navigate(['/signin']);
            if (_capacitor_core__WEBPACK_IMPORTED_MODULE_12__.Capacitor.getPlatform() !== 'web') {
              yield _this.fcmService.clearFCMTokenAndRemoveListener();
            }
          });
          return function (_x2) {
            return _ref2.apply(this, arguments);
          };
        }());
      }
    })();
  }
  setOpen(isOpen) {
    this.isModalOpen = isOpen;
  }
  static #_ = this.ctorParameters = () => [{
    type: Document,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_14__.Inject,
      args: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.DOCUMENT]
    }]
  }, {
    type: _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormBuilder
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.AuthServiceProxy
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_16__.Router
  }, {
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_3__.CommonMethodService
  }, {
    type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslateService
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_5__.UserService
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.ModalController
  }, {
    type: src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_9__.ToastService
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonRouterOutlet
  }, {
    type: src_app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_10__.StorageService
  }, {
    type: src_app_services_fcm_fcm_service__WEBPACK_IMPORTED_MODULE_11__.FcmService
  }];
};
SigninPage = (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_14__.Component)({
  selector: 'app-signin',
  template: _signin_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_signin_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], SigninPage);


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

/***/ 85753:
/*!*****************************************************************!*\
  !*** ./src/app/pages/public/signin/signin.page.scss?ngResource ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `ion-content {
  --background: transparent !important;
  overflow: hidden;
  border-radius: 27px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

ion-modal {
  background: #fff;
  --background: #fff;
}

ion-header {
  height: 150px;
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

.ion-margin-top {
  margin-top: 30px !important;
}

ion-loading.default-loading {
  --background: red;
  --spinner-color: red;
  color: #1c6dff;
}

.app-btn {
  --background: var(--dark-bg-color);
  background: var(--dark-bg-color);
}

ion-avatar {
  position: relative;
  margin-bottom: 50px;
  margin-top: 6px;
}

.logo-w {
  width: 200px;
}
.logo-w img {
  width: 100%;
  max-width: 100%;
}

.login-button {
  padding-left: 0px;
  padding-right: 0px;
  font-size: 16px;
  height: 40px;
  --border-radius: 50px;
  margin-top: 40px;
  --box-shadow: none;
  --background: linear-gradient(135deg, #da8e63, #c754aa);
  --color: var(--white-color);
}

.input-item {
  padding-left: 15px;
  width: 100%;
  border-radius: 40px;
  overflow: visible;
  border: 0px solid #262161;
  height: 44px;
  background: #fff;
  box-shadow: 0px 0px 0px 1px #a0a3aa;
  display: flex;
  align-items: center;
}
.input-item legend {
  float: left;
  width: auto;
  padding: 0;
  margin-bottom: 0;
  margin-top: 7px;
  font-size: 14px;
  font-weight: 500;
  color: #262161;
  line-height: 1;
  left: 15px;
  padding: 2px 0;
  top: -8px;
  z-index: 1;
}
.input-item ion-icon {
  margin-right: 7px;
  font-size: 20px;
  color: #262161;
}
.input-item ion-input {
  margin-top: 0px;
  font-size: 16px;
  font-weight: 500;
  color: #262161;
  min-height: 32px;
  width: 90%;
}

.ion-item {
  overflow: visible;
  --padding-start: 0;
  --inner-padding-end: 0;
  --background: transparent !important;
}

.field-margin {
  margin-bottom: 15px;
}

.text-danger {
  font-size: 12px;
  margin-left: 17px;
  margin-top: 4px;
}

.heading {
  font-size: 28px;
  font-weight: bold;
  padding-left: 20px;
  margin-top: 30px;
  margin-bottom: 5px;
  color: #272262;
}

.para {
  font-size: 18px;
  font-weight: 400;
  padding-left: 20px;
  margin-bottom: 20px;
  color: #272262;
}

.forget-text {
  text-align: center;
  margin-bottom: 0px;
  padding: 10px;
}
.forget-text a {
  text-decoration: none;
  color: #ff5722;
  font-size: 16px;
  font-weight: 500;
}

.heading-text {
  position: absolute;
  top: 0;
}

.header-bg {
  margin-top: -94px;
  width: 100%;
}

.forgot-password {
  text-decoration: underline;
  font-size: 16px;
  color: #5138ee;
}

.version-text {
  position: absolute;
  font-size: 13px;
  color: #737070;
  bottom: 10px;
  left: 0;
  right: 0;
}

.p-text {
  color: #ff5722;
  font-size: 16px;
  font-weight: 500;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/public/signin/signin.page.scss"],"names":[],"mappings":"AAGE;EAGE,oCAAA;EACA,gBAAA;EACA,mBAAA;EACA,4BAAA;EACA,6BAAA;AAJJ;;AAQE;EACE,gBAAA;EACA,kBAAA;AALJ;;AAOE;EACE,aAAA;AAJJ;;AAME;EACE,kBAAA;EACA,iBAAA;AAHJ;AAKI;EACE,eAAA;EACA,gBAAA;EACA,8BAAA;AAHN;AAMI;EACE,mBAAA;AAJN;;AAgBE;EACE,2BAAA;AAbJ;;AAoBE;EACE,iBAAA;EACA,oBAAA;EACA,cAAA;AAjBJ;;AAqBA;EACE,kCAAA;EACA,gCAAA;AAlBF;;AAqBA;EACE,kBAAA;EACA,mBAAA;EACA,eAAA;AAlBF;;AA0BA;EACE,YAAA;AAvBF;AAwBE;EACE,WAAA;EACA,eAAA;AAtBJ;;AA0BA;EACE,iBAAA;EACA,kBAAA;EACA,eAAA;EACA,YAAA;EACA,qBAAA;EACA,gBAAA;EACA,kBAAA;EAEA,uDAAA;EACE,2BAAA;AAxBJ;;AA2BA;EACE,kBAAA;EACA,WAAA;EACA,mBAAA;EACA,iBAAA;EACA,yBAAA;EACA,YAAA;EACA,gBAAA;EAGA,mCAAA;EACA,aAAA;EACA,mBAAA;AA1BF;AA2BI;EACA,WAAA;EACA,WAAA;EACA,UAAA;EACA,gBAAA;EACA,eAAA;EACA,eAAA;EACA,gBAAA;EACA,cAAA;EACA,cAAA;EAEA,UAAA;EACA,cAAA;EAEA,SAAA;EACA,UAAA;AA3BJ;AA6BE;EACE,iBAAA;EACA,eAAA;EACA,cAAA;AA3BJ;AA6BE;EACE,eAAA;EACA,eAAA;EACA,gBAAA;EACA,cAAA;EACA,gBAAA;EACA,UAAA;AA3BJ;;AA8BA;EAEE,iBAAA;EACA,kBAAA;EACA,sBAAA;EACA,oCAAA;AA5BF;;AA8BA;EACE,mBAAA;AA3BF;;AA8BA;EACE,eAAA;EACE,iBAAA;EACA,eAAA;AA3BJ;;AA8BA;EACE,eAAA;EACA,iBAAA;EACA,kBAAA;EACA,gBAAA;EACA,kBAAA;EACA,cAAA;AA3BF;;AA6BA;EACE,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,mBAAA;EACA,cAAA;AA1BF;;AA6BA;EAOE,kBAAA;EACA,kBAAA;EACA,aAAA;AAhCF;AAwBE;EACE,qBAAA;EACA,cAAA;EACA,eAAA;EACA,gBAAA;AAtBJ;;AA4BA;EACE,kBAAA;EACA,MAAA;AAzBF;;AA2BA;EACE,iBAAA;EACA,WAAA;AAxBF;;AA2BA;EACE,0BAAA;EACA,eAAA;EACA,cAAA;AAxBF;;AA2BA;EACE,kBAAA;EACA,eAAA;EACA,cAAA;EACA,YAAA;EACA,OAAA;EACA,QAAA;AAxBF;;AA0BA;EACE,cAAA;EACA,eAAA;EACA,gBAAA;AAvBF","sourcesContent":["\n\n\n  ion-content {\n    // --background: linear-gradient(135deg, var(--ion-color-dark), var(--ion-color-primary));\n    //--background: #272262;\n    --background: transparent !important;\n    overflow: hidden;\n    border-radius: 27px;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n  \n\n  ion-modal {\n    background: #fff;\n    --background: #fff;\n  }\n  ion-header {\n    height: 150px;\n  }\n  .logo-container {\n    text-align: center;\n    padding-top: 90px;\n\n    h1 {\n      font-size: 22px;\n      font-weight: 500;\n      margin: 20px 0 40px!important;\n    }\n\n    p {\n      margin-bottom: 42px;\n    }\n  }\n\n  // .center-grid {\n  //   position: absolute;\n  //   top: 50%;\n  //   left: 50%;\n  //   transform: translate(-50%, -50%) !important;\n  //   display: block !important;\n  //   width: 100%;\n  // }\n  .ion-margin-top {\n    margin-top: 30px !important;\n  }\n  // ion-item {\n  //   --border-width:2px;\n  //   --border-color:var(--ion-color-dark)\n  // }\n\n  ion-loading.default-loading {\n    --background: red;\n    --spinner-color: red;\n    color: #1c6dff;\n  }\n\n\n.app-btn {\n  --background: var(--dark-bg-color);\n  background: var(--dark-bg-color);\n}\n\nion-avatar {\n  position: relative;\n  margin-bottom: 50px;\n  margin-top: 6px;\n\n  // width: 90px;\n  //   height: 90px;\n  //   box-shadow: 0 0 3px 2px #7d7aad;\n\n}\n\n.logo-w {\n  width: 200px;\n  img {\n    width: 100%;\n    max-width: 100%;\n  }\n}\n\n.login-button {\n  padding-left: 0px;\n  padding-right: 0px;\n  font-size: 16px;\n  height: 40px;\n  --border-radius: 50px;\n  margin-top: 40px;\n  --box-shadow: none;\n  //--background: var(--orange-bg-color);\n  --background: linear-gradient(135deg, #da8e63, #c754aa);\n    --color: var(--white-color);\n}\n\n.input-item {\n  padding-left: 15px;\n  width: 100%;\n  border-radius: 40px;\n  overflow: visible;\n  border: 0px solid #262161;\n  height: 44px;\n  background: #fff;\n  //box-shadow: 0px 2px 4px 1px #c1c4c7;\n  //box-shadow: 0px 0px 2px 0px #7b7c7d;\n  box-shadow: 0px 0px 0px 1px #a0a3aa;\n  display: flex;\n  align-items: center;\n    legend {\n    float: left;\n    width: auto;\n    padding: 0;\n    margin-bottom: 0;\n    margin-top: 7px;\n    font-size: 14px;\n    font-weight: 500;\n    color: #262161;\n    line-height: 1;\n    //position: absolute;\n    left: 15px;\n    padding: 2px 0;\n    //background: #fff;\n    top: -8px;\n    z-index: 1;\n  }\n  ion-icon {\n    margin-right: 7px;\n    font-size: 20px;\n    color: #262161;\n  }\n  ion-input {\n    margin-top: 0px;\n    font-size: 16px;\n    font-weight: 500;\n    color: #262161;\n    min-height: 32px;\n    width: 90%;\n  }\n}\n.ion-item {\n  //margin-bottom: 15px;\n  overflow: visible;\n  --padding-start: 0;\n  --inner-padding-end: 0;\n  --background: transparent !important;\n}\n.field-margin {\n  margin-bottom: 15px;\n}\n\n.text-danger {\n  font-size: 12px;\n    margin-left: 17px;\n    margin-top: 4px;\n}\n\n.heading {\n  font-size: 28px;\n  font-weight: bold;\n  padding-left: 20px;\n  margin-top: 30px;\n  margin-bottom: 5px;\n  color: #272262;\n}\n.para {\n  font-size: 18px;\n  font-weight: 400;\n  padding-left: 20px;\n  margin-bottom: 20px;\n  color: #272262;\n}\n\n.forget-text {\n  a {\n    text-decoration: none;\n    color: #ff5722;\n    font-size: 16px;\n    font-weight: 500;\n  }\n  text-align: center;\n  margin-bottom: 0px;\n  padding: 10px;\n}\n.heading-text {\n  position: absolute;\n  top: 0;\n}\n.header-bg {\n  margin-top: -94px;\n  width: 100%;\n}\n\n.forgot-password {\n  text-decoration: underline;\n  font-size: 16px;\n  color: #5138ee;\n\n}\n.version-text {\n  position: absolute;\n  font-size: 13px;\n  color: #737070;\n  bottom: 10px;\n  left: 0;\n  right: 0;\n}\n.p-text {\n  color: #ff5722;\n  font-size: 16px;\n  font-weight: 500;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 88971:
/*!*****************************************************************!*\
  !*** ./src/app/pages/public/signin/signin.page.html?ngResource ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n<!--<ion-header>\n   <img class=\"header-bg\" src=\"../../../../assets/header1.png\" /> \n  <div class=\"heading-text\">\n    <h1 class=\"heading\"> Welcome</h1>\n    <p class=\"para\">Sign in to continue!</p>\n  </div>\n</ion-header>-->\n<ion-content>\n \n  <div class=\"ion-padding ion-full-height ion-flex ion-flex-center center-grid\">\n    <div class=\"logo-container\">\n\n   \n      <div class=\"mx-auto logo-w animate__animated animate__fadeInUp\">\n        <img src=\"../../../../assets/img/new-logo.svg\" />\n      </div>\n      <h1 class=\"animate__animated animate__fadeInUp\">\n        <ion-text class=\"dark-color\">Sign In</ion-text>\n      </h1>\n      <!-- <p class=\"animate__animated animate__fadeInUp\">\n        <ion-text color=\"secondary\">Login to your account.</ion-text>\n      </p> -->\n    </div>\n\n    \n\n    <!-- Login form -->\n    <form class=\"form-default\"  [formGroup]=\"loginForm\" (ngSubmit)=\"login()\" novalidate>\n      <div class=\"field-margin\">\n      <ion-item lines=\"none\" class=\"ion-item\">\n        <fieldset  class=\"input-item\">\n          <!-- <legend>School Code</legend>  -->\n          <ion-icon name=\"list-circle-outline\"></ion-icon>\n          <ion-input type=\"text\" formControlName=\"code\"  placeholder=\"School Code\"></ion-input>\n         \n        </fieldset>\n        \n      </ion-item>\n      <div *ngIf=\"f['code'].touched && f['code'].invalid\">\n        <div class=\"text-danger\" *ngIf=\"f['code'].errors && f['code'].errors['required']\">\n          School Code is required.\n        </div>\n      </div>\n    </div>\n    <div class=\"field-margin\">\n      <ion-item lines=\"none\" class=\"ion-item\">\n        <fieldset  class=\"input-item\">\n          <!-- <legend>Email/Phone</legend>  -->\n          <ion-icon name=\"person-outline\"></ion-icon>\n          <ion-input type=\"text\" formControlName=\"username\"  placeholder=\"Username\"></ion-input>\n        </fieldset>\n      </ion-item>\n      <div *ngIf=\"f['username'].touched && f['username'].invalid\">\n        <div class=\"text-danger\" *ngIf=\"f['username'].errors && f['username'].errors['required']\">\n          Username is required.\n        </div>\n      </div>\n    </div>\n    <div class=\"field-margin\">\n      <ion-item lines=\"none\" class=\"ion-item\">\n        <fieldset  class=\"input-item\">\n          <!-- <legend>Password</legend>  -->\n          <ion-icon name=\"lock-closed-outline\"></ion-icon>\n          <ion-input\n          type=\"{{passwordVisible ? 'text' : 'password'}}\" [(ngModel)]=\"password\"\n                    formControlName=\"password\"\n           placeholder=\"Password\"\n        ></ion-input>\n        <ion-icon name=\"{{passwordVisible ?  'eye':'eye-off'}}\" (click)=\"togglePasswordVisibility()\"></ion-icon>\n       \n        </fieldset>\n       \n      </ion-item>\n      <div *ngIf=\"f['password'].touched && f['password'].invalid\">\n        <div class=\"text-danger\" *ngIf=\"f['password'].errors && f['password'].errors['required']\">\n          Password is required.\n        </div>\n      </div>\n</div>\n\n      <ion-button class=\"login-button\" type=\"submit\" expand=\"block\">Login</ion-button>\n      <div class=\"col-12 d-flex justify-content-center pt-3\">\n        <span *ngIf=\"isError\" class=\"text-danger\">Please enter valid credentials</span>\n      </div>\n    </form>\n  </div>\n  <div class=\"forgot-password text-center\"  (click)=\"setOpen(true)\">Forgot Password?</div>\n\n  <div class=\"version-text text-center\">V {{appVersion}}</div>\n\n  <ion-modal [isOpen]=\"isModalOpen\"  backdropDismiss=\"false\">\n    <ng-template>\n      <ion-header class=\"modal-header\" style=\"height: 50px;\">\n        <ion-toolbar color=\"light\">\n          <ion-title color=\"dark\">Forgot Password</ion-title>\n          <ion-buttons slot=\"end\">\n            <ion-button (click)=\"setOpen(false)\">Close</ion-button>\n          </ion-buttons>\n        </ion-toolbar>\n      </ion-header>\n      <ion-content class=\"ion-padding\">\n        <p class=\"p-text\">\n          Not to worry, please contact your school admin to reset your password.\n        </p>\n      </ion-content>\n    </ng-template>\n  </ion-modal>\n</ion-content>\n\n\n\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_public_signin_signin_module_ts.js.map