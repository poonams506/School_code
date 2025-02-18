(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_parentApp_tabs_parent-tabs_module_ts"],{

/***/ 25285:
/*!************************************************************************!*\
  !*** ./src/app/pages/parentApp/tabs/header/parent-header.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParentHeaderComponent: () => (/* binding */ ParentHeaderComponent)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _parent_header_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parent-header.component.html?ngResource */ 77371);
/* harmony import */ var _parent_header_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parent-header.component.scss?ngResource */ 2321);
/* harmony import */ var _parent_header_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_parent_header_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var src_app_services_fcm_fcm_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/fcm/fcm.service */ 93881);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/toast/toast.service */ 33545);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/user-service */ 4286);












let ParentHeaderComponent = class ParentHeaderComponent {
  constructor(commonMethod, userService, router, fcmService, toastService, commonAppService) {
    this.commonMethod = commonMethod;
    this.userService = userService;
    this.router = router;
    this.fcmService = fcmService;
    this.toastService = toastService;
    this.commonAppService = commonAppService;
    this.isComponentActive = true;
  }
  ngOnInit() {
    this.updateHeaderDetail();
  }
  changeSibling(studentId, classId) {
    //check if multiple sibling exist
    if (this.students.length > 0 && this.userService?.CurrentSiblingId == studentId) {
      return;
    }
    // change sibling
    this.userService.CurrentSiblingId = studentId;
    this.userService.CurrentSiblingClassId = classId;
    this.currentStudent = this.students.filter(x => x.studentId == studentId)[0];
    this.toastService.presentToast('Success', 'Student switched successfully !', 'top', 'success', 2000);
    this.router.navigate(['parent-app/parentTab/home']);
  }
  ionViewDidEnter() {
    this.updateHeaderDetail();
  }
  ngOnDestroy() {
    this.isComponentActive = true;
  }
  updateHeaderDetail() {
    this.commonAppService.getStudentsByUserId().subscribe(studentResponse => {
      this.students = studentResponse.lstStudents;
      if (this.students.length == 1 || !this.userService?.CurrentSiblingId || this.userService?.CurrentSiblingId == 0) {
        this.userService.CurrentSiblingId = this.students[0].studentId;
        this.userService.CurrentSiblingClassId = this.students[0].classId;
        this.currentStudent = this.students.filter(x => x.studentId == this.students[0].studentId)[0];
      } else if (this.userService?.CurrentSiblingId && this.userService?.CurrentSiblingId > 0) {
        this.currentStudent = this.students.filter(x => x.studentId == this.userService?.CurrentSiblingId)[0];
      }
      //this.updateUserDetail();
      this.commonAppService.getSchoolDetail().subscribe(schoolResponse => {
        this.logoUrl = schoolResponse.logoUrl;
        this.schoolName = schoolResponse.schoolName;
      });
    });
  }
  updateUserDetail() {
    this.userService.getUser().subscribe(result => {
      this.currentUserFullName = result.userFullNameByRole;
      this.profileImageURL = result.profileImageURL;
    });
  }
  logout() {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      localStorage.clear();
      sessionStorage.clear();
      _this.userService.setAcademicYear(0);
      _this.userService.setSchoolId(0);
      _this.userService.CurrentSiblingClassId = 0;
      _this.userService.CurrentSiblingId = 0;
      _this.userService.CurrentUserRoleId = null;
      _this.userService.UserToken = null;
      yield _this.fcmService.clearFCMTokenAndRemoveListener();
      _this.router.navigate(['signin']);
    })();
  }
  GoBack() {
    this.router.navigate(['parent-app/parentTab/home']);
  }
  OpenMenu() {
    this.ionMenu.open();
    this.updateHeaderDetail();
  }
  backButtonVisible() {
    const defaultHref = '/parent-app/parentTab/home';
    return this.router.url !== defaultHref;
  }
  static #_ = this.ctorParameters = () => [{
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_3__.CommonMethodService
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_7__.UserService
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_8__.Router
  }, {
    type: src_app_services_fcm_fcm_service__WEBPACK_IMPORTED_MODULE_4__.FcmService
  }, {
    type: src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_6__.ToastService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_5__.CommonAppServiceProxy
  }];
  static #_2 = this.propDecorators = {
    ionTabs: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild,
      args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTabs, {
        static: true
      }]
    }],
    ionMenu: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild,
      args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonMenu, {
        static: true
      }]
    }]
  };
};
ParentHeaderComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  selector: 'parent-app-header',
  template: _parent_header_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_parent_header_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], ParentHeaderComponent);


