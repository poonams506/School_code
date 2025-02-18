(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_parentApp_parent-dashboard_parent-dashboard_module_ts"],{

/***/ 34663:
/*!*************************************************************************************!*\
  !*** ./src/app/pages/parentApp/parent-dashboard/parent-dashboard-routing.module.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParentDashboardRoutingModule: () => (/* binding */ ParentDashboardRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _parent_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parent-dashboard.component */ 3271);




const routes = [{
  path: '',
  component: _parent_dashboard_component__WEBPACK_IMPORTED_MODULE_0__.ParentDashboardComponent
}];
let ParentDashboardRoutingModule = class ParentDashboardRoutingModule {};
ParentDashboardRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], ParentDashboardRoutingModule);


/***/ }),

/***/ 3271:
/*!********************************************************************************!*\
  !*** ./src/app/pages/parentApp/parent-dashboard/parent-dashboard.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParentDashboardComponent: () => (/* binding */ ParentDashboardComponent)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _parent_dashboard_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parent-dashboard.component.html?ngResource */ 89153);
/* harmony import */ var _parent_dashboard_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parent-dashboard.component.scss?ngResource */ 55595);
/* harmony import */ var _parent_dashboard_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_parent_dashboard_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! highcharts */ 77859);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var highcharts_highcharts_3d__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! highcharts/highcharts-3d */ 45467);
/* harmony import */ var highcharts_highcharts_3d__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(highcharts_highcharts_3d__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic/angular */ 78205);
/* harmony import */ var _view_parent_school_event_detail_view_parent_school_event_detail_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./view-parent-school-event-detail/view-parent-school-event-detail.page */ 4935);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/environments/environment */ 45312);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @capacitor/core */ 14070);
/* harmony import */ var src_app_services_fcm_fcm_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/fcm/fcm.service */ 93881);








highcharts_highcharts_3d__WEBPACK_IMPORTED_MODULE_4___default()(highcharts__WEBPACK_IMPORTED_MODULE_3__);









let ParentDashboardComponent = class ParentDashboardComponent {
  constructor(commonMethod, ParentAppService, userService, router, modalController, platform, schoolService, fcmService) {
    this.commonMethod = commonMethod;
    this.ParentAppService = ParentAppService;
    this.userService = userService;
    this.router = router;
    this.modalController = modalController;
    this.platform = platform;
    this.schoolService = schoolService;
    this.fcmService = fcmService;
    this.canDismiss = false;
    this.presentingElement = null;
    this.dateExample = new Date().toISOString();
    this.content_loaded = false;
    this.selectedEventId = null;
    this.schoolEventList = [];
    this.lectureList = [];
    this.selectedEvent = null;
    this.isAppAccessible = true;
  }
  ngAfterViewInit() {
    this.loadData();
  }
  ionViewDidEnter() {
    this.initializeApp();
    this.commonMethod.setHeaderTitle('Dashboard');
    setTimeout(() => {
      this.loadData();
    }, 2000);
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
      if (_capacitor_core__WEBPACK_IMPORTED_MODULE_10__.Capacitor.getPlatform() !== 'web') {
        yield _this2.fcmService.clearFCMTokenAndRemoveListener();
        yield _this2.fcmService.registerPush();
      }
      _this2.schoolService.getCurrentSchoolAppVersion().subscribe(result => {
        if (src_environments_environment__WEBPACK_IMPORTED_MODULE_9__.environment.APP_VERSION === result.configurationValue && result.isUpdateCheck == true) {
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
  ngOnInit() {
    this.loadData();
  }
  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  loadData() {
    this.schoolEvent();
    this.todaysUpcomingLectures();
    this.todaysAttendance();
    this.content_loaded = true;
  }
  schoolEvent() {
    this.ParentAppService.oneMonthEvent(this.userService.CurrentSiblingClassId).subscribe(result => {
      this.schoolEventList = result.oneMonthEventList;
      console.log(result);
    });
  }
  todaysUpcomingLectures() {
    let dayNo = new Date().getDay() + 1;
    this.ParentAppService.oneDayLectureSelect(this.userService.CurrentSiblingClassId, dayNo).subscribe(result => {
      this.lectureList = result.teacherOneDayLectureList;
    });
  }
  todaysAttendance() {
    this.ParentAppService.attendanceMissingParent(this.userService.CurrentSiblingId).subscribe(result => {
      this.attendanceStatus = result;
    });
  }
  openSchoolEventDetail(selectedEventId) {
    var _this3 = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const selectedEvent = _this3.schoolEventList.find(event => event.schoolEventId === selectedEventId) || null;
      const modal = yield _this3.modalController.create({
        component: _view_parent_school_event_detail_view_parent_school_event_detail_page__WEBPACK_IMPORTED_MODULE_8__.ViewParentSchoolEventDetailPage,
        componentProps: {
          selectedEvent: selectedEvent
        }
      });
      yield modal.present();
    })();
  }
  getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
  }
  showFile(file) {
    window.open(file.fullPath, '_blank');
  }
  refreshPage() {
    window.location.reload();
  }
  static #_ = this.ctorParameters = () => [{
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_5__.CommonMethodService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__.ParentAppServiceProxy
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_7__.UserService
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_12__.Router
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.ModalController
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.Platform
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__.SchoolServiceProxy
  }, {
    type: src_app_services_fcm_fcm_service__WEBPACK_IMPORTED_MODULE_11__.FcmService
  }];
  static #_2 = this.propDecorators = {
    modal: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_15__.ViewChild,
      args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonModal]
    }],
    selectedEventId: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_15__.Input
    }]
  };
};
ParentDashboardComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_15__.Component)({
  selector: 'app-parent-dashboard',
  template: _parent_dashboard_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_parent_dashboard_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], ParentDashboardComponent);


