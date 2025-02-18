(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_driverApp_tabs_cabdriver-tabs_module_ts"],{

/***/ 96234:
/*!***********************************************************************!*\
  !*** ./src/app/pages/driverApp/tabs/cabdriver-tabs-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CabDriverTabsRoutingModule: () => (/* binding */ CabDriverTabsRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _cabdriver_tabs_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cabdriver-tabs.page */ 90972);




const routes = [{
  path: '',
  component: _cabdriver_tabs_page__WEBPACK_IMPORTED_MODULE_0__.CabDriverTabsPage,
  children: [{
    path: 'home',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_driverApp_home_home_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../home/home.module */ 4560)).then(m => m.HomePageModule)
  }, {
    path: 'profile',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_driverApp_profile_cabdriver-profile-page_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../profile/cabdriver-profile-page.module */ 98591)).then(m => m.CabDriverProfilePageModule)
  }, {
    path: 'pickup',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_services_gps_location_service_ts-src_app_services_toast_toast_service_ts-node-9480e5"), __webpack_require__.e("src_app_pages_driverApp_pick-up_pick-up-page_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../pick-up/pick-up-page.module */ 18634)).then(m => m.PickUpPageModule)
  }, {
    path: 'pickup/:tripId/:routeId',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_services_gps_location_service_ts-src_app_services_toast_toast_service_ts-node-9480e5"), __webpack_require__.e("src_app_pages_driverApp_pick-up_pick-up-page_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../pick-up/pick-up-page.module */ 18634)).then(m => m.PickUpPageModule)
  }, {
    path: 'drop',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_highcharts_highcharts_js"), __webpack_require__.e("default-src_app_services_gps_location_service_ts-src_app_services_toast_toast_service_ts-node-9480e5"), __webpack_require__.e("src_app_pages_driverApp_drop_drop-page_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../drop/drop-page.module */ 9686)).then(m => m.DropPageModule)
  }, {
    path: 'drop/:tripId/:routeId',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_highcharts_highcharts_js"), __webpack_require__.e("default-src_app_services_gps_location_service_ts-src_app_services_toast_toast_service_ts-node-9480e5"), __webpack_require__.e("src_app_pages_driverApp_drop_drop-page_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../drop/drop-page.module */ 9686)).then(m => m.DropPageModule)
  }]
}];
let CabDriverTabsRoutingModule = class CabDriverTabsRoutingModule {};
CabDriverTabsRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], CabDriverTabsRoutingModule);


/***/ }),

/***/ 10963:
/*!***************************************************************!*\
  !*** ./src/app/pages/driverApp/tabs/cabdriver-tabs.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CabDriverTabsModule: () => (/* binding */ CabDriverTabsModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _cabdriver_tabs_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cabdriver-tabs-routing.module */ 96234);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 90852);
/* harmony import */ var _cabdriver_tabs_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cabdriver-tabs.page */ 90972);
/* harmony import */ var _header_cabdriver_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header/cabdriver-header.component */ 12801);









let CabDriverTabsModule = class CabDriverTabsModule {};
CabDriverTabsModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
  //declarations: [],
  imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule, _angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _cabdriver_tabs_routing_module__WEBPACK_IMPORTED_MODULE_0__.CabDriverTabsRoutingModule],
  declarations: [_cabdriver_tabs_page__WEBPACK_IMPORTED_MODULE_1__.CabDriverTabsPage, _header_cabdriver_header_component__WEBPACK_IMPORTED_MODULE_2__.CabdriverHeaderComponent],
  exports: [_cabdriver_tabs_page__WEBPACK_IMPORTED_MODULE_1__.CabDriverTabsPage]
})], CabDriverTabsModule);


/***/ }),

/***/ 90972:
/*!*************************************************************!*\
  !*** ./src/app/pages/driverApp/tabs/cabdriver-tabs.page.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CabDriverTabsPage: () => (/* binding */ CabDriverTabsPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _cabdriver_tabs_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cabdriver-tabs.page.html?ngResource */ 39088);
