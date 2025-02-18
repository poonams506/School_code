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
import * as CryptoJS from 'crypto-js/'; 
import { forEach } from 'jszip';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmBoxInitializer, DialogLayoutDisplay, ToastEvokeService, ToastNotificationInitializer, ToastPositionEnum, ToastUserViewTypeEnum } from '@costlydeveloper/ngx-awesome-popup';
import * as moment from 'moment';
import { AcademicYear, MasterServiceProxy, SchoolNgbDateModel, TransportFeeMonthMasterDto, TransportFeeMonthMastersDto, TransportFeePaymentAppliedMonthMappingTypeUpsertDto, TransportFeePaymentDetailTypeUpsertDto, TransportFeePaymentParticulars, TransportFeePaymentSelectDto, TransportFeePaymentServiceProxy, TransportFeePaymentUpsertDto } from 'src/app/services/school-api-service';
@Component({
  selector: 'app-transport-fee-payment',
  templateUrl: './transport-fee-payment.component.html',
  styleUrls: ['./transport-fee-payment.component.scss']
})
export class TransportFeePaymentComponent implements OnInit {
  active = 1;
  model: NgbDateStruct;
  paymentSummaryForm: FormGroup;
  submitted = false;
  consumerId : number;
  roleId : number;
  transportConsumerStoppageMappingId : number;
  academicYearId : number;
  gradeId : number;
  divisionId : number;
  fetchedInfo : TransportFeePaymentSelectDto = new TransportFeePaymentSelectDto();
  monthMasters : TransportFeeMonthMasterDto[]=[];
  academicYearDropdownList:AcademicYear[];
  dueAmount : number;
  totalFee : number;
  showAddnDisc : boolean = false;
  additionalRemark : string;
  additionalAmount : number;
  isAddionalDiscApplied : boolean = false;
  transportFeePaymentUpsertDto : TransportFeePaymentUpsertDto = new TransportFeePaymentUpsertDto();
  totalRowDto : TransportFeePaymentParticulars = new TransportFeePaymentParticulars();
  paySubmitted = false;
  selectAll = false;
  isShowSelectAll = true;
  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private themeService: ThemeService,
    private httpClient:HttpClient,
    private router:Router,
    private route: ActivatedRoute,
    private transportFeePaymentService:TransportFeePaymentServiceProxy,
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
        this.consumerId = decryptedValues.consumerId as number;
        this.roleId = decryptedValues.roleId as number;
        this.academicYearId = decryptedValues.academicYearId as number;
        this.gradeId = decryptedValues.gradeId as number;
        this.divisionId = decryptedValues.divisionId as number;
        this.dueAmount = decryptedValues.dueAmount as number;
        this.transportConsumerStoppageMappingId = decryptedValues.transportConsumerStoppageMappingId as number;
        this.getAcademicYearMasterData();
        this.getPaymentFeePageMasterActivityList();
        let paymentDate = new SchoolNgbDateModel();
        paymentDate.day = new Date().getDate();
        paymentDate.month = new Date().getMonth() + 1;
        paymentDate.year = new Date().getFullYear();
        this.transportFeePaymentUpsertDto.ngbOnlineTransactionDateTime = paymentDate;
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

  getConsumerFeePayment(){
    if(this.roleId && this.roleId>0 && this.consumerId && this.consumerId > 0 && this.academicYearId && this.academicYearId > 0
      &&
      this.transportConsumerStoppageMappingId && this.transportConsumerStoppageMappingId > 0
    ){
      this.transportFeePaymentService.getTransportFeePaymentSelect(this.academicYearId, this.consumerId, this.roleId,
        this.transportConsumerStoppageMappingId
      ).
      subscribe((feePaymentDetail:TransportFeePaymentSelectDto)=>{
       // this.paymentSummaryForm.patchValue(feePaymentDetail);
        this.fetchedInfo = feePaymentDetail;
        this.monthMasters.forEach((item)=>{
          for (let index = 0; index < this.fetchedInfo.transportFeePaymentAppliedMonthList.length; index++) {
            const element = this.fetchedInfo.transportFeePaymentAppliedMonthList[index];
            if(item.monthMasterId == element.monthMasterId){
              item.isAlreadyChecked = true;
            }
          }
        });
        if(this.monthMasters.filter(x=>x.isAlreadyChecked == false).length > 0){
            this.isShowSelectAll = true;
          }
          else{
            this.isShowSelectAll = false;
          }
        this.calculateParticularFeeGrid();
      });
    }
  }

  disabledManuallyPayFeeTextBoxes(){
    return true;
  }

  calculateParticularFeeGrid(){
    this.dueAmount = 0;
    this.fetchedInfo.transportFeePaymentParticularsList.forEach((item)=>{
      item.feeAfterDiscount = item.totalFee - item.additionalDiscAmount;
      item.dueAmount = item.feeAfterDiscount - item.alreadyPaid;
      item.paybleFee = 0;
    });
    this.roundUpAmounts();
  }

