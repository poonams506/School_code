import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClerkRoutingModule } from './clerk-routing.module';
import { ClerkComponent } from './clerk/clerk.component'
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
// import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddClerkComponent } from './add-clerk/add-clerk.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxDropzoneModule } from 'ngx-dropzone-compressing';


@NgModule({
  declarations: [
    ClerkComponent,
    AddClerkComponent
  ],
  imports: [
    CommonModule,
    ClerkRoutingModule,
    FormsModule, 
    NgbModule,
    NgbNavModule,
    LayoutModule,
    TranslateModule,
    NgxDropzoneModule,
    DataTablesModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ]
})
export class ClerkModule { }
