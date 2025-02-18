(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_parentApp_home_home_module_ts"],{

/***/ 2403:
/*!*************************************************************!*\
  !*** ./src/app/pages/parentApp/home/home-routing.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePageRoutingModule: () => (/* binding */ HomePageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page */ 38821);




const routes = [{
  path: '',
  component: _home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage
}];
let HomePageRoutingModule = class HomePageRoutingModule {};
HomePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], HomePageRoutingModule);


/***/ }),

/***/ 18978:
/*!*****************************************************!*\
  !*** ./src/app/pages/parentApp/home/home.module.ts ***!
  \*****************************************************/
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
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home-routing.module */ 2403);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page */ 38821);









let HomePageModule = class HomePageModule {};
HomePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _home_routing_module__WEBPACK_IMPORTED_MODULE_0__.HomePageRoutingModule, _ng_icons_core__WEBPACK_IMPORTED_MODULE_7__.NgIconComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateModule],
  declarations: [_home_page__WEBPACK_IMPORTED_MODULE_1__.HomePage]
})], HomePageModule);


/***/ }),

/***/ 38821:
/*!***************************************************!*\
  !*** ./src/app/pages/parentApp/home/home.page.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePage: () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _home_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page.html?ngResource */ 12299);
/* harmony import */ var _home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.page.scss?ngResource */ 60395);
/* harmony import */ var _home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 78205);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 90852);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment */ 45312);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var src_app_services_fcm_fcm_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/fcm/fcm.service */ 93881);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @capacitor/core */ 14070);














let HomePage = class HomePage {
  constructor(translate, commonAppService, userService, commonMethod, platform, schoolService, router, fcmService) {
    this.translate = translate;
    this.commonAppService = commonAppService;
    this.userService = userService;
    this.commonMethod = commonMethod;
    this.platform = platform;
    this.schoolService = schoolService;
    this.router = router;
    this.fcmService = fcmService;
    this.canDismiss = false;
    this.presentingElement = null;
    this.environment = src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment;
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
      if (_capacitor_core__WEBPACK_IMPORTED_MODULE_8__.Capacitor.getPlatform() !== 'web') {
        yield _this2.fcmService.clearFCMTokenAndRemoveListener();
        yield _this2.fcmService.registerPush();
      }
      _this2.schoolService.getCurrentSchoolAppVersion().subscribe(result => {
        if (src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.APP_VERSION === result.configurationValue && result.isUpdateCheck == true) {
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
  navigateAndRefresh(path) {
    this.router.navigate([path]).then(() => {
      window.location.reload();
    });
  }
  refreshPage() {
    window.location.reload();
  }
  static #_ = this.ctorParameters = () => [{
    type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.CommonAppServiceProxy
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_5__.UserService
  }, {
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_3__.CommonMethodService
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.Platform
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.SchoolServiceProxy
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.Router
  }, {
    type: src_app_services_fcm_fcm_service__WEBPACK_IMPORTED_MODULE_7__.FcmService
  }];
};
HomePage = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.Component)({
  selector: 'app-home',
  template: _home_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], HomePage);


/***/ }),