/***/ }),

/***/ 5942:
/*!*****************************************************************************!*\
  !*** ./src/app/pages/parentApp/parent-dashboard/parent-dashboard.module.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParentDashboardModule: () => (/* binding */ ParentDashboardModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _parent_dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parent-dashboard-routing.module */ 34663);
/* harmony import */ var _parent_dashboard_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parent-dashboard.component */ 3271);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-charts */ 16045);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! highcharts-angular */ 14215);
/* harmony import */ var _view_parent_school_event_detail_view_parent_school_event_detail_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view-parent-school-event-detail/view-parent-school-event-detail.page */ 4935);










let ParentDashboardModule = class ParentDashboardModule {};
ParentDashboardModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _parent_dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__.ParentDashboardRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, ng2_charts__WEBPACK_IMPORTED_MODULE_8__.NgChartsModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_9__.HighchartsChartModule],
  declarations: [_parent_dashboard_component__WEBPACK_IMPORTED_MODULE_1__.ParentDashboardComponent, _view_parent_school_event_detail_view_parent_school_event_detail_page__WEBPACK_IMPORTED_MODULE_2__.ViewParentSchoolEventDetailPage]
})], ParentDashboardModule);


/***/ }),

/***/ 4935:
/*!**************************************************************************************************************************!*\
  !*** ./src/app/pages/parentApp/parent-dashboard/view-parent-school-event-detail/view-parent-school-event-detail.page.ts ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewParentSchoolEventDetailPage: () => (/* binding */ ViewParentSchoolEventDetailPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _view_parent_school_event_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-parent-school-event-detail.page.html?ngResource */ 78869);
/* harmony import */ var _view_parent_school_event_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view-parent-school-event-detail.page.scss?ngResource */ 9371);
/* harmony import */ var _view_parent_school_event_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_view_parent_school_event_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 37401);





let ViewParentSchoolEventDetailPage = class ViewParentSchoolEventDetailPage {
  constructor(modalCtrl) {
    this.modalCtrl = modalCtrl;
  }
  ngOnInit() {}
  close() {
    return this.modalCtrl.dismiss(false, 'cancel');
  }
  getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
  }
  showFile(file) {
    window.open(file.fullPath, '_blank');
  }
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.ModalController
  }];
};
ViewParentSchoolEventDetailPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  selector: 'view-parent-notice-file-detail',
  template: _view_parent_school_event_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_view_parent_school_event_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], ViewParentSchoolEventDetailPage);


/***/ }),

