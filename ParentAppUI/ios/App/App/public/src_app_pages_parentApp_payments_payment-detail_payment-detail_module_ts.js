(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_parentApp_payments_payment-detail_payment-detail_module_ts"],{

/***/ 36685:
/*!******************************************************************************************!*\
  !*** ./src/app/pages/parentApp/payments/payment-detail/payment-detail-routing.module.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaymentDetailPageRoutingModule: () => (/* binding */ PaymentDetailPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _payment_detail_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./payment-detail.page */ 9151);




const routes = [{
  path: '',
  component: _payment_detail_page__WEBPACK_IMPORTED_MODULE_0__.PaymentDetailPage
}];
let PaymentDetailPageRoutingModule = class PaymentDetailPageRoutingModule {};
PaymentDetailPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], PaymentDetailPageRoutingModule);


/***/ }),

/***/ 86055:
/*!**********************************************************************************!*\
  !*** ./src/app/pages/parentApp/payments/payment-detail/payment-detail.module.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaymentDetailPageModule: () => (/* binding */ PaymentDetailPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _payment_detail_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./payment-detail-routing.module */ 36685);
/* harmony import */ var _payment_detail_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payment-detail.page */ 9151);







let PaymentDetailPageModule = class PaymentDetailPageModule {};
PaymentDetailPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _payment_detail_routing_module__WEBPACK_IMPORTED_MODULE_0__.PaymentDetailPageRoutingModule],
  declarations: [_payment_detail_page__WEBPACK_IMPORTED_MODULE_1__.PaymentDetailPage]
})], PaymentDetailPageModule);


/***/ }),

/***/ 9151:
/*!********************************************************************************!*\
  !*** ./src/app/pages/parentApp/payments/payment-detail/payment-detail.page.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaymentDetailPage: () => (/* binding */ PaymentDetailPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _payment_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./payment-detail.page.html?ngResource */ 17365);
/* harmony import */ var _payment_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payment-detail.page.scss?ngResource */ 10155);
/* harmony import */ var _payment_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_payment_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);




let PaymentDetailPage = class PaymentDetailPage {
  constructor() {}
  ngOnInit() {}
  static #_ = this.ctorParameters = () => [];
};
PaymentDetailPage = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
  selector: 'app-payment-detail',
  template: _payment_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_payment_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], PaymentDetailPage);


/***/ }),

/***/ 10155:
/*!*********************************************************************************************!*\
  !*** ./src/app/pages/parentApp/payments/payment-detail/payment-detail.page.scss?ngResource ***!
  \*********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:host ion-list {
  background-color: var(--ion-color-primary);
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/payments/payment-detail/payment-detail.page.scss"],"names":[],"mappings":"AACE;EACE,0CAAA;AAAJ","sourcesContent":[":host {\n  ion-list {\n    background-color: var(--ion-color-primary);\n  }\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 17365:
/*!*********************************************************************************************!*\
  !*** ./src/app/pages/parentApp/payments/payment-detail/payment-detail.page.html?ngResource ***!
  \*********************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n\n<ion-content>\n\n  <div class=\"ion-padding\">\n\n    <ion-list-header class=\"ion-list-header-small\">\n      <ion-label>\n        <ion-text color=\"tertiary\">Information</ion-text>\n      </ion-label>\n    </ion-list-header>\n\n    <ion-list class=\"list-custom\" lines=\"full\">\n      <ion-item color=\"primary\">\n        <ion-label>\n          <p>Amount</p>\n        </ion-label>\n        <ion-badge color=\"danger\" mode=\"ios\" slot=\"end\">- $8.60</ion-badge>\n      </ion-item>\n      <ion-item color=\"primary\">\n        <ion-label>\n          <p>Status</p>\n        </ion-label>\n        <ion-input readonly slot=\"end\" class=\"font-size-small ion-text-right ion-no-padding-end\" value=\"Completed\"></ion-input>\n      </ion-item>\n      <ion-item color=\"primary\">\n        <ion-label>\n          <p>Date</p>\n        </ion-label>\n        <ion-input readonly slot=\"end\" class=\"font-size-small ion-text-right ion-no-padding-end\" value=\"01 June, 2022 / 09:21\"></ion-input>\n      </ion-item>\n      <ion-item color=\"primary\">\n        <ion-label>\n          <p>Merchant</p>\n        </ion-label>\n        <ion-input readonly slot=\"end\" class=\"font-size-small ion-text-right ion-no-padding-end\" value=\"Starbucks New York\"></ion-input>\n      </ion-item>\n      <ion-item color=\"primary\">\n        <ion-label>\n          <p>Transaction-ID</p>\n        </ion-label>\n        <ion-input readonly slot=\"end\" class=\"font-size-small ion-text-right ion-no-padding-end\" value=\"848-14E-11V\"></ion-input>\n      </ion-item>\n    </ion-list>\n\n    <hr class=\"hr-medium\">\n\n    <ion-list-header class=\"ion-list-header-small\">\n      <ion-label>\n        <ion-text color=\"tertiary\">Actions</ion-text>\n      </ion-label>\n    </ion-list-header>\n\n    <ion-list class=\"list-custom\" lines=\"full\">\n      <ion-item color=\"primary\" detail=\"false\">\n        <ion-avatar slot=\"start\" class=\"ion-avatar-default-icon\">\n          <ion-icon color=\"tertiary\" name=\"receipt\"></ion-icon>\n        </ion-avatar>\n        <ion-label>\n          <h3>Receipt</h3>\n          <p class=\"font-size-smallest\">View digital invoice</p>\n        </ion-label>\n        <ion-button color=\"secondary\" slot=\"end\">\n          View\n        </ion-button>\n      </ion-item>\n\n      <ion-item color=\"primary\" button>\n        <ion-avatar slot=\"start\" class=\"ion-avatar-default-icon\">\n          <ion-icon color=\"tertiary\" name=\"chatbox\"></ion-icon>\n        </ion-avatar>\n        <ion-label>\n          <h3>Contact merchant</h3>\n          <p class=\"font-size-smallest\">Get in touch with merchant</p>\n        </ion-label>\n      </ion-item>\n    </ion-list>\n\n  </div>\n\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_parentApp_payments_payment-detail_payment-detail_module_ts.js.map