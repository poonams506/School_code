
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { AddEditStudentComponent } from './add-edit-student/add-edit-student.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';  
//import { NgxDropzoneModule } from 'ngx-dropzone';
import { DataTablesModule } from 'angular-datatables';
import { UpdateStudentResultsComponent } from './update-student-results/update-student-results.component';
import { MyStudentFilterPipe, PromoteStudentComponent } from './promote-student/promote-student.component';
import { ImportStudentsFileComponent } from './import-students-file/import-students-file.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { NgxDropzoneModule } from 'ngx-dropzone-compressing';
import { AddPromoteStudentComponent } from './add-promote-student/add-promote-student.component';
import { StudentReportComponent } from './student-report/student-report.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPrintModule } from 'ngx-print';
import { StudentEnquiryComponent } from './student-enquiry/student-enquiry.component';
import { AddEditStudentEnquiryComponent } from './add-edit-student-enquiry/add-edit-student-enquiry.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    StudentsRoutingModule,
   FormsModule, 
   NgbModule,
   NgbNavModule,
   LayoutModule,
   TranslateModule,
   NgxDropzoneModule,
   DataTablesModule,
   TranslateModule,
   NgSelectModule,
   NgxPrintModule,
   ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
   SharedModule
  ],
  declarations: [StudentsComponent, ViewStudentComponent,  AddEditStudentComponent, UpdateStudentResultsComponent, PromoteStudentComponent, ImportStudentsFileComponent, ErrorModalComponent, MyStudentFilterPipe, AddPromoteStudentComponent, StudentReportComponent, StudentEnquiryComponent, AddEditStudentEnquiryComponent]
})
export class StudentsModule { }

