(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_parentApp_timetable_timetable_module_ts"],{

/***/ 51011:
/*!***********************************************************************!*\
  !*** ./src/app/pages/parentApp/timetable/timetable-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TimetableRoutingModule: () => (/* binding */ TimetableRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _timetable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timetable.component */ 41331);




const routes = [{
  path: "",
  component: _timetable_component__WEBPACK_IMPORTED_MODULE_0__.TimetableComponent
}];
let TimetableRoutingModule = class TimetableRoutingModule {};
TimetableRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], TimetableRoutingModule);


/***/ }),

/***/ 41331:
/*!******************************************************************!*\
  !*** ./src/app/pages/parentApp/timetable/timetable.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TimetableComponent: () => (/* binding */ TimetableComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _timetable_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timetable.component.html?ngResource */ 27445);
/* harmony import */ var _timetable_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timetable.component.scss?ngResource */ 43947);
/* harmony import */ var _timetable_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_timetable_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ 39545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/user-service */ 4286);









let TimetableComponent = class TimetableComponent {
  constructor(routerOutlet, modalController, classTimeTableService, commonMethod, userService) {
    this.routerOutlet = routerOutlet;
    this.modalController = modalController;
    this.classTimeTableService = classTimeTableService;
    this.commonMethod = commonMethod;
    this.userService = userService;
    this.content_loaded = false;
    this.teacherPeriodList = [];
    this.teacherPeriodListCurrentDay = [];
    this.periodCount = 0;
  }
  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Timetable');
    this.currentDate = moment__WEBPACK_IMPORTED_MODULE_4__();
    this.currentDayNo = this.currentDate.day(); // == 0 ? 7 : this.currentDate.day();
    this.lstWeek = [{
      id: 1,
      value: 'Sun',
      isSelected: this.currentDayNo == 0
    }, {
      id: 2,
      value: 'Mon',
      isSelected: this.currentDayNo == 1
    }, {
      id: 3,
      value: 'Tue',
      isSelected: this.currentDayNo == 2
    }, {
      id: 4,
      value: 'Wed',
      isSelected: this.currentDayNo == 3
    }, {
      id: 5,
      value: 'Thur',
      isSelected: this.currentDayNo == 4
    }, {
      id: 6,
      value: 'Fri',
      isSelected: this.currentDayNo == 5
    }, {
      id: 7,
      value: 'Sat',
      isSelected: this.currentDayNo == 6
    }];
    this.classId = this.userService.CurrentSiblingClassId;
    this.userService.getAcademicYear().subscribe(result => {
      this.academicYearId = result;
      this.loadStudentPeriodList();
    });
  }
  ngOnInit() {}
  loadTeacherTimeTableForDay(dayNo) {
    this.lstWeek.forEach(day => {
      day.isSelected = day.id == dayNo;
    });
    this.teacherPeriodListCurrentDay = this.teacherPeriodList.filter(x => x.Day == dayNo);
  }
  compare(a, b) {
    if (a.EndDate < b.EndDate) {
      return -1;
    }
    if (a.EndDate > b.EndDate) {
      return 1;
    }
    return 0;
  }
  loadStudentPeriodList() {
    this.teacherPeriodList = [];
    let requestWrapper = {
      academicYearId: this.academicYearId,
      classId: this.classId
    };
    this.classTimeTableService.getStudentClassTimeTable(requestWrapper).subscribe(result => {
      this.content_loaded = true;
      if (result.classTimeTable.length > 0) {
        result.classTimeTable.forEach(classTimeData => {
          classTimeData.lstClassTimeTableRow.forEach(row => {
            row.lstClassTimeTableColumn.forEach(column => {
              this.teacherPeriodList.push({
                ClassName: classTimeData.className,
                Day: column.day,
                DayName: column.dayName,
                SubjectId: column.subjectId,
                SubjectName: column.subjectName,
                TeacherId: column.teacherId,
                TeacherName: column.teacherName,
                StartDate: moment__WEBPACK_IMPORTED_MODULE_4__().set({
                  hour: row.startingHour,
                  minute: row.startingMinute,
                  second: 0
                }),
                EndDate: moment__WEBPACK_IMPORTED_MODULE_4__().set({
                  hour: row.endingHour,
                  minute: row.endingMinute,
                  second: 0
                })
              });
              this.teacherPeriodListCurrentDay = this.teacherPeriodList.filter(x => x.Day == this.currentDayNo + 1).sort(this.compare);
            });
          });
        });
      }
      console.log(result);
    });
  }
  getPeriodIndex(index) {
    let currentIndex = 0;
    for (let i = 0; i <= index; i++) {
      if (this.teacherPeriodListCurrentDay[i].SubjectName && this.teacherPeriodListCurrentDay[i].TeacherName) {
        currentIndex++;
      }
    }
    return currentIndex;
  }
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRouterOutlet
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_2__.ClassTimeTableServiceProxy
  }, {
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_3__.CommonMethodService
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_5__.UserService
  }];
};
TimetableComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-timetable',
  template: _timetable_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_timetable_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], TimetableComponent);


