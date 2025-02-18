(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_driverApp_drop_drop-page_module_ts"],{

/***/ 68871:
/*!******************************************************************!*\
  !*** ./src/app/pages/driverApp/drop/drop-page-routing.module.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DropPageRoutingModule: () => (/* binding */ DropPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _drop_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drop.page */ 69879);




const routes = [{
  path: '',
  component: _drop_page__WEBPACK_IMPORTED_MODULE_0__.DropPage
}];
let DropPageRoutingModule = class DropPageRoutingModule {};
DropPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], DropPageRoutingModule);


/***/ }),

/***/ 9686:
/*!**********************************************************!*\
  !*** ./src/app/pages/driverApp/drop/drop-page.module.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DropPageModule: () => (/* binding */ DropPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _drop_page_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drop-page-routing.module */ 68871);
/* harmony import */ var _drop_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drop.page */ 69879);







let DropPageModule = class DropPageModule {};
DropPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _drop_page_routing_module__WEBPACK_IMPORTED_MODULE_0__.DropPageRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule],
  declarations: [_drop_page__WEBPACK_IMPORTED_MODULE_1__.DropPage]
})], DropPageModule);


/***/ }),

/***/ 69879:
/*!***************************************************!*\
  !*** ./src/app/pages/driverApp/drop/drop.page.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DropPage: () => (/* binding */ DropPage)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _drop_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drop.page.html?ngResource */ 91065);
/* harmony import */ var _drop_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drop.page.scss?ngResource */ 90101);
/* harmony import */ var _drop_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_drop_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/toast/toast.service */ 33545);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _view_student_info_view_student_info_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../view-student-info/view-student-info.component */ 67197);
/* harmony import */ var _capacitor_barcode_scanner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @capacitor/barcode-scanner */ 58330);
/* harmony import */ var src_app_services_gps_location_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/gps.location.service */ 99567);
/* harmony import */ var src_app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/storage/storage.service */ 85217);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! highcharts */ 77859);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_11__);


















