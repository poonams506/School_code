(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_teacherApp_attendance_attendance_module_ts"],{

/***/ 82713:
/*!**************************************************************************!*\
  !*** ./src/app/pages/teacherApp/attendance/attendance-routing.module.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttendanceRoutingModule: () => (/* binding */ AttendanceRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _attendance_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attendance.component */ 1261);




const routes = [{
  path: '',
  component: _attendance_component__WEBPACK_IMPORTED_MODULE_0__.AttendanceComponent
}, {
  path: 'filter',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_teacherApp_attendance_filter_filter_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./filter/filter.module */ 36302)).then(m => m.FilterPageModule)
}];
let AttendanceRoutingModule = class AttendanceRoutingModule {};
AttendanceRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], AttendanceRoutingModule);


/***/ }),

/***/ 1261:
/*!*********************************************************************!*\
  !*** ./src/app/pages/teacherApp/attendance/attendance.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttendanceComponent: () => (/* binding */ AttendanceComponent)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _attendance_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attendance.component.html?ngResource */ 86467);
/* harmony import */ var _attendance_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attendance.component.scss?ngResource */ 15259);
/* harmony import */ var _attendance_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_attendance_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _filter_filter_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./filter/filter.page */ 69969);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/toast/toast.service */ 33545);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 61873);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment */ 39545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);















