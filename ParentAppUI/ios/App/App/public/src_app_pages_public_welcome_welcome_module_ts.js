(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_public_welcome_welcome_module_ts"],{

/***/ 91893:
/*!****************************************************************!*\
  !*** ./src/app/pages/public/welcome/welcome-routing.module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WelcomePageRoutingModule: () => (/* binding */ WelcomePageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _welcome_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./welcome.page */ 90231);




const routes = [{
  path: '',
  component: _welcome_page__WEBPACK_IMPORTED_MODULE_0__.WelcomePage
}];
let WelcomePageRoutingModule = class WelcomePageRoutingModule {};
WelcomePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], WelcomePageRoutingModule);


/***/ }),

/***/ 1340:
/*!********************************************************!*\
  !*** ./src/app/pages/public/welcome/welcome.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WelcomePageModule: () => (/* binding */ WelcomePageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _welcome_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./welcome-routing.module */ 91893);
/* harmony import */ var _welcome_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./welcome.page */ 90231);
/* harmony import */ var swiper_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! swiper/angular */ 72443);







// Swiper

let WelcomePageModule = class WelcomePageModule {};
WelcomePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _welcome_routing_module__WEBPACK_IMPORTED_MODULE_0__.WelcomePageRoutingModule, swiper_angular__WEBPACK_IMPORTED_MODULE_7__.SwiperModule],
  declarations: [_welcome_page__WEBPACK_IMPORTED_MODULE_1__.WelcomePage]
})], WelcomePageModule);


/***/ }),

/***/ 90231:
/*!******************************************************!*\
  !*** ./src/app/pages/public/welcome/welcome.page.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WelcomePage: () => (/* binding */ WelcomePage)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _welcome_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./welcome.page.html?ngResource */ 32577);
/* harmony import */ var _welcome_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./welcome.page.scss?ngResource */ 50975);
/* harmony import */ var _welcome_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_welcome_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper */ 36705);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 95072);






swiper__WEBPACK_IMPORTED_MODULE_3__["default"].use([swiper__WEBPACK_IMPORTED_MODULE_3__.Pagination]);

let WelcomePage = class WelcomePage {
  constructor(router, ref) {
    this.router = router;
    this.ref = ref;
    this.language = '';
    this.last_slide = false;
    // Swiper config
    this.config = {
      slidesPerView: 1,
      spaceBetween: 50,
      pagination: {
        clickable: false
      },
      allowTouchMove: false // set true to allow swiping
    };
  }
  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }
  // Trigger swiper slide change
  swiperSlideChanged(e) {
    // console.log(e);
  }
  // Go to next slide
  nextSlide() {
    this.swiper.swiperRef.slideNext(500);
  }
  // Last slide trigger
  onLastSlide() {
    this.last_slide = true;
  }
  // Go to main content
  getStarted() {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Navigate to /home
      _this.router.navigateByUrl('/signin');
    })();
  }
  static #_ = this.ctorParameters = () => [{
    type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.Router
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ChangeDetectorRef
  }];
  static #_2 = this.propDecorators = {
    swiper: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewChild,
      args: ['swiper']
    }]
  };
};
WelcomePage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  selector: 'app-welcome',
  template: _welcome_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewEncapsulation.None,
  styles: [(_welcome_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], WelcomePage);


/***/ }),

/***/ 50975:
/*!*******************************************************************!*\
  !*** ./src/app/pages/public/welcome/welcome.page.scss?ngResource ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Swiper bundle */
/**
 * Swiper 8.4.7
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2023 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: January 30, 2023
 */
@font-face {
  font-family: swiper-icons;
  src: url("data:application/font-woff;charset=utf-8;base64, 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");
  font-weight: 400;
  font-style: normal;
}
:root {
  --swiper-theme-color:#007aff;
}

.swiper {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
}

.swiper-vertical > .swiper-wrapper {
  flex-direction: column;
}

.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
}

.swiper-android .swiper-slide, .swiper-wrapper {
  transform: translate3d(0px, 0, 0);
}

.swiper-pointer-events {
  touch-action: pan-y;
}

.swiper-pointer-events.swiper-vertical {
  touch-action: pan-x;
}

.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: transform;
}

.swiper-slide-invisible-blank {
  visibility: hidden;
}

.swiper-autoheight, .swiper-autoheight .swiper-slide {
  height: auto;
}

.swiper-autoheight .swiper-wrapper {
  align-items: flex-start;
  transition-property: transform, height;
}

.swiper-backface-hidden .swiper-slide {
  transform: translateZ(0);
  backface-visibility: hidden;
}

