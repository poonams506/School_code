(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_teacherApp_teacher-dashboard_teacher-dashboard_module_ts"],{

/***/ 52945:
/*!****************************************************************************************!*\
  !*** ./src/app/pages/teacherApp/teacher-dashboard/teacher-dashboard-routing.module.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TeacherDashboardRoutingModule: () => (/* binding */ TeacherDashboardRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _teacher_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./teacher-dashboard.component */ 60021);




const routes = [{
  path: '',
  component: _teacher_dashboard_component__WEBPACK_IMPORTED_MODULE_0__.TeacherDashboardComponent
}];
let TeacherDashboardRoutingModule = class TeacherDashboardRoutingModule {};
TeacherDashboardRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], TeacherDashboardRoutingModule);


/***/ }),

/***/ 60021:
/*!***********************************************************************************!*\
  !*** ./src/app/pages/teacherApp/teacher-dashboard/teacher-dashboard.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TeacherDashboardComponent: () => (/* binding */ TeacherDashboardComponent)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _teacher_dashboard_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./teacher-dashboard.component.html?ngResource */ 73283);
/* harmony import */ var _teacher_dashboard_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./teacher-dashboard.component.scss?ngResource */ 60275);
/* harmony import */ var _teacher_dashboard_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_teacher_dashboard_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! highcharts */ 77859);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var highcharts_highcharts_3d__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! highcharts/highcharts-3d */ 45467);
/* harmony import */ var highcharts_highcharts_3d__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(highcharts_highcharts_3d__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic/angular */ 78205);
/* harmony import */ var _view_teacher_school_event_detail_view_teacher_school_event_detail_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./view-teacher-school-event-detail/view-teacher-school-event-detail.component */ 64055);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/environments/environment */ 45312);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @capacitor/core */ 14070);
/* harmony import */ var src_app_services_fcm_fcm_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/fcm/fcm.service */ 93881);







highcharts_highcharts_3d__WEBPACK_IMPORTED_MODULE_4___default()(highcharts__WEBPACK_IMPORTED_MODULE_3__);









let TeacherDashboardComponent = class TeacherDashboardComponent {
  constructor(commonMethod, userService, teacherProfileService, router, modalController, platform, schoolService, fcmService) {
    this.commonMethod = commonMethod;
    this.userService = userService;
    this.teacherProfileService = teacherProfileService;
    this.router = router;
    this.modalController = modalController;
    this.platform = platform;
    this.schoolService = schoolService;
    this.fcmService = fcmService;
    this.presentingElement = null;
    this.dateExample = new Date().toISOString();
    this.content_loaded = false;
    this.showMissingAttendanceSection = false;
    this.schoolEventList = [];
    this.teacherLectureList = [];
    this.classAttendanceMissingList = [];
    this.isAppAccessible = true;
    this.months = [];
    this.monthList = [{
      id: "1",
      name: 'January'
    }, {
      id: "2",
      name: 'February'
    }, {
      id: "3",
      name: 'March'
    }, {
      id: "4",
      name: 'April'
    }, {
      id: "5",
      name: 'May'
    }, {
      id: "6",
      name: 'June'
    }, {
      id: "7",
      name: 'July'
    }, {
      id: "8",
      name: 'August'
    }, {
      id: "9",
      name: 'September'
    }, {
      id: "10",
      name: 'October'
    }, {
      id: "11",
      name: 'November'
    }, {
      id: "12",
      name: 'December'
    }];
    this.isModalOpen = false;
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
    //this.getUserDetails();
    // this.loadUpcomingEvents();
    this.GetSchoolBasicDetails();
  }
  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  getUserDetails() {
    this.userService.getUser().subscribe(result => {
      this.academicYearId = result.academicYearId;
      this.teacherId = result.userIdByRole;
      this.GetSchoolBasicDetails();
      this.getClassTeacherGradeDivisionList();
      this.loadTeacherUpcomingLectures();
      this.currentMonth = (new Date().getMonth() + 1).toString();
      // this.monthId=this.currentMonth;
      //this.loadMonthMissingAttendanceList();
    });
  }
  loadInitialData() {
    this.GetSchoolBasicDetails();
    this.getClassTeacherGradeDivisionList();
    this.loadTeacherUpcomingLectures();
  }
  onMonthChange(e) {
    this.loadMonthMissingAttendanceList();
  }
  getClassTeacherGradeDivisionList() {
    this.teacherProfileService.classTeacherGradeDivisionList(this.teacherId).subscribe(result => {
      this.showMissingAttendanceSection = result.classTeacherGradeDivisionList.length > 0;
      this.content_loaded = true;
    });
  }
  loadTeacherUpcomingLectures() {
    let dayNo = new Date().getDay() + 1;
    this.teacherProfileService.teacherOneDayLectureSelect(this.teacherId, dayNo).subscribe(result => {
      this.teacherLectureList = result.teacherOneDayLectureList;
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
  loadMissingAttendanceList(month, year) {
    this.teacherProfileService.classMissingAttendanceReport(this.teacherId, month, year).subscribe(result => {
      this.classAttendanceMissingList = result.classAttendanceMissingList;
      console.log(result);
      this.content_loaded = true;
    });
  }
  loadMonthMissingAttendanceList() {
    if (this.selectedMonth) {
      if (this.selectedMonth.length > 1) {
        this.loadMissingAttendanceList(parseInt(this.selectedMonth.split(":")[0]), parseInt(this.selectedMonth.split(":")[1]));
      }
    } else {
      let currentDate = new Date();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      this.loadMissingAttendanceList(month, year);
    }
  }
  loadUpcomingEvents() {
    this.teacherProfileService.schoolMonthEvent().subscribe(result => {
      this.schoolEventList = result.schoolMonthEventList;
      this.content_loaded = true;
    });
  }
  getEventTotalTime(schoolEvent) {
    if (schoolEvent.endTime) {
      return schoolEvent.endTime.diff(schoolEvent.startTime, 'hours') + ' hrs';
    } else {
      return '';
    }
  }
  setOpen(isOpen) {
    this.isModalOpen = isOpen;
  }
  goToAttendancePage(classAttendanceMissing) {
    this.commonMethod.setAttendanceDate(classAttendanceMissing);
    this.router.navigate(['/teacher-app/teacherTab/attendance']);
  }
  ionViewDidEnter() {
    this.initializeApp();
    this.commonMethod.setHeaderTitle('Dashboard');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    this.selectedMonth = currentDate.getMonth() + 1 + ":" + year;
    setTimeout(() => {
      this.getUserDetails();
      this.loadMonthMissingAttendanceList();
      this.loadUpcomingEvents();
    }, 2000);
    this.currentMonth = (new Date().getMonth() + 1).toString();
    // this.monthId = this.currentMonth 
  }
  upcomingEventSort(first, second) {
    return first.startDate < second.startDate;
  }
  openSchoolEventDetail(selectedEventId) {
    var _this3 = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const selectedEvent = _this3.schoolEventList.find(event => event.schoolEventId === selectedEventId) || null;
      const modal = yield _this3.modalController.create({
        component: _view_teacher_school_event_detail_view_teacher_school_event_detail_component__WEBPACK_IMPORTED_MODULE_8__.ViewTeacherSchoolEventDetailComponent,
        componentProps: {
          selectedEvent: selectedEvent
        }
      });
      yield modal.present();
    })();
  }
  // getMonthName(monthId: string): string {
  //   debugger
  //   const month=this.monthList.find(m=>m.id==monthId);
  //   return(month.name);
  // }
  refreshPage() {
    window.location.reload();
  }
  static #_ = this.ctorParameters = () => [{
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_5__.CommonMethodService
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_7__.UserService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__.TeacherProfileServiceProxy
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
};
TeacherDashboardComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_16__.Component)({
  selector: 'app-teacher-dashboard',
  template: _teacher_dashboard_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_teacher_dashboard_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], TeacherDashboardComponent);


