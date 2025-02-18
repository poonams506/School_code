(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_parentApp_fees_fees_module_ts"],{

/***/ 14214:
/*!************************************************************************************************!*\
  !*** ./src/app/pages/parentApp/fees/fee-installment-info-details/view-fee-info-detail.page.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewFeeInfoDetailPage: () => (/* binding */ ViewFeeInfoDetailPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _view_fee_info_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-fee-info-detail.page.html?ngResource */ 92554);
/* harmony import */ var _view_fee_info_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view-fee-info-detail.page.scss?ngResource */ 44524);
/* harmony import */ var _view_fee_info_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_view_fee_info_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ 39545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);






let ViewFeeInfoDetailPage = class ViewFeeInfoDetailPage {
  constructor(modalCtrl) {
    this.modalCtrl = modalCtrl;
  }
  ngOnInit() {}
  close() {
    return this.modalCtrl.dismiss(false, 'cancel');
  }
  getFormattedDate(date) {
    return moment__WEBPACK_IMPORTED_MODULE_2__(date).format('DD-MM-YYYY'); // format date using moment.js
  }
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.ModalController
  }];
};
ViewFeeInfoDetailPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  selector: 'view-fee-info-detail',
  template: _view_fee_info_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_view_fee_info_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], ViewFeeInfoDetailPage);


/***/ }),

/***/ 49807:
/*!*************************************************************!*\
  !*** ./src/app/pages/parentApp/fees/fees-routing.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FeesRoutingModule: () => (/* binding */ FeesRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _fees_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fees.component */ 9215);




const routes = [{
  path: '',
  component: _fees_component__WEBPACK_IMPORTED_MODULE_0__.FeesComponent
}];
let FeesRoutingModule = class FeesRoutingModule {};
FeesRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], FeesRoutingModule);


/***/ }),

/***/ 9215:
/*!********************************************************!*\
  !*** ./src/app/pages/parentApp/fees/fees.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FeesComponent: () => (/* binding */ FeesComponent)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _fees_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fees.component.html?ngResource */ 99161);
/* harmony import */ var _fees_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fees.component.scss?ngResource */ 1147);
/* harmony import */ var _fees_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fees_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var src_app_services_helper_helper_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/helper/helper.service */ 55979);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ 39545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _fee_installment_info_details_view_fee_info_detail_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fee-installment-info-details/view-fee-info-detail.page */ 14214);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 37401);