let AttendanceComponent = class AttendanceComponent {
  constructor(routerOutlet, modalController, userService, teacherProfileService, toastService, commonMethod, router) {
    this.routerOutlet = routerOutlet;
    this.modalController = modalController;
    this.userService = userService;
    this.teacherProfileService = teacherProfileService;
    this.toastService = toastService;
    this.commonMethod = commonMethod;
    this.router = router;
    this.selectAllChecked = false;
    this.selectAllShow = true;
    this.dateExample = new Date().toISOString();
    this.content_loaded = false;
    this.studentAttendanceList = [];
    this.studentAttendanceListCopy = [];
    this.currentDate = new Date().toISOString();
    this.classTeacherGradeDivisionList = [];
    this.presentCount = 0;
    this.absentCount = 0;
    this.weekdayList = [{
      id: 1,
      value: 'Sunday'
    }, {
      id: 2,
      value: 'Monday'
    }, {
      id: 3,
      value: 'Tuesday'
    }, {
      id: 4,
      value: 'Wednesday'
    }, {
      id: 5,
      value: 'Thursday'
    }, {
      id: 6,
      value: 'Friday'
    }, {
      id: 7,
      value: 'Saturday'
    }];
  }
  ngOnInit() {
    this.loadInitData();
  }
  getWeekDayString(dayNo) {
    return this.weekdayList.filter(x => x.id == dayNo)[0].value;
  }
  getCurrentHolidayError() {
    const weeklyOffList = this.weeklyOffDay?.map(x => this.getWeekDayString(parseInt(x.dayNo))).filter(x => x == moment__WEBPACK_IMPORTED_MODULE_8__(this.currentDate).format('dddd'));
    const holidayList = this.schoolHolidays?.filter(x => x.calendarDate.isSame(moment__WEBPACK_IMPORTED_MODULE_8__(this.currentDate), 'date'));
    // const vacationList = this.vacation?.filter(x => x.startDate.isSame(moment(this.currentDate), 'date'));
    // const vacationList = this.vacation?.filter(x => {
    //   const startDate = moment(x.startDate);
    //   const endDate = moment(x.endDate);
    //   return moment(this.currentDate).isBetween(startDate, endDate, 'day', '[]');
    // });
    const vacationList = this.vacation?.filter(x => moment__WEBPACK_IMPORTED_MODULE_8__(this.currentDate).isBetween(x.startDate, x.endDate, 'day', '[]'));
    if (weeklyOffList?.length > 0) {
      this.holidayError = "Selected day is a holiday (Weekly Off).";
    } else if (holidayList?.length > 0) {
      this.holidayError = "Selected day is a holiday. (" + holidayList[0].holidayReason + ")";
    } else if (vacationList?.length > 0) {
      this.holidayError = "Selected day is a Vacation. (" + vacationList[0].vacationName + ")";
    } else {
      this.holidayError = '';
    }
  }
  loadInitData() {
    this.userService.getUser().subscribe(result => {
      this.academicYearId = result.academicYearId;
      this.teacherId = result.userIdByRole;
      (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.forkJoin)([this.teacherProfileService.classTeacherGradeDivisionList(this.teacherId), this.teacherProfileService.getTeacherAttendanceHoliday()]).subscribe(result => {
        this.getClassTeacherGradeDivisionList(result[0]);
        this.weeklyOffDay = result[1].lstWeeklyOff;
        this.schoolHolidays = result[1].lstHoliday;
        this.vacation = result[1].lstVacation;
        this.getCurrentHolidayError(); // Call here
      });
    });
  }
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Attendance');
    this.loadInitData();
  }
  getClassTeacherGradeDivisionList(result) {
    if (result.classTeacherGradeDivisionList.length == 0) {
      this.toastService.presentToast('Error', 'Only Class Teacher can take Attendance !', 'top', 'danger', 2000);
      this.content_loaded = true;
      this.router.navigate(['/teacher-app/teacherTab/home']);
    } else {
      this.classTeacherGradeDivisionList = result.classTeacherGradeDivisionList;
      if (this.commonMethod.getAttendanceDate()) {
        this.selectedClassTeacherGradeDivision = this.classTeacherGradeDivisionList.filter(m => m.divisionId == this.commonMethod.getAttendanceDate().divisionId && m.gradeId == this.commonMethod.getAttendanceDate().gradeId)[0];
        this.currentDate = this.commonMethod.getAttendanceDate().attendanceMissingDate.toString();
        // reset 
        this.commonMethod.setAttendanceDate(null);
      } else {
        this.selectedClassTeacherGradeDivision = this.classTeacherGradeDivisionList[0];
        this.currentDate = new Date().toISOString();
      }
      this.selectedClass = this.selectedClassTeacherGradeDivision.divisionId + ":" + this.selectedClassTeacherGradeDivision.gradeId;
      this.loadAttendenceList();
    }
  }
  onClassChange(e) {
    this.selectAllShow = false;
    setTimeout(() => {
      this.selectAllShow = true;
    }, 500);
    this.selectAllChecked = false;
    this.selectedClassTeacherGradeDivision = new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.SchoolGradeDivisionMatrixDto();
    let value = e.detail.value;
    let valueArray = value.split(':');
    if (valueArray.length > 1) {
      this.selectedClassTeacherGradeDivision.divisionId = parseInt(valueArray[0]);
      this.selectedClassTeacherGradeDivision.gradeId = parseInt(valueArray[1]);
      this.loadAttendenceList();
    }
    this.getCurrentHolidayError();
  }
  loadAttendenceList() {
    let requestWrapper = new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.StudentAttendanceRequestDto();
    requestWrapper.academicYearId = this.academicYearId;
    requestWrapper.teacherId = this.teacherId;
    requestWrapper.divisionId = this.selectedClassTeacherGradeDivision.divisionId;
    requestWrapper.gradeId = this.selectedClassTeacherGradeDivision.gradeId;
    requestWrapper.ngbAttendanceDate = new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.SchoolNgbDateModel();
    requestWrapper.ngbAttendanceDate.day = new Date(this.currentDate).getDate();
    requestWrapper.ngbAttendanceDate.month = new Date(this.currentDate).getMonth() + 1;
    requestWrapper.ngbAttendanceDate.year = new Date(this.currentDate).getFullYear();
    this.teacherProfileService.getStudentAttendanceList(requestWrapper).subscribe(result => {
      this.studentAttendanceList = result.studentAttendancesList;
      this.isAttendanceAlreadyTaken = result.studentAttendancesList.filter(m => m.statusId == 2 || m.statusId == 3 || m.statusId == 1).length > 0;
      this.content_loaded = true;
      this.presentCount = this.getCount(1);
      this.absentCount = this.getCount(3);
    });
    this.getCurrentHolidayError();
  }
  // Filter
  filter() {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Open filter modal
      const modal = yield _this.modalController.create({
        component: _filter_filter_page__WEBPACK_IMPORTED_MODULE_3__.FilterPage,
        //swipeToClose: true,
        presentingElement: _this.routerOutlet.nativeEl
      });
      yield modal.present();
      // Apply filter from modal
      let {
        data
      } = yield modal.onWillDismiss();
      if (data) {
        // Reload
        _this.content_loaded = false;
        // Fake timeout
        setTimeout(() => {
          _this.content_loaded = true;
        }, 2000);
      }
    })();
  }
  isPresent(attendance) {
    return attendance.statusId == 1 || attendance.statusId == 2;
  }
  getCount(statusId) {
    return this.studentAttendanceList.filter(m => m.statusId == statusId).length;
  }
  updateList() {
    for (let i = 0; i < this.studentAttendanceList.length; i++) {
      if (this.studentAttendanceList[i].statusId == 0) {
        this.studentAttendanceList[i].statusId = this.studentAttendanceList[i].statusId = 3;
      }
    }
  }
  onSelectAll(e) {
    for (let i = 0; i < this.studentAttendanceList.length; i++) {
      this.studentAttendanceList[i].statusId = e.detail.checked ? 1 : 3;
    }
  }
  onSelect(e, attendance) {
    attendance.statusId = e.detail.checked ? 1 : 3;
  }
  onSubmit() {
    this.updateList();
    let studentAttendanceUpsertDto = new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.StudentAttendanceUpsertDto();
    studentAttendanceUpsertDto.academicYearId = this.academicYearId;
    studentAttendanceUpsertDto.userId = this.teacherId;
    studentAttendanceUpsertDto.divisionId = this.selectedClassTeacherGradeDivision.divisionId;
    studentAttendanceUpsertDto.gradeId = this.selectedClassTeacherGradeDivision.gradeId;
    studentAttendanceUpsertDto.studentAttendanceUpsertLists = this.studentAttendanceList;
    studentAttendanceUpsertDto.ngbAttendanceDate = new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.SchoolNgbDateModel();
    studentAttendanceUpsertDto.ngbAttendanceDate.day = new Date(this.currentDate).getDate();
    studentAttendanceUpsertDto.ngbAttendanceDate.month = new Date(this.currentDate).getMonth() + 1;
    studentAttendanceUpsertDto.ngbAttendanceDate.year = new Date(this.currentDate).getFullYear();
    this.teacherProfileService.getStudentAttendanceUpsert(studentAttendanceUpsertDto).subscribe(result => {
      this.toastService.presentToast('Success', 'Attendance saved successfully !', 'top', 'success', 2000);
      this.presentCount = this.getCount(1);
      this.absentCount = this.getCount(3);
    });
  }
  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonRouterOutlet
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_5__.UserService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.TeacherProfileServiceProxy
  }, {
    type: src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_6__.ToastService
  }, {
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_7__.CommonMethodService
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.Router
  }];
  static #_2 = this.propDecorators = {
    modal: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewChild,
      args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonModal]
    }]
  };
};
AttendanceComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.Component)({
  selector: 'app-charts',
  template: _attendance_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_attendance_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], AttendanceComponent);


