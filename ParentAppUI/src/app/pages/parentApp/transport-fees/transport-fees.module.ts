import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportFeesRoutingModule } from './transport-fees-routing.module';
import { TransportFeesComponent } from './transport-fees/transport-fees.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgChartsModule } from 'ng2-charts';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  imports: [
    CommonModule,
    TransportFeesRoutingModule,
    FormsModule,
    IonicModule,
    NgChartsModule,
    HighchartsChartModule
  ],
  declarations: [TransportFeesComponent],
})
export class TransportFeesModule { }
