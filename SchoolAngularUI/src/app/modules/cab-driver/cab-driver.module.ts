import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabDriverRoutingModule } from './cab-driver-routing.module';
import { CabDriverComponent } from './cab-driver/cab-driver.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
// import { NgxDropzoneModule } from 'ngx-dropzone';
import { DataTablesModule } from 'angular-datatables';
import { NgxDropzoneModule } from 'ngx-dropzone-compressing';


@NgModule({
  declarations: [
    CabDriverComponent,
    AddDriverComponent
  ],
  imports: [
    CommonModule,
    CabDriverRoutingModule,
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
export class CabDriverModule { }
