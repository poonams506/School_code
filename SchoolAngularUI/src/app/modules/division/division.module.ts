import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DivisionRoutingModule } from './division-routing.module';
import { DivisionListingComponent } from './division-listing/division-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DataTablesModule } from 'angular-datatables';
import { AddEditDivisionComponent } from './add-edit-division/add-edit-division.component';

@NgModule({
  declarations: [
    DivisionListingComponent,
    AddEditDivisionComponent
  ],
  imports: [
    CommonModule,
    DivisionRoutingModule,
    FormsModule, 
   ReactiveFormsModule, 
   NgbModule,
   NgxDropzoneModule,
   TranslateModule,
   DataTablesModule
  ]
})
export class DivisionModule { }
