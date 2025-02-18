(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_parentApp_gallery_gallery_module_ts"],{

/***/ 31875:
/*!*******************************************************************!*\
  !*** ./src/app/pages/parentApp/gallery/gallery-routing.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GalleryRoutingModule: () => (/* binding */ GalleryRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _gallery_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gallery.component */ 25107);




const routes = [{
  path: "",
  component: _gallery_component__WEBPACK_IMPORTED_MODULE_0__.GalleryComponent
}];
let GalleryRoutingModule = class GalleryRoutingModule {};
GalleryRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], GalleryRoutingModule);


/***/ }),

/***/ 25107:
/*!**************************************************************!*\
  !*** ./src/app/pages/parentApp/gallery/gallery.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GalleryComponent: () => (/* binding */ GalleryComponent)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _gallery_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gallery.component.html?ngResource */ 38213);
/* harmony import */ var _gallery_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gallery.component.scss?ngResource */ 82347);
/* harmony import */ var _gallery_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_gallery_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ 39545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var _view_parent_gallery_file_detail_view_parent_gallery_file_detail_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./view-parent-gallery-file-detail/view-parent-gallery-file-detail.page */ 24938);












const groupBy = (arr, key) => arr.reduce((groups, item) => {
  (groups[key(item)] ||= []).push(item);
  return groups;
}, {});
let GalleryComponent = class GalleryComponent {
  constructor(routerOutlet, modalController, userService, galleryService, commonMethod) {
    this.routerOutlet = routerOutlet;
    this.modalController = modalController;
    this.userService = userService;
    this.galleryService = galleryService;
    this.commonMethod = commonMethod;
    this.dateExample = new Date().toISOString();
    this.content_loaded = false;
  }
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Gallery');
    this.userService.getAcademicYear().subscribe(academicYearId => {
      this.academicYearId = academicYearId;
      this.getAllGallerys();
    });
  }
  ngOnInit() {}
  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  getAllGallerys() {
    let startOfMonth = moment__WEBPACK_IMPORTED_MODULE_5__().startOf('month');
    let endOfMonth = moment__WEBPACK_IMPORTED_MODULE_5__().endOf('month');
    let galleryRequest = {
      academicYearId: this.academicYearId,
      fromDate: startOfMonth,
      tillDate: endOfMonth,
      studentId: this.userService.CurrentSiblingId
    };
    this.galleryService.getAllGalleryForStudent(galleryRequest).subscribe(result => {
      this.galleryList = result.galleryList.reduce((groups, item) => {
        const groupIndex = groups.findIndex(group => group[0].category === item.startDate.format('LL'));
        if (groupIndex !== -1) {
          groups[groupIndex].push(item);
        } else {
          groups.push([item]);
        }
        return groups;
      }, []);
      this.content_loaded = true;
    });
  }
  openGalleryDetail(currentGalleryOnPopup) {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this.modalController.create({
        component: _view_parent_gallery_file_detail_view_parent_gallery_file_detail_page__WEBPACK_IMPORTED_MODULE_7__.ViewParentGalleryFileDetailPage,
        componentProps: {
          currentGalleryOnPopup: currentGalleryOnPopup
        }
      });
      yield modal.present();
    })();
  }
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonRouterOutlet
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__.UserService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_3__.GalleryServiceProxy
  }, {
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_6__.CommonMethodService
  }];
  static #_2 = this.propDecorators = {
    modal: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild,
      args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonModal]
    }]
  };
};
GalleryComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  selector: 'app-gallery',
  template: _gallery_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_gallery_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], GalleryComponent);


/***/ }),

/***/ 38050:
/*!***********************************************************!*\
  !*** ./src/app/pages/parentApp/gallery/gallery.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GalleryModule: () => (/* binding */ GalleryModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-charts */ 16045);
