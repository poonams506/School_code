(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_parentApp_calendar_calendar_module_ts"],{

/***/ 61001:
/*!*********************************************************************!*\
  !*** ./src/app/pages/parentApp/calendar/calendar-routing.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalendarRoutingModule: () => (/* binding */ CalendarRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _calendar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendar.component */ 95805);




const routes = [{
  path: '',
  component: _calendar_component__WEBPACK_IMPORTED_MODULE_0__.CalendarComponent
}];
let CalendarRoutingModule = class CalendarRoutingModule {};
CalendarRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], CalendarRoutingModule);


/***/ }),

/***/ 95805:
/*!****************************************************************!*\
  !*** ./src/app/pages/parentApp/calendar/calendar.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalendarComponent: () => (/* binding */ CalendarComponent)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _calendar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendar.component.html?ngResource */ 79311);
/* harmony import */ var _calendar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar.component.scss?ngResource */ 62641);
/* harmony import */ var _calendar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_calendar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ 39545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var _teacherApp_calendar_calendar_event_detail_modal_calendar_event_detail_modal_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../teacherApp/calendar/calendar-event-detail-modal/calendar-event-detail-modal.component */ 48384);











let CalendarComponent = class CalendarComponent {
  constructor(commonMethod, userService, ParentAppService, modalCtrl) {
    this.commonMethod = commonMethod;
    this.userService = userService;
    this.ParentAppService = ParentAppService;
    this.modalCtrl = modalCtrl;
    this.content_loaded = false;
    this.currentDate = moment__WEBPACK_IMPORTED_MODULE_3__().format('YYYY-MM-DD');
    this.currentSelectedDate = moment__WEBPACK_IMPORTED_MODULE_3__();
    this.currentFirstDate = moment__WEBPACK_IMPORTED_MODULE_3__().format('YYYY-MM-DD');
    this.lstAllEvents = [];
    this.lstCurrentDayEvents = [];
    this.isModalOpen = false;
  }
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Calendar');
    this.getInitData();
  }
  ngOnInit() {
    this.getInitData();
  }
  getInitData() {
    this.userService.getAcademicYear().subscribe(result => {
      this.academicYearId = result;
      this.ParentAppService.getParentAppListSelect(this.academicYearId, this.userService.CurrentSiblingClassId).subscribe(result => {
        this.lstAllEvents = result.parentLstEvents;
        console.log(result);
        this.onMonthYearChange();
        this.content_loaded = true;
        setTimeout(() => {
          this.scrollToChipByClassName();
        }, 500);
      });
    });
  }
  scrollToChipByClassName() {
    const elements = document.getElementsByClassName('selected');
    if (elements.length > 0) {
      const selectedChip = elements[0];
      selectedChip.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }
  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
      this.scrollToChipByClassName();
    }, 2000);
  }
  getAllDatesInMonth() {
    const dates = [];
    const lastDay = parseInt(moment__WEBPACK_IMPORTED_MODULE_3__({
      year: this.currentYear,
      month: this.currentMonth,
      day: 1
    }).endOf('month').format('DD'));
    for (let day = 1; day <= lastDay; day++) {
      dates.push({
        day: moment__WEBPACK_IMPORTED_MODULE_3__({
          year: this.currentYear,
          month: this.currentMonth,
          day: day
        }),
        isSelected: moment__WEBPACK_IMPORTED_MODULE_3__({
          year: this.currentYear,
          month: this.currentMonth,
          day: day
        }).isSame(moment__WEBPACK_IMPORTED_MODULE_3__(this.currentFirstDate, 'YYYY-MM-DD'), 'date')
      });
    }
    if (dates.filter(x => x.isSelected == true).length == 0) {
      dates[0].isSelected = true;
      this.currentSelectedDate = dates[0].day;
    } else {
      this.currentSelectedDate = moment__WEBPACK_IMPORTED_MODULE_3__();
    }
    return dates;
  }
  onMonthYearChange() {
    this.lstCurrentDayEvents = [];
    this.currentMonth = moment__WEBPACK_IMPORTED_MODULE_3__(this.currentDate, 'YYYY-MM-DD').month();
    this.currentYear = moment__WEBPACK_IMPORTED_MODULE_3__(this.currentDate, 'YYYY-MM-DD').year();
    this.lstCurrentMonthDays = this.getAllDatesInMonth();
    this.filterCurrentDayEvents();
  }
  filterCurrentDayEvents() {
    this.lstCurrentDayEvents = [];
    let schoolEvents = this.lstAllEvents.filter(x => x.eventType == 'Event' && this.currentSelectedDate.isBetween(x.startDate, x.endDate, "date", "[]"));
    let holidayEvents = this.lstAllEvents.filter(x => x.eventType == 'Holiday' && this.currentSelectedDate.isSame(x.calendarDate, 'date'));
    let vacationEvents = this.lstAllEvents.filter(x => x.eventType == 'Vacation' && this.currentSelectedDate.isBetween(x.vacationStartDate, x.vacationEndDate, "date", "[]"));
    let weeklyOff = this.lstAllEvents.filter(x => x.eventType == 'WeeklyOff' && this.currentSelectedDate.isSame(x.weeklyOffDate, 'date'));
    if (schoolEvents.length > 0) {
      this.lstCurrentDayEvents.push(...schoolEvents);
    }
    if (holidayEvents.length > 0) {
      this.lstCurrentDayEvents.push(...holidayEvents);
    }
    if (vacationEvents.length > 0) {
      this.lstCurrentDayEvents.push(...vacationEvents);
    }
    if (weeklyOff.length > 0) {
      this.lstCurrentDayEvents.push(...weeklyOff);
    }
    console.log(this.lstCurrentDayEvents);
    setTimeout(() => {
      this.scrollToChipByClassName();
    }, 500);
  }
  loadCalenderEventForDay(currentDate) {
    this.scrollToChipByClassName();
    this.lstCurrentMonthDays.forEach(day => {
      day.isSelected = day.day.isSame(currentDate);
    });
    this.currentSelectedDate = currentDate;
    this.filterCurrentDayEvents();
  }
  openModal(currEvent) {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this.modalCtrl.create({
        component: _teacherApp_calendar_calendar_event_detail_modal_calendar_event_detail_modal_component__WEBPACK_IMPORTED_MODULE_7__.CalendarEventDetailModalComponent,
        componentProps: {
          currentEventOnPopup: currEvent
        }
      });
      modal.present();
      const {
        data,
        role
      } = yield modal.onWillDismiss();
      if (role === 'confirm') {
        _this.message = `Hello, ${data}!`;
      }
    })();
  }
  // openModal(isOpen: boolean, schoolEventId: number) {
  //   debugger
  //   this.isModalOpen = isOpen;
  //   console.log()
  // }
  openDetailPopup() {
    this.isModalOpen = true;
  }
  closeDetailPopup() {
    this.isModalOpen = false;
  }
  setOpen(isOpen) {
    this.isModalOpen = isOpen;
  }
  getFormattedMinute(hour, minute) {
    return moment__WEBPACK_IMPORTED_MODULE_3__({
      "hour": hour,
      "minutes": minute
    }).format('hh:mm A');
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }
  getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
  }
  showFile(file) {
    window.open(file.fullPath, '_blank');
  }
  static #_ = this.ctorParameters = () => [{
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_4__.CommonMethodService
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_5__.UserService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__.ParentAppServiceProxy
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController
  }];
  static #_2 = this.propDecorators = {
    currentEventOnPopup: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input
    }]
  };
};
CalendarComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  selector: 'app-calendar',
  template: _calendar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_calendar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], CalendarComponent);