/***/ }),

/***/ 20136:
/*!********************************************************************************!*\
  !*** ./src/app/pages/teacherApp/teacher-dashboard/teacher-dashboard.module.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TeacherDashboardModule: () => (/* binding */ TeacherDashboardModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _teacher_dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./teacher-dashboard-routing.module */ 52945);
/* harmony import */ var _teacher_dashboard_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./teacher-dashboard.component */ 60021);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-charts */ 16045);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! highcharts-angular */ 14215);
/* harmony import */ var _view_teacher_school_event_detail_view_teacher_school_event_detail_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view-teacher-school-event-detail/view-teacher-school-event-detail.component */ 64055);










let TeacherDashboardModule = class TeacherDashboardModule {};
TeacherDashboardModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _teacher_dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__.TeacherDashboardRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, ng2_charts__WEBPACK_IMPORTED_MODULE_8__.NgChartsModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_9__.HighchartsChartModule],
  declarations: [_teacher_dashboard_component__WEBPACK_IMPORTED_MODULE_1__.TeacherDashboardComponent, _view_teacher_school_event_detail_view_teacher_school_event_detail_component__WEBPACK_IMPORTED_MODULE_2__.ViewTeacherSchoolEventDetailComponent]
})], TeacherDashboardModule);


/***/ }),

/***/ 64055:
/*!***********************************************************************************************************************************!*\
  !*** ./src/app/pages/teacherApp/teacher-dashboard/view-teacher-school-event-detail/view-teacher-school-event-detail.component.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewTeacherSchoolEventDetailComponent: () => (/* binding */ ViewTeacherSchoolEventDetailComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _view_teacher_school_event_detail_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-teacher-school-event-detail.component.html?ngResource */ 23953);
/* harmony import */ var _view_teacher_school_event_detail_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view-teacher-school-event-detail.component.css?ngResource */ 28708);
/* harmony import */ var _view_teacher_school_event_detail_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_view_teacher_school_event_detail_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 37401);





let ViewTeacherSchoolEventDetailComponent = class ViewTeacherSchoolEventDetailComponent {
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
ViewTeacherSchoolEventDetailComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  selector: 'app-view-teacher-school-event-detail',
  template: _view_teacher_school_event_detail_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_view_teacher_school_event_detail_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], ViewTeacherSchoolEventDetailComponent);


/***/ }),