/***/ }),

/***/ 1434:
/*!********************************************************************!*\
  !*** ./src/app/pages/parentApp/tabs/parent-tabs-routing.module.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TeacherTabsPageRoutingModule: () => (/* binding */ TeacherTabsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _parent_tabs_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parent-tabs.page */ 58348);




const routes = [{
  path: '',
  component: _parent_tabs_page__WEBPACK_IMPORTED_MODULE_0__.ParentTabsPage,
  children: [{
    path: 'dashboard',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_highcharts_highcharts_js"), __webpack_require__.e("default-node_modules_highcharts_highcharts-3d_js-node_modules_highcharts-angular_fesm2020_hig-258897"), __webpack_require__.e("src_app_pages_parentApp_parent-dashboard_parent-dashboard_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../parent-dashboard/parent-dashboard.module */ 5942)).then(m => m.ParentDashboardModule)
  }, {
    path: 'home',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_parentApp_home_home_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../home/home.module */ 18978)).then(m => m.HomePageModule)
  }, {
    path: 'calendar',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_pages_teacherApp_calendar_calendar-event-detail-modal_calendar-event-detail-m-80a610"), __webpack_require__.e("src_app_pages_parentApp_calendar_calendar_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../calendar/calendar.module */ 55072)).then(m => m.CalendarModule)
  }, {
    path: 'timetable',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_parentApp_timetable_timetable_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../timetable/timetable.module */ 1538)).then(m => m.TimetableModule)
  }, {
    path: 'homework',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_parentApp_homework_homework_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../homework/homework.module */ 39840)).then(m => m.HomeworkModule)
  }, {
    path: 'fees',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_pages_parentApp_fees_fees_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../fees/fees.module */ 63742)).then(m => m.FeesModule)
  }, {
    path: 'transport-fees',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_pages_parentApp_transport-fees_transport-fees_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../transport-fees/transport-fees.module */ 62618)).then(m => m.TransportFeesModule)
  }, {
    path: 'notice',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_parentApp_notice_notice_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../notice/notice.module */ 37548)).then(m => m.NoticeModule)
  }, {
    path: 'gallery',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_swiper_angular_fesm2015_swiper_angular_mjs"), __webpack_require__.e("src_app_pages_parentApp_gallery_gallery_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../gallery/gallery.module */ 38050)).then(m => m.GalleryModule)
  }, {
    path: 'attendance',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_highcharts_highcharts_js"), __webpack_require__.e("common"), __webpack_require__.e("src_app_pages_parentApp_attendance_attendance_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../attendance/attendance.module */ 48738)).then(m => m.AttendanceModule)
  }, {
    path: 'parents',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_parentApp_parents_parents_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../parents/parents.module */ 86414)).then(m => m.ParentsModule)
  }, {
    path: 'profile',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_parentApp_profile_parent-profile_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../profile/parent-profile.module */ 297)).then(m => m.ParentProfilePageModule)
  }, {
    path: 'payments',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_parentApp_payments_payment-detail_payment-detail_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../payments/payment-detail/payment-detail.module */ 86055)).then(m => m.PaymentDetailPageModule)
  }, {
    path: 'track-bus',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_parentApp_track-bus_track-bus_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../track-bus/track-bus.module */ 72718)).then(m => m.TrackBusModule)
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }]
}];
let TeacherTabsPageRoutingModule = class TeacherTabsPageRoutingModule {};
TeacherTabsPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], TeacherTabsPageRoutingModule);


/***/ }),

/***/ 4227:
/*!************************************************************!*\
  !*** ./src/app/pages/parentApp/tabs/parent-tabs.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParentTabsPageModule: () => (/* binding */ ParentTabsPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 90852);