let FeesComponent = class FeesComponent {
  constructor(helperService, commonMethod, userService, parentAppService, modalController) {
    this.helperService = helperService;
    this.commonMethod = commonMethod;
    this.userService = userService;
    this.parentAppService = parentAppService;
    this.modalController = modalController;
    this.feePaymentDetails = new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_5__.FeePaymentTopSectionDto();
    this.type = 'dues';
    // Doughnut
    this.doughnutChartLabels = ["Paid Amount", "Due Amount", "Discount Amount"];
    this.doughnutChartData = {
      //labels: this.doughnutChartLabels,
      datasets: [{
        data: [350, 450, 450],
        backgroundColor: ['green', 'red', 'blue'],
        borderWidth: 0
      }]
    };
    this.doughnutChartType = "doughnut";
    this.options = {
      legend: {
        display: true,
        labels: {
          usePointStyle: true
        },
        onClick: (event, legendItem) => {
          console.log("This is working!");
        }
      },
      tooltips: {
        enabled: true
      },
      onClick: (evt, item) => {
        console.log('Clicked!');
      },
      onHover: (evt, item) => {
        console.log("hover");
      }
    };
    this.content_loaded = false;
    this.isModalOpen = false;
  }
  ngOnInit() {
    // Create bar chart
  }
  rerenderChart() {
    this.doughnutChartLabels = ["Paid Amount", "Due Amount", "Discount Amount"];
    this.doughnutChartData = {
      //labels: this.doughnutChartLabels,
      datasets: [{
        data: [this.feePaymentDetails.totalPaid, this.feePaymentDetails.totalDue, this.feePaymentDetails.totalDiscount],
        backgroundColor: ['green', 'red', 'blue'],
        borderWidth: 0
      }]
    };
    this.doughnutChartType = "doughnut";
    this.options = {
      legend: {
        display: true,
        labels: {
          usePointStyle: true
        },
        onClick: (event, legendItem) => {
          console.log("This is working!");
        }
      },
      tooltips: {
        enabled: true
      },
      onClick: (evt, item) => {
        console.log('Clicked!');
      },
      onHover: (evt, item) => {
        console.log("hover");
      }
    };
  }
  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Academic Fees');
    // Fake timeout
    this.getFeeData();
  }
  getFeeData() {
    this.parentAppService.getParentFeePaymentDetails(this.userService.CurrentSiblingId).subscribe(data => {
      this.feePaymentDetails = data;
      this.rerenderChart();
      this.content_loaded = true;
    });
  }
  // setOpen(isOpen: boolean, name : string, typeId : number) {
  //  this.installments = this.feePaymentDetails.feeInstallmentDetailDtoList.filter(x=>x.feeWavierTypeId == typeId)!;
  //  this.feeWavierDisplayName = name;
  //  this.isModalOpen = isOpen;
  // }
  setOpen(installment, name, typeId) {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.installments = _this.feePaymentDetails.feeInstallmentDetailDtoList.filter(x => x.feeWavierTypeId == typeId);
      _this.feeWavierDisplayName = name;
      const modal = yield _this.modalController.create({
        component: _fee_installment_info_details_view_fee_info_detail_page__WEBPACK_IMPORTED_MODULE_8__.ViewFeeInfoDetailPage,
        componentProps: {
          installments: _this.installments
        }
      });
      yield modal.present();
    })();
  }
  checkDate(addDisc) {
    let result;
    if (addDisc == null || addDisc == undefined || addDisc.discountEndDate == null || addDisc.discountEndDate == undefined || addDisc.discountEndDate == "") {
      result = true;
      return result;
    }
    const firstYear = moment__WEBPACK_IMPORTED_MODULE_7__(addDisc.discountEndDate).year();
    const firstMonth = moment__WEBPACK_IMPORTED_MODULE_7__(addDisc.discountEndDate).month();
    const firstDay = moment__WEBPACK_IMPORTED_MODULE_7__(addDisc.discountEndDate).date();
    const secondYear = new Date().getFullYear();
    const secondMonth = new Date().getMonth();
    const secondDay = new Date().getDate();
    // Compare both date components
    switch (true) {
      case firstYear === secondYear && firstMonth === secondMonth && firstDay === secondDay:
        result = true;
        break;
      case firstYear < secondYear || firstYear === secondYear && firstMonth < secondMonth || firstYear === secondYear && firstMonth === secondMonth && firstDay < secondDay:
        result = false;
        break;
      default:
        result = true;
    }
    return result;
  }
  showDisc(feeParticular) {
    var result = false;
    if (feeParticular.feeWavierTypeId == this.feePaymentDetails.feeWavierTypeId) {
      result = true;
    } else if (this.feePaymentDetails.feeWavierTypeId == 0 || this.feePaymentDetails.feeWavierTypeId == undefined || this.feePaymentDetails.feeWavierTypeId == null) {
      if (this.checkDate(feeParticular.discountEndDate)) {
        result = true;
      }
    }
    if (this.feePaymentDetails.totalDue < 1 && (this.feePaymentDetails.feeWavierTypeId == 0 || this.feePaymentDetails.feeWavierTypeId == undefined || this.feePaymentDetails.feeWavierTypeId == null)) {
      result = false;
    }
    return result;
  }
  showFullDiscGrid() {
    var count = 0;
    this.feePaymentDetails.feePaymentAndDiscountSectionDtoList.forEach(element => {
      if (element.feeWavierTypeId == this.feePaymentDetails.feeWavierTypeId) {
        count += 1;
      } else if (this.feePaymentDetails.feeWavierTypeId == 0 || this.feePaymentDetails.feeWavierTypeId == undefined || this.feePaymentDetails.feeWavierTypeId == null) {
        if (this.checkDate(element.discountEndDate)) {
          count += 1;
        }
      }
      if (this.feePaymentDetails.totalDue < 1 && (this.feePaymentDetails.feeWavierTypeId == 0 || this.feePaymentDetails.feeWavierTypeId == undefined || this.feePaymentDetails.feeWavierTypeId == null)) {
        count -= 1;
      }
    });
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  }
  getFormattedDate(inputDate) {
    if (inputDate) return moment__WEBPACK_IMPORTED_MODULE_7__(inputDate).format("DD/MM/yyyy");else return "-";
  }
  segmentChanged(ev) {
    console.log('Segment changed', ev);
  }
  static #_ = this.ctorParameters = () => [{
    type: src_app_services_helper_helper_service__WEBPACK_IMPORTED_MODULE_4__.HelperService
  }, {
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_3__.CommonMethodService
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_6__.UserService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_5__.ParentAppServiceProxy
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController
  }];
};
FeesComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Component)({
  selector: 'app-fees',
  template: _fees_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_fees_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], FeesComponent);


/***/ }),

/***/ 63742:
/*!*****************************************************!*\
  !*** ./src/app/pages/parentApp/fees/fees.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FeesModule: () => (/* binding */ FeesModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _fees_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fees-routing.module */ 49807);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-charts */ 16045);
/* harmony import */ var _fees_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fees.component */ 9215);
/* harmony import */ var highcharts_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! highcharts-angular */ 14215);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _fee_installment_info_details_view_fee_info_detail_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fee-installment-info-details/view-fee-info-detail.page */ 14214);










let FeesModule = class FeesModule {};
FeesModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _fees_routing_module__WEBPACK_IMPORTED_MODULE_0__.FeesRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, ng2_charts__WEBPACK_IMPORTED_MODULE_8__.NgChartsModule, highcharts_angular__WEBPACK_IMPORTED_MODULE_9__.HighchartsChartModule],
  declarations: [_fees_component__WEBPACK_IMPORTED_MODULE_1__.FeesComponent, _fee_installment_info_details_view_fee_info_detail_page__WEBPACK_IMPORTED_MODULE_2__.ViewFeeInfoDetailPage]
})], FeesModule);


/***/ }),

/***/ 44524:
/*!*************************************************************************************************************!*\
  !*** ./src/app/pages/parentApp/fees/fee-installment-info-details/view-fee-info-detail.page.scss?ngResource ***!
  \*************************************************************************************************************/
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
}