/***/ }),

/***/ 42544:
/*!******************************************************************!*\
  !*** ./src/app/pages/teacherApp/attendance/attendance.module.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttendanceModule: () => (/* binding */ AttendanceModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _attendance_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attendance-routing.module */ 82713);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-charts */ 16045);
/* harmony import */ var _attendance_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attendance.component */ 1261);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! highcharts-angular */ 14215);









let AttendanceModule = class AttendanceModule {};
AttendanceModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _attendance_routing_module__WEBPACK_IMPORTED_MODULE_0__.AttendanceRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, ng2_charts__WEBPACK_IMPORTED_MODULE_7__.NgChartsModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_8__.HighchartsChartModule],
  declarations: [_attendance_component__WEBPACK_IMPORTED_MODULE_1__.AttendanceComponent]
})], AttendanceModule);


/***/ }),

/***/ 69969:
/*!*******************************************************************!*\
  !*** ./src/app/pages/teacherApp/attendance/filter/filter.page.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FilterPage: () => (/* binding */ FilterPage)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _filter_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter.page.html?ngResource */ 96295);
/* harmony import */ var _filter_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filter.page.scss?ngResource */ 76071);
/* harmony import */ var _filter_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_filter_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 78205);
/* harmony import */ var src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/toast/toast.service */ 33545);








