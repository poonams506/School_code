"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_public_password-reset_password-reset_module_ts"],{

/***/ 12837:
/*!******************************************************************************!*\
  !*** ./src/app/pages/public/password-reset/password-reset-routing.module.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PasswordResetPageRoutingModule: () => (/* binding */ PasswordResetPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _password_reset_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./password-reset.page */ 89191);




const routes = [{
  path: '',
  component: _password_reset_page__WEBPACK_IMPORTED_MODULE_0__.PasswordResetPage
}];
let PasswordResetPageRoutingModule = class PasswordResetPageRoutingModule {};
PasswordResetPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], PasswordResetPageRoutingModule);


/***/ }),

/***/ 59180:
/*!**********************************************************************!*\
  !*** ./src/app/pages/public/password-reset/password-reset.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PasswordResetPageModule: () => (/* binding */ PasswordResetPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _password_reset_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./password-reset-routing.module */ 12837);
/* harmony import */ var _password_reset_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./password-reset.page */ 89191);







let PasswordResetPageModule = class PasswordResetPageModule {};
PasswordResetPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _password_reset_routing_module__WEBPACK_IMPORTED_MODULE_0__.PasswordResetPageRoutingModule],
  declarations: [_password_reset_page__WEBPACK_IMPORTED_MODULE_1__.PasswordResetPage]
})], PasswordResetPageModule);


/***/ })

}]);
//# sourceMappingURL=src_app_pages_public_password-reset_password-reset_module_ts.js.map