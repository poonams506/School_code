(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_parentApp_track-bus_track-bus_module_ts"],{

/***/ 43672:
/*!****************************************************************!*\
  !*** ./src/app/pages/parentApp/track-bus/map/map.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MapComponent: () => (/* binding */ MapComponent)
/* harmony export */ });
/* harmony import */ var _Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _map_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.component.html?ngResource */ 15856);
/* harmony import */ var _map_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map.component.scss?ngResource */ 65362);
/* harmony import */ var _map_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_map_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/school-api-service */ 37020);
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/user-service */ 4286);







let MapComponent = class MapComponent {
  constructor(parentAppService, userService) {
    this.parentAppService = parentAppService;
    this.userService = userService;
    // Coordinates for the bus route (start, stoppages, end)
    this.busRouteCoordinates = [];
    this.renderer = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_5__.Renderer2);
    this.noActiveTrip = false;
  }
  ngOnInit() {
    this.getData();
  }
  getData() {
    var _this = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.parentAppService.getVehicleTrackListSelect(_this.userService.CurrentSiblingId).subscribe(x => {
        if (x.vehicleTrackList && x.vehicleTrackList.length > 0) {
          _this.parentAppService.getStoppageTrackListSelect(_this.userService.CurrentSiblingId).subscribe( /*#__PURE__*/function () {
            var _ref = (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (x) {
              if (x.stoppageTrackList && x.stoppageTrackList.length > 1) {
                x.stoppageTrackList.forEach(element => {
                  _this.busRouteCoordinates.push({
                    lat: element.lat,
                    lng: element.lng
                  });
                });
                yield _this.loadMap();
                _this.trackBus();
              } else {
                _this.noActiveTrip = true;
              }
            });
            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }());
        } else {
          _this.noActiveTrip = true;
        }
      });
    })();
  }
  loadMap() {
    var _this2 = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        Map
      } = yield google.maps.importLibrary("maps");
      const mapEl = _this2.mapElementRef.nativeElement;
      const location = new google.maps.LatLng(_this2.busRouteCoordinates[0].lat, _this2.busRouteCoordinates[0].lng);
      _this2.map = new Map(mapEl, {
        center: location,
        zoom: 14,
        mapId: "4504f8b37365c3d0"
      });
      _this2.renderer.addClass(mapEl, 'visible');
      const markerIcon = document.createElement('img');
      markerIcon.src = 'assets/icons/bus.png';
      markerIcon.height = 50;
      markerIcon.width = 50;
      _this2.addMarker(location, markerIcon);
      _this2.directionsService = new google.maps.DirectionsService();
      _this2.directionsRenderer = new google.maps.DirectionsRenderer();
      _this2.directionsRenderer.setMap(_this2.map);
      _this2.trackBus(); //18.601468, 73.779327
      _this2.calculateAndDisplayRoute();
    })();
  }
  addMarker(location, markerIcon) {
    var _this3 = this;
    return (0,_Users_admin_Documents_schoolhub_asm_code_ParentAppUI_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        AdvancedMarkerElement,
        PinElement
      } = yield google.maps.importLibrary("marker");
      _this3.busMarker = new AdvancedMarkerElement({
        map: _this3.map,
        position: location,
        gmpDraggable: true,
        content: markerIcon,
        title: 'Bus'
      });
    })();
  }
  calculateAndDisplayRoute() {
    const waypoints = this.busRouteCoordinates.slice(1, -1).map(location => {
      return {
        location: new google.maps.LatLng(location.lat, location.lng),
        stopover: true
      };
    });
    this.directionsService.route({
      origin: new google.maps.LatLng(this.busRouteCoordinates[0].lat, this.busRouteCoordinates[0].lng),
      destination: new google.maps.LatLng(this.busRouteCoordinates[this.busRouteCoordinates.length - 1].lat, this.busRouteCoordinates[this.busRouteCoordinates.length - 1].lng),
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(response);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }
  trackBus() {
    // Simulating live updates - replace this with real data
    this.busInterval = setInterval(() => {
      // Fetch the new bus position from your backend (example is simulated)
      // Ensure the marker is defined before updating its position
      if (this.busMarker) {
        this.parentAppService.getVehicleTrackListSelect(this.userService.CurrentSiblingId).subscribe(x => {
          if (x.vehicleTrackList && x.vehicleTrackList.length > 0) {
            this.busMarker.position = new google.maps.LatLng(x.vehicleTrackList[0].lat, x.vehicleTrackList[0].lng);
            // Optionally, pan the map to the new position
            this.map.panTo(new google.maps.LatLng(x.vehicleTrackList[0].lat, x.vehicleTrackList[0].lng));
            this.noActiveTrip = false;
          } else {
            this.noActiveTrip = true;
          }
        });
      } else {
        console.error('Bus marker is not properly initialized');
      }
    }, 5000); // Update every 5 seconds
  }
  ionViewDidEnter() {
    this.clearAllMapRelatedObject();
    this.getData();
    this.trackBus();
  }
  ionicViewWillLeave() {
    this.clearAllMapRelatedObject();
  }
  ngOnDestroy() {
    this.clearAllMapRelatedObject();
  }
  clearAllMapRelatedObject() {
    if (this.map) {
      google.maps.event.clearInstanceListeners(this.map);
      this.map = null;
    }
    if (this.busInterval) {
      clearInterval(this.busInterval);
    }
  }
  static #_ = this.ctorParameters = () => [{
    type: src_app_services_school_api_service__WEBPACK_IMPORTED_MODULE_3__.ParentAppServiceProxy
  }, {
    type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__.UserService
  }];
  static #_2 = this.propDecorators = {
    mapElementRef: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ViewChild,
      args: ['map', {
        static: true
      }]
    }]
  };
};
MapComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  selector: 'app-map',
  template: _map_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_map_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], MapComponent);


