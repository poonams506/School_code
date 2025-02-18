(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_teacherApp_home_home_module_ts"],{

/***/ 80569:
/*!**************************************************************!*\
  !*** ./src/app/pages/teacherApp/home/home-routing.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePageRoutingModule: () => (/* binding */ HomePageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page */ 42059);




const routes = [{
  path: '',
  component: _home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage,
  children: []
}];
let HomePageRoutingModule = class HomePageRoutingModule {};
HomePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], HomePageRoutingModule);


/***/ }),

/***/ 7280:
/*!******************************************************!*\
  !*** ./src/app/pages/teacherApp/home/home.module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePageModule: () => (/* binding */ HomePageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-icons/core */ 38233);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 90852);
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home-routing.module */ 80569);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page */ 42059);









let HomePageModule = class HomePageModule {};
HomePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _home_routing_module__WEBPACK_IMPORTED_MODULE_0__.HomePageRoutingModule, _ng_icons_core__WEBPACK_IMPORTED_MODULE_7__.NgIconComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateModule],
  declarations: [_home_page__WEBPACK_IMPORTED_MODULE_1__.HomePage]
})], HomePageModule);


/***/ }),

/***/ 42059:
/*!****************************************************!*\
  !*** ./src/app/pages/teacherApp/home/home.page.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePage: () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _home_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page.html?ngResource */ 59885);
/* harmony import */ var _home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.page.scss?ngResource */ 23547);
/* harmony import */ var _home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 78205);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 90852);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment */ 45312);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @capacitor/core */ 14070);
/* harmony import */ var src_app_services_fcm_fcm_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/fcm/fcm.service */ 93881);












let HomePage = class HomePage {
  constructor(translate, commonMethod, platform, schoolService, fcmService) {
    this.translate = translate;
    this.commonMethod = commonMethod;
    this.platform = platform;
    this.schoolService = schoolService;
    this.fcmService = fcmService;
    this.canDismiss = false;
    this.presentingElement = null;
    this.title = "Home";
    this.content_loaded = false;
    this.isAppAccessible = true;
    this.toastButtons = [{
      text: 'Dismiss'
    }];
  }
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Home');
    this.initializeApp();
  }
  initializeApp() {
    var _this = this;
    this.platform.ready().then( /*#__PURE__*/(0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.platform.is('android') || _this.platform.is('ios')) {
        yield _this.checkForUpdate();
      }
    }));
  }
  checkForUpdate() {
    var _this2 = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_capacitor_core__WEBPACK_IMPORTED_MODULE_6__.Capacitor.getPlatform() !== 'web') {
        yield _this2.fcmService.clearFCMTokenAndRemoveListener();
        yield _this2.fcmService.registerPush();
      }
      _this2.schoolService.getCurrentSchoolAppVersion().subscribe(result => {
        if (src_environments_environment__WEBPACK_IMPORTED_MODULE_5__.environment.APP_VERSION === result.configurationValue && result.isUpdateCheck == true) {
          _this2.isAppAccessible = true;
        } else if (result.isUpdateCheck == true) {
          _this2.isAppAccessible = false;
        } else {
          _this2.isAppAccessible = true;
        }
      });
    })();
  }
  redirectToPlayStore() {
    //App.exitApp();
    setTimeout(() => {
      window.open('https://play.google.com/store/apps/details?id=com.schoolhub360.schoolApp', '_system');
    }, 500);
  }
  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  ngOnInit() {}
  refreshPage() {
    window.location.reload();
  }
  static #_ = this.ctorParameters = () => [{
    type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateService
  }, {
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_3__.CommonMethodService
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.Platform
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.SchoolServiceProxy
  }, {
    type: src_app_services_fcm_fcm_service__WEBPACK_IMPORTED_MODULE_7__.FcmService
  }];
};
HomePage = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Component)({
  selector: 'app-home',
  template: _home_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], HomePage);


