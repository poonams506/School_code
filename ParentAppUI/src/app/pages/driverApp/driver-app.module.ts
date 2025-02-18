import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverAppRoutingModule } from './driver-app-routing.module';
import { ViewStudentInfoComponent } from './view-student-info/view-student-info.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ViewStudentInfoComponent],
  imports: [
    CommonModule,
    DriverAppRoutingModule,
    IonicModule,
  ]
})
export class DriverAppModule { }