.swiper-3d, .swiper-3d.swiper-css-mode .swiper-wrapper {
  perspective: 1200px;
}

.swiper-3d .swiper-cube-shadow, .swiper-3d .swiper-slide, .swiper-3d .swiper-slide-shadow, .swiper-3d .swiper-slide-shadow-bottom, .swiper-3d .swiper-slide-shadow-left, .swiper-3d .swiper-slide-shadow-right, .swiper-3d .swiper-slide-shadow-top, .swiper-3d .swiper-wrapper {
  transform-style: preserve-3d;
}

.swiper-3d .swiper-slide-shadow, .swiper-3d .swiper-slide-shadow-bottom, .swiper-3d .swiper-slide-shadow-left, .swiper-3d .swiper-slide-shadow-right, .swiper-3d .swiper-slide-shadow-top {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.swiper-3d .swiper-slide-shadow {
  background: rgba(0, 0, 0, 0.15);
}

.swiper-3d .swiper-slide-shadow-left {
  background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}

.swiper-3d .swiper-slide-shadow-right {
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}

.swiper-3d .swiper-slide-shadow-top {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}

.swiper-3d .swiper-slide-shadow-bottom {
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}

.swiper-css-mode > .swiper-wrapper {
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.swiper-css-mode > .swiper-wrapper::-webkit-scrollbar {
  display: none;
}

.swiper-css-mode > .swiper-wrapper > .swiper-slide {
  scroll-snap-align: start start;
}

.swiper-horizontal.swiper-css-mode > .swiper-wrapper {
  scroll-snap-type: x mandatory;
}

.swiper-vertical.swiper-css-mode > .swiper-wrapper {
  scroll-snap-type: y mandatory;
}

.swiper-centered > .swiper-wrapper::before {
  content: "";
  flex-shrink: 0;
  order: 9999;
}

.swiper-centered.swiper-horizontal > .swiper-wrapper > .swiper-slide:first-child {
  margin-inline-start: var(--swiper-centered-offset-before);
}

.swiper-centered.swiper-horizontal > .swiper-wrapper::before {
  height: 100%;
  min-height: 1px;
  width: var(--swiper-centered-offset-after);
}

.swiper-centered.swiper-vertical > .swiper-wrapper > .swiper-slide:first-child {
  margin-block-start: var(--swiper-centered-offset-before);
}

.swiper-centered.swiper-vertical > .swiper-wrapper::before {
  width: 100%;
  min-width: 1px;
  height: var(--swiper-centered-offset-after);
}

.swiper-centered > .swiper-wrapper > .swiper-slide {
  scroll-snap-align: center center;
  scroll-snap-stop: always;
}

.swiper-virtual .swiper-slide {
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
}

.swiper-virtual.swiper-css-mode .swiper-wrapper::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
}

.swiper-virtual.swiper-css-mode.swiper-horizontal .swiper-wrapper::after {
  height: 1px;
  width: var(--swiper-virtual-size);
}

.swiper-virtual.swiper-css-mode.swiper-vertical .swiper-wrapper::after {
  width: 1px;
  height: var(--swiper-virtual-size);
}

:root {
  --swiper-navigation-size:44px;
}

.swiper-button-next, .swiper-button-prev {
  position: absolute;
  top: 50%;
  width: calc(var(--swiper-navigation-size) / 44 * 27);
  height: var(--swiper-navigation-size);
  margin-top: calc(0px - var(--swiper-navigation-size) / 2);
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--swiper-navigation-color, var(--swiper-theme-color));
}

.swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
  opacity: 0.35;
  cursor: auto;
  pointer-events: none;
}

.swiper-button-next.swiper-button-hidden, .swiper-button-prev.swiper-button-hidden {
  opacity: 0;
  cursor: auto;
  pointer-events: none;
}

.swiper-navigation-disabled .swiper-button-next, .swiper-navigation-disabled .swiper-button-prev {
  display: none !important;
}

.swiper-button-next:after, .swiper-button-prev:after {
  font-family: swiper-icons;
  font-size: var(--swiper-navigation-size);
  text-transform: none !important;
  letter-spacing: 0;
  font-variant: initial;
  line-height: 1;
}

.swiper-button-prev, .swiper-rtl .swiper-button-next {
  left: 10px;
  right: auto;
}

.swiper-button-prev:after, .swiper-rtl .swiper-button-next:after {
  content: "prev";
}

.swiper-button-next, .swiper-rtl .swiper-button-prev {
  right: 10px;
  left: auto;
}