/***/ }),

/***/ 84031:
/*!***********************************************************************!*\
  !*** ./src/app/pages/parentApp/track-bus/track-bus-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackBusRoutingModule: () => (/* binding */ TrackBusRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _track_bus_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./track-bus.component */ 29007);




const routes = [{
  path: '',
  component: _track_bus_component__WEBPACK_IMPORTED_MODULE_0__.TrackBusComponent
}];
let TrackBusRoutingModule = class TrackBusRoutingModule {};
TrackBusRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
})], TrackBusRoutingModule);


/***/ }),

/***/ 29007:
/*!******************************************************************!*\
  !*** ./src/app/pages/parentApp/track-bus/track-bus.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackBusComponent: () => (/* binding */ TrackBusComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _track_bus_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./track-bus.component.html?ngResource */ 60705);
/* harmony import */ var _track_bus_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./track-bus.component.scss?ngResource */ 54207);
/* harmony import */ var _track_bus_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_track_bus_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);




let TrackBusComponent = class TrackBusComponent {
  constructor() {}
  ngOnInit() {}
  ngAfterViewInit() {}
  static #_ = this.ctorParameters = () => [];
};
TrackBusComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
  selector: 'app-parents',
  template: _track_bus_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_track_bus_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], TrackBusComponent);


/***/ }),

/***/ 72718:
/*!***************************************************************!*\
  !*** ./src/app/pages/parentApp/track-bus/track-bus.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackBusModule: () => (/* binding */ TrackBusModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 24398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 37401);
/* harmony import */ var _track_bus_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./track-bus-routing.module */ 84031);
/* harmony import */ var _track_bus_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./track-bus.component */ 29007);
/* harmony import */ var _map_map_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map/map.component */ 43672);








let TrackBusModule = class TrackBusModule {};
TrackBusModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
  declarations: [_track_bus_component__WEBPACK_IMPORTED_MODULE_1__.TrackBusComponent, _map_map_component__WEBPACK_IMPORTED_MODULE_2__.MapComponent],
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _track_bus_routing_module__WEBPACK_IMPORTED_MODULE_0__.TrackBusRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule]
})], TrackBusModule);


/***/ }),