/***/ 28708:
/*!***********************************************************************************************************************************************!*\
  !*** ./src/app/pages/teacherApp/teacher-dashboard/view-teacher-school-event-detail/view-teacher-school-event-detail.component.css?ngResource ***!
  \***********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:host {
    ion-card {
        box-shadow: none !important;
    }

}

ion-list {
    padding-top: 0;
    background-color: #fff !important;
    --background: #fff !important;
    border-radius: 0;
    --border-radius: 0;
    ion-card-subtitle {
        font-size: 18px;
    }
    &.notice-card {
        ion-item {
            border-bottom: 0;
            --background: transparent;
            border-radius:4px;
            margin-bottom: 5px;
            align-items: flex-start;

            ion-avatar {
                span {
                    color: green;
                }
            }
            &.admin {
                background-color: #badee2;
            }
            &.teacher {
                background-color: #eac0d4;
                ion-avatar {
                    span {
                        color: red;
                    }
                }
            }
            &.principal {
                background-color: #eae9c0;
                ion-avatar {
                    span {
                        color: #da9513;
                    }
                }
            }
            &:last-child {
                border-bottom: 0 !important;
            }
            ion-avatar {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #fff;
                width: 45px;
                height: 45px;
                margin-right: 5px;
                span {
                    font-size: 20px;
                    font-weight: bold;
                }
            }
            ion-label {
                font-size: 13px;
                font-weight: 400;
            }

            &.important {
               
                background: blue;
              
                --background: red;
              }
              
              @media (prefers-color-scheme: dark) {
                &.important {
                  --background: green;
                }
              }
        }
        }
}


.download {
margin-top: 20px;
   a {
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
    ion-icon {
        font-size: 24px;
    }
   }
}


.modal-text-header {
    ion-card-subtitle {
        font-size: 16px;
        ion-text {
            font-size: 14px;
            display: block;
            color: #000;
        }
    }
}

.uploaded-file-text {
    margin: 10px 0;
    font-size: 12px;
    border: 0;
    display: flex;
    .file-thumb {
        width: 64px;
        height: 64px;
        border: 1px solid #ccc;
        padding: 5px;
        border-radius: 4px;
        display: flex;
        position: relative;
        margin-right: 10px;
        img {
            width: 100%;
        }
      
    }

}


.bold-black-text {
    font-weight: bold;
    color: black;
}
.thumbnail-icon {
    width: 60px;
    height: 60px;
  }`, "",{"version":3,"sources":["webpack://./src/app/pages/teacherApp/teacher-dashboard/view-teacher-school-event-detail/view-teacher-school-event-detail.component.css"],"names":[],"mappings":"AAAA;IACI;QACI,2BAA2B;IAC/B;;AAEJ;;AAEA;IACI,cAAc;IACd,iCAAiC;IACjC,6BAA6B;IAC7B,gBAAgB;IAChB,kBAAkB;IAClB;QACI,eAAe;IACnB;IACA;QACI;YACI,gBAAgB;YAChB,yBAAyB;YACzB,iBAAiB;YACjB,kBAAkB;YAClB,uBAAuB;;YAEvB;gBACI;oBACI,YAAY;gBAChB;YACJ;YACA;gBACI,yBAAyB;YAC7B;YACA;gBACI,yBAAyB;gBACzB;oBACI;wBACI,UAAU;oBACd;gBACJ;YACJ;YACA;gBACI,yBAAyB;gBACzB;oBACI;wBACI,cAAc;oBAClB;gBACJ;YACJ;YACA;gBACI,2BAA2B;YAC/B;YACA;gBACI,aAAa;gBACb,uBAAuB;gBACvB,mBAAmB;gBACnB,sBAAsB;gBACtB,WAAW;gBACX,YAAY;gBACZ,iBAAiB;gBACjB;oBACI,eAAe;oBACf,iBAAiB;gBACrB;YACJ;YACA;gBACI,eAAe;gBACf,gBAAgB;YACpB;;YAEA;;gBAEI,gBAAgB;;gBAEhB,iBAAiB;cACnB;;cAEA;gBACE;kBACE,mBAAmB;gBACrB;cACF;QACN;QACA;AACR;;;AAGA;AACA,gBAAgB;GACb;IACC,qBAAqB;IACrB,sBAAsB;IACtB,kBAAkB;IAClB,uCAAuC;IACvC,WAAW;IACX,aAAa;IACb,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,eAAe;IACf;QACI,eAAe;IACnB;GACD;AACH;;;AAGA;IACI;QACI,eAAe;QACf;YACI,eAAe;YACf,cAAc;YACd,WAAW;QACf;IACJ;AACJ;;AAEA;IACI,cAAc;IACd,eAAe;IACf,SAAS;IACT,aAAa;IACb;QACI,WAAW;QACX,YAAY;QACZ,sBAAsB;QACtB,YAAY;QACZ,kBAAkB;QAClB,aAAa;QACb,kBAAkB;QAClB,kBAAkB;QAClB;YACI,WAAW;QACf;;IAEJ;;AAEJ;;;AAGA;IACI,iBAAiB;IACjB,YAAY;AAChB;AACA;IACI,WAAW;IACX,YAAY;EACd","sourcesContent":[":host {\n    ion-card {\n        box-shadow: none !important;\n    }\n\n}\n\nion-list {\n    padding-top: 0;\n    background-color: #fff !important;\n    --background: #fff !important;\n    border-radius: 0;\n    --border-radius: 0;\n    ion-card-subtitle {\n        font-size: 18px;\n    }\n    &.notice-card {\n        ion-item {\n            border-bottom: 0;\n            --background: transparent;\n            border-radius:4px;\n            margin-bottom: 5px;\n            align-items: flex-start;\n\n            ion-avatar {\n                span {\n                    color: green;\n                }\n            }\n            &.admin {\n                background-color: #badee2;\n            }\n            &.teacher {\n                background-color: #eac0d4;\n                ion-avatar {\n                    span {\n                        color: red;\n                    }\n                }\n            }\n            &.principal {\n                background-color: #eae9c0;\n                ion-avatar {\n                    span {\n                        color: #da9513;\n                    }\n                }\n            }\n            &:last-child {\n                border-bottom: 0 !important;\n            }\n            ion-avatar {\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                background-color: #fff;\n                width: 45px;\n                height: 45px;\n                margin-right: 5px;\n                span {\n                    font-size: 20px;\n                    font-weight: bold;\n                }\n            }\n            ion-label {\n                font-size: 13px;\n                font-weight: 400;\n            }\n\n            &.important {\n               \n                background: blue;\n              \n                --background: red;\n              }\n              \n              @media (prefers-color-scheme: dark) {\n                &.important {\n                  --background: green;\n                }\n              }\n        }\n        }\n}\n\n\n.download {\nmargin-top: 20px;\n   a {\n    text-decoration: none;\n    border: 1px solid #000;\n    border-radius: 4px;\n    background-color: var(--ion-color-dark);\n    color: #fff;\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 16px;\n    ion-icon {\n        font-size: 24px;\n    }\n   }\n}\n\n\n.modal-text-header {\n    ion-card-subtitle {\n        font-size: 16px;\n        ion-text {\n            font-size: 14px;\n            display: block;\n            color: #000;\n        }\n    }\n}\n\n.uploaded-file-text {\n    margin: 10px 0;\n    font-size: 12px;\n    border: 0;\n    display: flex;\n    .file-thumb {\n        width: 64px;\n        height: 64px;\n        border: 1px solid #ccc;\n        padding: 5px;\n        border-radius: 4px;\n        display: flex;\n        position: relative;\n        margin-right: 10px;\n        img {\n            width: 100%;\n        }\n      \n    }\n\n}\n\n\n.bold-black-text {\n    font-weight: bold;\n    color: black;\n}\n.thumbnail-icon {\n    width: 60px;\n    height: 60px;\n  }"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 60275:
/*!************************************************************************************************!*\
  !*** ./src/app/pages/teacherApp/teacher-dashboard/teacher-dashboard.component.scss?ngResource ***!
  \************************************************************************************************/
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