/* harmony import */ var _gallery_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gallery.component */ 25107);
/* harmony import */ var _view_parent_gallery_file_detail_view_parent_gallery_file_detail_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view-parent-gallery-file-detail/view-parent-gallery-file-detail.page */ 24938);
/* harmony import */ var _gallery_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gallery-routing.module */ 31875);
/* harmony import */ var swiper_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! swiper/angular */ 72443);










let GalleryModule = class GalleryModule {};
GalleryModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _gallery_routing_module__WEBPACK_IMPORTED_MODULE_2__.GalleryRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, ng2_charts__WEBPACK_IMPORTED_MODULE_8__.NgChartsModule, swiper_angular__WEBPACK_IMPORTED_MODULE_9__.SwiperModule],
  declarations: [_gallery_component__WEBPACK_IMPORTED_MODULE_0__.GalleryComponent, _view_parent_gallery_file_detail_view_parent_gallery_file_detail_page__WEBPACK_IMPORTED_MODULE_1__.ViewParentGalleryFileDetailPage]
})], GalleryModule);


/***/ }),

/***/ 24938:
/*!*****************************************************************************************************************!*\
  !*** ./src/app/pages/parentApp/gallery/view-parent-gallery-file-detail/view-parent-gallery-file-detail.page.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewParentGalleryFileDetailPage: () => (/* binding */ ViewParentGalleryFileDetailPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _view_parent_gallery_file_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-parent-gallery-file-detail.page.html?ngResource */ 5994);
/* harmony import */ var _view_parent_gallery_file_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view-parent-gallery-file-detail.page.scss?ngResource */ 26450);
/* harmony import */ var _view_parent_gallery_file_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_view_parent_gallery_file_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 80436);







let ViewParentGalleryFileDetailPage = class ViewParentGalleryFileDetailPage {
  constructor(modalCtrl, http, sanitizer) {
    this.modalCtrl = modalCtrl;
    this.http = http;
    this.sanitizer = sanitizer;
    this.galleryItems = [];
    this.imageSize = {
      width: '100%',
      height: 'auto',
      space: 1
    };
    this.imageVideoSize = {
      width: '100%',
      height: '50vh',
      space: 1
    };
    this.contentType = 'Images';
    this.currentIndex = 0;
    this.config = {
      slidesPerView: 1,
      spaceBetween: 50,
      pagination: {
        clickable: true
      },
      allowTouchMove: true,
      loop: false
    };
  }
  sanitizeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ngOnInit() {
    this.setupGallery();
  }
  ionViewDidEnter() {
    // this.setupGallery();
  }
  close() {
    return this.modalCtrl.dismiss(false, 'cancel');
  }
  getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
  }
  isImage(fileName) {
    const extension = this.getFileExtension(fileName);
    return ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
  }
  isVideo(fileName) {
    const extension = this.getFileExtension(fileName);
    // return ['mp4', 'avi', 'mov', 'mkv', 'webm'].includes(extension);
  }
  getProjectVideoFullPath(filename) {
    const video = this.currentGalleryOnPopup.lstGalleryMediaDetail.find(file => file.contentUrl.includes(filename));
    return video ? video.contentUrl : undefined;
  }
  processImage(file) {
    if (this.isImage(file.fileName)) {
      return {
        url: file.fullPath,
        title: file.fileName,
        type: 'image'
      };
    }
    return null;
  }
  setupGallery() {
    if (this.currentGalleryOnPopup) {
      const imageItems = this.currentGalleryOnPopup.lstGalleryDetail.map(file => this.processImage(file)).filter(item => item);
      const videoUrls = this.currentGalleryOnPopup.lstGalleryMediaDetail.map(file => this.getProjectVideoFullPath(file.contentUrl)).filter(url => url);
      this.galleryItems = [...imageItems, ...videoUrls.map(url => ({
        url: url,
        title: 'Video',
        type: 'video'
      }))];
    }
  }
  goToSlide(index) {
    if (this.swiper) {
      this.swiper.swiperRef.slideTo(index);
    }
  }
  onSlideChange() {
    if (this.swiper) {
      this.currentIndex = this.swiper.swiperRef.activeIndex;
    }
  }
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.ModalController
  }, {
    type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient
  }, {
    type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.DomSanitizer
  }];
  static #_2 = this.propDecorators = {
    currentGalleryOnPopup: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input
    }],
    swiper: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewChild,
      args: ['swiper']
    }]
  };
};
ViewParentGalleryFileDetailPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  selector: 'view-parent-gallery-file-detail',
  template: _view_parent_gallery_file_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_view_parent_gallery_file_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], ViewParentGalleryFileDetailPage);


