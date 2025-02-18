(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_driverApp_driver-app_module_ts"],{

/***/ 62460:
/*!**************************************************************!*\
  !*** ./src/app/pages/driverApp/driver-app-routing.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DriverAppRoutingModule: () => (/* binding */ DriverAppRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 95072);



const routes = [{
  path: '',
  children: [{
    path: 'home',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_driverApp_home_home_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../driverApp/home/home.module */ 4560)).then(m => m.HomePageModule)
  }, {
    path: 'cabdriverTab',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_driverApp_tabs_cabdriver-tabs_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../driverApp/tabs/cabdriver-tabs.module */ 10963)).then(m => m.CabDriverTabsModule)
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }]
}];
let DriverAppRoutingModule = class DriverAppRoutingModule {};
DriverAppRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
})], DriverAppRoutingModule);


/***/ }),

/***/ 51741:
/*!******************************************************!*\
  !*** ./src/app/pages/driverApp/driver-app.module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DriverAppModule: () => (/* binding */ DriverAppModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _driver_app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./driver-app-routing.module */ 62460);
/* harmony import */ var _view_student_info_view_student_info_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view-student-info/view-student-info.component */ 67197);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 37401);






let DriverAppModule = class DriverAppModule {};
DriverAppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  declarations: [_view_student_info_view_student_info_component__WEBPACK_IMPORTED_MODULE_1__.ViewStudentInfoComponent],
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _driver_app_routing_module__WEBPACK_IMPORTED_MODULE_0__.DriverAppRoutingModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule]
})], DriverAppModule);


/***/ }),

/***/ 67197:
/*!**********************************************************************************!*\
  !*** ./src/app/pages/driverApp/view-student-info/view-student-info.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewStudentInfoComponent: () => (/* binding */ ViewStudentInfoComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _view_student_info_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-student-info.component.html?ngResource */ 29723);
/* harmony import */ var _view_student_info_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view-student-info.component.scss?ngResource */ 78961);
/* harmony import */ var _view_student_info_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_view_student_info_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 37401);





let ViewStudentInfoComponent = class ViewStudentInfoComponent {
  constructor(modalCtrl) {
    this.modalCtrl = modalCtrl;
  }
  ngOnInit() {
    this.confirm();
  }
  close() {
    return this.modalCtrl.dismiss(false, 'cancel');
  }
  confirm() {
    return this.modalCtrl.dismiss(this.studentPopup.studentId, 'confirm');
  }
  ScanMore() {
    return this.modalCtrl.dismiss(this.studentPopup.studentId, 'scanMore');
  }
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.ModalController
  }];
};
ViewStudentInfoComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  selector: 'app-view-student-info',
  template: _view_student_info_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_view_student_info_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], ViewStudentInfoComponent);


/***/ }),

