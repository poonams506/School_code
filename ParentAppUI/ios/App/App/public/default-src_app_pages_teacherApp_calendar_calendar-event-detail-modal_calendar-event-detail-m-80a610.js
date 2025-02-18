(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_pages_teacherApp_calendar_calendar-event-detail-modal_calendar-event-detail-m-80a610"],{

/***/ 48384:
/*!****************************************************************************************************************!*\
  !*** ./src/app/pages/teacherApp/calendar/calendar-event-detail-modal/calendar-event-detail-modal.component.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalendarEventDetailModalComponent: () => (/* binding */ CalendarEventDetailModalComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _calendar_event_detail_modal_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendar-event-detail-modal.component.html?ngResource */ 63880);
/* harmony import */ var _calendar_event_detail_modal_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendar-event-detail-modal.component.css?ngResource */ 74605);
/* harmony import */ var _calendar_event_detail_modal_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_calendar_event_detail_modal_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ 39545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);






let CalendarEventDetailModalComponent = class CalendarEventDetailModalComponent {
  constructor(modalCtrl) {
    this.modalCtrl = modalCtrl;
  }
  ngOnInit() {}
  getFormattedEventDuration() {
    let startDate = moment__WEBPACK_IMPORTED_MODULE_2__({
      year: this.currentEventOnPopup.ngbStartDate.year,
      month: this.currentEventOnPopup.ngbStartDate.month,
      day: this.currentEventOnPopup.ngbStartDate.day,
      hour: this.currentEventOnPopup.ngbStartTime.hour,
      minute: this.currentEventOnPopup.ngbStartTime.minute
    });
    let endDate = moment__WEBPACK_IMPORTED_MODULE_2__({
      year: this.currentEventOnPopup.ngbEndDate.year,
      month: this.currentEventOnPopup.ngbEndDate.month,
      day: this.currentEventOnPopup.ngbEndDate.day,
      hour: this.currentEventOnPopup.ngbEndTime.hour,
      minute: this.currentEventOnPopup.ngbEndTime.minute
    });
    return startDate.format('MMMM D, YYYY hh:mm A') + " - " + endDate.format('MMMM D, YYYY hh:mm A');
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
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.ModalController
  }];
  static #_2 = this.propDecorators = {
    currentEventOnPopup: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input
    }]
  };
};
CalendarEventDetailModalComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  selector: 'app-calendar-event-detail-modal',
  template: _calendar_event_detail_modal_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_calendar_event_detail_modal_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], CalendarEventDetailModalComponent);


/***/ }),