.swiper-button-next:after, .swiper-rtl .swiper-button-prev:after {
  content: "next";
}

.swiper-button-lock {
  display: none;
}

.swiper-pagination {
  position: absolute;
  text-align: center;
  transition: 0.3s opacity;
  transform: translate3d(0, 0, 0);
  z-index: 10;
}

.swiper-pagination.swiper-pagination-hidden {
  opacity: 0;
}

.swiper-pagination-disabled > .swiper-pagination, .swiper-pagination.swiper-pagination-disabled {
  display: none !important;
}

.swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
  bottom: 10px;
  left: 0;
  width: 100%;
}

.swiper-pagination-bullets-dynamic {
  overflow: hidden;
  font-size: 0;
}

.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  transform: scale(0.33);
  position: relative;
}

.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active {
  transform: scale(1);
}

.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main {
  transform: scale(1);
}

.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev {
  transform: scale(0.66);
}

.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev {
  transform: scale(0.33);
}

.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next {
  transform: scale(0.66);
}

.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next {
  transform: scale(0.33);
}

.swiper-pagination-bullet {
  width: var(--swiper-pagination-bullet-width, var(--swiper-pagination-bullet-size, 8px));
  height: var(--swiper-pagination-bullet-height, var(--swiper-pagination-bullet-size, 8px));
  display: inline-block;
  border-radius: 50%;
  background: var(--swiper-pagination-bullet-inactive-color, #000);
  opacity: var(--swiper-pagination-bullet-inactive-opacity, 0.2);
}

button.swiper-pagination-bullet {
  border: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
  appearance: none;
}

.swiper-pagination-clickable .swiper-pagination-bullet {
  cursor: pointer;
}

.swiper-pagination-bullet:only-child {
  display: none !important;
}

.swiper-pagination-bullet-active {
  opacity: var(--swiper-pagination-bullet-opacity, 1);
  background: var(--swiper-pagination-color, var(--swiper-theme-color));
}

.swiper-pagination-vertical.swiper-pagination-bullets, .swiper-vertical > .swiper-pagination-bullets {
  right: 10px;
  top: 50%;
  transform: translate3d(0px, -50%, 0);
}

.swiper-pagination-vertical.swiper-pagination-bullets .swiper-pagination-bullet, .swiper-vertical > .swiper-pagination-bullets .swiper-pagination-bullet {
  margin: var(--swiper-pagination-bullet-vertical-gap, 6px) 0;
  display: block;
}

.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic, .swiper-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
}

.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet, .swiper-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  display: inline-block;
  transition: 0.2s transform, 0.2s top;
}

.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet, .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 4px);
}

.swiper-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic, .swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.swiper-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet, .swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  transition: 0.2s transform, 0.2s left;
}

.swiper-horizontal.swiper-rtl > .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  transition: 0.2s transform, 0.2s right;
}

.swiper-pagination-progressbar {
  background: rgba(0, 0, 0, 0.25);
  position: absolute;
}

.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  background: var(--swiper-pagination-color, var(--swiper-theme-color));
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: scale(0);
  transform-origin: left top;
}

.swiper-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  transform-origin: right top;
}

.swiper-horizontal > .swiper-pagination-progressbar, .swiper-pagination-progressbar.swiper-pagination-horizontal, .swiper-pagination-progressbar.swiper-pagination-vertical.swiper-pagination-progressbar-opposite, .swiper-vertical > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite {
  width: 100%;
  height: 4px;
  left: 0;
  top: 0;
}

.swiper-horizontal > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite, .swiper-pagination-progressbar.swiper-pagination-horizontal.swiper-pagination-progressbar-opposite, .swiper-pagination-progressbar.swiper-pagination-vertical, .swiper-vertical > .swiper-pagination-progressbar {
  width: 4px;
  height: 100%;
  left: 0;
  top: 0;
}

.swiper-pagination-lock {
  display: none;
}

.swiper-scrollbar {
  border-radius: 10px;
  position: relative;
  -ms-touch-action: none;
  background: rgba(0, 0, 0, 0.1);
}

.swiper-scrollbar-disabled > .swiper-scrollbar, .swiper-scrollbar.swiper-scrollbar-disabled {
  display: none !important;
}

.swiper-horizontal > .swiper-scrollbar, .swiper-scrollbar.swiper-scrollbar-horizontal {
  position: absolute;
  left: 1%;
  bottom: 3px;
  z-index: 50;
  height: 5px;
  width: 98%;
}

