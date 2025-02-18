import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticesRoutingModule } from './notices-routing.module';
import { NoticesComponent } from './notices/notices.component';
import { AddEditNoticeComponent } from './add-edit-notice/add-edit-notice.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';
import { NgxDropzoneModule } from 'ngx-dropzone-compressing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewNoticeComponent } from './view-notice/view-notice.component';
// import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [NoticesComponent, AddEditNoticeComponent, ViewNoticeComponent],
  imports: [
    CommonModule,
    SharedModule,
    NoticesRoutingModule,
    FormsModule,
    NgbModule,
    NgbNavModule,
    LayoutModule,
    TranslateModule,
    NgxDropzoneModule,
    DataTablesModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    NgSelectModule,
  ],
})
export class NoticesModule {}