let FilterPage = class FilterPage {
  constructor(modalController, formBuilder, toastService, navController, actionSheetController) {
    this.modalController = modalController;
    this.formBuilder = formBuilder;
    this.toastService = toastService;
    this.navController = navController;
    this.actionSheetController = actionSheetController;
    this.dateExample = new Date().toISOString();
    this.submit_attempt = false;
    this.customPopoverOptions = {
      message: 'Select one',
      cssClass: 'popover-in-modal'
    };
    this.filters = ['abc'];
  }
  ngOnInit() {
    // Setup form
    this.edit_profile_form = this.formBuilder.group({
      name_first: [{
        value: '',
        disabled: true
      }, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
      name_last: [{
        value: '',
        disabled: true
      }, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
      middle_name: [{
        value: '',
        disabled: true
      }, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
      dateName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
      addressLine1: [''],
      pincode: ['']
    });
    // DEBUG: Prefill inputs
    this.edit_profile_form.get('name_first').setValue('Disha');
    this.edit_profile_form.get('middle_name').setValue('Nitin');
    this.edit_profile_form.get('name_last').setValue('Patil');
  }
  // Update profile picture
  updateProfilePicture() {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const actionSheet = yield _this.actionSheetController.create({
        header: 'Choose existing picture or take new',
        cssClass: 'custom-action-sheet',
        buttons: [{
          text: 'Choose from gallery',
          icon: 'images',
          handler: () => {
            // Put in logic ...
          }
        }, {
          text: 'Take picture',
          icon: 'camera',
          handler: () => {
            // Put in logic ...
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }]
      });
      yield actionSheet.present();
    })();
  }
  // Submit form
  submit() {
    this.submit_attempt = true;
    // If form valid
    if (this.edit_profile_form.valid) {
      // Save form ...
      // Display success message and go back
      this.toastService.presentToast('Success', 'Profile saved', 'top', 'success', 2000);
      this.navController.back();
    } else {
      // Display error message
      this.toastService.presentToast('Error', 'Please fill in all required fields', 'top', 'danger', 2000);
    }
  }
  // Cancel
  cancel() {
    // Dismiss modal
    this.modalController.dismiss();
  }
  // Apply filter
  apply() {
    // Add filter logic here...
    // ...
    // Dismiss modal and apply filters
    this.modalController.dismiss(this.filters);
  }
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController
  }, {
    type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder
  }, {
    type: src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_3__.ToastService
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.NavController
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ActionSheetController
  }];
};
FilterPage = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-filter',
  template: _filter_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_filter_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], FilterPage);


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

