(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_teacherApp_notice_notice_module_ts"],{

/***/ 38030:
/*!*********************************************************************************!*\
  !*** ./src/app/pages/teacherApp/notice/add-edit-notice/add-edit-notice.page.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddEditNoticePage: () => (/* binding */ AddEditNoticePage)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _add_edit_notice_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add-edit-notice.page.html?ngResource */ 67658);
/* harmony import */ var _add_edit_notice_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-edit-notice.page.scss?ngResource */ 23894);
/* harmony import */ var _add_edit_notice_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_add_edit_notice_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ckeditor/ckeditor5-build-classic */ 4287);
/* harmony import */ var _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var _capacitor_camera__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @capacitor/camera */ 54982);
/* harmony import */ var _capawesome_capacitor_file_picker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @capawesome/capacitor-file-picker */ 19994);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/environments/environment */ 45312);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! moment */ 39545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_9__);















let AddEditNoticePage = class AddEditNoticePage {
  constructor(formBuilder, actionSheetController, masterService, noticeService, httpClient, modalCtrl, userService) {
    this.formBuilder = formBuilder;
    this.actionSheetController = actionSheetController;
    this.masterService = masterService;
    this.noticeService = noticeService;
    this.httpClient = httpClient;
    this.modalCtrl = modalCtrl;
    this.userService = userService;
    this.submitted = false;
    this.divisionGradeMapping = [];
    this.gradeDropdownList = [];
    this.divisionDropdownList = [];
    this.subjectDropdownList = [];
    // minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
    this.maxDate = {
      year: new Date().getFullYear() + 10,
      month: 1,
      day: 1
    };
    this.noticeToDropdownList = [];
    this.studentDropdownList = [];
    this.Editor = (_ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_3___default());
    this.textfiles = [];
    this.allowedFileFormats = ['txt', 'ppt', 'png', 'pptx', 'pdf', 'jpg', 'jpeg', 'bmp', 'xls', 'csv', 'doc', 'docx', 'txt', 'svg', 'pptx', 'xlsx'];
    this.invalidFileFormatError = '';
    // Update profile picture
    this.addedFileNames = new Set();
    this.isOpen = null;
  }
  ngOnInit() {
    // Setup form
    this.noticeForm = this.formBuilder.group({
      noticeId: [0],
      noticeToType: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required],
      isImportant: [false],
      classId: [[], _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required],
      studentId: [[], _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required],
      teacherId: [[], _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required],
      cabDriverId: [[], _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required],
      clerkId: [[], _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required],
      noticeTitle: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required],
      noticeDescription: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required],
      ngbStartDate: [null],
      startDate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required],
      ngbEndDate: [null],
      endDate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required],
      isPublished: [false],
      noticeTextFileArray: [[]],
      noticeMediaFileArray: [[]],
      academicYearId: [null],
      videoText: this.formBuilder.array([])
    });
    this.noticeToDropdownList = [{
      id: 1,
      value: 'STUDENT'
    }, {
      id: 2,
      value: 'CLASS'
    }];
    this.userService.getAcademicYear().subscribe(result => {
      this.academicYearId = result;
      this.noticeForm.get('academicYearId')?.setValue(this.academicYearId);
      this.getMasterDropdownData();
      this.addVideoText();
    });
    this.noticeForm.get('noticeToType')?.valueChanges.subscribe(noticeToType => {
      this.applyValidationAndClearField(parseInt(noticeToType));
    });
  }
  applyValidationAndClearField(selectedNoticeTo) {
    this.noticeForm.get('classId')?.clearValidators();
    this.noticeForm.get('classId')?.setValue([]);
    this.noticeForm.get('studentId')?.clearValidators();
    this.noticeForm.get('studentId')?.setValue([]);
    this.noticeForm.get('teacherId')?.clearValidators();
    this.noticeForm.get('teacherId')?.setValue([]);
    this.noticeForm.get('clerkId')?.clearValidators();
    this.noticeForm.get('clerkId')?.setValue([]);
    this.noticeForm.get('cabDriverId')?.clearValidators();
    this.noticeForm.get('cabDriverId')?.setValue([]);
    switch (selectedNoticeTo) {
      case 1:
        this.noticeForm.get('studentId')?.addValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required]);
        break;
      case 2:
        this.noticeForm.get('classId')?.addValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required]);
        break;
    }
    this.noticeForm.updateValueAndValidity();
  }
  getMasterDropdownData() {
    this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe(gradeMaster => {
      this.gradeDropdownList = gradeMaster.grades;
      this.divisionDropdownList = gradeMaster.divisions;
      this.divisionGradeMapping = gradeMaster.schoolGradeDivisionMatrixCascadeList;
      if (this.noticeId > 0) {
        this.noticeService.noticeSelect(this.noticeId).subscribe(result => {
          this.noticeForm.patchValue(result);
          this.patchVideoTextValues(result.videoText);
          if (result.studentId.length > 0) {
            this.f['studentId'].setValue(result.studentId[0]);
          } else {
            this.f['studentId'].setValue(null);
          }
          if (result.classId.length > 0) {
            this.f['classId'].setValue(result.classId[0]);
          } else {
            this.f['classId'].setValue(null);
          }
          this.noticeTextFileArray = result.noticeTextFileArray;
          result.noticeTextFileArray.forEach(textfile => {
            this.textfiles.push(new File([], textfile.fileName, {
              lastModified: -1
            }));
          });
        });
      }
    });
    this.masterService.getStudentDropdownData(this.academicYearId).subscribe(result => {
      this.studentDropdownList = result.lstDropdownValues;
    });
  }
  get f() {
    return this.noticeForm.controls;
  }
  uploadFiles() {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const actionSheet = yield _this.actionSheetController.create({
        header: 'Choose existing picture or take new',
        cssClass: 'custom-action-sheet',
        buttons: [{
          text: 'Choose from gallery',
          icon: 'images',
          handler: function () {
            var _ref = (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
              const result = yield _capawesome_capacitor_file_picker__WEBPACK_IMPORTED_MODULE_6__.FilePicker.pickFiles({
                multiple: true,
                readData: true,
                types: _this.allowedFileFormats.map(ext => `.${ext}`)
              });
              for (let file of result.files) {
                let contentType = file.mimeType;
                let fileToInsert = yield _this.base64ToBlob(`data:${file.mimeType};base64,${file.data}`, contentType, file.name, 1);
                if (!_this.addedFileNames.has(file.name)) {
                  _this.textfiles.push(fileToInsert);
                  _this.addedFileNames.add(file.name);
                  _this.compressImage(fileToInsert).then(compressedFile => {
                    if (compressedFile && !_this.addedFileNames.has(file.name)) {
                      _this.textfiles.push(compressedFile);
                      _this.addedFileNames.add(file.name);
                    }
                  });
                }
              }
            });
            return function handler() {
              return _ref.apply(this, arguments);
            };
          }()
        }, {
          text: 'Take picture',
          icon: 'camera',
          handler: function () {
            var _ref2 = (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
              const image = yield _capacitor_camera__WEBPACK_IMPORTED_MODULE_5__.Camera.getPhoto({
                resultType: _capacitor_camera__WEBPACK_IMPORTED_MODULE_5__.CameraResultType.DataUrl,
                source: _capacitor_camera__WEBPACK_IMPORTED_MODULE_5__.CameraSource.Camera,
                quality: 90
              });
              let contentType = _this.getFileContentTypeFromDataURL(image.dataUrl);
              let fileExtension = _this.getFileExtensionFromDataURL(image.dataUrl);
              let uniqueFileName = _this.generateUniqueId();
              let fileToInsert = yield _this.base64ToBlob(image.dataUrl, contentType, `${uniqueFileName}.${fileExtension}`, 1);
              if (!_this.addedFileNames.has(uniqueFileName)) {
                _this.textfiles.push(fileToInsert);
                _this.addedFileNames.add(uniqueFileName);
                _this.compressImage(fileToInsert).then(compressedFile => {
                  if (compressedFile && !_this.addedFileNames.has(uniqueFileName)) {
                    _this.textfiles.push(compressedFile);
                    _this.addedFileNames.add(uniqueFileName);
                  }
                });
              }
            });
            return function handler() {
              return _ref2.apply(this, arguments);
            };
          }()
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }]
      });
      yield actionSheet.present();
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
  generateUniqueId() {
    const timestamp = new Date().getTime().toString(16);
    const randomString = Math.random().toString(16).substr(2, 6);
    const uniqueId = timestamp + randomString;
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
  resetSelectList(f, item) {
    if (f[item]?.getRawValue() == "null") {
      f[item]?.setValue(null);
      return;
    }
  }
  saveNoticeData() {
    this.submitted = true;
    this.noticeForm.get('noticeTextFileArray')?.setValue([]);
    // stop here if form is invalid
    if (this.noticeForm.invalid) {
      return;
    }
    this.noticeUpsert();
  }
  noticeUpsert() {
    this.noticeForm.get('academicYearId')?.setValue(this.academicYearId);
    const formData = new FormData();
    for (var i = 0; i < this.textfiles.length; i++) {
      if (this.textfiles[i].lastModified > 0) {
        formData.append(`textfiles${i}`, this.textfiles[i]);
      } else {
        let fileDto = new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.NoticeFileDto();
        fileDto.fileName = this.textfiles[i].name;
        fileDto.fileType = 1;
        this.noticeForm.get('noticeTextFileArray')?.value.push(fileDto);
      }
    }
    let noticeDetail = this.noticeForm.getRawValue();
    let studentId = this.f['studentId'].value;
    let classId = this.f['classId'].value;
    if (studentId > 0) {
      noticeDetail.studentId = [studentId];
    } else {
      noticeDetail.studentId = [];
    }
    if (classId > 0) {
      noticeDetail.classId = [classId];
    } else {
      noticeDetail.classId = [];
    }
    noticeDetail.ngbStartDate = new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.SchoolNgbDateModel();
    noticeDetail.ngbStartDate.day = moment__WEBPACK_IMPORTED_MODULE_9__(noticeDetail.startDate, "YYYY-MM-DD").date();
    noticeDetail.ngbStartDate.month = moment__WEBPACK_IMPORTED_MODULE_9__(noticeDetail.startDate, "YYYY-MM-DD").month() + 1;
    noticeDetail.ngbStartDate.year = moment__WEBPACK_IMPORTED_MODULE_9__(noticeDetail.startDate, "YYYY-MM-DD").year();
    noticeDetail.ngbEndDate = new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.SchoolNgbDateModel();
    noticeDetail.ngbEndDate.day = moment__WEBPACK_IMPORTED_MODULE_9__(noticeDetail.endDate, "YYYY-MM-DD").date();
    noticeDetail.ngbEndDate.month = moment__WEBPACK_IMPORTED_MODULE_9__(noticeDetail.endDate, "YYYY-MM-DD").month() + 1;
    noticeDetail.ngbEndDate.year = moment__WEBPACK_IMPORTED_MODULE_9__(noticeDetail.endDate, "YYYY-MM-DD").year();
    noticeDetail.startDate = null;
    noticeDetail.endDate = null;
    formData.append('noticeDetail', JSON.stringify(noticeDetail));
    this.httpClient.post(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment.API_BASE_URL}/api/TeacherProfile/NoticeUpsert`, formData).subscribe(result => {
      return this.modalCtrl.dismiss(true, 'success');
    });
  }
  close() {
    return this.modalCtrl.dismiss(false, 'cancel');
  }
  getFormattedDate(date) {
    if (date) {
      return moment__WEBPACK_IMPORTED_MODULE_9__(date).format('DD-MM-yyyy');
    } else {
      return date;
    }
  }
  getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
  }
  onTextFileRemove(index) {
    this.textfiles.splice(index, 1);
  }
  showFile(file) {
    let url = "";
    if (file.size > 0) {
      url = window.URL.createObjectURL(file);
    } else {
      let noticeTextFile = this.noticeTextFileArray.filter(x => x.fileName == file.name);
      url = noticeTextFile[0].fullPath;
    }
    window.open(url, '_blank');
  }
  patchVideoTextValues(values) {
    // Clear the existing controls in the FormArray
    while (this.videoTextArray.length !== 0) {
      this.videoTextArray.removeAt(0);
    }
    // Iterate through the values and add them to the FormArray
    values.forEach(value => {
      const itemFormGroup = this.formBuilder.group({
        // id: [value.id],
        contentUrl: [value.contentUrl]
        // fileType: [value.fileType],
      });
      this.videoTextArray.push(itemFormGroup);
    });
  }
  addVideoText() {
    const itemFormGroup = this.formBuilder.group({
      contentUrl: ['']
    });
    this.videoTextArray.push(itemFormGroup);
  }
  get videoText() {
    let formArray = this.noticeForm.get('videoText');
    return formArray.controls;
  }
  get videoTextArray() {
    return this.noticeForm.get('videoText');
  }
  removeVideotext(index) {
    this.videoTextArray.removeAt(index);
  }
  openVideoLink(index) {
    const videoControl = this.noticeForm.get('videoText').controls[index];
    if (videoControl) {
      const contentUrl = videoControl.get('contentUrl')?.value;
      if (contentUrl) {
        let modifiedUrl = contentUrl;
        // Ensure the video link plays automatically (if supported)
        if (contentUrl.includes('youtube.com')) {
          modifiedUrl = contentUrl.includes('?') ? `${contentUrl}&autoplay=1` : `${contentUrl}?autoplay=1`;
        } else if (contentUrl.includes('vimeo.com')) {
          modifiedUrl = contentUrl.includes('?') ? `${contentUrl}&autoplay=1` : `${contentUrl}?autoplay=1`;
        }
        window.open(modifiedUrl, '_blank');
      }
    }
  }
  // toggleOpenLink(index: number) {
  //   if (this.isOpen === index) {
  //     this.isOpen = null; // Close the link if already opened
  //   } else {
  //     this.isOpen = index; // Open the link on clicked button
  //   }
  // }
  openLink(url) {
    if (url) {
      window.open(url, '_blank');
    }
  }
  static #_ = this.ctorParameters = () => [{
    type: _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormBuilder
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.ActionSheetController
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.MasterServiceProxy
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_4__.NoticeServiceProxy
  }, {
    type: _angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClient
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.ModalController
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_8__.UserService
  }];
  static #_2 = this.propDecorators = {
    noticeId: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.Input
    }]
  };
};
AddEditNoticePage = (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.Component)({
  selector: 'add-edit-notice-filter',
  template: _add_edit_notice_page_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_add_edit_notice_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], AddEditNoticePage);


/***/ }),

/***/ 49011:
/*!******************************************************************!*\
  !*** ./src/app/pages/teacherApp/notice/notice-routing.module.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NoticeRoutingModule: () => (/* binding */ NoticeRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _notice_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notice.component */ 60611);




const routes = [{
  path: "",
  component: _notice_component__WEBPACK_IMPORTED_MODULE_0__.NoticeComponent
}];
let NoticeRoutingModule = class NoticeRoutingModule {};
NoticeRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], NoticeRoutingModule);


/***/ }),

/***/ 60611:
/*!*************************************************************!*\
  !*** ./src/app/pages/teacherApp/notice/notice.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NoticeComponent: () => (/* binding */ NoticeComponent)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _notice_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notice.component.html?ngResource */ 31473);
/* harmony import */ var _notice_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notice.component.scss?ngResource */ 45853);
/* harmony import */ var _notice_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_notice_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/user-service */ 4286);
/* harmony import */ var src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/toast/toast.service */ 33545);
/* harmony import */ var src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/common-method-service */ 38336);
/* harmony import */ var _add_edit_notice_add_edit_notice_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./add-edit-notice/add-edit-notice.page */ 38030);
/* harmony import */ var _view_teacher_notice_file_detail_view_teacher_notice_file_detail_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./view-teacher-notice-file-detail/view-teacher-notice-file-detail.page */ 19146);













let NoticeComponent = class NoticeComponent {
  constructor(routerOutlet, modalController, teacherProfileService, masterService, userService, alertController, toastService, commonMethod) {
    this.routerOutlet = routerOutlet;
    this.modalController = modalController;
    this.teacherProfileService = teacherProfileService;
    this.masterService = masterService;
    this.userService = userService;
    this.alertController = alertController;
    this.toastService = toastService;
    this.commonMethod = commonMethod;
    this.dateExample = new Date().toISOString();
    this.content_loaded = false;
    this.noticeList = [];
    this.noticeTypeId = '1';
    this.classTeacherGradeDivisionList = [];
    this.studentList = [];
    this.months = [];
    this.buttonDisabled = false;
  }
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Notice');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    this.selectedMonth = currentDate.getMonth() + 1 + ":" + year;
    this.getUserDetails();
    this.loadMonthNoticeList();
  }
  ngOnInit() {}
  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  getUserDetails() {
    this.userService.getUser().subscribe(result => {
      this.academicYearId = result.academicYearId;
      this.userId = result.userId;
      this.teacherId = result.userIdByRole;
      this.teacherName = result.uname;
      this.getClassTeacherGradeDivisionList();
      this.getStudentList();
      this.GetSchoolBasicDetails();
    });
  }
  onSentReceiveChange(e) {
    let value = e.detail.value;
    this.noticeTypeId = value;
    this.noticeList = [];
    this.loadMonthNoticeList();
  }
  onMonthChange(e) {
    this.getUserDetails();
    this.loadMonthNoticeList();
  }
  loadMonthNoticeList() {
    if (this.selectedMonth) {
      if (this.selectedMonth.length > 1) {
        this.loadNoticeList(parseInt(this.selectedMonth.split(":")[0]), parseInt(this.selectedMonth.split(":")[1]));
      }
    } else {
      let currentDate = new Date();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      this.loadNoticeList(month, year);
    }
  }
  GetSchoolBasicDetails() {
    this.teacherProfileService.getSchoolBasicDetails().subscribe(result => {
      this.schoolDetails = result;
      this.GetMonths();
      this.content_loaded = true;
    });
  }
  GetMonths() {
    this.months = [];
    let fromDate = new Date('2023-01-01');
    if (this.schoolDetails.academicYearStartMonth) {
      fromDate = new Date(this.schoolDetails.academicYearStartMonth.toString());
    }
    let toDate = new Date();
    // set last day of current month
    toDate = new Date(toDate.getFullYear(), toDate.getMonth() + 1, 0);
    const currentDate = new Date(fromDate);
    while (currentDate <= toDate) {
      const month = currentDate.toLocaleString('default', {
        month: 'short'
      });
      const year = currentDate.getFullYear();
      this.months.push({
        text: `${month}-${year}`,
        value: currentDate.getMonth() + 1 + ":" + year
      });
      currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
    }
    return this.months;
  }
  loadNoticeList(month, year) {
    this.teacherProfileService.getNoticeList(parseInt(this.noticeTypeId), parseInt(this.noticeTypeId) == 1 ? this.userId : this.teacherId, month, year).subscribe(result => {
      this.noticeList = result.noticeList;
      this.content_loaded = true;
    });
  }
  getClassTeacherGradeDivisionList() {
    this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe(result => {
      this.classTeacherGradeDivisionList = result.schoolGradeDivisionMatrixCascadeList;
    });
  }
  getStudentList() {
    this.masterService.getStudentDropdownData(this.academicYearId).subscribe(result => {
      this.studentList = result.lstDropdownValues;
    });
  }
  getFilePath(fileName, isTextFile) {
    if (isTextFile) {
      return;
    }
  }
  openNoticeDetail(noticeId) {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this.modalController.create({
        component: _view_teacher_notice_file_detail_view_teacher_notice_file_detail_page__WEBPACK_IMPORTED_MODULE_8__.ViewTeacherNoticeFileDetailPage,
        componentProps: {
          noticeId: noticeId
        }
      });
      yield modal.present();
    })();
  }
  openDialog(callback, notice, action) {
    this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure? you want to ' + action + ' notice?',
      buttons: [{
        text: 'No',
        handler: () => {}
      }, {
        text: 'Yes',
        handler: () => {
          callback(notice, this);
        }
      }]
    }).then(res => {
      res.present();
    });
  }
  Delete(e, notice) {
    e.stopPropagation();
    this.openDialog(this.DeleteNotice, notice, 'delete');
  }
  DeleteNotice(notice, context) {
    debugger;
    context.teacherProfileService.noticeDelete(notice.noticeId).subscribe(result => {
      context.content_loaded = true;
      context.loadMonthNoticeList();
      context.toastService.presentToast('Success', 'Notice deleted successfully !', 'top', 'success', 2000);
    });
  }
  Publish(e, notice) {
    e.stopPropagation();
    this.openDialog(this.publishNotice, notice, notice.isPublished ? 'unpublish' : 'publish');
  }
  publishNotice(notice, context) {
    let requestWrapper = new src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_3__.PublishUnpublishNoticeDto();
    requestWrapper.noticeId = notice.noticeId;
    requestWrapper.isPublished = !notice.isPublished;
    context.teacherProfileService.publishUnpublishNoticeParticulars(requestWrapper).subscribe(result => {
      context.content_loaded = true;
      context.loadMonthNoticeList();
      context.toastService.presentToast('Success', 'Notice changes saved successfully !', 'top', 'success', 2000);
    });
  }
  // Filter
  filter() {
    var _this2 = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.buttonDisabled = true;
      // Open filter modal
      const modal = yield _this2.modalController.create({
        component: _add_edit_notice_add_edit_notice_page__WEBPACK_IMPORTED_MODULE_7__.AddEditNoticePage,
        componentProps: {
          noticeId: 0
        },
        //swipeToClose: true,
        presentingElement: _this2.routerOutlet.nativeEl
      });
      yield modal.present();
      // Apply filter from modal
      let {
        data
      } = yield modal.onWillDismiss();
      if (data) {
        _this2.toastService.presentToast('Success', 'Notice saved successfully !', 'top', 'success', 2000);
        _this2.loadMonthNoticeList();
      }
      _this2.buttonDisabled = false;
    })();
  }
  editNotice(e, notice) {
    var _this3 = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      e.stopPropagation();
      _this3.teacherProfileService.noticeSelect(notice.noticeId).subscribe(result => {
        _this3.noticeDetails = result;
        _this3.openNoticeDialog(_this3.noticeDetails);
        _this3.content_loaded = true;
      });
    })();
  }
  openNoticeDialog(notice) {
    var _this4 = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Open filter modal
      const modal = yield _this4.modalController.create({
        component: _add_edit_notice_add_edit_notice_page__WEBPACK_IMPORTED_MODULE_7__.AddEditNoticePage,
        componentProps: {
          noticeId: notice.noticeId
        },
        presentingElement: _this4.routerOutlet.nativeEl
      });
      yield modal.present();
      // Apply filter from modal
      let {
        data
      } = yield modal.onWillDismiss();
      if (data) {
        _this4.toastService.presentToast('Success', 'Notice saved successfully !', 'top', 'success', 2000);
        _this4.loadMonthNoticeList();
      }
    })();
  }
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonRouterOutlet
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_3__.TeacherProfileServiceProxy
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_3__.MasterServiceProxy
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__.UserService
  }, {
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.AlertController
  }, {
    type: src_app_services_toast_toast_service__WEBPACK_IMPORTED_MODULE_5__.ToastService
  }, {
    type: src_app_services_common_method_service__WEBPACK_IMPORTED_MODULE_6__.CommonMethodService
  }];
  static #_2 = this.propDecorators = {
    modal: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild,
      args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonModal]
    }]
  };
};
NoticeComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
  selector: 'app-notice',
  template: _notice_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_notice_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], NoticeComponent);


/***/ }),

/***/ 14258:
/*!**********************************************************!*\
  !*** ./src/app/pages/teacherApp/notice/notice.module.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NoticeModule: () => (/* binding */ NoticeModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng2-charts */ 16045);
/* harmony import */ var _notice_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notice-routing.module */ 49011);
/* harmony import */ var _notice_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notice.component */ 60611);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 93887);
/* harmony import */ var _add_edit_notice_add_edit_notice_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add-edit-notice/add-edit-notice.page */ 38030);
/* harmony import */ var _view_teacher_notice_file_detail_view_teacher_notice_file_detail_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view-teacher-notice-file-detail/view-teacher-notice-file-detail.page */ 19146);











let NoticeModule = class NoticeModule {};
NoticeModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _notice_routing_module__WEBPACK_IMPORTED_MODULE_0__.NoticeRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule, ng2_charts__WEBPACK_IMPORTED_MODULE_10__.NgChartsModule, src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule],
  declarations: [_notice_component__WEBPACK_IMPORTED_MODULE_1__.NoticeComponent, _add_edit_notice_add_edit_notice_page__WEBPACK_IMPORTED_MODULE_3__.AddEditNoticePage, _view_teacher_notice_file_detail_view_teacher_notice_file_detail_page__WEBPACK_IMPORTED_MODULE_4__.ViewTeacherNoticeFileDetailPage]
})], NoticeModule);


/***/ }),

/***/ 19146:
/*!*****************************************************************************************************************!*\
  !*** ./src/app/pages/teacherApp/notice/view-teacher-notice-file-detail/view-teacher-notice-file-detail.page.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewTeacherNoticeFileDetailPage: () => (/* binding */ ViewTeacherNoticeFileDetailPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _view_teacher_notice_file_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-teacher-notice-file-detail.page.html?ngResource */ 23390);
/* harmony import */ var _view_teacher_notice_file_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view-teacher-notice-file-detail.page.scss?ngResource */ 79738);
/* harmony import */ var _view_teacher_notice_file_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_view_teacher_notice_file_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);






let ViewTeacherNoticeFileDetailPage = class ViewTeacherNoticeFileDetailPage {
  constructor(modalCtrl, teacherProfileService) {
    this.modalCtrl = modalCtrl;
    this.teacherProfileService = teacherProfileService;
  }
  ngOnInit() {
    this.teacherProfileService.noticeSelect(this.noticeId).subscribe(result => {
      this.noticeDetails = result;
    });
  }
  close() {
    return this.modalCtrl.dismiss(false, 'cancel');
  }
  getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
  }
  showFile(file) {
    window.open(file.fullPath, '_blank');
  }
  hasNonEmptyVideoLinks() {
    if (!this.noticeDetails.videoText) {
      return false;
    }
    for (const item of this.noticeDetails.videoText) {
      if (item.contentUrl.trim().length > 0) {
        return true;
      }
    }
  }
  openVideoLink(videoUrl) {
    window.open(videoUrl, '_blank');
  }
  static #_ = this.ctorParameters = () => [{
    type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.ModalController
  }, {
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_2__.TeacherProfileServiceProxy
  }];
};
ViewTeacherNoticeFileDetailPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  selector: 'view-notice-file-detail',
  template: _view_teacher_notice_file_detail_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_view_teacher_notice_file_detail_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], ViewTeacherNoticeFileDetailPage);


/***/ }),

/***/ 23894:
/*!**********************************************************************************************!*\
  !*** ./src/app/pages/teacherApp/notice/add-edit-notice/add-edit-notice.page.scss?ngResource ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:host ion-list {
  background-color: var(--ion-color-primary);
}
:host ion-item {
  --border-radius: 8px;
  margin-bottom: 8px;
}
:host .form-default {
  margin-top: 20px;
}
:host .label-floating {
  max-width: -moz-fit-content !important;
  max-width: fit-content !important;
}

p {
  font-size: 11px;
  line-height: 16px;
}

.uploaded-file-text {
  margin: 10px 0;
  font-size: 12px;
  border: 0;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
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
  margin-bottom: 10px;
}
.uploaded-file-text .file-thumb img {
  width: 100%;
}
.uploaded-file-text .file-thumb .delete-file {
  position: absolute;
  top: -3px;
  right: -3px;
  background-color: red;
  width: 20px;
  height: 20px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #fff;
}
.uploaded-file-text .file-thumb .delete-file i {
  color: #fff;
  line-height: 1;
}

.uploaded-file-text {
  margin: 10px 0;
  font-size: 12px;
  border: 0;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
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
  margin-bottom: 10px;
}
.uploaded-file-text .file-thumb img {
  width: 100%;
}
.uploaded-file-text .file-thumb .delete-file {
  position: absolute;
  top: -3px;
  right: -3px;
  background-color: red;
  width: 20px;
  height: 20px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.uploaded-file-text .file-thumb .delete-file i {
  color: #fff;
  line-height: 1;
}

.custom-error {
  color: red;
  font-size: 12px;
}

.ion-lable-size {
  font-size: 12px;
}

/* Custom CSS for Ionic components */
.videoText {
  padding: 10px; /* Padding around the entire section */
}
.videoText .heading {
  display: flex;
  align-items: center;
  padding-right: 10px; /* Adjust as needed */
}
.videoText .heading ion-input {
  width: 100%; /* Ensures the input takes full width */
}
.videoText .heading .action-btn {
  margin-left: 10px; /* Adjust spacing between buttons */
}
.videoText .heading .action-btn ion-icon {
  font-size: 20px; /* Adjust icon size if needed */
}
.videoText .heading .open-btn {
  /* Additional styles for open button if needed */
}
.videoText .heading .add-btn, .videoText .heading .remove-btn {
  /* Additional styles for add and remove buttons if needed */
}

.ion-padding-vertical {
  padding-bottom: 0px;
}

ion-label {
  color: #000 !important;
}

ion-checkbox {
  color: #000;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/teacherApp/notice/add-edit-notice/add-edit-notice.page.scss"],"names":[],"mappings":"AACE;EACE,0CAAA;AAAJ;AAEE;EACE,oBAAA;EACA,kBAAA;AAAJ;AAGE;EACE,gBAAA;AADJ;AAGE;EACF,sCAAA;EAAA,iCAAA;AADA;;AAKA;EACE,eAAA;EACE,iBAAA;AAFJ;;AAKA;EACE,cAAA;EAIA,eAAA;EAEA,SAAA;EACA,aAAA;EACA,eAAA;EACA,UAAA;AANF;AAOE;EACI,WAAA;EACA,YAAA;EACA,sBAAA;EACA,YAAA;EACA,kBAAA;EACA,aAAA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;AALN;AAMM;EACI,WAAA;AAJV;AAMM;EACI,kBAAA;EACA,SAAA;EACA,WAAA;EACA,qBAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,eAAA;EACA,WAAA;AAJV;AAMU;EACI,WAAA;EACA,cAAA;AAJd;;AAaA;EACE,cAAA;EAIA,eAAA;EAEA,SAAA;EACA,aAAA;EACA,eAAA;EACA,UAAA;AAdF;AAeE;EACI,WAAA;EACA,YAAA;EACA,sBAAA;EACA,YAAA;EACA,kBAAA;EACA,aAAA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;AAbN;AAcM;EACI,WAAA;AAZV;AAcM;EACI,kBAAA;EACA,SAAA;EACA,WAAA;EACA,qBAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,eAAA;AAZV;AAaU;EACI,WAAA;EACA,cAAA;AAXd;;AAkBA;EACE,UAAA;EACA,eAAA;AAfF;;AAiBA;EACE,eAAA;AAdF;;AAiBA,oCAAA;AACA;EACE,aAAA,EAAA,sCAAA;AAdF;AAeE;EACE,aAAA;EACA,mBAAA;EACA,mBAAA,EAAA,qBAAA;AAbJ;AAcI;EACE,WAAA,EAAA,uCAAA;AAZN;AAcI;EACE,iBAAA,EAAA,mCAAA;AAZN;AAaM;EACE,eAAA,EAAA,+BAAA;AAXR;AAcI;EACE,gDAAA;AAZN;AAcI;EACE,2DAAA;AAZN;;AAkBA;EACE,mBAAA;AAfF;;AAkBE;EACE,sBAAA;AAfJ;;AAmBA;EACE,WAAA;AAhBF","sourcesContent":[":host {\n  ion-list {\n    background-color: var(--ion-color-primary);\n  }\n  ion-item {\n    --border-radius: 8px;\n    margin-bottom: 8px;\n  }\n\n  .form-default {\n    margin-top: 20px;\n  }\n  .label-floating {\nmax-width: fit-content !important;\n  }\n}\n\np {\n  font-size: 11px;\n    line-height: 16px;\n}\n\n.uploaded-file-text {\n  margin: 10px 0;\n  // background: #e0e8f8;\n  // padding: 2px 5px;\n  // padding-right: 25px;\n  font-size: 12px;\n  //position: relative;\n  border: 0;\n  display: flex;\n  flex-wrap: wrap;\n  padding: 0;\n  .file-thumb {\n      width: 64px;\n      height: 64px;\n      border: 1px solid #ccc;\n      padding: 5px;\n      border-radius: 4px;\n      display: flex;\n      position: relative;\n      margin-right: 10px;\n      margin-bottom: 10px;\n      img {\n          width: 100%;\n      }\n      .delete-file {\n          position: absolute;\n          top:-3px;\n          right:-3px;\n          background-color: red;\n          width: 20px;\n          height: 20px;\n          border-radius: 30px;\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          cursor: pointer;\n          color: #fff;\n\n          i {\n              color: #fff;\n              line-height: 1;\n          }\n  \n      }\n  }\n\n}\n\n\n.uploaded-file-text {\n  margin: 10px 0;\n  // background: #e0e8f8;\n  // padding: 2px 5px;\n  // padding-right: 25px;\n  font-size: 12px;\n  //position: relative;\n  border: 0;\n  display: flex;\n  flex-wrap: wrap;\n  padding: 0;\n  .file-thumb {\n      width: 64px;\n      height: 64px;\n      border: 1px solid #ccc;\n      padding: 5px;\n      border-radius: 4px;\n      display: flex;\n      position: relative;\n      margin-right: 10px;\n      margin-bottom: 10px;\n      img {\n          width: 100%;\n      }\n      .delete-file {\n          position: absolute;\n          top:-3px;\n          right:-3px;\n          background-color: red;\n          width: 20px;\n          height: 20px;\n          border-radius: 30px;\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          cursor: pointer;\n          i {\n              color: #fff;\n              line-height: 1;\n          }\n  \n      }\n  }\n\n}\n.custom-error{\n  color: red;\n  font-size: 12px;\n}\n.ion-lable-size{\n  font-size: 12px;\n \n}\n/* Custom CSS for Ionic components */\n.videoText {\n  padding: 10px; /* Padding around the entire section */\n  .heading {\n    display: flex;\n    align-items: center;\n    padding-right: 10px; /* Adjust as needed */\n    ion-input {\n      width: 100%; /* Ensures the input takes full width */\n    }\n    .action-btn {\n      margin-left: 10px; /* Adjust spacing between buttons */\n      ion-icon {\n        font-size: 20px; /* Adjust icon size if needed */\n      }\n    }\n    .open-btn {\n      /* Additional styles for open button if needed */\n    }\n    .add-btn, .remove-btn {\n      /* Additional styles for add and remove buttons if needed */\n    }\n  }\n \n}\n\n.ion-padding-vertical{\n  padding-bottom: 0px;\n  }\n\n  ion-label {\n    color: #000 !important;\n  }\n\n  \nion-checkbox {\n  color: #000;\n  }\n  "],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 45853:
/*!**************************************************************************!*\
  !*** ./src/app/pages/teacherApp/notice/notice.component.scss?ngResource ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:host {
  --min-height: 30px !important;
}
:host ion-item {
  --background: #fff;
  background-color: #fff;
}
:host .date-header {
  padding: 0 10px;
}
:host ion-card {
  box-shadow: none;
  display: flex;
  border-radius: 0px;
  border-bottom: 1px solid #623AA2;
}
:host ion-card ion-card-header {
  padding: 10px;
  width: 120px;
}
:host ion-card ion-card-header ion-card-subtitle {
  color: #110a3b;
  font-size: 13px;
}
:host ion-card ion-card-header ion-card-subtitle.class {
  color: #000;
}
:host ion-card ion-card-content {
  padding: 0 10px;
  border-left: 3px solid #9ad8ef;
  background: #9ad8ef;
  border-radius: 10px;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  line-height: 1.4;
  font-size: 11px;
  color: #828891;
  width: 100%;
  min-height: 22px;
}
:host ion-card ion-card-content ion-title {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 5px;
  padding: 0;
  color: #000;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 210px;
  padding-top: 5px;
}
:host ion-card-subtitle.title-footer {
  font-size: 12px;
  padding: 0px 0px;
  text-align: right;
  color: #000;
  display: flex;
  margin-bottom: 7px;
}
:host ion-card-subtitle.title-footer ion-badge {
  margin-right: 5px;
  border-radius: 10px;
  width: 16px;
  height: 16px;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  --background: #110a3b;
  background-color: #110a3b;
  color: #fff;
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
ion-list.notice-card ion-item {
  border-bottom: 0;
  --background: #fff;
  background-color: #fff;
  border-radius: 4px;
  margin: 0 5px 10px;
  align-items: flex-start;
  box-shadow: 0px 0px 3px 1px rgba(204, 204, 204, 0.7098039216);
}
ion-list.notice-card ion-item:last-child {
  border-bottom: 0 !important;
}
ion-list.notice-card ion-item ion-card-subtitle {
  font-size: 12px;
  display: block;
  width: 100%;
  color: #ccc;
}
ion-list.notice-card ion-item ion-card-subtitle ion-text {
  color: #000;
}
ion-list.notice-card ion-item ion-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 45px;
  height: 45px;
  margin-right: 5px;
}
ion-list.notice-card ion-item ion-avatar span {
  font-size: 20px;
  font-weight: bold;
}
ion-list.notice-card ion-item ion-label {
  font-size: 13px;
  font-weight: 400;
}

.download {
  margin-top: 20px;
}
.download a {
  text-decoration: none;
  border: 1px solid #000;
  border-radius: 4px;
  background-color: #110a3b;
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

ion-modal.homework-modal ion-header ion-toolbar ion-title.main-title {
  color: #fff;
  --color:#fff;
  font-size: 14px;
}

.white-bg-color ion-fab-button {
  width: 22px !important;
  height: 22px !important;
  margin-right: 7px;
  --background: #fff;
  --background-activated: #fff;
  --background-hover: #fff;
  --border-radius: 15px;
  --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  --color: black;
}
.white-bg-color ion-fab-button ion-icon {
  font-size: 13px;
}

.bold-black-text {
  font-weight: bold;
  color: black;
  margin-right: 5px;
}

.download {
  padding: 0px;
  border-radius: 4px;
  margin-bottom: 5px;
}
.download a {
  background-color: #91baaf !important;
  border-color: #91baaf !important;
}

.right-bg {
  padding: 0 10px;
  border-left: 1px solid #110a3b;
  border-radius: 0px;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  line-height: 1.4;
  font-size: 11px;
  color: #828891;
  width: 100%;
  min-height: 22px;
  align-items: flex-start;
}
.right-bg ion-icon {
  color: #ff1a00;
  font-size: 18px;
  padding-top: 5px;
  margin-right: 5px;
}
.right-bg p {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 5px;
  padding: 0;
  color: #000;
  padding-top: 5px;
  margin-bottom: 5px;
}
.right-bg ion-title {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 5px;
  padding: 0;
  color: #000;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  width: 210px;
  padding-top: 5px;
}

.card-new-one {
  background: #cce3f7;
  border-radius: 4px !important;
  overflow: visible;
  contain: initial !important;
}

.new-actions {
  position: relative;
  top: 0;
  right: 0;
  margin-left: auto;
  width: 50px;
  background-color: #110a3b;
  display: flex;
  align-items: center;
}
.new-actions ion-fab-button {
  width: 31px !important;
  height: 31px !important;
  margin-right: 0;
  --background: #110a3b;
  --background-activated: #110a3b;
  --background-hover: #110a3b;
  --border-radius: 0;
  margin-left: 1px;
  --color: #fff;
  color: #fff;
}
.new-actions ion-fab-button ion-icon {
  font-size: 24px;
  --color: #fff;
  color: #fff;
}
.new-actions ion-fab-list {
  min-height: 22px !important;
}
.new-actions ion-fab-list ion-fab-button {
  width: 35px !important;
  height: 35px !important;
  margin-right: 7px;
  --background: #110a3b;
  --background-activated: #110a3b;
  --background-hover: #110a3b;
  --border-radius: 55px;
  --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  --color: black;
}
.new-actions ion-fab-list ion-fab-button ion-icon {
  font-size: 21px;
}

.custom-input-css.custom-width {
  width: 100px !important;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/teacherApp/notice/notice.component.scss"],"names":[],"mappings":"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","sourcesContent":[":host {\n    --min-height: 30px !important;\n        ion-item {\n        --background: #fff;\n        background-color: #fff;\n    }\n    .date-header {\n        padding: 0 10px;\n    }\n    ion-card {\n        //box-shadow: 0px 0px 3px 1px #ccccccb5;\n        box-shadow: none;\n        display: flex;\n        //align-items: flex-start;\n        border-radius: 0px;\n        border-bottom: 1px solid #623AA2;\n        ion-card-header {\n            padding: 10px;\n            width: 120px;\n            ion-card-subtitle {\n                color: #110a3b;\n                font-size: 13px;\n                &.class {\n                    color: #000;\n                }\n            }\n        }\n        ion-card-content {\n            padding: 0 10px;\n            border-left: 3px solid #9ad8ef;\n            background: #9ad8ef;\n    border-radius: 10px;\n            margin-left: 5px;\n            margin-top: 5px;\n            margin-bottom: 5px;\n            line-height: 1.4;\n            font-size: 11px;\n            color: #828891;\n            width: 100%;\n            min-height: 22px;\n            ion-title {\n                font-size: 13px;\n                font-weight: 500;\n                margin-bottom: 5px;\n                padding: 0;\n                color: #000;\n                position: relative;\n                overflow: hidden;\n                text-overflow: ellipsis;\n                width: 210px;\n                padding-top: 5px;\n            }\n        }\n    }\n\n    ion-card-subtitle.title-footer {\n        font-size: 12px;\n        padding: 0px 0px;\n        text-align: right;\n        color: #000;\n        display: flex;\n        margin-bottom: 7px;\n        ion-badge {\n            margin-right: 5px;\n            border-radius: 10px;\n            width: 16px;\n            height: 16px;\n            font-size: 10px;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            --background: #110a3b;\n            background-color: #110a3b;\n            color: #fff;\n        }\n    }\n}\n\nion-list {\n    padding-top: 0;\n    background-color: #fff !important;\n    --background: #fff !important;\n    border-radius: 0;\n    --border-radius: 0;\n    ion-card-subtitle {\n        font-size: 18px;\n    }\n    &.notice-card {\n        ion-item {\n            border-bottom: 0;\n            --background: #fff;\n            background-color: #fff;\n            border-radius: 4px;\n            margin: 0 5px 10px;\n\n            align-items: flex-start;\n            box-shadow: 0px 0px 3px 1px #ccccccb5;\n            &:last-child {\n                border-bottom: 0 !important;\n            }\n\n            ion-card-subtitle {\n                font-size: 12px;\n                display: block;\n                width: 100%;\n                color: #ccc;\n                ion-text {\n                    color: #000;\n                }\n            }\n            ion-avatar {\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                background-color: #fff;\n                width: 45px;\n                height: 45px;\n                margin-right: 5px;\n                span {\n                    font-size: 20px;\n                    font-weight: bold;\n                }\n            }\n            ion-label {\n                font-size: 13px;\n                font-weight: 400;\n            }\n        }\n    }\n}\n\n.download {\n    margin-top: 20px;\n    a {\n        text-decoration: none;\n        border: 1px solid #000;\n        border-radius: 4px;\n        background-color: #110a3b;\n        color: #fff;\n        padding: 10px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 16px;\n        ion-icon {\n            font-size: 24px;\n        }\n    }\n}\n\n.modal-text-header {\n    ion-card-subtitle {\n        font-size: 16px;\n        ion-text {\n            font-size: 14px;\n            display: block;\n            color: #000;\n        }\n    }\n}\n\n\nion-modal.homework-modal {\n    ion-header {\n      ion-toolbar {\n          ion-title.main-title {\n              color: #fff;\n              --color:#fff;\n              font-size: 14px;\n          }\n      }\n    }\n  }\n\n  .white-bg-color {\n    ion-fab-button {\n        width: 22px !important;\n        height: 22px !important;\n        margin-right: 7px;\n        --background: #fff;\n        --background-activated: #fff;\n        --background-hover: #fff;\n        --border-radius: 15px;\n        --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);\n        --color: black;\n        ion-icon {\n            font-size: 13px;\n        }\n      }\n      \n  }\n  .bold-black-text {\n    font-weight: bold;\n    color: black;\n    margin-right: 5px; \n}\n\n\n.download {\n    \n    padding: 0px;\n    border-radius: 4px;\n    margin-bottom: 5px;\n    a {\n        background-color: #91baaf !important;\n    border-color: #91baaf !important;\n    }\n}\n\n.right-bg {\n    padding: 0 10px;\n    border-left: 1px solid #110a3b;\n    //background: #9ad8ef;\nborder-radius: 0px;\n    margin-left: 5px;\n    margin-top: 5px;\n    margin-bottom: 5px;\n    line-height: 1.4;\n    font-size: 11px;\n    color: #828891;\n    width: 100%;\n    min-height: 22px;\n    align-items: flex-start;\n    ion-icon {\n        color: #ff1a00;\n    font-size: 18px;\n    padding-top: 5px;\n    margin-right: 5px;\n    }\n    p{\n        font-size: 13px;\n        font-weight: 500;\n        margin-bottom: 5px;\n        padding: 0;\n        color: #000;\n        // position: relative;\n        // overflow: hidden;\n        // text-overflow: ellipsis;\n        // -webkit-line-clamp: 2;\n        // -webkit-box-orient: vertical;\n        padding-top: 5px;\n        margin-bottom: 5px;\n    }\n    ion-title {\n        font-size: 13px;\n        font-weight: 500;\n        margin-bottom: 5px;\n        padding: 0;\n        color: #000;\n        position: relative;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        -webkit-line-clamp: 4;\n        -webkit-box-orient: vertical;\n        width: 210px;\n        padding-top: 5px;\n    }\n}\n\n.card-new-one {\n    background: #cce3f7;\n    border-radius: 4px !important;\n    overflow: visible;\n    contain: initial !important;\n}\n\n.new-actions {\n    position: relative;\n    top: 0;\n    right: 0;\n    margin-left: auto;\n    width: 50px;\n    background-color: #110a3b;\n    display: flex;\n    align-items: center;\n    ion-fab-button {\n        width: 31px !important;\n        height: 31px !important;\n        margin-right: 0;\n        --background: #110a3b;\n        --background-activated: #110a3b;\n        --background-hover: #110a3b;\n        --border-radius: 0;\n        margin-left: 1px;\n        //--box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);\n        --color: #fff;\n        color: #fff;\n\n        ion-icon {\n            font-size: 24px;\n            --color: #fff;\n            color: #fff;\n\n        }\n      }\n      ion-fab-list {\n        min-height: 22px !important;\n        ion-fab-button {\n            width: 35px !important;\n            height: 35px !important;\n            margin-right: 7px;\n            --background: #110a3b;\n            --background-activated: #110a3b;\n            --background-hover: #110a3b;\n            --border-radius: 55px;\n            --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);\n            --color: black;\n            ion-icon {\n                font-size: 21px;\n            }\n          }\n      }\n\n    //   ion-fab-button[data-desc] {\n    //     position: relative;\n    // }\n    \n    // ion-fab-button[data-desc]::after {\n    //     position: absolute;\n    //     content: attr(data-desc);\n    //     z-index: 1;\n    //     right: 50px;\n    //     bottom: 7px;\n    //     color: #000;\n    //     background-color: var(--ion-color-base, #fff);\n    //     padding: 5px 10px;\n    //     border-radius: 10px;\n    //     box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);\n    // }\n}\n.custom-input-css.custom-width {\n    width: 100px !important;\n}\n\n\n\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 79738:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/pages/teacherApp/notice/view-teacher-notice-file-detail/view-teacher-notice-file-detail.page.scss?ngResource ***!
  \******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@charset "UTF-8";
:host {
  --min-height: 30px !important;
}
:host ion-item {
  --background: #fff;
  background-color: #fff;
}
:host .date-header {
  padding: 0 10px;
}
:host ion-card {
  box-shadow: none;
  border-bottom: 1px solid rgba(204, 204, 204, 0.8);
  display: flex;
  align-items: flex-start;
  border-radius: 0px;
}
:host ion-card ion-card-header {
  padding: 10px;
  width: 120px;
}
:host ion-card ion-card-header ion-card-subtitle {
  color: #110a3b;
  font-size: 13px;
}
:host ion-card ion-card-header ion-card-subtitle.class {
  color: #110a3b;
  font-size: 13px;
}
:host ion-card ion-card-content {
  padding: 0 10px;
  background: #EECE13;
  border-radius: 10px;
  margin-left: 5px;
  margin-top: 0;
  padding-bottom: 5px;
  margin-bottom: 5px;
  line-height: 1.4;
  font-size: 11px;
  color: #000;
  width: 100%;
  min-height: 22px;
}
:host ion-card ion-card-content ion-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
  padding: 0;
  padding-top: 5px;
  color: #000;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 210px;
  padding-top: 5px;
}
:host ion-card-subtitle.title-footer {
  font-size: 12px;
  padding: 0px 0px;
  text-align: right;
  color: #000;
  display: flex;
  margin-bottom: 7px;
}
:host ion-card-subtitle.title-footer ion-badge {
  margin-right: 5px;
  border-radius: 10px;
  width: 16px;
  height: 16px;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  --background: #110a3b;
  background-color: #110a3b;
  color: #fff;
}

ion-list {
  padding-top: 0;
}
ion-list ion-card-subtitle {
  font-size: 18px;
}
ion-list.notice-card ion-item {
  border-bottom: 0;
  --background: #fff;
  background-color: #fff;
  border-radius: 4px;
  margin: 0 5px 10px;
  align-items: flex-start;
  box-shadow: 0px 0px 3px 1px rgba(204, 204, 204, 0.7098039216);
}
ion-list.notice-card ion-item:last-child {
  border-bottom: 0 !important;
}
ion-list.notice-card ion-item ion-card-subtitle {
  font-size: 12px;
  display: block;
  width: 100%;
  color: #ccc;
}
ion-list.notice-card ion-item ion-card-subtitle ion-text {
  color: #000;
}
ion-list.notice-card ion-item ion-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 45px;
  height: 45px;
  margin-right: 5px;
}
ion-list.notice-card ion-item ion-avatar span {
  font-size: 20px;
  font-weight: bold;
}
ion-list.notice-card ion-item ion-label {
  font-size: 13px;
  font-weight: 400;
}

.download {
  margin-top: 20px;
}
.download a {
  text-decoration: none;
  border: 1px solid #000;
  border-radius: 4px;
  background-color: #110a3b;
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

ion-modal.homework-modal ion-header ion-toolbar ion-title.main-title {
  color: #fff;
  --color:#fff;
  font-size: 14px;
}

.white-bg-color ion-fab-button {
  width: 22px !important;
  height: 22px !important;
  margin-right: 7px;
  --background: #fff;
  --background-activated: #fff;
  --background-hover: #fff;
  --border-radius: 15px;
  --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  --color: black;
}
.white-bg-color ion-fab-button ion-icon {
  font-size: 13px;
}

.bold-black-text {
  font-weight: bold;
  color: black;
  margin-right: 5px;
}

.bold-black-text {
  font-weight: bold;
  color: black;
}

.plain-link {
  color: inherit;
  text-decoration: none;
  display: block;
  padding: 10px 0; /* Adjust padding as needed */
}

.input-item {
  margin-bottom: 10px; /* Adjust spacing as needed */
}

.action-btn {
  margin-top: 5px; /* Adjust spacing as needed */
}

.thumbnail-icon {
  width: 60px;
  height: 60px;
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
}`, "",{"version":3,"sources":["webpack://./src/app/pages/teacherApp/notice/view-teacher-notice-file-detail/view-teacher-notice-file-detail.page.scss"],"names":[],"mappings":"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","sourcesContent":["\n:host {\n  --min-height: 30px !important;\n      ion-item {\n      --background: #fff;\n      background-color: #fff;\n  }\n  .date-header {\n      padding: 0 10px;\n  }\n  ion-card {\n      //box-shadow: 0px 0px 3px 1px #ccccccb5;\n      box-shadow: none;\n      border-bottom: 1px solid #cccc;\n      display: flex;\n      align-items: flex-start;\n      border-radius: 0px;\n      ion-card-header {\n          padding: 10px;\n          width: 120px;\n          ion-card-subtitle {\n              color: #110a3b;\n              font-size: 13px;\n              &.class {\n                  color: #110a3b;\n                  font-size: 13px;\n              }\n          }\n      }\n      ion-card-content {\n          padding: 0 10px;\n          //border-left: 3px solid #ff7307;\n          background: #EECE13;\n          border-radius: 10px;\n          margin-left: 5px;\n          margin-top: 0;\n          padding-bottom: 5px;\n          margin-bottom: 5px;\n          line-height: 1.4;\n          font-size: 11px;\n          color: #000;\n          width: 100%;\n          min-height: 22px;\n          ion-title {\n              font-size: 14px;\n              font-weight: 500;\n              margin-bottom: 5px;\n              padding: 0;\n              padding-top: 5px;\n              color: #000;\n              position: relative;\n              overflow: hidden;\n              text-overflow: ellipsis;\n              width: 210px;\n              padding-top: 5px;\n          }\n      }\n  }\n\n  ion-card-subtitle.title-footer {\n      font-size: 12px;\n      padding: 0px 0px;\n      text-align: right;\n      color: #000;\n      display: flex;\n      margin-bottom: 7px;\n      ion-badge {\n          margin-right: 5px;\n          border-radius: 10px;\n          width: 16px;\n          height: 16px;\n          font-size: 10px;\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          --background: #110a3b;\n          background-color: #110a3b;\n          color: #fff;\n      }\n  }\n}\n\nion-list {\n  padding-top: 0;\n  ion-card-subtitle {\n      font-size: 18px;\n  }\n  &.notice-card {\n      ion-item {\n          border-bottom: 0;\n          --background: #fff;\n          background-color: #fff;\n          border-radius: 4px;\n          margin: 0 5px 10px;\n\n          align-items: flex-start;\n          box-shadow: 0px 0px 3px 1px #ccccccb5;\n          &:last-child {\n              border-bottom: 0 !important;\n          }\n\n          ion-card-subtitle {\n              font-size: 12px;\n              display: block;\n              width: 100%;\n              color: #ccc;\n              ion-text {\n                  color: #000;\n              }\n          }\n          ion-avatar {\n              display: flex;\n              justify-content: center;\n              align-items: center;\n              background-color: #fff;\n              width: 45px;\n              height: 45px;\n              margin-right: 5px;\n              span {\n                  font-size: 20px;\n                  font-weight: bold;\n              }\n          }\n          ion-label {\n              font-size: 13px;\n              font-weight: 400;\n          }\n      }\n  }\n}\n\n.download {\n  margin-top: 20px;\n  a {\n      text-decoration: none;\n      border: 1px solid #000;\n      border-radius: 4px;\n      background-color: #110a3b;\n      color: #fff;\n      padding: 10px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 16px;\n      ion-icon {\n          font-size: 24px;\n      }\n  }\n}\n\n.modal-text-header {\n  ion-card-subtitle {\n      font-size: 16px;\n      ion-text {\n          font-size: 14px;\n          display: block;\n          color: #000;\n      }\n  }\n}\n\n\nion-modal.homework-modal {\n  ion-header {\n    ion-toolbar {\n        ion-title.main-title {\n            color: #fff;\n            --color:#fff;\n            font-size: 14px;\n        }\n    }\n  }\n}\n.white-bg-color {\n  ion-fab-button {\n      width: 22px !important;\n      height: 22px !important;\n      margin-right: 7px;\n      --background: #fff;\n      --background-activated: #fff;\n      --background-hover: #fff;\n      --border-radius: 15px;\n      --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);\n      --color: black;\n      ion-icon {\n          font-size: 13px;\n      }\n    }\n}\n.bold-black-text {\n  font-weight: bold;\n  color: black;\n  margin-right: 5px; \n}\n\n.bold-black-text {\n    font-weight: bold;\n    color: black;\n  }\n  \n  .plain-link {\n    color: inherit;\n    text-decoration: none;\n    display: block;\n    padding: 10px 0; /* Adjust padding as needed */\n  }\n  \n  .input-item {\n    margin-bottom: 10px; /* Adjust spacing as needed */\n  }\n  \n  .action-btn {\n    margin-top: 5px; /* Adjust spacing as needed */\n  }\n\n  .thumbnail-icon {\n    width: 60px;\n    height: 60px;\n  }\n  \n  \n  .video-link-wrap {\n    margin-top: 10px;\n  }\n\n\n  \n  .videoText a {\n    display: block;\n    margin-bottom: 25px; /* Add space between links */\n    color: black; /* Or any preferred color */\n    text-decoration: none;\n    word-break: break-all; /* Ensures long URLs wrap within the container */\n  }\n  \n  .videoText a:hover {\n    text-decoration: underline;\n  }\n\n  .black-bullet {\n    list-style-type: none; /* Remove default bullet */\n    padding-left: 0; /* Optional: adjust padding to align with your design */\n    margin: 0; /* Remove default margin */\n  }\n  \n  .black-bullet li {\n    position: relative; /* For the pseudo-element */\n    padding-left: 20px; /* Space for the bullet */\n    color: black; /* This ensures the bullet points themselves are black */\n  }\n  \n  .black-bullet li::before {\n    content: '•'; /* Bullet character */\n    position: absolute;\n    left: 0;\n    color: black; /* Ensures the bullet color is black */\n  }\n  \n  .black-bullet li a {\n    text-decoration: none;\n    color: inherit; /* Ensures the link color matches the text color */\n  }\n  \n  \n  \n  \n\n\n  \n  \n  \n  "],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 67658:
/*!**********************************************************************************************!*\
  !*** ./src/app/pages/teacherApp/notice/add-edit-notice/add-edit-notice.page.html?ngResource ***!
  \**********************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header collapse=\"fade\" [translucent]=\"true\" class=\"modal-header\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button color=\"secondary\" fill=\"outline\" (click)=\"close()\">\n        Cancel\n      </ion-button>\n    </ion-buttons>\n\n    <ion-title color=\"dark-color\"> {{ noticeId>0?'Edit' :'Add'}} Notice </ion-title>\n\n    <ion-buttons slot=\"end\">\n      <ion-button color=\"primary\" fill=\"solid\" (click)=\"saveNoticeData()\">\n        Save\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class=\"form-padding\">\n    <form class=\"form-default m-0\" [formGroup]=\"noticeForm\">\n      <div class=\"form-control-wrapper\">\n        <div class=\"custom-input-css\">\n          <ion-label color=\"dark\" position=\"stacked\">Notice To <span class=\"star-required\">*</span></ion-label>\n          <ion-select class=\"custom-select-css\" placeholder=\"Notice To\" formControlName=\"noticeToType\" (ionChange)=\"resetSelectList(f,'noticeToType')\" >\n            <ion-select-option *ngFor=\"let item of noticeToDropdownList\" [value]=\"item.id\"> {{item.value}}</ion-select-option>\n          </ion-select>\n\n        </div> \n        <div *ngIf=\"submitted && f['noticeToType']?.errors\">\n          <ion-note *ngIf=\"f['noticeToType'].errors['required']\" slot=\"error\">Please select Notice To.</ion-note>\n         </div>\n      </div>\n\n      <div class=\"form-control-wrapper\" *ngIf=\"f['noticeToType']?.value==2\">\n        <div class=\"custom-input-css\">\n          <ion-label color=\"dark\" position=\"stacked\">Select Class <span class=\"star-required\">*</span></ion-label>\n          <ion-select class=\"custom-select-css\" (ionChange)=\"resetSelectList(f,'classId')\" placeholder=\"Select Class\" formControlName=\"classId\">\n            <ion-select-option *ngFor=\"let item of divisionGradeMapping\" [value]=\"item.schoolGradeDivisionMatrixId\"> {{ item.className }}</ion-select-option>\n\n          </ion-select>\n        </div>\n        <div *ngIf=\"submitted && f['classId']?.errors\">\n          <ion-note *ngIf=\"f['classId'].errors['required']\" slot=\"error\">Please select class.</ion-note>\n         </div>\n      </div>\n\n      <div class=\"form-control-wrapper\" *ngIf=\"f['noticeToType']?.value==1\">\n        <div class=\"custom-input-css\">\n          <ion-label color=\"dark\" position=\"stacked\">Select Student <span class=\"star-required\">*</span></ion-label>\n          <ion-select class=\"custom-select-css\" (ionChange)=\"resetSelectList(f,'studentId')\" placeholder=\"Select Student\" formControlName=\"studentId\">\n            <ion-select-option *ngFor=\"let item of studentDropdownList\" [value]=\"item.id\"> {{ item.value }}</ion-select-option>\n\n          </ion-select>\n        </div>\n       \n        <div *ngIf=\"submitted && f['studentId']?.errors\">\n          <ion-note *ngIf=\"f['studentId'].errors['required']\" slot=\"error\">Please select student.</ion-note>\n         </div>\n      </div>\n\n      <div class=\"form-control-wrapper\">\n        <div class=\"custom-input-css\">\n          <ion-label color=\"dark\" position=\"stacked\">Notice Title <span class=\"star-required\">*</span></ion-label>\n          <ion-input inputmode=\"text\" placeholder=\"Notice Title\" maxlength=\"1000\" formControlName=\"noticeTitle\"></ion-input>\n        </div>\n        <div *ngIf=\"submitted && f['noticeTitle']?.errors\">\n          <ion-note *ngIf=\"f['noticeTitle'].errors['required']\" slot=\"error\">Notice Title is required.</ion-note>\n         </div>\n      </div>\n\n      <div class=\"form-control-wrapper\">\n        <div class=\"custom-input-css\">\n          <ion-label color=\"dark\" position=\"stacked\">Start Date <span class=\"star-required\">*</span></ion-label>\n          \n          <ion-input id=\"open-modal-startDate\" \n          value=\"{{ getFormattedDate(f['startDate'].value) }}\" \n          inputmode=\"text\"\n            placeholder=\"DD-MM-YYYY\"></ion-input>\n          <ion-modal trigger=\"open-modal-startDate\" [cssClass]=\"'bottom-end'\" [keepContentsMounted]=\"true\"\n            [initialBreakpoint]=\"0.65\">\n            <ng-template>\n              <ion-datetime locale=\"en-IN\" displayFormat=\"DD-MM-YYYY\" formControlName=\"startDate\" presentation=\"date\" size=\"cover\"\n                 [showDefaultButtons]=\"true\"></ion-datetime>\n            </ng-template>\n          </ion-modal>\n        </div>\n        <div *ngIf=\"submitted && f['startDate']?.errors\">\n          <ion-note *ngIf=\"f['startDate'].errors['required']\" slot=\"error\">Start Date is required.</ion-note>\n         </div>\n      </div>\n\n      <div class=\"form-control-wrapper\">\n        <div class=\"custom-input-css\">\n          <ion-label color=\"dark\" position=\"stacked\">End Date <span class=\"star-required\">*</span></ion-label>\n          \n          <ion-input id=\"open-modal-endDate\" \n          value=\"{{ getFormattedDate(f['endDate'].value) }}\" \n          inputmode=\"text\"\n            placeholder=\"DD-MM-YYYY\"></ion-input>\n          <ion-modal trigger=\"open-modal-endDate\" [cssClass]=\"'bottom-end'\" [keepContentsMounted]=\"true\"\n            [initialBreakpoint]=\"0.65\">\n            <ng-template>\n              <ion-datetime locale=\"en-IN\" displayFormat=\"DD-MM-YYYY\" formControlName=\"endDate\" \n              presentation=\"date\" size=\"cover\"\n                 [showDefaultButtons]=\"true\"></ion-datetime>\n            </ng-template>\n          </ion-modal>\n        </div>\n        <div *ngIf=\"submitted && f['endDate']?.errors\">\n          <ion-note *ngIf=\"f['endDate'].errors['required']\" slot=\"error\">End Date is required.</ion-note>\n         </div>\n      </div>\n      <div class=\"form-control-wrapper\">\n        <div class=\"custom-input-css\">\n           <ion-checkbox formControlName=\"isPublished\" labelPlacement=\"end\">Is Publish</ion-checkbox>\n      </div>\n      </div>\n      <div class=\"form-control-wrapper\">\n        <div class=\"custom-input-css\">\n           <ion-checkbox formControlName=\"isImportant\" labelPlacement=\"end\">Is Important</ion-checkbox>\n      </div>\n      </div>\n\n             <!-- Notice Description Section -->\n             <div class=\"form-control-wrapper\">\n              <div class=\"custom-input-css\">\n                <ion-label position=\"stacked\" class=\"ion-lable-size\">Notice Description <span class=\"star-required\">*</span></ion-label>\n                <ckeditor [editor]=\"Editor\" formControlName=\"noticeDescription\"></ckeditor>\n              </div>\n              <div *ngIf=\"submitted && f['noticeDescription']?.errors\">\n                <ion-note *ngIf=\"f['noticeDescription'].errors['required']\" slot=\"error\">Notice Description is required.</ion-note>\n              </div>\n            </div>\n\n            <ion-button class=\"ion-button-small\" color=\"primary\" (click)=\"uploadFiles()\">\n              Upload Files\n            </ion-button>\n            <p class=\"black-text\">\n              (PDF, JPG, PNG, JPEG, BMP, XLSX, CSV, DOC, DOCX, TEXT, SVG, PPT,PPTX)\n            </p>\n            <div class=\"form-control uploaded-file-text\">\n              <span class=\"file-thumb\" *ngFor=\"let f of textfiles; let i = index\">\n                <img *ngIf=\"getFileExtension(f.name) === 'png'\" src=\"../../../../assets/img/img.png\"\n                  (click)=\"showFile(f)\" />\n                <img *ngIf=\"getFileExtension(f.name) === 'jpeg'\" src=\"../../../../assets/img/img.png\"\n                  (click)=\"showFile(f)\" />\n                <img *ngIf=\"getFileExtension(f.name) === 'jpg'\" src=\"../../../../assets/img/img.png\"\n                  (click)=\"showFile(f)\" />\n                <img *ngIf=\"getFileExtension(f.name) === 'pdf'\" src=\"../../../../assets/img/pdf.png\"\n                  (click)=\"showFile(f)\" />\n                <img *ngIf=\"getFileExtension(f.name) === 'docx'\" src=\"../../../../assets/img/docx-file.png\"\n                  (click)=\"showFile(f)\" />\n                <img *ngIf=\"getFileExtension(f.name) === 'xls'\" src=\"../../../../assets/img/xlsx.png.png\"\n                  (click)=\"showFile(f)\" />\n                <img *ngIf=\"getFileExtension(f.name) === 'pptx'\" src=\"../../../../assets/img/ppt.png\"\n                  (click)=\"showFile(f)\" />\n                <img *ngIf=\"getFileExtension(f.name) === 'txt'\" src=\"../../../../assets/img/txt.png\"\n                  (click)=\"showFile(f)\" />\n                <img *ngIf=\"getFileExtension(f.name) === 'svg'\" src=\"../../../../assets/img/img.png\"  \n                  (click)=\"showFile(f)\" />\n                <img *ngIf=\"getFileExtension(f.name) === 'csv'\" src=\"../../../../assets/img/csv.png\"\n                  (click)=\"showFile(f)\" />\n                <img *ngIf=\"getFileExtension(f.name) === 'bmp'\" src=\"../../../../assets/img/bmp.png\"\n                  (click)=\"showFile(f)\" />\n                <img *ngIf=\"getFileExtension(f.name) === 'xlsx'\" src=\"../../../../assets/img/xlsx.png\"\n                  (click)=\"showFile(f)\" />\n                <img *ngIf=\"getFileExtension(f.name) === 'doc'\" src=\"../../../../assets/img/doc.png\"\n                  (click)=\"showFile(f)\" />\n      \n                <!-- Add similar conditions for other file types -->\n                <span class=\"delete-file\" (click)=\"onTextFileRemove(i)\">\n                  <ion-icon name=\"trash-outline\"></ion-icon>\n                </span>\n              </span>\n            </div>\n      \n    \n  <!-- Video Text Section -->\n        <div class=\"videoText p-0\" formArrayName=\"videoText\">\n          <div class=\"mb-2\">\n            <ion-label position=\"stacked\" class=\"ion-lable-size black-text\">Upload Media File </ion-label>\n          </div>\n          <div *ngFor=\"let item of videoText; let i = index; let last = last; let first = first\">\n            <div [formGroupName]=\"i\" class=\"flex-wrap mb-3\">\n              <div class=\"w-100\">\n                <input type=\"text\" formControlName=\"contentUrl\" id=\"contentUrl_{{i}}\" class=\"form-control notice-video-input\"\n                           placeholder=\"Add Video Url\" maxlength=\"1000\"/>\n              </div>\n              <div class=\"d-flex align-items-center \">\n                <ion-button (click)=\"openLink(item.value.contentUrl)\" class=\"action-btn open-btn\" size=\"small\">\n                  Open Link\n                </ion-button>\n                <ion-button *ngIf=\"last\" (click)=\"addVideoText()\" class=\"action-btn add-btn\" size=\"small\" small>\n                  <ion-icon name=\"add-outline\" style=\"font-size: small\"></ion-icon>\n                </ion-button>\n                <ion-button *ngIf=\"videoText.length > 1\" (click)=\"removeVideotext(i)\" class=\"action-btn remove-btn\" size=\"small\"\n                            color=\"danger\" small>\n                  <ion-icon name=\"remove-outline\" style=\"font-size: small\"></ion-icon>\n                </ion-button>\n              </div>\n            </div>\n          </div>\n        </div>\n          \n  \n    </form>\n  </div>\n</ion-content>";

/***/ }),

/***/ 31473:
/*!**************************************************************************!*\
  !*** ./src/app/pages/teacherApp/notice/notice.component.html?ngResource ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-content class=\"light-content\" [fullscreen]=\"true\">\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"handleRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <div class=\"date-header mt-3\">\n        <div class=\"form-control-wrapper d-flex align-items-center justify-content-between\" style=\"gap: 1rem;\">\n        <label for=\"classSelect\" class=\"me-2 black-text\"><strong>Select Month</strong></label>\n        <div class=\"custom-input-css without-label custom-width\">\n          <ion-select class=\"custom-select-css\" [(ngModel)]=\"selectedMonth\" (ionChange)=\"onMonthChange($event)\">\n            <ion-select-option *ngFor=\"let month of months\" [value]=\"month.value\">{{month.text}}</ion-select-option>\n          </ion-select>\n        </div>\n        <div class=\"custom-input-css without-label custom-width\" style=\"flex: 1;\">\n          <ion-select class=\"custom-select-css\" placeholder=\"Sent/Received\" [(ngModel)]=\"noticeTypeId\"\n            (ionChange)=\"onSentReceiveChange($event)\">\n            <ion-select-option value=\"1\">Sent</ion-select-option>\n            <ion-select-option value=\"2\">Received</ion-select-option>\n          </ion-select>\n        </div>\n      </div>\n    </div>\n  <ng-container *ngIf=\"!content_loaded\">\n    <ion-list-header class=\"ion-list-header-small\">\n      <ion-label><ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text></ion-label>\n      <ion-note color=\"tertiary\" class=\"ion-note-small\">\n        <ion-skeleton-text animated style=\"width: 40px\"></ion-skeleton-text>\n      </ion-note>\n    </ion-list-header>\n\n    <ion-list class=\"list-custom animate__animated animate__fadeIn\" lines=\"full\">\n      <ion-item color=\"light\" button detail=\"false\" *ngFor=\"let i of [].constructor(12)\">\n        <ion-avatar slot=\"start\" class=\"ion-avatar-default-icon\">\n          <ion-skeleton-text animated></ion-skeleton-text>\n        </ion-avatar>\n        <ion-label>\n          <h3>\n            <ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text>\n          </h3>\n          <p>\n            <ion-skeleton-text animated style=\"width: 75%\"></ion-skeleton-text>\n          </p>\n        </ion-label>\n        <ion-skeleton-text slot=\"end\" animated style=\"width: 15%\"></ion-skeleton-text>\n      </ion-item>\n    </ion-list>\n  </ng-container>\n  <ng-container *ngIf=\"content_loaded\">\n    <ion-card-header class=\"date-header mt-2\">\n      <div class=\"form-control-wrapper\">\n       \n      </div>\n\n    </ion-card-header>\n\n    <ion-card class=\"card-new-one\" *ngFor=\"let notice of noticeList\">\n      <ion-card-header>\n        <ion-card-subtitle class=\"class\">{{noticeTypeId =='2'? teacherName: notice.noticeTo}}</ion-card-subtitle>\n      </ion-card-header>\n\n      \n      <div class=\"d-flex right-bg\">\n        <ion-icon class=\"exclamation-icon\" name=\"alert-circle\" *ngIf=\"notice.isImportant\"></ion-icon>\n        <p class=\"text-start\"[ngClass]=\"{'green-color':notice.isPublished != true}\">{{notice.noticeTitle}}</p>\n      </div>\n\n      <div class=\"new-actions\" *ngIf=\"noticeTypeId =='1'\">\n        <ion-fab>\n          <ion-fab-button>\n            <ion-icon name=\"ellipsis-vertical-outline\"></ion-icon>\n          </ion-fab-button>\n  \n          <ion-fab-list side=\"start\">\n            <ion-fab-button>\n              <ion-icon name=\"eye-outline\" (click)=\"openNoticeDetail(notice.noticeId)\" ></ion-icon>\n            </ion-fab-button>\n            <ion-fab-button>\n              <ion-icon name=\"create-sharp\" (click)=\"editNotice($event,notice)\"></ion-icon>\n            </ion-fab-button>\n            <ion-fab-button>\n              <ion-icon [name]=\"notice.isPublished ? 'notifications-outline' : 'notifications-off-outline'\" (click)=\"Publish($event,notice)\"></ion-icon>\n            </ion-fab-button>\n            <ion-fab-button>\n              <ion-icon name=\"trash-sharp\" (click)=\"Delete($event,notice)\"></ion-icon>\n            </ion-fab-button>\n          </ion-fab-list>\n        </ion-fab>\n      </div>\n\n      <!-- <ion-card-content>\n        <ion-card-subtitle class=\"title-footer\" *ngIf=\"noticeTypeId =='1'\">\n          <ion-fab-button>\n            <ion-icon name=\"create-sharp\" (click)=\"editNotice($event,notice)\"></ion-icon>\n          </ion-fab-button>\n          <ion-fab-button>\n            <ion-icon [name]=\"notice.isPublished ? 'checkmark-circle-outline' : 'globe'\" [color]=\"notice.isPublished ? 'success' : 'primary'\" (click)=\"Publish($event,notice)\"></ion-icon>\n          </ion-fab-button>\n          <ion-fab-button>\n            <ion-icon name=\"trash-sharp\" (click)=\"Delete($event,notice)\"></ion-icon>\n          </ion-fab-button>\n        </ion-card-subtitle>\n      </ion-card-content> -->\n    </ion-card>\n  </ng-container>\n\n\n\n  <ion-fab slot=\"fixed\" vertical=\"bottom\" horizontal=\"end\">\n    <ion-fab-button [disabled]=\"buttonDisabled\" (click)=\"filter()\">\n      <ion-icon name=\"add\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n</ion-content>\n\n";

/***/ }),