/* harmony import */ var _parent_tabs_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parent-tabs.page */ 58348);
/* harmony import */ var _parent_tabs_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parent-tabs-routing.module */ 1434);
/* harmony import */ var _header_parent_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header/parent-header.component */ 25285);









let ParentTabsPageModule = class ParentTabsPageModule {};
ParentTabsPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
  imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateModule, _parent_tabs_routing_module__WEBPACK_IMPORTED_MODULE_1__.TeacherTabsPageRoutingModule],
  declarations: [_parent_tabs_page__WEBPACK_IMPORTED_MODULE_0__.ParentTabsPage, _header_parent_header_component__WEBPACK_IMPORTED_MODULE_2__.ParentHeaderComponent],
  exports: [_parent_tabs_page__WEBPACK_IMPORTED_MODULE_0__.ParentTabsPage]
})], ParentTabsPageModule);


/***/ }),

/***/ 58348:
/*!**********************************************************!*\
  !*** ./src/app/pages/parentApp/tabs/parent-tabs.page.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParentTabsPage: () => (/* binding */ ParentTabsPage)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _parent_tabs_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parent-tabs.page.html?ngResource */ 99844);
/* harmony import */ var _parent_tabs_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parent-tabs.page.scss?ngResource */ 41746);
/* harmony import */ var _parent_tabs_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_parent_tabs_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 90852);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var src_app_translate_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/translate-config.service */ 57394);










let ParentTabsPage = class ParentTabsPage {
  constructor(actionSheetController, translate, translateConfigService, userService, router) {
    this.actionSheetController = actionSheetController;
    this.translate = translate;
    this.translateConfigService = translateConfigService;
    this.userService = userService;
    this.router = router;
    this.show = true;
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
  }
  ngOnInit() {}
  ionViewDidEnter() {}
  // Select action
  changeLanguage() {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const actionSheet = yield _this.actionSheetController.create({
        header: 'Select Languages',
        cssClass: 'custom-action-sheet',
        buttons: [{
          text: 'English',
          icon: 'language-outline',
          handler: () => {
            _this.language = 'en';
            _this.translateConfigService.setLanguage('en');
          }
        }, {
          text: 'Marathi',
          icon: 'language-outline',
          handler: () => {
            _this.language = 'mr';
            _this.translateConfigService.setLanguage('mr');
          }
        }, {
          text: 'Hindi',
          icon: 'language-outline',
          handler: () => {
            _this.language = 'hn';
            _this.translateConfigService.setLanguage('hn');
          }
        }, {
          text: 'Cancel',
          //icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      yield actionSheet.present();
      const {
        role,
        data
      } = yield actionSheet.onDidDismiss();
      console.log('onDidDismiss resolved with role and data', role, data);
    })();
  }
  selectAction() {
    var _this2 = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const actionSheet = yield _this2.actionSheetController.create({
        header: 'Choose an action',
        buttons: [{
          text: 'Add something',
          icon: 'wallet',
          handler: () => {
            // Put in logic ...
          }
        }, {
          text: 'Change something',
          icon: 'swap-horizontal-outline',
          handler: () => {
            // Put in logic ...
          }
        }, {
          text: 'Set something',
          icon: 'calculator',
          handler: () => {
            // Put in logic ...
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }]
      });
      yield actionSheet.present();
    })();
  }
  GoToDashboard() {}
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ActionSheetController
  }, {
    type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService
  }, {
    type: src_app_translate_config_service__WEBPACK_IMPORTED_MODULE_4__.TranslateConfigService
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_3__.UserService
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.Router
  }];
  static #_2 = this.propDecorators = {
    ionTabs: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild,
      args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonTabs, {
        static: true
      }]
    }]
  };
};
ParentTabsPage = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'parent-app-tabs',
  template: _parent_tabs_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_parent_tabs_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], ParentTabsPage);


/***/ }),

/***/ 33545:
/*!*************************************************!*\
  !*** ./src/app/services/toast/toast.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToastService: () => (/* binding */ ToastService)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ 37401);