/***/ 15259:
/*!**********************************************************************************!*\
  !*** ./src/app/pages/teacherApp/attendance/attendance.component.scss?ngResource ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:host ion-item {
  --min-height: 35px;
}
:host .header-md {
  box-shadow: none;
}
:host ion-card {
  border-radius: 0;
}

highcharts-chart {
  overflow: hidden;
  width: 100% !important;
  display: flex;
  margin: 0 auto;
  height: 300px !important;
}

.font18 {
  font-size: 18px;
  margin: 10px 0;
}

ion-list {
  background-color: #d0d1eb !important;
  padding: 0px;
}
ion-list ion-badge {
  font-weight: normal;
}

.list-color {
  padding: 10px;
  --background-color: #fff !important;
  background-color: #fff !important;
}

.box-wrapper {
  --background-color: #eef1f2 !important;
  background-color: #eef1f2 !important;
  margin-bottom: 10px;
  padding: 7px;
  border-radius: 4px !important;
  box-shadow: none !important;
  border: 1px solid #e3e6ea;
  display: flex;
  align-items: center;
}
.box-wrapper .box {
  flex: 1;
  font-size: 12px;
  color: var(--dark-color);
}
.box-wrapper .box.left-b span {
  display: block;
}
.box-wrapper .box.left-b .name {
  color: var(--black-color);
  font-weight: bold;
  font-size: 16px;
}
.box-wrapper .box.right-b {
  display: flex;
  justify-content: end;
}
.box-wrapper .box.right-b ion-button {
  font-size: 12px;
  --box-shadow: none !important;
  text-transform: capitalize;
  letter-spacing: 0;
}
.box-wrapper .box icon-badge {
  font-weight: normal;
}

.date-header {
  padding-left: 15px;
}
.date-header ion-card-subtitle {
  text-transform: initial;
}
.date-header ion-card-subtitle span + span {
  font-weight: 500;
  letter-spacing: 0;
}

ion-checkbox {
  --size: 24px;
  --checkbox-background-checked: var(--dark-color);
  font-size: 16px;
  color: var(--black-color);
}

ion-checkbox::part(container) {
  border-radius: 6px;
  border: 2px solid var(--dark-color);
}

ion-toggle {
  --track-background: #a9a7a7 !important;
  --track-background-checked: #a9a7a7 !important;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/teacherApp/attendance/attendance.component.scss"],"names":[],"mappings":"AACI;EACI,kBAAA;AAAR;AAEI;EACI,gBAAA;AAAR;AAEI;EACI,gBAAA;AAAR;;AAMA;EACI,gBAAA;EACA,sBAAA;EACA,aAAA;EACA,cAAA;EACA,wBAAA;AAHJ;;AAMA;EACI,eAAA;EACA,cAAA;AAHJ;;AAMA;EACI,oCAAA;EACA,YAAA;AAHJ;AAKI;EACI,mBAAA;AAHR;;AAOA;EACI,aAAA;EACA,mCAAA;EACA,iCAAA;AAJJ;;AAOA;EACI,sCAAA;EACA,oCAAA;EAIA,mBAAA;EACA,YAAA;EACA,6BAAA;EACA,2BAAA;EACA,yBAAA;EACA,aAAA;EACA,mBAAA;AAPJ;AAQI;EACI,OAAA;EACA,eAAA;EACA,wBAAA;AANR;AAQY;EACI,cAAA;AANhB;AAQY;EACI,yBAAA;EACA,iBAAA;EACA,eAAA;AANhB;AASQ;EACI,aAAA;EACA,oBAAA;AAPZ;AAQY;EACI,eAAA;EACA,6BAAA;EACA,0BAAA;EACA,iBAAA;AANhB;AAUQ;EACI,mBAAA;AARZ;;AAcA;EACI,kBAAA;AAXJ;AAYI;EACI,uBAAA;AAVR;AAWQ;EACI,gBAAA;EACA,iBAAA;AATZ;;AAcA;EACI,YAAA;EACA,gDAAA;EACA,eAAA;EACA,yBAAA;AAXJ;;AAcE;EACE,kBAAA;EACA,mCAAA;AAXJ;;AAuBA;EACI,sCAAA;EACA,8CAAA;AApBJ","sourcesContent":[":host {\n    ion-item {\n        --min-height: 35px;\n    }\n    .header-md {\n        box-shadow: none;\n    }\n    ion-card {\n        border-radius: 0;\n    }\n    \n}\n\n\nhighcharts-chart {\n    overflow: hidden;\n    width: 100% !important;\n    display: flex;\n    margin: 0 auto;\n    height: 300px !important;\n}\n\n.font18 {\n    font-size: 18px;\n    margin: 10px 0;\n}\n\nion-list {\n    background-color: #d0d1eb !important;\n    padding: 0px;\n\n    ion-badge {\n        font-weight: normal;\n    }\n}\n\n.list-color {\n    padding: 10px;\n    --background-color: #fff !important;\n    background-color: #fff !important;\n}\n\n.box-wrapper {\n    --background-color: #eef1f2 !important;\n    background-color: #eef1f2 !important;\n    // --background:#eef1f2 !important;\n    // background:#263d56 !important;\n\n    margin-bottom: 10px;\n    padding: 7px;\n    border-radius: 4px !important;\n    box-shadow: none !important;\n    border: 1px solid #e3e6ea;\n    display: flex;\n    align-items: center;\n    .box {\n        flex: 1;\n        font-size: 12px;\n        color: var(--dark-color);\n        &.left-b {\n            span {\n                display: block;\n            }\n            .name {\n                color: var(--black-color);\n                font-weight: bold;\n                font-size: 16px;\n            }\n        }\n        &.right-b {\n            display: flex;\n            justify-content: end;\n            ion-button {\n                font-size: 12px;\n                --box-shadow: none !important;\n                text-transform: capitalize;\n                letter-spacing: 0;\n            }\n        }\n\n        icon-badge {\n            font-weight: normal;\n        }\n    }\n}\n\n\n.date-header {\n    padding-left: 15px;\n    ion-card-subtitle {\n        text-transform: initial;\n        span + span {\n            font-weight: 500;\n            letter-spacing: 0;        }\n    }\n}\n\n\nion-checkbox {\n    --size: 24px;\n    --checkbox-background-checked: var(--dark-color);\n    font-size: 16px;\n    color: var(--black-color);\n  }\n  \n  ion-checkbox::part(container) {\n    border-radius: 6px;\n    border: 2px solid var(--dark-color);\n  }\n\n//   ion-datetime {\n//     --background: var(--dark-bg-color);\n//     --background-rgb: var(--dark-bg-color);\n//     color: #fff !important;\n//     --color: #fff !important;\n//     max-width: 100%;\n// }\n\n\nion-toggle {\n    --track-background: #a9a7a7 !important;\n    --track-background-checked: #a9a7a7 !important;\n  }"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 76071:
/*!********************************************************************************!*\
  !*** ./src/app/pages/teacherApp/attendance/filter/filter.page.scss?ngResource ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:host ion-list {
  background-color: var(--ion-color-primary);
}
:host ion-item {
  --border-radius: 8px;
  margin-bottom: 8px;
}
:host .form-default {
  margin-top: 20px;
}
:host .label-floating {
  max-width: -moz-fit-content !important;
  max-width: fit-content !important;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/teacherApp/attendance/filter/filter.page.scss"],"names":[],"mappings":"AACE;EACE,0CAAA;AAAJ;AAEE;EACE,oBAAA;EACA,kBAAA;AAAJ;AAGE;EACE,gBAAA;AADJ;AAGE;EACF,sCAAA;EAAA,iCAAA;AADA","sourcesContent":[":host {\n  ion-list {\n    background-color: var(--ion-color-primary);\n  }\n  ion-item {\n    --border-radius: 8px;\n    margin-bottom: 8px;\n  }\n\n  .form-default {\n    margin-top: 20px;\n  }\n  .label-floating {\nmax-width: fit-content !important;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 86467:
/*!**********************************************************************************!*\
  !*** ./src/app/pages/teacherApp/attendance/attendance.component.html?ngResource ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n\n\n\n<ion-content [fullscreen]=\"true\" class=\"light-content\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"handleRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  \n  <ion-card-header class=\"date-header pb-0\" *ngIf=\"selectAllShow\">\n    <ion-card-subtitle class=\"d-flex justify-content-between dark-color\">\n      Select All <ion-toggle aria-label=\"Success toggle\" color=\"success\" [checked]=\"selectAllChecked\"\n        (ionChange)=\"onSelectAll($event)\"></ion-toggle>\n    </ion-card-subtitle>\n    <ion-card-subtitle class=\"d-flex justify-content-between dark-color\">\n      <span>{{currentDate | date: 'EEEE dd MMM'}} </span>\n      <span class=\"red-color\">{{holidayError}}</span>\n      <span> <ion-select class=\"custom-select-css\" (ionChange)=\"onClassChange($event)\" [(ngModel)]=\"selectedClass\">\n          <ion-select-option *ngFor=\"let classTeacherGradeDivision of classTeacherGradeDivisionList\"\n            value=\"{{classTeacherGradeDivision.divisionId+':'+classTeacherGradeDivision.gradeId}}\">Class -\n            {{classTeacherGradeDivision.className}}</ion-select-option>\n        </ion-select></span>\n    </ion-card-subtitle>\n    <ion-card-subtitle class=\"d-flex justify-content-between\">\n      <span class=\"d-flex\"> <ion-badge color=\"tertiary\" class=\"mx-2\">{{presentCount}}</ion-badge>\n        Present</span>\n      <span class=\"d-flex\"> <ion-badge color=\"tertiary\" class=\"mx-2\">{{absentCount}}</ion-badge>\n        Absent</span>\n    </ion-card-subtitle>\n    <ion-card-subtitle class=\"d-flex justify-content-end\">\n      <span class=\"red-color\">{{isAttendanceAlreadyTaken?'Attendance already taken':''}}</span>\n    </ion-card-subtitle>\n\n  </ion-card-header>\n  <ng-container *ngIf=\"!content_loaded\">\n    <ion-list class=\"list-custom animate__animated animate__fadeIn\" lines=\"full\">\n      <ion-item color=\"light\" button detail=\"false\" *ngFor=\"let i of [].constructor(12);\">\n        <ion-label>\n          <h3><ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text></h3>\n          <p><ion-skeleton-text animated style=\"width: 75%\"></ion-skeleton-text></p>\n        </ion-label>\n        <ion-skeleton-text slot=\"end\" animated style=\"width: 15%\"></ion-skeleton-text>\n      </ion-item>\n    </ion-list>\n  </ng-container>\n\n  <ng-container *ngIf=\"content_loaded\">\n\n\n\n\n    <ion-card class=\"box-wrapper\" lines=\"none\" *ngFor=\"let attendance of studentAttendanceList\">\n      <div class=\"box left-b\">\n\n        <span class=\"name\">Roll No. {{attendance.rollNumber}}</span>\n        <span class=\"roll\">{{attendance.fullName}}</span>\n        \n      </div>\n      <div class=\"box right-b text-end\">\n        <ion-toggle aria-label=\"Success toggle\" color=\"success\" [checked]=\"isPresent(attendance)\"\n          (ionChange)=\"onSelect($event,attendance)\"></ion-toggle>\n\n        <!-- <ion-button size=\"small\" shape=\"round\" color=\"success\">Present</ion-button>\n          <ion-button size=\"small\" shape=\"round\" color=\"danger\">Absent</ion-button> -->\n      </div>\n    </ion-card>\n    <div style=\"height: 50px;\"></div>\n  </ng-container>\n\n  <ion-fab slot=\"fixed\" vertical=\"bottom\" horizontal=\"end\">\n    <ion-fab-button  id=\"open-modal2\">\n      <ion-icon name=\"calendar-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n</ion-content>\n\n<ion-footer class=\"footer-with-btn\">\n  <ion-toolbar>\n    <ion-button expand=\"full\" (click)=\"onSubmit()\">Submit</ion-button>\n  </ion-toolbar>\n</ion-footer>\n\n\n<ion-modal trigger=\"open-modal2\" [cssClass]=\"'bottom-end'\" [keepContentsMounted]=\"true\"\n[initialBreakpoint]=\"0.54\">\n<ng-template>\n  <ion-datetime displayFormat=\"DD.MM.YYYY\" [(ngModel)]=\"currentDate\" size=\"cover\"\n    (ionChange)=\"loadAttendenceList()\" [showDefaultButtons]=\"true\" presentation=\"date\"></ion-datetime>\n\n</ng-template>\n</ion-modal>";

/***/ }),