/***/ 55595:
/*!*********************************************************************************************!*\
  !*** ./src/app/pages/parentApp/parent-dashboard/parent-dashboard.component.scss?ngResource ***!
  \*********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:host {
  --min-height: 30px !important;
}
:host ion-item {
  --background: #fff;
  background-color: #fff;
}
:host .date-header {
  padding: 0 10px;
}
:host ion-card {
  box-shadow: 0px 0px 0px 0px rgba(204, 204, 204, 0.7098039216);
  display: flex;
  align-items: flex-start;
  border-radius: 4px;
  margin: 2px;
  background-color: transparent;
}
:host ion-card ion-card-header {
  padding: 5px;
  padding-right: 0;
  padding-bottom: 0;
  width: 135px;
}
:host ion-card ion-card-header ion-card-subtitle {
  color: #8590b9;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 0;
}
:host ion-card ion-card-header ion-card-subtitle.class {
  color: #110a3b;
  font-size: 14px;
  margin-top: 0;
}
:host ion-card ion-card-header ion-card-subtitle .to {
  display: block;
  text-align: center;
  color: #000;
  text-transform: capitalize;
  font-size: 12px;
  width: 50px;
}
:host ion-card ion-card-content {
  padding: 0 10px;
  border-left: 1px solid #bdc8d2;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  line-height: 1.4;
  font-size: 11px;
  color: #828891;
  width: 100%;
  min-height: 39px;
  display: flex;
}
:host ion-card ion-card-content ion-title {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 5px;
  padding: 0;
  color: #000;
  background-color: #F97794;
  padding: 10px;
  border-radius: 8px;
}
:host ion-card.lecture-card {
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #bdc8d2;
}
:host ion-card.lecture-card ion-card-subtitle {
  flex: 0 0 100%;
  font-size: 14px;
  color: #222222;
}
:host ion-card.lecture-card ion-card-header {
  width: 80px;
}
:host ion-card.lecture-card ion-card-content {
  flex: 1;
}
:host ion-card-subtitle.title-footer {
  font-size: 12px;
  padding: 0px 0px;
  text-align: right;
  color: #000;
  display: flex;
  margin-bottom: 7px;
}
:host ion-card-subtitle.title-footer ion-badge {
  margin-right: 5px;
  border-radius: 10px;
  width: 16px;
  height: 16px;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  --background: #110a3b;
  background-color: #110a3b;
  color: #fff;
}

ion-list,
.list-ios {
  padding-top: 0;
  background-color: #fff !important;
  padding: 6px 0;
  margin: 0 12px;
}
ion-list ion-card-subtitle,
.list-ios ion-card-subtitle {
  font-size: 18px;
}
ion-list.notice-card ion-item,
.list-ios.notice-card ion-item {
  border-bottom: 0;
  --background: #fff;
  background-color: #fff;
  border-radius: 4px;
  margin: 0 5px 10px;
  align-items: flex-start;
  box-shadow: 0px 0px 3px 1px rgba(204, 204, 204, 0.7098039216);
}
ion-list.notice-card ion-item:last-child,
.list-ios.notice-card ion-item:last-child {
  border-bottom: 0 !important;
}
ion-list.notice-card ion-item ion-card-subtitle,
.list-ios.notice-card ion-item ion-card-subtitle {
  font-size: 14px;
  display: block;
  width: 100%;
  color: #ccc;
}
ion-list.notice-card ion-item ion-card-subtitle ion-text,
.list-ios.notice-card ion-item ion-card-subtitle ion-text {
  color: #000;
}
ion-list.notice-card ion-item ion-avatar,
.list-ios.notice-card ion-item ion-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 45px;
  height: 45px;
  margin-right: 5px;
}
ion-list.notice-card ion-item ion-avatar span,
.list-ios.notice-card ion-item ion-avatar span {
  font-size: 20px;
  font-weight: bold;
}
ion-list.notice-card ion-item ion-label,
.list-ios.notice-card ion-item ion-label {
  font-size: 13px;
  font-weight: 400;
}

.download {
  margin-top: 20px;
}
.download a {
  text-decoration: none;
  border: 1px solid #000;
  border-radius: 4px;
  background-color: #110a3b;
  color: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.download a ion-icon {
  font-size: 24px;
}

.modal-text-header ion-card-subtitle {
  font-size: 16px;
}
.modal-text-header ion-card-subtitle ion-text {
  font-size: 14px;
  display: block;
  color: #000;
}

ion-modal.event-modal ion-header ion-toolbar ion-title.main-title {
  color: #fff;
  --color: #fff;
  font-size: 14px;
}
ion-modal.event-modal .text-start {
  text-align: left;
  font-size: 0.9em;
  color: #666;
  margin: 5px 0;
}

ion-fab-button {
  width: 22px !important;
  height: 22px !important;
  margin-right: 7px;
  --background: #b7f399;
  --background-activated: #87d361;
  --background-hover: #a3e681;
  --border-radius: 15px;
  --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  --color: black;
}
ion-fab-button ion-icon {
  font-size: 13px;
}

.head-4 {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
}
.head-4 h4 {
  font-size: 16px;
  font-weight: 500;
  color: #000;
}
.head-4 h5 {
  font-size: 12px;
  font-weight: 400;
  color: #000;
}

h6 {
  font-size: 13px;
  font-weight: 500;
  padding: 7px 15px;
  color: #623AA2 !important;
  background: #F3EBFF;
  border: 1px solid #623AA2;
  margin: 0px 15px 5px;
  border-radius: 4px;
}

.no-bg {
  background-color: transparent !important;
  padding: 0;
  margin: 0 0px 10px;
}
.no-bg ion-card {
  border-bottom: 1px solid #ccc !important;
  border-radius: 0 !important;
  padding: 0 10px;
  margin: 0;
}
.no-bg ion-card-header {
  width: 100px !important;
}
.no-bg .yellow-span {
  font-size: 13px;
  font-weight: 400;
  background-color: #EECE13 !important;
  padding: 5px;
  line-height: 1.4;
  color: #000;
  width: 100%;
  border-radius: 8px;
}
.no-bg .yellow-span span {
  display: block;
}

hr {
  margin: 0;
  background: #bdc8d2;
}

.mark-btn {
  background-color: #BC89E0;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
  padding: 0;
  color: #000;
  padding: 6px 15px;
  border-radius: 38px;
  text-decoration: none;
  line-height: 1.7;
}

.attendance-wrap {
  padding: 0 10px 15px;
}
.attendance-wrap .present {
  background-color: #def2e6;
  border-left: 5px solid #87cfa3;
  border-radius: 4px;
  padding: 10px;
  padding: 8px 20px;
  font-size: 18px;
  font-weight: 500;
  color: #222222;
}
.attendance-wrap .absent {
  background-color: #f6e8e8;
  border-left: 5px solid #bb4243;
  border-radius: 4px;
  padding: 10px;
  padding: 8px 18px;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
}

.bold-black-text {
  font-weight: bold;
  color: black;
}

.right-aligned {
  text-align: right;
}

.right-aligned ion-text {
  display: block;
  margin-bottom: 8px;
}

.bold-black-text {
  font-weight: bold;
  color: black;
  margin-right: 5px;
}

.redbg {
  background-color: #EECE13 !important;
  color: crimson;
  font-size: 16px;
}

.thumbnail-icon {
  width: 60px;
  height: 60px;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/parent-dashboard/parent-dashboard.component.scss"],"names":[],"mappings":"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","sourcesContent":[":host {\n    --min-height: 30px !important;\n\n    ion-item {\n        --background: #fff;\n        background-color: #fff;\n    }\n\n    .date-header {\n        padding: 0 10px;\n    }\n\n    ion-card {\n        box-shadow: 0px 0px 0px 0px #ccccccb5;\n        display: flex;\n        align-items: flex-start;\n        border-radius: 4px;\n        margin: 2px;\n        background-color: transparent;\n\n        ion-card-header {\n            padding: 5px;\n            padding-right: 0;\n            padding-bottom: 0;\n            width: 135px;\n\n            ion-card-subtitle {\n                color: #8590b9;\n                font-size: 13px;\n                font-weight: 500;\n                line-height: 1.3;\n                margin-bottom: 0;\n\n                &.class {\n                    color: #110a3b;\n                    font-size: 14px;\n                    margin-top: 0;\n                }\n\n                .to {\n                    display: block;\n                    text-align: center;\n                    color: #000;\n                    text-transform: capitalize;\n                    font-size: 12px;\n                    width: 50px;\n                }\n            }\n        }\n\n        ion-card-content {\n            padding: 0 10px;\n            border-left: 1px solid #bdc8d2;\n            margin-left: 5px;\n            margin-top: 5px;\n            margin-bottom: 5px;\n            line-height: 1.4;\n            font-size: 11px;\n            color: #828891;\n            width: 100%;\n            min-height: 39px;\n            display: flex;\n\n            ion-title {\n                font-size: 15px;\n                font-weight: 500;\n                margin-bottom: 5px;\n                padding: 0;\n                color: #000;\n                background-color: #F97794;\n                padding: 10px;\n                border-radius: 8px;\n            }\n        }\n\n        &.lecture-card {\n            flex-wrap: wrap;\n            margin-bottom: 10px;\n            padding: 5px;\n            border: 1px solid #bdc8d2;\n\n            ion-card-subtitle {\n                flex: 0 0 100%;\n                font-size: 14px;\n                color: #222222;\n            }\n\n            ion-card-header {\n                width: 80px;\n            }\n\n            ion-card-content {\n                flex: 1;\n            }\n        }\n    }\n\n    ion-card-subtitle.title-footer {\n        font-size: 12px;\n        padding: 0px 0px;\n        text-align: right;\n        color: #000;\n        display: flex;\n        margin-bottom: 7px;\n\n        ion-badge {\n            margin-right: 5px;\n            border-radius: 10px;\n            width: 16px;\n            height: 16px;\n            font-size: 10px;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            --background: #110a3b;\n            background-color: #110a3b;\n            color: #fff;\n        }\n    }\n}\n\nion-list,\n.list-ios {\n    padding-top: 0;\n    background-color: #fff !important;\n    padding: 6px 0;\n    margin: 0 12px;\n\n    ion-card-subtitle {\n        font-size: 18px;\n    }\n\n    &.notice-card {\n        ion-item {\n            border-bottom: 0;\n            --background: #fff;\n            background-color: #fff;\n            border-radius: 4px;\n            margin: 0 5px 10px;\n\n            align-items: flex-start;\n            box-shadow: 0px 0px 3px 1px #ccccccb5;\n\n            &:last-child {\n                border-bottom: 0 !important;\n            }\n\n            ion-card-subtitle {\n                font-size: 14px;\n                display: block;\n                width: 100%;\n                color: #ccc;\n\n                ion-text {\n                    color: #000;\n                }\n            }\n\n            ion-avatar {\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                background-color: #fff;\n                width: 45px;\n                height: 45px;\n                margin-right: 5px;\n\n                span {\n                    font-size: 20px;\n                    font-weight: bold;\n                }\n            }\n\n            ion-label {\n                font-size: 13px;\n                font-weight: 400;\n            }\n        }\n    }\n}\n\n.download {\n    margin-top: 20px;\n\n    a {\n        text-decoration: none;\n        border: 1px solid #000;\n        border-radius: 4px;\n        background-color: #110a3b;\n        color: #fff;\n        padding: 10px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 16px;\n\n        ion-icon {\n            font-size: 24px;\n        }\n    }\n}\n\n.modal-text-header {\n    ion-card-subtitle {\n        font-size: 16px;\n\n        ion-text {\n            font-size: 14px;\n            display: block;\n            color: #000;\n        }\n    }\n}\n\nion-modal.event-modal {\n    ion-header {\n      ion-toolbar {\n        ion-title.main-title {\n          color: #fff;\n          --color: #fff;\n          font-size: 14px;\n        }\n      }\n    }\n    .text-start {\n      text-align: left;\n      font-size: 0.9em;\n      color: #666;\n      margin: 5px 0;\n    }\n  }\n  \n\nion-fab-button {\n    width: 22px !important;\n    height: 22px !important;\n    margin-right: 7px;\n    --background: #b7f399;\n    --background-activated: #87d361;\n    --background-hover: #a3e681;\n    --border-radius: 15px;\n    --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);\n    --color: black;\n\n    ion-icon {\n        font-size: 13px;\n    }\n}\n\n.head-4 {\n    align-items: center;\n    display: flex;\n    justify-content: space-between;\n    padding: 10px 15px;\n\n    h4 {\n        font-size: 16px;\n        font-weight: 500;\n        color: #000;\n    }\n\n    h5 {\n        font-size: 12px;\n        font-weight: 400;\n        color: #000;\n    }\n}\n\nh6 {\n    font-size: 13px;\n    font-weight: 500;\n    padding: 7px 15px;\n    color: #623AA2 !important;\n    background: #F3EBFF;\n    border: 1px solid #623AA2;\n    margin: 0px 15px 5px;\n    border-radius: 4px;\n}\n\n\n.no-bg {\n    background-color: transparent !important;\n    padding: 0;\n    margin: 0 0px 10px;\n\n    ion-card {\n        border-bottom: 1px solid #ccc !important;\n        border-radius: 0 !important;\n        padding: 0 10px;\n        margin: 0;\n    }\n\n    ion-card-header {\n        width: 100px !important;\n    }\n\n    .yellow-span {\n        font-size: 13px;\n        font-weight: 400;\n        background-color: #EECE13 !important;\n        padding: 5px;\n        line-height: 1.4;\n        color: #000;\n        width: 100%;\n        border-radius: 8px;\n\n        span {\n            display: block;\n        }\n    }\n}\n\nhr {\n    margin: 0;\n    //opacity: 0.1;\n    background: #bdc8d2;\n}\n\n.mark-btn {\n    background-color: #BC89E0;\n    font-size: 14px;\n    font-weight: 500;\n    margin-bottom: 5px;\n    padding: 0;\n    color: #000;\n    padding: 6px 15px;\n    border-radius: 38px;\n    text-decoration: none;\n    line-height: 1.7;\n}\n\n.attendance-wrap {\n    padding: 0 10px 15px;\n\n    .present {\n        background-color: #def2e6;\n        border-left: 5px solid #87cfa3;\n        border-radius: 4px;\n        padding: 10px;\n        padding: 8px 20px;\n        font-size: 18px;\n        font-weight: 500;\n        color: #222222;\n    }\n\n    .absent {\n        background-color: #f6e8e8;\n        border-left: 5px solid #bb4243;\n        border-radius: 4px;\n        padding: 10px;\n        padding: 8px 18px;\n        font-size: 20px;\n        font-weight: 500;\n        color: #fff;\n    }\n}\n.bold-black-text {\n    font-weight: bold;\n    color: black;\n}\n\n.right-aligned {\n    text-align: right; \n  }\n  \n  .right-aligned ion-text {\n    display: block; \n    margin-bottom: 8px; \n  }\n  \n.bold-black-text {\n    font-weight: bold;\n    color: black;\n    margin-right: 5px; \n}\n.redbg {\n    background-color: #EECE13 !important;\n    color: crimson;\n    font-size: 16px;\n}\n.thumbnail-icon {\n    width: 60px;\n    height: 60px;\n  }\n  \n\n\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 9371:
/*!***************************************************************************************************************************************!*\
  !*** ./src/app/pages/parentApp/parent-dashboard/view-parent-school-event-detail/view-parent-school-event-detail.page.scss?ngResource ***!
  \***************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:host ion-card {
  box-shadow: none !important;
}

ion-list {
  padding-top: 0;
  background-color: #fff !important;
  --background: #fff !important;
  border-radius: 0;
  --border-radius: 0;
}
ion-list ion-card-subtitle {
  font-size: 18px;
}
ion-list.notice-card ion-item {
  border-bottom: 0;
  --background: transparent;
  border-radius: 4px;
  margin-bottom: 5px;
  align-items: flex-start;
}
ion-list.notice-card ion-item ion-avatar span {
  color: green;
}
ion-list.notice-card ion-item.admin {
  background-color: #badee2;
}
ion-list.notice-card ion-item.teacher {
  background-color: #eac0d4;
}
ion-list.notice-card ion-item.teacher ion-avatar span {
  color: red;
}
ion-list.notice-card ion-item.principal {
  background-color: #eae9c0;
}
ion-list.notice-card ion-item.principal ion-avatar span {
  color: #da9513;
}
ion-list.notice-card ion-item:last-child {
  border-bottom: 0 !important;
}
ion-list.notice-card ion-item ion-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 45px;
  height: 45px;
  margin-right: 5px;
}
ion-list.notice-card ion-item ion-avatar span {
  font-size: 20px;
  font-weight: bold;
}
ion-list.notice-card ion-item ion-label {
  font-size: 13px;
  font-weight: 400;
}
ion-list.notice-card ion-item.important {
  background: blue;
  --background: red;
}
@media (prefers-color-scheme: dark) {
  ion-list.notice-card ion-item.important {
    --background: green;
  }
}

.download {
  margin-top: 20px;
}
.download a {
  text-decoration: none;
  border: 1px solid #000;
  border-radius: 4px;
  background-color: var(--ion-color-dark);
  color: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.download a ion-icon {
  font-size: 24px;
}

.modal-text-header ion-card-subtitle {
  font-size: 16px;
}
.modal-text-header ion-card-subtitle ion-text {
  font-size: 14px;
  display: block;
  color: #000;
}

.uploaded-file-text {
  margin: 10px 0;
  font-size: 12px;
  border: 0;
  display: flex;
}
.uploaded-file-text .file-thumb {
  width: 64px;
  height: 64px;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 4px;
  display: flex;
  position: relative;
  margin-right: 10px;
}
.uploaded-file-text .file-thumb img {
  width: 100%;
}

.bold-black-text {
  font-weight: bold;
  color: black;
}

.thumbnail-icon {
  width: 60px;
  height: 60px;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/parent-dashboard/view-parent-school-event-detail/view-parent-school-event-detail.page.scss"],"names":[],"mappings":"AACI;EACI,2BAAA;AAAR;;AAKA;EACI,cAAA;EACA,iCAAA;EACA,6BAAA;EACA,gBAAA;EACA,kBAAA;AAFJ;AAGI;EACI,eAAA;AADR;AAIQ;EACI,gBAAA;EACA,yBAAA;EACA,kBAAA;EACA,kBAAA;EACA,uBAAA;AAFZ;AAKgB;EACI,YAAA;AAHpB;AAMY;EACI,yBAAA;AAJhB;AAMY;EACI,yBAAA;AAJhB;AAMoB;EACI,UAAA;AAJxB;AAQY;EACI,yBAAA;AANhB;AAQoB;EACI,cAAA;AANxB;AAUY;EACI,2BAAA;AARhB;AAUY;EACI,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,sBAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;AARhB;AASgB;EACI,eAAA;EACA,iBAAA;AAPpB;AAUY;EACI,eAAA;EACA,gBAAA;AARhB;AAWY;EAEI,gBAAA;EAEA,iBAAA;AAXhB;AAcc;EACE;IACE,mBAAA;EAZhB;AACF;;AAmBA;EACA,gBAAA;AAhBA;AAiBG;EACC,qBAAA;EACA,sBAAA;EACA,kBAAA;EACA,uCAAA;EACA,WAAA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;AAfJ;AAgBI;EACI,eAAA;AAdR;;AAqBI;EACI,eAAA;AAlBR;AAmBQ;EACI,eAAA;EACA,cAAA;EACA,WAAA;AAjBZ;;AAsBA;EACI,cAAA;EACA,eAAA;EACA,SAAA;EACA,aAAA;AAnBJ;AAoBI;EACI,WAAA;EACA,YAAA;EACA,sBAAA;EACA,YAAA;EACA,kBAAA;EACA,aAAA;EACA,kBAAA;EACA,kBAAA;AAlBR;AAmBQ;EACI,WAAA;AAjBZ;;AAyBA;EACI,iBAAA;EACA,YAAA;AAtBJ;;AAwBA;EACI,WAAA;EACA,YAAA;AArBJ","sourcesContent":[":host {\n    ion-card {\n        box-shadow: none !important;\n    }\n\n}\n\nion-list {\n    padding-top: 0;\n    background-color: #fff !important;\n    --background: #fff !important;\n    border-radius: 0;\n    --border-radius: 0;\n    ion-card-subtitle {\n        font-size: 18px;\n    }\n    &.notice-card {\n        ion-item {\n            border-bottom: 0;\n            --background: transparent;\n            border-radius:4px;\n            margin-bottom: 5px;\n            align-items: flex-start;\n\n            ion-avatar {\n                span {\n                    color: green;\n                }\n            }\n            &.admin {\n                background-color: #badee2;\n            }\n            &.teacher {\n                background-color: #eac0d4;\n                ion-avatar {\n                    span {\n                        color: red;\n                    }\n                }\n            }\n            &.principal {\n                background-color: #eae9c0;\n                ion-avatar {\n                    span {\n                        color: #da9513;\n                    }\n                }\n            }\n            &:last-child {\n                border-bottom: 0 !important;\n            }\n            ion-avatar {\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                background-color: #fff;\n                width: 45px;\n                height: 45px;\n                margin-right: 5px;\n                span {\n                    font-size: 20px;\n                    font-weight: bold;\n                }\n            }\n            ion-label {\n                font-size: 13px;\n                font-weight: 400;\n            }\n\n            &.important {\n               \n                background: blue;\n              \n                --background: red;\n              }\n              \n              @media (prefers-color-scheme: dark) {\n                &.important {\n                  --background: green;\n                }\n              }\n        }\n        }\n}\n\n\n.download {\nmargin-top: 20px;\n   a {\n    text-decoration: none;\n    border: 1px solid #000;\n    border-radius: 4px;\n    background-color: var(--ion-color-dark);\n    color: #fff;\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 16px;\n    ion-icon {\n        font-size: 24px;\n    }\n   }\n}\n\n\n.modal-text-header {\n    ion-card-subtitle {\n        font-size: 16px;\n        ion-text {\n            font-size: 14px;\n            display: block;\n            color: #000;\n        }\n    }\n}\n\n.uploaded-file-text {\n    margin: 10px 0;\n    font-size: 12px;\n    border: 0;\n    display: flex;\n    .file-thumb {\n        width: 64px;\n        height: 64px;\n        border: 1px solid #ccc;\n        padding: 5px;\n        border-radius: 4px;\n        display: flex;\n        position: relative;\n        margin-right: 10px;\n        img {\n            width: 100%;\n        }\n      \n    }\n\n}\n\n\n.bold-black-text {\n    font-weight: bold;\n    color: black;\n}\n.thumbnail-icon {\n    width: 60px;\n    height: 60px;\n  }"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 89153:
/*!*********************************************************************************************!*\
  !*** ./src/app/pages/parentApp/parent-dashboard/parent-dashboard.component.html?ngResource ***!
  \*********************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-content class=\"light-content\" [fullscreen]=\"true\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"handleRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <ng-container *ngIf=\"!content_loaded && isAppAccessible\">\n    <ion-list-header class=\"ion-list-header-small\">\n      <ion-label><ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text></ion-label>\n      <ion-note color=\"tertiary\" class=\"ion-note-small\">\n        <ion-skeleton-text animated style=\"width: 40px\"></ion-skeleton-text>\n      </ion-note>\n    </ion-list-header>\n\n\n    <ion-list class=\"list-custom animate__animated animate__fadeIn\" lines=\"full\">\n      <ion-item color=\"light\" button detail=\"false\" *ngFor=\"let i of [].constructor(12)\">\n        <ion-avatar slot=\"start\" class=\"ion-avatar-default-icon\">\n          <ion-skeleton-text animated></ion-skeleton-text>\n        </ion-avatar>\n        <ion-label>\n          <h3>\n            <ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text>\n          </h3>\n          <p>\n            <ion-skeleton-text animated style=\"width: 75%\"></ion-skeleton-text>\n          </p>\n        </ion-label>\n        <ion-skeleton-text slot=\"end\" animated style=\"width: 15%\"></ion-skeleton-text>\n      </ion-item>\n    </ion-list>\n  </ng-container>\n  <ng-container *ngIf=\"content_loaded && isAppAccessible\">\n\n    <div class=\"head-4\">\n      <h4>Today’s Attendance Status</h4>\n    </div>\n    <div class=\"attendance-wrap\">\n      <div class=\"present\">{{ attendanceStatus?.status }}</div>\n    </div>\n\n    <hr />\n\n    <div class=\"head-4\">\n      <h4>Today’s Lectures</h4>\n    </div>\n    <ion-list>\n      <ion-card class=\"white-bg-color lecture-card\" *ngFor=\"let lecture of lectureList\">\n        <ion-card-subtitle class=\"class\">{{ lecture.teacherName }}</ion-card-subtitle>\n        <ion-card-header>\n          <ion-card-subtitle>{{ lecture.startTime }} <span class=\"to\">to</span> {{ lecture.endTime\n            }}</ion-card-subtitle>\n        </ion-card-header>\n        <ion-card-content>\n          <ion-title slot=\"start\" class=\"text-start\">{{ lecture.subjectName }}</ion-title>\n        </ion-card-content>\n      </ion-card>\n    \n    </ion-list>\n\n    <div *ngIf=\"lectureList?.length === 0\">\n      <ion-card-header class=\"redbg font16 px-2\">\n        <i class=\"bi bi-exclamation-triangle\"></i>\n        <span class=\"ms-2\" translate>There is no Lecture Today.</span>\n      </ion-card-header>\n    </div>\n    <hr />\n\n    <div class=\"head-4 mt-2\">\n      <h4>Upcoming Events</h4>\n      <h5>Next 30 Days</h5>\n    </div>\n    <div *ngIf=\"schoolEventList?.length === 0\">\n      <ion-card-header class=\"redbg font16 px-2\">\n        <i class=\"bi bi-exclamation-triangle\"></i>\n        <span class=\"ms-2\" translate>There is no upcoming events in next 30 days.</span>\n      </ion-card-header>\n    </div>\n\n    <ng-container *ngFor=\"let event of schoolEventList\">\n      <h6>{{ event.startDate?.format('DD MMM yyyy') }}</h6>\n      <ion-list class=\"no-bg\">\n        <ion-card class=\"white-bg-color\" (click)=\"openSchoolEventDetail( event.schoolEventId)\">\n          <ion-card-header>\n            <ion-card-subtitle>\n              {{ event.startTime?.format('hh:mm a') }} \n              <span class=\"to\" *ngIf=\"event.startTime && event.endTime\">to</span> \n              {{ event.endTime?.format('hh:mm a') }}\n            </ion-card-subtitle>\n          </ion-card-header>\n          <ion-card-content>\n            <span class=\"text-start yellow-span\">\n              <span><b>Event Title:</b> {{ event.eventTitle }}</span> \n              <span *ngIf=\"event.eventTitle && event.eventVenue\"><b>Event Venue:</b> {{ event.eventVenue }}</span>\n            </span>\n          </ion-card-content>\n        </ion-card>\n      </ion-list>\n    </ng-container>\n    <ion-card class=\"ion-no-margin ion-card-chart animate__animated animate__fadeIn dark-bg-color\">\n      <!-- Skeletons -->\n      <ng-container *ngIf=\"!content_loaded\">\n        <ion-card-header>\n          <div>\n            <ion-card-title>\n              <ion-skeleton-text animated style=\"width: 60px\"></ion-skeleton-text>\n            </ion-card-title>\n            <ion-card-subtitle>\n              <ion-skeleton-text animated style=\"width: 80px\"></ion-skeleton-text>\n            </ion-card-subtitle>\n          </div>\n          <ion-badge color=\"primary\" mode=\"ios\">\n            <ion-skeleton-text animated style=\"width: 50px\"></ion-skeleton-text>\n          </ion-badge>\n        </ion-card-header>\n\n        <ion-skeleton-text animated style=\"\n              width: calc(100% - 40px);\n              margin: 16px auto 16px auto;\n              min-height: 140px;\n            \">\n        </ion-skeleton-text>\n      </ng-container>\n\n    </ion-card>\n  </ng-container>\n\n</ion-content>\n\n\n<ion-modal id=\"example-modal\" class=\"update-modal\" #modal [isOpen]=\"!isAppAccessible\"  [canDismiss]=\"canDismiss\"  [presentingElement]=\"presentingElement\">\n  <ng-template>\n    <div  class=\"update-app\">\n        <span class=\"icon\"><ion-icon name=\"notifications-outline\"></ion-icon></span>\n        <p class=\"text\">A new version of the app is available. If you haven't updated it please click on update or else click on close.</p>\n        <button (click)=\"redirectToPlayStore()\" class=\"update-button\">Update</button> &nbsp;\n        <button (click)=\"refreshPage()\" class=\"update-button\">Close</button>\n      </div>\n  </ng-template>\n</ion-modal>\n";

/***/ }),

