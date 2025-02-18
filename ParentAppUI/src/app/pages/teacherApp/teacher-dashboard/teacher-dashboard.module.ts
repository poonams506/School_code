import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TeacherDashboardRoutingModule } from './teacher-dashboard-routing.module';
import { TeacherDashboardComponent } from './teacher-dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { ViewTeacherSchoolEventDetailComponent } from './view-teacher-school-event-detail/view-teacher-school-event-detail.component';

@NgModule({
  imports: [
    CommonModule,
    TeacherDashboardRoutingModule,
    FormsModule,
    IonicModule,
    NgChartsModule,
    HighchartsChartModule
  ],
  declarations: [TeacherDashboardComponent,ViewTeacherSchoolEventDetailComponent],
})
export class TeacherDashboardModule { }

