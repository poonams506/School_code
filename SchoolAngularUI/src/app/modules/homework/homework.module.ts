import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeworkRoutingModule } from './homework-routing.module';
import { HomeworkComponent } from './homework/homework.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';
// import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddEditHomeworkComponent } from './add-edit-homework/add-edit-homework.component';
import { NgxDropzoneModule } from 'ngx-dropzone-compressing';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ViewHomeworkComponent } from './view-homework/view-homework.component';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular/ckeditor.module';

@NgModule({
  declarations: [HomeworkComponent, AddEditHomeworkComponent, ViewHomeworkComponent],
  imports: [
    CommonModule,
    HomeworkRoutingModule,
    FormsModule,
    NgbModule,
    NgbNavModule,
    CKEditorModule,
    LayoutModule,
    TranslateModule,
    NgxDropzoneModule,
    DataTablesModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    NgSelectModule,
  ],
})
export class HomeworkModule {}
