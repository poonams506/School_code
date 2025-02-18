import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbModule, NgbNavModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@angular/cdk/layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgChartsModule } from 'ng2-charts';
import { GoogleChartsModule } from 'angular-google-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { TeachingLoadAnalyserReportComponent } from './teaching-load-analyser-report/teaching-load-analyser-report.component';
import { ClassAttendanceMisssingReportComponent } from './class-attendance-misssing-report/class-attendance-misssing-report.component';
import { TeacherCountPerSubjectReportComponent } from './teacher-count-per-subject-report/teacher-count-per-subject-report.component';
import { TeacherAvailabilityComponent } from './teacher-availability/teacher-availability.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardClerkComponent } from './dashboard-clerk/dashboard-clerk.component';
import { DashboardTeacherComponent } from './dashboard-teacher/dashboard-teacher.component';
import { DashboardClassTeacherComponent } from './dashboard-class-teacher/dashboard-class-teacher.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TeachingLoadAnalyserReportComponent,
    ClassAttendanceMisssingReportComponent,
    TeacherCountPerSubjectReportComponent, 
    TeacherAvailabilityComponent, DashboardAdminComponent, DashboardClerkComponent, DashboardTeacherComponent, DashboardClassTeacherComponent  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule, 
    NgbModule,
    NgbNavModule,
    LayoutModule,
    TranslateModule,
    NgxDropzoneModule,
    NgbProgressbarModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    NgChartsModule,
    GoogleChartsModule,
    HighchartsChartModule,
    NgbCarouselModule,
    NgChartsModule
  ]
})
export class DashboardModule { }