.installment-details {
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #fff;
  padding: 5px;
}
.installment-details .header-title {
  margin-bottom: 5px;
  font-weight: 500;
  color: #000;
}
.installment-details ul {
  margin-bottom: 0;
  padding-left: 16px;
  color: #000;
}
.installment-details ul li {
  font-size: 13px;
  padding: 2px 0;
  color: #000;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/fees/fee-installment-info-details/view-fee-info-detail.page.scss"],"names":[],"mappings":"AACI;EACI,2BAAA;AAAR;;AAKA;EACI,cAAA;EACA,iCAAA;EACA,6BAAA;EACA,gBAAA;EACA,kBAAA;AAFJ;AAGI;EACI,eAAA;AADR;AAIQ;EACI,gBAAA;EACA,yBAAA;EACA,kBAAA;EACA,kBAAA;EACA,uBAAA;AAFZ;AAKgB;EACI,YAAA;AAHpB;AAMY;EACI,yBAAA;AAJhB;AAMY;EACI,yBAAA;AAJhB;AAMoB;EACI,UAAA;AAJxB;AAQY;EACI,yBAAA;AANhB;AAQoB;EACI,cAAA;AANxB;AAUY;EACI,2BAAA;AARhB;AAUY;EACI,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,sBAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;AARhB;AASgB;EACI,eAAA;EACA,iBAAA;AAPpB;AAUY;EACI,eAAA;EACA,gBAAA;AARhB;AAWY;EAEI,gBAAA;EAEA,iBAAA;AAXhB;AAcc;EACE;IACE,mBAAA;EAZhB;AACF;;AAmBA;EACA,gBAAA;AAhBA;AAiBG;EACC,qBAAA;EACA,sBAAA;EACA,kBAAA;EACA,uCAAA;EACA,WAAA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;AAfJ;AAgBI;EACI,eAAA;AAdR;;AAqBI;EACI,eAAA;AAlBR;AAmBQ;EACI,eAAA;EACA,cAAA;EACA,WAAA;AAjBZ;;AAsBA;EACI,cAAA;EACA,eAAA;EACA,SAAA;EACA,aAAA;AAnBJ;AAoBI;EACI,WAAA;EACA,YAAA;EACA,sBAAA;EACA,YAAA;EACA,kBAAA;EACA,aAAA;EACA,kBAAA;EACA,kBAAA;AAlBR;AAmBQ;EACI,WAAA;AAjBZ;;AAyBA;EACI,iBAAA;EACA,YAAA;AAtBJ;;AAwBA;EACI,WAAA;EACA,YAAA;AArBJ;;AAwBE;EACE,sBAAA;EACA,kBAAA;EACA,mBAAA;EACA,sBAAA;EACA,YAAA;AArBJ;AAuBI;EACI,kBAAA;EACA,gBAAA;EACA,WAAA;AArBR;AAwBI;EACI,gBAAA;EACA,kBAAA;EACA,WAAA;AAtBR;AAuBQ;EACI,eAAA;EACA,cAAA;EACA,WAAA;AArBZ","sourcesContent":[":host {\n    ion-card {\n        box-shadow: none !important;\n    }\n\n}\n\nion-list {\n    padding-top: 0;\n    background-color: #fff !important;\n    --background: #fff !important;\n    border-radius: 0;\n    --border-radius: 0;\n    ion-card-subtitle {\n        font-size: 18px;\n    }\n    &.notice-card {\n        ion-item {\n            border-bottom: 0;\n            --background: transparent;\n            border-radius:4px;\n            margin-bottom: 5px;\n            align-items: flex-start;\n\n            ion-avatar {\n                span {\n                    color: green;\n                }\n            }\n            &.admin {\n                background-color: #badee2;\n            }\n            &.teacher {\n                background-color: #eac0d4;\n                ion-avatar {\n                    span {\n                        color: red;\n                    }\n                }\n            }\n            &.principal {\n                background-color: #eae9c0;\n                ion-avatar {\n                    span {\n                        color: #da9513;\n                    }\n                }\n            }\n            &:last-child {\n                border-bottom: 0 !important;\n            }\n            ion-avatar {\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                background-color: #fff;\n                width: 45px;\n                height: 45px;\n                margin-right: 5px;\n                span {\n                    font-size: 20px;\n                    font-weight: bold;\n                }\n            }\n            ion-label {\n                font-size: 13px;\n                font-weight: 400;\n            }\n\n            &.important {\n               \n                background: blue;\n              \n                --background: red;\n              }\n              \n              @media (prefers-color-scheme: dark) {\n                &.important {\n                  --background: green;\n                }\n              }\n        }\n        }\n}\n\n\n.download {\nmargin-top: 20px;\n   a {\n    text-decoration: none;\n    border: 1px solid #000;\n    border-radius: 4px;\n    background-color: var(--ion-color-dark);\n    color: #fff;\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 16px;\n    ion-icon {\n        font-size: 24px;\n    }\n   }\n}\n\n\n.modal-text-header {\n    ion-card-subtitle {\n        font-size: 16px;\n        ion-text {\n            font-size: 14px;\n            display: block;\n            color: #000;\n        }\n    }\n}\n\n.uploaded-file-text {\n    margin: 10px 0;\n    font-size: 12px;\n    border: 0;\n    display: flex;\n    .file-thumb {\n        width: 64px;\n        height: 64px;\n        border: 1px solid #ccc;\n        padding: 5px;\n        border-radius: 4px;\n        display: flex;\n        position: relative;\n        margin-right: 10px;\n        img {\n            width: 100%;\n        }\n      \n    }\n\n}\n\n\n.bold-black-text {\n    font-weight: bold;\n    color: black;\n}\n.thumbnail-icon {\n    width: 60px;\n    height: 60px;\n  }\n\n  .installment-details {\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-bottom: 10px;\n    background-color: #fff;\n    padding: 5px;\n\n    .header-title {\n        margin-bottom: 5px;\n        font-weight: 500;\n        color: #000;\n\n    }\n    ul {\n        margin-bottom: 0;\n        padding-left: 16px;\n        color: #000;\n        li {\n            font-size: 13px;\n            padding: 2px 0;\n            color: #000;\n        }\n    }\n  }"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 1147:
/*!*********************************************************************!*\
  !*** ./src/app/pages/parentApp/fees/fees.component.scss?ngResource ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `highcharts-chart {
  overflow: hidden;
  width: 100% !important;
  display: flex;
  margin: 0 auto;
  height: 300px !important;
}

.fees-chart {
  display: flex;
  padding: 10px;
  background-color: #fff;
}
.fees-chart .chart {
  width: 120px;
  height: 120px;
}
.fees-chart .chart-labels {
  padding-left: 20px;
  padding-top: 0px;
}
.fees-chart .chart-labels ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.fees-chart .chart-labels ul li {
  display: flex;
  flex: 0 0 1;
  margin-bottom: 10px;
}
.fees-chart .chart-labels ul li span {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 40%;
  margin-right: 7px;
  display: inline-block;
  margin-top: 5px;
}
.fees-chart .chart-labels ul li span.green {
  background-color: #10dc60;
}
.fees-chart .chart-labels ul li span.blue {
  background-color: blue;
}
.fees-chart .chart-labels ul li span.red {
  background-color: red;
}
.fees-chart .chart-labels ul li p {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: #000;
}
.fees-chart .chart-labels ul li p.text {
  font-size: 10px;
  color: #928eae;
}

ion-card {
  box-shadow: 0px 0px 3px 1px rgba(204, 204, 204, 0.7098039216);
  border-left: 3px solid #0cc052;
  margin-bottom: 5px;
}
ion-card ion-card-content {
  padding: 0 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  line-height: 1.4;
  font-size: 11px;
  color: #fff;
}
ion-card ion-card-content ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
ion-card ion-card-content ul li {
  flex: 0 0 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}
ion-card ion-card-content ul li .left {
  font-size: 12px;
  font-weight: 500;
  padding: 0;
  color: #000;
}
ion-card ion-card-content ul li .right {
  font-size: 13px;
  padding: 0;
  color: #000;
}
ion-card ion-card-content ul li .right.green {
  color: #fff;
}

.left {
  padding-left: 0 !important;
}

.yellow-bg-color {
  background-color: #fff !important;
  border-left: 0;
}

.total-fees {
  text-decoration: none;
  border-radius: 4px;
  background-color: #F97794;
  color: #000;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-bottom: 13px;
}

.download {
  margin-top: 10px;
}
.download a {
  text-decoration: none;
  border: 1px solid #092968;
  border-radius: 4px;
  background-color: #092968;
  color: #fff;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
}
.download a ion-icon {
  font-size: 16px;
}

.titles {
  text-align: center;
  font-size: 16px;
  color: #000;
  font-weight: 600;
  padding: 10px;
}

.particular {
  box-shadow: 0px 4px 8px 2px rgba(206, 204, 219, 0.48) !important;
  border: 0;
  border-radius: 8px;
  background: #623AA2;
  --background: #623AA2;
}
.particular ul li {
  margin-bottom: 0 !important;
  padding: 10px 5px;
  align-items: center;
}
.particular ul li .title {
  font-size: 16px;
  font-weight: 500;
  padding: 0;
  color: #fff;
}
.particular ul li .amount {
  font-size: 18px;
  padding: 0;
  color: #fff;
  font-weight: bold;
}
.particular ul li .amount.green {
  color: #0cc052;
}

.payments-wrap {
  background-color: rgba(2, 6, 197, 0.2588235294);
  padding-bottom: 30px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.payments-wrap .titles {
  color: #000 !important;
  font-weight: 600;
  padding: 15px 10px 15px !important;
  margin-top: 20px;
}
.payments-wrap .payments {
  box-shadow: 0 2px 1px 1px #4a25a3 !important;
  background: rgb(238, 206, 19);
  background: linear-gradient(180deg, rgb(238, 206, 19) 0%, rgb(178, 16, 255) 100%);
  border: 0;
  box-shadow: none;
  margin-bottom: 20px !important;
  margin-top: 0;
  border-radius: 8px;
  padding-bottom: 0px;
  position: relative;
  contain: none;
  overflow: visible;
}
.payments-wrap .payments ion-card-content {
  padding-top: 20px;
}
.payments-wrap .payments .header-title {
  background-color: #4a25a3;
  color: #fff;
  border-radius: 4px;
  position: absolute;
  padding: 2px 10px;
  top: -13px;
  left: 20px;
  font-size: 14px;
  text-transform: uppercase;
}
.payments-wrap .payments ul li {
  margin-bottom: 0 !important;
  padding: 5px 5px;
  align-items: center;
}
.payments-wrap .payments ul li .title {
  font-size: 14px;
  font-weight: normal;
  padding: 0;
  color: #fff;
}
.payments-wrap .payments ul li .amount {
  font-size: 14px;
  padding: 0;
  color: #fff;
  font-weight: 500;
}
.payments-wrap .payments .pay-now-btn2 {
  --background: radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
  radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);
}
.payments-wrap .payments .pay-now-btn {
  color: #000 !important;
  font-weight: bold;
  --background:#dddc3e;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/fees/fees.component.scss"],"names":[],"mappings":"AAEA;EACI,gBAAA;EACA,sBAAA;EACA,aAAA;EACA,cAAA;EACA,wBAAA;AADJ;;AAIA;EACI,aAAA;EACA,aAAA;EACA,sBAAA;AADJ;AAEI;EACI,YAAA;EACA,aAAA;AAAR;AAEI;EACI,kBAAA;EACA,gBAAA;AAAR;AACQ;EACI,SAAA;EACA,UAAA;EACA,aAAA;EACA,eAAA;EACA,8BAAA;AACZ;AACY;EACI,aAAA;EACA,WAAA;EACA,mBAAA;AAChB;AAAgB;EACI,WAAA;EACA,YAAA;EACA,qBAAA;EACA,kBAAA;EACA,iBAAA;EACA,qBAAA;EACA,eAAA;AAEpB;AADoB;EACI,yBAAA;AAGxB;AADoB;EACI,sBAAA;AAGxB;AADoB;EACI,qBAAA;AAGxB;AAAgB;EACI,SAAA;EACA,eAAA;EACA,gBAAA;EACA,WAAA;AAEpB;AADoB;EACI,eAAA;EACA,cAAA;AAGxB;;AAKA;EACI,6DAAA;EACA,8BAAA;EACA,kBAAA;AAFJ;AAII;EACI,eAAA;EACA,eAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,WAAA;AAFR;AAGQ;EACI,SAAA;EACA,UAAA;EACA,gBAAA;EACA,aAAA;EACA,eAAA;AADZ;AAEY;EACI,cAAA;EACA,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,kBAAA;AAAhB;AACgB;EACI,eAAA;EACA,gBAAA;EACA,UAAA;EACA,WAAA;AACpB;AAEgB;EACI,eAAA;EACA,UAAA;EACA,WAAA;AAApB;AACoB;EACI,WAAA;AACxB;;AAOA;EACI,0BAAA;AAJJ;;AAMA;EACI,iCAAA;EACA,cAAA;AAHJ;;AAMA;EACI,qBAAA;EAEA,kBAAA;EACA,yBAAA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;EACA,mBAAA;AAJJ;;AAOA;EACI,gBAAA;AAJJ;AAKO;EACC,qBAAA;EACA,yBAAA;EACA,kBAAA;EACA,yBAAA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;AAHR;AAIQ;EACI,eAAA;AAFZ;;AAOI;EACI,kBAAA;EACJ,eAAA;EACA,WAAA;EACA,gBAAA;EACA,aAAA;AAJJ;;AAQI;EACI,gEAAA;EACA,SAAA;EACA,kBAAA;EACA,mBAAA;EACA,qBAAA;AALR;AAOY;EACI,2BAAA;EACA,iBAAA;EACA,mBAAA;AALhB;AAMgB;EACI,eAAA;EACA,gBAAA;EACA,UAAA;EACA,WAAA;AAJpB;AAOgB;EACI,eAAA;EACA,UAAA;EACA,WAAA;EACA,iBAAA;AALpB;AAMoB;EACI,cAAA;AAJxB;;AAWI;EACI,+CAAA;EACA,oBAAA;EACA,4BAAA;EACA,6BAAA;AARR;AASQ;EACI,sBAAA;EACA,gBAAA;EACA,kCAAA;EACA,gBAAA;AAPZ;AASQ;EACI,4CAAA;EAEA,6BAAA;EACZ,iFAAA;EAEA,SAAA;EACY,gBAAA;EACA,8BAAA;EACA,aAAA;EAOA,kBAAA;EACA,mBAAA;EACA,kBAAA;EACA,aAAA;EACA,iBAAA;AAfZ;AAgBY;EACI,iBAAA;AAdhB;AAgBY;EACI,yBAAA;EACA,WAAA;EACA,kBAAA;EACA,kBAAA;EACA,iBAAA;EACA,UAAA;EACZ,UAAA;EACA,eAAA;EACA,yBAAA;AAdJ;AAiBgB;EACI,2BAAA;EACA,gBAAA;EACA,mBAAA;AAfpB;AAgBoB;EACI,eAAA;EACA,mBAAA;EACA,UAAA;EACA,WAAA;AAdxB;AAiBoB;EACI,eAAA;EACA,UAAA;EACA,WAAA;EACA,gBAAA;AAfxB;AAqBY;EACI;wHAAA;AAlBhB;AAsBY;EAER,sBAAA;EACA,iBAAA;EACA,oBAAA;AArBJ","sourcesContent":[":host {\n}\nhighcharts-chart {\n    overflow: hidden;\n    width: 100% !important;\n    display: flex;\n    margin: 0 auto;\n    height: 300px !important;\n}\n\n.fees-chart {\n    display: flex;\n    padding: 10px;\n    background-color: #fff;\n    .chart {\n        width: 120px;\n        height: 120px;\n    }\n    .chart-labels {\n        padding-left: 20px;\n        padding-top: 0px;\n        ul {\n            margin: 0;\n            padding: 0;\n            display: flex;\n            flex-wrap: wrap;\n            justify-content: space-between;\n\n            li {\n                display: flex;\n                flex: 0 0 1;\n                margin-bottom: 10px;\n                span {\n                    width: 10px;\n                    height: 10px;\n                    background-color: red;\n                    border-radius: 40%;\n                    margin-right: 7px;\n                    display: inline-block;\n                    margin-top: 5px;\n                    &.green {\n                        background-color: #10dc60;\n                    }\n                    &.blue {\n                        background-color: blue;\n                    }\n                    &.red {\n                        background-color: red;\n                    }\n                }\n                p {\n                    margin: 0;\n                    font-size: 12px;\n                    font-weight: 500;\n                    color: #000;\n                    &.text {\n                        font-size: 10px;\n                        color: #928eae;\n                    }\n                }\n            }\n        }\n    }\n}\n\nion-card {\n    box-shadow: 0px 0px 3px 1px #ccccccb5;\n    border-left: 3px solid #0cc052;\n    margin-bottom: 05px;\n\n    ion-card-content {\n        padding: 0 10px;\n        margin-top: 5px;\n        margin-bottom: 5px;\n        line-height: 1.4;\n        font-size: 11px;\n        color: #fff;\n        ul {\n            margin: 0;\n            padding: 0;\n            list-style: none;\n            display: flex;\n            flex-wrap: wrap;\n            li {\n                flex: 0 0 100%;\n                display: flex;\n                align-items: center;\n                justify-content: space-between;\n                margin-bottom: 5px;\n                .left {\n                    font-size: 12px;\n                    font-weight: 500;\n                    padding: 0;\n                    color: #000;\n                }\n\n                .right {\n                    font-size: 13px;\n                    padding: 0;\n                    color: #000;\n                    &.green {\n                        color: #fff;\n                    }\n                }\n            }\n        }\n    }\n}\n\n.left {\n    padding-left: 0 !important;\n}\n.yellow-bg-color {\n    background-color: #fff !important;\n    border-left: 0;\n}\n\n.total-fees {\n    text-decoration: none;\n    // border: 1px solid #857db1;\n    border-radius: 4px;\n    background-color: #F97794;\n    color: #000;\n    padding: 3px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 12px;\n    margin-bottom: 13px;\n}\n\n.download {\n    margin-top: 10px;\n       a {\n        text-decoration: none;\n        border: 1px solid #092968;\n        border-radius: 4px;\n        background-color: #092968;\n        color: #fff;\n        padding: 3px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 13px;\n        ion-icon {\n            font-size: 16px;\n        }\n       }\n    }\n\n    .titles {\n        text-align: center;\n    font-size: 16px;\n    color: #000;\n    font-weight: 600;\n    padding: 10px;\n    }\n    \n\n    .particular {\n        box-shadow: 0px 4px 8px 2px rgb(206 204 219 / 48%) !important;\n        border: 0;\n        border-radius: 8px;\n        background: #623AA2;\n        --background: #623AA2;\n        ul {\n            li {\n                margin-bottom: 0 !important;\n                padding: 10px 5px;\n                align-items: center;\n                .title {\n                    font-size: 16px;\n                    font-weight: 500;\n                    padding: 0;\n                    color: #fff;\n                }\n\n                .amount {\n                    font-size: 18px;\n                    padding: 0;\n                    color: #fff;\n                    font-weight: bold;\n                    &.green {\n                        color: #0cc052;\n                    }\n                }\n            }\n        }\n    }\n\n    .payments-wrap {\n        background-color: #0206c542;\n        padding-bottom: 30px;\n        border-top-left-radius: 10px;\n        border-top-right-radius: 10px;\n        .titles {\n            color: #000 !important;\n            font-weight: 600;\n            padding: 15px 10px 15px  !important;\n            margin-top: 20px;\n        }\n        .payments {\n            box-shadow: 0 2px 1px 1px #4a25a3!important;\n            //background-color: #000 !important;\n            background: rgb(238,206,19);\nbackground: linear-gradient(180deg, rgba(238,206,19,1) 0%, rgba(178,16,255,1) 100%);\n            //border: 2px solid transparent;\nborder: 0;\n            box-shadow: none;\n            margin-bottom: 20px !important;\n            margin-top: 0;\n            //border: 2px solid;\n            //border-image-slice: 1;\n            //border-image-source: linear-gradient(to left, #9b860c, #FFD700);\n            //border-image: linear-gradient(to right, darkblue, darkorchid) 1;\n\n\n            border-radius: 8px;\n            padding-bottom: 0px;\n            position: relative;\n            contain: none;\n            overflow: visible;\n            ion-card-content {\n                padding-top: 20px;\n            }\n            .header-title {\n                background-color: #4a25a3;\n                color: #fff;\n                border-radius: 4px;\n                position: absolute;\n                padding: 2px 10px;\n                top: -13px;\n    left: 20px;\n    font-size: 14px;\n    text-transform: uppercase;\n            }\n            ul {\n                li {\n                    margin-bottom: 0 !important;\n                    padding: 5px 5px;\n                    align-items: center;\n                    .title {\n                        font-size: 14px;\n                        font-weight: normal;\n                        padding: 0;\n                        color: #fff;\n                    }\n    \n                    .amount {\n                        font-size: 14px;\n                        padding: 0;\n                        color: #fff;\n                        font-weight: 500;\n\n                    }\n                }\n            }\n\n            .pay-now-btn2 {\n                --background:  radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),\n                radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);\n            }\n\n            .pay-now-btn {\n                //--background: linear-gradient(45deg, #e0cf5f 0%, #e0cf5f 25%, rgb(235 204 78) 51%, rgb(150 144 26) 100%);\n    color: #000 !important;\n    font-weight: bold;\n    --background:#dddc3e;\n            }\n        }\n    }\n\n   "],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 92554:
/*!*************************************************************************************************************!*\
  !*** ./src/app/pages/parentApp/fees/fee-installment-info-details/view-fee-info-detail.page.html?ngResource ***!
  \*************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header collapse=\"fade\" [translucent]=\"true\" class=\"modal-header\">\n  <ion-toolbar>\n    <ion-title ><b>Installment Details</b></ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button color=\"primary\" fill=\"solid\" (click)=\"close()\">\n        Close\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n<ion-content class=\"ion-padding\">\n  <div class=\"installment-details\"  *ngFor=\"let installment of installments\">\n    <p class=\"header-title\">Installment No :&nbsp;{{installment.installmentNumber}}</p>\n    <ul>\n      <li>\n        <span class=\"title\">Discount End Date :&nbsp;</span>\n        <span class=\"amount\">{{getFormattedDate(installment.discountEndDate)}}</span>\n      </li>\n      <li>\n        <span class=\"title\">Late Fee Start Date :&nbsp;</span>\n        <span class=\"amount\">{{getFormattedDate(installment.lateFeeStartDate)}}</span>\n      </li>\n    </ul>\n  </div>\n  \n</ion-content>";

/***/ }),

