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
import { AcademicYear, AdhocFeePaymentSelectDto, AdhocFeePaymentServiceProxy, AdhocFeePaymentUpsertDto, AdhocParticularMasterDto, AdhocParticularMasterServiceProxy, MasterServiceProxy, SchoolNgbDateModel } from 'src/app/services/school-api-service';
import * as CryptoJS from 'crypto-js/'; 
import { forEach } from 'jszip';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmBoxInitializer, DialogLayoutDisplay, ToastEvokeService, ToastNotificationInitializer, ToastPositionEnum, ToastUserViewTypeEnum } from '@costlydeveloper/ngx-awesome-popup';
import * as moment from 'moment';
import { AddAdhocParticularComponent } from '../add-adhoc-particular/add-adhoc-particular.component';
@Component({
  selector: 'app-adhoc-fee-payment',
  templateUrl: './adhoc-fee-payment.component.html',
  styleUrls: ['./adhoc-fee-payment.component.scss']
})


export class AdhocFeePaymentComponent implements OnInit {
  active = 1;
  model: NgbDateStruct;
  paymentSummaryForm: FormGroup;
  studentId : number;
  academicYearId : number;
  gradeId : number;
  divisionId : number;
  fetchedInfo : AdhocFeePaymentSelectDto = new AdhocFeePaymentSelectDto();
  
  academicYearDropdownList:AcademicYear[];
  totalFee : number;
  totalFeeError = false;
  adhocParticularMasterId : number;
  particularError = false;
  adhocFeePaymentUpsertDto : AdhocFeePaymentUpsertDto = new AdhocFeePaymentUpsertDto();
  paySubmitted = false;
  particularList:any[];
 
  constructor(
    public translate: TranslateService, 
    private modalService: NgbModal,
    private formBuilder: FormBuilder, 
    private themeService: ThemeService,
    private httpClient:HttpClient,
    private router:Router,
    private route: ActivatedRoute,
    private adhocFeePaymentService:AdhocFeePaymentServiceProxy,
    private adhocParticularMasterService:AdhocParticularMasterServiceProxy,
    private masterService:MasterServiceProxy,
    private toastEvokeService: ToastEvokeService,
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
        this.getAcademicYearMasterData();
        this.getParticularList();
        this.getStudentFeePayment();
        let paymentDate = new SchoolNgbDateModel();
        paymentDate.day = new Date().getDate();
        paymentDate.month = new Date().getMonth() + 1;
        paymentDate.year = new Date().getFullYear();
        this.adhocFeePaymentUpsertDto.ngbOnlineTransactionDateTime = paymentDate;
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
      this.adhocFeePaymentService.getAdhocFeePaymentSelect(this.academicYearId, this.studentId, this.gradeId, this.divisionId).
      subscribe((feePaymentDetail:AdhocFeePaymentSelectDto)=>{
        this.fetchedInfo = feePaymentDetail;
      });
    }
  }
  getParticularList()
  {
    this.adhocParticularMasterService.getAdhocParticularList(this.academicYearId).subscribe(result=>{
      this.particularList= result.particulars!;
    });
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


      this.adhocFeePaymentUpsertDto.academicYearId = this.academicYearId;
      this.adhocFeePaymentUpsertDto.gradeId = this.gradeId;
      this.adhocFeePaymentUpsertDto.divisionId = this.divisionId;
      this.adhocFeePaymentUpsertDto.studentId = this.studentId;
      this.adhocFeePaymentUpsertDto.totalFee = this.totalFee;
      this.adhocFeePaymentUpsertDto.particularId = this.adhocParticularMasterId;
      this.adhocFeePaymentUpsertDto.paymentTypeId = this.active;
  
     this.adhocFeePaymentUpsertDto.ngbOnlineTransactionDateTime = new SchoolNgbDateModel(this.adhocFeePaymentUpsertDto.ngbOnlineTransactionDateTime);
     this.adhocFeePaymentUpsertDto.ngbChequeDate = new SchoolNgbDateModel(this.adhocFeePaymentUpsertDto.ngbChequeDate);
     let encryptedString =CryptoJS.AES.encrypt(JSON.stringify(
      this.adhocFeePaymentUpsertDto), environment.ENCRYPTION_PASSWORD,).toString();
      this.adhocFeePaymentService.adhocFeePaymentUpsert(encryptedString, this.adhocFeePaymentUpsertDto).subscribe(()=>{
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setConfig({
          toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
        });
        newToastNotification.setTitle(this.translate.instant('SUCCESS'));
        newToastNotification.setMessage(this.translate.instant('FEE_PAYMENT_SAVED'));
        newToastNotification.openToastNotification$();
        this.router.navigate(['adhoc-fee-management/adhoc-view-payment']);
      });
     }
    });


  }

  validate(){
    let result = true;
    if(this.adhocParticularMasterId > 0){
    }
    else
    {
      result = false;
      this.particularError = true;
    }
    if(this.totalFee > 0){
    }
    else
    {
      result = false;
      this.totalFeeError = true;
    }
     switch(this.active){
      case 1 : {
        if(!this.adhocFeePaymentUpsertDto.ngbOnlineTransactionDateTime){
          result = false; 
         }
         break;
      }
      case 2:
      case 3:{
        if(!this.adhocFeePaymentUpsertDto.chequeNumber || !this.adhocFeePaymentUpsertDto.ngbOnlineTransactionDateTime ||
          !this.adhocFeePaymentUpsertDto.ngbChequeDate || !this.adhocFeePaymentUpsertDto.chequeBank ||
          !this.adhocFeePaymentUpsertDto.ngbChequeDate){
          result = false; 
         }
         break;
      }
      case 4:
      case 5:
      case 6:{
        if(!this.adhocFeePaymentUpsertDto.ngbOnlineTransactionDateTime || !this.adhocFeePaymentUpsertDto.onlineTransactionId){
          result = false; 
         }
         break;
      }
      default:
         break;
     }
    return result;
  }

  addParticular()
  {
    const modalRef = this.modalService.open(AddAdhocParticularComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.particularForm.patchValue({adhocParticularMasterId:0,particular:''});
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result==true)
      {
        this.rerender();
        this.particularSuccessNotification();
  
      }
      
  
    }, (reason) => {
        
    });

  }

  rerender(): void {
    this.getParticularList()
  }

  particularSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('PARTICULAR_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
}
