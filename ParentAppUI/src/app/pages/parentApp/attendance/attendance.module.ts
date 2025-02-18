import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgChartsModule } from 'ng2-charts';
import { AttendanceComponent } from './attendance.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    FormsModule,
    IonicModule,
    NgChartsModule,
    HighchartsChartModule
  ],
  declarations: [AttendanceComponent]

})
export class AttendanceModule { }