let DropPage = class DropPage {
  constructor(formBuilder, toastService, userService, masterService, router, commonMethod, httpClient, cabDriverAppServiceService, alertController, modalController, locationService, storageService, activatedRoute) {
    this.formBuilder = formBuilder;
    this.toastService = toastService;
    this.userService = userService;
    this.masterService = masterService;
    this.router = router;
    this.commonMethod = commonMethod;
    this.httpClient = httpClient;
    this.cabDriverAppServiceService = cabDriverAppServiceService;
    this.alertController = alertController;
    this.modalController = modalController;
    this.locationService = locationService;
    this.storageService = storageService;
    this.activatedRoute = activatedRoute;
    this.tracking = false;
    this.isLocationEnabled = true;
    this.submitted = false;
    this.routeList = [];
    this.stopageList = [];
    this.studentList = [];
    this.qrCodeVisible = false;
    this.showEndDropButton = false;
    this.dropButtonDisabled = false;
    this.cabDriverTripDto = new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__.CabDriverTripDto();
    this.cabDriverTripdetailDto = new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__.CabDriverAppTripDetailsDto();
    this.invalidQRCodeError = true;
  }
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Drop');
    this.userService.getUser().subscribe(result => {
      this.userId = result.userId;
      this.getRoutes();
    });
  }
  ngOnInit() {
    this.cabDriverDropForm = this.formBuilder.group({
      routeId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required]
    });
  }
  getRoutes() {
    this.userService.getUserIdByRole().subscribe(CabDriverId => {
      this.cabDriverId = CabDriverId;
      this.cabDriverAppServiceService.getCabDriverAppRouteSelect(this.cabDriverId).subscribe(result => {
        this.routeList = result.cabDriverRouteList;
        this.activatedRoute.paramMap.subscribe(params => {
          const tripId = params.get('tripId');
          const routeId = params.get('routeId');
          if (tripId && routeId && parseInt(tripId) > 0 && parseInt(routeId) > 0) {
            this.cabDriverDropForm.get('routeId').setValue(parseInt(routeId));
            this.tripId = parseInt(tripId);
            this.drop();
          }
        });
      });
    });
  }
  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  drop() {
    let cabDriverTripDto = new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__.CabDriverTripDto();
    cabDriverTripDto.routeId = this.cabDriverDropForm.get('routeId')?.value;
    cabDriverTripDto.tripType = 'Drop';
    const activeTripRequest = {
      routeId: cabDriverTripDto.routeId,
      tripType: cabDriverTripDto.tripType,
      userId: this.userId
    };
    this.cabDriverAppServiceService.getActivetripSelect(new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__.CabDriverActiveTripRequestDto(activeTripRequest)).subscribe(activeTripResult => {
      if (!activeTripResult || activeTripResult && activeTripResult?.tripId == 0) {
        this.cabDriverAppServiceService.cabDriverTripUpsert(cabDriverTripDto).subscribe(result => {
          this.tripId = result;
          this.dropButtonDisabled = this.qrCodeVisible = true;
          this.startTracking();
          this.stoppageStudentSelect('Drop');
        });
      } else {
        this.alertController.create({
          header: 'Confirm',
          message: `Their is already an active trip exist for another route.Please end that trip first to continue this trip.`,
          buttons: [{
            text: 'Ok',
            handler: () => {}
          }]
        }).then(res => {
          res.present();
        });
      }
    });
  }
  endDrop() {
    let cabDriverTripDto = new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__.CabDriverTripDto();
    cabDriverTripDto.tripId = this.tripId;
    cabDriverTripDto.isTripEnd = true;
    this.cabDriverAppServiceService.cabDriverTripUpsert(cabDriverTripDto).subscribe(result => {
      this.message('success');
      this.performReset();
    });
  }
  get f() {
    return this.cabDriverDropForm.controls;
  }
  resetSelectList(f, item) {
    if (f[item]?.getRawValue() === 'null') {
      f[item]?.setValue(null);
      return;
    }
    if (item === 'route') {
      this.stopageList;
    }
  }
  showQRCode() {
    this.submitted = true;
    if (this.cabDriverDropForm.invalid) {
      return;
    }
    if (this.cabDriverDropForm.valid) {
      this.qrCodeVisible = true;
    }
  }
  reset() {
    this.openDialog(this.performReset.bind(this), 'reset');
  }
  getStudentListByStoppageId(stoppageId) {
    const studentListByStoppage = this.studentList.filter(x => x.stoppageId == stoppageId);
    return studentListByStoppage;
  }
  stoppageStudentSelect(tripType) {
    const routeId = this.cabDriverDropForm.get('routeId')?.value;
    this.cabDriverAppServiceService.getCabDriverAppStoppageStudentSelect(routeId, tripType).subscribe(result => {
      this.tripId = result.tripId;
      this.stopageList = result.cabDriverStoppageList;
      this.studentList = result.cabDriverStudentList;
      if (this.studentList.length > 0) this.qrCodeVisible = true;
    });
  }
  getStudentsForStoppage(stoppageId) {
    return this.studentList.filter(student => student.stoppageId === stoppageId);
  }
  submit() {
    this.submitted = true;
    this.qrCodeVisible = false;
    this.message('success');
  }
  message(message) {
    this.toastService.presentToast('Success', 'End Drop', 'top', 'success', 2000);
  }
  toggleStudentsVisibility(stoppage) {
    stoppage.showStudents = !stoppage.showStudents;
  }
  scanQRCode() {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const result = yield _capacitor_barcode_scanner__WEBPACK_IMPORTED_MODULE_8__.CapacitorBarcodeScanner.scanBarcode({
        hint: 0,
        cameraDirection: 1
      });
      _this.processQRCode(result.ScanResult);
    })();
  }
  isValidQRCode(qrCodeText) {
    let isValidQrCode = true;
    const splittedText = qrCodeText.split("-");
    if (splittedText.length == 2) {
      this.userService.getSchoolCode().subscribe(schoolCode => {
        if (splittedText[0].toLowerCase() == schoolCode.toLowerCase()) {
          if ((0,highcharts__WEBPACK_IMPORTED_MODULE_11__.isNumber)(splittedText[1]) && parseInt(splittedText[1]) > 0) {
            this.processQRCode(qrCodeText);
          } else {
            isValidQrCode = false;
          }
        } else {
          isValidQrCode = false;
        }
      });
    } else {
      isValidQrCode = false;
    }
    if (isValidQrCode == false) {
      //Show QR Code Error
      this.invalidQRCodeError = true;
    }
  }
  processQRCode(qrCodeText) {
    this.cabDriverAppServiceService.getStudentSelect(qrCodeText).subscribe(result => {
      const studentInfo = result;
      this.openStudentInfo(studentInfo);
    });
  }
  openStudentInfo(studentInfoDto) {
    var _this2 = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this2.modalController.create({
        component: _view_student_info_view_student_info_component__WEBPACK_IMPORTED_MODULE_7__.ViewStudentInfoComponent,
        componentProps: {
          studentPopup: studentInfoDto
        }
      });
      modal.onDidDismiss().then(data => {
        if (data.role === 'confirm') {
          _this2.studentConfirm(data.data);
        }
      });
      modal.onDidDismiss().then( /*#__PURE__*/function () {
        var _ref = (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
          if (data.role === 'scanMore') {
            _this2.studentConfirm(data.data);
            yield _this2.scanQRCode();
          }
        });
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
      yield modal.present();
    })();
  }
  close() {}
  studentConfirm(studentId) {
    let cabDriverTripDetailDto = new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__.CabDriverAppTripDetailsDto();
    cabDriverTripDetailDto.tripId = this.tripId;
    cabDriverTripDetailDto.studentId = studentId;
    this.cabDriverAppServiceService.cabDriverTripDetailUpsert(cabDriverTripDetailDto).subscribe(result => {
      this.stoppageStudentSelect('Drop');
    });
  }
  openDialog(callback, action) {
    this.alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to ${action}? .`,
      buttons: [{
        text: 'No',
        handler: () => {
          // Do nothing if 'No' is clicked
        }
      }, {
        text: 'Yes',
        handler: () => {
          callback();
        }
      }]
    }).then(res => {
      res.present();
    });
  }
  performReset() {
    this.cabDriverDropForm.reset();
    this.submitted = false;
    this.qrCodeVisible = false;
    this.stopageList = [];
    this.dropButtonDisabled = false;
    this.stopTracking();
  }
  startTracking() {
    var _this3 = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.storageService.setStorage("ActiveTripId", _this3.tripId.toString());
    })();
  }
  stopTracking() {
    this.tracking = false;
    this.storageService.setStorage("ActiveTripId", null);
  }
  ngOnDestroy() {}
  static #_ = this.ctorParameters = () => [{
    type: _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormBuilder
  }, {
    type: src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_4__.ToastService
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_5__.UserService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__.MasterServiceProxy
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router
  }, {
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_3__.CommonMethodService
  }, {
    type: _angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HttpClient
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_6__.CabDriverAppServiceProxy
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.AlertController
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.ModalController
  }, {
    type: src_app_services_gps_location_service__WEBPACK_IMPORTED_MODULE_9__.GPSLocationService
  }, {
    type: src_app_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_10__.StorageService
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute
  }];
};
DropPage = (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_17__.Component)({
  selector: 'app-drop',
  template: _drop_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_drop_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], DropPage);


/***/ }),

/***/ 90101:
/*!****************************************************************!*\
  !*** ./src/app/pages/driverApp/drop/drop.page.scss?ngResource ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.form-default {
  margin-top: 0px;
}
.form-default ion-item {
  --border-radius: 0px;
  border-radius: 0px;
  margin-bottom: 0px;
  --padding-start: 0px;
  --inner-padding-end: 0;
  background-color: #fff !important;
  --background: #fff !important;
  --background-activated: #fff !important;
  --background-focused: #fff !important;
  --background-hover: #fff !important;
  --border: 0 !important;
  border: 0 !important;
  --highlight: #fff !important;
}
.form-default ion-item.item-interactive.ion-valid {
  --highlight-background: #fff !important;
}
.form-default ion-item ion-input {
  background-color: #fff !important;
  border: 1px solid #ccc;
  padding-left: 10px !important;
  border-radius: 40px !important;
  font-size: 13px !important;
  color: #000 !important;
}
.form-default ion-item ion-input.input-disabled {
  background: #ededf0 !important;
  opacity: 1;
}
.form-default ion-item ion-label {
  margin-bottom: 10px;
  color: #000 !important;
  opacity: 1 !important;
}
.form-default ion-item ion-select {
  background-color: #fff !important;
  --background-activated: #fff !important;
  --background-focused: #fff !important;
  --background-hover: #fff !important;
  border: 1px solid #ccc;
  padding-left: 10px !important;
  border-radius: 40px !important;
  min-height: 41.6px;
  font-size: 13px !important;
}
.form-default ion-item ion-select .select-icon {
  transform: translate3d(0, 0px, 0) !important;
}
.form-default ion-item ion-select::part(icon) {
  transform: translate3d(0, 0px, 0) !important;
}
.form-default ion-item.item-interactive-disabled ion-input {
  background: #ededf0 !important;
}
.form-default .label-floating {
  max-width: -moz-fit-content !important;
  max-width: fit-content !important;
}

.ion-button-small {
  width: 100%;
  padding-left: 0px;
  padding-right: 0px;
  font-size: 16px;
  height: 40px;
  --border-radius: 50px;
  border-radius: 50px;
  margin-top: 15px;
  --box-shadow: none;
  border: 1px solid #fff !important;
  --border: 1px solid #fff !important;
  --background: transparent !important;
  --color: #fff;
}

.submit-form-btn {
  width: 100%;
  padding-left: 0px;
  padding-right: 0px;
  font-size: 16px;
  height: 40px;
  --border-radius: 50px;
  margin-top: 15px;
  --box-shadow: none;
  --background: linear-gradient(135deg, #da8e63, #c754aa);
  --color: var(--white-color);
}

.profile-card {
  border-radius: 0;
  background: var(--white-bg-color);
  background-image: url('profile-bg.png');
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  text-align: center;
}
.profile-card h1 {
  color: var(--black-color);
  font-size: 20px;
  margin: 10px 0;
}
.profile-card .profile-photos {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  text-align: center;
  margin: 0 auto 10px;
  background-color: #fff;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-card .profile-photos img {
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
}

ion-toolbar {
  background-color: var(--ion-color-primary-contrast);
}

.custom-error {
  color: red;
  font-size: 12px;
}

.white-text {
  color: #fff !important;
}

.line {
  display: inline-block;
  align-items: center;
  justify-content: space-between;
  gap: 10px; /* Adjust gap as needed */
}

.flex-container {
  display: flex;
  align-items: center;
  width: 50%;
}

.flex-item {
  flex: 1; /* This makes the ion-item take up the remaining space */
  min-width: 300px; /* Minimum width to ensure content is not hidden */
}

.scan-form-btn {
  margin-left: 0;
  margin-top: 7px;
  font-size: 14px;
  border-radius: 4px;
  height: 39px;
  text-transform: uppercase;
  width: 100%;
}
.scan-form-btn.btn-success {
  background: #44b387 !important;
  border-color: #44b387 !important;
}

.bold-black-text {
  font-weight: bold;
  color: black;
}

.student-circle {
  display: inline-block;
  margin-left: 0px;
  font-size: 12px;
  padding: 0 5px;
  border-radius: 4px;
}

.picked-circle {
  color: green;
  background: #d6ead6;
}

.unpicked-circle {
  color: red;
  background: #ebc5c5;
}

.text-pick-wrap {
  text-align: center;
}

ion-item {
  --background: #fff !important;
  background-color: #fff !important;
  --padding-start: 5px;
  --inner-padding-end: 5px;
  align-items: flex-start;
  margin: 10px 0;
  border-radius: 6px;
}

.student-content {
  display: flex;
}
.student-content .title {
  font-size: 18px;
  font-weight: normal;
  width: 15%;
  line-height: 1.4;
  color: #5780b0;
}
.student-content .value {
  font-size: 13px;
  font-weight: 400;
  flex: 0 0 1;
  color: #222;
}

.avatar-left {
  margin-right: 5px;
  width: 92px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
.avatar-left ion-avatar {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}
.avatar-left .roll {
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  color: #222;
}

ion-label {
  margin-top: 6px !important;
  margin-bottom: 3px !important;
  color: #222;
  flex: 1;
}

ion-badge {
  margin-top: 10px;
  margin-left: 0;
  color: #222;
}

ion-list, list-ios {
  background-color: transparent !important;
  --background: transparent !important;
  border-radius: 0;
  --border-radius: 0;
  padding: 0;
}

.studets-listing-pickup {
  background-color: #fff;
  border-radius: 6px;
  padding: 5px;
  margin-bottom: 7px;
  display: flex;
  position: relative;
}

.stoppage-name-item {
  background: #623AA2 !important;
  border-radius: 6px;
  padding: 10px;
  margin: 10px 0;
}

.stoppage-name-item ion-label {
  color: #fff;
  font-weight: bold;
}

.stopp-drive-wrapper {
  background-color: #eada54;
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px;
}

.stopp-name-drive {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0px;
  color: #000;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/driverApp/drop/drop.page.scss"],"names":[],"mappings":"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","sourcesContent":[".form-default {\n  margin-top: 0px;\n  ion-item {\n    --border-radius: 0px;\n    border-radius: 0px;\n    margin-bottom: 0px;\n    --padding-start: 0px;\n    --inner-padding-end: 0;\n    background-color: #fff !important;\n    --background: #fff !important;\n    --background-activated: #fff !important;\n    --background-focused: #fff !important;\n    --background-hover: #fff !important;\n    --border: 0 !important;\n    border: 0 !important;\n    --highlight: #fff !important;\n\n    &.item-interactive.ion-valid {\n      --highlight-background: #fff !important;\n    }\n    ion-input {\n      background-color: #fff !important;\n      border: 1px solid #ccc;\n      padding-left: 10px !important;\n      border-radius: 40px !important;\n      font-size: 13px !important;\n      color: #000 !important;\n      &.input-disabled {\n        background: #ededf0 !important;\n        opacity: 1;\n      }\n    }\n    ion-label {\n      margin-bottom: 10px;\n      color: #000 !important;\n      opacity: 1 !important;\n    }\n    ion-select {\n      background-color: #fff !important;\n      --background-activated: #fff !important;\n      --background-focused: #fff !important;\n      --background-hover: #fff !important;\n      border: 1px solid #ccc;\n      padding-left: 10px !important;\n      border-radius: 40px !important;\n      min-height: 41.6px;\n      font-size: 13px !important;\n      .select-icon {\n        transform: translate3d(0, 0px, 0) !important;\n      }\n    }\n    ion-select::part(icon) {\n      transform: translate3d(0, 0px, 0) !important;\n    }\n    &.item-interactive-disabled {\n      ion-input {\n        background: #ededf0 !important;\n      }\n    }\n  }\n \n  .label-floating {\n    max-width: fit-content !important;\n  }\n}\n\n\n.ion-button-small {\n  width: 100%;\n  padding-left: 0px;\n  padding-right: 0px;\n  font-size: 16px;\n  height: 40px;\n  --border-radius: 50px;\n  border-radius: 50px;\n  margin-top: 15px;\n  --box-shadow: none;\n  //--background: var(--orange-bg-color);\n  border: 1px solid #fff !important;\n  --border: 1px solid #fff !important;\n  --background: transparent !important;\n    --color: #fff;\n}\n\n.submit-form-btn {\n  width: 100%;\n  padding-left: 0px;\n  padding-right: 0px;\n  font-size: 16px;\n  height: 40px;\n  --border-radius: 50px;\n  margin-top: 15px;\n  --box-shadow: none;\n  //--background: var(--orange-bg-color);\n  --background: linear-gradient(135deg, #da8e63, #c754aa);\n    --color: var(--white-color);\n}\n\n.profile-card {\n  border-radius: 0;\n  // background: linear-gradient(135deg, var(--ion-color-dark), var(--ion-color-primary));\n  background: var(--white-bg-color);\n  background-image: url(\"../../../../assets/img/profile-bg.png\");\n  background-position: center;\n  background-repeat: no-repeat;\n  //height: 165px;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  padding: 0px;\n  text-align: center;\n  h1 {\n    color: var(--black-color);\n    font-size: 20px;\n    margin: 10px 0;\n  }\n  .profile-photos {\n    width: 128px;\n    height: 128px;\n    border-radius: 50%;\n    text-align: center;\n    margin: 0 auto 10px;\n    background-color: #fff;\n    border: 1px solid #fff;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    img {\n      width: 100%;\n      max-width: 100%;\n      max-height: 100%;\n      border-radius: 50%;\n    }\n  }\n}\n\nion-toolbar {\n  background-color: var(--ion-color-primary-contrast);\n}\n.custom-error{\n  color: red;\n  font-size: 12px;\n}\n\n.white-text {\n  color: #fff !important;\n}\n.line {\n  display: inline-block;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px; /* Adjust gap as needed */\n}\n\n.flex-container {\n  display: flex;\n  align-items: center;\n  width: 50%;\n}\n\n.flex-item {\n  flex: 1; /* This makes the ion-item take up the remaining space */\n  min-width: 300px; /* Minimum width to ensure content is not hidden */\n}\n\n\n.scan-form-btn{\n  margin-left: 0;\n  margin-top: 7px;\n  font-size: 14px;\n  border-radius: 4px;\n  height: 39px;\n  text-transform: uppercase;\n  width: 100%;\n&.btn-success {\n      background: #44b387 !important;\n      border-color: #44b387 !important;\n  }\n}\n\n.bold-black-text {\n  font-weight: bold;\n  color: black;\n}\n.student-circle {\n  display: inline-block;\n  margin-left: 0px;\n  font-size: 12px;\n  padding: 0 5px;\n  border-radius: 4px;\n}\n\n.picked-circle {\n  color: green;\n  background: #d6ead6;\n}\n\n.unpicked-circle {\n  color:  red;\n  background: #ebc5c5;\n}\n.text-pick-wrap{\n  text-align: center;\n}\nion-item {\n  --background: #fff !important;\n  background-color: #fff !important;\n --padding-start: 5px;\n--inner-padding-end: 5px;\nalign-items: flex-start;\nmargin: 10px 0;\nborder-radius: 6px;\n}\n.student-content {\n  display: flex;\n \n  .title {\n      font-size: 18px;\n      font-weight: normal;\n      width: 15%;\n      line-height: 1.4;\n      color: #5780b0;\n  }\n  .value {\n      font-size: 13px;\n      font-weight: 400;\n      flex: 0 0 1;\n      color: #222;\n\n  }\n}\n.avatar-left {\n  margin-right: 5px;\n  width: 92px;\n  margin-top: 10px;\n  display: flex;\n  flex-direction: column;\n  ion-avatar {\n      width: 40px;\n      height: 40px;\n      margin: 0 auto;\n  }\n  .roll {\n      font-size: 12px;\n      text-align: center;\n      margin-top: 10px;\n      color: #222;\n\n  }\n}\nion-label {\n  margin-top: 6px !important;\n  margin-bottom: 3px !important;\n  color: #222;\n  flex: 1;\n\n}\n\nion-badge {\n  margin-top: 10px;\n  margin-left: 0;\n  color: #222;\n\n}\n\nion-list, list-ios {\n  background-color: transparent !important;\n  --background: transparent !important;\n  border-radius: 0;\n  --border-radius: 0;\n  padding: 0;\n}\n\n.studets-listing-pickup {\n  background-color: #fff;\n  border-radius: 6px;\n  padding: 5px;\n  margin-bottom: 7px;\n  display: flex;\n  position: relative;\n}\n.stoppage-name-item {\n  background: #623AA2 !important; \n  border-radius: 6px; \n  padding: 10px; \n  margin: 10px 0; \n}\n\n.stoppage-name-item ion-label {\n  color: #fff; \n  font-weight: bold; \n}\n.stopp-drive-wrapper {\n  background-color: #eada54;\n  padding: 10px;\n  border-radius: 6px;\n  margin-top: 10px;\n}\n.stopp-name-drive {\n  font-size: 16px;\n  font-weight: 600;\n  margin-bottom: 0px;\n  color: #000;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 91065:
/*!****************************************************************!*\
  !*** ./src/app/pages/driverApp/drop/drop.page.html?ngResource ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-content [fullscreen]=\"true\" class=\"light-content\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"handleRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <div class=\"form-padding pt-0\" *ngIf=\"isLocationEnabled\">\n    <form class=\"form-default\" novalidate [formGroup]=\"cabDriverDropForm\" (ngSubmit)=\"submit()\">\n    \n      <ion-item lines=\"none\" class=\"m-0\">\n        <ion-label position=\"stacked\" class=\"mb-2\">Route </ion-label>\n        <ion-select interface=\"action-sheet\" cancelText=\"Cancel\" formControlName=\"routeId\" class=\"mt-2\"\n        (ionChange)=\"resetSelectList(f, 'routeId')\">\n        <ion-select-option [value]=\"null\">Select Route</ion-select-option>\n        <ion-select-option *ngFor=\"let route of routeList\"\n          [value]=\"route.routeId\">{{route.routeName}}</ion-select-option>\n      </ion-select>\n      <div *ngIf=\"submitted && f['routeId']?.errors\">\n        <ion-note *ngIf=\"f['routeId'].errors['required']\" class=\"custom-error\">Route Name is required.</ion-note>\n      </div>\n      </ion-item>\n\n      <div class=\"d-flex mt-2\">\n\n        <ion-button class=\"primary w-100\" type=\"button\" [disabled]=\"dropButtonDisabled\" (click)=\"drop()\" >Drop</ion-button>\n        <ion-button class=\"secondary w-100\" type=\"button\" (click)=\"reset()\">reset</ion-button>\n      </div>\n    \n    </form>\n    <div  *ngIf=\"qrCodeVisible\">\n      <!-- <ion-note *ngIf=\"!invalidQRCodeError\" class=\"custom-error\">Invalid QR Code</ion-note> -->\n      <button class=\"scan-form-btn btn btn-success\" type=\"button\" (click)=\"scanQRCode()\">Scan QR Code</button>\n   \n       <div class=\"stopp-drive-wrapper\" *ngFor=\"let item of stopageList\">\n        <div class=\"stopp-name-drive\">\n          {{item.stoppageName}}\n        </div>\n        <div>\n         <ng-container >\n          <div class=\"list-custom animate__animated animate__fadeIn\" lines=\"full\">\n            <div  class=\"studets-listing-pickup mt-2\" button routerLink=\"detail\" detail=\"false\" *ngFor=\"let student of getStudentListByStoppageId(item.stoppageId)\">\n              <div class=\"avatar-left ion-avatar-default-icon\">\n                <div>\n                <ion-avatar slot=\"start\">\n                  <img alt=\"Silhouette of a person's head\" src=\"{{student.profileImageURL?student.profileImageURL:'https://ionicframework.com/docs/img/demos/avatar.svg'}}\" />\n                </ion-avatar>\n                <div class=\"roll\">{{student.rollNumber}}</div>\n              </div>\n              <span class=\"text-pick-wrap\">\n                <span \n                class=\"student-circle\"\n                [ngClass]=\"{'picked-circle': student.isAlreadyPickedDropped, 'unpicked-circle': !student.isAlreadyPickedDropped}\"\n                > {{ student.isAlreadyPickedDropped ? 'Dropped' : 'Not-Dropped' }}  </span></span>\n              </div>\n              <ion-label>\n                <div class=\"student-content\">\n                  <div class=\"title\"><ion-icon name=\"person\"></ion-icon></div>\n                  <div class=\"value\">{{student.studentName}}</div>\n                 \n                </div>\n                <div class=\"student-content\">\n                  <div class=\"title\"><ion-icon name=\"people\"></ion-icon></div>\n                  <div class=\"value\">{{student.className}}</div>\n                </div>\n                <div class=\"student-content\">\n                  <div class=\"title\"><ion-icon name=\"call\"></ion-icon></div>\n                  <div class=\"value\">{{student.emergencyContactNumber}}</div>\n                </div>\n               \n              </ion-label>\n            </div>\n            <div *ngIf=\"!studentList || studentList.length==0\" class=\"text-center\">No Student Found</div>\n          \n          \n          </div>\n         \n        </ng-container>\n        </div>\n      </div> \n      <ion-button class=\"submit-form-btn\" (click)=\"submit();endDrop()\">End Drop</ion-button>\n    </div>\n  </div>\n  <ion-text *ngIf=\"!isLocationEnabled\">Please enable location before pickup start.</ion-text>\n   \n</ion-content>\n\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_driverApp_drop_drop-page_module_ts.js.map