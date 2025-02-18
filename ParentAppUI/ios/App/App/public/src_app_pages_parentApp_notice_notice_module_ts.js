(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_parentApp_notice_notice_module_ts"],{

/***/ 91461:
/*!*****************************************************************!*\
  !*** ./src/app/pages/parentApp/notice/notice-routing.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NoticeRoutingModule: () => (/* binding */ NoticeRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _notice_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notice.component */ 15641);




const routes = [{
  path: "",
  component: _notice_component__WEBPACK_IMPORTED_MODULE_0__.NoticeComponent
}];
let NoticeRoutingModule = class NoticeRoutingModule {};
NoticeRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], NoticeRoutingModule);


/***/ }),

/***/ 15641:
/*!************************************************************!*\
  !*** ./src/app/pages/parentApp/notice/notice.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NoticeComponent: () => (/* binding */ NoticeComponent)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _notice_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notice.component.html?ngResource */ 48307);
/* harmony import */ var _notice_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notice.component.scss?ngResource */ 26701);
/* harmony import */ var _notice_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_notice_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var _view_parent_notice_file_detail_view_parent_notice_file_detail_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view-parent-notice-file-detail/view-parent-notice-file-detail.page */ 43358);











const groupBy = (arr, key) => arr.reduce((groups, item) => {
  (groups[key(item)] ||= []).push(item);
  return groups;
}, {});
let NoticeComponent = class NoticeComponent {
  constructor(routerOutlet, modalController, userService, noticeService, commonMethod, teacherProfileService) {
    this.routerOutlet = routerOutlet;
    this.modalController = modalController;
    this.userService = userService;
    this.noticeService = noticeService;
    this.commonMethod = commonMethod;
    this.teacherProfileService = teacherProfileService;
    this.dateExample = new Date().toISOString();
    this.content_loaded = false;
    this.months = [];
  }
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Notice');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    this.selectedMonth = currentDate.getMonth() + 1 + ":" + year;
    this.userService.getAcademicYear().subscribe(academicYearId => {
      this.academicYearId = academicYearId;
      this.loadMonthHomeworkList();
      this.getUserDetails();
    });
  }
  ngOnInit() {}
  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  getAllNotices(month, year) {
    let noticeRequest = {
      academicYearId: this.academicYearId,
      month,
      year,
      studentId: this.userService.CurrentSiblingId
    };
    this.noticeService.getAllNoticeForStudent(noticeRequest).subscribe(result => {
      this.noticeList = result.noticeList.reduce((groups, item) => {
        const groupIndex = groups.findIndex(group => group[0].category === item.startDate.format('LL'));
        if (groupIndex !== -1) {
          groups[groupIndex].push(item);
        } else {
          groups.push([item]);
        }
        return groups;
      }, []);
      this.content_loaded = true;
    });
  }
  GetMonths() {
    this.months = [];
    let fromDate = new Date('2023-01-01');
    if (this.schoolDetails.academicYearStartMonth) {
      fromDate = new Date(this.schoolDetails.academicYearStartMonth.toString());
    }
    let toDate = new Date();
    // set last day of current month
    toDate = new Date(toDate.getFullYear(), toDate.getMonth() + 1, 0);
    const currentDate = new Date(fromDate);
    while (currentDate <= toDate) {
      const month = currentDate.toLocaleString('default', {
        month: 'short'
      });
      const year = currentDate.getFullYear();
      this.months.push({
        text: `${month}-${year}`,
        value: currentDate.getMonth() + 1 + ":" + year
      });
      currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
    }
    return this.months;
  }
  GetSchoolBasicDetails() {
    this.teacherProfileService.getSchoolBasicDetails().subscribe(result => {
      this.schoolDetails = result;
      this.GetMonths();
      this.content_loaded = true;
    });
  }
  onMonthChange(e) {
    this.loadMonthHomeworkList();
  }
  loadMonthHomeworkList() {
    if (this.selectedMonth) {
      if (this.selectedMonth.length > 1) {
        this.getAllNotices(parseInt(this.selectedMonth.split(":")[0]), parseInt(this.selectedMonth.split(":")[1]));
      }
    } else {
      let currentDate = new Date();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      this.getAllNotices(month, year);
    }
  }
  getUserDetails() {
    this.userService.getUser().subscribe(result => {
      this.academicYearId = result.academicYearId;
      this.userId = result.userId;
      this.GetSchoolBasicDetails();
    });
  }
  openNoticeDetail(currentNoticeOnPopup) {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this.modalController.create({
        component: _view_parent_notice_file_detail_view_parent_notice_file_detail_page__WEBPACK_IMPORTED_MODULE_6__.ViewParentNoticeFileDetailPage,
        componentProps: {
          currentNoticeOnPopup: currentNoticeOnPopup
        }
      });
      yield modal.present();
    })();
  }
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonRouterOutlet
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__.UserService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_3__.NoticeServiceProxy
  }, {
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_5__.CommonMethodService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_3__.TeacherProfileServiceProxy
  }];
  static #_2 = this.propDecorators = {
    modal: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild,
      args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonModal]
    }]
  };
};
NoticeComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-notice',
  template: _notice_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_notice_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], NoticeComponent);


