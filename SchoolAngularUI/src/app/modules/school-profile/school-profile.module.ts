import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';  
//import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxDropzoneModule } from 'ngx-dropzone-compressing';

import { SchoolProfileRoutingModule } from './school-profile-routing.module';
import { SchoolProfileComponent } from './school-profile.component';

@NgModule({
  declarations: [
    SchoolProfileComponent
  ],
  imports: [
    CommonModule,
    SchoolProfileRoutingModule,
    NgbModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    TranslateModule,
    NgxDropzoneModule,
  ]
})
export class SchoolProfileModule { }