/***/ }),

/***/ 82347:
/*!***************************************************************************!*\
  !*** ./src/app/pages/parentApp/gallery/gallery.component.scss?ngResource ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
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
ion-list.gallery-card ion-item {
  border-bottom: 0;
  --background: transparent;
  border-radius: 4px;
  margin-bottom: 5px;
  align-items: flex-start;
}
ion-list.gallery-card ion-item ion-avatar span {
  color: green;
}
ion-list.gallery-card ion-item.admin {
  background-color: #badee2;
}
ion-list.gallery-card ion-item.teacher {
  background-color: #eac0d4;
}
ion-list.gallery-card ion-item.teacher ion-avatar span {
  color: red;
}
ion-list.gallery-card ion-item.principal {
  background-color: #eae9c0;
}
ion-list.gallery-card ion-item.principal ion-avatar span {
  color: #da9513;
}
ion-list.gallery-card ion-item:last-child {
  border-bottom: 0 !important;
}
ion-list.gallery-card ion-item ion-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 45px;
  height: 45px;
  margin-right: 5px;
}
ion-list.gallery-card ion-item ion-avatar span {
  font-size: 20px;
  font-weight: bold;
}
ion-list.gallery-card ion-item ion-label {
  font-size: 13px;
  font-weight: 400;
}
ion-list.gallery-card ion-item.important {
  background: blue;
  --background: red;
}
@media (prefers-color-scheme: dark) {
  ion-list.gallery-card ion-item.important {
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

ion-label {
  color: black;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/gallery/gallery.component.scss"],"names":[],"mappings":"AACI;EACI,2BAAA;AAAR;;AAKA;EACI,cAAA;EACA,iCAAA;EACA,6BAAA;EACA,gBAAA;EACA,kBAAA;AAFJ;AAGI;EACI,eAAA;AADR;AAIQ;EACI,gBAAA;EACA,yBAAA;EACA,kBAAA;EACA,kBAAA;EACA,uBAAA;AAFZ;AAKgB;EACI,YAAA;AAHpB;AAMY;EACI,yBAAA;AAJhB;AAMY;EACI,yBAAA;AAJhB;AAMoB;EACI,UAAA;AAJxB;AAQY;EACI,yBAAA;AANhB;AAQoB;EACI,cAAA;AANxB;AAUY;EACI,2BAAA;AARhB;AAUY;EACI,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,sBAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;AARhB;AASgB;EACI,eAAA;EACA,iBAAA;AAPpB;AAUY;EACI,eAAA;EACA,gBAAA;AARhB;AAWY;EAEI,gBAAA;EAEA,iBAAA;AAXhB;AAcc;EACE;IACE,mBAAA;EAZhB;AACF;;AAmBA;EACA,gBAAA;AAhBA;AAiBG;EACC,qBAAA;EACA,sBAAA;EACA,kBAAA;EACA,uCAAA;EACA,WAAA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;AAfJ;AAgBI;EACI,eAAA;AAdR;;AAqBI;EACI,eAAA;AAlBR;AAmBQ;EACI,eAAA;EACA,cAAA;EACA,WAAA;AAjBZ;;AAsBA;EACI,cAAA;EACA,eAAA;EACA,SAAA;EACA,aAAA;AAnBJ;AAoBI;EACI,WAAA;EACA,YAAA;EACA,sBAAA;EACA,YAAA;EACA,kBAAA;EACA,aAAA;EACA,kBAAA;EACA,kBAAA;AAlBR;AAmBQ;EACI,WAAA;AAjBZ;;AAwBA;EACI,iBAAA;EACA,YAAA;AArBJ;;AAuBA;EACI,YAAA;AApBJ","sourcesContent":[":host {\n    ion-card {\n        box-shadow: none !important;\n    }\n\n}\n\nion-list {\n    padding-top: 0;\n    background-color: #fff !important;\n    --background: #fff !important;\n    border-radius: 0;\n    --border-radius: 0;\n    ion-card-subtitle {\n        font-size: 18px;\n    }\n    &.gallery-card {\n        ion-item {\n            border-bottom: 0;\n            --background: transparent;\n            border-radius:4px;\n            margin-bottom: 5px;\n            align-items: flex-start;\n\n            ion-avatar {\n                span {\n                    color: green;\n                }\n            }\n            &.admin {\n                background-color: #badee2;\n            }\n            &.teacher {\n                background-color: #eac0d4;\n                ion-avatar {\n                    span {\n                        color: red;\n                    }\n                }\n            }\n            &.principal {\n                background-color: #eae9c0;\n                ion-avatar {\n                    span {\n                        color: #da9513;\n                    }\n                }\n            }\n            &:last-child {\n                border-bottom: 0 !important;\n            }\n            ion-avatar {\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                background-color: #fff;\n                width: 45px;\n                height: 45px;\n                margin-right: 5px;\n                span {\n                    font-size: 20px;\n                    font-weight: bold;\n                }\n            }\n            ion-label {\n                font-size: 13px;\n                font-weight: 400;\n            }\n\n            &.important {\n               \n                background: blue;\n              \n                --background: red;\n              }\n              \n              @media (prefers-color-scheme: dark) {\n                &.important {\n                  --background: green;\n                }\n              }\n        }\n        }\n}\n\n\n.download {\nmargin-top: 20px;\n   a {\n    text-decoration: none;\n    border: 1px solid #000;\n    border-radius: 4px;\n    background-color: var(--ion-color-dark);\n    color: #fff;\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 16px;\n    ion-icon {\n        font-size: 24px;\n    }\n   }\n}\n\n\n.modal-text-header {\n    ion-card-subtitle {\n        font-size: 16px;\n        ion-text {\n            font-size: 14px;\n            display: block;\n            color: #000;\n        }\n    }\n}\n\n.uploaded-file-text {\n    margin: 10px 0;\n    font-size: 12px;\n    border: 0;\n    display: flex;\n    .file-thumb {\n        width: 64px;\n        height: 64px;\n        border: 1px solid #ccc;\n        padding: 5px;\n        border-radius: 4px;\n        display: flex;\n        position: relative;\n        margin-right: 10px;\n        img {\n            width: 100%;\n        }\n      \n    }\n\n}\n\n.bold-black-text {\n    font-weight: bold;\n    color: black;\n}\nion-label {\n    color: black ;\n  }\n  "],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 26450:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/pages/parentApp/gallery/view-parent-gallery-file-detail/view-parent-gallery-file-detail.page.scss?ngResource ***!
  \******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@charset "UTF-8";
:host ion-card {
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
ion-list.gallery-card ion-item {
  border-bottom: 0;
  --background: transparent;
  border-radius: 4px;
  margin-bottom: 5px;
  align-items: flex-start;
}
ion-list.gallery-card ion-item ion-avatar span {
  color: green;
}
ion-list.gallery-card ion-item.admin {
  background-color: #badee2;
}
ion-list.gallery-card ion-item.teacher {
  background-color: #eac0d4;
}
ion-list.gallery-card ion-item.teacher ion-avatar span {
  color: red;
}
ion-list.gallery-card ion-item.principal {
  background-color: #eae9c0;
}
ion-list.gallery-card ion-item.principal ion-avatar span {
  color: #da9513;
}
ion-list.gallery-card ion-item:last-child {
  border-bottom: 0 !important;
}
ion-list.gallery-card ion-item ion-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 45px;
  height: 45px;
  margin-right: 5px;
}
ion-list.gallery-card ion-item ion-avatar span {
  font-size: 20px;
  font-weight: bold;
}
ion-list.gallery-card ion-item ion-label {
  font-size: 13px;
  font-weight: 400;
}
ion-list.gallery-card ion-item.important {
  background: blue;
  --background: red;
}
@media (prefers-color-scheme: dark) {
  ion-list.gallery-card ion-item.important {
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
  color: #000000; /* Black text color */
  background-color: transparent; /* Default background color */
}

