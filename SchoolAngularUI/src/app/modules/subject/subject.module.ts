import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SubjectMasterComponent } from './subject-master/subject-master.component';
import { AddEditSubjectMasterComponent } from './add-edit-subject-master/add-edit-subject-master.component';
import { SubjectMappingComponent } from './subject-mapping/subject-mapping.component';
import { TeacherSubjectMappingComponent } from './teacher-subject-mapping/teacher-subject-mapping.component';
import { ImportSubjectFileComponent } from './import-subject-file/import-subject-file.component';
import { AddEditSubjectMappingComponent } from './add-edit-subject-mapping/add-edit-subject-mapping.component';
import { SubjectMappingCloneComponent } from './subject-mapping-clone/subject-mapping-clone.component';


@NgModule({
  declarations: [
   SubjectMasterComponent,
   AddEditSubjectMasterComponent,
   SubjectMappingComponent,
   TeacherSubjectMappingComponent,
   ImportSubjectFileComponent,
   AddEditSubjectMappingComponent,
   SubjectMappingCloneComponent
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,
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
export class SubjectModule { }