/***/ }),

/***/ 37548:
/*!*********************************************************!*\
  !*** ./src/app/pages/parentApp/notice/notice.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NoticeModule: () => (/* binding */ NoticeModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-charts */ 16045);
/* harmony import */ var _notice_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notice-routing.module */ 91461);
/* harmony import */ var _notice_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notice.component */ 15641);
/* harmony import */ var _view_parent_notice_file_detail_view_parent_notice_file_detail_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view-parent-notice-file-detail/view-parent-notice-file-detail.page */ 43358);









let NoticeModule = class NoticeModule {};
NoticeModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _notice_routing_module__WEBPACK_IMPORTED_MODULE_0__.NoticeRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, ng2_charts__WEBPACK_IMPORTED_MODULE_8__.NgChartsModule],
  declarations: [_notice_component__WEBPACK_IMPORTED_MODULE_1__.NoticeComponent, _view_parent_notice_file_detail_view_parent_notice_file_detail_page__WEBPACK_IMPORTED_MODULE_2__.ViewParentNoticeFileDetailPage]
})], NoticeModule);


/***/ }),

/***/ 43358:
/*!**************************************************************************************************************!*\
  !*** ./src/app/pages/parentApp/notice/view-parent-notice-file-detail/view-parent-notice-file-detail.page.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewParentNoticeFileDetailPage: () => (/* binding */ ViewParentNoticeFileDetailPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _view_parent_notice_file_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-parent-notice-file-detail.page.html?ngResource */ 39822);
/* harmony import */ var _view_parent_notice_file_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view-parent-notice-file-detail.page.scss?ngResource */ 64064);
/* harmony import */ var _view_parent_notice_file_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_view_parent_notice_file_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 37401);





let ViewParentNoticeFileDetailPage = class ViewParentNoticeFileDetailPage {
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
  hasNonEmptyVideoLinks() {
    if (!this.currentNoticeOnPopup.lstNoticeMediaDetail) {
      return false;
    }
    for (const item of this.currentNoticeOnPopup.lstNoticeMediaDetail) {
      if (item.contentUrl.trim().length > 0) {
        return true;
      }
    }
    return false;
  }
  openVideoLink(videoUrl) {
    window.open(videoUrl, '_blank');
  }
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.ModalController
  }];
};
ViewParentNoticeFileDetailPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  selector: 'view-parent-notice-file-detail',
  template: _view_parent_notice_file_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_view_parent_notice_file_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], ViewParentNoticeFileDetailPage);


/***/ }),

