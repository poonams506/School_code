import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersListingComponent } from './teachers-listing/teachers-listing.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
// import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxDropzoneModule } from 'ngx-dropzone-compressing';
import { TeacherGradeDivisionMappingComponent } from './teacher-grade-division-mapping/teacher-grade-division-mapping.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImportTeacherFileComponent } from './import-teacher-file/import-teacher-file.component';


@NgModule({
  declarations: [
    TeachersListingComponent,
    AddTeacherComponent,
    TeacherGradeDivisionMappingComponent,
    ImportTeacherFileComponent
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    FormsModule, 
   NgbModule,
   NgbNavModule,
   LayoutModule,
   TranslateModule,
   NgxDropzoneModule,
   DataTablesModule,
   NgSelectModule,
   ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ]
})
export class TeachersModule { }