.plain-input {
  background-color: #fff;
  border: none;
  padding: 8px;
}

.bold-black-text {
  font-weight: bold;
  color: black;
}

.video-link-wrap {
  margin-top: 10px;
}

.videoText a {
  display: block;
  margin-bottom: 25px; /* Add space between links */
  color: black; /* Or any preferred color */
  text-decoration: none;
  word-break: break-all; /* Ensures long URLs wrap within the container */
}

.videoText a:hover {
  text-decoration: underline;
}

.black-bullet {
  list-style-type: none; /* Remove default bullet */
  padding-left: 0; /* Optional: adjust padding to align with your design */
  margin: 0; /* Remove default margin */
}

.black-bullet li {
  position: relative; /* For the pseudo-element */
  padding-left: 20px; /* Space for the bullet */
  color: black; /* This ensures the bullet points themselves are black */
}

.black-bullet li::before {
  content: "•"; /* Bullet character */
  position: absolute;
  left: 0;
  color: black; /* Ensures the bullet color is black */
}

.black-bullet li a {
  text-decoration: none;
  color: inherit; /* Ensures the link color matches the text color */
}

ion-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

ion-card {
  width: 100%;
  max-width: 300px;
}

ion-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.image-list-thumb {
  padding: 2px 2px 2px 2px;
  height: 150px;
}