/***/ 26701:
/*!*************************************************************************!*\
  !*** ./src/app/pages/parentApp/notice/notice.component.scss?ngResource ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:host ion-card {
  box-shadow: none !important;
}

.date-header {
  padding: 0 10px;
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

ion-label {
  color: black;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/notice/notice.component.scss"],"names":[],"mappings":"AACI;EACI,2BAAA;AAAR;;AAIA;EACI,eAAA;AADJ;;AAIA;EACI,cAAA;EACA,iCAAA;EACA,6BAAA;EACA,gBAAA;EACA,kBAAA;AADJ;AAEI;EACI,eAAA;AAAR;AAGQ;EACI,gBAAA;EACA,yBAAA;EACA,kBAAA;EACA,kBAAA;EACA,uBAAA;AADZ;AAIgB;EACI,YAAA;AAFpB;AAKY;EACI,yBAAA;AAHhB;AAKY;EACI,yBAAA;AAHhB;AAKoB;EACI,UAAA;AAHxB;AAOY;EACI,yBAAA;AALhB;AAOoB;EACI,cAAA;AALxB;AASY;EACI,2BAAA;AAPhB;AASY;EACI,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,sBAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;AAPhB;AAQgB;EACI,eAAA;EACA,iBAAA;AANpB;AASY;EACI,eAAA;EACA,gBAAA;AAPhB;AAUY;EAEI,gBAAA;EAEA,iBAAA;AAVhB;AAac;EACE;IACE,mBAAA;EAXhB;AACF;;AAkBA;EACA,gBAAA;AAfA;AAgBG;EACC,qBAAA;EACA,sBAAA;EACA,kBAAA;EACA,uCAAA;EACA,WAAA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;AAdJ;AAeI;EACI,eAAA;AAbR;;AAoBI;EACI,eAAA;AAjBR;AAkBQ;EACI,eAAA;EACA,cAAA;EACA,WAAA;AAhBZ;;AAqBA;EACI,cAAA;EACA,eAAA;EACA,SAAA;EACA,aAAA;AAlBJ;AAmBI;EACI,WAAA;EACA,YAAA;EACA,sBAAA;EACA,YAAA;EACA,kBAAA;EACA,aAAA;EACA,kBAAA;EACA,kBAAA;AAjBR;AAkBQ;EACI,WAAA;AAhBZ;;AAuBA;EACI,iBAAA;EACA,YAAA;AApBJ;;AAuBA;EACI,YAAA;AApBJ","sourcesContent":[":host {\n    ion-card {\n        box-shadow: none !important;\n    }\n\n}\n.date-header {\n    padding: 0 10px;\n}\n\nion-list {\n    padding-top: 0;\n    background-color: #fff !important;\n    --background: #fff !important;\n    border-radius: 0;\n    --border-radius: 0;\n    ion-card-subtitle {\n        font-size: 18px;\n    }\n    &.notice-card {\n        ion-item {\n            border-bottom: 0;\n            --background: transparent;\n            border-radius:4px;\n            margin-bottom: 5px;\n            align-items: flex-start;\n\n            ion-avatar {\n                span {\n                    color: green;\n                }\n            }\n            &.admin {\n                background-color: #badee2;\n            }\n            &.teacher {\n                background-color: #eac0d4;\n                ion-avatar {\n                    span {\n                        color: red;\n                    }\n                }\n            }\n            &.principal {\n                background-color: #eae9c0;\n                ion-avatar {\n                    span {\n                        color: #da9513;\n                    }\n                }\n            }\n            &:last-child {\n                border-bottom: 0 !important;\n            }\n            ion-avatar {\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                background-color: #fff;\n                width: 45px;\n                height: 45px;\n                margin-right: 5px;\n                span {\n                    font-size: 20px;\n                    font-weight: bold;\n                }\n            }\n            ion-label {\n                font-size: 13px;\n                font-weight: 400;\n            }\n\n            &.important {\n               \n                background: blue;\n              \n                --background: red;\n              }\n              \n              @media (prefers-color-scheme: dark) {\n                &.important {\n                  --background: green;\n                }\n              }\n        }\n        }\n}\n\n\n.download {\nmargin-top: 20px;\n   a {\n    text-decoration: none;\n    border: 1px solid #000;\n    border-radius: 4px;\n    background-color: var(--ion-color-dark);\n    color: #fff;\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 16px;\n    ion-icon {\n        font-size: 24px;\n    }\n   }\n}\n\n\n.modal-text-header {\n    ion-card-subtitle {\n        font-size: 16px;\n        ion-text {\n            font-size: 14px;\n            display: block;\n            color: #000;\n        }\n    }\n}\n\n.uploaded-file-text {\n    margin: 10px 0;\n    font-size: 12px;\n    border: 0;\n    display: flex;\n    .file-thumb {\n        width: 64px;\n        height: 64px;\n        border: 1px solid #ccc;\n        padding: 5px;\n        border-radius: 4px;\n        display: flex;\n        position: relative;\n        margin-right: 10px;\n        img {\n            width: 100%;\n        }\n      \n    }\n\n}\n\n.bold-black-text {\n    font-weight: bold;\n    color: black;\n}\n\nion-label {\n    color: black ;\n  }"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 64064:
/*!***************************************************************************************************************************!*\
  !*** ./src/app/pages/parentApp/notice/view-parent-notice-file-detail/view-parent-notice-file-detail.page.scss?ngResource ***!
  \***************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@charset "UTF-8";
:host ion-card {
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
  color: #000000; /* Black text color */
  background-color: transparent; /* Default background color */
}

