import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccessRoutingModule } from './user-access-routing.module';
import { UserAccessComponent } from './user-access/user-access.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    UserAccessComponent
  ],
  imports: [
    CommonModule,
    UserAccessRoutingModule,
    FormsModule, 
    NgbModule,
    NgbNavModule,
    LayoutModule,
    TranslateModule,
    NgxDropzoneModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ]
})
export class UserAccessModule { }
