(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_driverApp_profile_cabdriver-profile-page_module_ts"],{

/***/ 12086:
/*!**********************************************************************************!*\
  !*** ./src/app/pages/driverApp/profile/cabdriver-profile-page-routing.module.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CabDriverProfilePageRoutingModule: () => (/* binding */ CabDriverProfilePageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _cabdriver_profile_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cabdriver-profile.page */ 50412);




const routes = [{
  path: '',
  component: _cabdriver_profile_page__WEBPACK_IMPORTED_MODULE_0__.CabDriverProfilePage
}];
let CabDriverProfilePageRoutingModule = class CabDriverProfilePageRoutingModule {};
CabDriverProfilePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], CabDriverProfilePageRoutingModule);


/***/ }),

/***/ 98591:
/*!**************************************************************************!*\
  !*** ./src/app/pages/driverApp/profile/cabdriver-profile-page.module.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CabDriverProfilePageModule: () => (/* binding */ CabDriverProfilePageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _cabdriver_profile_page_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cabdriver-profile-page-routing.module */ 12086);
/* harmony import */ var _cabdriver_profile_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cabdriver-profile.page */ 50412);







let CabDriverProfilePageModule = class CabDriverProfilePageModule {};
CabDriverProfilePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _cabdriver_profile_page_routing_module__WEBPACK_IMPORTED_MODULE_0__.CabDriverProfilePageRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule],
  declarations: [_cabdriver_profile_page__WEBPACK_IMPORTED_MODULE_1__.CabDriverProfilePage]
})], CabDriverProfilePageModule);


/***/ }),

/***/ 50412:
/*!*******************************************************************!*\
  !*** ./src/app/pages/driverApp/profile/cabdriver-profile.page.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CabDriverProfilePage: () => (/* binding */ CabDriverProfilePage)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _cabdriver_profile_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cabdriver-profile.page.html?ngResource */ 88696);
/* harmony import */ var _cabdriver_profile_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cabdriver-profile.page.scss?ngResource */ 83216);
/* harmony import */ var _cabdriver_profile_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_cabdriver_profile_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _capacitor_camera__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/camera */ 54982);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 61873);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/toast/toast.service */ 33545);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/environments/environment */ 45312);















