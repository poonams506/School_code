import { Component } from '@angular/core';
import * as moment from 'moment';
import { FeeWaiverDto } from 'src/app/services/school-api-service';

@Component({
  selector: 'app-installment-details-popup',
  templateUrl: './installment-details-popup.component.html',
  styleUrls: ['./installment-details-popup.component.scss']
})
export class InstallmentDetailsPopupComponent {
  installmentDetails : FeeWaiverDto[];
  title : string;
  message : string;
  modelRef: any;
  close() {
    this.modelRef.close(false);
  }

  getFormattedDate(inputDate : any){
    if(inputDate)
    return moment(inputDate).format("DD/MM/yyyy");
    else
    return "-";
  }
}
