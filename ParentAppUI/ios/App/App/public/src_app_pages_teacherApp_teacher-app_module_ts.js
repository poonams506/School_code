"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_teacherApp_teacher-app_module_ts"],{

/***/ 32252:
/*!****************************************************************!*\
  !*** ./src/app/pages/teacherApp/teacher-app-routing.module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TeacherAppRoutingModule: () => (/* binding */ TeacherAppRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 95072);



const routes = [{
  path: '',
  children: [{
    path: 'teacherTab',
    loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../teacherApp/tabs/teacher-tabs.module */ 9713)).then(m => m.TeacherTabsPageModule)
  }, {
    path: '',
    redirectTo: 'teacherTab',
    pathMatch: 'full'
  }]
}];
let TeacherAppRoutingModule = class TeacherAppRoutingModule {};
TeacherAppRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
})], TeacherAppRoutingModule);


/***/ }),

/***/ 16413:
/*!********************************************************!*\
  !*** ./src/app/pages/teacherApp/teacher-app.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TeacherAppModule: () => (/* binding */ TeacherAppModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _teacher_app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./teacher-app-routing.module */ 32252);




let TeacherAppModule = class TeacherAppModule {};
TeacherAppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  declarations: [],
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _teacher_app_routing_module__WEBPACK_IMPORTED_MODULE_0__.TeacherAppRoutingModule]
})], TeacherAppModule);


/***/ })

}]);
//# sourceMappingURL=src_app_pages_teacherApp_teacher-app_module_ts.js.map