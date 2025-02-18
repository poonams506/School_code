import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { AcademicYear, FeeParticularsSelectDto, FeePaymentHistorySelectDto, FeePaymentServiceProxy, MasterServiceProxy, TransportFeePaymentHistorySelectDto, TransportFeePaymentServiceProxy, TransportFeeSelectDto } from 'src/app/services/school-api-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';

@Component({
  selector: 'app-view-transport-history',
  templateUrl: './view-transport-history.component.html',
  styleUrls: ['./view-transport-history.component.scss']
})
export class ViewTransportHistoryComponent implements OnInit {

  modelRef:any;
  academicYearId:number;
  gradeId:number;
  divisionId:number;
  consumerId:number;
  roleId:number;
  transportFeePaymentId:number;
  transportConsumerStoppageMappingId:number;
  basicInfo : TransportFeePaymentHistorySelectDto =  new TransportFeePaymentHistorySelectDto();
  tableData : TransportFeeSelectDto[] = [];
  tableDataTotal : TransportFeeSelectDto[] = [];
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
    private feePaymentService:TransportFeePaymentServiceProxy,
    private masterService:MasterServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService
  ) { 
    
  }
  
  ngOnInit(): void {
    debugger;
     if(this.consumerId && this.consumerId>0 && this.academicYearId && this.academicYearId > 0 && this.transportFeePaymentId > 0){
        this.feePaymentService.getTransportFeePaymentHistorySelect(this.roleId, this.academicYearId,this.consumerId,this.transportFeePaymentId, this.transportConsumerStoppageMappingId).
        subscribe((feePaymentDetail:TransportFeePaymentHistorySelectDto)=>{
          this.basicInfo = feePaymentDetail;
          this.paymentDate = this.basicInfo.paymentDate?.toDate();
          this.chequeDate = this.basicInfo.chequeDate?.toDate();
          this.tableData = feePaymentDetail.transportFeeSelectList;
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
