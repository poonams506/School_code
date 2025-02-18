import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CbseAcademicAssessmentReportRoutingModule } from './cbse-academic-assessment-report-routing.module';
import { AcademicAssessmentReportComponent } from './academic-assessment-report/academic-assessment-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@angular/cdk/layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    AcademicAssessmentReportComponent
  ],
  imports: [
    CommonModule,
    CbseAcademicAssessmentReportRoutingModule,
    FormsModule, 
   NgbModule,
   NgbNavModule,
   LayoutModule,
   TranslateModule,
   NgxDropzoneModule,
   DataTablesModule,
   ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
   SharedModule,
   NgxPrintModule
  ]
})
export class CbseAcademicAssessmentReportModule { }
