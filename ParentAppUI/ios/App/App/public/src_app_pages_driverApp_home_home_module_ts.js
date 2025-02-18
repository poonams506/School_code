(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_driverApp_home_home_module_ts"],{

/***/ 74585:
/*!*************************************************************!*\
  !*** ./src/app/pages/driverApp/home/home-routing.module.ts ***!
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
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page */ 59659);




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

/***/ 4560:
/*!*****************************************************!*\
  !*** ./src/app/pages/driverApp/home/home.module.ts ***!
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
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home-routing.module */ 74585);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page */ 59659);









let HomePageModule = class HomePageModule {};
HomePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_3__.CUSTOM_ELEMENTS_SCHEMA],
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _home_routing_module__WEBPACK_IMPORTED_MODULE_0__.HomePageRoutingModule, _ng_icons_core__WEBPACK_IMPORTED_MODULE_7__.NgIconComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateModule],
  declarations: [_home_page__WEBPACK_IMPORTED_MODULE_1__.HomePage]
})], HomePageModule);


/***/ }),

/***/ 59659:
/*!***************************************************!*\
  !*** ./src/app/pages/driverApp/home/home.page.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePage: () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _home_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page.html?ngResource */ 13565);
/* harmony import */ var _home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.page.scss?ngResource */ 97029);
/* harmony import */ var _home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/core */ 14070);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 78205);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 90852);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var src_app_services_fcm_fcm_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/fcm/fcm.service */ 93881);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/environments/environment */ 45312);














let HomePage = class HomePage {
  constructor(translate, commonMethod, platform, schoolService, userService, cabDriverService, router, fcmService) {
    this.translate = translate;
    this.commonMethod = commonMethod;
    this.platform = platform;
    this.schoolService = schoolService;
    this.userService = userService;
    this.cabDriverService = cabDriverService;
    this.router = router;
    this.fcmService = fcmService;
    this.canDismiss = false;
    this.presentingElement = null;
    this.title = "Home";
    this.isAppAccessible = true;
    this.content_loaded = false;
    this.toastButtons = [{
      text: 'Dismiss'
    }];
  }
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Home');
    this.userService.getUser().subscribe(result => {
      this.cabDriverService.getCurrentActiveTripId(result.userId).subscribe(activeTripResult => {
        if (activeTripResult && activeTripResult.tripId > 0) {
          if (activeTripResult.tripType == 'PickUp') {
            this.router.navigate(['driver-app/cabdriverTab/pickup', activeTripResult.tripId, activeTripResult.routeId]);
          } else if (activeTripResult.tripType == 'Drop') {
            this.router.navigate(['driver-app/cabdriverTab/drop', activeTripResult.tripId, activeTripResult.routeId]);
          }
        }
      });
    });
    this.initializeApp();
  }
  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  ngOnInit() {}
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
      _this2.isAppAccessible = true;
      if (_capacitor_core__WEBPACK_IMPORTED_MODULE_3__.Capacitor.getPlatform() !== 'web') {
        yield _this2.fcmService.clearFCMTokenAndRemoveListener();
        yield _this2.fcmService.registerPush();
      }
      _this2.schoolService.getCurrentSchoolAppVersion().subscribe(result => {
        if (src_environments_environment__WEBPACK_IMPORTED_MODULE_8__.environment.APP_VERSION === result.configurationValue && result.isUpdateCheck == true) {
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
  refreshPage() {
    window.location.reload();
  }
  static #_ = this.ctorParameters = () => [{
    type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateService
  }, {
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_4__.CommonMethodService
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.Platform
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__.SchoolServiceProxy
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_7__.UserService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__.CabDriverAppServiceProxy
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.Router
  }, {
    type: src_app_services_fcm_fcm_service__WEBPACK_IMPORTED_MODULE_5__.FcmService
  }];
};
HomePage = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.Component)({
  selector: 'app-home',
  template: _home_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], HomePage);


/***/ }),

