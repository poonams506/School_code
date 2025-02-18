import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance/attendance.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ClassAttendanceStatusComponent } from './class-attendance-status/class-attendance-status.component';
import { AddEditBulkAtteandanceComponent } from './add-edit-bulk-atteandance/add-edit-bulk-atteandance.component';



@NgModule({
  declarations: [
    AttendanceComponent,
    ClassAttendanceStatusComponent,
    AddEditBulkAtteandanceComponent
  
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    FormsModule, 
    NgbModule,
    NgbNavModule,
    LayoutModule,
    TranslateModule,
    NgxDropzoneModule,
    DataTablesModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    NgSelectModule
  ]
})
export class AttendanceModule { }