  addMonth(){
   // this.removeAddnDisc();
    if(this.monthMasters.filter(x=>x.isAlreadyChecked == false).length == 
    this.monthMasters.filter(x=>x.isAlreadyChecked == false && x.isCurrentChecked).length){
      this.selectAll = true;
    }
    else{
      this.selectAll = false;
    }
    let selectedMonthCount = 0;
    let perMonthPrice = 0;
    this.dueAmount = 0;
    if(this.monthMasters && this.monthMasters.filter(x=>x.isCurrentChecked == true) &&
    this.monthMasters.filter(x=>x.isCurrentChecked == true).length > 0){
      selectedMonthCount = this.monthMasters.filter(x=>x.isCurrentChecked == true).length;
      perMonthPrice = this.monthMasters.filter(x=>x.isCurrentChecked == true)[0].perMonthAmount!;
    }
      this.fetchedInfo.transportFeePaymentParticularsList.forEach(particular => {
        particular.paybleFee = (selectedMonthCount * perMonthPrice);
        this.dueAmount += particular.paybleFee;
    });
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
        newToastNotification.setMessage(this.translate.instant('Additional Fee should not be greater than payble amount'));
        newToastNotification.openToastNotification$();
         return;
      }
    }
    this.isAddionalDiscApplied = true;
    this.fetchedInfo.transportFeePaymentParticularsList.forEach((item)=>{
        item.feeAfterDiscount = item.feeAfterDiscount - this.additionalAmount;
        item.dueAmount = item.feeAfterDiscount;
        item.paybleFee = item.paybleFee - this.additionalAmount;
        item.additionalDiscAmount = this.additionalAmount;
    });
    this.roundUpAmounts();
  }

  removeAdditionalDisc(){
    if(this.isAddionalDiscApplied == true){
      this.isAddionalDiscApplied = false;
      this.fetchedInfo.transportFeePaymentParticularsList.forEach((item)=>{
        item.feeAfterDiscount = item.feeAfterDiscount + this.additionalAmount;
        item.dueAmount = item.feeAfterDiscount;
        item.paybleFee = item.paybleFee + this.additionalAmount;
        item.additionalDiscAmount = 0;
    });
    }
    this.additionalRemark = "";
    this.additionalAmount = 0;
    this.roundUpAmounts();
  }

 

  getDueAmountForAdditionalDisc(){
    let count = this.monthMasters.filter(x=>x.isCurrentChecked == true).length;
    if(count > 0){
      return count * this.monthMasters.find(x=>x.isCurrentChecked == true)?.perMonthAmount!;
    }
    return 0;
  }
  roundUpAmounts(){
    this.fetchedInfo.transportFeePaymentParticularsList.forEach((item)=>{
        // item.feeAfterDiscount = parseFloat((item.feeAfterDiscount).toFixed(2));
        // item.dueAmount = parseFloat((item.dueAmount).toFixed(2));
        // item.paybleFee = parseFloat((item.paybleFee).toFixed(2));
        // item.alreadyPaid = parseFloat((item.alreadyPaid).toFixed(2));
        this.dueAmount = parseFloat((this.dueAmount).toFixed(2));
    });
  }

  getPaymentFeePageMasterActivityList(){
    if(this.consumerId && this.consumerId > 0 && this.roleId && this.roleId > 0 &&
       this.academicYearId && this.academicYearId > 0 &&
       this.transportConsumerStoppageMappingId && this.transportConsumerStoppageMappingId > 0 ){
       this.transportFeePaymentService.getTransportFeePaymentMonths(this.academicYearId,this.consumerId,
       this.roleId, this.transportConsumerStoppageMappingId).
      subscribe((feePaymentDetail:TransportFeeMonthMastersDto)=>{
        this.monthMasters = feePaymentDetail.transportFeeMonthMastersList;
        //this.totalFee = feePaymentDetail.totalFee;
        this.getConsumerFeePayment();
      });
    }
  }

  getTotalRow(){
    this.totalRowDto.totalFee = 0;
    this.totalRowDto.feeAfterDiscount = 0;
    this.totalRowDto.paybleFee = 0;
    this.totalRowDto.dueAmount = 0;
    this.totalRowDto.alreadyPaid = 0;
    this.fetchedInfo.transportFeePaymentParticularsList.forEach((item)=>{
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
    });
    // this.totalRowDto.feeAfterDiscount = ((this.totalRowDto.feeAfterDiscount));
    // this.totalRowDto.dueAmount = ((this.totalRowDto.dueAmount));
    // this.totalRowDto.paybleFee = ((this.totalRowDto.paybleFee));
    // this.totalRowDto.alreadyPaid = ((this.totalRowDto.alreadyPaid));
    return this.totalRowDto;
  }

  pay(){
    debugger;
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


      this.transportFeePaymentUpsertDto.academicYearId = this.academicYearId;
      this.transportFeePaymentUpsertDto.roleId = this.roleId;
      this.transportFeePaymentUpsertDto.consumerId = this.consumerId;
      this.transportFeePaymentUpsertDto.transportConsumerStoppageMappingId = this.transportConsumerStoppageMappingId;
      this.transportFeePaymentUpsertDto.paidAmount = this.getTotalRow().paybleFee;
      this.transportFeePaymentUpsertDto.paymentTypeId = this.active;
      if(this.isAddionalDiscApplied){
        this.transportFeePaymentUpsertDto.additionalDiscountedRemark = this.additionalRemark;
        this.transportFeePaymentUpsertDto.additionalDiscountedAmount = this.additionalAmount;
        this.transportFeePaymentUpsertDto.installmentPaybleFee = this.dueAmount;
      }
      else{
        this.transportFeePaymentUpsertDto.additionalDiscountedRemark = '';
        this.transportFeePaymentUpsertDto.additionalDiscountedAmount = 0;
        this.transportFeePaymentUpsertDto.installmentPaybleFee = 0;
      }
      let feePaymentAppliedWavierMappingTypeUpsertDtoArray : TransportFeePaymentAppliedMonthMappingTypeUpsertDto[]=[];
        this.monthMasters.filter(x=>x.isCurrentChecked == true).forEach(elementMonth => {
          let feePaymentAppliedWavierMappingTypeUpsertDto = new TransportFeePaymentAppliedMonthMappingTypeUpsertDto();
          feePaymentAppliedWavierMappingTypeUpsertDto.monthMasterId = elementMonth.monthMasterId!;
          feePaymentAppliedWavierMappingTypeUpsertDto.discountedAmount = elementMonth.perMonthAmount!;
          feePaymentAppliedWavierMappingTypeUpsertDtoArray.push(feePaymentAppliedWavierMappingTypeUpsertDto);
        });
        this.transportFeePaymentUpsertDto.transportFeePaymentAppliedMonthMappingTypeUpsertDtoList = feePaymentAppliedWavierMappingTypeUpsertDtoArray;
     
  
    let feePaymentParticularsArray : TransportFeePaymentDetailTypeUpsertDto[]=[];
     this.fetchedInfo.transportFeePaymentParticularsList.forEach((item)=>{
      let feePaymentParticularsDto = new TransportFeePaymentDetailTypeUpsertDto();
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
      this.transportFeePaymentUpsertDto.transportFeePaymentDetailTypeUpsertDtoList = feePaymentParticularsArray;
     });
     this.transportFeePaymentUpsertDto.ngbOnlineTransactionDateTime = new SchoolNgbDateModel(this.transportFeePaymentUpsertDto.ngbOnlineTransactionDateTime);
     this.transportFeePaymentUpsertDto.ngbChequeDate = new SchoolNgbDateModel(this.transportFeePaymentUpsertDto.ngbChequeDate);
     let encryptedString =CryptoJS.AES.encrypt(JSON.stringify(
      this.transportFeePaymentUpsertDto), environment.ENCRYPTION_PASSWORD,).toString();
      this.transportFeePaymentService.transportFeePaymentUpsert(this.transportFeePaymentUpsertDto).subscribe((success)=>{
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setConfig({
          toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
        });
        newToastNotification.setTitle(this.translate.instant('SUCCESS'));
        newToastNotification.setMessage(this.translate.instant('FEE_PAYMENT_SAVED'));
        newToastNotification.openToastNotification$();
        this.router.navigate(['transport-fee-management/transport-view-payment']);
      });
     }
    });


  }

  validate(){
    let result = true;
    this.fetchedInfo.transportFeePaymentParticularsList.forEach((item)=>{
      if((item.paybleFee == null || item.paybleFee == undefined)){
        result = false;
      }
     });
     switch(this.active){
      case 1 : {
        if(!this.transportFeePaymentUpsertDto.ngbOnlineTransactionDateTime){
          result = false; 
         }
         break;
      }
      case 2:
      case 3:{
        if(!this.transportFeePaymentUpsertDto.chequeNumber || !this.transportFeePaymentUpsertDto.ngbOnlineTransactionDateTime ||
          !this.transportFeePaymentUpsertDto.ngbChequeDate || !this.transportFeePaymentUpsertDto.chequeBank ||
          !this.transportFeePaymentUpsertDto.ngbChequeDate){
          result = false; 
         }
         break;
      }
      case 4:
      case 5:
      case 6:{
        if(!this.transportFeePaymentUpsertDto.ngbOnlineTransactionDateTime || !this.transportFeePaymentUpsertDto.onlineTransactionId){
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
      this.paymentSummaryForm.reset();
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


  selectAllMonth(){
    if(this.selectAll){
      this.monthMasters.forEach(element => {
        if(!element.isAlreadyChecked){
          element.isCurrentChecked = true;
        }
      });
    }
    else{
      this.monthMasters.forEach(element => {
        if(!element.isAlreadyChecked){
          element.isCurrentChecked = false;
        }
      });
    }
    this.addMonth();
  }

  
}
