import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradeRoutingModule } from './grade-routing.module';
import { GradeListingComponent } from './grade-listing/grade-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { GradeDivisionMatrixComponent } from './grade-division-matrix/grade-division-matrix.component';  
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DataTablesModule } from 'angular-datatables';
import { AddEditGradeComponent } from './add-edit-grade/add-edit-grade.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    GradeListingComponent,
    GradeDivisionMatrixComponent,
    AddEditGradeComponent,
  ],
  imports: [
    CommonModule,
    GradeRoutingModule,
    FormsModule, 
   NgbModule,
   TranslateModule,
   NgxDropzoneModule,
   NgSelectModule,
   DataTablesModule,
   ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ]
})
export class GradeModule { }