/***/ 96295:
/*!********************************************************************************!*\
  !*** ./src/app/pages/teacherApp/attendance/filter/filter.page.html?ngResource ***!
  \********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header collapse=\"fade\" [translucent]=\"true\">\n  <ion-toolbar color=\"dark\">\n    <ion-buttons slot=\"start\">\n      <ion-button color=\"secondary\" fill=\"outline\" (click)=\"cancel()\">\n        Cancel\n      </ion-button>\n    </ion-buttons>\n\n    <ion-title color=\"light\">\n      Filter\n    </ion-title>\n\n    <ion-buttons slot=\"end\">\n      <ion-button color=\"primary\" fill=\"solid\" (click)=\"apply()\">\n        Apply\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <div class=\"form-padding\">\n    <form class=\"form-default m-0\" [formGroup]=\"edit_profile_form\" (submit)=\"submit()\">\n\n    <ion-list-header class=\"ion-list-header-small px-0\">\n      <ion-label>\n        <ion-text color=\"dark\">Category</ion-text>\n      </ion-label>\n    </ion-list-header>\n\n    <ion-item fill=\"outline\" class=\"animate__animated animate__fadeInUp  form-item mb-2\">\n      <ion-label  position=\"floating\">Select Role</ion-label>\n      <ion-select>\n        <ion-select-option value=\"apples\">Admin</ion-select-option>\n        <ion-select-option value=\"oranges\">Principal</ion-select-option>\n        <ion-select-option value=\"bananas\">Teacher</ion-select-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-list-header class=\"ion-list-header-small px-2 m-0\">\n      <ion-label>\n        <ion-text color=\"data\">Select Date</ion-text>\n      </ion-label>\n    </ion-list-header>\n\n    <ion-item fill=\"outline\" id=\"open-modal2\" class=\"animate__animated animate__fadeInUp  form-item\">\n      <ion-label position=\"floating\"> From Date</ion-label>\n      <ion-input color=\"dark\" placeholder=\"From Date\" formControlName=\"dateName\"></ion-input>\n    </ion-item>\n    <ion-modal trigger=\"open-modal2\"\n     [cssClass]=\"'bottom-end'\" [keepContentsMounted]=\"true\"\n     [initialBreakpoint]=\"0.65\">\n      <ng-template>\n        <ion-datetime\n        formControlName=\"dateName\"\n        displayFormat=\"DD.MM.YYYY\"\n        presentation=\"date\"\n        [(ngModel)]=\"dateExample\"\n          size=\"cover\"\n          [showDefaultButtons]=\"true\"\n        ></ion-datetime>\n      </ng-template> \n      </ion-modal>\n\n</form>\n  </div>\n\n</ion-content>\n";

/***/ }),

