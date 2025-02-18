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
import { AcademicYear, StudentKitFeePaymentDetailTypeUpsertDto, StudentKitFeePaymentParticulars, StudentKitFeepaymentSelectDto, StudentKitFeePaymentServiceProxy, StudentKitFeepaymentUpsertDto, MasterServiceProxy, SchoolNgbDateModel } from 'src/app/services/school-api-service';
import * as CryptoJS from 'crypto-js/'; 
import { forEach } from 'jszip';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmBoxInitializer, DialogLayoutDisplay, ToastEvokeService, ToastNotificationInitializer, ToastPositionEnum, ToastUserViewTypeEnum } from '@costlydeveloper/ngx-awesome-popup';
import * as moment from 'moment';
import * as _ from 'lodash';
@Component({
  selector: 'app-student-kit-fee-payment',
  templateUrl: './student-kit-fee-payment.component.html',
  styleUrls: ['./student-kit-fee-payment.component.scss']
})


export class StudentKitFeePaymentComponent implements OnInit {
  active = 1;
  model: NgbDateStruct;
  paymentSummaryForm: FormGroup;
  submitted = false;
  studentId : number;
  academicYearId : number;
  gradeId : number;
  divisionId : number;
  fetchedInfo : StudentKitFeepaymentSelectDto = new StudentKitFeepaymentSelectDto();
  studentKitFeePaymentParticularsCloned  : StudentKitFeePaymentParticulars[] = [];
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
  feePaymentUpsertDto : StudentKitFeepaymentUpsertDto = new StudentKitFeepaymentUpsertDto();
  totalRowDto : StudentKitFeePaymentParticulars = new StudentKitFeePaymentParticulars();
  numberOfInstallment : number = 1;
  currentOfInstallment : number = 1;
  paySubmitted = false;
  skipDiscount = false;
  feeWavierTypesInstallmentsDetailsId : number = 0;
  isEditfee:Boolean=false;
  
  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private themeService: ThemeService,
    private httpClient:HttpClient,
    private router:Router,
    private route: ActivatedRoute,
    private feePaymentService:StudentKitFeePaymentServiceProxy,
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
      this.feePaymentService.getStudentKitFeePaymentSelect(this.academicYearId, this.studentId, this.gradeId, this.divisionId).
      subscribe((feePaymentDetail:StudentKitFeepaymentSelectDto)=>{
       // this.paymentSummaryForm.patchValue(feePaymentDetail);
        this.fetchedInfo = feePaymentDetail;
        this.calculateParticularFeeGrid();
      });
    }
  }

  calculateParticularFeeGrid(){
    this.dueAmount = 0;
    this.fetchedInfo.studentKitFeePaymentParticularsList.forEach((item)=>{
      if(true){
        let processedFeeAfterDiscount = item.totalFee;
        item.feeAfterDiscount = item.totalFee - item.additionalDiscAmount;
          if(item.feeParticularId > 0)
          {
            item.dueAmount = item.feeAfterDiscount - item.alreadyPaid;
            item.paybleFee = item.feeAfterDiscount - item.alreadyPaid;
            this.dueAmount += item.paybleFee;
          }
      }
    });
    this.fetchedInfo.studentKitFeePaymentParticularsList = this.fetchedInfo.studentKitFeePaymentParticularsList.sort((r,t) => r.feeParticularId - t.feeParticularId)
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
    //
     this.resetAdditionalDisc();
    //
    this.isAddionalDiscApplied = true;
    this.studentKitFeePaymentParticularsCloned = _.cloneDeep(this.fetchedInfo.studentKitFeePaymentParticularsList);
    let discountedAmtList = this.fetchedInfo.studentKitFeePaymentParticularsList.filter(x=>x.feeParticularId > 0)
        let sum = 0;
        for(let i = 0; i < discountedAmtList.length; i++) {
          sum += discountedAmtList[i].paybleFee;
        }
    this.fetchedInfo.studentKitFeePaymentParticularsList.forEach((item)=>{
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
    if(this.isAddionalDiscApplied == true){
      this.isAddionalDiscApplied = false;
      this.fetchedInfo.studentKitFeePaymentParticularsList = this.studentKitFeePaymentParticularsCloned;
      this.studentKitFeePaymentParticularsCloned = [];
      // this.fetchedInfo.studentKitFeePaymentParticularsList.forEach((item)=>{
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
    }
    this.additionalRemark = "";
    this.additionalAmount = 0;
    this.roundUpAmounts();
  }


  resetAdditionalDisc(){
    this.calculateParticularFeeGrid();
  }

  roundUpAmounts(){
    this.fetchedInfo.studentKitFeePaymentParticularsList.forEach((item)=>{
      if(item.feeParticularId > 0){
        this.dueAmount = parseFloat((this.dueAmount).toFixed(2));
      }
    });
  }

  disabledManuallyPayFeeTextBoxes(){
    let result = false;
    if(this.appliedDiscId > 0 || this.isAddionalDiscApplied || this.getTotalRow().dueAmount < 1){
      result = true;
    }
    return result;
  }

  getPaymentFeePageMasterActivityList(){
    if(this.gradeId && this.gradeId > 0 && this.divisionId && this.divisionId > 0 && this.academicYearId && this.academicYearId > 0 &&
      this.studentId > 0){
        this.getStudentFeePayment();
    }
  }

  getTotalRow(){
    this.totalRowDto.particularName = "Total";
    this.totalRowDto.totalFee = 0;
    this.totalRowDto.feeAfterDiscount = 0;
    this.totalRowDto.paybleFee = 0;
    this.totalRowDto.dueAmount = 0;
    this.totalRowDto.alreadyPaid = 0;
    this.fetchedInfo.studentKitFeePaymentParticularsList.forEach((item)=>{
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
     
  
    let feePaymentParticularsArray : StudentKitFeePaymentDetailTypeUpsertDto[]=[];
     this.fetchedInfo.studentKitFeePaymentParticularsList.forEach((item)=>{
      let feePaymentParticularsDto = new StudentKitFeePaymentDetailTypeUpsertDto();
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
      this.feePaymentUpsertDto.studentKitFeePaymentDetailTypeUpsertDtoList = feePaymentParticularsArray;
     });
     this.feePaymentUpsertDto.ngbOnlineTransactionDateTime = new SchoolNgbDateModel(this.feePaymentUpsertDto.ngbOnlineTransactionDateTime);
     this.feePaymentUpsertDto.ngbChequeDate = new SchoolNgbDateModel(this.feePaymentUpsertDto.ngbChequeDate);
      this.feePaymentService.studentKitFeePaymentUpsert(this.feePaymentUpsertDto).subscribe((success)=>{
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setConfig({
          toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
        });
        newToastNotification.setTitle(this.translate.instant('SUCCESS'));
        newToastNotification.setMessage(this.translate.instant('FEE_PAYMENT_SAVED'));
        newToastNotification.openToastNotification$();
        this.router.navigate(['student-kit-fee-management/view-student-kit-payment']);
      });
     }
    });


  }

  validate(){
    let result = true;
    this.fetchedInfo.studentKitFeePaymentParticularsList.forEach((item)=>{
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

}
