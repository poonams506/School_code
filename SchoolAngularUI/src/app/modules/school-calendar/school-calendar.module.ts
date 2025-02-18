import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgChartsModule } from 'ng2-charts';
import { NgxDropzoneModule } from 'ngx-dropzone-compressing';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { SchoolCalendarRoutingModule } from './school-calendar-routing.module';
import { SchoolCalendarComponent } from './school-calendar/school-calendar.component';
import { SchoolHolidayComponent } from './school-holiday/school-holiday.component';
import { AddEditSchoolHolidayComponent } from './add-edit-school-holiday/add-edit-school-holiday.component';
import { DataTablesModule } from 'angular-datatables';
import { SchoolEventComponent } from './school-event/school-event.component';
import { AddEditSchoolEventComponent } from './add-edit-school-event/add-edit-school-event.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddEditSchoolVacationComponent } from './add-edit-school-vacation/add-edit-school-vacation.component';


@NgModule({
  declarations: [
    SchoolCalendarComponent,
    SchoolHolidayComponent,
    AddEditSchoolHolidayComponent,
    SchoolEventComponent,
    AddEditSchoolEventComponent,
    AddEditSchoolVacationComponent
  ],
  imports: [
    CommonModule,
    SchoolCalendarRoutingModule,
    FormsModule, 
    NgbModule,
    NgbNavModule,
    LayoutModule,
    CKEditorModule,
    TranslateModule,
    DataTablesModule,
    NgxDropzoneModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
   NgChartsModule,
   NgSelectModule,
   DataTablesModule,
   CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory,
  }),
  ]
})
export class SchoolCalendarModule { }