/***/ 74605:
/*!****************************************************************************************************************************!*\
  !*** ./src/app/pages/teacherApp/calendar/calendar-event-detail-modal/calendar-event-detail-modal.component.css?ngResource ***!
  \****************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.bold-black-text {
    font-weight: bold;
    color: black;
    margin-right: 5px; 
}

.thumbnail-icon {
    width: 60px;
    height: 60px;
  }
  .to {
    display: block;
    text-align: center;
    color: #000;
    text-transform: capitalize;
    font-size: 12px;
    width: 50px;
}

ion-title {
  --color: #000 !important;
  color: #000 !important;

}`, "",{"version":3,"sources":["webpack://./src/app/pages/teacherApp/calendar/calendar-event-detail-modal/calendar-event-detail-modal.component.css"],"names":[],"mappings":"AAAA;IACI,iBAAiB;IACjB,YAAY;IACZ,iBAAiB;AACrB;;AAEA;IACI,WAAW;IACX,YAAY;EACd;EACA;IACE,cAAc;IACd,kBAAkB;IAClB,WAAW;IACX,0BAA0B;IAC1B,eAAe;IACf,WAAW;AACf;;AAEA;EACE,wBAAwB;EACxB,sBAAsB;;AAExB","sourcesContent":[".bold-black-text {\n    font-weight: bold;\n    color: black;\n    margin-right: 5px; \n}\n\n.thumbnail-icon {\n    width: 60px;\n    height: 60px;\n  }\n  .to {\n    display: block;\n    text-align: center;\n    color: #000;\n    text-transform: capitalize;\n    font-size: 12px;\n    width: 50px;\n}\n\nion-title {\n  --color: #000 !important;\n  color: #000 !important;\n\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 63880:
/*!*****************************************************************************************************************************!*\
  !*** ./src/app/pages/teacherApp/calendar/calendar-event-detail-modal/calendar-event-detail-modal.component.html?ngResource ***!
  \*****************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n      <ion-header>\n        <ion-toolbar>\n          <ion-title color=\"light\" *ngIf=\"currentEventOnPopup.eventType=='Event'\">Event Detail</ion-title>\n          <ion-title color=\"light\" *ngIf=\"currentEventOnPopup.eventType=='Holiday'\">Holiday Detail</ion-title>\n          <ion-title color=\"light\" *ngIf=\"currentEventOnPopup.eventType=='Vacation'\">Vacation Detail</ion-title>\n          <ion-title color=\"light\" *ngIf=\"currentEventOnPopup.eventType=='Vacation'\">Weekly Off Detail</ion-title>\n\n\n         \n          <ion-buttons slot=\"end\">\n            <ion-button  (click)=\"cancel()\">Close</ion-button>\n          </ion-buttons>\n        </ion-toolbar>\n      </ion-header>\n      <ion-content class=\"ion-padding\" *ngIf=\"currentEventOnPopup.eventType=='Event'\" >\n       \n        <ion-grid  class=\"p-0 my-2 mb-4 modal-text-header\">\n          <ion-row>\n            <ion-col  class=\"p-0\">\n              <ion-card-subtitle class=\"message-from\"\n                ><span class=\"bold-black-text\">Event Title : &nbsp; </span> <ion-text>{{currentEventOnPopup.eventTitle}}</ion-text>\n              </ion-card-subtitle>\n              <br>\n              <ion-card-subtitle class=\"message-from\"><span class=\"bold-black-text\">Event Date : &nbsp; </span> {{currentEventOnPopup.startDate .format('DD-MMM-YYYY')}} To {{currentEventOnPopup.endDate .format('DD-MMM-YYYY')}}\n              </ion-card-subtitle>\n              <br>\n              <ng-container *ngIf=\"currentEventOnPopup && currentEventOnPopup.startTime && currentEventOnPopup.endTime\">\n                <ion-card-subtitle class=\"message-from\">\n                  <span class=\"bold-black-text\">Event Time: &nbsp; </span>\n                  <ion-text>\n                    {{ currentEventOnPopup.startTime .format('hh:mm a')  }}\n                    <b>To</b> {{ currentEventOnPopup.endTime .format('hh:mm a') }}\n                  </ion-text>\n                </ion-card-subtitle>\n              </ng-container>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n        <ion-card-subtitle class=\"message-from\"\n                ><span class=\"bold-black-text\">Event Description:  &nbsp; </span><ion-text [innerHTML]=\"currentEventOnPopup.eventDescription\"></ion-text>\n        </ion-card-subtitle>\n        <br>\n        <ion-card-subtitle class=\"message-from\">\n          <span class=\"bold-black-text\">Event Coordinator: &nbsp;</span>\n          <ion-text>{{ currentEventOnPopup.eventCoordinator }}</ion-text>\n        </ion-card-subtitle>\n        <br>\n        <ion-card-subtitle class=\"message-from\" *ngIf=\"currentEventOnPopup.eventFess && currentEventOnPopup.eventFess > 0\">\n          <span class=\"bold-black-text\">Event Fees: &nbsp;</span>\n          <ion-text>{{ currentEventOnPopup.eventFess | number:'1.0-4' }}</ion-text>\n        </ion-card-subtitle>\n        <br>\n        <div class=\"download\">\n          <ion-card-subtitle class=\"message-from\" *ngIf=\"currentEventOnPopup.lstEventDetail && currentEventOnPopup.lstEventDetail.length > 0\">\n            <span class=\"bold-black-text\">Event Files Download : &nbsp; </span>\n          </ion-card-subtitle>\n          <div class=\"uploaded-file-text\">\n            <span class=\"file-thumb\" *ngFor=\"let f of currentEventOnPopup.lstEventDetail; let i = index\">\n              <img *ngIf=\"getFileExtension(f.fileName) === 'png'\" src=\"../../../../assets/img/img.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n              <img *ngIf=\"getFileExtension(f.fileName) === 'jpeg'\" src=\"../../../../assets/img/jpeg.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n              <img *ngIf=\"getFileExtension(f.fileName) === 'jpg'\" src=\"../../../../assets/img/jpg-image.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n              <img *ngIf=\"getFileExtension(f.fileName) === 'pdf'\" src=\"../../../../assets/img/pdf.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n              <img *ngIf=\"getFileExtension(f.fileName) === 'doc'\" src=\"../../../../assets/img/doc.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n              <img *ngIf=\"getFileExtension(f.fileName) === 'xls'\" src=\"../../../../assets/img/xlsx.png.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n              <img *ngIf=\"getFileExtension(f.fileName) === 'pptx'\" src=\"../../../../assets/img/ppt.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n              <img *ngIf=\"getFileExtension(f.fileName) === 'txt'\" src=\"../../../../assets/img/txt.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n              <img *ngIf=\"getFileExtension(f.fileName) === 'svg'\" src=\"../../../../assets/img/svg.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n              <img *ngIf=\"getFileExtension(f.fileName) === 'csv'\" src=\"../../../../assets/img/csv.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n              <img *ngIf=\"getFileExtension(f.fileName) === 'bmp'\" src=\"../../../../assets/img/bmp.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n              <img *ngIf=\"getFileExtension(f.fileName) === 'xlsx'\" src=\"../../../../assets/img/xlsx.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n            </span>\n          </div>\n        </div>\n        \n      </ion-content>\n      <ion-content class=\"ion-padding\" *ngIf=\"currentEventOnPopup.eventType=='Holiday'\" >\n        <ion-card-subtitle class=\"message-from\">\n          <span class=\"bold-black-text\">Holiday Date: &nbsp;</span>\n          <ion-text>\n            {{ currentEventOnPopup.calendarDate .format('DD-MMM-YYYY') }}\n          </ion-text>\n        </ion-card-subtitle>\n        <br>\n        <ion-card-subtitle class=\"message-from\"\n                > <span class=\"bold-black-text\">Holiday Description:  &nbsp; </span>  <ion-text [innerHTML]=\"currentEventOnPopup.holidayReason\"></ion-text>\n        </ion-card-subtitle>\n       \n       \n\n       \n      </ion-content>\n      <ion-content class=\"ion-padding\" *ngIf=\"currentEventOnPopup.eventType=='WeeklyOff'\" >\n        <ion-card-subtitle class=\"message-from\">\n          <span class=\"bold-black-text\">WeeklyOff Date: &nbsp;</span>\n          <ion-text>\n            {{ currentEventOnPopup.weeklyOffDate .format('DD-MMM-YYYY') }}\n          </ion-text>\n        </ion-card-subtitle>\n        <br>\n        <ion-card-subtitle class=\"message-from\"\n                > <span class=\"bold-black-text\">WeeklyOff Description:  &nbsp; </span>  <ion-text [innerHTML]=\"currentEventOnPopup.weeklyOffName\"></ion-text>\n        </ion-card-subtitle>\n       \n       \n\n       \n      </ion-content>\n\n      <ion-content class=\"ion-padding\" *ngIf=\"currentEventOnPopup.eventType=='Vacation'\" >\n        <ion-card-subtitle class=\"message-from\">\n          <span class=\"bold-black-text\">Start Date: &nbsp;</span>\n          <ion-text>\n            {{ currentEventOnPopup.vacationStartDate .format('DD-MMM-YYYY') }}\n          </ion-text>\n        </ion-card-subtitle>\n        <br>\n        <ion-card-subtitle class=\"message-from\">\n          <span class=\"bold-black-text\">End Date: &nbsp;</span>\n          <ion-text>\n            {{ currentEventOnPopup.vacationEndDate .format('DD-MMM-YYYY') }}\n          </ion-text>\n        </ion-card-subtitle>\n        <br>\n        <ion-card-subtitle class=\"message-from\"> \n          <span class=\"bold-black-text\">Vacation Description:  &nbsp; </span> \n           <ion-text [innerHTML]=\"currentEventOnPopup.vacationName\"></ion-text>\n        </ion-card-subtitle>\n      </ion-content>";

/***/ })

}]);
//# sourceMappingURL=default-src_app_pages_teacherApp_calendar_calendar-event-detail-modal_calendar-event-detail-m-80a610.js.map