/***/ 78961:
/*!***********************************************************************************************!*\
  !*** ./src/app/pages/driverApp/view-student-info/view-student-info.component.scss?ngResource ***!
  \***********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.bold-black-text {
  font-weight: 600;
  color: black;
}

.black-text {
  color: black;
}

.out-border {
  border: 1px solid #ccc;
  padding: 7px;
  border-radius: 4px;
  background: #f1f3fa;
}
.out-border .student-d {
  margin-bottom: 7px;
}
.out-border .student-d span {
  font-size: 13px;
  color: black;
}

.scan-details-btns {
  margin-top: 20px;
  display: flex;
  column-gap: 13px;
  justify-content: space-between;
}
.scan-details-btns button {
  border-radius: 20px;
  border: 0;
  padding: 7px;
  color: #fff;
  flex: 1;
  font-size: 13px;
  font-weight: 500;
}
.scan-details-btns button.confirm {
  background-color: #0ab39c;
}
.scan-details-btns button.scan-more {
  background-color: #022e45;
}
.scan-details-btns button.cancel {
  background: #a2a8b0;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/driverApp/view-student-info/view-student-info.component.scss"],"names":[],"mappings":"AAAA;EACI,gBAAA;EACA,YAAA;AACJ;;AACE;EACE,YAAA;AAEJ;;AAAE;EACE,sBAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;AAGJ;AAFI;EACE,kBAAA;AAIN;AAHM;EACE,eAAA;EACA,YAAA;AAKR;;AAAE;EACE,gBAAA;EACA,aAAA;EACA,gBAAA;EACA,8BAAA;AAGJ;AAFI;EACE,mBAAA;EACA,SAAA;EACA,YAAA;EACA,WAAA;EACA,OAAA;EACA,eAAA;EACA,gBAAA;AAIN;AAHM;EACE,yBAAA;AAKR;AAHM;EACE,yBAAA;AAKR;AAHM;EACE,mBAAA;AAKR","sourcesContent":[".bold-black-text {\n    font-weight: 600;\n    color: black;\n  }\n  .black-text {\n    color: black;\n  }\n  .out-border {\n    border: 1px solid #ccc;\n    padding: 7px;\n    border-radius: 4px;\n    background: #f1f3fa;\n    .student-d {\n      margin-bottom: 7px;\n      span {\n        font-size: 13px;\n        color: black;\n      }\n    }\n  }\n\n  .scan-details-btns {\n    margin-top: 20px;\n    display: flex;\n    column-gap: 13px;\n    justify-content: space-between;\n    button {\n      border-radius: 20px;\n      border: 0;\n      padding: 7px;\n      color: #fff;\n      flex: 1;\n      font-size: 13px;\n      font-weight: 500;\n      &.confirm {\n        background-color: #0ab39c;\n      }\n      &.scan-more {\n        background-color: #022e45;\n      }\n      &.cancel{\n        background: #a2a8b0;\n      }\n      \n    }\n  }\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 29723:
/*!***********************************************************************************************!*\
  !*** ./src/app/pages/driverApp/view-student-info/view-student-info.component.html?ngResource ***!
  \***********************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header collapse=\"fade\" [translucent]=\"true\" class=\"modal-header\">\n    <ion-toolbar>\n      <ion-title color=\"dark-color\" style=\"font-weight: bold;\">Student Info</ion-title>\n      <ion-buttons slot=\"end\">\n        <!-- <ion-button color=\"primary\" fill=\"solid\" (click)=\"close()\">\n          Close\n        </ion-button> -->\n      </ion-buttons>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content class=\"ion-padding\">\n  <div class=\"out-border\">\n    <div class=\"d-flex justify-content-between student-d\">\n        <span class=\"bold-black-text\">Student Name:  &nbsp;</span>\n        <span class=\"black-text\" [innerHTML]=\"studentPopup.studentName\"></span>\n    </div>\n    <div class=\"d-flex justify-content-between student-d\">\n      <span class=\"bold-black-text\">Class: &nbsp;</span>\n        <span class=\"black-text\" [innerHTML]=\"studentPopup.className\"></span>\n    </div>\n    <div class=\"d-flex justify-content-between student-d\">\n      <span class=\"bold-black-text\">Gender: &nbsp;</span>\n        <span class=\"black-text\" [innerHTML]=\"studentPopup.gender\"></span>\n    </div>\n    <div class=\"d-flex justify-content-between student-d mb-0\">\n      <span class=\"bold-black-text\">Contact Number: &nbsp;</span>\n        <span class=\"black-text\" [innerHTML]=\"studentPopup.emergencyContactNumber\"></span>\n    </div>\n  </div>\n      <div class=\"scan-details-btns\">\n      <button class=\"confirm\" fill=\"solid\" (click)=\"confirm()\">\n        Confirm\n      </button>\n      <button class=\"scan-more\" fill=\"solid\" (click)=\"ScanMore()\">\n        Scan More\n      </button>\n      <button class=\"cancel\" fill=\"solid\" (click)=\"close()\">\n        Cancel \n      </button>\n    </div>\n    \n     \n      \n    </ion-content>  \n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_driverApp_driver-app_module_ts.js.map