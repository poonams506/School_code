import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey/survey.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@angular/cdk/layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone-compressing';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddEditSurveyComponent } from './add-edit-survey/add-edit-survey.component';


@NgModule({
  declarations: [
    SurveyComponent,
    AddEditSurveyComponent
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
    NgbNavModule,
    LayoutModule,
    TranslateModule,
    NgxDropzoneModule,
    DataTablesModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    NgSelectModule,
  ]
})
export class SurveyModule { }