.swiper-scrollbar.swiper-scrollbar-vertical, .swiper-vertical > .swiper-scrollbar {
  position: absolute;
  right: 3px;
  top: 1%;
  z-index: 50;
  width: 5px;
  height: 98%;
}

.swiper-scrollbar-drag {
  height: 100%;
  width: 100%;
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  left: 0;
  top: 0;
}

.swiper-scrollbar-cursor-drag {
  cursor: move;
}

.swiper-scrollbar-lock {
  display: none;
}

.swiper-zoom-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.swiper-zoom-container > canvas, .swiper-zoom-container > img, .swiper-zoom-container > svg {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.swiper-slide-zoomed {
  cursor: move;
}

.swiper-lazy-preloader {
  width: 42px;
  height: 42px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -21px;
  margin-top: -21px;
  z-index: 10;
  transform-origin: 50%;
  box-sizing: border-box;
  border: 4px solid var(--swiper-preloader-color, var(--swiper-theme-color));
  border-radius: 50%;
  border-top-color: transparent;
}

.swiper-watch-progress .swiper-slide-visible .swiper-lazy-preloader, .swiper:not(.swiper-watch-progress) .swiper-lazy-preloader {
  animation: swiper-preloader-spin 1s infinite linear;
}

.swiper-lazy-preloader-white {
  --swiper-preloader-color:#fff;
}

.swiper-lazy-preloader-black {
  --swiper-preloader-color:#000;
}

@keyframes swiper-preloader-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.swiper .swiper-notification {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  opacity: 0;
  z-index: -1000;
}

.swiper-free-mode > .swiper-wrapper {
  transition-timing-function: ease-out;
  margin: 0 auto;
}

.swiper-grid > .swiper-wrapper {
  flex-wrap: wrap;
}

.swiper-grid-column > .swiper-wrapper {
  flex-wrap: wrap;
  flex-direction: column;
}

.swiper-fade.swiper-free-mode .swiper-slide {
  transition-timing-function: ease-out;
}

.swiper-fade .swiper-slide {
  pointer-events: none;
  transition-property: opacity;
}

.swiper-fade .swiper-slide .swiper-slide {
  pointer-events: none;
}

.swiper-fade .swiper-slide-active, .swiper-fade .swiper-slide-active .swiper-slide-active {
  pointer-events: auto;
}

.swiper-cube {
  overflow: visible;
}

.swiper-cube .swiper-slide {
  pointer-events: none;
  backface-visibility: hidden;
  z-index: 1;
  visibility: hidden;
  transform-origin: 0 0;
  width: 100%;
  height: 100%;
}

.swiper-cube .swiper-slide .swiper-slide {
  pointer-events: none;
}

.swiper-cube.swiper-rtl .swiper-slide {
  transform-origin: 100% 0;
}

.swiper-cube .swiper-slide-active, .swiper-cube .swiper-slide-active .swiper-slide-active {
  pointer-events: auto;
}

.swiper-cube .swiper-slide-active, .swiper-cube .swiper-slide-next, .swiper-cube .swiper-slide-next + .swiper-slide, .swiper-cube .swiper-slide-prev {
  pointer-events: auto;
  visibility: visible;
}

.swiper-cube .swiper-slide-shadow-bottom, .swiper-cube .swiper-slide-shadow-left, .swiper-cube .swiper-slide-shadow-right, .swiper-cube .swiper-slide-shadow-top {
  z-index: 0;
  backface-visibility: hidden;
}

.swiper-cube .swiper-cube-shadow {
  position: absolute;
  left: 0;
  bottom: 0px;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  z-index: 0;
}

.swiper-cube .swiper-cube-shadow:before {
  content: "";
  background: #000;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  filter: blur(50px);
}

.swiper-flip {
  overflow: visible;
}

.swiper-flip .swiper-slide {
  pointer-events: none;
  backface-visibility: hidden;
  z-index: 1;
}

.swiper-flip .swiper-slide .swiper-slide {
  pointer-events: none;
}

.swiper-flip .swiper-slide-active, .swiper-flip .swiper-slide-active .swiper-slide-active {
  pointer-events: auto;
}

.swiper-flip .swiper-slide-shadow-bottom, .swiper-flip .swiper-slide-shadow-left, .swiper-flip .swiper-slide-shadow-right, .swiper-flip .swiper-slide-shadow-top {
  z-index: 0;
  backface-visibility: hidden;
}

.swiper-creative .swiper-slide {
  backface-visibility: hidden;
  overflow: hidden;
  transition-property: transform, opacity, height;
}

.swiper-cards {
  overflow: visible;
}

.swiper-cards .swiper-slide {
  transform-origin: center bottom;
  backface-visibility: hidden;
  overflow: hidden;
}

app-welcome {
  background-color: var(--ion-color-dark);
}

app-welcome ion-content {
  --background: linear-gradient(135deg, var(--ion-color-dark), var(--ion-color-primary));
}

app-welcome .swiper-welcome {
  text-align: center;
}

app-welcome .swiper {
  width: 100%;
  height: 100%;
}

app-welcome .swiper-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

app-welcome h3 {
  font-size: 32px;
  line-height: 32px;
  font-weight: 800;
  margin: 40px 0 12px 0;
}

app-welcome p {
  font-size: 16px;
  line-height: 26px;
  color: var(--ion-color-tertiary);
}

app-welcome swiper img {
  max-width: 200px;
  margin-bottom: 10px;
}

app-welcome swiper ion-icon {
  color: var(--ion-color-light-shade);
  font-size: 82px;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  padding: 30px;
  border: 4px solid hsla(215, 20%, 58%, 0.25);
  background-color: var(--ion-color-primary);
}

app-welcome .swiper-pagination-bullet {
  background: var(--ion-color-light);
}

app-welcome .swiper-pagination-bullet-active {
  background: var(--ion-color-light);
}

app-welcome ion-footer {
  background: linear-gradient(135deg, var(--ion-color-dark), var(--ion-color-primary));
}`, "",{"version":3,"sources":["webpack://./src/app/pages/public/welcome/welcome.page.scss","webpack://./node_modules/swiper/swiper-bundle.min.css"],"names":[],"mappings":"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","sourcesContent":["/* Swiper bundle */\n@import 'swiper/css/bundle';\n\napp-welcome {\n  background-color: var(--ion-color-dark);\n}\n\napp-welcome ion-content {\n  --background: linear-gradient(135deg, var(--ion-color-dark), var(--ion-color-primary));\n}\n\napp-welcome .swiper-welcome {\n  text-align: center;\n}\n\napp-welcome .swiper {\n  width: 100%;\n  height: 100%;\n}\n\napp-welcome .swiper-slide {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 0 20px;\n}\n\napp-welcome h3 {\n  font-size: 32px;\n  line-height: 32px;\n  font-weight: 800;\n  margin: 40px 0 12px 0;\n}\n\napp-welcome p {\n  font-size: 16px;\n  line-height: 26px;\n  color: var(--ion-color-tertiary);\n}\n\napp-welcome swiper img {\n  max-width: 200px;\n  margin-bottom: 10px;\n}\n\napp-welcome swiper ion-icon {\n  color: var(--ion-color-light-shade);\n  font-size: 82px;\n  border-radius: 50%;\n  width: 100px;\n  height: 100px;\n  padding: 30px;\n  border: 4px solid hsl(215deg 20% 58% / 25%);\n  background-color: var(--ion-color-primary)\n}\n\napp-welcome .swiper-pagination-bullet {\n  background: var(--ion-color-light);\n}\n\napp-welcome .swiper-pagination-bullet-active {\n  background: var(--ion-color-light);\n}\n\napp-welcome ion-footer {\n  background: linear-gradient(135deg, var(--ion-color-dark), var(--ion-color-primary));\n}\n","/**\n * Swiper 8.4.7\n * Most modern mobile touch slider and framework with hardware accelerated transitions\n * https://swiperjs.com\n *\n * Copyright 2014-2023 Vladimir Kharlampidi\n *\n * Released under the MIT License\n *\n * Released on: January 30, 2023\n */\n\n@font-face{font-family:swiper-icons;src:url('data:application/font-woff;charset=utf-8;base64, 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');font-weight:400;font-style:normal}:root{--swiper-theme-color:#007aff}.swiper{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1}.swiper-vertical>.swiper-wrapper{flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:flex;transition-property:transform;box-sizing:content-box}.swiper-android .swiper-slide,.swiper-wrapper{transform:translate3d(0px,0,0)}.swiper-pointer-events{touch-action:pan-y}.swiper-pointer-events.swiper-vertical{touch-action:pan-x}.swiper-slide{flex-shrink:0;width:100%;height:100%;position:relative;transition-property:transform}.swiper-slide-invisible-blank{visibility:hidden}.swiper-autoheight,.swiper-autoheight .swiper-slide{height:auto}.swiper-autoheight .swiper-wrapper{align-items:flex-start;transition-property:transform,height}.swiper-backface-hidden .swiper-slide{transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-3d,.swiper-3d.swiper-css-mode .swiper-wrapper{perspective:1200px}.swiper-3d .swiper-cube-shadow,.swiper-3d .swiper-slide,.swiper-3d .swiper-slide-shadow,.swiper-3d .swiper-slide-shadow-bottom,.swiper-3d .swiper-slide-shadow-left,.swiper-3d .swiper-slide-shadow-right,.swiper-3d .swiper-slide-shadow-top,.swiper-3d .swiper-wrapper{transform-style:preserve-3d}.swiper-3d .swiper-slide-shadow,.swiper-3d .swiper-slide-shadow-bottom,.swiper-3d .swiper-slide-shadow-left,.swiper-3d .swiper-slide-shadow-right,.swiper-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-3d .swiper-slide-shadow{background:rgba(0,0,0,.15)}.swiper-3d .swiper-slide-shadow-left{background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-3d .swiper-slide-shadow-right{background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-3d .swiper-slide-shadow-top{background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-3d .swiper-slide-shadow-bottom{background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-css-mode>.swiper-wrapper{overflow:auto;scrollbar-width:none;-ms-overflow-style:none}.swiper-css-mode>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-css-mode>.swiper-wrapper>.swiper-slide{scroll-snap-align:start start}.swiper-horizontal.swiper-css-mode>.swiper-wrapper{scroll-snap-type:x mandatory}.swiper-vertical.swiper-css-mode>.swiper-wrapper{scroll-snap-type:y mandatory}.swiper-centered>.swiper-wrapper::before{content:'';flex-shrink:0;order:9999}.swiper-centered.swiper-horizontal>.swiper-wrapper>.swiper-slide:first-child{margin-inline-start:var(--swiper-centered-offset-before)}.swiper-centered.swiper-horizontal>.swiper-wrapper::before{height:100%;min-height:1px;width:var(--swiper-centered-offset-after)}.swiper-centered.swiper-vertical>.swiper-wrapper>.swiper-slide:first-child{margin-block-start:var(--swiper-centered-offset-before)}.swiper-centered.swiper-vertical>.swiper-wrapper::before{width:100%;min-width:1px;height:var(--swiper-centered-offset-after)}.swiper-centered>.swiper-wrapper>.swiper-slide{scroll-snap-align:center center;scroll-snap-stop:always}.swiper-virtual .swiper-slide{-webkit-backface-visibility:hidden;transform:translateZ(0)}.swiper-virtual.swiper-css-mode .swiper-wrapper::after{content:'';position:absolute;left:0;top:0;pointer-events:none}.swiper-virtual.swiper-css-mode.swiper-horizontal .swiper-wrapper::after{height:1px;width:var(--swiper-virtual-size)}.swiper-virtual.swiper-css-mode.swiper-vertical .swiper-wrapper::after{width:1px;height:var(--swiper-virtual-size)}:root{--swiper-navigation-size:44px}.swiper-button-next,.swiper-button-prev{position:absolute;top:50%;width:calc(var(--swiper-navigation-size)/ 44 * 27);height:var(--swiper-navigation-size);margin-top:calc(0px - (var(--swiper-navigation-size)/ 2));z-index:10;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--swiper-navigation-color,var(--swiper-theme-color))}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-next.swiper-button-hidden,.swiper-button-prev.swiper-button-hidden{opacity:0;cursor:auto;pointer-events:none}.swiper-navigation-disabled .swiper-button-next,.swiper-navigation-disabled .swiper-button-prev{display:none!important}.swiper-button-next:after,.swiper-button-prev:after{font-family:swiper-icons;font-size:var(--swiper-navigation-size);text-transform:none!important;letter-spacing:0;font-variant:initial;line-height:1}.swiper-button-prev,.swiper-rtl .swiper-button-next{left:10px;right:auto}.swiper-button-prev:after,.swiper-rtl .swiper-button-next:after{content:'prev'}.swiper-button-next,.swiper-rtl .swiper-button-prev{right:10px;left:auto}.swiper-button-next:after,.swiper-rtl .swiper-button-prev:after{content:'next'}.swiper-button-lock{display:none}.swiper-pagination{position:absolute;text-align:center;transition:.3s opacity;transform:translate3d(0,0,0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-pagination-disabled>.swiper-pagination,.swiper-pagination.swiper-pagination-disabled{display:none!important}.swiper-horizontal>.swiper-pagination-bullets,.swiper-pagination-bullets.swiper-pagination-horizontal,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:10px;left:0;width:100%}.swiper-pagination-bullets-dynamic{overflow:hidden;font-size:0}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transform:scale(.33);position:relative}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{transform:scale(.33)}.swiper-pagination-bullet{width:var(--swiper-pagination-bullet-width,var(--swiper-pagination-bullet-size,8px));height:var(--swiper-pagination-bullet-height,var(--swiper-pagination-bullet-size,8px));display:inline-block;border-radius:50%;background:var(--swiper-pagination-bullet-inactive-color,#000);opacity:var(--swiper-pagination-bullet-inactive-opacity, .2)}button.swiper-pagination-bullet{border:none;margin:0;padding:0;box-shadow:none;-webkit-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet:only-child{display:none!important}.swiper-pagination-bullet-active{opacity:var(--swiper-pagination-bullet-opacity, 1);background:var(--swiper-pagination-color,var(--swiper-theme-color))}.swiper-pagination-vertical.swiper-pagination-bullets,.swiper-vertical>.swiper-pagination-bullets{right:10px;top:50%;transform:translate3d(0px,-50%,0)}.swiper-pagination-vertical.swiper-pagination-bullets .swiper-pagination-bullet,.swiper-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:var(--swiper-pagination-bullet-vertical-gap,6px) 0;display:block}.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,.swiper-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;transform:translateY(-50%);width:8px}.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,.swiper-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;transition:.2s transform,.2s top}.swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,.swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 var(--swiper-pagination-bullet-horizontal-gap,4px)}.swiper-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;transform:translateX(-50%);white-space:nowrap}.swiper-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s left}.swiper-horizontal.swiper-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s right}.swiper-pagination-progressbar{background:rgba(0,0,0,.25);position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:var(--swiper-pagination-color,var(--swiper-theme-color));position:absolute;left:0;top:0;width:100%;height:100%;transform:scale(0);transform-origin:left top}.swiper-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{transform-origin:right top}.swiper-horizontal>.swiper-pagination-progressbar,.swiper-pagination-progressbar.swiper-pagination-horizontal,.swiper-pagination-progressbar.swiper-pagination-vertical.swiper-pagination-progressbar-opposite,.swiper-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{width:100%;height:4px;left:0;top:0}.swiper-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-pagination-progressbar.swiper-pagination-horizontal.swiper-pagination-progressbar-opposite,.swiper-pagination-progressbar.swiper-pagination-vertical,.swiper-vertical>.swiper-pagination-progressbar{width:4px;height:100%;left:0;top:0}.swiper-pagination-lock{display:none}.swiper-scrollbar{border-radius:10px;position:relative;-ms-touch-action:none;background:rgba(0,0,0,.1)}.swiper-scrollbar-disabled>.swiper-scrollbar,.swiper-scrollbar.swiper-scrollbar-disabled{display:none!important}.swiper-horizontal>.swiper-scrollbar,.swiper-scrollbar.swiper-scrollbar-horizontal{position:absolute;left:1%;bottom:3px;z-index:50;height:5px;width:98%}.swiper-scrollbar.swiper-scrollbar-vertical,.swiper-vertical>.swiper-scrollbar{position:absolute;right:3px;top:1%;z-index:50;width:5px;height:98%}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:rgba(0,0,0,.5);border-radius:10px;left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-scrollbar-lock{display:none}.swiper-zoom-container{width:100%;height:100%;display:flex;justify-content:center;align-items:center;text-align:center}.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{max-width:100%;max-height:100%;object-fit:contain}.swiper-slide-zoomed{cursor:move}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;transform-origin:50%;box-sizing:border-box;border:4px solid var(--swiper-preloader-color,var(--swiper-theme-color));border-radius:50%;border-top-color:transparent}.swiper-watch-progress .swiper-slide-visible .swiper-lazy-preloader,.swiper:not(.swiper-watch-progress) .swiper-lazy-preloader{animation:swiper-preloader-spin 1s infinite linear}.swiper-lazy-preloader-white{--swiper-preloader-color:#fff}.swiper-lazy-preloader-black{--swiper-preloader-color:#000}@keyframes swiper-preloader-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.swiper .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}.swiper-free-mode>.swiper-wrapper{transition-timing-function:ease-out;margin:0 auto}.swiper-grid>.swiper-wrapper{flex-wrap:wrap}.swiper-grid-column>.swiper-wrapper{flex-wrap:wrap;flex-direction:column}.swiper-fade.swiper-free-mode .swiper-slide{transition-timing-function:ease-out}.swiper-fade .swiper-slide{pointer-events:none;transition-property:opacity}.swiper-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-fade .swiper-slide-active,.swiper-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-cube{overflow:visible}.swiper-cube .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1;visibility:hidden;transform-origin:0 0;width:100%;height:100%}.swiper-cube .swiper-slide .swiper-slide{pointer-events:none}.swiper-cube.swiper-rtl .swiper-slide{transform-origin:100% 0}.swiper-cube .swiper-slide-active,.swiper-cube .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-cube .swiper-slide-active,.swiper-cube .swiper-slide-next,.swiper-cube .swiper-slide-next+.swiper-slide,.swiper-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-cube .swiper-slide-shadow-bottom,.swiper-cube .swiper-slide-shadow-left,.swiper-cube .swiper-slide-shadow-right,.swiper-cube .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0px;width:100%;height:100%;opacity:.6;z-index:0}.swiper-cube .swiper-cube-shadow:before{content:'';background:#000;position:absolute;left:0;top:0;bottom:0;right:0;filter:blur(50px)}.swiper-flip{overflow:visible}.swiper-flip .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1}.swiper-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-flip .swiper-slide-active,.swiper-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-flip .swiper-slide-shadow-bottom,.swiper-flip .swiper-slide-shadow-left,.swiper-flip .swiper-slide-shadow-right,.swiper-flip .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-creative .swiper-slide{-webkit-backface-visibility:hidden;backface-visibility:hidden;overflow:hidden;transition-property:transform,opacity,height}.swiper-cards{overflow:visible}.swiper-cards .swiper-slide{transform-origin:center bottom;-webkit-backface-visibility:hidden;backface-visibility:hidden;overflow:hidden}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 32577:
/*!*******************************************************************!*\
  !*** ./src/app/pages/public/welcome/welcome.page.html?ngResource ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-content>\n  <swiper class=\"swiper-welcome\" #swiper [config]=\"config\" (slideChange)=\"swiperSlideChanged($event)\"\n    (reachEnd)=\"onLastSlide()\">\n    <ng-template swiperSlide>\n      <ion-icon name=\"logo-ionic\" class=\"animate__animated animate__fadeInDown\"></ion-icon>\n\n      <h3 class=\"animate__animated animate__fadeInUp\">\n        <ion-text color=\"light\">Ionic Start Theme</ion-text>\n      </h3>\n      <p class=\"animate__animated animate__fadeInUp\">\n        <ion-text color=\"medium\">Latest Ionic version starter theme. Experiencing the best of new features to start your project.</ion-text>\n      </p>\n    </ng-template>\n\n    <ng-template swiperSlide>\n      <ion-icon name=\"logo-capacitor\" class=\"animate__animated animate__fadeInDown\"></ion-icon>\n\n      <h3 class=\"animate__animated animate__fadeInUp\">\n        <ion-text color=\"light\">Capacitor Ready</ion-text>\n      </h3>\n      <p class=\"animate__animated animate__fadeInUp\">\n        <ion-text color=\"medium\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore optio mollitia sed sint quod, repellendus illum ex, doloribus, quis ipsam officiis hic saepe commodi? Ab porro laboriosam totam iure et.</ion-text>\n      </p>\n    </ng-template>\n\n    <ng-template swiperSlide>\n      <ion-icon name=\"stats-chart\" class=\"animate__animated animate__fadeInDown\"></ion-icon>\n\n      <h3 class=\"animate__animated animate__fadeInUp\">\n        <ion-text color=\"light\">Components Sample</ion-text>\n      </h3>\n      <p class=\"animate__animated animate__fadeInUp\">\n        <ion-text color=\"medium\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore optio mollitia sed sint quod, repellendus illum ex, doloribus, quis ipsam officiis hic saepe commodi? Ab porro laboriosam totam iure et.</ion-text>\n      </p>\n    </ng-template>\n  </swiper>\n</ion-content>\n\n<ion-footer class=\"ion-padding-bottom-large animate__animated animate__fadeInUp\">\n  <ion-button class=\"ion-margin\" expand=\"block\" size=\"large\" color=\"secondary\" (click)=\"nextSlide()\" *ngIf=\"!last_slide\">\n    Next\n    <ion-icon slot=\"end\" name=\"arrow-forward-outline\"></ion-icon>\n  </ion-button>\n  <ion-button class=\"ion-margin\" expand=\"block\" size=\"large\" color=\"secondary\" (click)=\"getStarted()\" *ngIf=\"last_slide\">\n    Get started\n  </ion-button>\n</ion-footer>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_public_welcome_welcome_module_ts.js.map