/***/ 65362:
/*!*****************************************************************************!*\
  !*** ./src/app/pages/parentApp/track-bus/map/map.component.scss?ngResource ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.map {
  height: 100%;
  width: 100%;
  background-color: transparent;
  opacity: 0;
  transition: opacity 150ms ease-in;
}

.map.visible {
  opacity: 1;
}

.no-active-bus {
  text-align: center;
  padding-top: 100px;
  color: black;
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/track-bus/map/map.component.scss"],"names":[],"mappings":"AAAA;EAEI,YAAA;EACA,WAAA;EACA,6BAAA;EACA,UAAA;EACA,iCAAA;AAAJ;;AAGE;EACE,UAAA;AAAJ;;AAGE;EACE,kBAAA;EAAoB,kBAAA;EAAoB,YAAA;AAE5C","sourcesContent":[".map {\n    // position: absolute;\n    height: 100%;\n    width: 100%;\n    background-color: transparent;\n    opacity: 0;\n    transition: opacity 150ms ease-in;\n  }\n  \n  .map.visible {\n    opacity: 1;\n  }\n\n  .no-active-bus{\n    text-align: center; padding-top: 100px; color: black;\n  }"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 54207:
/*!*******************************************************************************!*\
  !*** ./src/app/pages/parentApp/track-bus/track-bus.component.scss?ngResource ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `ion-list {
  padding-top: 0;
  background-color: #fff !important;
  --background: #fff !important;
  --border-radius: 0px !important;
  border-radius: 0px !important;
  border: 0 !important;
  --border:0 !important;
}

.form-default {
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
  font-size: 16px;
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
}`, "",{"version":3,"sources":["webpack://./src/app/pages/parentApp/track-bus/track-bus.component.scss"],"names":[],"mappings":"AACA;EACE,cAAA;EACA,iCAAA;EACA,6BAAA;EACA,+BAAA;EACA,6BAAA;EACA,oBAAA;EACA,qBAAA;AAAF;;AAGE;EACE,eAAA;AAAJ;AACI;EACE,oBAAA;EACA,kBAAA;EACA,kBAAA;EACA,oBAAA;EACA,sBAAA;EACA,iCAAA;EACA,6BAAA;EACA,uCAAA;EACA,qCAAA;EACA,mCAAA;EACA,sBAAA;EACA,oBAAA;EACA,4BAAA;AACN;AACM;EACE,uCAAA;AACR;AACM;EACE,iCAAA;EACA,sBAAA;EACA,6BAAA;EACA,8BAAA;EACA,0BAAA;EACA,sBAAA;AACR;AAAQ;EACE,8BAAA;EACA,UAAA;AAEV;AACM;EACE,mBAAA;EACA,sBAAA;EACA,qBAAA;AACR;AACM;EACE,iCAAA;EACA,uCAAA;EACA,qCAAA;EACA,mCAAA;EACA,sBAAA;EACA,6BAAA;EACA,8BAAA;EACA,kBAAA;EACA,0BAAA;AACR;AAAQ;EACE,4CAAA;AAEV;AACM;EACE,4CAAA;AACR;AAEQ;EACE,8BAAA;AAAV;AAKI;EACE,sCAAA;EAAA,iCAAA;AAHN;;AASE;EACE,WAAA;EACA,iBAAA;EACA,kBAAA;EACA,eAAA;EACA,YAAA;EACA,qBAAA;EACA,mBAAA;EACA,gBAAA;EACA,kBAAA;EAEA,iCAAA;EACA,mCAAA;EACA,oCAAA;EACE,aAAA;AAPN;;AAUE;EACE,WAAA;EACA,iBAAA;EACA,kBAAA;EACA,eAAA;EACA,YAAA;EACA,qBAAA;EACA,gBAAA;EACA,kBAAA;EAEA,uDAAA;EACE,2BAAA;AARN;;AAWE;EACE,gBAAA;EAEA,iCAAA;EACA,uCAAA;EACA,2BAAA;EACA,4BAAA;EAEA,WAAA;EACA,aAAA;EACA,uBAAA;EACA,sBAAA;EACA,mBAAA;EACA,YAAA;EACA,kBAAA;AAVJ;AAWI;EACE,yBAAA;EACA,eAAA;EACA,cAAA;AATN;AAWI;EACE,YAAA;EACA,aAAA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;EACA,sBAAA;EACA,sBAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;AATN;AAWM;EACE,WAAA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;AATR;;AAcE;EACE,mDAAA;AAXJ;;AAcA;EACE,qCAAA;EACA,eAAA;AAXF","sourcesContent":["\nion-list {\n  padding-top: 0;\n  background-color: #fff !important;\n  --background: #fff !important;\n  --border-radius: 0px !important;\n  border-radius: 0px !important;\n  border: 0 !important;\n  --border:0 !important;\n}\n  \n  .form-default {\n    margin-top: 0px;\n    ion-item {\n      --border-radius: 0px;\n      border-radius: 0px;\n      margin-bottom: 0px;\n      --padding-start: 0px;\n      --inner-padding-end: 0;\n      background-color: #fff !important;\n      --background: #fff !important;\n      --background-activated: #fff !important;\n      --background-focused: #fff !important;\n      --background-hover: #fff !important;\n      --border: 0 !important;\n      border: 0 !important;\n      --highlight: #fff !important;\n  \n      &.item-interactive.ion-valid {\n        --highlight-background: #fff !important;\n      }\n      ion-input {\n        background-color: #fff !important;\n        border: 1px solid #ccc;\n        padding-left: 10px !important;\n        border-radius: 40px !important;\n        font-size: 13px !important;\n        color: #000 !important;\n        &.input-disabled {\n          background: #ededf0 !important;\n          opacity: 1;\n        }\n      }\n      ion-label {\n        margin-bottom: 10px;\n        color: #000 !important;\n        opacity: 1 !important;\n      }\n      ion-select {\n        background-color: #fff !important;\n        --background-activated: #fff !important;\n        --background-focused: #fff !important;\n        --background-hover: #fff !important;\n        border: 1px solid #ccc;\n        padding-left: 10px !important;\n        border-radius: 40px !important;\n        min-height: 41.6px;\n        font-size: 13px !important;\n        .select-icon {\n          transform: translate3d(0, 0px, 0) !important;\n        }\n      }\n      ion-select::part(icon) {\n        transform: translate3d(0, 0px, 0) !important;\n      }\n      &.item-interactive-disabled {\n        ion-input {\n          background: #ededf0 !important;\n        }\n      }\n    }\n   \n    .label-floating {\n      max-width: fit-content !important;\n    }\n  }\n\n\n  \n  .ion-button-small {\n    width: 100%;\n    padding-left: 0px;\n    padding-right: 0px;\n    font-size: 16px;\n    height: 40px;\n    --border-radius: 50px;\n    border-radius: 50px;\n    margin-top: 15px;\n    --box-shadow: none;\n    //--background: var(--orange-bg-color);\n    border: 1px solid #fff !important;\n    --border: 1px solid #fff !important;\n    --background: transparent !important;\n      --color: #fff;\n  }\n  \n  .submit-form-btn {\n    width: 100%;\n    padding-left: 0px;\n    padding-right: 0px;\n    font-size: 16px;\n    height: 40px;\n    --border-radius: 50px;\n    margin-top: 15px;\n    --box-shadow: none;\n    //--background: var(--orange-bg-color);\n    --background: linear-gradient(135deg, #da8e63, #c754aa);\n      --color: var(--white-color);\n  }\n  \n  .profile-card {\n    border-radius: 0;\n    // background: linear-gradient(135deg, var(--ion-color-dark), var(--ion-color-primary));\n    background: var(--white-bg-color);\n    background-image: url(\"../../../../assets/img/profile-bg.png\");\n    background-position: center;\n    background-repeat: no-repeat;\n    //height: 165px;\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    flex-direction: column;\n    align-items: center;\n    padding: 0px;\n    text-align: center;\n    h1 {\n      color: var(--black-color);\n      font-size: 16px;\n      margin: 10px 0;\n    }\n    .profile-photos {\n      width: 128px;\n      height: 128px;\n      border-radius: 50%;\n      text-align: center;\n      margin: 0 auto 10px;\n      background-color: #fff;\n      border: 1px solid #fff;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n  \n      img {\n        width: 100%;\n        max-width: 100%;\n        max-height: 100%;\n        border-radius: 50%;\n      }\n    }\n  }\n  \n  ion-toolbar {\n    background-color: var(--ion-color-primary-contrast);\n  }\n  \n.custom-error{\n  color: var(--highlight-color-invalid);\n  font-size: 12px;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 15856:
/*!*****************************************************************************!*\
  !*** ./src/app/pages/parentApp/track-bus/map/map.component.html?ngResource ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div [hidden]=\"noActiveTrip\" class=\"map\" #map></div>\n<div class=\"no-active-bus\" [hidden]=\"!noActiveTrip\"><b>There is no active trip, we will notify you once there is any active trip.</b></div>";

/***/ }),

/***/ 60705:
/*!*******************************************************************************!*\
  !*** ./src/app/pages/parentApp/track-bus/track-bus.component.html?ngResource ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header>\n    <ion-toolbar>\n      <ion-title>\n        Track School Bus\n      </ion-title>\n    </ion-toolbar>\n  </ion-header>\n  \n  <ion-content>\n   <app-map></app-map>\n  </ion-content>\n  ";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_parentApp_track-bus_track-bus_module_ts.js.map