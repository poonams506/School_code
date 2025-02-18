import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { AcademicYear, FeeParticularsSelectDto, FeePaymentHistorySelectDto, FeePaymentServiceProxy, MasterServiceProxy } from 'src/app/services/school-api-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss']
})
export class ViewHistoryComponent implements OnInit {

  modelRef:any;
  academicYearId:number;
  gradeId:number;
  divisionId:number;
  studentId:number;
  feePaymentId:number;
  basicInfo : FeePaymentHistorySelectDto =  new FeePaymentHistorySelectDto();
  tableData : FeeParticularsSelectDto[] = [];
  tableDataTotal : FeeParticularsSelectDto[] = [];
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
    private feePaymentService:FeePaymentServiceProxy,
    private masterService:MasterServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService
  ) { 
    
  }
  
  ngOnInit(): void {
     if(this.studentId && this.studentId>0 && this.academicYearId && this.academicYearId > 0 && this.feePaymentId > 0){
        this.feePaymentService.getFeePaymentHistorySelect(this.academicYearId,this.studentId,this.gradeId,this.divisionId,this.feePaymentId).
        subscribe((feePaymentDetail:FeePaymentHistorySelectDto)=>{
          this.basicInfo = feePaymentDetail;
          this.paymentDate = this.basicInfo.paymentDate?.toDate();
          this.chequeDate = this.basicInfo.chequeDate?.toDate();
          this.tableData = feePaymentDetail.feeParticularsSelectList.filter(x=>x.feeParticularId > 0);
          this.tableDataTotal = feePaymentDetail.feeParticularsSelectList.filter(x=>x.feeParticularId == 0 && (x.paidAmount > 0 || x.alreadyPaid > 0));
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
