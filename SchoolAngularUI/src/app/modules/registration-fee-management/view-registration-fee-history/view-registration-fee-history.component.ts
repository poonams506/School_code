  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { TranslateService } from '@ngx-translate/core';
  import * as moment from 'moment';
  import { AcademicYear, FeeParticularsSelectDto, FeePaymentHistorySelectDto, FeePaymentServiceProxy, MasterServiceProxy, RegistrationFeeParticularSelectDto, RegistrationFeePaymentHistorySelectDto, RegistrationFeePaymentServiceProxy } from 'src/app/services/school-api-service';
  import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
  
  @Component({
    selector: 'app-view-registration-fee-history',
    templateUrl: './view-registration-fee-history.component.html',
    styleUrls: ['./view-registration-fee-history.component.scss']
  })
  export class ViewRegistrationFeeHistoryComponent {
  
    modelRef:any;
    academicYearId:number;
    gradeId:number;
    divisionId:number;
    studentEnquiryId:number;
    registrationFeeId:number;
    basicInfo : RegistrationFeePaymentHistorySelectDto =  new RegistrationFeePaymentHistorySelectDto();
    tableData : RegistrationFeeParticularSelectDto[] = [];
    tableDataTotal : RegistrationFeeParticularSelectDto[] = [];
    academicYearDropdownList:AcademicYear[];
    totalFee : number = 0;
    feeAfterDiscount : number = 0;
    paidAmount : number = 0;
    dueAmount : number = 0;
    alreadyPaid : number = 0;
    paymentDate : Date | undefined;
    chequeDate : Date | undefined;
    constructor(
      public translate: TranslateService, 
      private formBuilder: FormBuilder, 
      private modalService: NgbModal,
      private registartionFeePaymentService:RegistrationFeePaymentServiceProxy,
      private masterService:MasterServiceProxy,
      public sharedPermissionServiceService : SharedPermissionServiceService
    ) { 
      
    }
    
    ngOnInit(): void {
      debugger;
       if(this.studentEnquiryId && this.studentEnquiryId>0 && this.academicYearId && this.academicYearId > 0 && this.registrationFeeId > 0){
          this.registartionFeePaymentService.getRegistrationFeePaymentHistorySelect(this.academicYearId,this.studentEnquiryId,this.registrationFeeId).
          subscribe((feePaymentDetail:RegistrationFeePaymentHistorySelectDto)=>{
            this.basicInfo = feePaymentDetail;
            this.paymentDate = this.basicInfo.paymentDate?.toDate();
            this.tableData = feePaymentDetail.feeParticularsSelectList.filter(x=>x.feeParticularId > 0);
            this.tableDataTotal = feePaymentDetail.feeParticularsSelectList.filter(x=>x.feeParticularId == 0 && (x.totalFee > 0 ));
            this.tableData.forEach((item)=>{
                this.totalFee += item.totalFee;
              });
            this.tableDataTotal.forEach((item)=>{
              this.totalFee += item.totalFee;
          });
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
  