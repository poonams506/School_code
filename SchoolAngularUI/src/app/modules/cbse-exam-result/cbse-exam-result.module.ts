import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CbseExamResultRoutingModule } from './cbse-exam-result-routing.module';
import { CbseExamResultComponent } from './cbse-exam-result/cbse-exam-result.component';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { TreeviewModule } from 'ngx-treeview';
import { AddCbseExamResultComponent } from './add-cbse-exam-result/add-cbse-exam-result.component';


@NgModule({
  declarations: [
    CbseExamResultComponent,
    AddCbseExamResultComponent
  ],
  imports: [
    CommonModule,
    CbseExamResultRoutingModule,
    FormsModule,
    NgbModule,
    TranslateModule,
    NgxDropzoneModule,
    NgSelectModule,
    DataTablesModule,
    NgbAccordionModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class CbseExamResultModule { }
