"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_parentApp_parent-app_module_ts"],{

/***/ 9288:
/*!**************************************************************!*\
  !*** ./src/app/pages/parentApp/parent-app-routing.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParentAppRoutingModule: () => (/* binding */ ParentAppRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 95072);



const routes = [{
  path: '',
  children: [{
    path: 'parentTab',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_parentApp_tabs_parent-tabs_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../parentApp/tabs/parent-tabs.module */ 4227)).then(m => m.ParentTabsPageModule)
  }, {
    path: '',
    redirectTo: 'parentTab',
    pathMatch: 'full'
  }]
}];
let ParentAppRoutingModule = class ParentAppRoutingModule {};
ParentAppRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
})], ParentAppRoutingModule);


/***/ }),

/***/ 25145:
/*!******************************************************!*\
  !*** ./src/app/pages/parentApp/parent-app.module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParentAppModule: () => (/* binding */ ParentAppModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _parent_app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parent-app-routing.module */ 9288);




let ParentAppModule = class ParentAppModule {};
ParentAppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  declarations: [],
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _parent_app_routing_module__WEBPACK_IMPORTED_MODULE_0__.ParentAppRoutingModule]
})], ParentAppModule);


/***/ })

}]);
//# sourceMappingURL=src_app_pages_parentApp_parent-app_module_ts.js.map