/***/ }),

/***/ 23547:
/*!*****************************************************************!*\
  !*** ./src/app/pages/teacherApp/home/home.page.scss?ngResource ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:host {
  background-color: #fff;
}
:host ion-list {
  background-color: white;
}

ion-toolbar {
  height: 60px !important;
}

.dashboard-button {
  display: flex;
  column-gap: 30px;
  flex-wrap: wrap;
}
.dashboard-button .s-button {
  width: 85px;
  margin-bottom: 30px;
  box-shadow: 0px 0px 3px 1px #F27494;
  border-radius: 15px;
}
.dashboard-button .s-button .dashboard-icons {
  width: 100%;
  height: 65px;
  width: 65px;
  border-radius: 65px;
  border: 1px solid rgba(192, 186, 230, 0.5294117647);
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(192, 186, 230, 0.5294117647);
}
.dashboard-button .s-button .dashboard-icons img {
  width: 55%;
}
.dashboard-button .s-button ion-button {
  width: 100%;
}
.dashboard-button .s-button.color1 .dashboard-icons {
  background: #bcea95;
  border: 1px solid #bcea95;
}
.dashboard-button .s-button.color2 .dashboard-icons {
  background: #aff5ff;
  border: 1px solid #aff5ff;
}
.dashboard-button .s-button.color3 .dashboard-icons {
  background: #fdcbe2;
  border: 1px solid #fdcbe2;
}
.dashboard-button .s-button.color4 .dashboard-icons {
  background: #ffde87;
  border: 1px solid #ffde87;
}

.dashboard-text {
  color: #000 !important;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.ion-padding {
  padding: 30px 20px;
}

.name-padding {
  margin-top: 30px;
}

.height-name {
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  font-weight: 500;
  padding: 5px 10px;
  color: #623AA2 !important;
  background: #F3EBFF;
  border: 1px solid #623AA2;
  margin: 15px 15px 5px;
  border-radius: 4px;
  align-items: center;
}
.height-name .teacher-image {
  width: 35px;
  height: 35px;
  margin-left: 0px;
  border-radius: 65px;
  overflow: hidden;
  margin-right: 20px;
}
.height-name .teacher-name {
  font-size: 14px;
  line-height: 1.3;
  font-weight: 400;
}
.height-name .subject {
  font-size: 12px;
  line-height: 1;
  font-weight: 400;
}
.height-name .left {
  padding-left: 10px;
}

.card-height {
  height: 100%;
  margin: 0;
  border: 0;
  box-shadow: none;
  border-radius: 0px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

ion-title {
  --color:#fff ;
}

ion-button .ion-color {
  --color:red !important ;
}

.class-name {
  font-size: 20px;
  font-weight: 600;
  padding-left: 20px !important;
}

.roll-number {
  font-size: 12px;
}

.w-100 {
  width: 100%;
  display: block;
}

ion-avatar {
  width: 32px;
  height: 32px;
  border: 1px solid #ccc;
}

.school-name {
  font-size: 12px;
  font-weight: normal;
  padding: 0;
  text-align: left;
}

ion-item-sliding {
  margin-bottom: 10px;
  border: 1px solid #b5b2b2;
  box-shadow: 1px 1px 3px 1px #b5b2b2;
  border-radius: 10px;
}
ion-item-sliding ion-item {
  --background: #fff;
}
ion-item-sliding ion-item ion-label {
  font-size: 14px;
  font-weight: 500;
}

ion-toast.custom-toast {
  --background: #f4f4fa;
  --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
  --color: #4b4a50;
  top: -60px;
}

ion-toast.custom-toast::part(message) {
  font-style: italic;
}

ion-toast.custom-toast::part(button) {
  border-left: 1px solid #d2d2d2;
  color: #030207;
  font-size: 15px;
}

ion-toast.custom-toast2 {
  --background: #833333;
  --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
  --color: #4b4a50;
  top: -70px;
}

ion-toast.custom-toast2::part(message) {
  font-style: italic;
}

ion-toast.custom-toas2t::part(button) {
  border-left: 1px solid #d2d2d2;
  color: #030207;
  font-size: 15px;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/teacherApp/home/home.page.scss"],"names":[],"mappings":"AAAA;EACE,sBAAA;AACF;AAAE;EACE,uBAAA;AAEJ;;AAEA;EACE,uBAAA;AACF;;AAEA;EACE,aAAA;EAEA,gBAAA;EACA,eAAA;AAAF;AACE;EACE,WAAA;EACA,mBAAA;EACA,mCAAA;EACA,mBAAA;AACJ;AAAI;EACE,WAAA;EACA,YAAA;EACA,WAAA;EACA,mBAAA;EACA,mDAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,6CAAA;AAEN;AADM;EACE,UAAA;AAGR;AAAI;EACE,WAAA;AAEN;AACM;EACE,mBAAA;EACA,yBAAA;AACR;AAIM;EACE,mBAAA;EACA,yBAAA;AAFR;AAOM;EACE,mBAAA;EACA,yBAAA;AALR;AAUM;EACE,mBAAA;EACA,yBAAA;AARR;;AAcA;EACE,sBAAA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;EACA,aAAA;EACA,uBAAA;EACA,gBAAA;EACA,mBAAA;AAXF;;AAeA;EACE,kBAAA;AAZF;;AAgBA;EACA,gBAAA;AAbA;;AAoBA;EACE,aAAA;EACA,eAAA;EACA,eAAA;EACE,gBAAA;EACA,iBAAA;EACJ,yBAAA;EACA,mBAAA;EACA,yBAAA;EACA,qBAAA;EACA,kBAAA;EACA,mBAAA;AAjBA;AAkBE;EACE,WAAA;EACA,YAAA;EACA,gBAAA;EACA,mBAAA;EACA,gBAAA;EACA,kBAAA;AAhBJ;AAkBE;EACE,eAAA;EACA,gBAAA;EACA,gBAAA;AAhBJ;AAkBE;EACE,eAAA;EACA,cAAA;EACA,gBAAA;AAhBJ;AAkBA;EACE,kBAAA;AAhBF;;AAoBA;EAEI,YAAA;EACA,SAAA;EACA,SAAA;EACA,gBAAA;EACA,kBAAA;EACJ,4BAAA;EACA,6BAAA;AAlBA;;AAqBA;EACE,aAAA;AAlBF;;AAsBE;EACE,uBAAA;AAnBJ;;AAuBA;EACE,eAAA;EACA,gBAAA;EAEA,6BAAA;AArBF;;AA0BA;EACE,eAAA;AAvBF;;AA0BA;EACE,WAAA;EACA,cAAA;AAvBF;;AA2BA;EACE,WAAA;EACA,YAAA;EACA,sBAAA;AAxBF;;AA4BA;EACE,eAAA;EACE,mBAAA;EACA,UAAA;EACA,gBAAA;AAzBJ;;AA4BA;EACE,mBAAA;EACA,yBAAA;EACA,mCAAA;EACA,mBAAA;AAzBF;AA0BE;EACE,kBAAA;AAxBJ;AAyBI;EACE,eAAA;EACA,gBAAA;AAvBN;;AA8BA;EACE,qBAAA;EACA,+CAAA;EACA,gBAAA;EACA,UAAA;AA3BF;;AA8BA;EACE,kBAAA;AA3BF;;AA8BA;EACE,8BAAA;EACA,cAAA;EACA,eAAA;AA3BF;;AA8BA;EACE,qBAAA;EACA,+CAAA;EACA,gBAAA;EACA,UAAA;AA3BF;;AA8BA;EACE,kBAAA;AA3BF;;AA8BA;EACE,8BAAA;EACA,cAAA;EACA,eAAA;AA3BF","sourcesContent":[":host {\n  background-color: #fff;\n  ion-list {\n    background-color: #ffff;\n  }\n}\n\nion-toolbar {\n  height: 60px !important;\n}\n\n.dashboard-button {\n  display: flex;\n // justify-content: space-between;\n  column-gap: 30px;\n  flex-wrap: wrap;\n  .s-button {\n    width: 85px;\n    margin-bottom: 30px;\n    box-shadow: 0px 0px 3px 1px #F27494;\n    border-radius: 15px;\n    .dashboard-icons {\n      width: 100%;\n      height: 65px;\n      width: 65px;      \n      border-radius: 65px;\n      border: 1px solid #c0bae687;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: #c0bae687;\n      img {\n        width: 55%;\n      }\n    }\n    ion-button {\n      width: 100%;\n    }\n    &.color1 {\n      .dashboard-icons {\n        background: #bcea95;\n        border: 1px solid #bcea95;\n      }\n    }\n\n    &.color2 {\n      .dashboard-icons {\n        background: #aff5ff;\n        border: 1px solid #aff5ff;\n      }\n    }\n\n    &.color3 {\n      .dashboard-icons {\n        background: #fdcbe2;\n        border: 1px solid #fdcbe2;\n      }\n    }\n\n    &.color4 {\n      .dashboard-icons {\n        background: #ffde87;\n        border: 1px solid #ffde87;\n      }\n    }\n  }\n}\n\n.dashboard-text {\n  color: #000 !important;\n  font-size: 12px;\n  font-weight: 500;\n  text-align: center;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  margin-top: 10px;\n  margin-bottom: 10px;\n\n}\n\n.ion-padding {\n  padding: 30px 20px;\n}\n\n\n.name-padding {\nmargin-top: 30px;\n}\n// .height-class {\n//   --min-height: 30px;\n//   min-height: 30px;\n\n// }\n.height-name {\n  display: flex;\n  flex-wrap: wrap;\n  font-size: 13px;\n    font-weight: 500;\n    padding: 5px 10px;\ncolor: #623AA2 !important;\nbackground: #F3EBFF;\nborder: 1px solid #623AA2;\nmargin: 15px 15px 5px;\nborder-radius: 4px;\nalign-items: center;\n  .teacher-image{\n    width: 35px;\n    height: 35px;\n    margin-left: 0px;\n    border-radius: 65px;\n    overflow: hidden;\n    margin-right: 20px;\n  }\n  .teacher-name {\n    font-size: 14px;\n    line-height: 1.3;\n    font-weight: 400;\n  }\n  .subject {\n    font-size: 12px;\n    line-height: 1;\n    font-weight: 400;\n  }\n.left {\n  padding-left: 10px;\n}\n}\n\n.card-height {\n  //background-color: red;\n    height: 100%;\n    margin: 0;\n    border: 0;\n    box-shadow: none;\n    border-radius: 0px;\nborder-bottom-left-radius: 0;\nborder-bottom-right-radius: 0;\n}\n\nion-title {\n  --color:#fff\n}\n\nion-button {\n  .ion-color {\n    --color:red !important\n  }\n}\n\n.class-name {\n  font-size: 20px;\n  font-weight: 600;\n  //text-align: left;\n  padding-left: 20px !important;\n}\n\n\n\n.roll-number {\n  font-size: 12px;\n}\n\n.w-100 {\n  width: 100%;\n  display: block;\n}\n\n\nion-avatar {\n  width: 32px;\n  height: 32px;\n  border: 1px solid #ccc;\n\n}\n\n.school-name {\n  font-size: 12px;\n    font-weight: normal;\n    padding: 0;\n    text-align: left;\n}\n\nion-item-sliding {\n  margin-bottom: 10px;\n  border: 1px solid #b5b2b2;\n  box-shadow: 1px 1px 3px 1px #b5b2b2;\n  border-radius: 10px;\n  ion-item {\n    --background: #fff;\n    ion-label {\n      font-size: 14px;\n      font-weight: 500;\n    }\n  }\n}\n\n\n\nion-toast.custom-toast {\n  --background: #f4f4fa;\n  --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);\n  --color: #4b4a50;\n  top: -60px;\n}\n\nion-toast.custom-toast::part(message) {\n  font-style: italic;\n}\n\nion-toast.custom-toast::part(button) {\n  border-left: 1px solid #d2d2d2;\n  color: #030207;\n  font-size: 15px;\n}\n\nion-toast.custom-toast2 {\n  --background: #833333;\n  --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);\n  --color: #4b4a50;\n  top: -70px;\n}\n\nion-toast.custom-toast2::part(message) {\n  font-style: italic;\n}\n\nion-toast.custom-toas2t::part(button) {\n  border-left: 1px solid #d2d2d2;\n  color: #030207;\n  font-size: 15px;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 59885:
/*!*****************************************************************!*\
  !*** ./src/app/pages/teacherApp/home/home.page.html?ngResource ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n \n  <ion-content [fullscreen]=\"true\" class=\"light-content name-padding\">\n    <ion-refresher slot=\"fixed\" (ionRefresh)=\"handleRefresh($event)\">\n      <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n\n    <div *ngIf=\"isAppAccessible\" class=\"ion-padding\">\n      <ion-buttons slot=\"primary\" class=\"dashboard-button\">\n       \n        <div class=\"s-button color1\">\n          <ion-button routerLink=\"/teacher-app/teacherTab/profile\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/profile-2.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\"> {{\"PROFILE\" | translate}}</ion-text>\n        </div>\n\n        <div class=\"s-button color2\">\n          <ion-button routerLink=\"/teacher-app/teacherTab/attendance\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/attendance-2.png\" />\n            </div>\n          </ion-button>\n          \n          <ion-text class=\"dashboard-text\">Attendance</ion-text>\n        </div>\n\n        <div class=\"s-button color3\">\n          <ion-button routerLink=\"/teacher-app/teacherTab/timetable\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/timetable.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\">Timetable</ion-text>\n        </div>\n        <div class=\"s-button color4\">\n          <ion-button routerLink=\"/teacher-app/teacherTab/homework\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/homework.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\">Homework</ion-text>\n        </div>\n        <div class=\"s-button color1\">\n          <ion-button routerLink=\"/teacher-app/teacherTab/notice\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/message.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\">Notice</ion-text>\n        </div>\n        <div class=\"s-button color1\">\n          <ion-button routerLink=\"/teacher-app/teacherTab/gallery\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/gallery.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\">Gallery</ion-text>\n        </div>\n\n        <div class=\"s-button color2\">\n          <ion-button routerLink=\"/teacher-app/teacherTab/students\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/notification.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\">Students</ion-text>\n        </div>\n\n        <div class=\"s-button color3\">\n          <ion-button routerLink=\"/teacher-app/teacherTab/calendar\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/calendar.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\">Calendar</ion-text>\n        </div>\n      </ion-buttons>\n    </div>\n  </ion-content>\n\n\n  <ion-modal id=\"example-modal\" class=\"update-modal\" #modal [isOpen]=\"!isAppAccessible\" [canDismiss]=\"canDismiss\" [presentingElement]=\"presentingElement\">\n    <ng-template>\n      <div  class=\"update-app\">\n          <span class=\"icon\"><ion-icon name=\"notifications-outline\"></ion-icon></span>\n          <p class=\"text\">A new version of the app is available. If you haven't updated it please click on update or else click on close.</p>\n        <button (click)=\"redirectToPlayStore()\" class=\"update-button\">Update</button> &nbsp;\n        <button (click)=\"refreshPage()\" class=\"update-button\">Close</button>\n        </div>\n    </ng-template>\n  </ion-modal>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_teacherApp_home_home_module_ts.js.map