/***/ 78869:
/*!***************************************************************************************************************************************!*\
  !*** ./src/app/pages/parentApp/parent-dashboard/view-parent-school-event-detail/view-parent-school-event-detail.page.html?ngResource ***!
  \***************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header collapse=\"fade\" [translucent]=\"true\" class=\"modal-header\">\n  <ion-toolbar>\n    <ion-title style=\"font-weight: bold; color: black;\">Event Details</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button color=\"primary\" fill=\"solid\" (click)=\"close()\">\n        Close\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n<ion-content class=\"ion-padding\">\n  <ion-card-subtitle class=\"message-from\">\n    <span class=\"bold-black-text\">Event Title: &nbsp;</span>\n    <ion-text>{{ selectedEvent.eventTitle }}</ion-text>\n  </ion-card-subtitle>\n  <br>\n  <ion-card-subtitle class=\"message-from\" *ngFor=\"let date of selectedEvent.lstEventDate\">\n    <span class=\"bold-black-text\">Event Date : &nbsp; </span>\n    <ion-text>{{date.eventStartDate | date: 'dd-MMM-yyyy' }} <span>To</span>  {{ date.eventEndDate | date: 'dd-MMM-yyyy' }}</ion-text>\n  </ion-card-subtitle>\n  <br>\n  <ng-container *ngIf=\"selectedEvent && selectedEvent.startTime && selectedEvent.endTime\">\n    <ion-card-subtitle class=\"message-from\">\n      <span class=\"bold-black-text\">Event Time: &nbsp; </span>\n      <ion-text>\n        {{ selectedEvent.startTime | date: 'hh:mm a' }}\n        <span>To</span> {{ selectedEvent.endTime | date: 'hh:mm a' }}\n      </ion-text>\n    </ion-card-subtitle>\n  </ng-container>\n  <br>\n  <ion-card-subtitle class=\"message-from inline\">\n    <span class=\"bold-black-text\">Event Description:&nbsp;</span>\n    <ion-text [innerHTML]=\"selectedEvent.eventDescription\"></ion-text>\n  </ion-card-subtitle>\n  <ion-card-subtitle class=\"message-from\">\n    <span class=\"bold-black-text\">Event Coordinator: &nbsp;</span>\n    <ion-text>{{ selectedEvent.eventCoordinator }}</ion-text>\n  </ion-card-subtitle>\n  <br>\n  <ion-card-subtitle class=\"message-from\"\n    *ngIf=\"selectedEvent.eventFess && selectedEvent.eventFess.length > 0 && selectedEvent.eventFess !== '0.0000'\">\n    <span class=\"bold-black-text\">Event Fees: &nbsp;</span>\n    <ion-text> <b> ₹ </b> {{ selectedEvent.eventFess | number:'1.2-2' }}</ion-text>\n  </ion-card-subtitle>\n  <div class=\"download\">\n    <ion-card-subtitle class=\"message-from\" *ngIf=\"selectedEvent.lstEventDetail && selectedEvent.lstEventDetail.length > 0\">\n      <span class=\"bold-black-text\">Event Files Download : &nbsp; </span>\n    </ion-card-subtitle>\n    <div class=\"uploaded-file-text\">\n      <span class=\"file-thumb\" *ngFor=\"let f of selectedEvent.lstEventDetail; let i = index\">\n        <img *ngIf=\"getFileExtension(f.fileName) === 'png'\" src=\"../../../../assets/img/img.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'jpeg'\" src=\"../../../../assets/img/img.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'jpg'\" src=\"../../../../assets/img/img.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'pdf'\" src=\"../../../../assets/img/pdf.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'doc'\" src=\"../../../../assets/img/doc.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'xls'\" src=\"../../../../assets/img/xlsx.png.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'pptx'\" src=\"../../../../assets/img/ppt.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'txt'\" src=\"../../../../assets/img/txt.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'svg'\" src=\"../../../../assets/img/img.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'csv'\" src=\"../../../../assets/img/csv.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'bmp'\" src=\"../../../../assets/img/bmp.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'xlsx'\" src=\"../../../../assets/img/xlsx.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n      </span>\n    </div>\n  </div>\n\n</ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_parentApp_parent-dashboard_parent-dashboard_module_ts.js.map