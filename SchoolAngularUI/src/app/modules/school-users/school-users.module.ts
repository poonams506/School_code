import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolUsersRoutingModule } from './school-users-routing.module';
import { SchoolUserListingComponent } from './school-user-listing/school-user-listing.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    SchoolUserListingComponent
  ],
  imports: [
    CommonModule,
    SchoolUsersRoutingModule,
    FormsModule, 
    NgbModule,
    NgbNavModule,
    LayoutModule,
    TranslateModule,
    NgxDropzoneModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ]
})
export class SchoolUsersModule { }