.plain-input {
  background-color: #fff;
  border: none;
  padding: 8px;
}

.bold-black-text {
  font-weight: bold;
  color: black;
}

.video-link-wrap {
  margin-top: 10px;
}

.videoText a {
  display: block;
  margin-bottom: 25px; /* Add space between links */
  color: black; /* Or any preferred color */
  text-decoration: none;
  word-break: break-all; /* Ensures long URLs wrap within the container */
}

.videoText a:hover {
  text-decoration: underline;
}

.black-bullet {
  list-style-type: none; /* Remove default bullet */
  padding-left: 0; /* Optional: adjust padding to align with your design */
  margin: 0; /* Remove default margin */
}

.black-bullet li {
  position: relative; /* For the pseudo-element */
  padding-left: 20px; /* Space for the bullet */
  color: black; /* This ensures the bullet points themselves are black */
}

.black-bullet li::before {
  content: "•"; /* Bullet character */
  position: absolute;
  left: 0;
  color: black; /* Ensures the bullet color is black */
}

.black-bullet li a {
  text-decoration: none;
  color: inherit; /* Ensures the link color matches the text color */
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/notice/view-parent-notice-file-detail/view-parent-notice-file-detail.page.scss"],"names":[],"mappings":"AAAA,gBAAgB;AACZ;EACI,2BAAA;AACR;;AAIA;EACI,cAAA;EACA,iCAAA;EACA,6BAAA;EACA,gBAAA;EACA,kBAAA;AADJ;AAEI;EACI,eAAA;AAAR;AAGQ;EACI,gBAAA;EACA,yBAAA;EACA,kBAAA;EACA,kBAAA;EACA,uBAAA;AADZ;AAIgB;EACI,YAAA;AAFpB;AAKY;EACI,yBAAA;AAHhB;AAKY;EACI,yBAAA;AAHhB;AAKoB;EACI,UAAA;AAHxB;AAOY;EACI,yBAAA;AALhB;AAOoB;EACI,cAAA;AALxB;AASY;EACI,2BAAA;AAPhB;AASY;EACI,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,sBAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;AAPhB;AAQgB;EACI,eAAA;EACA,iBAAA;AANpB;AASY;EACI,eAAA;EACA,gBAAA;AAPhB;AAUY;EAEI,gBAAA;EAEA,iBAAA;AAVhB;AAac;EACE;IACE,mBAAA;EAXhB;AACF;;AAkBA;EACA,gBAAA;AAfA;AAgBG;EACC,qBAAA;EACA,sBAAA;EACA,kBAAA;EACA,uCAAA;EACA,WAAA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;AAdJ;AAeI;EACI,eAAA;AAbR;;AAoBI;EACI,eAAA;AAjBR;AAkBQ;EACI,eAAA;EACA,cAAA;EACA,WAAA;AAhBZ;;AAqBA;EACI,cAAA;EACA,eAAA;EACA,SAAA;EACA,aAAA;AAlBJ;AAmBI;EACI,WAAA;EACA,YAAA;EACA,sBAAA;EACA,YAAA;EACA,kBAAA;EACA,aAAA;EACA,kBAAA;EACA,kBAAA;AAjBR;AAkBQ;EACI,WAAA;AAhBZ;;AAsBA;EACI,iBAAA;EACA,cAAA,EAAA,qBAAA;EACA,6BAAA,EAAA,6BAAA;AAnBJ;;AAsBA;EAEI,sBAAA;EACA,YAAA;EACA,YAAA;AApBJ;;AAuBE;EACE,iBAAA;EACA,YAAA;AApBJ;;AAuBE;EACE,gBAAA;AApBJ;;AAuBE;EACE,cAAA;EACA,mBAAA,EAAA,4BAAA;EACA,YAAA,EAAA,2BAAA;EACA,qBAAA;EACA,qBAAA,EAAA,gDAAA;AApBJ;;AAuBE;EACE,0BAAA;AApBJ;;AAuBE;EACE,qBAAA,EAAA,0BAAA;EACA,eAAA,EAAA,uDAAA;EACA,SAAA,EAAA,0BAAA;AApBJ;;AAuBE;EACE,kBAAA,EAAA,2BAAA;EACA,kBAAA,EAAA,yBAAA;EACA,YAAA,EAAA,wDAAA;AApBJ;;AAuBE;EACE,YAAA,EAAA,qBAAA;EACA,kBAAA;EACA,OAAA;EACA,YAAA,EAAA,sCAAA;AApBJ;;AAuBE;EACE,qBAAA;EACA,cAAA,EAAA,kDAAA;AApBJ","sourcesContent":[":host {\n    ion-card {\n        box-shadow: none !important;\n    }\n\n}\n\nion-list {\n    padding-top: 0;\n    background-color: #fff !important;\n    --background: #fff !important;\n    border-radius: 0;\n    --border-radius: 0;\n    ion-card-subtitle {\n        font-size: 18px;\n    }\n    &.notice-card {\n        ion-item {\n            border-bottom: 0;\n            --background: transparent;\n            border-radius:4px;\n            margin-bottom: 5px;\n            align-items: flex-start;\n\n            ion-avatar {\n                span {\n                    color: green;\n                }\n            }\n            &.admin {\n                background-color: #badee2;\n            }\n            &.teacher {\n                background-color: #eac0d4;\n                ion-avatar {\n                    span {\n                        color: red;\n                    }\n                }\n            }\n            &.principal {\n                background-color: #eae9c0;\n                ion-avatar {\n                    span {\n                        color: #da9513;\n                    }\n                }\n            }\n            &:last-child {\n                border-bottom: 0 !important;\n            }\n            ion-avatar {\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                background-color: #fff;\n                width: 45px;\n                height: 45px;\n                margin-right: 5px;\n                span {\n                    font-size: 20px;\n                    font-weight: bold;\n                }\n            }\n            ion-label {\n                font-size: 13px;\n                font-weight: 400;\n            }\n\n            &.important {\n               \n                background: blue;\n              \n                --background: red;\n              }\n              \n              @media (prefers-color-scheme: dark) {\n                &.important {\n                  --background: green;\n                }\n              }\n        }\n        }\n}\n\n\n.download {\nmargin-top: 20px;\n   a {\n    text-decoration: none;\n    border: 1px solid #000;\n    border-radius: 4px;\n    background-color: var(--ion-color-dark);\n    color: #fff;\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 16px;\n    ion-icon {\n        font-size: 24px;\n    }\n   }\n}\n\n\n.modal-text-header {\n    ion-card-subtitle {\n        font-size: 16px;\n        ion-text {\n            font-size: 14px;\n            display: block;\n            color: #000;\n        }\n    }\n}\n\n.uploaded-file-text {\n    margin: 10px 0;\n    font-size: 12px;\n    border: 0;\n    display: flex;\n    .file-thumb {\n        width: 64px;\n        height: 64px;\n        border: 1px solid #ccc;\n        padding: 5px;\n        border-radius: 4px;\n        display: flex;\n        position: relative;\n        margin-right: 10px;\n        img {\n            width: 100%;\n        }\n      \n    }\n\n}\n.bold-black-text {\n    font-weight: bold;\n    color: #000000; /* Black text color */\n    background-color: transparent; /* Default background color */\n}\n\n.plain-input {\n   \n    background-color: #fff;\n    border: none;\n    padding: 8px;\n  }\n\n  .bold-black-text {\n    font-weight: bold;\n    color: black;\n  }\n  \n  .video-link-wrap {\n    margin-top: 10px;\n  }\n  \n  .videoText a {\n    display: block;\n    margin-bottom: 25px; /* Add space between links */\n    color: black; /* Or any preferred color */\n    text-decoration: none;\n    word-break: break-all; /* Ensures long URLs wrap within the container */\n  }\n  \n  .videoText a:hover {\n    text-decoration: underline;\n  }\n\n  .black-bullet {\n    list-style-type: none; /* Remove default bullet */\n    padding-left: 0; /* Optional: adjust padding to align with your design */\n    margin: 0; /* Remove default margin */\n  }\n  \n  .black-bullet li {\n    position: relative; /* For the pseudo-element */\n    padding-left: 20px; /* Space for the bullet */\n    color: black; /* This ensures the bullet points themselves are black */\n  }\n  \n  .black-bullet li::before {\n    content: '•'; /* Bullet character */\n    position: absolute;\n    left: 0;\n    color: black; /* Ensures the bullet color is black */\n  }\n  \n  .black-bullet li a {\n    text-decoration: none;\n    color: inherit; /* Ensures the link color matches the text color */\n  }\n  \n  \n  \n  \n\n\n  \n  \n  \n  \n  \n  \n  \n  \n\n\n  \n  \n  \n  "],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 48307:
/*!*************************************************************************!*\
  !*** ./src/app/pages/parentApp/notice/notice.component.html?ngResource ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-content [fullscreen]=\"true\" class=\"new\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"handleRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <ng-container >\n    <ion-list-header class=\"ion-list-header-small\">\n      <ion-label><ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text></ion-label>\n      <ion-note color=\"tertiary\" class=\"ion-note-small\">\n        <ion-skeleton-text animated style=\"width: 40px\"></ion-skeleton-text>\n      </ion-note>\n    </ion-list-header>\n\n    <!-- <ion-list class=\"list-custom animate__animated animate__fadeIn\" lines=\"full\">\n      <ion-item color=\"light\" button detail=\"false\" *ngFor=\"let i of [].constructor(12)\">\n        <ion-avatar slot=\"start\" class=\"ion-avatar-default-icon\">\n          <ion-skeleton-text animated></ion-skeleton-text>\n        </ion-avatar>\n        <ion-label>\n          <h3>\n            <ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text>\n          </h3>\n          <p>\n            <ion-skeleton-text animated style=\"width: 75%\"></ion-skeleton-text>\n          </p>\n        </ion-label>\n        <ion-skeleton-text slot=\"end\" animated style=\"width: 15%\"></ion-skeleton-text>\n      </ion-item>\n    </ion-list> -->\n  </ng-container>\n  <div class=\"date-header mt-3\">\n    <div class=\"form-control-wrapper d-flex align-items-center\">\n      <label for=\"classSelect\" class=\"me-2 black-text\"><strong>Select month</strong></label>\n      <div class=\"custom-input-css without-label custom-width\">\n        <ion-select class=\"custom-select-css\" [(ngModel)]=\"selectedMonth\" (ionChange)=\"onMonthChange($event)\">\n          <ion-select-option *ngFor=\"let month of months\" [value]=\"month.value\">{{month.text}}</ion-select-option>\n        </ion-select>\n      </div>\n    </div>\n  </div> \n  <ng-container *ngIf=\"content_loaded\">\n    <ion-card class=\"rounded-0 mt-0\" *ngIf=\"noticeList.length>0\">\n      <ng-container *ngFor=\"let noticeGroup of noticeList\">\n        <ion-list class=\"notice-card\">\n          <ion-card-header class=\"px-0\">\n            <ion-card-subtitle color=\"dark\">{{noticeGroup[0].startDate.format('LL')}}</ion-card-subtitle>\n          </ion-card-header>\n\n          <ion-item lines=\"none\" *ngFor=\"let notice of noticeGroup\" class=\"admin align-items-center\"\n            (click)=\"openNoticeDetail(notice)\">\n            <ion-avatar slot=\"start\">\n              <span>{{ notice.noticeTitle[0].toUpperCase() }}</span>\n            </ion-avatar>\n            <ion-label class=\"ms-2 black-text\">{{ notice.noticeTitle }}</ion-label>\n            <ion-icon *ngIf=\"notice.isImportant\" name=\"alert-circle\" color=\"danger\"></ion-icon>\n          </ion-item>\n        </ion-list>\n      </ng-container>\n\n    </ion-card>\n    <ion-card class=\"mt-5\" *ngIf=\"noticeList.length==0\">\n      <ion-card-header class=\"nrf-header\">\n        <ion-card-subtitle color=\"dark\">No Notices Found</ion-card-subtitle>\n      </ion-card-header>\n    </ion-card>\n  </ng-container>\n\n</ion-content>";

/***/ }),

