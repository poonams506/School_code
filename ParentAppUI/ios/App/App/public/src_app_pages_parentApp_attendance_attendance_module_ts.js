(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_parentApp_attendance_attendance_module_ts"],{

/***/ 23523:
/*!*************************************************************************!*\
  !*** ./src/app/pages/parentApp/attendance/attendance-routing.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttendanceRoutingModule: () => (/* binding */ AttendanceRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _attendance_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attendance.component */ 13747);




const routes = [{
  path: '',
  component: _attendance_component__WEBPACK_IMPORTED_MODULE_0__.AttendanceComponent
}];
let AttendanceRoutingModule = class AttendanceRoutingModule {};
AttendanceRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], AttendanceRoutingModule);


/***/ }),

/***/ 13747:
/*!********************************************************************!*\
  !*** ./src/app/pages/parentApp/attendance/attendance.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttendanceComponent: () => (/* binding */ AttendanceComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _attendance_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attendance.component.html?ngResource */ 17253);
/* harmony import */ var _attendance_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attendance.component.scss?ngResource */ 53067);
/* harmony import */ var _attendance_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_attendance_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! highcharts */ 77859);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var src_app_services_helper_helper_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/helper/helper.service */ 55979);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment */ 39545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);










let AttendanceComponent = class AttendanceComponent {
  constructor(helperService, studentAttendanceService, userService, commonMethod, parentAppService) {
    this.helperService = helperService;
    this.studentAttendanceService = studentAttendanceService;
    this.userService = userService;
    this.commonMethod = commonMethod;
    this.parentAppService = parentAppService;
    this.currentAttendanceDate = moment__WEBPACK_IMPORTED_MODULE_6__().format('YYYY-MM-DD');
    this.content_loaded = false;
    this.studentAttendance = [];
    this.lstMonthStudentAttendance = [];
    this.highcharts = highcharts__WEBPACK_IMPORTED_MODULE_2__;
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Attendance');
    this.initializePieChart();
    // this.userService.getAcademicYear().subscribe((academicYearId)=>{
    //   this.academicYearId=academicYearId;
    this.parentAppService.getAttendanceDetailByStudentId(this.userService.CurrentSiblingId).subscribe(attendanceResult => {
      this.studentAttendance = attendanceResult.lstStudentAttendance;
      this.onMonthYearChange();
      this.content_loaded = true;
    });
  }
  ngOnInit() {}
  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  getAllDatesInMonth() {
    const dates = [];
    const lastDay = parseInt(moment__WEBPACK_IMPORTED_MODULE_6__({
      year: this.currentYear,
      month: this.currentMonth,
      day: 1
    }).endOf('month').format('DD'));
    for (let day = 1; day <= lastDay; day++) {
      dates.push(moment__WEBPACK_IMPORTED_MODULE_6__({
        year: this.currentYear,
        month: this.currentMonth,
        day: day
      }));
    }
    return dates;
  }
  onMonthYearChange() {
    this.currentMonth = moment__WEBPACK_IMPORTED_MODULE_6__(this.currentAttendanceDate, 'YYYY-MM-DD').month();
    this.currentYear = moment__WEBPACK_IMPORTED_MODULE_6__(this.currentAttendanceDate, 'YYYY-MM-DD').year();
    const startDate = moment__WEBPACK_IMPORTED_MODULE_6__(this.currentAttendanceDate, 'YYYY-MM-DD').startOf('month').format('YYYY-MM-DD');
    const endDate = moment__WEBPACK_IMPORTED_MODULE_6__(this.currentAttendanceDate, 'YYYY-MM-DD').endOf('month').format('YYYY-MM-DD');
    this.parentAppService.getAttendanceDetailByStudentId(this.userService.CurrentSiblingId).subscribe(attendanceResult => {
      this.studentAttendance = attendanceResult.lstStudentAttendance.filter(item => moment__WEBPACK_IMPORTED_MODULE_6__(item.attendanceDateTime).isBetween(startDate, endDate, null, '[]'));
      this.calculateAttendance();
    });
  }
  calculateAttendance() {
    // Calculate the total days in the current month
    let totalDays = moment__WEBPACK_IMPORTED_MODULE_6__(this.currentAttendanceDate, 'YYYY-MM-DD').daysInMonth();
    // Calculate the number of absent, present, half days, and unmarked days
    let absentDays = this.studentAttendance.filter(x => x.statusId == 3).length;
    let presentDays = this.studentAttendance.filter(x => x.statusId == 1).length;
    let halfDays = this.studentAttendance.filter(x => x.statusId == 2).length;
    let unmarkedDays = totalDays - (absentDays + presentDays + halfDays);
    // Calculate the percentages
    let absentPercentage = absentDays / totalDays * 100;
    let presentPercentage = presentDays / totalDays * 100;
    let halfDayPercentage = halfDays / totalDays * 100;
    let unmarkedPercentage = unmarkedDays / totalDays * 100;
    // Update the chart data
    this.chartOptions.series[0]['data'] = [{
      name: 'Absent',
      color: '#F97794',
      y: absentPercentage
    }, {
      name: 'Unmarked',
      color: '#BC89E0',
      y: unmarkedPercentage
    }, {
      name: 'Present',
      color: '#44C0B1',
      y: presentPercentage
    }, {
      name: 'Half Day',
      color: '#FFA500',
      y: halfDayPercentage
    }];
    // Update the chart title
    this.chartOptions.title.text = `${this.months[this.currentMonth]} ${this.currentYear}`;
    // Update the chart
    this.highcharts.charts[0].update({
      series: this.chartOptions.series,
      title: this.chartOptions.title
    });
  }
  initializePieChart() {
    let totalDays = moment__WEBPACK_IMPORTED_MODULE_6__(this.currentAttendanceDate, 'YYYY-MM-DD').daysInMonth();
    let absentDays = this.studentAttendance.filter(x => x.statusId == 3).length;
    let presentDays = this.studentAttendance.filter(x => x.statusId == 1).length;
    let halfDays = this.studentAttendance.filter(x => x.statusId == 2).length;
    let unmarkedDays = totalDays - (absentDays + presentDays + halfDays);
    let absentPercentage = absentDays / totalDays * 100;
    let presentPercentage = presentDays / totalDays * 100;
    let halfDayPercentage = halfDays / totalDays * 100;
    let unmarkedPercentage = unmarkedDays / totalDays * 100;
    this.chartOptions = {
      chart: {
        type: 'pie',
        backgroundColor: '#fff',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
        },
        style: {
          fontFamily: '"Poppins", sans-serif'
        }
      },
      title: {
        text: `${this.months[this.currentMonth]} ${this.currentYear}`,
        style: {
          color: '#000'
        }
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: true,
            format: '{point.name}: <b>{point.percentage:.1f}%</b>'
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Attendance',
        data: [{
          name: 'Absent',
          color: '#F97794',
          y: absentPercentage
        }, {
          name: 'Unmarked',
          color: '#BC89E0',
          y: unmarkedPercentage
        }, {
          name: 'Present',
          color: '#44C0B1',
          y: presentPercentage
        }, {
          name: 'Half Day',
          color: '#FFA500',
          y: halfDayPercentage
        }]
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal'
            }
          }
        }]
      },
      credits: {
        enabled: false
      }
    };
  }
  static #_ = this.ctorParameters = () => [{
    type: src_app_services_helper_helper_service__WEBPACK_IMPORTED_MODULE_3__.HelperService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.StudentAttendanceServiceProxy
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_5__.UserService
  }, {
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_7__.CommonMethodService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.ParentAppServiceProxy
  }];
};
AttendanceComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  selector: 'app-charts',
  template: _attendance_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_attendance_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], AttendanceComponent);