.image-modal {
  width: 100% !important;
  height: 100%;
  top: 0 !important;
  left: 0 !important;
}

.transparent {
  background: rgba(0, 0, 0, 0.7);
}

.slider {
  width: 100%;
  height: 100%;
}

.image {
  width: 100%;
  height: 600px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center, center;
}

/* Container styling for the gallery sections */
.container {
  padding: 0 15px;
}

/* Image and video section styling */
.images-section,
.videos-section {
  margin-bottom: 30px; /* Spacing between sections */
}

/* Title styling for sections */
.images-section h3,
.videos-section h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333; /* Darker text color for better readability */
}

/* Swiper styling */
swiper {
  display: block;
}

swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0; /* Light background for slides */
  border-radius: 8px; /* Rounded corners for slides */
  overflow: hidden; /* Hide overflow content */
}

/* Image styling */
img {
  max-width: 400px; /* Ensure images do not exceed container width */
  height: auto; /* Maintain aspect ratio */
  border-radius: 8px; /* Rounded corners for images */
}

/* Video styling */
video {
  max-width: 300px; /* Ensure videos do not exceed container width */
  height: auto; /* Maintain aspect ratio */
  border-radius: 8px; /* Rounded corners for videos */
}

/* Specific size for gallery sections */
.images-section,
.videos-section {
  height: 400px; /* Set a fixed height for consistency */
}

.swiper-slide img,
.swiper-slide video {
  max-height: 100%; /* Ensure content does not exceed container height */
}