/***/ 39822:
/*!***************************************************************************************************************************!*\
  !*** ./src/app/pages/parentApp/notice/view-parent-notice-file-detail/view-parent-notice-file-detail.page.html?ngResource ***!
  \***************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header collapse=\"fade\" [translucent]=\"true\" class=\"modal-header\">\n  <ion-toolbar>\n   \n\n    <ion-title color=\"dark-color\" style=\"font-weight: bold;\">Notice Details</ion-title>\n      \n  \n    <ion-buttons slot=\"end\">\n      <ion-button color=\"primary\" fill=\"solid\" (click)=\"close()\">\n        Close\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n<ion-content class=\"ion-padding\">  \n  <ion-card-subtitle class=\"bold-black-text\">{{currentNoticeOnPopup.createdDate.format('LL')}}\n  </ion-card-subtitle>\n  <br>\n  <ion-card-subtitle class=\"message-from\">\n    <span class=\"bold-black-text\">From: &nbsp;</span>\n    <ion-text>{{currentNoticeOnPopup.roleName}}</ion-text>\n  </ion-card-subtitle>\n  <br>\n  <ion-card-subtitle class=\"message-from\">\n    <span class=\"bold-black-text\">Notice Title: &nbsp;</span>\n    <ion-text [innerHTML]=\"currentNoticeOnPopup.noticeTitle\"></ion-text>\n  </ion-card-subtitle>\n  <br>\n  <ion-card-subtitle class=\"message-from\">\n    <span class=\"bold-black-text\">Start Date: &nbsp;</span>\n    <ion-text>{{ currentNoticeOnPopup.startDate.format('DD-MMM-YYYY') }}</ion-text>\n  </ion-card-subtitle>\n  <br>\n  <ion-card-subtitle class=\"message-from\">\n    <span class=\"bold-black-text\">End Date: &nbsp;</span>\n    <ion-text>{{ currentNoticeOnPopup.endDate.format('DD-MMM-YYYY') }}</ion-text>\n  </ion-card-subtitle>\n  <br>\n  <ion-card-subtitle class=\"message-from\">\n    <span class=\"bold-black-text\">Important Notice: &nbsp;</span>\n    <ion-text>{{ currentNoticeOnPopup.isImportant ? 'Yes' : 'No' }}</ion-text>\n    <ion-icon *ngIf=\"currentNoticeOnPopup.isImportant\"></ion-icon>\n  </ion-card-subtitle>\n  <br>\n  <ion-card-subtitle class=\"message-from\">\n    <span class=\"bold-black-text\">Notice Description: </span>\n    <ion-text [innerHTML]=\"currentNoticeOnPopup.noticeDescription\"></ion-text>\n  </ion-card-subtitle>\n  \n  <div class=\"download\">\n    <ion-card-subtitle class=\"message-from\"\n      *ngIf=\"currentNoticeOnPopup.lstNoticeDetail && currentNoticeOnPopup.lstNoticeDetail.length > 0\">\n      <span class=\"bold-black-text\">Notice Files Download : </span>\n    </ion-card-subtitle>\n    <div class=\"uploaded-file-text\">\n      <span class=\"file-thumb\" *ngFor=\"let f of currentNoticeOnPopup.lstNoticeDetail; let i = index\">\n        <img *ngIf=\"getFileExtension(f.fileName) === 'png'\" src=\"../../../../assets/img/img.png\"\n          (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'jpeg'\" src=\"../../../../assets/img/img.png\"\n          (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'jpg'\" src=\"../../../../assets/img/img.png\"\n          (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'pdf'\" src=\"../../../../assets/img/pdf.png\"\n          (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'doc'\" src=\"../../../../assets/img/doc.png\"\n          (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'xls'\" src=\"../../../../assets/img/xlsx.png.png\"\n          (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'pptx'\" src=\"../../../../assets/img/ppt.png\"\n          (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'txt'\" src=\"../../../../assets/img/txt.png\"\n          (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'svg'\" src=\"../../../../assets/img/svg.png\"\n          (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'csv'\" src=\"../../../../assets/img/csv.png\"\n          (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'bmp'\" src=\"../../../../assets/img/bmp.png\"\n          (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'xlsx'\" src=\"../../../../assets/img/xlsx.png\"\n          (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'docx'\" src=\"../../../../assets/img/docx-file.png\"\n          (click)=\"showFile(f)\" />\n\n\n      </span>\n    </div>\n\n\n<div class=\"download\" *ngIf=\"currentNoticeOnPopup.lstNoticeMediaDetail && hasNonEmptyVideoLinks()\">\n  <ion-card-subtitle class=\"message-from\">\n    <span class=\"bold-black-text\">Notice Media File Download: </span>\n  </ion-card-subtitle>\n  <div class=\"videoText video-link-wrap\">\n    <ul class=\"black-bullet\">\n      <li *ngFor=\"let f of currentNoticeOnPopup.lstNoticeMediaDetail; let i = index\">\n        <a [href]=\"f.contentUrl\" target=\"_blank\" id=\"contentUrl_{{i}}\">\n          {{ f.contentUrl }}\n        </a>\n      </li>\n    </ul>\n  </div>\n</div>\n\n\n\n</div>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_parentApp_notice_notice_module_ts.js.map