import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmBoxInitializer, DialogLayoutDisplay, ToastEvokeService, ToastNotificationInitializer, ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ThemeService } from 'ng2-charts';
import { AcademicYear,AdhocParticularMasterServiceProxy, MasterServiceProxy, RegistrationFeePaymentSelectDto, RegistrationFeePaymentServiceProxy, SchoolNgbDateModel, RegistrationFeePaymentDto, RegistrationFeeParticularSelectDto, StudentEnquiryServiceProxy, StudentEnquiryDto } from 'src/app/services/school-api-service';
import { environment } from 'src/environments/environment';
import { AddAdhocParticularComponent } from '../../adhoc-fee-management/add-adhoc-particular/add-adhoc-particular.component';
import * as CryptoJS from 'crypto-js/'; 

@Component({
  selector: 'app-registration-fee-payment',
  templateUrl: './registration-fee-payment.component.html',
  styleUrls: ['./registration-fee-payment.component.scss']
})
export class RegistrationFeePaymentComponent {
  active = 1;
  model: NgbDateStruct;
  paymentSummaryForm: FormGroup;
  studentEnquiryId : number;
  academicYearId : number;
  fetchedInfo : StudentEnquiryDto = new StudentEnquiryDto();
  fetchedParticularInfo:RegistrationFeeParticularSelectDto[]=[];
  academicYearDropdownList:AcademicYear[];
  intrestedClass:string;
  totalFeeError = false;
  adhocParticularMasterId : number;
  particularError = false;
  registrationFeePaymentDto : RegistrationFeePaymentDto = new RegistrationFeePaymentDto();
  paySubmitted = false;
  particularList:any[];
  totalPaidAmount: number = 0;
  amountError = false;
 
  constructor(
    public translate: TranslateService, 
    private modalService: NgbModal,
    private formBuilder: FormBuilder, 
    private themeService: ThemeService,
    private httpClient:HttpClient,
    private router:Router,
    private route: ActivatedRoute,
    private studentEnquiryService:StudentEnquiryServiceProxy,
    private registartionFeePaymentService:RegistrationFeePaymentServiceProxy,
    private adhocParticularMasterService:AdhocParticularMasterServiceProxy,
    private masterService:MasterServiceProxy,
    private toastEvokeService: ToastEvokeService,
  ) { }

  ngOnInit(): void {
    this.getAcademicYearMasterData();
    this.getParticularList();
    this.paymentSummaryForm = this.formBuilder.group({
      registrationFeeDetailsParticularList: this.formBuilder.array([this.createParticularFormGroup()])
    });

    this.route.params.subscribe((data:any) =>{
      debugger;
      const queryParamValue = data.studentRouteParameter; 
      if(queryParamValue){
        let decryptedString=CryptoJS.AES.decrypt(queryParamValue,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
        let decryptedValues = JSON.parse(decryptedString) as any;
        this.studentEnquiryId = decryptedValues.studentEnquiryId as number;
        this.academicYearId = decryptedValues.academicYearId as number;
        this.getStudentFeePayment();
        let paymentDate = new SchoolNgbDateModel();
        paymentDate.day = new Date().getDate();
        paymentDate.month = new Date().getMonth() + 1;
        paymentDate.year = new Date().getFullYear();
        this.registrationFeePaymentDto.ngbOnlineTransactionDateTime = paymentDate;
      }
    });
    this.registrationFeeDetailsParticularList.valueChanges.subscribe(() => {
      this.calculateTotalPaidAmount();
    });
    
  }
  createParticularFormGroup(): FormGroup {
    return this.formBuilder.group({
      feeParticularId: [null, Validators.required],
      paidAmount: [null, [Validators.required, Validators.pattern('^[0-9]*\\.?[0-9]*$')]] // Allow decimal numbers
     });
  }

  get registrationFeeDetailsParticularList() {
    return this.paymentSummaryForm.get('registrationFeeDetailsParticularList') as FormArray;
  }
  patchHolidaysTypeArrayValues(values: RegistrationFeeParticularSelectDto[]) {
    while (this.registrationFeeDetailsParticularList.length !== 0) {
      this.registrationFeeDetailsParticularList.removeAt(0);
    }
    values.forEach((value) => {
      const itemFormGroup = this.formBuilder.group({
        feeParticularId: [value.adhocParticularMasterId],
        paidAmount: [value.totalFee],
      });
      this.registrationFeeDetailsParticularList.push(itemFormGroup);
    });
  }
  addParticularDetails() {
    this.registrationFeeDetailsParticularList.push(this.createParticularFormGroup());
    this.calculateTotalPaidAmount();
  }
  removeParticularDetails(index: number) {
    if (this.registrationFeeDetailsParticularList.length > 1) {
      this.registrationFeeDetailsParticularList.removeAt(index);
      this.calculateTotalPaidAmount();
    }
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
    if(this.studentEnquiryId && this.studentEnquiryId>0 && this.academicYearId && this.academicYearId > 0){
      this.studentEnquiryService.studentEnquirySelect(this.studentEnquiryId).
      subscribe((feePaymentDetail:StudentEnquiryDto)=>{
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

      let registrationFeePaymentDto = this.paymentSummaryForm.getRawValue();
      registrationFeePaymentDto.academicYearId = this.academicYearId;
      registrationFeePaymentDto.studentEnquiryId = this.studentEnquiryId;
      registrationFeePaymentDto.paymentTypeId = this.active;
      registrationFeePaymentDto.totalFee = this.totalPaidAmount;
      registrationFeePaymentDto.onlineTransactionId = this.registrationFeePaymentDto.onlineTransactionId;
      registrationFeePaymentDto.remark = this.registrationFeePaymentDto.remark;
     registrationFeePaymentDto.ngbOnlineTransactionDateTime = new SchoolNgbDateModel(this.registrationFeePaymentDto.ngbOnlineTransactionDateTime);     

      this.registartionFeePaymentService.registrationFeePaymentUpsert(registrationFeePaymentDto).subscribe(()=>{
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setConfig({
          toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
        });
        newToastNotification.setTitle(this.translate.instant('SUCCESS'));
        newToastNotification.setMessage(this.translate.instant('FEE_PAYMENT_SAVED'));
        newToastNotification.openToastNotification$();
        this.router.navigate(['students/student-enquiry']);
      });
     }
    });


  }

   validate(){
    debugger;
    let result = true;
     switch(this.active){
      case 1 : {
        if(!this.registrationFeePaymentDto.ngbOnlineTransactionDateTime){
          result = false; 
         }
         break;
      }
      case 2:
      case 3:{
        if(!this.registrationFeePaymentDto.chequeNumber || !this.registrationFeePaymentDto.ngbOnlineTransactionDateTime ||
          !this.registrationFeePaymentDto.ngbChequeDate || !this.registrationFeePaymentDto.chequeBank ||
          !this.registrationFeePaymentDto.ngbChequeDate){
          result = false; 
         }
         break;
      }
      case 4:
      case 5:
      case 6:{
        if(!this.registrationFeePaymentDto.ngbOnlineTransactionDateTime || !this.registrationFeePaymentDto.onlineTransactionId){
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
  calculateTotalPaidAmount() {
    this.totalPaidAmount = this.registrationFeeDetailsParticularList.controls.reduce((sum, group) => {
      const paidAmount = group.get('paidAmount')?.value || 0;
      return sum + parseFloat(paidAmount);
    }, 0);
  }
}