.media-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.swiper-pagination {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 10;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/gallery/view-parent-gallery-file-detail/view-parent-gallery-file-detail.page.scss"],"names":[],"mappings":"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","sourcesContent":[":host {\n    ion-card {\n        box-shadow: none !important;\n    }\n\n}\n\nion-list {\n    padding-top: 0;\n    background-color: #fff !important;\n    --background: #fff !important;\n    border-radius: 0;\n    --border-radius: 0;\n    ion-card-subtitle {\n        font-size: 18px;\n    }\n    &.gallery-card {\n        ion-item {\n            border-bottom: 0;\n            --background: transparent;\n            border-radius:4px;\n            margin-bottom: 5px;\n            align-items: flex-start;\n\n            ion-avatar {\n                span {\n                    color: green;\n                }\n            }\n            &.admin {\n                background-color: #badee2;\n            }\n            &.teacher {\n                background-color: #eac0d4;\n                ion-avatar {\n                    span {\n                        color: red;\n                    }\n                }\n            }\n            &.principal {\n                background-color: #eae9c0;\n                ion-avatar {\n                    span {\n                        color: #da9513;\n                    }\n                }\n            }\n            &:last-child {\n                border-bottom: 0 !important;\n            }\n            ion-avatar {\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                background-color: #fff;\n                width: 45px;\n                height: 45px;\n                margin-right: 5px;\n                span {\n                    font-size: 20px;\n                    font-weight: bold;\n                }\n            }\n            ion-label {\n                font-size: 13px;\n                font-weight: 400;\n            }\n\n            &.important {\n               \n                background: blue;\n              \n                --background: red;\n              }\n              \n              @media (prefers-color-scheme: dark) {\n                &.important {\n                  --background: green;\n                }\n              }\n        }\n        }\n}\n\n\n.download {\nmargin-top: 20px;\n   a {\n    text-decoration: none;\n    border: 1px solid #000;\n    border-radius: 4px;\n    background-color: var(--ion-color-dark);\n    color: #fff;\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 16px;\n    ion-icon {\n        font-size: 24px;\n    }\n   }\n}\n\n\n.modal-text-header {\n    ion-card-subtitle {\n        font-size: 16px;\n        ion-text {\n            font-size: 14px;\n            display: block;\n            color: #000;\n        }\n    }\n}\n\n.uploaded-file-text {\n    margin: 10px 0;\n    font-size: 12px;\n    border: 0;\n    display: flex;\n    .file-thumb {\n        width: 64px;\n        height: 64px;\n        border: 1px solid #ccc;\n        padding: 5px;\n        border-radius: 4px;\n        display: flex;\n        position: relative;\n        margin-right: 10px;\n        img {\n            width: 100%;\n        }\n      \n    }\n\n}\n.bold-black-text {\n    font-weight: bold;\n    color: #000000; /* Black text color */\n    background-color: transparent; /* Default background color */\n}\n\n.plain-input {\n   \n    background-color: #fff;\n    border: none;\n    padding: 8px;\n  }\n\n  .bold-black-text {\n    font-weight: bold;\n    color: black;\n  }\n  \n  .video-link-wrap {\n    margin-top: 10px;\n  }\n  \n  .videoText a {\n    display: block;\n    margin-bottom: 25px; /* Add space between links */\n    color: black; /* Or any preferred color */\n    text-decoration: none;\n    word-break: break-all; /* Ensures long URLs wrap within the container */\n  }\n  \n  .videoText a:hover {\n    text-decoration: underline;\n  }\n\n  .black-bullet {\n    list-style-type: none; /* Remove default bullet */\n    padding-left: 0; /* Optional: adjust padding to align with your design */\n    margin: 0; /* Remove default margin */\n  }\n  \n  .black-bullet li {\n    position: relative; /* For the pseudo-element */\n    padding-left: 20px; /* Space for the bullet */\n    color: black; /* This ensures the bullet points themselves are black */\n  }\n  \n  .black-bullet li::before {\n    content: '•'; /* Bullet character */\n    position: absolute;\n    left: 0;\n    color: black; /* Ensures the bullet color is black */\n  }\n  \n  .black-bullet li a {\n    text-decoration: none;\n    color: inherit; /* Ensures the link color matches the text color */\n  }\n\n  ion-slide {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  \n  ion-card {\n    width: 100%; // Ensure the card takes the full width of the slide\n    max-width: 300px; // Adjust based on your design needs\n  }\n  \n  ion-img {\n    width: 100%; // Ensure the image fits the card\n    height: auto; // Maintain aspect ratio\n    border-radius: 8px; // Optional: Add border radius for rounded corners\n  }\n  \n  .image-list-thumb {\n    padding: 2px 2px 2px 2px;\n    height: 150px;\n  }\n  \n  .image-modal {\n    width: 100% !important;\n    height: 100%;\n    top: 0 !important;\n    left: 0 !important;\n  }\n  \n  .transparent {\n    background: rgba(0, 0, 0, 0.7);\n  }\n  \n  .slider {\n    width: 100%;\n    height: 100%;\n  }\n  \n  .image {\n    width: 100%;\n    height: 600px;\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: center, center;\n  }\n  /* Container styling for the gallery sections */\n.container {\n  padding: 0 15px;\n}\n\n/* Image and video section styling */\n.images-section,\n.videos-section {\n  margin-bottom: 30px; /* Spacing between sections */\n}\n\n/* Title styling for sections */\n.images-section h3,\n.videos-section h3 {\n  font-size: 1.5rem;\n  font-weight: bold;\n  margin-bottom: 15px;\n  color: #333; /* Darker text color for better readability */\n}\n\n/* Swiper styling */\nswiper {\n  display: block;\n  // width: 500px;\n  // height: 500px; /* Ensure swiper takes full height of its container */\n}\n\nswiper-slide {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #f0f0f0; /* Light background for slides */\n  border-radius: 8px; /* Rounded corners for slides */\n  overflow: hidden; /* Hide overflow content */\n}\n\n/* Image styling */\nimg {\n  max-width: 400px; /* Ensure images do not exceed container width */\n  height: auto; /* Maintain aspect ratio */\n  border-radius: 8px; /* Rounded corners for images */\n}\n\n/* Video styling */\nvideo {\n  max-width: 300px; /* Ensure videos do not exceed container width */\n  height: auto; /* Maintain aspect ratio */\n  border-radius: 8px; /* Rounded corners for videos */\n}\n\n/* Specific size for gallery sections */\n.images-section,\n.videos-section {\n  height: 400px; /* Set a fixed height for consistency */\n}\n\n.swiper-slide img,\n.swiper-slide video {\n  max-height: 100%; /* Ensure content does not exceed container height */\n}\n\n.media-wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n}\n\n.swiper-pagination {\n  position: absolute;\n  bottom: 10px;\n  left: 0;\n  right: 0;\n  text-align: center;\n  z-index: 10;\n}\n\n  \n  \n  \n\n\n  \n  \n  \n  \n  \n  \n  \n  \n\n\n  \n  \n  \n  "],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 38213:
/*!***************************************************************************!*\
  !*** ./src/app/pages/parentApp/gallery/gallery.component.html?ngResource ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-content [fullscreen]=\"true\" class=\"new\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"handleRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <ng-container *ngIf=\"!content_loaded\">\n    <ion-list-header class=\"ion-list-header-small\">\n      <ion-label><ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text></ion-label>\n      <ion-note color=\"tertiary\" class=\"ion-note-small\">\n        <ion-skeleton-text animated style=\"width: 40px\"></ion-skeleton-text>\n      </ion-note>\n    </ion-list-header>\n\n    <ion-list class=\"list-custom animate__animated animate__fadeIn\" lines=\"full\">\n      <ion-item color=\"light\" button detail=\"false\" *ngFor=\"let i of [].constructor(12)\">\n        <ion-avatar slot=\"start\" class=\"ion-avatar-default-icon\">\n          <ion-skeleton-text animated></ion-skeleton-text>\n        </ion-avatar>\n        <ion-label>\n          <h3>\n            <ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text>\n          </h3>\n          <p>\n            <ion-skeleton-text animated style=\"width: 75%\"></ion-skeleton-text>\n          </p>\n        </ion-label>\n        <ion-skeleton-text slot=\"end\" animated style=\"width: 15%\"></ion-skeleton-text>\n      </ion-item>\n    </ion-list>\n  </ng-container>\n  <ng-container *ngIf=\"content_loaded\">\n    <ion-card class=\"rounded-0 mt-5\" *ngIf=\"galleryList.length>0\">\n      <ng-container *ngFor=\"let galleryGroup of galleryList\">\n        <ion-list class=\"gallery-card\">\n          <ion-card-header class=\"px-0\">\n            <ion-card-subtitle color=\"dark\">{{galleryGroup[0].startDate.format('LL')}}</ion-card-subtitle>\n          </ion-card-header>\n\n          <ion-item lines=\"none\" *ngFor=\"let gallery of galleryGroup\" class=\"admin align-items-center\"\n            (click)=\"openGalleryDetail(gallery)\">\n            <ion-avatar slot=\"start\">\n              <span class=\"black-text\">{{ gallery.galleryTitle[0].toUpperCase() }}</span>\n            </ion-avatar>\n            <ion-label class=\"ms-2 black-text\">\n              <span ><b>Gallery Title : &nbsp;</b> </span> <span >{{gallery.galleryTitle}}</span>\n            </ion-label>\n          </ion-item>\n        </ion-list>\n      </ng-container>\n\n    </ion-card>\n    <ion-card class=\"mt-5\" *ngIf=\"galleryList.length==0\">\n      <ion-card-header class=\"nrf-header\">\n        <ion-card-subtitle color=\"dark\">No Gallery Found</ion-card-subtitle>\n      </ion-card-header>\n    </ion-card>\n  </ng-container>\n\n</ion-content>";

/***/ }),

