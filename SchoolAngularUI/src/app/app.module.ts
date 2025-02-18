
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';  
import { TranslateHttpLoader } from '@ngx-translate/http-loader';  
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'; 
import {DataTablesModule} from 'angular-datatables';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeService } from './services/theme-service.service';
import { HeaderComponent } from './shared/header/header.component'
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
// Import from library

import {
  AppearanceAnimation,
  ButtonLayoutDisplay,
  ButtonMaker,
  ConfirmBoxConfigModule,
  DialogConfigModule,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  NgxAwesomePopupModule,
  ToastNotificationConfigModule,
  ToastPositionEnum,

} from '@costlydeveloper/ngx-awesome-popup';
import { environment } from 'src/environments/environment';
import { API_PROVIDERS } from './api.providers';
import { UserService } from './services/user-service';
import { UnauthorizedInterceptor } from './interceptors/unauthorized-interceptor';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { LoaderInterceptor } from './interceptors/loader-interceptor';
import { LoaderService } from './services/loader-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { API_BASE_URL, CertificateServiceProxy } from './services/school-api-service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CommonMethodService } from './services/common-method-service';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { ParentMenuComponent } from './shared/parent-menu/parent-menu.component';
import { LocationService } from './services/location-service';
import { LocationInterceptor } from './interceptors/location-interceptor';
import { FileChunkService } from './services/file-chunk-service';
import { NgbDateCustomParserFormatter } from './shared/NgbCustomDateParserFormatter';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TwoDigitDecimalPositiveNumber } from './directives/TwoDigitDecimalPositiveNumber.directive';


  // AOT compilation support  
  export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
  } 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    AddDriverComponent,
    ParentMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    DataTablesModule,
    NgxAwesomePopupModule.forRoot(),
     NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    BrowserAnimationsModule,
   
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, './assets/i18n/', '.json');
        },
        deps: [HttpClient]
      }
    }),

    ToastNotificationConfigModule.forRoot({
      toastCoreConfig: {
        autoCloseDelay: 5000, // optional
        layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
        animationIn: AppearanceAnimation.SLIDE_IN_RIGHT, // optional
        animationOut: DisappearanceAnimation.SLIDE_OUT_RIGHT // optional
      }
   }),

   ConfirmBoxConfigModule.forRoot({
    confirmBoxCoreConfig: {
      layoutType: DialogLayoutDisplay.SUCCESS, 
      animationIn: AppearanceAnimation.BOUNCE_IN, 
      animationOut: DisappearanceAnimation.BOUNCE_OUT,
      allowHtmlMessage: true,
      buttonPosition: 'center', // optional 
      confirmLabel: 'Yes', // default confirmation button label
      declineLabel: 'No', // default declination button label
      disableIcon: false, // Disable icon by default
    },
 }),
 DialogConfigModule.forRoot({
  dialogCoreConfig: {
    width     : '500px',
    layoutType: DialogLayoutDisplay.SUCCESS, 
    animationIn: AppearanceAnimation.BOUNCE_IN, 
    animationOut: DisappearanceAnimation.BOUNCE_OUT,
    buttonPosition: 'center', // optional 
  },

})
  ],
  providers: [
    ThemeService,
    CertificateServiceProxy,
    UserService,
    LocationService,
    LoaderService,
    CommonMethodService,
    FileChunkService,
    
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LocationInterceptor, multi: true },
    { provide: API_BASE_URL, useValue:  environment.API_BASE_URL},
    {provide: NgbDateParserFormatter,
    useValue: new NgbDateCustomParserFormatter},
  API_PROVIDERS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