/***/ 60395:
/*!****************************************************************!*\
  !*** ./src/app/pages/parentApp/home/home.page.scss?ngResource ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:host {
  background-color: var(--ion-color-dark);
}
:host ion-list {
  background-color: var(--ion-color-primary-contrast);
}

.padding-inline {
  padding: 0 60px !important;
  text-align: left;
}

.dashboard-button {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  align-items: flex-start;
}
.dashboard-button .s-button {
  width: 90px;
}
.dashboard-button .s-button .dashboard-icons {
  width: 100%;
  height: 65px;
  border-radius: 15px;
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

.dashboard-text {
  color: #000 !important;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.ion-padding {
  padding: 30px 20px;
}

.name-padding {
  margin-top: 30px;
}

.height-name {
  height: 90px;
  display: flex;
}
.height-name ion-avatar {
  width: 42px;
  height: 42px;
  margin-left: 10px;
}
.height-name .left {
  padding-left: 10px;
}

.card-height {
  height: 100%;
  margin: 0;
  border: 0;
  box-shadow: none;
  border-radius: 20px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

ion-title {
  --color:#fff ;
}

ion-button .ion-color {
  --color:red !important ;
}

.student-name {
  font-size: 18px;
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
  padding: 0 55px;
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
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/home/home.page.scss"],"names":[],"mappings":"AAAA;EACE,uCAAA;AACF;AAAE;EACE,mDAAA;AAEJ;;AAEA;EACE,0BAAA;EACE,gBAAA;AACJ;;AAEA;EAKE,aAAA;EACE,SAAA;EACA,qCAAA;EACA,uBAAA;AAHJ;AAIE;EACE,WAAA;AAFJ;AAII;EACE,WAAA;EACA,YAAA;EACA,mBAAA;EACA,mDAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,6CAAA;AAFN;AAGM;EACE,UAAA;AADR;AAII;EACE,WAAA;AAFN;;AAOA;EACE,sBAAA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;EACA,aAAA;EACA,uBAAA;EACA,gBAAA;AAJF;;AAOA;EACE,kBAAA;AAJF;;AAQA;EACA,gBAAA;AALA;;AAOA;EACE,YAAA;EACA,aAAA;AAJF;AAKE;EACE,WAAA;EACA,YAAA;EACA,iBAAA;AAHJ;AAKA;EACE,kBAAA;AAHF;;AAOA;EAEI,YAAA;EACA,SAAA;EACA,SAAA;EACA,gBAAA;EACA,mBAAA;EACJ,4BAAA;EACA,6BAAA;AALA;;AAQA;EACE,aAAA;AALF;;AASE;EACE,uBAAA;AANJ;;AAUA;EACE,eAAA;AAPF;;AAUA;EACE,eAAA;AAPF;;AAUA;EACE,WAAA;EACA,cAAA;AAPF;;AAWA;EACE,WAAA;EACA,YAAA;EACA,sBAAA;AARF;;AAYA;EACE,eAAA;EACE,mBAAA;EACA,eAAA;EACA,gBAAA;AATJ;;AAYA;EACE,mBAAA;EACA,yBAAA;EACA,mCAAA;EACA,mBAAA;AATF;AAUE;EACE,kBAAA;AARJ;AASI;EACE,eAAA;EACA,gBAAA;AAPN;;AAcA;EACE,qBAAA;EACA,+CAAA;EACA,gBAAA;EACA,UAAA;AAXF;;AAcA;EACE,kBAAA;AAXF;;AAcA;EACE,8BAAA;EACA,cAAA;EACA,eAAA;AAXF;;AAcA;EACE,qBAAA;EACA,+CAAA;EACA,gBAAA;EACA,UAAA;AAXF;;AAcA;EACE,kBAAA;AAXF;;AAcA;EACE,8BAAA;EACA,cAAA;EACA,eAAA;AAXF","sourcesContent":[":host {\n  background-color: var(--ion-color-dark);\n  ion-list {\n    background-color: var(--ion-color-primary-contrast);\n  }\n}\n\n.padding-inline {\n  padding: 0 60px !important;\n    text-align: left;\n}\n\n.dashboard-button {\n  // display: flex;\n  // //justify-content: space-between;\n  // column-gap: 22px;\n  // flex-wrap: wrap;\n  display: grid;\n    gap: 20px;\n    grid-template-columns: repeat(3, 1fr);\n    align-items: flex-start;\n  .s-button {\n    width: 90px;\n    //margin-bottom: 30px;\n    .dashboard-icons {\n      width: 100%;\n      height: 65px;\n      border-radius: 15px;\n      border: 1px solid #c0bae687;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: #c0bae687;\n      img {\n        width: 55%;\n      }\n    }\n    ion-button {\n      width: 100%;\n    }\n  }\n}\n\n.dashboard-text {\n  color: #000 !important;\n  font-size: 12px;\n  font-weight: 500;\n  text-align: center;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  margin-top: 10px;\n}\n\n.ion-padding {\n  padding: 30px 20px;\n}\n\n\n.name-padding {\nmargin-top: 30px;\n}\n.height-name {\n  height: 90px;\n  display: flex;\n  ion-avatar {\n    width: 42px;\n    height: 42px;\n    margin-left: 10px;\n  }\n.left {\n  padding-left: 10px;\n}\n}\n\n.card-height {\n  //background-color: red;\n    height: 100%;\n    margin: 0;\n    border: 0;\n    box-shadow: none;\n    border-radius: 20px;\nborder-bottom-left-radius: 0;\nborder-bottom-right-radius: 0;\n}\n\nion-title {\n  --color:#fff\n}\n\nion-button {\n  .ion-color {\n    --color:red !important\n  }\n}\n\n.student-name {\n  font-size: 18px;\n}\n\n.roll-number {\n  font-size: 12px;\n}\n\n.w-100 {\n  width: 100%;\n  display: block;\n}\n\n\nion-avatar {\n  width: 32px;\n  height: 32px;\n  border: 1px solid #ccc;\n\n}\n\n.school-name {\n  font-size: 12px;\n    font-weight: normal;\n    padding: 0 55px;\n    text-align: left;\n}\n\nion-item-sliding {\n  margin-bottom: 10px;\n  border: 1px solid #b5b2b2;\n  box-shadow: 1px 1px 3px 1px #b5b2b2;\n  border-radius: 10px;\n  ion-item {\n    --background: #fff;\n    ion-label {\n      font-size: 14px;\n      font-weight: 500;\n    }\n  }\n}\n\n\n\nion-toast.custom-toast {\n  --background: #f4f4fa;\n  --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);\n  --color: #4b4a50;\n  top: -60px;\n}\n\nion-toast.custom-toast::part(message) {\n  font-style: italic;\n}\n\nion-toast.custom-toast::part(button) {\n  border-left: 1px solid #d2d2d2;\n  color: #030207;\n  font-size: 15px;\n}\n\nion-toast.custom-toast2 {\n  --background: #833333;\n  --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);\n  --color: #4b4a50;\n  top: -70px;\n}\n\nion-toast.custom-toast2::part(message) {\n  font-style: italic;\n}\n\nion-toast.custom-toas2t::part(button) {\n  border-left: 1px solid #d2d2d2;\n  color: #030207;\n  font-size: 15px;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 12299:
/*!****************************************************************!*\
  !*** ./src/app/pages/parentApp/home/home.page.html?ngResource ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n<ion-content [fullscreen]=\"true\" class=\"light-content name-padding\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"handleRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n    <div *ngIf=\"isAppAccessible\"  class=\"ion-padding\">\n      <ion-buttons slot=\"primary\" class=\"dashboard-button\">\n       \n\n       \n        <div class=\"s-button\">\n          <ion-button routerLink=\"/parent-app/parentTab/attendance\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/attendance-2.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\">Attendance</ion-text>\n        </div>\n\n        <div class=\"s-button\">\n          <ion-button routerLink=\"/parent-app/parentTab/timetable\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/timetable.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\">Timetable</ion-text>\n        </div>\n\n        <div class=\"s-button\">\n          <ion-button routerLink=\"/parent-app/parentTab/homework\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/homework.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\">Homework</ion-text>\n        </div>\n\n        <div class=\"s-button\">\n          <ion-button routerLink=\"/parent-app/parentTab/notice\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/message.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\">Notice</ion-text>\n        </div>\n\n        <div class=\"s-button\">\n          <ion-button routerLink=\"/parent-app/parentTab/gallery\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/gallery.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\">Gallery</ion-text>\n        </div>\n\n        \n\n        <div class=\"s-button\">\n          <ion-button routerLink=\"/parent-app/parentTab/parents\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/parents.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\">Parents</ion-text>\n        </div>\n\n        <div class=\"s-button\">\n          <ion-button routerLink=\"/parent-app/parentTab/calendar\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/calendar.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\">Calendar</ion-text>\n        </div>\n\n      \n        <div class=\"s-button\">\n          <ion-button routerLink=\"/parent-app/parentTab/fees\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/fees.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\">Academic Fees</ion-text>\n        </div>\n\n        <div class=\"s-button\">\n          <ion-button routerLink=\"/parent-app/parentTab/transport-fees\">\n            <div class=\"dashboard-icons\">\n              <img src=\"../../../../assets/fees.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\">Transport Fees</ion-text>\n        </div>\n\n        <div class=\"s-button\">\n          <ion-button (click)=\"navigateAndRefresh('/parent-app/parentTab/track-bus')\">\n            <div class=\"dashboard-icons\">\n              <img  src=\"../../../../assets/icons/bus.png\" />\n            </div>\n          </ion-button>\n          <ion-text class=\"dashboard-text\">Track Bus</ion-text>\n        </div>\n\n\n       \n      </ion-buttons>\n    </div>\n   \n  </ion-content>\n\n\n  <ion-modal id=\"example-modal\" class=\"update-modal\" #modal [isOpen]=\"!isAppAccessible\"  [canDismiss]=\"canDismiss\"  [presentingElement]=\"presentingElement\">\n    <ng-template>\n      <div  class=\"update-app\">\n          <span class=\"icon\"><ion-icon name=\"notifications-outline\"></ion-icon></span>\n          <p class=\"text\">A new version of the app is available. If you haven't updated it please click on update or else click on close.</p>\n        <button (click)=\"redirectToPlayStore()\" class=\"update-button\">Update</button> &nbsp;\n        <button (click)=\"refreshPage()\" class=\"update-button\">Close</button>\n        </div>\n    </ng-template>\n  </ion-modal>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_parentApp_home_home_module_ts.js.map