/***/ }),

/***/ 1538:
/*!***************************************************************!*\
  !*** ./src/app/pages/parentApp/timetable/timetable.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TimetableModule: () => (/* binding */ TimetableModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _timetable_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timetable-routing.module */ 51011);
/* harmony import */ var _timetable_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timetable.component */ 41331);







let TimetableModule = class TimetableModule {};
TimetableModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _timetable_routing_module__WEBPACK_IMPORTED_MODULE_0__.TimetableRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule],
  declarations: [_timetable_component__WEBPACK_IMPORTED_MODULE_1__.TimetableComponent]
})], TimetableModule);


/***/ }),

/***/ 43947:
/*!*******************************************************************************!*\
  !*** ./src/app/pages/parentApp/timetable/timetable.component.scss?ngResource ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.time-wrapper {
  padding: 0 15px;
  padding-top: 0px;
}
.time-wrapper .period {
  position: relative;
  display: flex;
  padding-top: 30px;
  margin-bottom: 5px;
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
  background-color: #BC89E0;
  border-radius: 8px;
  padding: 12px 10px;
  margin-bottom: 0px;
  color: #000 !important;
}
.time-wrapper .period .class {
  font-size: 13px;
  font-weight: normal;
  width: 110px;
  color: #000 !important;
}
.time-wrapper .period .class span {
  display: block;
  width: 100%;
  color: #000 !important;
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
  color: #ee8013;
}
.time-wrapper .period .time .border-dashed {
  flex: 1 1 auto;
  border-bottom: 1px dashed #F97794;
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
  --background: #d5d8da;
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
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/timetable/timetable.component.scss"],"names":[],"mappings":"AAAA;EACI,eAAA;EACA,gBAAA;AACJ;AACI;EACI,kBAAA;EACA,aAAA;EACA,iBAAA;EACA,kBAAA;AACR;AAAQ;EACI,yBAAA;AAEZ;AAAQ;EACI,yBAAA;AAEZ;AAAQ;EACI,4BAAA;AAEZ;AAAQ;EACI,yBAAA;AAEZ;AAAQ;EACI,yBAAA;AAEZ;AAAQ;EACI,yBAAA;AAEZ;AAAQ;EACI,yBAAA;AAEZ;AAAQ;EACI,cAAA;EACA,WAAA;AAEZ;AAAQ;EACI,eAAA;EACA,gBAAA;EACA,yBAAA;EACA,kBAAA;EACA,kBAAA;EACA,kBAAA;EACA,sBAAA;AAEZ;AACQ;EACI,eAAA;EACA,mBAAA;EACA,YAAA;EACA,sBAAA;AACZ;AAAY;EACI,cAAA;EACA,WAAA;EACA,sBAAA;AAEhB;AAGQ;EACI,eAAA;EACA,mBAAA;EACA,kBAAA;EACA,MAAA;EACA,WAAA;EACA,aAAA;AADZ;AAEY;EACI,OAAA;EACA,mBAAA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,iBAAA;EACA,cAAA;AAAhB;AAGY;EACI,cAAA;EACA,iCAAA;AADhB;;AAOA;EACI,mBAAA;EACA,kBAAA;EACA,eAAA;EACA,cAAA;EACA,aAAA;EACA,eAAA;AAJJ;;AAQI;EACI,qBAAA;EACA,qBAAA;EAEA,gBAAA;EACA,eAAA;AANR;AAOQ;EACI,WAAA;EACA,kBAAA;EACA,cAAA;EACA,eAAA;EACA,WAAA;AALZ;AAMY;EACI,gBAAA;EACA,sBAAA;AAJhB;AAMY;EACI,gBAAA;EACA,yBAAA;AAJhB;AAOQ;EAEI,uDAAA;AANZ;AAQY;EACI,sBAAA;AANhB;;AAYA;EACI,gBAAA;AATJ;;AAYA;EACI,kBAAA;AATJ;AAUI;EACI,uBAAA;AARR;AASQ;EACI,gBAAA;EACA,iBAAA;AAPZ","sourcesContent":[".time-wrapper {\n    padding: 0 15px;\n    padding-top: 0px;\n    //background-color: #eef2f3;\n    .period {\n        position: relative;\n        display: flex;\n        padding-top: 30px;\n        margin-bottom: 5px;\n        &.color1 {\n            background-color: #b5d6d6;\n        }\n        &.color2 {\n            background-color: #ff7477;\n        }\n        &.color3 {\n            background-color: aquamarine;\n        }\n        &.color4 {\n            background-color: #e69597;\n        }\n        &.color5 {\n            background-color: #a0cedd;\n        }\n        &.color6 {\n            background-color: #b8c5d5;\n        }\n        &.color7 {\n            background-color: #f7e78e;\n        }\n        span {\n            display: block;\n            width: 100%;\n        }\n        .subject {\n            font-size: 13px;\n            font-weight: 500;\n            background-color: #BC89E0;\n            border-radius: 8px;\n            padding: 12px 10px;\n            margin-bottom: 0px;\n            color: #000 !important;\n        }\n\n        .class {\n            font-size: 13px;\n            font-weight: normal;\n            width: 110px;\n            color: #000 !important;\n            span {\n                display: block;\n                width: 100%;\n                color: #000 !important;\n\n            }\n        }\n\n        .time {\n            font-size: 13px;\n            font-weight: normal;\n            position: absolute;\n            top: 0;\n            width: 100%;\n            display: flex;\n            .left {\n                flex: 1;\n                white-space: nowrap;\n                position: relative;\n                top: 8px;\n                padding: 0;\n                margin-right: 7px;\n                color: #ee8013;\n\n            }\n            .border-dashed {\n                flex: 1 1 auto;\n                border-bottom: 1px dashed #F97794;\n            }\n        }\n    }\n}\n\n.white-space {\n    white-space: nowrap;\n    overflow-x: scroll;\n    padding: 15px 0;\n    padding-top: 0;\n    display: flex;\n    column-gap: 4px;\n}\n\n.month {\n    ion-chip {\n        display: inline-block;\n        --background: #d5d8da;\n        //box-shadow: 0px 0px 3px 1px #dfe6ed;\n        padding: 8px 2px;\n        min-width: 40px;\n        ion-label {\n            width: 100%;\n            text-align: center;\n            display: block;\n            font-size: 11px;\n            color: #000;\n            &.day {\n                font-weight: 500;\n                color: #000 !important;\n            }\n            &.date {\n                font-weight: 500;\n                color: #525151 !important;\n            }\n        }\n        &.selected {\n            //--background: var(--dark-bg-color) !important;\n            --background: linear-gradient(135deg, #da8e63, #c754aa);\n\n            ion-label {\n                color: #fff !important;\n            }\n        }\n    }\n}\n\n.fw-500 {\n    font-weight: 500;\n}\n\n.date-header {\n    padding-left: 15px;\n    ion-card-subtitle {\n        text-transform: initial;\n        span + span {\n            font-weight: 500;\n            letter-spacing: 0;        }\n    }\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 27445:
/*!*******************************************************************************!*\
  !*** ./src/app/pages/parentApp/timetable/timetable.component.html?ngResource ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n  \n  <ion-content class=\"light-content\" [fullscreen]=\"true\">\n    <ion-refresher slot=\"fixed\" (ionRefresh)=\"handleRefresh($event)\">\n      <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n    <ng-container *ngIf=\"!content_loaded\">\n      <ion-list-header class=\"ion-list-header-small\">\n        <ion-label><ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text></ion-label>\n        <ion-note color=\"tertiary\" class=\"ion-note-small\">\n          <ion-skeleton-text animated style=\"width: 40px\"></ion-skeleton-text>\n        </ion-note>\n      </ion-list-header>\n  \n      <ion-list\n        class=\"list-custom animate__animated animate__fadeIn\"\n        lines=\"full\"\n      >\n        <ion-item\n          color=\"light\"\n          button\n          detail=\"false\"\n          *ngFor=\"let i of [].constructor(12)\"\n        >\n          <ion-avatar slot=\"start\" class=\"ion-avatar-default-icon\">\n            <ion-skeleton-text animated></ion-skeleton-text>\n          </ion-avatar>\n          <ion-label>\n            <h3>\n              <ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text>\n            </h3>\n            <p>\n              <ion-skeleton-text animated style=\"width: 75%\"></ion-skeleton-text>\n            </p>\n          </ion-label>\n          <ion-skeleton-text\n            slot=\"end\"\n            animated\n            style=\"width: 15%\"\n          ></ion-skeleton-text>\n        </ion-item>\n      </ion-list>\n    </ng-container>\n    <ng-container *ngIf=\"content_loaded\">\n       <div class=\"white-space month\" scroll-x=\"true\">\n          <ion-chip [ngClass]=\"{'selected': day.isSelected}\" (click)=\"loadTeacherTimeTableForDay(day.id)\" class=\"selected\" *ngFor=\"let day of lstWeek\">\n            <ion-label class=\"day\">{{day.value}}</ion-label>\n          </ion-chip>\n        </div>\n        <div class=\"time-wrapper\">\n            <div class=\"period\"  *ngFor=\"let period of teacherPeriodListCurrentDay;let i=index\">\n              <span class=\"time\"><span class=\"left\">{{period.StartDate.format('hh:mm A')}} to {{period.EndDate.format('hh:mm A')}}</span> <span class=\"border-dashed\"></span></span>\n              <span class=\"class\" *ngIf=\"period.SubjectName && period.TeacherName\"><span class=\"fw-bold dark-color\">{{period.ClassName}}</span>\n               <span class=\"black-color fw-500\" *ngIf=\"period.SubjectName && period.TeacherName\">Period {{ getPeriodIndex(i) }}</span></span>\n                <span class=\"subject\" *ngIf=\"period.SubjectName && period.TeacherName\">{{period.SubjectName}} , {{period.TeacherName}}</span>\n                <span class=\"class\" *ngIf=\"!period.SubjectName || !period.TeacherName\"><span class=\"fw-bold dark-color\"></span>\n               <span class=\"black-color fw-500\" *ngIf=\"!period.SubjectName || !period.TeacherName\"></span></span>\n                <span class=\"subject\" *ngIf=\"!period.SubjectName || !period.TeacherName\">Recess</span>\n            </div>\n            \n        </div>\n    </ng-container>\n  \n  </ion-content>\n\n \n  \n  ";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_parentApp_timetable_timetable_module_ts.js.map