/***/ 23390:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/pages/teacherApp/notice/view-teacher-notice-file-detail/view-teacher-notice-file-detail.page.html?ngResource ***!
  \******************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header collapse=\"fade\" [translucent]=\"true\" class=\"modal-header\">\n  <ion-toolbar>\n   \n\n    <ion-title color=\"dark-color\" style=\"font-weight: bold;\">Notice Details</ion-title>\n      \n  \n    <ion-buttons slot=\"end\">\n      <ion-button color=\"primary\" fill=\"solid\" (click)=\"close()\">\n        Close\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n<ion-content class=\"ion-padding\">\n  <!-- <ion-card-subtitle class=\"message-from\">\n    <span class=\"bold-black-text\">Notice To : &nbsp;</span>\n    <ion-text>{{noticeDetails.noticeTo}}</ion-text>\n  </ion-card-subtitle>\n  <br> -->\n  <ion-card-subtitle class=\"message-from\">\n    <span class=\"bold-black-text\">Notice Title : &nbsp;</span>\n    <ion-text>{{noticeDetails.noticeTitle}}</ion-text>\n  </ion-card-subtitle>\n  <br>\n  <ion-card-subtitle class=\"message-from\">\n    <span class=\"bold-black-text\">Start Date : &nbsp;</span>\n    <ion-text>{{ noticeDetails.startDate.format('DD-MMM-YYYY') }}</ion-text>\n  </ion-card-subtitle>\n  <br>\n  <ion-card-subtitle class=\"message-from\">\n    <span class=\"bold-black-text\">End Date : &nbsp;</span>\n    <ion-text>{{ noticeDetails.endDate.format('DD-MMM-YYYY') }}</ion-text>\n  </ion-card-subtitle>\n  <br>\n  <ion-card-subtitle class=\"message-from\">\n    <span class=\"bold-black-text\">Important Notice: &nbsp;</span>\n    <ion-text>{{ noticeDetails.isImportant ? 'Yes' : 'No' }}</ion-text>\n    <ion-icon *ngIf=\"noticeDetails.isImportant\"></ion-icon>\n  </ion-card-subtitle>\n  <br>\n  <ion-card-subtitle class=\"message-from inline\"  >\n    <span class=\"bold-black-text\">Notice Description:&nbsp;</span>\n    <ion-text  [innerHTML]=\"noticeDetails.noticeDescription\"></ion-text>\n  </ion-card-subtitle>\n   <div class=\"download\">\n    <ion-card-subtitle class=\"message-from\" *ngIf=\"noticeDetails.noticeTextFileArray && noticeDetails.noticeTextFileArray.length > 0\">\n      <span class=\"bold-black-text\">Event Files Download : &nbsp; </span>\n    </ion-card-subtitle>\n    <div class=\"uploaded-file-text\">\n      <span class=\"file-thumb\" *ngFor=\"let f of noticeDetails.noticeTextFileArray; let i = index\">\n        <img *ngIf=\"getFileExtension(f.fileName) === 'png'\" src=\"../../../../assets/img/img.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'jpeg'\" src=\"../../../../assets/img/jpeg.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'jpg'\" src=\"../../../../assets/img/jpg-image.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'pdf'\" src=\"../../../../assets/img/pdf.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'doc'\" src=\"../../../../assets/img/doc.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'xls'\" src=\"../../../../assets/img/xlsx.png.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'pptx'\" src=\"../../../../assets/img/ppt.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'txt'\" src=\"../../../../assets/img/txt.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'svg'\" src=\"../../../../assets/img/svg.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'csv'\" src=\"../../../../assets/img/csv.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'bmp'\" src=\"../../../../assets/img/bmp.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n        <img *ngIf=\"getFileExtension(f.fileName) === 'xlsx'\" src=\"../../../../assets/img/xlsx.png\" class=\"thumbnail-icon\" (click)=\"showFile(f)\" />\n      </span>\n    </div>\n  </div>\n  <br>\n\n  <div class=\"download\" *ngIf=\"noticeDetails.videoText && hasNonEmptyVideoLinks()\">\n    <ion-card-subtitle class=\"message-from\">\n      <span class=\"bold-black-text\">Notice Media File Download: </span>\n    </ion-card-subtitle>\n    <div class=\"videoText video-link-wrap\">\n      <ul class=\"black-bullet\">\n        <li *ngFor=\"let f of noticeDetails.videoText; let i = index\">\n          <a [href]=\"f.contentUrl\" target=\"_blank\" id=\"contentUrl_{{i}}\">\n            {{ f.contentUrl }}\n          </a>\n        </li>\n      </ul>\n    </div>\n  </div>\n</ion-content>";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_teacherApp_notice_notice_module_ts.js.map