let CabDriverProfilePage = class CabDriverProfilePage {
  constructor(formBuilder, toastService, cabDriverAppServiceService, userService, masterService, router, commonMethod, httpClient) {
    this.formBuilder = formBuilder;
    this.toastService = toastService;
    this.cabDriverAppServiceService = cabDriverAppServiceService;
    this.userService = userService;
    this.masterService = masterService;
    this.router = router;
    this.commonMethod = commonMethod;
    this.httpClient = httpClient;
    this.submitted = false;
    this.cabDriverFullName = '';
    this.cabDriverProfileImageUrl = '';
    this.countryDropdownList = [];
    this.stateDropdownList = [];
    this.districtDropdownList = [];
    this.talukaDropdownList = [];
    // Update profile picture
    this.files = [];
  }
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Profile');
    this.getMasterDropdownData();
  }
  ngOnInit() {
    this.cabDriverProfileForm = this.formBuilder.group({
      cabDriverId: [0],
      firstName: [{
        value: '',
        disabled: true
      }, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required],
      middleName: [{
        value: '',
        disabled: true
      }, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required],
      lastName: [{
        value: '',
        disabled: true
      }, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required],
      mobileNumber: [{
        value: '',
        disabled: true
      }],
      emailId: [{
        value: '',
        disabled: true
      }],
      addressLine1: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required],
      addressLine2: [''],
      countryId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required],
      stateId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required],
      districtId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required],
      talukaId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required],
      zipCode: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required],
      talukaName: [{
        value: '',
        disabled: true
      }],
      districtName: [{
        value: '',
        disabled: true
      }],
      stateName: [{
        value: '',
        disabled: true
      }],
      countryName: [{
        value: '',
        disabled: true
      }],
      education: [{
        value: '',
        disabled: true
      }],
      bloodGroup: [{
        value: '',
        disabled: true
      }],
      profileImageURL: ['']
    });
  }
  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  generateUniqueId() {
    const timestamp = new Date().getTime().toString(16); // Convert timestamp to hexadecimal
    const randomString = Math.random().toString(16).substr(2, 6); // Generate a random hexadecimal string
    const uniqueId = timestamp + randomString; // Combine timestamp and random string
    return uniqueId;
  }
  getFileContentTypeFromDataURL(dataURL) {
    const mime = dataURL.split(',')[0].split(':')[1].split(';')[0];
    return mime;
  }
  getFileExtensionFromDataURL(dataURL) {
    const mime = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const extension = mime.split('/')[1];
    return extension;
  }
  updateProfilePicture() {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.files = [];
      const status = yield _capacitor_camera__WEBPACK_IMPORTED_MODULE_3__.Camera.requestPermissions();
      const image = yield _capacitor_camera__WEBPACK_IMPORTED_MODULE_3__.Camera.getPhoto({
        quality: 90,
        source: _capacitor_camera__WEBPACK_IMPORTED_MODULE_3__.CameraSource.Prompt,
        resultType: _capacitor_camera__WEBPACK_IMPORTED_MODULE_3__.CameraResultType.DataUrl
      });
      _this.cabDriverProfileImageUrl = image.dataUrl;
      let contentType = _this.getFileContentTypeFromDataURL(image.dataUrl);
      let fileExtension = _this.getFileExtensionFromDataURL(image.dataUrl);
      let uniqueFileName = _this.generateUniqueId();
      let fileToInsert = yield _this.base64ToBlob(image.dataUrl, contentType, uniqueFileName + '.' + fileExtension, 1);
      _this.files.push(fileToInsert);
      _this.compressImage(fileToInsert).then(compressedFile => {
        _this.files.push(compressedFile);
      });
    })();
  }
  compressImage(file, targetSizeMB = 4) {
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxWidth = 2000;
          const maxHeight = 1500;
          let width = image.width;
          let height = image.height;
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(image, 0, 0, width, height);
          const compressQuality = (callback, quality) => {
            canvas.toBlob(callback, file.type || 'image/jpeg', quality);
          };
          const checkSizeAndResolve = (blob, quality) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: blob.type,
                lastModified: Date.now()
              });
              const sizeMB = compressedFile.size / (1024 * 1024);
              if (sizeMB <= targetSizeMB || quality <= 1) {
                resolve(compressedFile);
              } else {
                quality -= 0.1;
                compressQuality(newBlob => checkSizeAndResolve(newBlob, quality), quality);
              }
            } else {
              reject(new Error('Failed to compress image.'));
            }
          };
          compressQuality(blob => checkSizeAndResolve(blob, 1.0), 1.0);
        };
        image.src = URL.createObjectURL(file);
      });
    })();
  }
  getMasterDropdownData() {
    this.cabDriverProfileForm.get('countryId')?.valueChanges.subscribe(countryId => {
      this.stateFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
      this.cabDriverProfileForm.get('stateId')?.setValue(null);
      this.cabDriverProfileForm.get('districtId')?.setValue(null);
      this.cabDriverProfileForm.get('talukaId')?.setValue(null);
    });
    this.cabDriverProfileForm.get('stateId')?.valueChanges.subscribe(stateId => {
      this.districtFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
      this.cabDriverProfileForm.get('districtId')?.setValue(null);
      this.cabDriverProfileForm.get('talukaId')?.setValue(null);
    });
    this.cabDriverProfileForm.get('districtId')?.valueChanges.subscribe(districtId => {
      this.talukaFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
      this.cabDriverProfileForm.get('talukaId')?.setValue(null);
    });
    this.userService.getUserIdByRole().subscribe(userIdResult => {
      (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.forkJoin)([this.masterService.getAddressMasterData(), this.cabDriverAppServiceService.getCabDriverProfile(userIdResult)]).subscribe(result => {
        const masterData = result[0];
        const cadriverDetail = result[1];
        this.countryDropdownList = masterData.countryList;
        this.stateDropdownList = masterData.stateList;
        this.districtDropdownList = masterData.districtList;
        this.talukaDropdownList = masterData.talukaList;
        this.cabDriverProfileForm.patchValue(cadriverDetail);
        this.cabDriverFullName = cadriverDetail.cabDriverFullName;
        this.cabDriverProfileForm.get('stateId').setValue(cadriverDetail.stateId);
        this.cabDriverProfileForm.get('districtId').setValue(cadriverDetail.districtId);
        this.cabDriverProfileForm.get('talukaId').setValue(cadriverDetail.talukaId);
        if (cadriverDetail.profileBase64Image != undefined && cadriverDetail.profileBase64Image != null) {
          this.cabDriverProfileImageUrl = cadriverDetail.profileBase64Image;
          this.base64ToBlob(cadriverDetail.profileBase64Image, cadriverDetail.profileImageContentType, cadriverDetail.profileImageURL, -1).then(file => {
            this.files = [];
            this.files.push(file);
          }).catch(error => {
            console.error('An error occurred:', error);
          });
        }
      });
    });
  }
  base64ToBlob(base64Url, contentType, image, lastModified) {
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const response = yield fetch(base64Url);
      const data = yield response.blob();
      return new File([data], image, {
        type: contentType,
        lastModified: lastModified
      });
    })();
  }
  // Submit form
  submit() {
    this.submitted = true;
    // If form valid
    if (this.cabDriverProfileForm.valid) {
      const formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        if (this.files[i].lastModified > 0) {
          formData.append("file[]", this.files[i]);
        }
      }
      formData.append('cabDriverProfile', JSON.stringify(this.cabDriverProfileForm.getRawValue()));
      this.httpClient.post(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_8__.environment.API_BASE_URL}/api/CabDriverApp/CabDrverProfileUpdate`, formData).subscribe(result => {
        this.toastService.presentToast('Success', 'Profile saved', 'top', 'success', 2000);
        this.router.navigate(['driver-app/cabdriverTab/home']);
      });
    }
  }
  get f() {
    return this.cabDriverProfileForm.controls;
  }
  resetSelectList(f, item) {
    if (f[item]?.getRawValue() == "null") {
      f[item]?.setValue(null);
      return;
    }
  }
  static #_ = this.ctorParameters = () => [{
    type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormBuilder
  }, {
    type: src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_6__.ToastService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_5__.CabDriverAppServiceProxy
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_7__.UserService
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_5__.MasterServiceProxy
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.Router
  }, {
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_4__.CommonMethodService
  }, {
    type: _angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClient
  }];
};
CabDriverProfilePage = (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_14__.Component)({
  selector: 'app-edit',
  template: _cabdriver_profile_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_cabdriver_profile_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], CabDriverProfilePage);


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

/***/ 96984:
/*!****************************************************************!*\
  !*** ./node_modules/@capacitor/camera/dist/esm/definitions.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CameraDirection: () => (/* binding */ CameraDirection),
/* harmony export */   CameraResultType: () => (/* binding */ CameraResultType),
/* harmony export */   CameraSource: () => (/* binding */ CameraSource)
/* harmony export */ });
var CameraSource;
(function (CameraSource) {
  /**
   * Prompts the user to select either the photo album or take a photo.
   */
  CameraSource["Prompt"] = "PROMPT";
  /**
   * Take a new photo using the camera.
   */
  CameraSource["Camera"] = "CAMERA";
  /**
   * Pick an existing photo from the gallery or photo album.
   */
  CameraSource["Photos"] = "PHOTOS";
})(CameraSource || (CameraSource = {}));
var CameraDirection;
(function (CameraDirection) {
  CameraDirection["Rear"] = "REAR";
  CameraDirection["Front"] = "FRONT";
})(CameraDirection || (CameraDirection = {}));
var CameraResultType;
(function (CameraResultType) {
  CameraResultType["Uri"] = "uri";
  CameraResultType["Base64"] = "base64";
  CameraResultType["DataUrl"] = "dataUrl";
})(CameraResultType || (CameraResultType = {}));

/***/ }),

/***/ 54982:
/*!**********************************************************!*\
  !*** ./node_modules/@capacitor/camera/dist/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Camera: () => (/* binding */ Camera),
/* harmony export */   CameraDirection: () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.CameraDirection),
/* harmony export */   CameraResultType: () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.CameraResultType),
/* harmony export */   CameraSource: () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_1__.CameraSource)
/* harmony export */ });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ 14070);
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./definitions */ 96984);

const Camera = (0,_capacitor_core__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('Camera', {
  web: () => __webpack_require__.e(/*! import() */ "node_modules_capacitor_camera_dist_esm_web_js").then(__webpack_require__.bind(__webpack_require__, /*! ./web */ 8436)).then(m => new m.CameraWeb())
});



/***/ }),

/***/ 83216:
/*!********************************************************************************!*\
  !*** ./src/app/pages/driverApp/profile/cabdriver-profile.page.scss?ngResource ***!
  \********************************************************************************/
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
  color: var(--highlight-color-invalid);
  font-size: 12px;
}

.white-text {
  color: #fff !important;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/driverApp/profile/cabdriver-profile.page.scss"],"names":[],"mappings":"AAAA;EACE,eAAA;AACF;AAAE;EACE,oBAAA;EACA,kBAAA;EACA,oBAAA;EACA,sBAAA;EACA,iCAAA;EACA,6BAAA;EACA,uCAAA;EACA,qCAAA;EACA,mCAAA;EACA,sBAAA;EACA,oBAAA;EACA,4BAAA;AAEJ;AAAI;EACE,uCAAA;AAEN;AAAI;EACE,iCAAA;EACA,sBAAA;EACA,6BAAA;EACA,8BAAA;EACA,0BAAA;EACA,sBAAA;AAEN;AADM;EACE,8BAAA;EACA,UAAA;AAGR;AAAI;EACE,mBAAA;EACA,sBAAA;EACA,qBAAA;AAEN;AAAI;EACE,iCAAA;EACA,uCAAA;EACA,qCAAA;EACA,mCAAA;EACA,sBAAA;EACA,6BAAA;EACA,8BAAA;EACA,kBAAA;EACA,0BAAA;AAEN;AADM;EACE,4CAAA;AAGR;AAAI;EACE,4CAAA;AAEN;AACM;EACE,8BAAA;AACR;AAGE;EACE,sCAAA;EAAA,iCAAA;AADJ;;AAKA;EACE,WAAA;EACA,iBAAA;EACA,kBAAA;EACA,eAAA;EACA,YAAA;EACA,qBAAA;EACA,mBAAA;EACA,gBAAA;EACA,kBAAA;EAEA,iCAAA;EACA,mCAAA;EACA,oCAAA;EACE,aAAA;AAHJ;;AAMA;EACE,WAAA;EACA,iBAAA;EACA,kBAAA;EACA,eAAA;EACA,YAAA;EACA,qBAAA;EACA,gBAAA;EACA,kBAAA;EAEA,uDAAA;EACE,2BAAA;AAJJ;;AAOA;EACE,gBAAA;EAEA,iCAAA;EACA,uCAAA;EACA,2BAAA;EACA,4BAAA;EAEA,WAAA;EACA,aAAA;EACA,uBAAA;EACA,sBAAA;EACA,mBAAA;EACA,YAAA;EACA,kBAAA;AANF;AAOE;EACE,yBAAA;EACA,eAAA;EACA,cAAA;AALJ;AAOE;EACE,YAAA;EACA,aAAA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;EACA,sBAAA;EACA,sBAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;AALJ;AAOI;EACE,WAAA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;AALN;;AAUA;EACE,mDAAA;AAPF;;AASA;EACE,qCAAA;EACA,eAAA;AANF;;AASA;EACE,sBAAA;AANF","sourcesContent":[".form-default {\n  margin-top: 0px;\n  ion-item {\n    --border-radius: 0px;\n    margin-bottom: 0px;\n    --padding-start: 0px;\n    --inner-padding-end: 0;\n    background-color: #fff !important;\n    --background: #fff !important;\n    --background-activated: #fff !important;\n    --background-focused: #fff !important;\n    --background-hover: #fff !important;\n    --border: 0 !important;\n    border: 0 !important;\n    --highlight: #fff !important;\n\n    &.item-interactive.ion-valid {\n      --highlight-background: #fff !important;\n    }\n    ion-input {\n      background-color: #fff !important;\n      border: 1px solid #ccc;\n      padding-left: 10px !important;\n      border-radius: 40px !important;\n      font-size: 13px !important;\n      color: #000 !important;\n      &.input-disabled {\n        background: #ededf0 !important;\n        opacity: 1;\n      }\n    }\n    ion-label {\n      margin-bottom: 10px;\n      color: #000 !important;\n      opacity: 1 !important;\n    }\n    ion-select {\n      background-color: #fff !important;\n      --background-activated: #fff !important;\n      --background-focused: #fff !important;\n      --background-hover: #fff !important;\n      border: 1px solid #ccc;\n      padding-left: 10px !important;\n      border-radius: 40px !important;\n      min-height: 41.6px;\n      font-size: 13px !important;\n      .select-icon {\n        transform: translate3d(0, 0px, 0) !important;\n      }\n    }\n    ion-select::part(icon) {\n      transform: translate3d(0, 0px, 0) !important;\n    }\n    &.item-interactive-disabled {\n      ion-input {\n        background: #ededf0 !important;\n      }\n    }\n  }\n  .label-floating {\n    max-width: fit-content !important;\n  }\n}\n\n.ion-button-small {\n  width: 100%;\n  padding-left: 0px;\n  padding-right: 0px;\n  font-size: 16px;\n  height: 40px;\n  --border-radius: 50px;\n  border-radius: 50px;\n  margin-top: 15px;\n  --box-shadow: none;\n  //--background: var(--orange-bg-color);\n  border: 1px solid #fff !important;\n  --border: 1px solid #fff !important;\n  --background: transparent !important;\n    --color: #fff;\n}\n\n.submit-form-btn {\n  width: 100%;\n  padding-left: 0px;\n  padding-right: 0px;\n  font-size: 16px;\n  height: 40px;\n  --border-radius: 50px;\n  margin-top: 15px;\n  --box-shadow: none;\n  //--background: var(--orange-bg-color);\n  --background: linear-gradient(135deg, #da8e63, #c754aa);\n    --color: var(--white-color);\n}\n\n.profile-card {\n  border-radius: 0;\n  // background: linear-gradient(135deg, var(--ion-color-dark), var(--ion-color-primary));\n  background: var(--white-bg-color);\n  background-image: url(\"../../../../assets/img/profile-bg.png\");\n  background-position: center;\n  background-repeat: no-repeat;\n  //height: 165px;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  padding: 0px;\n  text-align: center;\n  h1 {\n    color: var(--black-color);\n    font-size: 20px;\n    margin: 10px 0;\n  }\n  .profile-photos {\n    width: 128px;\n    height: 128px;\n    border-radius: 50%;\n    text-align: center;\n    margin: 0 auto 10px;\n    background-color: #fff;\n    border: 1px solid #fff;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    img {\n      width: 100%;\n      max-width: 100%;\n      max-height: 100%;\n      border-radius: 50%;\n    }\n  }\n}\n\nion-toolbar {\n  background-color: var(--ion-color-primary-contrast);\n}\n.custom-error{\n  color: var(--highlight-color-invalid);\n  font-size: 12px;\n}\n\n.white-text {\n  color: #fff !important;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 88696:
/*!********************************************************************************!*\
  !*** ./src/app/pages/driverApp/profile/cabdriver-profile.page.html?ngResource ***!
  \********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n\n<ion-content [fullscreen]=\"true\" class=\"light-content\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"handleRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <ion-card class=\"ion-no-margin profile-card\">\n    <ion-card-content>\n      <div class=\"profile-photos\">\n        <img src=\"{{cabDriverProfileImageUrl}}\">\n      </div>\n\n      <h1 class=\"white-text\">\n        {{cabDriverFullName}}\n      </h1>\n      <ion-button class=\"ion-button-small\"\n        (click)=\"updateProfilePicture()\">\n        Update profile picture\n      </ion-button>\n    </ion-card-content>\n  </ion-card>\n\n\n  <div class=\"form-padding\">\n    <form class=\"form-default\" novalidate [formGroup]=\"cabDriverProfileForm\">\n      <ion-item lines=\"none\">\n        <ion-label position=\"stacked\">\n          First name\n        </ion-label>\n        <ion-input formControlName=\"firstName\" placeholder=\"First name\"></ion-input>\n        <ion-note slot=\"error\"> First name is required.</ion-note>\n      </ion-item>\n\n      <ion-item lines=\"none\">\n        <ion-label position=\"stacked\">\n          Middle name\n        </ion-label>\n        <ion-input formControlName=\"middleName\" placeholder=\"Middle name\"></ion-input>\n        <ion-note slot=\"error\">Middle name is required.</ion-note>\n      </ion-item>\n\n      <ion-item lines=\"none\">\n        <ion-label position=\"stacked\">\n          Last name\n        </ion-label>\n        <ion-input formControlName=\"lastName\" placeholder=\"Last name\"></ion-input>\n        <ion-note slot=\"error\">Last name is required.</ion-note>\n      </ion-item>\n\n      <ion-item lines=\"none\">\n        <ion-label position=\"stacked\">\n          Address Line 1 <span class=\"star-required\">*</span>\n        </ion-label>\n        <ion-input formControlName=\"addressLine1\" placeholder=\"Address Line 1\"></ion-input>\n        <ion-note slot=\"error\"> Address Line 1 is required.</ion-note>\n      </ion-item>\n\n      <ion-item lines=\"none\">\n        <ion-label position=\"stacked\">\n          Address Line 2\n        </ion-label>\n        <ion-input formControlName=\"addressLine2\" placeholder=\"Address Line 2\"></ion-input>\n      </ion-item>\n\n      <ion-item lines=\"none\">\n        <ion-label position=\"stacked\">Select Country <span class=\"star-required\">*</span></ion-label>\n        <ion-select interface=\"action-sheet\" cancelText=\"Cancel\" \n           formControlName=\"countryId\"  (ion-change)=\"resetSelectList(f,'countryId')\">\n          <ion-select-option [value]=\"null\" >Select Country</ion-select-option>\n          <ion-select-option *ngFor=\"let country of countryDropdownList\"\n            [value]=\"country.countryId\">{{country.countryName}}</ion-select-option>\n        </ion-select>\n        <ion-note slot=\"error\">Country is required</ion-note>\n        <div *ngIf=\"submitted && f['countryId']?.errors\">\n          <ion-note *ngIf=\"f['countryId'].errors['required']\"  class=\"custom-error\" >Country is required.</ion-note>\n         </div>\n      </ion-item>\n\n      <ion-item lines=\"none\">\n        <ion-label position=\"stacked\">Select State <span class=\"star-required\">*</span></ion-label>\n        <ion-select interface=\"action-sheet\" cancelText=\"Cancel\"\n         formControlName=\"stateId\"   (ion-change)=\"resetSelectList(f,'stateId')\" >\n          <ion-select-option [value]=\"null\" >Select State</ion-select-option>\n          <ion-select-option *ngFor=\"let state of stateFilteredDropdownList\"\n            [value]=\"state.stateId\">{{state.stateName}}</ion-select-option>\n        </ion-select>\n        <div *ngIf=\"submitted && f['stateId']?.errors\">\n          <ion-note *ngIf=\"f['stateId'].errors['required']\"  class=\"custom-error\" >State is required.</ion-note>\n         </div>\n      </ion-item>\n\n\n      <ion-item lines=\"none\">\n        <ion-label position=\"stacked\">Select District <span class=\"star-required\">*</span></ion-label>\n        <ion-select interface=\"action-sheet\" cancelText=\"Cancel\" \n           formControlName=\"districtId\" (ion-change)=\"resetSelectList(f,'districtId')\" >\n          <ion-select-option [value]=\"null\" >Select District</ion-select-option>\n          <ion-select-option *ngFor=\"let district of districtFilteredDropdownList\"\n            [value]=\"district.districtId\">{{district.districtName}}</ion-select-option>\n        </ion-select>\n        <div *ngIf=\"submitted && f['districtId']?.errors\">\n          <ion-note *ngIf=\"f['districtId'].errors['required']\"  class=\"custom-error\" >District is required.</ion-note>\n         </div>\n      </ion-item>\n\n      <ion-item lines=\"none\">\n        <ion-label position=\"stacked\">Select Taluka <span class=\"star-required\">*</span></ion-label>\n        <ion-select interface=\"action-sheet\" cancelText=\"Cancel\" \n             formControlName=\"talukaId\"  (ion-change)=\"resetSelectList(f,'talukaId')\" >\n          <ion-select-option [value]=\"null\" >Select Taluka</ion-select-option>\n          <ion-select-option *ngFor=\"let taluka of talukaFilteredDropdownList\"\n            [value]=\"taluka.talukaId\">{{taluka.talukaName}}</ion-select-option>\n        </ion-select>\n        <div *ngIf=\"submitted && f['talukaId']?.errors\">\n          <ion-note *ngIf=\"f['talukaId'].errors['required']\"  class=\"custom-error\" >Taluka is required.</ion-note>\n         </div>\n      </ion-item>\n\n      <ion-item lines=\"none\">\n        <ion-label position=\"stacked\">Pincode <span class=\"star-required\">*</span></ion-label>\n        <ion-input type=\"text\" formControlName=\"pincode\" placeholder=\"Pincode\" formControlName=\"zipCode\"></ion-input>\n        <ion-note slot=\"error\">Pincode is required.</ion-note>\n      </ion-item>\n\n\n      <ion-button class=\"submit-form-btn\" (click)=\"submit()\">Submit</ion-button>\n\n    </form>\n\n  </div>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_driverApp_profile_cabdriver-profile-page_module_ts.js.map