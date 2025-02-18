import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassTimetableRoutingModule } from './class-timetable-routing.module';
import { TimetableComponent } from './timetable/timetable.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { TeacherTimetableComponent } from './teacher-timetable/teacher-timetable.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { StudentTimetableComponent } from './student-timetable/student-timetable.component';
import { TimeTableGridComponent } from './time-table-grid/time-table-grid.component';
import { OnlyNumberDirective } from 'src/app/directives/numberOnly.directive';
import { ClassTimeTableErrorModalComponent } from './class-time-table-error-modal/class-time-table-error-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TimetableComponent,
    TeacherTimetableComponent,
    StudentTimetableComponent,
    TimeTableGridComponent,
    OnlyNumberDirective,
    ClassTimeTableErrorModalComponent
  ],
  imports: [
    CommonModule,
    ClassTimetableRoutingModule,
    FormsModule, 
    NgbModule,
    NgbNavModule,
    LayoutModule,
    TranslateModule,
    NgxDropzoneModule,
    DataTablesModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    NgSelectModule,
    NgxMaterialTimepickerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    SharedModule
    
  ]
})
export class ClassTimetableModule { }