/***/ }),

/***/ 55072:
/*!*************************************************************!*\
  !*** ./src/app/pages/parentApp/calendar/calendar.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalendarModule: () => (/* binding */ CalendarModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _calendar_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendar-routing.module */ 61001);
/* harmony import */ var _calendar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendar.component */ 95805);







let CalendarModule = class CalendarModule {};
CalendarModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _calendar_routing_module__WEBPACK_IMPORTED_MODULE_0__.CalendarRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule],
  declarations: [_calendar_component__WEBPACK_IMPORTED_MODULE_1__.CalendarComponent]
})], CalendarModule);


/***/ }),

/***/ 62641:
/*!*****************************************************************************!*\
  !*** ./src/app/pages/parentApp/calendar/calendar.component.scss?ngResource ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:host {
  transform: none !important;
}
:host ion-item {
  --background: #fff;
  background-color: #fff;
}

ion-list {
  padding-top: 0;
}
ion-list ion-card-subtitle {
  font-size: 18px;
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

.time-wrapper {
  padding: 0 15px;
  padding-top: 0px;
}
.time-wrapper .period {
  position: relative;
  display: flex;
  padding-top: 30px;
  margin-bottom: 15px;
}
.time-wrapper .period.color1 {
  background-color: #b5d6d6;
}
.time-wrapper .period.color2 {
  background-color: #ff7477;
}
.time-wrapper .period.color3 {
  background-color: aquamarine;
}
.time-wrapper .period.color4 {
  background-color: #e69597;
}
.time-wrapper .period.color5 {
  background-color: #a0cedd;
}
.time-wrapper .period.color6 {
  background-color: #b8c5d5;
}
.time-wrapper .period.color7 {
  background-color: #f7e78e;
}
.time-wrapper .period span {
  display: block;
  width: 100%;
}
.time-wrapper .period .subject {
  font-size: 13px;
  font-weight: 500;
  background-color: #d3e1ed;
  border-radius: 8px;
  padding: 12px 10px;
  margin-bottom: 0px;
}
.time-wrapper .period .class {
  font-size: 13px;
  font-weight: normal;
  width: 110px;
}
.time-wrapper .period .class span {
  display: block;
  width: 100%;
}
.time-wrapper .period .time {
  font-size: 13px;
  font-weight: normal;
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
}
.time-wrapper .period .time .left {
  flex: 1;
  white-space: nowrap;
  position: relative;
  top: 8px;
  padding: 0;
  margin-right: 7px;
  color: #868b91;
}
.time-wrapper .period .time .border-dashed {
  flex: 1 1 auto;
  border-bottom: 1px dashed #ccc;
}

.white-space {
  white-space: nowrap;
  overflow-x: scroll;
  padding: 15px 0;
  padding-top: 0;
  display: flex;
  column-gap: 4px;
}

.month ion-chip {
  display: inline-block;
  --background:#d5d8da;
  padding: 8px 2px;
  min-width: 40px;
}
.month ion-chip ion-label {
  width: 100%;
  text-align: center;
  display: block;
  font-size: 11px;
  color: #000;
}
.month ion-chip ion-label.day {
  font-weight: 500;
  color: #000 !important;
}
.month ion-chip ion-label.date {
  font-weight: 500;
  color: #525151 !important;
}
.month ion-chip.selected {
  --background: linear-gradient(135deg, #da8e63, #c754aa);
}
.month ion-chip.selected ion-label {
  color: #fff !important;
}

.fw-500 {
  font-weight: 500;
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

ion-list {
  padding-top: 0;
  background-color: #fff !important;
  padding: 6px 0;
  margin: 0 12px;
}
ion-list ion-card {
  box-shadow: 0px 0px 0px 0px rgba(204, 204, 204, 0.7098039216);
  display: flex;
  align-items: flex-start;
  border-radius: 4px;
  margin: 2px;
  background-color: transparent;
}
ion-list ion-card ion-card-header {
  padding: 5px;
  width: 135px;
}
ion-list ion-card ion-card-header ion-card-subtitle {
  color: #ff7307;
  font-size: 12px;
  text-align: center;
}
ion-list ion-card ion-card-header ion-card-subtitle.class {
  color: #110a3b;
  font-size: 15px;
  margin-top: 0;
}
ion-list ion-card ion-card-content {
  padding: 0 10px;
  border-left: 3px solid #e0d9d4;
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
ion-list ion-card ion-card-content ion-title {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 5px;
  padding: 0;
  color: #000;
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
.no-bg span {
  font-size: 13px;
  font-weight: 400;
  background-color: #EECE13 !important;
  padding: 10px;
  line-height: 1.4;
  color: #000;
  width: 100%;
  border-radius: 8px;
}
.no-bg span.holiday-span {
  background-color: #f87793 !important;
}
.no-bg span.vacation-span {
  background-color: #d877f8 !important;
}
.no-bg span.WeeklyOff-span {
  background-color: rgba(243, 64, 64, 0.8980392157) !important;
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

.to {
  display: block;
  text-align: center;
  color: #000;
  text-transform: capitalize;
  font-size: 12px;
  width: 50px;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/calendar/calendar.component.scss"],"names":[],"mappings":"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","sourcesContent":[":host {\n    transform: none !important;\n\n    ion-item {\n        --background: #fff;\n        background-color: #fff;\n    }\n}\n\nion-list {\n    padding-top: 0;\n    ion-card-subtitle {\n        font-size: 18px;\n    }\n}\n\n.download {\n    margin-top: 20px;\n    a {\n        text-decoration: none;\n        border: 1px solid #000;\n        border-radius: 4px;\n        background-color: #110a3b;\n        color: #fff;\n        padding: 10px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 16px;\n        ion-icon {\n            font-size: 24px;\n        }\n    }\n}\n\n.modal-text-header {\n    ion-card-subtitle {\n        font-size: 16px;\n        ion-text {\n            font-size: 14px;\n            display: block;\n            color: #000;\n        }\n    }\n}\n\n\nion-modal.homework-modal {\n    ion-header {\n      ion-toolbar {\n          ion-title.main-title {\n              color: #fff;\n              --color:#fff;\n              font-size: 14px;\n          }\n      }\n    }\n  }\n\n.time-wrapper {\n    padding: 0 15px;\n    padding-top: 0px;\n    //background-color: #eef2f3;\n    .period {\n        position: relative;\n        display: flex;\n        padding-top: 30px;\n        margin-bottom: 15px;\n        &.color1 {\n            background-color: #b5d6d6;\n        }\n        &.color2 {\n            background-color: #ff7477;\n        }\n        &.color3 {\n            background-color: aquamarine;\n        }\n        &.color4 {\n            background-color: #e69597;\n        }\n        &.color5 {\n            background-color: #a0cedd;\n        }\n        &.color6 {\n            background-color: #b8c5d5;\n        }\n        &.color7 {\n            background-color: #f7e78e;\n        }\n        span {\n            display: block;\n            width: 100%;\n        }\n        .subject {\n            font-size: 13px;\n            font-weight: 500;\n            background-color: #d3e1ed;\n            border-radius: 8px;\n            padding: 12px 10px;\n            margin-bottom: 0px;\n        }\n\n        .class {\n            font-size: 13px;\n            font-weight: normal;\n            width: 110px;\n            span {\n                display: block;\n                width: 100%;\n            }\n        }\n\n        .time {\n            font-size: 13px;\n            font-weight: normal;\n            position: absolute;\n            top: 0;\n            width: 100%;\n            display: flex;\n            .left {\n                flex: 1;\n                white-space: nowrap;\n                position: relative;\n                top: 8px;\n                padding: 0;\n                margin-right: 7px;\n                color: #868b91;\n\n            }\n            .border-dashed {\n                flex: 1 1 auto;\n                border-bottom: 1px dashed #ccc;\n            }\n        }\n    }\n}\n\n.white-space {\n    white-space: nowrap;\n    overflow-x: scroll;\n    padding: 15px 0;\n    padding-top: 0;\n    display: flex;\n    column-gap: 4px;\n}\n\n.month {\n    ion-chip {\n        display: inline-block;\n        --background:#d5d8da;\n        //box-shadow: 0px 0px 3px 1px #dfe6ed;\n        padding: 8px 2px;\n        min-width: 40px;\n        ion-label {\n            width: 100%;\n            text-align: center;\n            display: block;\n            font-size: 11px;\n            color: #000;\n\n            &.day {\n                font-weight: 500;\n                color: #000 !important;\n            }\n            &.date {\n                font-weight: 500;\n                color: #525151 !important;\n            }\n        }\n        &.selected {\n            //--background: var(--dark-bg-color);\n            --background: linear-gradient(135deg, #da8e63, #c754aa);\n            ion-label {\n                color: #fff !important;\n            }\n        }\n    }\n}\n\n.fw-500 {\n    font-weight: 500;\n}\n\n.date-header {\n    padding-left: 15px;\n    ion-card-subtitle {\n        text-transform: initial;\n        span + span {\n            font-weight: 500;\n            letter-spacing: 0;        }\n    }\n}\nion-list {\n    padding-top: 0;\n    background-color: #fff !important;\n    padding: 6px 0;\n    margin: 0 12px;\n    ion-card {\n        box-shadow: 0px 0px 0px 0px #ccccccb5;\n        display: flex;\n        align-items: flex-start;\n        border-radius: 4px;\n        margin: 2px;\n        background-color: transparent;\n        ion-card-header {\n            padding: 5px;\n            width: 135px;\n            ion-card-subtitle {\n                color: #ff7307;\n                font-size: 12px;\n                text-align: center;\n                &.class {\n                    color: #110a3b;\n                    font-size: 15px;\n                    margin-top: 0;\n                }\n            }\n        }\n        ion-card-content {\n            padding: 0 10px;\n            border-left: 3px solid #e0d9d4;\n            margin-left: 5px;\n            margin-top: 5px;\n            margin-bottom: 5px;\n            line-height: 1.4;\n            font-size: 11px;\n            color: #828891;\n            width: 100%;\n            min-height: 39px;\n            display: flex;\n            ion-title {\n                font-size: 15px;\n                font-weight: 500;\n                margin-bottom: 5px;\n                padding: 0;\n                color: #000;\n            }\n        }\n    }\n}\n\n.no-bg {\n    background-color: transparent !important;\n    padding: 0;\n    margin: 0 0px 10px;\n    ion-card {\n        border-bottom: 1px solid #ccc !important;\n        border-radius: 0 !important;\n        padding: 0 10px;\n        margin: 0;\n    }\n    ion-card-header {\n        width: 88px !important;\n    }\n    span {\n        font-size: 13px;\n        font-weight: 400;\n        background-color: #EECE13 !important;\n        padding: 10px;\n        line-height: 1.4;\n        color: #000;\n        width: 100%;\n        border-radius: 8px;\n        &.holiday-span{\n            background-color: #f87793 !important;\n        }\n        &.vacation-span{\n            background-color: #d877f8 !important;\n        }\n        &.WeeklyOff-span{\n            background-color: #f34040e5 !important;\n        }\n\n\n\n    }\n}\n \n\nh6 {\n    font-size: 13px;\n    font-weight: 500;\n    padding: 7px 15px;\ncolor: #623AA2 !important;\nbackground: #F3EBFF;\nborder: 1px solid #623AA2;\nmargin: 0px 15px 5px;\nborder-radius:4px;\n}\n.to {\n    display: block;\n    text-align: center;\n    color: #000;\n    text-transform: capitalize;\n    font-size: 12px;\n    width: 50px;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 79311:
/*!*****************************************************************************!*\
  !*** ./src/app/pages/parentApp/calendar/calendar.component.html?ngResource ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-content class=\"light-content\" [fullscreen]=\"true\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"handleRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <ng-container *ngIf=\"!content_loaded\">\n    <ion-list-header class=\"ion-list-header-small\">\n      <ion-label\n        ><ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text\n      ></ion-label>\n      <ion-note color=\"tertiary\" class=\"ion-note-small\">\n        <ion-skeleton-text animated style=\"width: 40px\"></ion-skeleton-text>\n      </ion-note>\n    </ion-list-header>\n\n    <ion-list\n      class=\"list-custom animate__animated animate__fadeIn\"\n      lines=\"full\"\n    >\n      <ion-item\n        color=\"light\"\n        button\n        detail=\"false\"\n        *ngFor=\"let i of [].constructor(12)\"\n      >\n        <ion-avatar slot=\"start\" class=\"ion-avatar-default-icon\">\n          <ion-skeleton-text animated></ion-skeleton-text>\n        </ion-avatar>\n        <ion-label>\n          <h3>\n            <ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text>\n          </h3>\n          <p>\n            <ion-skeleton-text animated style=\"width: 75%\"></ion-skeleton-text>\n          </p>\n        </ion-label>\n        <ion-skeleton-text\n          slot=\"end\"\n          animated\n          style=\"width: 15%\"\n        ></ion-skeleton-text>\n      </ion-item>\n    </ion-list>\n  </ng-container>\n\n  <ng-container *ngIf=\"content_loaded\">\n    <div class=\"white-space month\" scroll-x=\"true\">\n      <ion-chip [ngClass]=\"{'selected': currentDay.isSelected}\"\n        *ngFor=\"let currentDay of lstCurrentMonthDays\"\n        (click)=\"loadCalenderEventForDay(currentDay.day)\">\n        <ion-label class=\"day\">{{currentDay.day.format('ddd')}}</ion-label>\n        <ion-label class=\"date\">{{currentDay.day.date()}}</ion-label>\n      </ion-chip>\n\n    </div>\n\n    <h6>{{currentSelectedDate.format('LL')}}</h6>\n    <ion-list class=\"no-bg\">\n      <ion-card\n        class=\"white-bg-color\"\n        *ngFor=\"let currEvent of lstCurrentDayEvents\"\n        (click)=\"openModal(currEvent)\"\n      >\n        <ion-card-header >\n          <ion-card-subtitle *ngIf=\"currEvent.eventType=='Event'\">  \n            <ion-text *ngIf=\"currEvent.startTime && currEvent.endTime\">\n              {{ currEvent.startTime?.format('hh:mm a') }} To <br>\n              {{ currEvent.endTime?.format('hh:mm a') }}\n            </ion-text>\n            <ion-text  *ngIf=\"currEvent.eventType=='Event' && (!currEvent.startTime || !currEvent.endTime)\">Event</ion-text>\n\n          </ion-card-subtitle>\n          <ion-card-subtitle *ngIf=\"currEvent.eventType=='Holiday'\">Holiday</ion-card-subtitle>\n          <ion-card-subtitle *ngIf=\"currEvent.eventType=='Vacation'\">Vacation</ion-card-subtitle>\n          <ion-card-subtitle *ngIf=\"currEvent.eventType=='WeeklyOff'\">WeeklyOff</ion-card-subtitle>\n\n        </ion-card-header>\n\n        <ion-card-content>\n          <span class=\"text-start\" *ngIf=\"currEvent.eventType=='Event'\">Event - {{currEvent.eventTitle}}</span>\n          <span class=\"text-start holiday-span\" *ngIf=\"currEvent.eventType=='Holiday'\">Holiday - {{currEvent.holidayReason}}</span>\n          <span class=\"text-start vacation-span\" *ngIf=\"currEvent.eventType=='Vacation'\">Vacation - {{currEvent.vacationName}}</span>\n          <span class=\"text-start WeeklyOff-span\" *ngIf=\"currEvent.eventType=='WeeklyOff'\">WeeklyOff - {{currEvent.weeklyOffName}}</span>\n\n        </ion-card-content>\n      </ion-card>\n    </ion-list>\n  </ng-container>\n\n  <ion-fab slot=\"fixed\" vertical=\"bottom\" horizontal=\"end\">\n    <ion-fab-button id=\"open-datepicker\">\n      <ion-icon name=\"calendar-outline\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n</ion-content>\n\n<ion-modal\n  trigger=\"open-datepicker\"\n  [cssClass]=\"'bottom-end'\"\n  [keepContentsMounted]=\"true\"\n  [initialBreakpoint]=\"0.45\">\n  <ng-template>\n    <ion-datetime\n      (ionChange)=\"onMonthYearChange()\"\n      displayFormat=\"MM.YYYY\"\n      presentation=\"month-year\"\n      [(ngModel)]=\"currentDate\"\n      size=\"cover\"\n      [showDefaultButtons]=\"true\"></ion-datetime>\n  </ng-template>\n</ion-modal>\n\n<!-- <ion-modal [isOpen]=\"isModalOpen\" (ionDismiss)=\"isModalOpen = false\">\n  <ion-content *ngFor=\"let currEvent of lstCurrentDayEvents\">\n    <ion-header>\n      <ion-toolbar color=\"dark\">\n        <ion-title color=\"light\" *ngIf=\"currEvent.eventType=='Event'\">Event Detail</ion-title>\n        <ion-title color=\"light\" *ngIf=\"currEvent.eventType=='Holiday'\">Holiday Detail</ion-title>\n        <ion-title color=\"light\" *ngIf=\"currEvent.eventType=='Vacation'\">Vacation Detail</ion-title>\n        <ion-buttons slot=\"end\">\n          <ion-button (click)=\"cancel()\">Close</ion-button>\n        </ion-buttons>\n      </ion-toolbar>\n    </ion-header>\n    <ion-content class=\"ion-padding\" *ngIf=\"currEvent.eventType=='Event'\">\n      <ion-grid class=\"p-0 my-2 mb-4 modal-text-header\">\n        <ion-row>\n          <ion-col class=\"p-0\">\n            <ion-card-subtitle class=\"message-from\">\n              Event: <ion-text>{{currEvent.eventTitle}}</ion-text>\n            </ion-card-subtitle>\n          </ion-col>\n          <ion-col class=\"p-0\">\n            <ion-card-subtitle class=\"text-end\">{{currEvent.startDate}} To {{currEvent.endDate}}</ion-card-subtitle>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n      <ion-card-subtitle class=\"message-from\">\n        Event Description: <ion-text [innerHTML]=\"currEvent.eventDescription\"></ion-text>\n      </ion-card-subtitle>\n\n      <ion-card-subtitle class=\"message-from\">\n        <span class=\"bold-black-text\">Event Coordinator: &nbsp;</span>\n        <ion-text>{{ currEvent.eventCoordinator }}</ion-text>\n      </ion-card-subtitle>\n      <br>\n      <ion-card-subtitle class=\"message-from\"\n        *ngIf=\"currEvent.eventFess && currEvent.eventFess.length > 0 && currEvent.eventFess !== '0.0000'\">\n        <span class=\"bold-black-text\">Event Fees: &nbsp;</span>\n        <ion-text>{{ currEvent.eventFess }}</ion-text>\n      </ion-card-subtitle>\n\n      <div class=\"download\">\n        <ion-card-subtitle class=\"message-from\">\n          Event Files Download\n        </ion-card-subtitle>\n        <div class=\"uploaded-file-text\">\n          <span class=\"file-thumb\" *ngFor=\"let f of currEvent.parentLstEventDetail; let i = index\">\n            <img *ngIf=\"getFileExtension(f.fileName) === 'png'\" src=\"../../../../assets/img/img.png\" (click)=\"showFile(f)\" />\n            <img *ngIf=\"getFileExtension(f.fileName) === 'jpeg'\" src=\"../../../../assets/img/jpeg.png\" (click)=\"showFile(f)\" />\n            <img *ngIf=\"getFileExtension(f.fileName) === 'jpg'\" src=\"../../../../assets/img/jpg-image.png\" (click)=\"showFile(f)\" />\n            <img *ngIf=\"getFileExtension(f.fileName) === 'pdf'\" src=\"../../../../assets/img/pdf.png\" (click)=\"showFile(f)\" />\n            <img *ngIf=\"getFileExtension(f.fileName) === 'doc'\" src=\"../../../../assets/img/doc.png\" (click)=\"showFile(f)\" />\n            <img *ngIf=\"getFileExtension(f.fileName) === 'xls'\" src=\"../../../../assets/img/xlsx.png\" (click)=\"showFile(f)\" />\n            <img *ngIf=\"getFileExtension(f.fileName) === 'pptx'\" src=\"../../../../assets/img/ppt.png\" (click)=\"showFile(f)\" />\n            <img *ngIf=\"getFileExtension(f.fileName) === 'txt'\" src=\"../../../../assets/img/txt.png\" (click)=\"showFile(f)\" />\n            <img *ngIf=\"getFileExtension(f.fileName) === 'svg'\" src=\"../../../../assets/img/svg.png\" (click)=\"showFile(f)\" />\n            <img *ngIf=\"getFileExtension(f.fileName) === 'csv'\" src=\"../../../../assets/img/csv.png\" (click)=\"showFile(f)\" />\n            <img *ngIf=\"getFileExtension(f.fileName) === 'bmp'\" src=\"../../../../assets/img/bmp.png\" (click)=\"showFile(f)\" />\n            <img *ngIf=\"getFileExtension(f.fileName) === 'xlsx'\" src=\"../../../../assets/img/xlsx.png\" (click)=\"showFile(f)\" />\n          </span>\n        </div>\n      </div>\n    </ion-content>\n    <ion-content class=\"ion-padding\" *ngIf=\"currEvent.eventType=='Holiday'\">\n      <ion-card-subtitle class=\"message-from\">\n        Holiday Description: <ion-text [innerHTML]=\"currEvent.holidayReason\"></ion-text>\n      </ion-card-subtitle>\n    </ion-content>\n\n     <ion-content class=\"ion-padding\" *ngIf=\"currEvent.eventType=='Vacation'\">\n      <ion-card-subtitle class=\"message-from\">\n        Vacation Description: <ion-text [innerHTML]=\"currEvent.vacationName\"></ion-text>\n      </ion-card-subtitle>\n    </ion-content> -->\n\n    <!-- <ion-content class=\"ion-padding\" *ngIf=\"currEvent.eventType === 'Vacation'\">\n      <ion-grid class=\"p-0 my-2 mb-4 modal-text-header\">\n        <ion-row>\n          <ion-col class=\"p-0\">\n            <ion-card-subtitle class=\"message-from\">\n              <span class=\"bold-black-text\">Vacation: &nbsp;</span>\n              <ion-text>{{ currEvent.vacationName }}</ion-text>\n            </ion-card-subtitle>\n          </ion-col>\n          <ion-col class=\"p-0\">\n            <ion-card-subtitle class=\"text-end\">{{ currEvent.vacationStartDate }} To {{ currEvent.vacationEndDate }}</ion-card-subtitle>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-content>\n    \n  </ion-content>\n</ion-modal>  -->\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_parentApp_calendar_calendar_module_ts.js.map