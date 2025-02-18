import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery/gallery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@angular/cdk/layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone-compressing';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddEditGalleryComponent } from './add-edit-gallery/add-edit-gallery.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GalleryComponent,
    AddEditGalleryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GalleryRoutingModule,
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
export class GalleryModule { }