/* harmony import */ var _cabdriver_tabs_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cabdriver-tabs.page.scss?ngResource */ 77496);
/* harmony import */ var _cabdriver_tabs_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_cabdriver_tabs_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 90852);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var src_app_translate_config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/translate-config.service */ 57394);









let CabDriverTabsPage = class CabDriverTabsPage {
  constructor(actionSheetController, translate, translateConfigService, userService, router) {
    this.actionSheetController = actionSheetController;
    this.translate = translate;
    this.translateConfigService = translateConfigService;
    this.userService = userService;
    this.router = router;
    this.show = true;
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
  }
  ngOnInit() {}
  ionViewDidEnter() {
    this.show = false;
    setTimeout(() => {
      this.show = true;
    }, 100);
  }
  GoToDashboard() {}
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ActionSheetController
  }, {
    type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateService
  }, {
    type: src_app_translate_config_service__WEBPACK_IMPORTED_MODULE_3__.TranslateConfigService
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__.UserService
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router
  }];
  static #_2 = this.propDecorators = {
    ionTabs: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild,
      args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonTabs, {
        static: true
      }]
    }]
  };
};
CabDriverTabsPage = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
  selector: 'cabdriver-app-tabs',
  template: _cabdriver_tabs_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_cabdriver_tabs_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], CabDriverTabsPage);


/***/ }),

/***/ 12801:
/*!***************************************************************************!*\
  !*** ./src/app/pages/driverApp/tabs/header/cabdriver-header.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CabdriverHeaderComponent: () => (/* binding */ CabdriverHeaderComponent)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _cabdriver_header_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cabdriver-header.component.html?ngResource */ 86947);
/* harmony import */ var _cabdriver_header_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cabdriver-header.component.scss?ngResource */ 56891);
/* harmony import */ var _cabdriver_header_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_cabdriver_header_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var src_app_services_fcm_fcm_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/fcm/fcm.service */ 93881);
/* harmony import */ var src_app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/storage/storage.service */ 85217);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/user-service */ 4286);











let CabdriverHeaderComponent = class CabdriverHeaderComponent {
  constructor(commonMethod, userService, fcmService, router, storageService) {
    this.commonMethod = commonMethod;
    this.userService = userService;
    this.fcmService = fcmService;
    this.router = router;
    this.storageService = storageService;
  }
  ngOnInit() {
    this.updateUserDetail();
  }
  ionViewDidEnter() {
    this.updateUserDetail();
  }
  updateUserDetail() {
    this.userService.getUser(true).subscribe(result => {
      this.currentUserFullName = result.userFullNameByRole;
      this.profileImageURL = result.profileImageURL;
    });
  }
  logout() {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      localStorage.clear();
      sessionStorage.clear();
      _this.userService.setAcademicYear(0);
      _this.userService.setSchoolId(0);
      _this.userService.CurrentSiblingClassId = 0;
      _this.userService.CurrentSiblingId = 0;
      _this.userService.CurrentUserRoleId = null;
      _this.userService.UserToken = null;
      yield _this.fcmService.clearFCMTokenAndRemoveListener();
      _this.storageService.setStorage("ActiveTripId", null);
      _this.storageService.setStorage("TOKEN", null);
      _this.router.navigate(['signin']);
    })();
  }
  GoBack() {
    this.router.navigate(['driver-app/cabdriverTab/home']);
  }
  OpenMenu() {
    this.ionMenu.open();
  }
  static #_ = this.ctorParameters = () => [{
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_3__.CommonMethodService
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_6__.UserService
  }, {
    type: src_app_services_fcm_fcm_service__WEBPACK_IMPORTED_MODULE_4__.FcmService
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.Router
  }, {
    type: src_app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_5__.StorageService
  }];
  static #_2 = this.propDecorators = {
    ionMenu: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild,
      args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonMenu, {
        static: true
      }]
    }]
  };
};
CabdriverHeaderComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'cabdriver-app-header',
  template: _cabdriver_header_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_cabdriver_header_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], CabdriverHeaderComponent);


