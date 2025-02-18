import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { AcademicYear, AdhocFeePaymentHistorySelectDto, AdhocFeePaymentServiceProxy, MasterServiceProxy } from 'src/app/services/school-api-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';

@Component({
  selector: 'app-adhoc-view-history',
  templateUrl: './adhoc-view-history.component.html',
  styleUrls: ['./adhoc-view-history.component.scss']
})
export class AdhocViewHistoryComponent implements OnInit {

  modelRef:any;
  academicYearId:number;
  gradeId:number;
  divisionId:number;
  studentId:number;
  adhocFeePaymentId:number;
  basicInfo : AdhocFeePaymentHistorySelectDto =  new AdhocFeePaymentHistorySelectDto();
  academicYearDropdownList:AcademicYear[];
  totalFee : number = 0;
  particular = "";
  paymentDate : Date | undefined;
  chequeDate : Date | undefined;
  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private adhocFeePaymentService: AdhocFeePaymentServiceProxy,
    private masterService:MasterServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService
  ) { 
    
  }
  
  ngOnInit(): void {
     if(this.studentId && this.studentId>0 && this.academicYearId && this.academicYearId > 0 && this.adhocFeePaymentId > 0){
        this.adhocFeePaymentService.getAdhocFeePaymentHistorySelect(this.academicYearId,this.studentId,this.gradeId,this.divisionId,this.adhocFeePaymentId).
        subscribe((feePaymentDetail:AdhocFeePaymentHistorySelectDto)=>{
          this.basicInfo = feePaymentDetail;
          this.paymentDate = this.basicInfo.paymentDate?.toDate();
          this.chequeDate = this.basicInfo.chequeDate?.toDate();
          this.totalFee = feePaymentDetail.totalFee!;
          this.particular = feePaymentDetail.particular!;
        });
        this.getAcademicYearMasterData();
      }
  }

  getAcademicYearMasterData(){
    this.masterService.getAcademicYearData().subscribe(academicYear=>{
      this.academicYearDropdownList = academicYear.academicYears as AcademicYear[];
    })
  }

  getAcademicYearValue(){
    try {
    return this.academicYearDropdownList.filter(x=>x.academicYearId == this.academicYearId)[0].academicYearKey;
    } catch (e) {
     return '';
    }
  }
  close() {
      this.modelRef.close(false);
  }

}