/***/ }),

/***/ 48738:
/*!*****************************************************************!*\
  !*** ./src/app/pages/parentApp/attendance/attendance.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttendanceModule: () => (/* binding */ AttendanceModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _attendance_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attendance-routing.module */ 23523);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-charts */ 16045);
/* harmony import */ var _attendance_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attendance.component */ 13747);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! highcharts-angular */ 14215);









let AttendanceModule = class AttendanceModule {};
AttendanceModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _attendance_routing_module__WEBPACK_IMPORTED_MODULE_0__.AttendanceRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, ng2_charts__WEBPACK_IMPORTED_MODULE_7__.NgChartsModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_8__.HighchartsChartModule],
  declarations: [_attendance_component__WEBPACK_IMPORTED_MODULE_1__.AttendanceComponent]
})], AttendanceModule);


/***/ }),

/***/ 53067:
/*!*********************************************************************************!*\
  !*** ./src/app/pages/parentApp/attendance/attendance.component.scss?ngResource ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:host ion-item {
  --min-height:35px;
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
  background-color: #d0d1eb;
  padding: 0px;
}
ion-list ion-badge {
  font-weight: normal;
}

.box-wrapper .box {
  flex: 1;
  font-size: 12px;
  color: var(--dark-color);
}
.box-wrapper .box icon-badge {
  font-weight: normal;
}
.box-wrapper.header {
  --background: #dee2e6;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/attendance/attendance.component.scss"],"names":[],"mappings":"AACI;EACI,iBAAA;AAAR;AAEI;EACI,gBAAA;AAAR;AAEI;EACI,gBAAA;AAAR;;AAGA;EACI,gBAAA;EACA,sBAAA;EACA,aAAA;EACA,cAAA;EACA,wBAAA;AAAJ;;AAGA;EACI,eAAA;EACA,cAAA;AAAJ;;AAGA;EACI,yBAAA;EACA,YAAA;AAAJ;AAEI;EACI,mBAAA;AAAR;;AAMI;EACI,OAAA;EACA,eAAA;EACA,wBAAA;AAHR;AAIQ;EACI,mBAAA;AAFZ;AAKA;EACI,qBAAA;AAHJ","sourcesContent":[":host {\n    ion-item {\n        --min-height:35px;\n    }\n    .header-md {\n        box-shadow: none;\n    }\n    ion-card {\n        border-radius: 0;\n    }\n}\nhighcharts-chart {\n    overflow: hidden;\n    width: 100% !important;\n    display: flex;\n    margin: 0 auto;\n    height: 300px !important;\n}\n\n.font18 {\n    font-size: 18px;\n    margin: 10px 0;\n}\n\nion-list {\n    background-color: #d0d1eb;\n    padding: 0px;\n\n    ion-badge {\n        font-weight: normal;\n    }\n}\n\n.box-wrapper {\n    \n    .box {\n        flex: 1;\n        font-size: 12px;\n        color: var(--dark-color);\n        icon-badge {\n            font-weight: normal;\n        }\n        }\n&.header {\n    --background: #dee2e6;\n}\n        \n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 17253:
/*!*********************************************************************************!*\
  !*** ./src/app/pages/parentApp/attendance/attendance.component.html?ngResource ***!
  \*********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n<ion-content [fullscreen]=\"true\" class=\"light-content\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"handleRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n    <ion-card class=\"ion-no-margin ion-card-chart animate__animated animate__fadeIn dark-bg-color\">\n    <!-- Skeletons -->\n\n    <!-- Chart -->\n <ng-container *ngIf=\"content_loaded\">\n      <highcharts-chart [Highcharts]=\"highcharts\" [options]=\"chartOptions\" >\n      </highcharts-chart>\n  </ng-container>\n  </ion-card>\n\n  <ng-container *ngIf=\"!content_loaded\">\n    <ion-list color=\"light\" class=\"list-custom animate__animated animate__fadeIn\" lines=\"full\">\n      <ion-item color=\"light\" button detail=\"false\" *ngFor=\"let i of [].constructor(12);\">\n        <ion-label>\n          <h3><ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text></h3>\n          <p><ion-skeleton-text animated style=\"width: 65%\"></ion-skeleton-text></p>\n        </ion-label>\n        <ion-skeleton-text slot=\"end\" animated style=\"width: 15%\"></ion-skeleton-text>\n      </ion-item>\n    </ion-list>\n  </ng-container>\n\n  <ng-container *ngIf=\"content_loaded\">\n    \n    <ion-list class=\"mt-0 rounded-0\">\n      <ion-item class=\"box-wrapper header\">\n        <ion-label class=\"box\">Date</ion-label>\n        <ion-label class=\"box\">Day</ion-label>\n        <ion-label class=\"box\">Status</ion-label>\n      </ion-item>\n\n      <ion-item class=\"box-wrapper white-bg-color\"  *ngFor = \"let item of studentAttendance\">\n        <ion-label class=\"box\">{{item.attendanceDateTime.format('DD-MM-YYYY')}}</ion-label>\n        <ion-label class=\"box\">{{item.attendanceDateTime.format('dddd')}}</ion-label>\n        <div class=\"box\">\n          <ion-badge color=\"success\" *ngIf='item.statusId === 1'>Present</ion-badge>\n          <ion-badge color=\"secondary\" *ngIf='item.statusId === 2'>HalF Day</ion-badge>\n          <ion-badge color=\"danger\" *ngIf='item.statusId === 3'>Absent</ion-badge>\n          <ion-badge color=\"warning\" *ngIf='item.statusId === -1'>Unmarked</ion-badge>\n        </div>\n      </ion-item>\n    </ion-list>\n    </ng-container>\n\n    <ion-fab slot=\"fixed\" vertical=\"bottom\" horizontal=\"end\">\n      <ion-fab-button  id=\"open-modal2\">\n        <ion-icon name=\"calendar-outline\"></ion-icon>\n      </ion-fab-button>\n    </ion-fab>\n</ion-content>\n\n\n\n\n<!-- <ion-modal\n  trigger=\"open-modal2\"\n  [cssClass]=\"'bottom-end'\"\n  [keepContentsMounted]=\"true\"\n  [initialBreakpoint]=\"0.65\"\n>\n  <ng-template>\n    <ion-datetime\n      (ionChange)=\"onMonthYearChange()\"\n      displayFormat=\"MM.YYYY\"\n      presentation=\"month-year\"\n      [(ngModel)]=\"currentAttendanceDate\"\n      size=\"cover\"\n      [showDefaultButtons]=\"true\"\n    ></ion-datetime>\n  </ng-template>\n</ion-modal> -->\n\n\n<ion-modal\n  trigger=\"open-modal2\"\n  [cssClass]=\"'bottom-end'\"\n  [keepContentsMounted]=\"true\"\n  [initialBreakpoint]=\"0.40\"\n>\n  <ng-template>\n    <ion-datetime\n      (ionChange)=\"onMonthYearChange()\"\n      displayFormat=\"MM.YYYY\"\n      presentation=\"month-year\"\n       [showDefaultButtons]=\"true\"\n      [(ngModel)]=\"currentAttendanceDate\"\n      size=\"cover\"\n    ></ion-datetime>\n  </ng-template>\n</ion-modal>\n";

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
//# sourceMappingURL=src_app_pages_parentApp_attendance_attendance_module_ts.js.map