/***/ 97029:
/*!****************************************************************!*\
  !*** ./src/app/pages/driverApp/home/home.page.scss?ngResource ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}

.driver {
  padding: 0 30px;
}
.driver .driver-home-button {
  flex-direction: column;
}
.driver .s-button {
  width: 100%;
}
.driver .s-button ion-button {
  display: flex;
  align-items: center;
  width: 100%;
  border: 2px solid #737fad;
  background: #E1F5FE;
  background: linear-gradient(135deg, #E1F5FE, #C5CAE9);
  transition: all 0.3s ease-in-out;
  border-radius: 10px;
  margin-bottom: 20px;
}
.driver .s-button .home-icons {
  height: 60px;
  width: 80px;
  display: flex;
  align-items: center;
}
.driver .s-button .home-icons img {
  width: 100%;
  height: 80px;
}
.driver .s-button .home-text {
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
  flex: 1;
  text-align: left;
  color: #000;
}
.driver .s-button.driver-b .home-icons img {
  height: 55px;
  width: 60px;
}
.driver .s-button:hover {
  transform: scale(1.05);
}`, "",{"version":3,"sources":["webpack://./src/app/pages/driverApp/home/home.page.scss"],"names":[],"mappings":"AAAA;EACE,qBAAA;EACA,YAAA;EACA,aAAA;AACF;;AAGA;EACE,eAAA;AAAF;AACE;EACE,sBAAA;AACJ;AACE;EACC,WAAA;AACH;AAAI;EACE,aAAA;EACA,mBAAA;EACA,WAAA;EACA,yBAAA;EACA,mBAAA;EACA,qDAAA;EACA,gCAAA;EACA,mBAAA;EACA,mBAAA;AAEN;AAAI;EACE,YAAA;EACA,WAAA;EACA,aAAA;EACA,mBAAA;AAEN;AADM;EACE,WAAA;EACA,YAAA;AAGR;AAAI;EACE,eAAA;EACA,iBAAA;EACA,iBAAA;EACA,OAAA;EACA,gBAAA;EACA,WAAA;AAEN;AAEQ;EACE,YAAA;EACA,WAAA;AAAV;AAII;EACE,sBAAA;AAFN","sourcesContent":["capacitor-google-map {\n  display: inline-block;\n  width: 275px;\n  height: 400px;\n}\n\n\n.driver {\n  padding:0 30px ;\n  .driver-home-button {\n    flex-direction: column;\n  }\n  .s-button {\n   width: 100%;\n    ion-button {\n      display: flex;\n      align-items: center;\n      width: 100%;\n      border: 2px solid #737fad;\n      background: #E1F5FE;\n      background: linear-gradient(135deg, #E1F5FE, #C5CAE9);\n      transition: all 0.3s ease-in-out;\n      border-radius: 10px;\n      margin-bottom: 20px;\n        }\n    .home-icons {\n      height: 60px;\n      width: 80px;\n      display: flex;\n      align-items: center;\n      img {\n        width: 100%;\n        height: 80px;\n      }\n    }\n    .home-text {\n      font-size: 20px;\n      font-weight: bold;\n      margin-left: 20px;\n      flex: 1;\n      text-align: left;\n      color: #000;\n    }\n    &.driver-b {\n      .home-icons {\n        img {\n          height:55px;\n          width: 60px;\n        }\n      }\n    }\n    &:hover {\n      transform: scale(1.05);\n    }\n  }\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 13565:
/*!****************************************************************!*\
  !*** ./src/app/pages/driverApp/home/home.page.html?ngResource ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-content [fullscreen]=\"true\" class=\"light-content name-padding\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"handleRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <div *ngIf=\"isAppAccessible\" class=\"ion-padding driver mt-4\">\n    <ion-buttons slot=\"primary\" class=\"driver-home-button\">\n     \n      <div class=\"s-button driver-b\">\n        <ion-button routerLink=\"/driver-app/cabdriverTab/profile\">\n          <div class=\"home-icons\">\n            <img src=\"../../../../assets/profile-2.png\" />\n          </div>\n          <ion-text class=\"home-text\"> {{\"PROFILE\" | translate}}</ion-text>\n        </ion-button>\n      </div>\n      <div class=\"s-button color1\">\n        <ion-button routerLink=\"/driver-app/cabdriverTab/pickup\">\n          <div class=\"home-icons\">\n            <img src=\"../../../../assets/school-pickup.svg\" />\n          </div>\n          <ion-text class=\"home-text\"> {{\"PICKUP\" | translate}}</ion-text>\n        </ion-button>\n      </div>\n      <div class=\"s-button color1\">\n        <ion-button routerLink=\"/driver-app/cabdriverTab/drop\">\n          <div class=\"home-icons\">\n            <img src=\"../../../../assets/school-drop.svg\" />\n          </div>\n          <ion-text class=\"home-text\"> {{\"DROP\" | translate}}</ion-text>\n        </ion-button>\n      </div>\n    </ion-buttons> \n  </div>\n</ion-content>\n\n<ion-modal id=\"example-modal\" class=\"update-modal\" #modal [isOpen]=\"!isAppAccessible\"   [canDismiss]=\"canDismiss\"  [presentingElement]=\"presentingElement\">\n  <ng-template>\n    <div  class=\"update-app\">\n        <span class=\"icon\"><ion-icon name=\"notifications-outline\"></ion-icon></span>\n        <p class=\"text\">A new version of the app is available. If you haven't updated it please click on update or else click on close.</p>\n        <button (click)=\"redirectToPlayStore()\" class=\"update-button\">Update</button> &nbsp;\n        <button (click)=\"refreshPage()\" class=\"update-button\">Close</button>\n      </div>\n  </ng-template>\n</ion-modal>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_driverApp_home_home_module_ts.js.map