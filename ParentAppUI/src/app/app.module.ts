import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';  
import { TranslateHttpLoader } from '@ngx-translate/http-loader';  
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'; 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
// ReactiveForms
import { ReactiveFormsModule } from '@angular/forms';

// NgCharts
import { NgChartsModule } from 'ng2-charts';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { environment } from 'src/environments/environment';
import { CommonMethodService } from './services/common-method-service';
import { FileChunkService } from './services/file-chunk-service';
import { LoaderService } from './services/loader-service';
import { LocationService } from './services/location-service';
import { API_BASE_URL } from './services/school-api-service';
import { UserService } from './services/user-service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { LoaderInterceptor } from './interceptors/loader-interceptor';
import { LocationInterceptor } from './interceptors/location-interceptor';
import { UnauthorizedInterceptor } from './interceptors/unauthorized-interceptor';
import { API_PROVIDERS } from './api.providers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeacherTabsPageModule } from './pages/teacherApp/tabs/teacher-tabs.module';
import { SharedModule } from './shared/shared.module';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { EmptyScreenComponent } from './pages/public/empty-screen/empty-screen.component';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent,EmptyScreenComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,
    NgChartsModule,
    NgIconComponent,
    NgIconsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TeacherTabsPageModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SharedModule
    
  ],
  exports:[SharedModule],
  providers: [{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy,
    
 },
 provideIcons({ featherAirplay }),
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
 API_PROVIDERS,
 LocationAccuracy,

],
  bootstrap: [AppComponent],
})
export class AppModule { }
