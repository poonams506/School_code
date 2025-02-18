import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeesRoutingModule } from './fees-routing.module';
import { IonicModule } from '@ionic/angular';
import { NgChartsModule } from 'ng2-charts';
import { FeesComponent } from './fees.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';
import { ViewFeeInfoDetailPage } from './fee-installment-info-details/view-fee-info-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FeesRoutingModule,
    FormsModule,
    IonicModule,
    NgChartsModule,
    HighchartsChartModule
  ],
  declarations: [FeesComponent,ViewFeeInfoDetailPage],
})
export class FeesModule { }
