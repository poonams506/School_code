import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ParentDashboardRoutingModule } from './parent-dashboard-routing.module';
import { ParentDashboardComponent } from './parent-dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { ViewParentSchoolEventDetailPage } from './view-parent-school-event-detail/view-parent-school-event-detail.page';

@NgModule({
  imports: [
    CommonModule,
    ParentDashboardRoutingModule,
    FormsModule,
    IonicModule,
    NgChartsModule,
    HighchartsChartModule
  ],
  declarations: [ParentDashboardComponent,ViewParentSchoolEventDetailPage],
})
export class ParentDashboardModule { }