/***/ 14215:
/*!*************************************************************************!*\
  !*** ./node_modules/highcharts-angular/fesm2020/highcharts-angular.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HighchartsChartComponent: () => (/* binding */ HighchartsChartComponent),
/* harmony export */   HighchartsChartModule: () => (/* binding */ HighchartsChartModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);


class HighchartsChartComponent {
  constructor(el, _zone // #75
  ) {
    this.el = el;
    this._zone = _zone;
    this.updateChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter(true);
    this.chartInstance = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter(); // #26
  }
  ngOnChanges(changes) {
    const update = changes.update && changes.update.currentValue;
    if (changes.options || update) {
      this.wrappedUpdateOrCreateChart();
      if (update) {
        this.updateChange.emit(false); // clear the flag after update
      }
    }
  }
  wrappedUpdateOrCreateChart() {
    if (this.runOutsideAngular) {
      this._zone.runOutsideAngular(() => {
        this.updateOrCreateChart();
      });
    } else {
      this.updateOrCreateChart();
    }
  }
  updateOrCreateChart() {
    if (this.chart && this.chart.update) {
      this.chart.update(this.options, true, this.oneToOne || false);
    } else {
      this.chart = this.Highcharts[this.constructorType || 'chart'](this.el.nativeElement, this.options, this.callbackFunction || null);
      // emit chart instance on init
      this.chartInstance.emit(this.chart);
    }
  }
  ngOnDestroy() {
    if (this.chart) {
      // #56
      this.chart.destroy();
      this.chart = null;
    }
  }
}
HighchartsChartComponent.ɵfac = function HighchartsChartComponent_Factory(t) {
  return new (t || HighchartsChartComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone));
};
HighchartsChartComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: HighchartsChartComponent,
  selectors: [["highcharts-chart"]],
  inputs: {
    Highcharts: "Highcharts",
    constructorType: "constructorType",
    callbackFunction: "callbackFunction",
    oneToOne: "oneToOne",
    runOutsideAngular: "runOutsideAngular",
    options: "options",
    update: "update"
  },
  outputs: {
    updateChange: "updateChange",
    chartInstance: "chartInstance"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
  decls: 0,
  vars: 0,
  template: function HighchartsChartComponent_Template(rf, ctx) {},
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HighchartsChartComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'highcharts-chart',
      template: ''
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }];
  }, {
    Highcharts: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    constructorType: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    callbackFunction: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    oneToOne: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    runOutsideAngular: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    options: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    update: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    updateChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    chartInstance: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }]
  });
})();
class HighchartsChartModule {}
HighchartsChartModule.ɵfac = function HighchartsChartModule_Factory(t) {
  return new (t || HighchartsChartModule)();
};
HighchartsChartModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: HighchartsChartModule,
  declarations: [HighchartsChartComponent],
  exports: [HighchartsChartComponent]
});
HighchartsChartModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HighchartsChartModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      declarations: [HighchartsChartComponent],
      exports: [HighchartsChartComponent]
    }]
  }], null, null);
})();

/*
 * Public API Surface of highcharts-angular
 */

/**
 * Generated bundle index. Do not edit.
 */



/***/ })

}]);
//# sourceMappingURL=src_app_pages_teacherApp_attendance_attendance_module_ts.js.map