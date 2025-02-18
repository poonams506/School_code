(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_teacherApp_student_student_module_ts"],{

/***/ 18809:
/*!********************************************************************!*\
  !*** ./src/app/pages/teacherApp/student/student-routing.module.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StudentRoutingModule: () => (/* binding */ StudentRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _student_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./student.component */ 3821);




const routes = [{
  path: '',
  component: _student_component__WEBPACK_IMPORTED_MODULE_0__.StudentComponent
}];
let StudentRoutingModule = class StudentRoutingModule {};
StudentRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], StudentRoutingModule);


/***/ }),

/***/ 3821:
/*!***************************************************************!*\
  !*** ./src/app/pages/teacherApp/student/student.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StudentComponent: () => (/* binding */ StudentComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _student_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./student.component.html?ngResource */ 10707);
/* harmony import */ var _student_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./student.component.scss?ngResource */ 26443);
/* harmony import */ var _student_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_student_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/user-service */ 4286);









let StudentComponent = class StudentComponent {
  constructor(routerOutlet, modalController, commonMethod, userService, teacherProfileService) {
    this.routerOutlet = routerOutlet;
    this.modalController = modalController;
    this.commonMethod = commonMethod;
    this.userService = userService;
    this.teacherProfileService = teacherProfileService;
    this.dateExample = new Date().toISOString();
    this.content_loaded = false;
    this.classTeacherGradeDivisionList = [];
    this.studentList = [];
    this.isModalOpen = false;
  }
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Students');
    this.getUserDetails();
  }
  ngOnInit() {}
  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  getUserDetails() {
    this.userService.getUser().subscribe(result => {
      this.academicYearId = result.academicYearId;
      this.userId = result.userId;
      this.teacherId = result.userIdByRole;
      this.getClassTeacherGradeDivisionList();
    });
  }
  getClassTeacherGradeDivisionList() {
    this.teacherProfileService.classTeacherGradeDivisionList(this.teacherId).subscribe(result => {
      if (result.classTeacherGradeDivisionList.length > 0) {
        this.classTeacherGradeDivisionList = result.classTeacherGradeDivisionList;
        this.selectedClassTeacherGradeDivision = this.classTeacherGradeDivisionList[0];
        this.selectedClass = this.selectedClassTeacherGradeDivision.divisionId + ":" + this.selectedClassTeacherGradeDivision.gradeId;
        this.loadStudentList();
      } else {
        this.content_loaded = true;
      }
    });
  }
  onClassChange(e) {
    this.selectedClassTeacherGradeDivision = new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_3__.SchoolGradeDivisionMatrixDto();
    let value = e.detail.value;
    let valueArray = value.split(':');
    if (valueArray.length > 1) {
      this.selectedClassTeacherGradeDivision.divisionId = parseInt(valueArray[0]);
      this.selectedClassTeacherGradeDivision.gradeId = parseInt(valueArray[1]);
      this.loadStudentList();
    }
  }
  loadStudentList() {
    this.teacherProfileService.studentTeacherAppSelect(this.academicYearId, this.selectedClassTeacherGradeDivision.gradeId, this.selectedClassTeacherGradeDivision.divisionId).subscribe(result => {
      this.studentList = result.studentTeacherAppList.sort((a, b) => a.rollNumber?.localeCompare(b.rollNumber));
      this.content_loaded = true;
    });
  }
  setOpen(isOpen) {
    this.isModalOpen = isOpen;
  }
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonRouterOutlet
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController
  }, {
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_2__.CommonMethodService
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__.UserService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_3__.TeacherProfileServiceProxy
  }];
  static #_2 = this.propDecorators = {
    modal: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ViewChild,
      args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonModal]
    }]
  };
};
StudentComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
  selector: 'app-student',
  template: _student_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_student_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], StudentComponent);


/***/ }),

/***/ 36880:
/*!************************************************************!*\
  !*** ./src/app/pages/teacherApp/student/student.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StudentModule: () => (/* binding */ StudentModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _student_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./student-routing.module */ 18809);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _student_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./student.component */ 3821);







let StudentModule = class StudentModule {};
StudentModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _student_routing_module__WEBPACK_IMPORTED_MODULE_0__.StudentRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule],
  declarations: [_student_component__WEBPACK_IMPORTED_MODULE_1__.StudentComponent]
})], StudentModule);


