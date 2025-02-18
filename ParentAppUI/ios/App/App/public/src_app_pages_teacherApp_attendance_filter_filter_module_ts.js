"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_teacherApp_attendance_filter_filter_module_ts"],{

/***/ 70911:
/*!*****************************************************************************!*\
  !*** ./src/app/pages/teacherApp/attendance/filter/filter-routing.module.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FilterPageRoutingModule: () => (/* binding */ FilterPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _filter_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter.page */ 69969);




const routes = [{
  path: '',
  component: _filter_page__WEBPACK_IMPORTED_MODULE_0__.FilterPage
}];
let FilterPageRoutingModule = class FilterPageRoutingModule {};
FilterPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], FilterPageRoutingModule);


/***/ }),

/***/ 36302:
/*!*********************************************************************!*\
  !*** ./src/app/pages/teacherApp/attendance/filter/filter.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FilterPageModule: () => (/* binding */ FilterPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _filter_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter-routing.module */ 70911);
/* harmony import */ var _filter_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter.page */ 69969);







let FilterPageModule = class FilterPageModule {};
FilterPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _filter_routing_module__WEBPACK_IMPORTED_MODULE_0__.FilterPageRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule],
  declarations: [_filter_page__WEBPACK_IMPORTED_MODULE_1__.FilterPage]
})], FilterPageModule);


/***/ })

}]);
//# sourceMappingURL=src_app_pages_teacherApp_attendance_filter_filter_module_ts.js.map