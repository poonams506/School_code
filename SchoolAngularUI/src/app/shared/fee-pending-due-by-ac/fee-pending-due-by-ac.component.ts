import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatatableResponseModel, FeePaymentServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-fee-pending-due-by-ac',
  templateUrl: './fee-pending-due-by-ac.component.html',
  styleUrls: ['./fee-pending-due-by-ac.component.scss']
})
export class FeePendingDueByAcComponent {
  @Input() studentId: number;
  @Input() currentAcademicYearInclude : boolean;
  pendingDueDetails : any = [];
  constructor(
    public translate: TranslateService,
    private httpClient:HttpClient,
    private feePaymentService:FeePaymentServiceProxy,
    ) {  }  
    
  ngOnInit(): void {
    this.feePaymentService.getFeePaymentDueListByAY(this.studentId, this.currentAcademicYearInclude).subscribe((result:DatatableResponseModel|undefined)=>{
      this.pendingDueDetails = result?.data;
    });
  }
}
