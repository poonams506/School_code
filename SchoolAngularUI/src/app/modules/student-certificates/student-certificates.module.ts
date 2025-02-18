import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentCertificatesRoutingModule } from './student-certificates-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { LeavingCertificateComponent } from './leaving-certificate/leaving-certificate.component';
import { CharacterCertificateComponent } from './character-certificate/character-certificate.component';
import { BonafiedCertificateComponent } from './bonafied-certificate/bonafied-certificate.component';
import { IdCardComponent } from './id-card/id-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorModalPopupComponent } from './error-modal-popup/error-modal-popup.component';
import { NgxPrintModule } from 'ngx-print';
import { BonafiedReasonPopupComponent } from './bonafied-certificate/bonafied-reason-popup/bonafied-reason-popup.component';
import { ViewHistoryLeavingcertificateComponent } from './leaving-certificate/view-history-leavingcertificate/view-history-leavingcertificate.component';


@NgModule({
  declarations: [
    LeavingCertificateComponent,
    CharacterCertificateComponent,
    BonafiedCertificateComponent,
    IdCardComponent,
    ErrorModalPopupComponent,
    BonafiedReasonPopupComponent,
    ViewHistoryLeavingcertificateComponent
  ],
  imports: [
    CommonModule,
    StudentCertificatesRoutingModule,
    FormsModule, 
   NgbModule,
   NgbNavModule,
   LayoutModule,
   TranslateModule,
   NgxDropzoneModule,
   DataTablesModule,
   ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
   SharedModule,
   NgxPrintModule
  ]
})
export class StudentCertificatesModule { }