let ToastService = class ToastService {
  constructor(toastController) {
    this.toastController = toastController;
  }
  presentToast(header, message, position, color, duration, icon) {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!icon) {
        switch (color) {
          case 'success':
            icon = 'checkmark-outline';
            break;
          case 'medium':
            icon = 'information-circle-outline';
            break;
          case 'danger':
            icon = 'warning-outline';
            break;
        }
      }
      const toast = yield _this.toastController.create({
        header: header,
        message: message,
        duration: duration,
        position: position,
        color: color,
        icon: icon
      });
      yield toast.present();
    })();
  }
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.ToastController
  }];
};
ToastService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
  providedIn: 'root'
})], ToastService);


/***/ }),

/***/ 2321:
/*!*************************************************************************************!*\
  !*** ./src/app/pages/parentApp/tabs/header/parent-header.component.scss?ngResource ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `ion-menu::part(backdrop) {
  background-color: rgba(0, 0, 0, 0.3);
}

ion-menu::part(container) {
  border-radius: 25px 0px 0px 0;
  box-shadow: 4px 0px 16px rgba(255, 0, 255, 0.18);
}

.menu-header {
  background: #fff;
  background-image: url('menu-bg.png');
  background-position: center;
  background-repeat: no-repeat;
  height: 185px;
  background-size: 110%;
  border-top-left-radius: 25px;
  border-top-right-radius: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8px;
}
.menu-header div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.menu-header p {
  font-size: 16px;
  color: #fff;
  margin-top: 10px;
}
.menu-header .class {
  font-size: 13px;
  color: #000;
  font-weight: 500;
}

ion-menu-toggle ion-item {
  --background:#fff !important;
  --inner-border-width: 0 !important;
  border-radius: 10px;
  font-size: 14px;
  font-weight: normal;
}
ion-menu-toggle ion-item ion-icon {
  color: #9577DC;
  margin-inline-end: 15px;
  font-size: 24px;
}
ion-menu-toggle ion-item ion-label {
  font-weight: 400;
  font-size: 16px;
  color: #000;
}
ion-menu-toggle ion-item.active-menu {
  --background:#9577DC !important;
  --color:#fff !important;
}
ion-menu-toggle ion-item.active-menu ion-icon {
  color: #fff !important;
}

ion-list, .list-ios {
  height: calc(100vh - 270px);
  padding-top: 0;
  background-color: #fff !important;
}

.logout-btn {
  font-size: 16px;
  height: 40px;
  --border-radius: 50px;
  --box-shadow: none;
  --background: linear-gradient(135deg, #da8e63, #c754aa);
  --color: var(--white-color);
}

.student-header-photo {
  height: 30px;
  width: 30px;
}

.white-bg-color {
  color: #222222 !important;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/tabs/header/parent-header.component.scss"],"names":[],"mappings":"AAAA;EACI,oCAAA;AACJ;;AAEE;EACE,6BAAA;EAEA,gDAAA;AAAJ;;AAGE;EACE,gBAAA;EACA,oCAAA;EACA,2BAAA;EACA,4BAAA;EACA,aAAA;EACC,qBAAA;EACD,4BAAA;EACA,0BAAA;EACA,aAAA;EACA,uBAAA;EACA,uBAAA;EACA,gBAAA;AAAJ;AACI;EACE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;AACN;AACI;EACE,eAAA;EACA,WAAA;EACA,gBAAA;AACN;AACI;EACE,eAAA;EACA,WAAA;EACA,gBAAA;AACN;;AAKI;EACE,4BAAA;EACA,kCAAA;EACA,mBAAA;EACA,eAAA;EACA,mBAAA;AAFN;AAGM;EACE,cAAA;EACA,uBAAA;EACA,eAAA;AADR;AAGM;EACE,gBAAA;EACA,eAAA;EACA,WAAA;AADR;AAGM;EACE,+BAAA;EACA,uBAAA;AADR;AAEQ;EACE,sBAAA;AAAV;;AAME;EACE,2BAAA;EACA,cAAA;EACA,iCAAA;AAHJ;;AAKE;EACE,eAAA;EACA,YAAA;EACA,qBAAA;EACA,kBAAA;EAEA,uDAAA;EACE,2BAAA;AAHN;;AAKE;EACE,YAAA;EACA,WAAA;AAFJ;;AAKI;EACE,yBAAA;AAFN","sourcesContent":["ion-menu::part(backdrop) {\n    background-color: rgba(0, 0, 0, 0.3);\n  }\n  \n  ion-menu::part(container) {\n    border-radius: 25px 0px 0px 0;\n  \n    box-shadow: 4px 0px 16px rgba(255, 0, 255, 0.18);\n  }\n\n  .menu-header {\n    background: #fff;\n    background-image: url('../../../../../assets/menu-bg.png');\n    background-position: center;\n    background-repeat: no-repeat;\n    height: 185px;\n     background-size: 110%;\n    border-top-left-radius: 25px;\n    border-top-right-radius: 0;\n    display: flex;\n    align-items:flex-start;\n    justify-content: center;\n    padding-top: 8px;\n    div {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n    }\n    p {\n      font-size: 16px;\n      color: #fff;\n      margin-top: 10px;\n    }\n    .class {\n      font-size: 13px;\n      color: #000;\n      font-weight: 500;\n    }\n  }\n\n\n  ion-menu-toggle {\n    ion-item {\n      --background:#fff !important;\n      --inner-border-width: 0 !important;\n      border-radius: 10px;\n      font-size:14px;\n      font-weight: normal;\n      ion-icon {\n        color:#9577DC;\n        margin-inline-end: 15px;\n        font-size: 24px;\n      }\n      ion-label {\n        font-weight: 400;\n        font-size:16px;\n        color: #000;\n      }\n      &.active-menu {\n        --background:#9577DC !important;\n        --color:#fff !important;\n        ion-icon {\n          color:#fff !important;\n        }\n      }\n    }\n  }\n\n  ion-list, .list-ios {\n    height: calc(100vh - 270px);\n    padding-top: 0;\n    background-color: #fff !important;\n  }\n  .logout-btn {\n    font-size: 16px;\n    height: 40px;\n    --border-radius: 50px;\n    --box-shadow: none;\n    //--background: var(--orange-bg-color);\n    --background: linear-gradient(135deg, #da8e63, #c754aa);\n      --color: var(--white-color);\n  }\n  .student-header-photo{\n    height: 30px;\n    width: 30px;\n    }\n\n    .white-bg-color {\n      color: #222222 !important;\n    }"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 41746:
/*!***********************************************************************!*\
  !*** ./src/app/pages/parentApp/tabs/parent-tabs.page.scss?ngResource ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.h-tab {
  bottom: 8px !important;
}

ion-tab-bar {
  --background:#ffffff !important;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  bottom: 0px;
  position: relative;
  border-radius: 0px;
  width: 100%;
  border-top: none;
  margin: 0 auto;
  height: 55px;
  border-top: 1px solid #ccc;
}

ion-tab-button {
  --color: #fff;
  --color-selected: #5a41a0;
  --padding-bottom: 4px;
  --padding-top: 0px;
}
ion-tab-button::before {
  background-color: transparent;
  display: block;
  content: "";
  margin: 0 auto;
  width: 20px;
  height: 2px;
}
ion-tab-button.tab-selected::before {
  background-color: #5a41a0;
}
ion-tab-button ion-icon {
  font-size: 20px;
  color: #5a41a0;
}
ion-tab-button ion-label {
  font-size: 12px;
  color: #5a41a0;
  font-weight: 500;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/tabs/parent-tabs.page.scss"],"names":[],"mappings":"AAEA;EACE,sBAAA;AADF;;AAIA;EAGE,+BAAA;EACA,0CAAA;EACA,WAAA;EACA,kBAAA;EACA,kBAAA;EACA,WAAA;EACA,gBAAA;EACA,cAAA;EACA,YAAA;EACA,0BAAA;AAHF;;AAMA;EACE,aAAA;EACA,yBAAA;EACA,qBAAA;EACA,kBAAA;AAHF;AAKE;EACE,6BAAA;EACA,cAAA;EACA,WAAA;EACA,cAAA;EACA,WAAA;EACA,WAAA;AAHJ;AAME;EACE,yBAAA;AAJJ;AAME;EACE,eAAA;EACA,cAAA;AAJJ;AAME;EACE,eAAA;EACA,cAAA;EACA,gBAAA;AAJJ","sourcesContent":["\n\n.h-tab {\n  bottom: 8px !important;\n}\n\nion-tab-bar {\n  //--background: linear-gradient(135deg, #da8e63, #c754aa);\n  //--background: linear-gradient(#da8e63 0%, #c754aa 100%);\n  --background:#ffffff !important;\n  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);\n  bottom: 0px;\n  position: relative;\n  border-radius: 0px;\n  width: 100%;\n  border-top: none;\n  margin: 0 auto;\n  height: 55px;\n  border-top:1px solid #ccc\n}\n\nion-tab-button {\n  --color: #fff;\n  --color-selected: #5a41a0;\n  --padding-bottom: 4px;\n  --padding-top: 0px;\n\n  &::before {\n    background-color: transparent;\n    display: block;\n    content: \"\";\n    margin: 0 auto;\n    width: 20px;\n    height: 2px;\n  }\n\n  &.tab-selected::before {\n    background-color: #5a41a0;\n  }\n  ion-icon {\n    font-size: 20px;\n    color: #5a41a0;\n  }\n  ion-label {\n    font-size: 12px;\n    color: #5a41a0;\n    font-weight: 500;\n\n  }\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 77371:
/*!*************************************************************************************!*\
  !*** ./src/app/pages/parentApp/tabs/header/parent-header.component.html?ngResource ***!
  \*************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header [translucent]=\"true\"  class=\"main-header\" id=\"parent-menu-content\">\n    <ion-toolbar  class=\"dark-toolbar\" >\n        <ion-buttons slot=\"start\" >\n            <ion-back-button\n            *ngIf=\"backButtonVisible()\"\n              text=\"Back\"\n              class=\"dark-color\"\n              (click)=\"GoBack()\"\n              defaultHref=\"parent-app/parentTab/home\"\n              \n            >\n            </ion-back-button>\n          </ion-buttons>\n      <ion-title class=\"fw-bold dark-color header-title\">{{commonMethod.getHeaderTitle()}}</ion-title>\n    \n      <ion-buttons slot=\"end\">\n        <ion-avatar id=\"popover-button\" class=\"end student-header-photo\" slot=\"end\">\n          <img *ngIf=\"currentStudent?.profileImageURL\" src=\"{{currentStudent?.profileImageURL}}\" />\n          <ion-icon color=\"dark\" style=\"height: 30px; width: 30px;\" *ngIf=\"!currentStudent?.profileImageURL\" name=\"person-circle\"></ion-icon>\n        </ion-avatar>\n        <ion-popover trigger=\"popover-button\" [dismissOnSelect]=\"true\">\n          <ng-template>\n            <ion-content>\n              <ion-title  class=\"mt-2 mb-3 fw-normal ms-0 dark-color\" size=\"small\"\n                >Select Sibling</ion-title\n              >\n              <ul class=\"list-group mb-2\">\n                <li class=\"p-3 py-1 fw-bold white-bg-color\" *ngFor=\"let student of students\"\n                  (click)=\"changeSibling(student.studentId,student.classId)\"\n                  >{{student.studentFullName}}</li>\n              </ul>\n            </ion-content>\n          </ng-template>\n        </ion-popover>\n    \n        <ion-menu-button (click)=\"OpenMenu()\" ></ion-menu-button>\n      </ion-buttons>\n    </ion-toolbar>\n  </ion-header> \n\n\n  <ion-menu side=\"end\" auto-hide=\"false\"  contentId=\"parent-menu-content\">\n    <div class=\"menu-header\">\n      <div>\n      <ion-avatar>\n        <img *ngIf=\"currentStudent?.profileImageURL==''\" alt=\"{{currentStudent?.studentFullName}}\" \n        src=\"https://ionicframework.com/docs/img/demos/avatar.svg\" />\n        \n        <img *ngIf=\"currentStudent?.profileImageURL!=''\" alt=\"{{currentStudent?.studentFullName}}\"\n         src=\"{{currentStudent?.profileImageURL}}\" />\n      </ion-avatar>\n      <p class=\"mb-0\">{{currentStudent?.studentFullName}}</p>\n      <p class=\"mb-0\">Class: {{currentStudent?.className}} , Roll No.: {{currentStudent?.rollNumber}}</p>\n    </div>\n        </div>\n    <ion-content class=\"ion-padding\">\n      <ion-list>\n           <ion-menu-toggle>\n        \n  \n          <ion-item button routerLink=\"/parent-app/parentTab/attendance\"  routerLinkActive=\"active-menu\">\n            <ion-icon slot=\"start\" name=\"document-text-outline\"></ion-icon>\n            <ion-label>Attendance </ion-label>\n          </ion-item>\n          <ion-item button routerLink=\"/parent-app/parentTab/timetable\"  routerLinkActive=\"active-menu\">\n            <ion-icon slot=\"start\" name=\"calendar-outline\"></ion-icon>\n            <ion-label>Timetable </ion-label>\n          </ion-item>\n          <ion-item button routerLink=\"/parent-app/parentTab/homework\"  routerLinkActive=\"active\">\n            <ion-icon slot=\"start\" name=\"book-outline\"></ion-icon>\n            <ion-label>Homework </ion-label>\n          </ion-item>\n          <ion-item button routerLink=\"/parent-app/parentTab/notice\"  routerLinkActive=\"active\">\n            <ion-icon slot=\"start\" name=\"notifications-outline\"></ion-icon>\n            <ion-label>Notice </ion-label>\n          </ion-item>\n          <ion-item button routerLink=\"/parent-app/parentTab/parents\"  routerLinkActive=\"active\">\n            <ion-icon slot=\"start\" name=\"people-circle-outline\"></ion-icon>\n            <ion-label>Parents </ion-label>\n          </ion-item>\n          <ion-item button routerLink=\"/parent-app/parentTab/calendar\"  routerLinkActive=\"active\">\n            <ion-icon slot=\"start\" name=\"calendar-number-outline\"></ion-icon>\n            <ion-label>Calendar </ion-label>\n          </ion-item>\n          <ion-item button routerLink=\"/parent-app/parentTab/fees\"  routerLinkActive=\"active\">\n            <ion-icon slot=\"start\" name=\"calendar-number-outline\"></ion-icon>\n            <ion-label>Academic Fees </ion-label>\n          </ion-item>\n          <ion-item button routerLink=\"/parent-app/parentTab/transport-fees\"  routerLinkActive=\"active\">\n            <ion-icon slot=\"start\" name=\"calendar-number-outline\"></ion-icon>\n            <ion-label>Transport Fees </ion-label>\n          </ion-item>\n          <ion-item button routerLink=\"/parent-app/parentTab/track-bus\"  routerLinkActive=\"active\">\n            <ion-icon slot=\"start\" name=\"calendar-number-outline\"></ion-icon>\n            <ion-label>Track Bus </ion-label>\n          </ion-item>\n        </ion-menu-toggle>\n      </ion-list>\n      <ion-button class=\"logout-btn\" expand=\"block\" (click)=\"logout()\" >Logout</ion-button>\n    </ion-content>\n  </ion-menu>";

/***/ }),

/***/ 99844:
/*!***********************************************************************!*\
  !*** ./src/app/pages/parentApp/tabs/parent-tabs.page.html?ngResource ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<parent-app-header *ngIf=\"show && userService.isAuthenticated()\"></parent-app-header>\n  \n<ion-tabs>\n  <ion-tab-bar slot=\"bottom\">\n\n    <ion-tab-button tab=\"dashboard\" (click)=\"navigateAndRefresh()\">\n      <ion-icon name=\"grid-outline\"></ion-icon>\n      <ion-label>Dashboard</ion-label>\n    </ion-tab-button>\n\n    <ion-tab-button (click)=\"navigateAndRefresh()\" tab=\"home\" class=\"ion-tab-button-placeholder\">\n      <ion-icon name=\"home\"></ion-icon>\n      <ion-label>Home</ion-label>\n    </ion-tab-button>\n\n    <ion-tab-button tab=\"profile\">\n      <ion-icon name=\"person\"></ion-icon>\n      <ion-label>Profile</ion-label>\n    </ion-tab-button>\n\n  </ion-tab-bar> \n\n\n\n</ion-tabs>\n\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_parentApp_tabs_parent-tabs_module_ts.js.map