/***/ }),

/***/ 26443:
/*!****************************************************************************!*\
  !*** ./src/app/pages/teacherApp/student/student.component.scss?ngResource ***!
  \****************************************************************************/
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
  --background: #623AA2 !important;
  background-color: #623AA2 !important;
  --padding-start: 5px;
  --inner-padding-end: 5px;
  align-items: flex-start;
  margin: 10px;
  border-radius: 6px;
}

.student-content {
  display: flex;
}
.student-content .title {
  font-size: 18px;
  font-weight: normal;
  width: 15%;
  line-height: 1.4;
  color: #fff;
}
.student-content .value {
  font-size: 13px;
  font-weight: 400;
  flex: 0 0 1;
  color: #fff;
}

.avatar-left {
  margin-right: 10px;
  width: 75px;
  margin-top: 10px;
}
.avatar-left ion-avatar {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}
.avatar-left .roll {
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  color: #fff;
}

ion-label {
  margin-top: 6px !important;
  margin-bottom: 3px !important;
  color: #fff;
}

ion-badge {
  margin-top: 10px;
  margin-left: 0;
  color: #fff;
}

ion-list, list-ios {
  background-color: #fff !important;
  --background: #fff !important;
  border-radius: 0;
  --border-radius: 0;
}

.select-text-size {
  flex: 1;
  min-width: 60px;
  font-size: inherit;
  text-overflow: ellipsis;
  white-space: inherit;
  overflow: hidden;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/teacherApp/student/student.component.scss"],"names":[],"mappings":"AAAA;EACI,6BAAA;AACJ;AAAQ;EACA,gCAAA;EACA,oCAAA;EACA,oBAAA;EACJ,wBAAA;EACA,uBAAA;EACA,YAAA;EACA,kBAAA;AAEJ;;AAGA;EACI,aAAA;AAAJ;AACI;EACI,eAAA;EACA,mBAAA;EACA,UAAA;EACA,gBAAA;EACA,WAAA;AACR;AACI;EACI,eAAA;EACA,gBAAA;EACA,WAAA;EACA,WAAA;AACR;;AAGA;EACI,kBAAA;EACA,WAAA;EACA,gBAAA;AAAJ;AACI;EACI,WAAA;EACA,YAAA;EACA,cAAA;AACR;AACI;EACI,eAAA;EACA,kBAAA;EACA,gBAAA;EACA,WAAA;AACR;;AAIA;EACI,0BAAA;EACA,6BAAA;EACA,WAAA;AADJ;;AAKA;EACI,gBAAA;EACA,cAAA;EACA,WAAA;AAFJ;;AAMA;EACI,iCAAA;EACA,6BAAA;EACA,gBAAA;EACA,kBAAA;AAHJ;;AAKA;EAEI,OAAA;EACA,eAAA;EACA,kBAAA;EACA,uBAAA;EACA,oBAAA;EACA,gBAAA;AAFJ","sourcesContent":[":host {\n    --min-height: 30px !important;\n        ion-item {\n        --background: #623AA2 !important;\n        background-color: #623AA2 !important;\n        --padding-start: 5px;\n    --inner-padding-end: 5px;\n    align-items: flex-start;\n    margin: 10px;\n    border-radius: 6px;\n    }\n}\n  \n\n.student-content {\n    display: flex;\n    .title {\n        font-size: 18px;\n        font-weight: normal;\n        width: 15%;\n        line-height: 1.4;\n        color: #fff;\n    }\n    .value {\n        font-size: 13px;\n        font-weight: 400;\n        flex: 0 0 1;\n        color: #fff;\n\n    }\n}\n.avatar-left {\n    margin-right: 10px;\n    width: 75px;\n    margin-top: 10px;\n    ion-avatar {\n        width: 40px;\n        height: 40px;\n        margin: 0 auto;\n    }\n    .roll {\n        font-size: 12px;\n        text-align: center;\n        margin-top: 10px;\n        color: #fff;\n\n    }\n}\n\nion-label {\n    margin-top: 6px !important;\n    margin-bottom: 3px !important;\n    color: #fff;\n\n}\n\nion-badge {\n    margin-top: 10px;\n    margin-left: 0;\n    color: #fff;\n\n}\n\nion-list, list-ios {\n    background-color: #fff !important;\n    --background: #fff !important;\n    border-radius: 0;\n    --border-radius: 0;\n}\n.select-text-size {\n    -ms-flex: 1;\n    flex: 1;\n    min-width: 60px;\n    font-size: inherit;\n    text-overflow: ellipsis;\n    white-space: inherit;\n    overflow: hidden;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 10707:
/*!****************************************************************************!*\
  !*** ./src/app/pages/teacherApp/student/student.component.html?ngResource ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-content class=\"light-content\" [fullscreen]=\"true\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"handleRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <ng-container *ngIf=\"!content_loaded\">\n    <ion-list-header class=\"ion-list-header-small\">\n      <ion-label><ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text></ion-label>\n      <ion-note color=\"tertiary\" class=\"ion-note-small\">\n        <ion-skeleton-text animated style=\"width: 40px\"></ion-skeleton-text>\n      </ion-note>\n    </ion-list-header>\n\n    <ion-list color=\"light\" class=\"list-custom animate__animated animate__fadeIn\" lines=\"full\">\n      <ion-item color=\"light\" button detail=\"false\" *ngFor=\"let i of [].constructor(12)\">\n        <ion-avatar slot=\"start\" class=\"ion-avatar-default-icon\">\n          <ion-skeleton-text animated></ion-skeleton-text>\n        </ion-avatar>\n        <ion-label>\n          <h3>\n            <ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text>\n          </h3>\n          <p>\n            <ion-skeleton-text animated style=\"width: 75%\"></ion-skeleton-text>\n          </p>\n        </ion-label>\n        <ion-skeleton-text slot=\"end\" animated style=\"width: 15%\"></ion-skeleton-text>\n      </ion-item>\n    </ion-list>\n  </ng-container>\n\n    <ng-container *ngIf=\"content_loaded\">\n      <div class=\"date-header mt-3\">\n        <div class=\"form-control-wrapper d-flex align-items-center\">\n          <label for=\"classSelect\" class=\"me-2\"><strong>Select Class</strong> </label>\n          <div class=\"custom-input-css without-label custom-width\">\n            <ion-select class=\"custom-select-css\" placeholder=\"Select Class\" (ionChange)=\"onClassChange($event)\"\n              [(ngModel)]=\"selectedClass\" >\n              <ion-select-option *ngFor=\"let classTeacherGradeDivision of classTeacherGradeDivisionList\"\n                [value]=\"classTeacherGradeDivision.divisionId+':'+classTeacherGradeDivision.gradeId\">\n                 {{classTeacherGradeDivision.className}}\n              </ion-select-option>\n            </ion-select>\n          </div>  \n        </div>\n        \n\n      </div>\n\n      <ion-list class=\"list-custom animate__animated animate__fadeIn\" lines=\"full\">\n        <ion-item button routerLink=\"detail\" detail=\"false\" *ngFor=\"let student of studentList\">\n          <div class=\"avatar-left ion-avatar-default-icon\">\n            <ion-avatar slot=\"start\">\n              <img alt=\"Silhouette of a person's head\" src=\"{{student.profileImageURL?student.profileImageURL:'https://ionicframework.com/docs/img/demos/avatar.svg'}}\" />\n            </ion-avatar>\n            <div class=\"roll\">{{student.rollNumber}}</div>\n          </div>\n          <ion-label>\n            <div class=\"student-content\">\n              <div class=\"title\"><ion-icon name=\"person\"></ion-icon></div>\n              <div class=\"value\">{{student.studentName}}</div>\n            </div>\n            <div class=\"student-content\">\n              <div class=\"title\"><ion-icon name=\"people\"></ion-icon></div>\n              <div class=\"value\">{{student.gender =='M'?'Male':'Female'}}</div>\n            </div>\n            <div class=\"student-content\">\n              <div class=\"title\"><ion-icon name=\"call\"></ion-icon></div>\n              <div class=\"value\">{{student.emergencyContactNumber}}</div>\n            </div>\n          </ion-label>\n        </ion-item>\n        <div *ngIf=\"!studentList || studentList.length==0\" class=\"text-center\">No Student Found</div>\n\n      \n      </ion-list>\n\n    </ng-container>\n\n</ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_teacherApp_student_student_module_ts.js.map