/***/ 5994:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/pages/parentApp/gallery/view-parent-gallery-file-detail/view-parent-gallery-file-detail.page.html?ngResource ***!
  \******************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header collapse=\"fade\" [translucent]=\"true\" class=\"modal-header\">\n  <ion-toolbar>\n    <ion-buttons slot=\"end\">\n      <ion-button color=\"primary\" fill=\"solid\" (click)=\"close()\">\n        Close\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<!-- <ion-content class=\"modal-body\">\n  <div>\n    <swiper [config]=\"config\">\n      <ng-template swiperSlide *ngFor=\"let item of galleryItems\">\n        <div class=\"media-wrapper\">\n          <img *ngIf=\"item.type === 'image'\" [src]=\"item.url\" [alt]=\"item.title\">\n          <iframe *ngIf=\"item.type === 'video'\" height=\"50vh\"  [ngStyle]=\"{width: imageVideoSize.width, height: imageVideoSize.height}\" [src]=\"this.sanitizeUrl(item.url)\"\n          frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"\n          ></iframe>\n        </div>\n      </ng-template>\n      <div class=\"swiper-pagination\" slot=\"pagination\"></div>\n    </swiper>\n  </div>\n</ion-content> -->\n\n<ion-content class=\"modal-body\">\n  <div>\n    <swiper [config]=\"config\">\n      <ng-template swiperSlide *ngFor=\"let item of galleryItems\">\n        <div class=\"media-wrapper\">\n          <img *ngIf=\"item.type === 'image'\" [src]=\"item.url\" [alt]=\"item.title\">\n          <iframe *ngIf=\"item.type === 'video'\" [ngStyle]=\"{width: imageVideoSize.width, height: imageVideoSize.height}\" [src]=\"sanitizeUrl(item.url)\"\n          frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"\n          ></iframe>\n        </div>\n      </ng-template>\n      <div class=\"swiper-pagination\" slot=\"pagination\"></div>\n    </swiper>\n  </div>\n</ion-content>\n\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_parentApp_gallery_gallery_module_ts.js.map