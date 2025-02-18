import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme-service.service';
//import { MustMatch } from '../directives/must-match.directive'
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AcademicYear, AvailFeeWavierDiscByInstallmentDto, AvailFeeWavierDiscDto, FeePaymentAppliedWavierMappingTypeUpsertDto, FeePaymentDetailTypeUpsertDto, FeePaymentParticulars, FeePaymentSelectDto, FeePaymentServiceProxy, FeePaymentUpsertDto, FeeWaiverDto, MasterServiceProxy, PaymentFeePageMasterActivityList, SchoolNgbDateModel } from 'src/app/services/school-api-service';
import * as CryptoJS from 'crypto-js/'; 
import { forEach } from 'jszip';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmBoxInitializer, DialogLayoutDisplay, ToastEvokeService, ToastNotificationInitializer, ToastPositionEnum, ToastUserViewTypeEnum } from '@costlydeveloper/ngx-awesome-popup';
import * as moment from 'moment';
import * as _ from 'lodash';
import { InstallmentDetailsPopupComponent } from '../installment-details-popup/installment-details-popup.component';
@Component({
  selector: 'app-fee-payment',
  templateUrl: './fee-payment.component.html',
  styleUrls: ['./fee-payment.component.scss']
})


export class FeePaymentComponent implements OnInit {
  active = 1;
  model: NgbDateStruct;
  paymentSummaryForm: FormGroup;
  submitted = false;
  studentId : number;
  academicYearId : number;
  gradeId : number;
  divisionId : number;
  fetchedInfo : FeePaymentSelectDto = new FeePaymentSelectDto();
  feePaymentParticularsCloned  : FeePaymentParticulars[] = [];
  discountMaterInfo : AvailFeeWavierDiscDto[]=[];
  availFeeWavierDiscByInstallments : AvailFeeWavierDiscByInstallmentDto[]=[];
  availFeeWavierDiscByInstallmentsCloned : AvailFeeWavierDiscByInstallmentDto[]=[];
  usedInstallmentList : number[] = [];
  academicYearDropdownList:AcademicYear[];
  dueAmount : number;
  totalFee : number;
  showAddnDisc : boolean = false;
  appliedDiscId : number = 0;
  appliedFeeWavierTypeId : number = 0;
  installmentTotalFee = 0;
  installmentDiscountInPercent = 0;
  additionalRemark : string;
  additionalAmount : number;
  isAddionalDiscApplied : boolean = false;
  feePaymentUpsertDto : FeePaymentUpsertDto = new FeePaymentUpsertDto();
  totalRowDto : FeePaymentParticulars = new FeePaymentParticulars();
  numberOfInstallment : number = 1;
  currentOfInstallment : number = 1;
  paySubmitted = false;
  skipDiscount = false;
  feeWavierTypesInstallmentsDetailsId : number = 0;
  installmentDetails : FeeWaiverDto[]=[];
  isEditfee:Boolean=false;
  
  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private themeService: ThemeService,
    private httpClient:HttpClient,
    private router:Router,
    private route: ActivatedRoute,
    private feePaymentService:FeePaymentServiceProxy,
    private masterService:MasterServiceProxy,
    private toastEvokeService: ToastEvokeService,
    private modalService1: NgbModal,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data:any) =>{
      const queryParamValue = data.studentRouteParameter; 
      if(queryParamValue){
        let decryptedString=CryptoJS.AES.decrypt(queryParamValue,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
        let decryptedValues = JSON.parse(decryptedString) as any;
        this.studentId = decryptedValues.studentId as number;
        this.academicYearId = decryptedValues.academicYearId as number;
        this.gradeId = decryptedValues.gradeId as number;
        this.divisionId = decryptedValues.divisionId as number;
        this.dueAmount = decryptedValues.dueAmount as number;
        this.getAcademicYearMasterData();
        this.getPaymentFeePageMasterActivityList();
        let paymentDate = new SchoolNgbDateModel();
        paymentDate.day = new Date().getDate();
        paymentDate.month = new Date().getMonth() + 1;
        paymentDate.year = new Date().getFullYear();
        this.feePaymentUpsertDto.ngbOnlineTransactionDateTime = paymentDate;
      }
    });
    
  }

  getDiscToolTip(disc : any){
    var appliedFeeParticularWavierMappingId = 0;
    if(this.discountMaterInfo.filter(x=>x.appliedFeeParticularWavierMappingId > 0) && 
    this.discountMaterInfo.filter(x=>x.appliedFeeParticularWavierMappingId > 0).length > 0){
      appliedFeeParticularWavierMappingId = this.discountMaterInfo.filter(x=>x.appliedFeeParticularWavierMappingId > 0)[0].appliedFeeParticularWavierMappingId;
    }
   if(appliedFeeParticularWavierMappingId > 0 && appliedFeeParticularWavierMappingId != disc.feeParticularWavierMappingId){
    return "Payment term & discount already applied";
   }
   else if(this.appliedDiscId > 0 && this.appliedDiscId != disc.feeParticularWavierMappingId){
    return "Payment term & discount already applied";
   }
   else if((appliedFeeParticularWavierMappingId != 0 && this.appliedDiscId != 0) &&
    !this.checkDate(this.installmentDetails.filter(x=>x.feeWavierTypeId == disc.feeWavierTypeId)[0]))
    {
     return "Payment term & discount validity expired";
    }
   else if(this.fetchedInfo.paymentInstallmentDone >= 1 && appliedFeeParticularWavierMappingId == 0){
    return "Payment term & discount not applied";
   }
   else if(this.fetchedInfo.paymentInstallmentDone >= 1 && appliedFeeParticularWavierMappingId == 0 && !this.checkDate(this.installmentDetails.filter(x=>x.feeWavierTypeId == disc.feeWavierTypeId)[0])){
    return "Payment term & discount validity expired";
   }
   else if(this.fetchedInfo.paymentInstallmentDone < 1 && 
    !this.checkDate(this.installmentDetails.filter(x=>x.feeWavierTypeId == disc.feeWavierTypeId)[0]))
    {
     return "Payment term & discount validity expired";
    }
   else{
    return "";
   }
  }

  getInstallmentToolTip(feeWavierTypeId : number, feeWavierDisplayName : string){
    const modalRef = this.modalService1.open(InstallmentDetailsPopupComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.installmentDetails=this.installmentDetails.filter(x=>x.feeWavierTypeId == feeWavierTypeId);
    modalRef.componentInstance.message = 'Below are the installment details.';
    modalRef.componentInstance.title = feeWavierDisplayName + ' - ' + 'Installment Details';
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result==true)
      {
      }
  });
  }

  getFormattedDate(inputDate : any){
        if(inputDate)
        return moment(inputDate).format("DD/MM/yyyy");
        else
        return "-";
  }

  getAcademicYearMasterData(){
    this.masterService.getAcademicYearData().subscribe(academicYear=>{
      this.academicYearDropdownList = academicYear.academicYears as AcademicYear[];
    })
  }

  getAcademicYearValue(){
    return this.academicYearDropdownList.filter(x=>x.academicYearId == this.academicYearId)[0].academicYearKey;
  }

  getStudentFeePayment(){
    if(this.studentId && this.studentId>0 && this.academicYearId && this.academicYearId > 0){
      this.feePaymentService.getFeePaymentSelect(this.academicYearId, this.studentId, this.gradeId, this.divisionId).
      subscribe((feePaymentDetail:FeePaymentSelectDto)=>{
       // this.paymentSummaryForm.patchValue(feePaymentDetail);
        this.fetchedInfo = feePaymentDetail;
        this.usedInstallmentList = feePaymentDetail.usedInstallmentList;
        this.discountMaterInfo.forEach((item)=>{
          for (let index = 0; index < this.fetchedInfo.feePaymentDiscountList.length; index++) {
            const element = this.fetchedInfo.feePaymentDiscountList[index];
            if(item.feeParticularWavierMappingId == element.feeParticularWavierMappingId){
              item.appliedFeeParticularWavierMappingId = element.feeParticularWavierMappingId;
              this.appliedFeeWavierTypeId = item.feeWavierTypeId;
              //this.installmentTotalFee = item.totalFee / item.numberOfInstallments;
              this.installmentTotalFee = item.totalFee
              this.installmentDiscountInPercent = item?.discountInPercent!;
              this.availFeeWavierDiscByInstallments = this.availFeeWavierDiscByInstallmentsCloned.filter(x=>x.feeWavierTypeId == item.feeWavierTypeId);
            }
          }
        });
        this.calculateParticularFeeGrid();
      });
    }
  }

  calculateParticularFeeGrid(){
    this.dueAmount = 0;
    this.fetchedInfo.feePaymentParticularsList.forEach((item)=>{
      if(true){
        debugger;
        let processedFeeAfterDiscount = item.totalFee;
        for (let index = 0; index < this.fetchedInfo.feePaymentDiscountList.length; index++) {
          const element = this.fetchedInfo.feePaymentDiscountList[index];
          if(this.discountMaterInfo && this.discountMaterInfo.length > 0){
            let elementDiscountMaster = this.discountMaterInfo.find(x=>x.feeParticularWavierMappingId == element.feeParticularWavierMappingId);
            if(this.checkDate(elementDiscountMaster)){
              if(elementDiscountMaster != null && elementDiscountMaster != undefined && elementDiscountMaster?.discountInPercent >= 0 && item.isDiscountApplicable){
                processedFeeAfterDiscount = processedFeeAfterDiscount - ((item.totalFee * elementDiscountMaster?.discountInPercent! / 100));
                processedFeeAfterDiscount = processedFeeAfterDiscount + ((((item.totalFee * elementDiscountMaster?.discountInPercent! / 100)) / elementDiscountMaster?.numberOfInstallments!) * this.fetchedInfo.skipDiscountCount);
              }
              else if(elementDiscountMaster != null)
              {
                processedFeeAfterDiscount = processedFeeAfterDiscount;
              }
              this.numberOfInstallment = elementDiscountMaster?.numberOfInstallments!;
              this.currentOfInstallment = (this.fetchedInfo.paymentInstallmentDone + 1) <= elementDiscountMaster?.numberOfInstallments! ? (this.fetchedInfo.paymentInstallmentDone + 1) : elementDiscountMaster?.numberOfInstallments!;
            }
            else 
            {
              if(elementDiscountMaster != null && elementDiscountMaster != undefined && elementDiscountMaster?.discountInPercent >= 0 && item.isDiscountApplicable){
              processedFeeAfterDiscount = processedFeeAfterDiscount - ((item.totalFee * elementDiscountMaster?.discountInPercent! / 100)) + 
                                          ((item.totalFee * elementDiscountMaster?.discountInPercent! / 100)) / elementDiscountMaster?.numberOfInstallments!;
              processedFeeAfterDiscount = processedFeeAfterDiscount + ((((item.totalFee * elementDiscountMaster?.discountInPercent! / 100)) / elementDiscountMaster?.numberOfInstallments!) * this.fetchedInfo.skipDiscountCount)
                if(!this.checkDate(elementDiscountMaster)){
                  this.skipDiscount = true;
                } 
              }
              else if(elementDiscountMaster != null)
              {
                processedFeeAfterDiscount = processedFeeAfterDiscount;
              }
              this.numberOfInstallment = elementDiscountMaster?.numberOfInstallments!;
              this.currentOfInstallment = (this.fetchedInfo.paymentInstallmentDone + 1) <= elementDiscountMaster?.numberOfInstallments! ? (this.fetchedInfo.paymentInstallmentDone + 1) : elementDiscountMaster?.numberOfInstallments!;
            }
            
          }
        }
        if(this.fetchedInfo.feePaymentDiscountList.length == 0){
          item.feeAfterDiscount = item.totalFee - item.additionalDiscAmount;
          if(item.feeParticularId > 0)
          {
            item.dueAmount = item.feeAfterDiscount - item.alreadyPaid;
            item.paybleFee = item.feeAfterDiscount - item.alreadyPaid;
            this.dueAmount += item.paybleFee;
          }
        }
        else{
          item.feeAfterDiscount = processedFeeAfterDiscount - item.additionalDiscAmount;
          item.dueAmount = item.feeAfterDiscount - item.alreadyPaid;
          if(this.skipDiscount){
            item.paybleFee = item.totalFee / (this.numberOfInstallment);
          }
          else{
            item.paybleFee = item.dueAmount / (this.numberOfInstallment - this.currentOfInstallment + 1);
          }
          this.dueAmount += item.paybleFee;
        }
      }
    });
    this.fetchedInfo.feePaymentParticularsList = this.fetchedInfo.feePaymentParticularsList.sort((r,t) => r.feeParticularId - t.feeParticularId)
    this.roundUpAmounts();
  }

  checkDate(addDisc : any){
      let result;
      if(addDisc == null || addDisc == undefined || addDisc.discountEndDate == null || addDisc.discountEndDate == undefined || addDisc.discountEndDate == "")
      {
        result = true;
        return result;
      }
      const firstYear = moment(addDisc.discountEndDate).year();
      const firstMonth = moment(addDisc.discountEndDate).month();
      const firstDay = moment(addDisc.discountEndDate).date();
      const secondYear = new Date().getFullYear();
      const secondMonth = new Date().getMonth();
      const secondDay = new Date().getDate();

      // Compare both date components

      
      switch (true) {
        case firstYear === secondYear && firstMonth === secondMonth && firstDay === secondDay:
          result = true;
          break;
        case firstYear < secondYear || (firstYear === secondYear && firstMonth < secondMonth) || (firstYear === secondYear && firstMonth === secondMonth && firstDay < secondDay):
          result = false;
          break;
        default:
          result = true;
      }
      return result;
    
  }
  
  applyWaiverTypeDisc(addDisc : any){
    this.dueAmount = 0;
    this.removeAdditionalDisc();
    this.appliedDiscId = addDisc.feeParticularWavierMappingId;
    this.appliedFeeWavierTypeId = addDisc.feeWavierTypeId;
    this.availFeeWavierDiscByInstallments = this.availFeeWavierDiscByInstallmentsCloned.filter(x=>x.feeWavierTypeId == addDisc.feeWavierTypeId);
    this.feeWavierTypesInstallmentsDetailsId = this.availFeeWavierDiscByInstallmentsCloned.filter(x=>x.feeWavierTypeId == addDisc.feeWavierTypeId && x.installmentNumber == 1)[0].feeWavierTypesInstallmentsDetailsId!;
    let addDiscInstallmentObj = this.availFeeWavierDiscByInstallmentsCloned.filter(x=>x.feeWavierTypeId == addDisc.feeWavierTypeId && x.installmentNumber == 1)[0];
    this.installmentTotalFee = 0;
    this.installmentDiscountInPercent = 0;
    this.fetchedInfo.feePaymentParticularsList.forEach((item)=>{
      this.installmentTotalFee = this.installmentTotalFee + item.totalFee;
      let paybleFeeAfterDiscount = item.totalFee;
      let processedFeeAfterDiscount = item.totalFee;
      debugger;
      if(item.isDiscountApplicable == true && this.checkDate(addDiscInstallmentObj)){
        if(this.discountMaterInfo && this.discountMaterInfo.length > 0){
          let elementDiscountMaster = this.discountMaterInfo.find(x=>x.feeParticularWavierMappingId == addDisc.feeParticularWavierMappingId);
          if(elementDiscountMaster != null && elementDiscountMaster != undefined && elementDiscountMaster?.discountInPercent >= 0){
            paybleFeeAfterDiscount = (item.totalFee / elementDiscountMaster?.numberOfInstallments!) - ((item.totalFee * elementDiscountMaster?.discountInPercent! / 100) / elementDiscountMaster?.numberOfInstallments!);
            processedFeeAfterDiscount = (item.totalFee) - ((item.totalFee * elementDiscountMaster?.discountInPercent! / 100));
            this.installmentDiscountInPercent = elementDiscountMaster?.discountInPercent!;
          }
          this.numberOfInstallment = elementDiscountMaster?.numberOfInstallments!;
          this.currentOfInstallment = (this.fetchedInfo.paymentInstallmentDone + 1) <= elementDiscountMaster?.numberOfInstallments! ? (this.fetchedInfo.paymentInstallmentDone + 1) : elementDiscountMaster?.numberOfInstallments!;
        }
      }
      else
      {
        if(this.discountMaterInfo && this.discountMaterInfo.length > 0){
          let elementDiscountMaster = this.discountMaterInfo.find(x=>x.feeParticularWavierMappingId == addDisc.feeParticularWavierMappingId);
          if(elementDiscountMaster != null && elementDiscountMaster != undefined){
            paybleFeeAfterDiscount = (item.totalFee / elementDiscountMaster?.numberOfInstallments!);
            processedFeeAfterDiscount = (item.totalFee);
          }
          this.numberOfInstallment = elementDiscountMaster?.numberOfInstallments!;
          this.currentOfInstallment = (this.fetchedInfo.paymentInstallmentDone + 1) <= elementDiscountMaster?.numberOfInstallments! ? (this.fetchedInfo.paymentInstallmentDone + 1) : elementDiscountMaster?.numberOfInstallments!;
        }
        if(!this.checkDate(addDiscInstallmentObj)){
          this.skipDiscount = true;
        }
      }
        item.feeAfterDiscount = processedFeeAfterDiscount;
        item.dueAmount = item.feeAfterDiscount - item.alreadyPaid;
        item.paybleFee = paybleFeeAfterDiscount;
        this.dueAmount += item.paybleFee;
    });
    //this.installmentTotalFee = this.installmentTotalFee / this.numberOfInstallment;
    this.roundUpAmounts();
  }

  removeWaiverTypeDisc(addDisc : any){
    this.appliedDiscId = 0;
    this.appliedFeeWavierTypeId = 0;
    this.installmentTotalFee = 0;
    this.installmentDiscountInPercent = 0;
    this.feeWavierTypesInstallmentsDetailsId = 0;
    this.numberOfInstallment = 1;
    this.currentOfInstallment = this.numberOfInstallment;
    this.removeAdditionalDisc();
    this.calculateParticularFeeGrid();
  }

  applyAdditionalDisc(){
    if(!this.additionalAmount || this.additionalAmount == null || this.additionalAmount == undefined || this.additionalAmount == 0){
      const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle(this.translate.instant('WARNING'));
        newToastNotification.setConfig({
          toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
          layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
       });
        newToastNotification.setMessage(this.translate.instant('Discount Amount is required'));
        newToastNotification.openToastNotification$();
      return;
    }
    else if(!this.additionalRemark || this.additionalRemark == null || this.additionalRemark == undefined
       || (this.additionalRemark && this.additionalRemark.trim() == '')){
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle(this.translate.instant('WARNING'));
        newToastNotification.setConfig({
          toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
          layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
       });
        newToastNotification.setMessage(this.translate.instant('Remark is required'));
        newToastNotification.openToastNotification$();
      return;
    }
    else{
      if(this.additionalAmount > this.dueAmount){
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle(this.translate.instant('WARNING'));
        newToastNotification.setConfig({
          toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
          layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
       });
        newToastNotification.setMessage(this.translate.instant('ADDITION_DISCOUNT_SHOULD_NOT_GREATER_THAN_DUE_AMOUNT'));
        newToastNotification.openToastNotification$();
         return;
      }
    }
    this.resetAdditionalDisc();
    this.isAddionalDiscApplied = true;
    this.feePaymentParticularsCloned = _.cloneDeep(this.fetchedInfo.feePaymentParticularsList);
    let discountedAmtList = this.fetchedInfo.feePaymentParticularsList.filter(x=>x.feeParticularId > 0)
        let sum = 0;
        for(let i = 0; i < discountedAmtList.length; i++) {
          sum += discountedAmtList[i].paybleFee;
        }
    this.fetchedInfo.feePaymentParticularsList.forEach((item)=>{
      if(item.feeParticularId > 0){
        item.additionalDiscInPercentage = item.paybleFee / sum;
        item.feeAfterDiscount = item.feeAfterDiscount - (this.additionalAmount * item.additionalDiscInPercentage);
        item.dueAmount = item.dueAmount - (this.additionalAmount * item.additionalDiscInPercentage);
        item.paybleFee = item.paybleFee - (this.additionalAmount * item.additionalDiscInPercentage);
        item.additionalDiscAmount = (this.additionalAmount * item.additionalDiscInPercentage);
      }
    });
    this.roundUpAmounts();
  }

  removeAdditionalDisc(){
    if(this.isAddionalDiscApplied == true && this.feePaymentParticularsCloned.length > 0){
      this.isAddionalDiscApplied = false;
      // this.fetchedInfo.feePaymentParticularsList.forEach((item)=>{
      //   if(item.feeParticularId > 0){
      //     let discountedAmount = this.additionalAmount * item.additionalDiscInPercentage;
      //     item.feeAfterDiscount = item.feeAfterDiscount + discountedAmount;
      //     item.dueAmount = item.dueAmount + discountedAmount;
      //     if(this.skipDiscount){
      //       item.paybleFee = item.totalFee / (this.numberOfInstallment);
      //     }
      //     else{
      //       item.paybleFee = item.dueAmount / (this.numberOfInstallment - this.currentOfInstallment + 1);
      //     }
      //     item.additionalDiscInPercentage = 1;
      //     item.additionalDiscAmount = 0;
      //   }
      // });
      this.fetchedInfo.feePaymentParticularsList = this.feePaymentParticularsCloned;
      this.feePaymentParticularsCloned = [];
    }
    this.additionalRemark = "";
    this.additionalAmount = 0;
    this.roundUpAmounts();
  }

  resetAdditionalDisc(){
      if(this.appliedDiscId == 0 || this.appliedDiscId == null || this.appliedDiscId == undefined)
      {
        this.calculateParticularFeeGrid();
      }
  }

  roundUpAmounts(){
    this.fetchedInfo.feePaymentParticularsList.forEach((item)=>{
      if(item.feeParticularId > 0){
        // item.feeAfterDiscount = parseFloat((item.feeAfterDiscount).toFixed(2));
        // item.dueAmount = parseFloat((item.dueAmount).toFixed(2));
        // item.paybleFee = parseFloat((item.paybleFee).toFixed(2));
        // item.alreadyPaid = parseFloat((item.alreadyPaid).toFixed(2));
        // this.dueAmount = parseFloat((this.dueAmount).toFixed(2));
        this.dueAmount = parseFloat((this.dueAmount).toFixed(2));
      }
    });
  }

   disabledAllTheDiscOptions(){
    let result = false;
    var list = this.fetchedInfo.feePaymentParticularsList.filter(x=>x.alreadyPaid > 0);
    if(list && list != null && list != undefined && list.length > 0){
      result = true;
    }
    if(this.fetchedInfo.paymentInstallmentDone > 0){
      result = true;
    }
    return result;
  }

  disabledManuallyPayFeeTextBoxes(){
    let result = false;
    var list = this.discountMaterInfo.filter(x=>x.appliedFeeParticularWavierMappingId > 0);
    if(list && list != null && list != undefined && list.length > 0){
      result = true;
    }
    if(this.appliedDiscId > 0 || this.isAddionalDiscApplied || this.getTotalRow().dueAmount < 1){
      result = true;
    }
    return result;
  }

  getPaymentFeePageMasterActivityList(){
    if(this.gradeId && this.gradeId > 0 && this.divisionId && this.divisionId > 0 && this.academicYearId && this.academicYearId > 0 &&
      this.studentId > 0){
      this.feePaymentService.getPaymentFeePageMasterActivityList(this.gradeId,this.divisionId,this.academicYearId, this.studentId).
      subscribe((feePaymentDetail:PaymentFeePageMasterActivityList)=>{
        this.discountMaterInfo = feePaymentDetail.availFeeWavierDiscList;
        this.availFeeWavierDiscByInstallments = feePaymentDetail.availFeeWavierDiscByInstallments;
        this.availFeeWavierDiscByInstallmentsCloned = feePaymentDetail.availFeeWavierDiscByInstallments;
        this.totalFee = feePaymentDetail.totalFee;
        this.installmentDetails = feePaymentDetail.installmentDetails!;
        this.getStudentFeePayment();
      });
    }
  }

  getTotalRow(){
    this.totalRowDto.particularName = "Total";
    this.totalRowDto.totalFee = 0;
    this.totalRowDto.feeAfterDiscount = 0;
    this.totalRowDto.paybleFee = 0;
    this.totalRowDto.dueAmount = 0;
    this.totalRowDto.alreadyPaid = 0;
    this.fetchedInfo.feePaymentParticularsList.forEach((item)=>{
      if(item.feeParticularId > 0){
        if(item.totalFee != 0)
        this.totalRowDto.totalFee += parseFloat(item.totalFee.toString());
        if(item.feeAfterDiscount != 0)
        this.totalRowDto.feeAfterDiscount += parseFloat(item.feeAfterDiscount.toString());
        if(item.paybleFee != 0)
        this.totalRowDto.paybleFee += parseFloat(item.paybleFee.toString());
        if(item.dueAmount != 0)
        this.totalRowDto.dueAmount += parseFloat(item.dueAmount.toString());
        if(item.alreadyPaid != 0)
        this.totalRowDto.alreadyPaid += parseFloat(item.alreadyPaid.toString());
      }
      
    });
    // this.totalRowDto.feeAfterDiscount = Math.round((this.totalRowDto.feeAfterDiscount));
    // this.totalRowDto.dueAmount = Math.round((this.totalRowDto.dueAmount));
    // this.totalRowDto.paybleFee = Math.round((this.totalRowDto.paybleFee));
    // this.totalRowDto.alreadyPaid = Math.round((this.totalRowDto.alreadyPaid));
    // this.totalRowDto.feeAfterDiscount = ((this.totalRowDto.feeAfterDiscount));
    // this.totalRowDto.dueAmount = ((this.totalRowDto.dueAmount));
    // this.totalRowDto.paybleFee = ((this.totalRowDto.paybleFee));
    // this.totalRowDto.alreadyPaid = ((this.totalRowDto.alreadyPaid));
    return this.totalRowDto;
  }

  pay(){
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('DO_YOU_WANT_TO_SAVE_THIS_PAYMENT')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      this.paySubmitted = true;
      if(!this.validate()){
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle(this.translate.instant('WARNING'));
        newToastNotification.setConfig({
          toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
          layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
       });
        newToastNotification.setMessage(this.translate.instant('PLEASE_ENTER_REQUIRED_DATA'));
        newToastNotification.openToastNotification$();
         return;
      }
      if(this.getTotalRow().paybleFee < 1 && this.additionalAmount < 1){
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle(this.translate.instant('WARNING'));
        newToastNotification.setConfig({
          toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
          layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
       });
       newToastNotification.setMessage(this.translate.instant('PAYBLE_AMOUNT_SHOULD_NOT_GREATER_THAN_ZERO'));
       newToastNotification.openToastNotification$();
        return;
      }


      this.feePaymentUpsertDto.academicYearId = this.academicYearId;
      this.feePaymentUpsertDto.gradeId = this.gradeId;
      this.feePaymentUpsertDto.divisionId = this.divisionId;
      this.feePaymentUpsertDto.studentId = this.studentId;
      this.feePaymentUpsertDto.paidAmount = this.getTotalRow().paybleFee;
      this.feePaymentUpsertDto.paymentTypeId = this.active;
      if(this.isAddionalDiscApplied){
        this.feePaymentUpsertDto.additionalDiscountedRemark = this.additionalRemark;
        this.feePaymentUpsertDto.additionalDiscountedAmount = this.additionalAmount;
        this.feePaymentUpsertDto.installmentPaybleFee = this.dueAmount;
      }
      else{
        this.feePaymentUpsertDto.additionalDiscountedRemark = '';
        this.feePaymentUpsertDto.additionalDiscountedAmount = 0;
        this.feePaymentUpsertDto.installmentPaybleFee = 0;
      }
      this.feePaymentUpsertDto.skipDiscount = this.skipDiscount;
      if(this.skipDiscount == true){
        this.feeWavierTypesInstallmentsDetailsId = 0;
      }
      this.feePaymentUpsertDto.feeWavierTypesInstallmentsDetailsId = this.feeWavierTypesInstallmentsDetailsId;
      if(this.appliedDiscId > 0){
        let feePaymentAppliedWavierMappingTypeUpsertDtoArray : FeePaymentAppliedWavierMappingTypeUpsertDto[]=[];
        let feePaymentAppliedWavierMappingTypeUpsertDto = new FeePaymentAppliedWavierMappingTypeUpsertDto();
        feePaymentAppliedWavierMappingTypeUpsertDto.discountedPercent = this.discountMaterInfo.find(x=>x.feeParticularWavierMappingId == this.appliedDiscId)?.discountInPercent! / 100;
        feePaymentAppliedWavierMappingTypeUpsertDto.feeParticularWavierMappingId = this.appliedDiscId;
        feePaymentAppliedWavierMappingTypeUpsertDto.discountedAmount = this.discountMaterInfo.find(x=>x.feeParticularWavierMappingId == this.appliedDiscId)?.applicableFee!;
        feePaymentAppliedWavierMappingTypeUpsertDtoArray.push(feePaymentAppliedWavierMappingTypeUpsertDto);
        this.feePaymentUpsertDto.feePaymentAppliedWavierMappingTypeUpsertDtoList = feePaymentAppliedWavierMappingTypeUpsertDtoArray;
      }
     
  
    let feePaymentParticularsArray : FeePaymentDetailTypeUpsertDto[]=[];
     this.fetchedInfo.feePaymentParticularsList.forEach((item)=>{
      let feePaymentParticularsDto = new FeePaymentDetailTypeUpsertDto();
      feePaymentParticularsDto.feeParticularId = item.feeParticularId;
      feePaymentParticularsDto.paidAmount = item.paybleFee;
      feePaymentParticularsDto.feeAfterDiscount = item.feeAfterDiscount;
      if(this.isAddionalDiscApplied){
        feePaymentParticularsDto.additionalDiscAmount = item.additionalDiscAmount;
        feePaymentParticularsDto.additionalDiscInPercentage = item.additionalDiscInPercentage;
      }
      else{
        feePaymentParticularsDto.additionalDiscAmount = 0;
        feePaymentParticularsDto.additionalDiscInPercentage = 0;
      }
      
      feePaymentParticularsArray.push(feePaymentParticularsDto);
      this.feePaymentUpsertDto.feePaymentDetailTypeUpsertDtoList = feePaymentParticularsArray;
     });
     this.feePaymentUpsertDto.ngbOnlineTransactionDateTime = new SchoolNgbDateModel(this.feePaymentUpsertDto.ngbOnlineTransactionDateTime);
     this.feePaymentUpsertDto.ngbChequeDate = new SchoolNgbDateModel(this.feePaymentUpsertDto.ngbChequeDate);
     let encryptedString =CryptoJS.AES.encrypt(JSON.stringify(
      this.feePaymentUpsertDto), environment.ENCRYPTION_PASSWORD,).toString();
      this.feePaymentService.feePaymentUpsert(encryptedString, this.feePaymentUpsertDto).subscribe((success)=>{
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setConfig({
          toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
        });
        newToastNotification.setTitle(this.translate.instant('SUCCESS'));
        newToastNotification.setMessage(this.translate.instant('FEE_PAYMENT_SAVED'));
        newToastNotification.openToastNotification$();
        this.router.navigate(['fee-management/view-payment']);
      });
     }
    });


  }

  validate(){
    let result = true;
    this.fetchedInfo.feePaymentParticularsList.forEach((item)=>{
      if(item.feeParticularId > 0 && (item.paybleFee == null || item.paybleFee == undefined)){
        result = false;
      }
     });
     switch(this.active){
      case 1 : {
        if(!this.feePaymentUpsertDto.ngbOnlineTransactionDateTime){
          result = false; 
         }
         break;
      }
      case 2:
      case 3:{
        if(!this.feePaymentUpsertDto.chequeNumber || !this.feePaymentUpsertDto.ngbOnlineTransactionDateTime ||
          !this.feePaymentUpsertDto.ngbChequeDate || !this.feePaymentUpsertDto.chequeBank ||
          !this.feePaymentUpsertDto.ngbChequeDate){
          result = false; 
         }
         break;
      }
      case 4:
      case 5:
      case 6:{
        if(!this.feePaymentUpsertDto.ngbOnlineTransactionDateTime || !this.feePaymentUpsertDto.onlineTransactionId){
          result = false; 
         }
         break;
      }
      default:
         break;
     }
    return result;
  }

  // convenience getter for easy access to form fields
  //get f() { return this.paymentSummaryForm.controls; }
  

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      // if (this.paymentSummaryForm.invalid) {
      //     return;
      // }

      // display form values on success
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.paymentSummaryForm.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      //this.paymentSummaryForm.reset();
  }

  removeAddnDisc(){
    if(this.additionalAmount >0){
      this.showAddnDisc = false;
      this.removeAdditionalDisc();
    }
    else{
      this.showAddnDisc = false;
    }
  }
  addAddnDisc(){
    this.showAddnDisc = true;
  }

  getInstallmentApplicableFee(disc : AvailFeeWavierDiscByInstallmentDto){
    var status = this.getInstallmentStatus(disc);
    if(status == "Expired"){
      return this.installmentTotalFee / this.numberOfInstallment;
    }
    else
    {
      //return (this.installmentTotalFee - (this.installmentTotalFee * this.installmentDiscountInPercent / 100))/this.numberOfInstallment;
      let applicableFee = 0;
      if(this.discountMaterInfo.filter(x=>x.appliedFeeParticularWavierMappingId == x.feeParticularWavierMappingId) &&
      this.discountMaterInfo.filter(x=>x.appliedFeeParticularWavierMappingId == x.feeParticularWavierMappingId).length > 0 &&
      this.discountMaterInfo.filter(x=>x.appliedFeeParticularWavierMappingId == x.feeParticularWavierMappingId)[0] &&
      this.discountMaterInfo.filter(x=>x.appliedFeeParticularWavierMappingId == x.feeParticularWavierMappingId)[0].applicableFee)
      {
        applicableFee = this.discountMaterInfo.filter(x=>x.appliedFeeParticularWavierMappingId == x.feeParticularWavierMappingId)[0].applicableFee;
      }
      else
      {
        applicableFee = this.discountMaterInfo.filter(x=>x.feeParticularWavierMappingId == this.appliedDiscId)[0].applicableFee;
      }
      return applicableFee / this.numberOfInstallment;
    }
  }

  getInstallmentStatus(disc : AvailFeeWavierDiscByInstallmentDto){
    var status = "";
     if(this.usedInstallmentList && this.usedInstallmentList.filter(x=> disc.feeWavierTypesInstallmentsDetailsId) &&
      this.usedInstallmentList.filter(x=> x == disc.feeWavierTypesInstallmentsDetailsId).length > 0){
        status = 'Applied';
      }
      else
      {
        if(disc.installmentNumber == this.currentOfInstallment && this.checkDate(disc)){
          status = "Selected";
          this.feeWavierTypesInstallmentsDetailsId = disc.feeWavierTypesInstallmentsDetailsId!;
        }
        else if(this.checkDate(disc)){
          status = "Apply";
        }
        else if(!this.checkDate(disc)){
          status = "Expired";
        }
      }
      
      return status;
  }
  UpdatePendingFee(){
    debugger;
    if (this.isEditfee) {
      this.feePaymentService.feePaymentPreviousAYPedingFeeUpdate( this.studentId, this.fetchedInfo.previousAcademicYearPendingFeeAmount).subscribe(result=>{
      
      });

    }
    // Toggle the edit mode
    this.isEditfee = !this.isEditfee;
  }

}