/***/ }),

/***/ 77496:
/*!**************************************************************************!*\
  !*** ./src/app/pages/driverApp/tabs/cabdriver-tabs.page.scss?ngResource ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.h-tab {
  bottom: 8px !important;
}

ion-tab-bar {
  --background:#ffffff !important;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  bottom: 0px;
  position: relative;
  border-radius: 0px;
  width: 100%;
  border-top: none;
  margin: 0 auto;
  height: 55px;
  border-top: 1px solid #ccc;
}

ion-tab-button {
  --color: #fff;
  --color-selected: #5a41a0;
  --padding-bottom: 4px;
  --padding-top: 0px;
}
ion-tab-button::before {
  background-color: transparent;
  display: block;
  content: "";
  margin: 0 auto;
  width: 20px;
  height: 2px;
}
ion-tab-button.tab-selected::before {
  background-color: #5a41a0;
}
ion-tab-button ion-icon {
  font-size: 20px;
  color: #5a41a0;
}
ion-tab-button ion-label {
  font-size: 12px;
  color: #5a41a0;
  font-weight: 500;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/driverApp/tabs/cabdriver-tabs.page.scss"],"names":[],"mappings":"AAEA;EACE,sBAAA;AADF;;AAIA;EAGE,+BAAA;EACA,0CAAA;EACA,WAAA;EACA,kBAAA;EACA,kBAAA;EACA,WAAA;EACA,gBAAA;EACA,cAAA;EACA,YAAA;EACA,0BAAA;AAHF;;AAMA;EACE,aAAA;EACA,yBAAA;EACA,qBAAA;EACA,kBAAA;AAHF;AAKE;EACE,6BAAA;EACA,cAAA;EACA,WAAA;EACA,cAAA;EACA,WAAA;EACA,WAAA;AAHJ;AAME;EACE,yBAAA;AAJJ;AAME;EACE,eAAA;EACA,cAAA;AAJJ;AAME;EACE,eAAA;EACA,cAAA;EACA,gBAAA;AAJJ","sourcesContent":["\n\n.h-tab {\n  bottom: 8px !important;\n}\n\nion-tab-bar {\n  //--background: linear-gradient(135deg, #da8e63, #c754aa);\n  //--background: linear-gradient(#da8e63 0%, #c754aa 100%);\n  --background:#ffffff !important;\n  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);\n  bottom: 0px;\n  position: relative;\n  border-radius: 0px;\n  width: 100%;\n  border-top: none;\n  margin: 0 auto;\n  height: 55px;\n  border-top:1px solid #ccc\n}\n\nion-tab-button {\n  --color: #fff;\n  --color-selected: #5a41a0;\n  --padding-bottom: 4px;\n  --padding-top: 0px;\n\n  &::before {\n    background-color: transparent;\n    display: block;\n    content: \"\";\n    margin: 0 auto;\n    width: 20px;\n    height: 2px;\n  }\n\n  &.tab-selected::before {\n    background-color: #5a41a0;\n  }\n  ion-icon {\n    font-size: 20px;\n    color: #5a41a0;\n  }\n  ion-label {\n    font-size: 12px;\n    color: #5a41a0;\n    font-weight: 500;\n\n  }\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 56891:
/*!****************************************************************************************!*\
  !*** ./src/app/pages/driverApp/tabs/header/cabdriver-header.component.scss?ngResource ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `ion-menu::part(backdrop) {
  background-color: rgba(0, 0, 0, 0.3);
}

ion-menu::part(container) {
  border-radius: 25px 0px 0px 0;
  box-shadow: 4px 0px 16px rgba(255, 0, 255, 0.18);
}

.menu-header {
  background: #fff;
  background-image: url('menu-bg.png');
  background-position: center;
  background-repeat: no-repeat;
  height: 165px;
  background-size: cover;
  border-top-left-radius: 25px;
  border-top-right-radius: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15px;
}
.menu-header div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.menu-header p {
  font-size: 16px;
  color: #fff;
  margin-top: 10px;
}

ion-menu-toggle ion-item {
  --background:#fff !important;
  --inner-border-width: 0 !important;
  border-radius: 10px;
  font-size: 14px;
  font-weight: normal;
}
ion-menu-toggle ion-item ion-icon {
  color: #9577DC;
  margin-inline-end: 15px;
  font-size: 24px;
}
ion-menu-toggle ion-item ion-label {
  font-weight: 400;
  font-size: 16px;
  color: #000;
}
ion-menu-toggle ion-item.active-menu {
  --background:#9577DC !important;
  --color:#fff !important;
}
ion-menu-toggle ion-item.active-menu ion-icon {
  color: #fff !important;
}

ion-list, .list-ios {
  height: calc(100vh - 249px);
  padding-top: 0;
  background-color: #fff !important;
}

.logout-btn {
  font-size: 16px;
  height: 40px;
  --border-radius: 50px;
  --box-shadow: none;
  --background: linear-gradient(135deg, #da8e63, #c754aa);
  --color: var(--white-color);
}`, "",{"version":3,"sources":["webpack://./src/app/pages/driverApp/tabs/header/cabdriver-header.component.scss"],"names":[],"mappings":"AAAA;EACI,oCAAA;AACJ;;AAEE;EACE,6BAAA;EAEA,gDAAA;AAAJ;;AAGE;EACE,gBAAA;EACA,oCAAA;EACA,2BAAA;EACA,4BAAA;EACA,aAAA;EACA,sBAAA;EACA,4BAAA;EACA,0BAAA;EACA,aAAA;EACA,uBAAA;EACA,uBAAA;EACA,iBAAA;AAAJ;AACI;EACE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;AACN;AACI;EACE,eAAA;EACA,WAAA;EACA,gBAAA;AACN;;AAKI;EACE,4BAAA;EACA,kCAAA;EACA,mBAAA;EACA,eAAA;EACA,mBAAA;AAFN;AAGM;EACE,cAAA;EACA,uBAAA;EACA,eAAA;AADR;AAGM;EACE,gBAAA;EACA,eAAA;EACA,WAAA;AADR;AAGM;EACE,+BAAA;EACA,uBAAA;AADR;AAEQ;EACE,sBAAA;AAAV;;AAME;EACE,2BAAA;EACA,cAAA;EACA,iCAAA;AAHJ;;AAKE;EACE,eAAA;EACA,YAAA;EACA,qBAAA;EACA,kBAAA;EAEA,uDAAA;EACE,2BAAA;AAHN","sourcesContent":["ion-menu::part(backdrop) {\n    background-color: rgba(0, 0, 0, 0.3);\n  }\n  \n  ion-menu::part(container) {\n    border-radius: 25px 0px 0px 0;\n  \n    box-shadow: 4px 0px 16px rgba(255, 0, 255, 0.18);\n  }\n\n  .menu-header {\n    background: #fff;\n    background-image: url('../../../../../assets/menu-bg.png');\n    background-position: center;\n    background-repeat: no-repeat;\n    height: 165px;\n    background-size: cover;\n    border-top-left-radius: 25px;\n    border-top-right-radius: 0;\n    display: flex;\n    align-items:flex-start;\n    justify-content: center;\n    padding-top: 15px;\n    div {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n    }\n    p {\n      font-size: 16px;\n      color: #fff;\n      margin-top: 10px;\n    }\n  }\n\n\n  ion-menu-toggle {\n    ion-item {\n      --background:#fff !important;\n      --inner-border-width: 0 !important;\n      border-radius: 10px;\n      font-size:14px;\n      font-weight: normal;\n      ion-icon {\n        color:#9577DC;\n        margin-inline-end: 15px;\n        font-size: 24px;\n      }\n      ion-label {\n        font-weight: 400;\n        font-size:16px;\n        color: #000;\n      }\n      &.active-menu {\n        --background:#9577DC !important;\n        --color:#fff !important;\n        ion-icon {\n          color:#fff !important;\n        }\n      }\n    }\n  }\n\n  ion-list, .list-ios {\n    height: calc(100vh - 249px);\n    padding-top: 0;\n    background-color: #fff !important;\n  }\n  .logout-btn {\n    font-size: 16px;\n    height: 40px;\n    --border-radius: 50px;\n    --box-shadow: none;\n    //--background: var(--orange-bg-color);\n    --background: linear-gradient(135deg, #da8e63, #c754aa);\n      --color: var(--white-color);\n  }"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 39088:
/*!**************************************************************************!*\
  !*** ./src/app/pages/driverApp/tabs/cabdriver-tabs.page.html?ngResource ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<cabdriver-app-header *ngIf=\"show && userService.isAuthenticated()\"></cabdriver-app-header>\n  \n<ion-tabs>\n  <ion-tab-bar slot=\"bottom\">\n\n\n    <ion-tab-button tab=\"home\" class=\"ion-tab-button-placeholder\">\n      <ion-icon name=\"home\"></ion-icon>\n      <ion-label>Home</ion-label>\n    </ion-tab-button>\n\n    <ion-tab-button tab=\"profile\">\n      <ion-icon name=\"person\"></ion-icon>\n      <ion-label>Profile</ion-label>\n    </ion-tab-button>\n\n  </ion-tab-bar> \n\n\n\n</ion-tabs>\n\n";

/***/ }),