/***/ 99161:
/*!*********************************************************************!*\
  !*** ./src/app/pages/parentApp/fees/fees.component.html?ngResource ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-content [fullscreen]=\"true\" class=\"light-content\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"handleRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <ion-card\n    class=\"ion-no-margin ion-card-chart animate__animated animate__fadeIn white-bg-color border-0 rounded-0 mb-0\"\n  >\n    <!-- Skeletons -->\n    <ng-container *ngIf=\"!content_loaded\">\n      <ion-card-header>\n        <div>\n          <ion-card-title>\n            <ion-skeleton-text animated style=\"width: 60px\"></ion-skeleton-text>\n          </ion-card-title>\n          <ion-card-subtitle>\n            <ion-skeleton-text animated style=\"width: 80px\"></ion-skeleton-text>\n          </ion-card-subtitle>\n        </div>\n        <ion-badge color=\"light\" mode=\"ios\">\n          <ion-skeleton-text animated style=\"width: 50px\"></ion-skeleton-text>\n        </ion-badge>\n      </ion-card-header>\n\n      <ion-skeleton-text\n        animated\n        style=\"\n          width: calc(100% - 40px);\n          margin: 16px auto 16px auto;\n          min-height: 140px;\n        \"\n      >\n      </ion-skeleton-text>\n    </ng-container>\n\n    <!-- Chart -->\n    <ng-container *ngIf=\"content_loaded\">\n      <div class=\"fees-chart\">\n        <div class=\"chart\">\n          <canvas\n            baseChart\n            class=\"chart\"\n            [data]=\"doughnutChartData\"\n            [type]=\"doughnutChartType\"\n            [labels]=\"doughnutChartLabels\"\n            [options]=\"options\"\n          >\n          </canvas>\n        </div>\n\n        <div class=\"chart-labels\">\n          <div class=\"text-end total-fees\">Total Fees : {{feePaymentDetails.totalFee  | currency:'INR'}}</div>\n          <ul>\n            <li>\n              <span class=\"color-dot green\"></span>\n              <div>\n                <p>{{feePaymentDetails.totalPaid  | currency:'INR'}}</p>\n                <p class=\"text\">Paid Amount</p>\n              </div>\n            </li>\n            <li>\n              <span class=\"color-dot red\"></span>\n              <div>\n                <p>{{feePaymentDetails.totalDue  | currency:'INR'}}</p>\n                <p class=\"text\">Due Amount</p>\n              </div>\n            </li>\n            <li>\n              <span class=\"color-dot blue\"></span>\n              <div>\n                <p>{{feePaymentDetails.totalDiscount  | currency:'INR'}}</p>\n                <p class=\"text\">Discount Amount</p>\n              </div>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </ng-container>\n  </ion-card>\n\n  <ng-container *ngIf=\"content_loaded\">\n    <ion-segment\n      class=\"border-tab-btn\"\n      [(ngModel)]=\"type\"\n      (ionChange)=\"segmentChanged($event)\"\n      scrollable\n    >\n      <ion-segment-button value=\"dues\" checked>\n        <ion-label>Fees</ion-label>\n      </ion-segment-button>\n      <ion-segment-button value=\"history\">\n        <ion-label>History</ion-label>\n      </ion-segment-button>\n    </ion-segment>\n\n    <div [ngSwitch]=\"type\">\n      <ion-list *ngSwitchCase=\"'dues'\" class=\"light-blue-bg-color rounded-0\">\n        <ng-container *ngIf=\"content_loaded\">\n          <ion-title class=\"titles\">Fee Particulars</ion-title>\n\n          <ion-card\n            *ngFor=\"let feeParticular of feePaymentDetails.feePaymentParticularSectionDtoList\"\n            class=\"particular\"\n          >\n            <ion-card-content>\n              <ul>\n                <li>\n                  <span class=\"title\">{{feeParticular.particularName}}</span>\n                  <span class=\"amount\">{{feeParticular.totalFee | currency:'INR'}}</span>\n                </li>\n              </ul>\n            </ion-card-content>\n          </ion-card>\n\n          <div class=\"payments-wrap\" *ngIf=\"showFullDiscGrid()\">\n            <ion-title class=\"titles\">Fee Payment Terms & Discounts</ion-title>\n\n            <ion-card class=\"payments\"  *ngFor=\"let feeParticular of feePaymentDetails.feePaymentAndDiscountSectionDtoList\">\n              <ion-title *ngIf=\"showDisc(feeParticular)\" class=\"header-title\">{{feeParticular.feeWavierDisplayName}}</ion-title>\n              <ion-card-content *ngIf=\"showDisc(feeParticular)\">\n                <ul>\n                  <li>\n                    <span class=\"title\">Total Fees</span>\n                    <span class=\"amount\">{{feeParticular.totalFee | currency:'INR'}}</span>\n                  </li>\n                  <li>\n                    <span class=\"title\">Applicable Discount</span>\n                    <span class=\"amount\">{{feeParticular.discountInPercent}}%</span>\n                  </li>\n                  <li>\n                    <span class=\"title\">Applicable Fee</span>\n                    <span class=\"amount\">{{feeParticular.applicableFee | currency:'INR'}}</span>\n                  </li>\n                  <li>\n                    <span class=\"title\">Installments &nbsp;&nbsp;<span style=\"font-style: italic; text-decoration: underline;\" (click)=\"setOpen(true,feeParticular.feeWavierDisplayName,feeParticular.feeWavierTypeId)\">info</span></span>\n                    <span class=\"amount\">{{ feeParticular.numberOfInstallments}}</span>\n                  </li>\n                </ul>\n                <div class=\"text-center\" [hidden]=\"feePaymentDetails.feeWavierTypeId > 0 || feePaymentDetails.totalDue < 1\" >\n                  <!-- <ion-button shape=\"round\" class=\"pay-now-btn\"\n                    >Apply</ion-button\n                  > -->\n                </div>\n                <div class=\"text-center\"  *ngIf=\"feeParticular.feeWavierTypeId == feePaymentDetails.feeWavierTypeId\">\n                  <ion-button shape=\"round\" class=\"pay-now-btn\"\n                    >Applied</ion-button\n                  >\n                </div>\n              </ion-card-content>\n            </ion-card>\n          </div>\n        </ng-container>\n      </ion-list>\n\n      <ion-list *ngSwitchCase=\"'history'\" class=\"light-blue-bg-color rounded-0\">\n        <ng-container *ngIf=\"content_loaded\">\n          <ion-card *ngFor=\"let reciept of feePaymentDetails.paymentHistoryReceiptDtoList\" class=\"yellow-bg-color\">\n            <ion-card-content>\n              <ul>\n                <li>\n                  <span class=\"left\">Installment No</span>\n                  <span class=\"right\">{{reciept.installmentNumber}}</span>\n                </li>\n                <li>\n                  <span class=\"left\">Invoice No</span>\n                  <span class=\"right\">{{reciept.invoiceNumber}}</span>\n                </li>\n                <li>\n                  <span class=\"left\">Paid Amount</span>\n                  <span class=\"right\">{{reciept.paidAmount | currency:'INR'}}</span>\n                </li>\n                <li>\n                  <span class=\"left\">Payment Mode</span>\n                  <span class=\"right\">{{reciept.paymentTypeName}}</span>\n                </li>\n                <li>\n                  <span class=\"left\">Transaction Date</span>\n                  <span class=\"right\">{{getFormattedDate(reciept.onlineTransactionDateTime)}}</span>\n                </li>\n                <li *ngIf=\"reciept.paymentTypeName == 'Cheque'\">\n                  <span class=\"left\">Cheque No</span>\n                  <span class=\"right\">{{reciept.onlineTransactionId}}</span>\n                </li>\n                <li *ngIf=\"reciept.paymentTypeName == 'Cheque'\">\n                  <span class=\"left\">Cheque Date</span>\n                  <span class=\"right\">{{getFormattedDate(reciept.chequeDate)}}</span>\n                </li>\n                <li *ngIf=\"reciept.paymentTypeName == 'Cheque'\">\n                  <span class=\"left\">Cheque Clear</span>\n                  <span class=\"right\">{{reciept.isChequeOrDDClear}}</span>\n                </li>\n                <li *ngIf=\"reciept.paymentTypeName == 'DD'\">\n                  <span class=\"left\">DD No</span>\n                  <span class=\"right\">{{reciept.onlineTransactionId}}</span>\n                </li>\n                <li *ngIf=\"reciept.paymentTypeName == 'DD'\">\n                  <span class=\"left\">DD Date</span>\n                  <span class=\"right\">{{getFormattedDate(reciept.chequeDate)}}</span>\n                </li>\n                <li *ngIf=\"reciept.paymentTypeName == 'DD'\">\n                  <span class=\"left\">DD Clear</span>\n                  <span class=\"right\">{{reciept.isChequeOrDDClear}}</span>\n                </li>\n               \n              </ul>\n\n              <!-- <div class=\"text-end download\">\n                <a href=\"../../../../assets/thumbnail.pdf\" download>\n                  <ion-icon name=\"attach-outline\"></ion-icon> Reciept</a\n                >\n              </div> -->\n            </ion-card-content>\n          </ion-card>\n        </ng-container>\n      </ion-list>\n    </div>\n  </ng-container>\n\n  <ion-modal [isOpen]=\"isModalOpen\"  backdropDismiss=\"false\">\n    <ng-template>\n      <ion-header class=\"modal-header\">\n        <ion-toolbar>\n          <ion-title color=\"dark-color\">{{feeWavierDisplayName}}</ion-title>\n          <ion-buttons slot=\"end\">\n            <ion-button color=\"secondary\" (click)=\"setOpen(false, null, null)\">Close</ion-button>\n          </ion-buttons>\n         \n        </ion-toolbar>\n      </ion-header>\n      <!-- <ion-content class=\"ion-padding\">\n        <ion-card class=\"payments\"  *ngFor=\"let installment of installments\">\n          <ion-title class=\"header-title\">Installment No {{installment.installmentNumber}}</ion-title>\n          <ul>\n            <li>\n              <span class=\"title\">Discount End Date</span>\n              <span class=\"amount\">{{getFormattedDate(installment.discountEndDate)}}</span>\n            </li>\n            <li>\n              <span class=\"title\">Late Fee Start Date</span>\n              <span class=\"amount\">{{getFormattedDate(installment.lateFeeStartDate)}}</span>\n            </li>\n          </ul>\n        </ion-card>\n        \n      </ion-content> -->\n    </ng-template>\n  </ion-modal>\n</ion-content>\n\n\n";

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
//# sourceMappingURL=src_app_pages_parentApp_fees_fees_module_ts.js.map