ion-list, .list-ios {
  padding-top: 0;
  background-color: #fff !important;
  padding: 6px 0;
  margin: 0 12px;
}
ion-list ion-card-subtitle, .list-ios ion-card-subtitle {
  font-size: 18px;
}
ion-list.notice-card ion-item, .list-ios.notice-card ion-item {
  border-bottom: 0;
  --background: #fff;
  background-color: #fff;
  border-radius: 4px;
  margin: 0 5px 10px;
  align-items: flex-start;
  box-shadow: 0px 0px 3px 1px rgba(204, 204, 204, 0.7098039216);
}
ion-list.notice-card ion-item:last-child, .list-ios.notice-card ion-item:last-child {
  border-bottom: 0 !important;
}
ion-list.notice-card ion-item ion-card-subtitle, .list-ios.notice-card ion-item ion-card-subtitle {
  font-size: 14px;
  display: block;
  width: 100%;
  color: #ccc;
}
ion-list.notice-card ion-item ion-card-subtitle ion-text, .list-ios.notice-card ion-item ion-card-subtitle ion-text {
  color: #000;
}
ion-list.notice-card ion-item ion-avatar, .list-ios.notice-card ion-item ion-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 45px;
  height: 45px;
  margin-right: 5px;
}
ion-list.notice-card ion-item ion-avatar span, .list-ios.notice-card ion-item ion-avatar span {
  font-size: 20px;
  font-weight: bold;
}
ion-list.notice-card ion-item ion-label, .list-ios.notice-card ion-item ion-label {
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

ion-modal.homework-modal ion-header ion-toolbar ion-title.main-title {
  color: #fff;
  --color:#fff;
  font-size: 14px;
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
  width: 88px !important;
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

.bold-black-text {
  font-weight: bold;
  color: black;
  margin-right: 5px;
}

.to {
  display: block;
  text-align: center;
  color: #000;
  text-transform: capitalize;
  font-size: 12px;
  width: 50px;
}

.redbg {
  background-color: #EECE13 !important;
  color: crimson;
  font-size: 16px;
}

.text-start {
  text-align: left;
  font-size: 0.9em;
  color: #666;
  margin: 5px 0;
}

.select-text-size {
  flex: 1;
  min-width: 80px;
  font-size: inherit;
  text-overflow: ellipsis;
  white-space: inherit;
  overflow: hidden;
}

.redbg2 {
  background-color: #EECE13 !important;
  color: crimson;
  font-size: 15px;
  line-height: 1.3;
}
.redbg2 span {
  color: crimson;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/teacherApp/teacher-dashboard/teacher-dashboard.component.scss"],"names":[],"mappings":"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","sourcesContent":[":host {\n    --min-height: 30px !important;\n        ion-item {\n        --background: #fff;\n        background-color: #fff;\n    }\n    .date-header {\n        padding: 0 10px;\n    }\n    ion-card {\n        box-shadow: 0px 0px 0px 0px #ccccccb5;\n        display: flex;\n        align-items: flex-start;\n        border-radius: 4px;\n        margin: 2px;\n        background-color: transparent;\n\n        ion-card-header {\n            padding: 5px;\n            padding-right: 0;\n            padding-bottom: 0;\n            width: 135px;\n\n            ion-card-subtitle {\n                color: #8590b9;\n                font-size: 13px;\n                font-weight: 500;\n                line-height: 1.3;\n                margin-bottom: 0;\n\n                &.class {\n                    color: #110a3b;\n                    font-size: 14px;\n                    margin-top: 0;\n                }\n\n                .to {\n                    display: block;\n                    text-align: center;\n                    color: #000;\n                    text-transform: capitalize;\n                    font-size: 12px;\n                    width: 50px;\n                }\n            }\n        }\n\n        ion-card-content {\n            padding: 0 10px;\n            border-left: 1px solid #bdc8d2;\n            margin-left: 5px;\n            margin-top: 5px;\n            margin-bottom: 5px;\n            line-height: 1.4;\n            font-size: 11px;\n            color: #828891;\n            width: 100%;\n            min-height: 39px;\n            display: flex;\n\n            ion-title {\n                font-size: 15px;\n                font-weight: 500;\n                margin-bottom: 5px;\n                padding: 0;\n                color: #000;\n                background-color: #F97794;\n                padding: 10px;\n                border-radius: 8px;\n            }\n        }\n\n        &.lecture-card {\n            flex-wrap: wrap;\n            margin-bottom: 10px;\n            padding: 5px;\n            border: 1px solid #bdc8d2;\n\n            ion-card-subtitle {\n                flex: 0 0 100%;\n                font-size: 14px;\n                color: #222222;\n            }\n\n            ion-card-header {\n                width: 80px;\n            }\n\n            ion-card-content {\n                flex: 1;\n            }\n        }\n    }\n\n    ion-card-subtitle.title-footer {\n        font-size: 12px;\n        padding: 0px 0px;\n        text-align: right;\n        color: #000;\n        display: flex;\n        margin-bottom: 7px;\n        ion-badge {\n            margin-right: 5px;\n            border-radius: 10px;\n            width: 16px;\n            height: 16px;\n            font-size: 10px;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            --background: #110a3b;\n            background-color: #110a3b;\n            color: #fff;\n        }\n    }\n}\n\nion-list, .list-ios {\n    padding-top: 0;\n    background-color: #fff !important;\n    padding: 6px 0;\n    margin: 0 12px;\n    ion-card-subtitle {\n        font-size: 18px;\n    }\n    &.notice-card {\n        ion-item {\n            border-bottom: 0;\n            --background: #fff;\n            background-color: #fff;\n            border-radius: 4px;\n            margin: 0 5px 10px;\n\n            align-items: flex-start;\n            box-shadow: 0px 0px 3px 1px #ccccccb5;\n            &:last-child {\n                border-bottom: 0 !important;\n            }\n\n            ion-card-subtitle {\n                font-size: 14px;\n                display: block;\n                width: 100%;\n                color: #ccc;\n                ion-text {\n                    color: #000;\n                }\n            }\n            ion-avatar {\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                background-color: #fff;\n                width: 45px;\n                height: 45px;\n                margin-right: 5px;\n                span {\n                    font-size: 20px;\n                    font-weight: bold;\n                }\n            }\n            ion-label {\n                font-size: 13px;\n                font-weight: 400;\n            }\n        }\n    }\n}\n\n.download {\n    margin-top: 20px;\n    a {\n        text-decoration: none;\n        border: 1px solid #000;\n        border-radius: 4px;\n        background-color: #110a3b;\n        color: #fff;\n        padding: 10px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 16px;\n        ion-icon {\n            font-size: 24px;\n        }\n    }\n}\n\n.modal-text-header {\n    ion-card-subtitle {\n        font-size: 16px;\n        ion-text {\n            font-size: 14px;\n            display: block;\n            color: #000;\n        }\n    }\n}\n\n\nion-modal.homework-modal {\n    ion-header {\n      ion-toolbar {\n          ion-title.main-title {\n              color: #fff;\n              --color:#fff;\n              font-size: 14px;\n          }\n      }\n    }\n  }\n\n  ion-fab-button {\n    width: 22px !important;\n    height: 22px !important;\n    margin-right: 7px;\n    --background: #b7f399;\n    --background-activated: #87d361;\n    --background-hover: #a3e681;\n    --border-radius: 15px;\n    --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);\n    --color: black;\n    ion-icon {\n        font-size: 13px;\n    }\n  }\n\n  .head-4 {\n    align-items: center;\n    display: flex;\n    justify-content: space-between;\n    padding: 10px 15px;\n\n    h4 {\n        font-size: 16px;\n        font-weight: 500;\n        color: #000;\n      }\n    \n      h5 {\n        font-size: 12px;\n        font-weight: 400;\n        color: #000;\n      }\n  }\n\n  h6 {\n    font-size: 13px;\n    font-weight: 500;\n    padding: 7px 15px;\ncolor: #623AA2 !important;\nbackground: #F3EBFF;\nborder: 1px solid #623AA2;\nmargin: 0px 15px 5px;\nborder-radius: 4px;\n  }\n\n\n.no-bg {\n    background-color: transparent !important;\n    padding: 0;\n    margin: 0 0px 10px;\n    ion-card {\n        border-bottom: 1px solid #ccc !important;\n        border-radius: 0 !important;\n        padding: 0 10px;\n        margin: 0;\n    }\n    ion-card-header {\n        width: 88px !important;\n    }\n    // span {\n    //     font-size: 13px;\n    //     font-weight: 400;\n    //     background-color: #EECE13 !important;\n    //     padding: 10px;\n    //     line-height: 1.4;\n    //     color: #000;\n    //     width: 100%;\n    //     border-radius: 8px;\n    // }\n    .yellow-span {\n        font-size: 13px;\n        font-weight: 400;\n        background-color: #EECE13 !important;\n        padding: 5px;\n        line-height: 1.4;\n        color: #000;\n        width: 100%;\n        border-radius: 8px;\n\n        span {\n            display: block;\n        }\n    }\n}\n \n  hr {\n    margin: 0;\n    //opacity: 0.1;\n    background: #bdc8d2;\n  }\n\n.mark-btn {\n    background-color: #BC89E0;\n    font-size: 14px;\n    font-weight: 500;\n    margin-bottom: 5px;\n    padding: 0;\n    color: #000;\n    padding: 6px 15px;\n    border-radius: 38px;\n    text-decoration: none;\n    line-height: 1.7;\n}\n.bold-black-text {\n    font-weight: bold;\n    color: black;\n    margin-right: 5px; \n}\n.to {\n    display: block;\n    text-align: center;\n    color: #000;\n    text-transform: capitalize;\n    font-size: 12px;\n    width: 50px;\n}\n.redbg {\n    background-color: #EECE13 !important;\n    color: crimson;\n    font-size: 16px;\n}\n.text-start {\n    text-align: left;\n    font-size: 0.9em;\n    color: #666;\n    margin: 5px 0;\n  }\n\n\n  .select-text-size {\n    -ms-flex: 1;\n    flex: 1;\n    min-width:  80px;\n    font-size: inherit;\n    text-overflow: ellipsis;\n    white-space: inherit;\n    overflow: hidden;\n}\n\n.redbg2 {\n    background-color: #EECE13 !important;\n    color: crimson;\n    font-size: 15px;\n    line-height: 1.3;\n    span {\n        color: crimson;\n    }\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 73283:
/*!************************************************************************************************!*\
  !*** ./src/app/pages/teacherApp/teacher-dashboard/teacher-dashboard.component.html?ngResource ***!
  \************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-content class=\"light-content\" [fullscreen]=\"true\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"handleRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <ng-container *ngIf=\"!content_loaded  && isAppAccessible\">\n    <ion-list-header class=\"ion-list-header-small\">\n      <ion-label><ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text></ion-label>\n      <ion-note color=\"tertiary\" class=\"ion-note-small\">\n        <ion-skeleton-text animated style=\"width: 40px\"></ion-skeleton-text>\n      </ion-note>\n    </ion-list-header>\n\n\n    <ion-list class=\"list-custom animate__animated animate__fadeIn\" lines=\"full\">\n      <ion-item color=\"light\" button detail=\"false\" *ngFor=\"let i of [].constructor(12)\">\n        <ion-avatar slot=\"start\" class=\"ion-avatar-default-icon\">\n          <ion-skeleton-text animated></ion-skeleton-text>\n        </ion-avatar>\n        <ion-label>\n          <h3>\n            <ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text>\n          </h3>\n          <p>\n            <ion-skeleton-text animated style=\"width: 75%\"></ion-skeleton-text>\n          </p>\n        </ion-label>\n        <ion-skeleton-text slot=\"end\" animated style=\"width: 15%\"></ion-skeleton-text>\n      </ion-item>\n    </ion-list>\n  </ng-container>\n  <ng-container *ngIf=\"content_loaded  && isAppAccessible\">\n    <ion-card-header class=\"date-header mt-2\">\n      <div class=\"form-control-wrapper\">\n        <div class=\"custom-input-css without-label custom-width\">\n        </div>\n      </div>\n    </ion-card-header>\n    <div class=\"head-4\">\n      <h4>Today's Lectures</h4>\n      <h5>Today</h5>\n    </div>\n    <ion-list>\n      <ion-card class=\"white-bg-color\" *ngFor=\"let teacherLecture of teacherLectureList\" (click)=\"setOpen(true)\">\n        <ion-card-header>\n          <ion-card-subtitle>{{teacherLecture.startTime}} <b>To</b> {{teacherLecture.endTime}}</ion-card-subtitle>\n           </ion-card-header>\n\n        <ion-card-content>\n          <ion-title slot=\"start\" class=\"text-start\">\n            {{teacherLecture.gradeName}} - {{teacherLecture.divisionName}} ,\n            {{teacherLecture.subjectName}} \n          </ion-title>\n        \n        </ion-card-content>\n      </ion-card>\n      <ion-card-header *ngIf=\"teacherLectureList?.length === 0\" class=\"redbg font16 px-3\"><i class=\"bi bi-exclamation-triangle\"></i>\n        <span class=\"ms-2\" translate>There is no Lectures for Today.</span>\n      </ion-card-header>\n    </ion-list>\n\n    <hr />\n\n    <hr />\n\n    <div class=\"head-4 mt-2\">\n      <h4>Upcoming Events</h4>\n      <h5>Next 30 Days</h5>\n    </div>\n    <div *ngIf=\"schoolEventList?.length === 0\">\n      <ion-card-header class=\"redbg font16 px-3\">\n        <i class=\"bi bi-exclamation-triangle\"></i>\n        <span class=\"ms-2\" translate>There is no upcoming events in next 30 days.</span>\n      </ion-card-header>\n    </div>\n\n    <div *ngFor=\"let schoolEvent of schoolEventList\">\n      <h6>{{ schoolEvent.startDate?.format('DD MMM yyyy') }}</h6>\n      <ion-list class=\"no-bg\">\n        <ion-card class=\"white-bg-color\"  (click)=\"openSchoolEventDetail( schoolEvent.schoolEventId)\">\n          <ion-card-header>\n            <ion-card-subtitle *ngIf=\"schoolEvent && schoolEvent.startTime && schoolEvent.endTime\">\n              {{ schoolEvent.startTime?.format('hh:mm a') }} \n              <b>To</b>\n              {{ schoolEvent.endTime?.format('hh:mm a') }}\n            </ion-card-subtitle>\n          </ion-card-header>\n          <ion-card-content>\n            <span class=\"text-start yellow-span\">\n              <span><b>Event Title:</b> {{schoolEvent.eventTitle}}</span> \n              <span *ngIf=\"schoolEvent.eventTitle && schoolEvent.eventVenue\"><b>Event Venue:</b> {{ schoolEvent.eventVenue }}</span>\n            </span>\n          </ion-card-content>\n        </ion-card>\n      </ion-list>\n      \n    </div>\n    \n    <div class=\"head-4 mt-2\" *ngIf=\"showMissingAttendanceSection\">\n      <h4>Missing Attendance</h4>\n    </div>\n    <div class=\"date-header mt-0\">\n      <div class=\"form-control-wrapper d-flex align-items-center\">\n        <label for=\"classSelect\" class=\"me-2 black-text\"><strong>Select Month:</strong></label>\n        <div class=\"custom-input-css without-label custom-width\">\n          <ion-select class=\"custom-select-css\" [(ngModel)]=\"selectedMonth\" (ionChange)=\"onMonthChange($event)\">\n            <ion-select-option *ngFor=\"let month of months\" [value]=\"month.value\">{{month.text}}</ion-select-option>\n          </ion-select>\n        </div>\n      </div>\n    </div>\n    <ion-list *ngIf=\"showMissingAttendanceSection\">\n      <ion-card class=\"white-bg-color\" *ngFor=\"let classAttendanceMissing of classAttendanceMissingList\" (click)=\"setOpen(true)\">\n        <ion-card-header>\n          <ion-card-subtitle>{{classAttendanceMissing.attendanceMissingDate?.format('ddd DD MMM YYYY') }}</ion-card-subtitle>\n          <ion-card-subtitle class=\"class\">{{classAttendanceMissing.gradeName}} - {{classAttendanceMissing.divisionName}}</ion-card-subtitle>\n        </ion-card-header>\n\n        <ion-card-content>\n          <a href=\"javascript:void(0)\" class=\"mark-btn\" (click)=\"goToAttendancePage(classAttendanceMissing)\">\n            Mark Attendance\n          </a>\n        </ion-card-content>\n      </ion-card>\n      <ion-card-header *ngIf=\"classAttendanceMissingList?.length === 0\" class=\"redbg2 font16 p-1\"><i class=\"bi bi-exclamation-triangle\"></i>\n        <span class=\"ms-2\" translate>There is no missing attendance record found for this academic year .</span>\n      </ion-card-header>\n    </ion-list>\n\n    \n\n    <ion-card class=\"ion-no-margin ion-card-chart animate__animated animate__fadeIn dark-bg-color\">\n      <!-- Skeletons -->\n      <ng-container *ngIf=\"!content_loaded\">\n        <ion-card-header>\n          <div>\n            <ion-card-title>\n              <ion-skeleton-text animated style=\"width: 60px\"></ion-skeleton-text>\n            </ion-card-title>\n            <ion-card-subtitle>\n              <ion-skeleton-text animated style=\"width: 80px\"></ion-skeleton-text>\n            </ion-card-subtitle>\n          </div>\n          <ion-badge color=\"primary\" mode=\"ios\">\n            <ion-skeleton-text animated style=\"width: 50px\"></ion-skeleton-text>\n          </ion-badge>\n        </ion-card-header>\n\n        <ion-skeleton-text animated style=\"\n              width: calc(100% - 40px);\n              margin: 16px auto 16px auto;\n              min-height: 140px;\n            \">\n        </ion-skeleton-text>\n      </ng-container>\n\n    </ion-card>\n  </ng-container>\n\n</ion-content>\n\n<!-- <div class=\"update-app-wrapper\"></div>\n<div *ngIf=\"!isAppAccessible\" class=\"update-app\">\n  <span class=\"icon\"><ion-icon name=\"notifications-outline\"></ion-icon></span>\n  <p class=\"text\">A new version of the app is available. Please update to continue using the app.</p>\n  <button (click)=\"redirectToPlayStore()\" class=\"update-button\">Update</button>\n</div> -->\n  <ion-modal id=\"example-modal\" class=\"update-modal\" #modal [isOpen]=\"!isAppAccessible\"  [canDismiss]=\"canDismiss\"  [presentingElement]=\"presentingElement\">\n    <ng-template>\n      <div  class=\"update-app\">\n          <span class=\"icon\"><ion-icon name=\"notifications-outline\"></ion-icon></span>\n          <p class=\"text\">A new version of the app is available. If you haven't updated it please click on update or else click on close.</p>\n        <button (click)=\"redirectToPlayStore()\" class=\"update-button\">Update</button> &nbsp;\n        <button (click)=\"refreshPage()\" class=\"update-button\">Close</button>\n        </div>\n    </ng-template>\n  </ion-modal>\n\n";

/***/ }),

/***/ 23953:
/*!************************************************************************************************************************************************!*\
  !*** ./src/app/pages/teacherApp/teacher-dashboard/view-teacher-school-event-detail/view-teacher-school-event-detail.component.html?ngResource ***!
  \************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header collapse=\"fade\" [translucent]=\"true\" class=\"modal-header\">\n    <ion-toolbar>\n      <ion-title color=\"dark-color\" style=\"font-weight: bold;\">Event Details</ion-title>\n      <ion-buttons slot=\"end\">\n        <ion-button color=\"primary\" fill=\"solid\" (click)=\"close()\">\n          Close\n        </ion-button>\n      </ion-buttons>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content class=\"ion-padding\">\n    <ion-card-subtitle class=\"message-from\">\n      <span class=\"bold-black-text\">Event Title: &nbsp;</span>\n      <ion-text>{{ selectedEvent.eventTitle }}</ion-text>\n    </ion-card-subtitle>\n    <br>\n    <ion-card-subtitle class=\"message-from\" *ngFor=\"let date of selectedEvent.lstEventDate\">\n      <span class=\"bold-black-text\">Event Date : &nbsp; </span>\n      <ion-text>{{date.eventStartDate | date: 'dd-MMM-yyyy' }} <span>To</span>  {{ date.eventEndDate | date: 'dd-MMM-yyyy' }}</ion-text>\n    </ion-card-subtitle>\n    <br>\n    <ng-container *ngIf=\"selectedEvent && selectedEvent.startTime && selectedEvent.endTime\">\n      <ion-card-subtitle class=\"message-from\">\n        <span class=\"bold-black-text\">Event Time: &nbsp; </span>\n        <ion-text>\n          {{ selectedEvent.startTime | date: 'hh:mm a' }}\n          <span>To</span> {{ selectedEvent.endTime | date: 'hh:mm a' }}\n        </ion-text>\n      </ion-card-subtitle>\n    </ng-container>\n    <br>\n    <ion-card-subtitle class=\"message-from inline\">\n      <span class=\"bold-black-text\">Event Description:&nbsp;</span>\n      <ion-text [innerHTML]=\"selectedEvent.eventDescription\"></ion-text>\n    </ion-card-subtitle>\n    <ion-card-subtitle class=\"message-from\">\n      <span class=\"bold-black-text\">Event Coordinator: &nbsp;</span>\n      <ion-text>{{ selectedEvent.eventCoordinator }}</ion-text>\n    </ion-card-subtitle>\n    <br>\n    <ion-card-subtitle class=\"message-from\"\n      *ngIf=\"selectedEvent.eventFess && selectedEvent.eventFess.length > 0 && selectedEvent.eventFess !== '0.0000'\">\n      <span class=\"bold-black-text\">Event Fees: &nbsp;</span>\n      <ion-text> <b> ₹ </b> {{ selectedEvent.eventFess | number:'1.2-2' }}</ion-text>\n    </ion-card-subtitle>\n    <div class=\"download\">\n      <ion-card-subtitle class=\"message-from\" *ngIf=\"selectedEvent.lstEventDetail && selectedEvent.lstEventDetail.length > 0\">\n        <span class=\"bold-black-text\">Event Files Download : &nbsp; </span>\n      </ion-card-subtitle>\n      <div class=\"uploaded-file-text\">\n        <span class=\"file-thumb\" *ngFor=\"let f of selectedEvent.lstEventDetail; let i = index\">\n          <img *ngIf=\"getFileExtension(f.fileName) === 'png'\" src=\"../../../../assets/img/img.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n          <img *ngIf=\"getFileExtension(f.fileName) === 'jpeg'\" src=\"../../../../assets/img/img.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n          <img *ngIf=\"getFileExtension(f.fileName) === 'jpg'\" src=\"../../../../assets/img/img.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n          <img *ngIf=\"getFileExtension(f.fileName) === 'pdf'\" src=\"../../../../assets/img/pdf.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n          <img *ngIf=\"getFileExtension(f.fileName) === 'doc'\" src=\"../../../../assets/img/doc.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n          <img *ngIf=\"getFileExtension(f.fileName) === 'xls'\" src=\"../../../../assets/img/xlsx.png.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n          <img *ngIf=\"getFileExtension(f.fileName) === 'pptx'\" src=\"../../../../assets/img/ppt.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n          <img *ngIf=\"getFileExtension(f.fileName) === 'txt'\" src=\"../../../../assets/img/txt.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n          <img *ngIf=\"getFileExtension(f.fileName) === 'svg'\" src=\"../../../../assets/img/img.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n          <img *ngIf=\"getFileExtension(f.fileName) === 'csv'\" src=\"../../../../assets/img/csv.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n          <img *ngIf=\"getFileExtension(f.fileName) === 'bmp'\" src=\"../../../../assets/img/bmp.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n          <img *ngIf=\"getFileExtension(f.fileName) === 'xlsx'\" src=\"../../../../assets/img/xlsx.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        </span>\n      </div>\n    </div>\n  \n  </ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_teacherApp_teacher-dashboard_teacher-dashboard_module_ts.js.map