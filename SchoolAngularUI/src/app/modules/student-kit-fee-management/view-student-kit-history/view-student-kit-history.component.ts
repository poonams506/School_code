import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { AcademicYear, MasterServiceProxy, StudentKitFeeParticularsSelectDto, StudentKitFeePaymentServiceProxy, StudentKitFeepaymentHistorySelectDto } from 'src/app/services/school-api-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';

@Component({
  selector: 'app-view-student-kit-history',
  templateUrl: './view-student-kit-history.component.html',
  styleUrls: ['./view-student-kit-history.component.scss']
})
export class ViewStudentKitHistoryComponent implements OnInit {

  modelRef:any;
  academicYearId:number;
  gradeId:number;
  divisionId:number;
  studentId:number;
  studentKitFeePaymentId:number;
  basicInfo : StudentKitFeepaymentHistorySelectDto =  new StudentKitFeepaymentHistorySelectDto();
  tableData : StudentKitFeeParticularsSelectDto[] = [];
  tableDataTotal : StudentKitFeeParticularsSelectDto[] = [];
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
    private feePaymentService:StudentKitFeePaymentServiceProxy,
    private masterService:MasterServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService
  ) { 
    
  }
  
  ngOnInit(): void {
     if(this.studentId && this.studentId>0 && this.academicYearId && this.academicYearId > 0 && this.studentKitFeePaymentId > 0){
        this.feePaymentService.getStudentKitFeePaymentHistorySelect(this.academicYearId,this.studentId,this.gradeId,this.divisionId,this.studentKitFeePaymentId).
        subscribe((feePaymentDetail:StudentKitFeepaymentHistorySelectDto)=>{
          this.basicInfo = feePaymentDetail;
          this.paymentDate = this.basicInfo.paymentDate?.toDate();
          this.chequeDate = this.basicInfo.chequeDate?.toDate();
          this.tableData = feePaymentDetail.studentKitFeeParticularsSelectList.filter(x=>x.feeParticularId > 0);
          this.tableDataTotal = feePaymentDetail.studentKitFeeParticularsSelectList.filter(x=>x.feeParticularId == 0 && (x.paidAmount > 0 || x.alreadyPaid > 0));
          this.tableData.forEach((item)=>{
              this.totalFee += item.totalFee;
              this.feeAfterDiscount += item.feeAfterDiscount;
              this.paidAmount += item.paidAmount;
              this.dueAmount += item.dueAmount;
              this.alreadyPaid += item.alreadyPaid;
          });
          this.tableDataTotal.forEach((item)=>{
            this.totalFee += item.totalFee;
            this.feeAfterDiscount += item.feeAfterDiscount;
            this.paidAmount += item.paidAmount;
            this.dueAmount += item.dueAmount;
            this.alreadyPaid += item.alreadyPaid;
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