/***/ 86947:
/*!****************************************************************************************!*\
  !*** ./src/app/pages/driverApp/tabs/header/cabdriver-header.component.html?ngResource ***!
  \****************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header [translucent]=\"true\" class=\"main-header\" id=\"driver-menu-content\">\n  <ion-toolbar class=\"dark-toolbar\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button text=\"Back\" class=\"dark-color\" (click)=\"GoBack()\" defaultHref=\"driver-app/cabdriverTab/home\">\n      </ion-back-button>\n    </ion-buttons>\n    <ion-title class=\"fw-bold dark-color header-title\">{{commonMethod.getHeaderTitle()}}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-menu-button (click)=\"OpenMenu()\"></ion-menu-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-menu side=\"end\" auto-hide=\"false\" contentId=\"driver-menu-content\">\n  <div class=\"menu-header\">\n    <div>\n      <ion-avatar>\n        <img *ngIf=\"profileImageURL==''\" alt=\"{{currentUserFullName}}\"\n          src=\"https://ionicframework.com/docs/img/demos/avatar.svg\" />\n\n        <img *ngIf=\"profileImageURL!=''\" alt=\"{{currentUserFullName}}\" src=\"{{profileImageURL}}\" />\n      </ion-avatar>\n      <p>{{currentUserFullName}}</p>\n    </div>\n  \n  </div>\n  <ion-content class=\"ion-padding\">\n    <ion-list>\n      <ion-menu-toggle>\n        <ion-item button routerLink=\"/driver-app/cabdriverTab/pickup\"  routerLinkActive=\"active-menu\">\n          <ion-icon slot=\"start\" name=\"car-outline\"></ion-icon>\n          <ion-label>Pick up </ion-label>\n        </ion-item>\n        <ion-item button routerLink=\"/driver-app/cabdriverTab/drop\"  routerLinkActive=\"active-menu\">\n          <ion-icon slot=\"start\" name=\"car-outline\"></ion-icon>\n          <ion-label>Drop </ion-label>\n        </ion-item>\n      </ion-menu-toggle>\n   </ion-list>\n    <ion-button class=\"logout-btn\" expand=\"block\" (click)=\"logout()\">Logout</ion-button>\n  </ion-content>\n</ion-menu>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_driverApp_tabs_cabdriver-tabs_module_ts.js.map