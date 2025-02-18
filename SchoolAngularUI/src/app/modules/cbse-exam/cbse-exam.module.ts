import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CbseExamRoutingModule } from './cbse-exam-routing.module';
import { ExamMasterComponent } from './exam-master/exam-master.component';
import { AddEditExamMasterComponent } from './add-edit-exam-master/add-edit-exam-master.component';
import { ExamObjectComponent } from './exam-object/exam-object.component';
import { AddEditExamObjectComponent } from './add-edit-exam-object/add-edit-exam-object.component';
import { ClassExamMappingComponent } from './class-exam-mapping/class-exam-mapping.component';
import { AddEditClassExamMappingComponent } from './add-edit-class-exam-mapping/add-edit-class-exam-mapping.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { AddEditMarksGradeRelationComponent } from './add-edit-marks-grade-relation/add-edit-marks-grade-relation.component';
import { MarksGradeRelationComponent } from './marks-grade-relation/marks-grade-relation.component';
import { TreeviewModule } from '@zerot13/ngx-treeview';
import { AddEditExamReportcardTemplateComponent } from './add-edit-exam-reportcard-template/add-edit-exam-reportcard-template.component';
import { ExamReportcardTemplateComponent } from './exam-reportcard-template/exam-reportcard.component';


@NgModule({
  declarations: [
    ExamMasterComponent,
    AddEditExamMasterComponent,
    ExamObjectComponent,
    AddEditExamObjectComponent,
    ClassExamMappingComponent,
    AddEditClassExamMappingComponent,
    AddEditMarksGradeRelationComponent,
    MarksGradeRelationComponent,
    ExamReportcardTemplateComponent,
    AddEditExamReportcardTemplateComponent

  ],
  imports: [
    CommonModule,
    CbseExamRoutingModule,
    FormsModule,
    NgbModule,
    TranslateModule,
    NgxDropzoneModule,
    NgSelectModule,
    DataTablesModule,
    NgbAccordionModule,
    TreeviewModule.forRoot(),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class CbseExamModule { }
