import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PrintCommonHeaderComponent } from './print-common-header/print-common-header.component';
import { TranslateModule } from '@ngx-translate/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FeePendingDueByAcComponent } from './fee-pending-due-by-ac/fee-pending-due-by-ac.component';
import { TreeviewModule } from 'ngx-treeview';
import { TwoDigitDecimalPositiveNumber } from '../directives/TwoDigitDecimalPositiveNumber.directive';
import { TwoDigitDecimaNumberDirective } from '../directives/TwoDigitDecimaNumber.directive';
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CKEditorModule, 
    TranslateModule,
    FullCalendarModule,
  ],
  declarations: [ 
    PrintCommonHeaderComponent, FeePendingDueByAcComponent, 
    TwoDigitDecimalPositiveNumber,
    TwoDigitDecimaNumberDirective,
  ],

  exports: [
    CommonModule,
    CKEditorModule,
    TranslateModule,
    PrintCommonHeaderComponent,
    FeePendingDueByAcComponent,
    FullCalendarModule,
    TwoDigitDecimalPositiveNumber,
    TwoDigitDecimaNumberDirective,
  ]

})
export class SharedModule { }
