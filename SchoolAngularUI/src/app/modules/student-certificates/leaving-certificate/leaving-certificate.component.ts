import { Component, Input, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AcademicYear, CertificateDto, CertificateServiceProxy, DatatableResponseModel, Division, FeePaymentServiceProxy, Grade, GradeDivisionMasterDto, LeavingCertificateGridDto, LeavingCertificateHistory, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SchoolNgbDateModel, StudentIdModelResponse, StudentNameDto, StudentNameModelResponse } from 'src/app/services/school-api-service';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme-service.service';
import { ErrorModalPopupComponent } from '../error-modal-popup/error-modal-popup.component';
import { ConfirmBoxInitializer, DialogLayoutDisplay, ToastNotificationInitializer, ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { AnyAaaaRecord } from 'dns';
import de from 'date-fns/locale/de';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js/';  
@Component({
  selector: 'app-leaving-certificate',
  templateUrl: './leaving-certificate.component.html',
  styleUrls: ['./leaving-certificate.component.scss']
})
export class LeavingCertificateComponent implements OnInit {
  certificateForm:FormGroup;
  certificateSubmitted=false;
  gradeDropdownList:Grade[]=[];
  divisionDropdownList:Division[]=[];
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
  studentId:number;
  academicYearId:number;
  studentRouteDetail: StudentIdModelResponse;
  academicYearDropdownList:AcademicYear[];
  studentNames: StudentNameModelResponse;
  studentDropdownList: StudentNameDto[] = [];
  divisionId : any;
  gradeId : any;
  dropdownList = Array();
  selectedItems = Array();
  dropdownSettings = {};
  modalService: any;
  certificateContent : any;
  selectedOption: string = '';

  encyptedStudentId = "";

  model: NgbDateStruct;
	date: { year: number; month: number };
  certificateDto: CertificateDto = new CertificateDto();
  imageSource: any;
  logoUrl : string;

  requiredItemsArray : string[] = [];

  leavingCertificateList : LeavingCertificateGridDto[] = [];

  showStatus : number = 0;

  constructor(private certificateService:CertificateServiceProxy,private user:UserService , private _sanitizer: DomSanitizer,
    private masterService:MasterServiceProxy,
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private modalService1: NgbModal,
    private themeService: ThemeService,
    public sharedPermissionServiceService : SharedPermissionServiceService,
    private feePaymentService:FeePaymentServiceProxy,
    private router:Router,
    private location: Location
    ) 
   { }

   defaultTheme() {
    this.themeService.setDefaultTheme();
  }

  theme1() {
    this.themeService.setLightTheme();
  }

  theme2() {
    this.themeService.setDarkTheme();
  }
 

  onSelectChange(event: any) {
    this.selectedOption = event.target.value;
  }

  get f(){return this.certificateForm.controls;}

  getMasterDropdownData(){
    this.user.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
      this.academicYearId=academicYearId as number;
      this.masterService.getAddressMasterData().subscribe(masterData=>{
        this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe((gradeMaster:GradeDivisionMasterDto)=>{
          this.gradeDropdownList=gradeMaster.grades as Grade[];
          this.divisionDropdownList=gradeMaster.divisions as Division[];
          this.divisionGradeMapping=gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
            
          });
        });
  });
    
  
  this.masterService.getAcademicYearData().subscribe(masterData=>{
    this.academicYearDropdownList = masterData.academicYears;
  
  });
  
  }

  onSearchCertificate(): void {
    this.certificateSubmitted = true;
    if (this.certificateForm.invalid) {
        return;
    }
    const selectedClassId = this.certificateForm.get('classId')?.value;
    const parsedSelectedClassId = parseInt(selectedClassId);

  // Find the corresponding SchoolGradeDivisionMatrixDto for the selected classId
  const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);

  if (selectedClassMapping) {
    // Extract gradeId and divisionId from the selected class mapping
    this.gradeId = selectedClassMapping.gradeId;
    this.divisionId = selectedClassMapping.divisionId;
  }
    // this.gradeId = this.certificateForm.get('gradeId')?.value;
    // this.divisionId = this.certificateForm.get('divisionId')?.value;
    this.studentId = this.certificateForm.get('fullName')?.value;
    this.studentId = 0;
    setTimeout(() => {
      this.studentId = this.certificateForm.get('fullName')?.value;
      this.bindGrid();
    }, 100);
  }

  bindGrid(){
    this.certificateService.getLeavingCertificateHistory(this.studentId).subscribe((response : LeavingCertificateHistory)=>{
      this.leavingCertificateList = response.leavingCertificateList;
      if(this.leavingCertificateList.length == 0 || this.leavingCertificateList.filter(x=>x.statusId < 4).length == 0){
        this.showStatus = 1;
        this.certificateService.leavingCertificateSelect(0,this.gradeId,this.divisionId, this.studentId).subscribe((certificate : CertificateDto) =>{
          this.certificateDto = certificate;
          this.logoUrl = environment.API_BASE_URL + this.certificateDto.leavingCertificateDetails.logoUrl!;
          this.imageSource = this._sanitizer.bypassSecurityTrustResourceUrl(this.certificateDto.leavingCertificateDetails?.logoImage);
          if(!this.validateFormOnSearch()){
            this.certificateDto =  new CertificateDto();
            this.leavingCertificateList = []; 
          }
         });    
      }
    });
  }

  onCertificateReset(){
    this.showStatus = 0;
    this.certificateSubmitted = false;
    this.studentId = 0;
    this.encyptedStudentId = "";
    this.leavingCertificateList = [];
    this.certificateForm.reset();
  }
  

  ngOnInit(): void {
    this.certificateForm =this.formBuilder.group({
      gradeId:[null],
      gradeName:[null],
      divisionId:[null],
      divisionName:[null],
      firstName:[null],
      middleName:[null],
      lastName:[null],
      studentName:[null],
      certificateType: [null],
      fullName: [null, Validators.required], 
      studentId : [null],
      classId: [null, Validators.required], 
    });
    
  this.getMasterDropdownData();
  this.certificateForm.get('classId')?.valueChanges.subscribe((classId: string) => {
    if (classId) {
    const selectedClassId = this.certificateForm.get('classId')?.value;
    const parsedSelectedClassId = parseInt(selectedClassId);
  const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);
  if (selectedClassMapping) {
    this.gradeId = selectedClassMapping.gradeId;
    this.divisionId = selectedClassMapping.divisionId;
  }
  
      this.certificateService
        .getStudentNamesWithArchive(this.academicYearId, this.gradeId ,this.divisionId)
        .subscribe((response) => {
          this.studentNames = response;
          this.studentDropdownList = this.studentNames.studentNames;
          });
        

       
      this.certificateForm.get('studentId')?.setValue(null);
      this.certificateForm.get('fullName')?.setValue(null);
    }
  });

  this.certificateForm.get('fullName')?.valueChanges.subscribe((classId: string) => {
    this.encyptedStudentId=CryptoJS.AES.encrypt(JSON.stringify(
      {
        studentId:this.certificateForm.get('fullName')?.value,
        }), environment.ENCRYPTION_PASSWORD).toString();
  });
  this.defaultTheme(); 


   
  }

  Generate(){
    this.feePaymentService.getFeePaymentDueListByAY(this.studentId,true).subscribe((result:DatatableResponseModel|undefined)=>{
      if(result?.data && result?.data.length > 0){
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle(this.translate.instant('WARNING'));
        newToastNotification.setConfig({
          toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
          layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
       });
        newToastNotification.setMessage(this.translate.instant('This student have pending due amount, you can not generate leaving certificate until due amout is paid'));
        newToastNotification.openToastNotification$();
      }
      else{
        const newConfirmBox = new ConfirmBoxInitializer();
        newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
        newConfirmBox.setMessage(
          this.translate.instant('DO_YOU_WANT_TO_GENERATE_LEAVING_CERTIFICATE')
        );
        newConfirmBox.setConfig({
          confirmLabel: this.translate.instant('YES'), // default confirmation button label
          declineLabel: this.translate.instant('NO'),
        });
        // Simply open the popup and observe button click
        newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
         if(resp?.success){
          if(this.validateForm() == true){
            this.certificateDto.leavingCertificateDetails.gradeId = this.gradeId;
            this.certificateDto.leavingCertificateDetails.divisionId = this.divisionId;
            this.certificateDto.leavingCertificateDetails.studentId = this.studentId;
            this.certificateDto.leavingCertificateDetails.statusId = 0;
            this.certificateDto.leavingCertificateDetails.ngbDateOfLeavingSchoolCurrent = new SchoolNgbDateModel(this.certificateDto.leavingCertificateDetails.ngbDateOfLeavingSchoolCurrent);
            this.certificateDto.leavingCertificateDetails.ngbDateSignCurrent = new SchoolNgbDateModel(this.certificateDto.leavingCertificateDetails.ngbDateSignCurrent);
            this.certificateService.leavingCertificateUpsert(this.certificateDto.leavingCertificateDetails).subscribe((x:any)=>{
              this.showStatus = 0;
              this.bindGrid();
              const newToastNotification = new ToastNotificationInitializer();
              newToastNotification.setTitle(this.translate.instant('SUCCESS'));
              newToastNotification.setMessage(this.translate.instant('LEAVING_CERTIFICATE_GENERATED_SUCCESSFULLY'));
              newToastNotification.openToastNotification$();
            });
          }
          }
        });
       
      }
    });
    
  }
  validateForm(){
    this.requiredItemsArray = [];
      if(this.certificateDto.leavingCertificateDetails.motherName == null ||
        this.certificateDto.leavingCertificateDetails.motherName == undefined ||
        this.certificateDto.leavingCertificateDetails.motherName == ''){
        this.requiredItemsArray.push('Mother Name is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.motherName.trim() == ''){
        this.requiredItemsArray.push('Mother Name is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.nationality == null ||
        this.certificateDto.leavingCertificateDetails.nationality == undefined ||
        this.certificateDto.leavingCertificateDetails.nationality == ''){
        this.requiredItemsArray.push('Nationality is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.nationality.trim() == ''){
        this.requiredItemsArray.push('Nationality is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.motherTounge == null ||
        this.certificateDto.leavingCertificateDetails.motherTounge == undefined ||
        this.certificateDto.leavingCertificateDetails.motherTounge == ''){
        this.requiredItemsArray.push('Mother-Tongue is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.motherTounge.trim() == ''){
        this.requiredItemsArray.push('Mother-Tongue is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.religion == null ||
        this.certificateDto.leavingCertificateDetails.religion == undefined ||
        this.certificateDto.leavingCertificateDetails.religion == ''){
        this.requiredItemsArray.push('Religion is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.religion.trim() == ''){
        this.requiredItemsArray.push('Religion is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.cast == null ||
        this.certificateDto.leavingCertificateDetails.cast == undefined ||
        this.certificateDto.leavingCertificateDetails.cast == ''){
        this.requiredItemsArray.push('Caste is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.cast.trim() == ''){
        this.requiredItemsArray.push('Caste is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.birthPlace == null ||
        this.certificateDto.leavingCertificateDetails.birthPlace == undefined ||
        this.certificateDto.leavingCertificateDetails.birthPlace == ''){
        this.requiredItemsArray.push('Place of Birth is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.cast.trim() == ''){
        this.requiredItemsArray.push('Place of Birth is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.birthDateInWords == null ||
        this.certificateDto.leavingCertificateDetails.birthDateInWords == undefined ||
        this.certificateDto.leavingCertificateDetails.birthDateInWords == ''){
        this.requiredItemsArray.push('Date Of Birth In Words is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.birthDateInWords.trim() == ''){
        this.requiredItemsArray.push('Date Of Birth In Words is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.progressCurrent == null ||
        this.certificateDto.leavingCertificateDetails.progressCurrent == undefined ||
        this.certificateDto.leavingCertificateDetails.progressCurrent == ''){
        this.requiredItemsArray.push('Progress is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.progressCurrent.trim() == ''){
        this.requiredItemsArray.push('Progress is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.conductCurrent == null ||
        this.certificateDto.leavingCertificateDetails.conductCurrent == undefined ||
        this.certificateDto.leavingCertificateDetails.conductCurrent == ''){
        this.requiredItemsArray.push('Conduct is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.conductCurrent.trim() == ''){
        this.requiredItemsArray.push('Conduct is required.');
      }
      if(this.certificateDto.leavingCertificateDetails.gradeNameAdmission == null ||
        this.certificateDto.leavingCertificateDetails.gradeNameAdmission == undefined ||
        this.certificateDto.leavingCertificateDetails.gradeNameAdmission == ''){
        this.requiredItemsArray.push('Admission class is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.gradeNameAdmission.trim() == ''){
        this.requiredItemsArray.push('Admission class is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.ngbDateOfLeavingSchoolCurrent == null ||
        this.certificateDto.leavingCertificateDetails.ngbDateOfLeavingSchoolCurrent == undefined
        ){
        this.requiredItemsArray.push('Date of Leaving the School is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.ngbDateOfLeavingSchoolCurrent.day <= 0){
        this.requiredItemsArray.push('Date of Leaving the School is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.standardInWhichStudyingCurrent == null ||
        this.certificateDto.leavingCertificateDetails.standardInWhichStudyingCurrent == undefined ||
        this.certificateDto.leavingCertificateDetails.standardInWhichStudyingCurrent == ''){
        this.requiredItemsArray.push('Std in which studying and since when In Words and Figures is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.standardInWhichStudyingCurrent.trim() == ''){
        this.requiredItemsArray.push('Std in which studying and since when In Words and Figures is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.reasonOfLeavingSchoolCurrent == null ||
        this.certificateDto.leavingCertificateDetails.reasonOfLeavingSchoolCurrent == undefined ||
        this.certificateDto.leavingCertificateDetails.reasonOfLeavingSchoolCurrent == ''){
        this.requiredItemsArray.push('Reason of Leaving School is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.reasonOfLeavingSchoolCurrent.trim() == ''){
        this.requiredItemsArray.push('Reason of Leaving School is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.ngbDateSignCurrent == null ||
        this.certificateDto.leavingCertificateDetails.ngbDateSignCurrent == undefined
        ){
        this.requiredItemsArray.push('Date Of Signature is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.ngbDateSignCurrent.day <= 0){
        this.requiredItemsArray.push('Date Of Signature is required.');
      }

      if(this.requiredItemsArray.length > 0){
        const modalRef = this.modalService1.open(ErrorModalPopupComponent, { size: 'lg',backdrop:'static' });
        modalRef.componentInstance.requiredItemsArray=this.requiredItemsArray;
        modalRef.componentInstance.message = 'Below are the required fields to generate the leaving certificate.';
        modalRef.componentInstance.title = 'Failed to generate Leaving Certificate'
        modalRef.componentInstance.modelRef=modalRef;
        modalRef.result.then((result) => {
          if(result==true)
          {
          }
      });
        return false;
      }
      else{
        return true;
      }
  }

  validateFormOnSearch(){
    debugger;
    var result = true;
    this.requiredItemsArray = [];
      if(this.certificateDto.leavingCertificateDetails.motherName == null ||
        this.certificateDto.leavingCertificateDetails.motherName == undefined ||
        this.certificateDto.leavingCertificateDetails.motherName == ''){
        this.requiredItemsArray.push('Mother Name is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.motherName.trim() == ''){
        this.requiredItemsArray.push('Mother Name is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.nationality == null ||
        this.certificateDto.leavingCertificateDetails.nationality == undefined ||
        this.certificateDto.leavingCertificateDetails.nationality == ''){
        this.requiredItemsArray.push('Nationality is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.nationality.trim() == ''){
        this.requiredItemsArray.push('Nationality is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.motherTounge == null ||
        this.certificateDto.leavingCertificateDetails.motherTounge == undefined ||
        this.certificateDto.leavingCertificateDetails.motherTounge == ''){
        this.requiredItemsArray.push('Mother-Tongue is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.motherTounge.trim() == ''){
        this.requiredItemsArray.push('Mother-Tongue is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.religion == null ||
        this.certificateDto.leavingCertificateDetails.religion == undefined ||
        this.certificateDto.leavingCertificateDetails.religion == ''){
        this.requiredItemsArray.push('Religion is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.religion.trim() == ''){
        this.requiredItemsArray.push('Religion is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.cast == null ||
        this.certificateDto.leavingCertificateDetails.cast == undefined ||
        this.certificateDto.leavingCertificateDetails.cast == ''){
        this.requiredItemsArray.push('Caste is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.cast.trim() == ''){
        this.requiredItemsArray.push('Caste is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.birthPlace == null ||
        this.certificateDto.leavingCertificateDetails.birthPlace == undefined ||
        this.certificateDto.leavingCertificateDetails.birthPlace == ''){
        this.requiredItemsArray.push('Place of Birth is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.birthPlace.trim() == ''){
        this.requiredItemsArray.push('Place of Birth is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.birthDateInWords == null ||
        this.certificateDto.leavingCertificateDetails.birthDateInWords == undefined ||
        this.certificateDto.leavingCertificateDetails.birthDateInWords == ''){
        this.requiredItemsArray.push('Date Of Birth In Words is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.birthDateInWords.trim() == ''){
        this.requiredItemsArray.push('Date Of Birth In Words is required.');
      }

      if(this.certificateDto.leavingCertificateDetails.gradeNameAdmission == null ||
        this.certificateDto.leavingCertificateDetails.gradeNameAdmission == undefined ||
        this.certificateDto.leavingCertificateDetails.gradeNameAdmission == ''){
        this.requiredItemsArray.push('Admission class is required.');
      }
      else if(this.certificateDto.leavingCertificateDetails.gradeNameAdmission.trim() == ''){
        this.requiredItemsArray.push('Admission class is required.');
      }


      if(this.requiredItemsArray.length > 0){
        const modalRef = this.modalService1.open(ErrorModalPopupComponent, { size: 'lg',backdrop:'static' });
        modalRef.componentInstance.requiredItemsArray=this.requiredItemsArray;
        modalRef.componentInstance.message = 'Below are the required fields for leaving certificate. Please click on edit button to update the student data';
        modalRef.componentInstance.title = 'Failed to generate Leaving Certificate'
        modalRef.componentInstance.modelRef=modalRef;
        modalRef.result.then((result) => {
          if(result==true)
          {
          }
      });
      result = false;
      }
      else{
      result = true;
      }

      if(result == true){
        // check if payment is due for all academic year
        return result;
      }
      else{
        return result;
      }

  }

  printPopup(item : any, statusId : number) {
    this.showStatus = 2; // print
    this.certificateService.leavingCertificatePrintSelect(item.leavingCertificateAuditsId,this.studentId,false).subscribe((certificate : CertificateDto) =>{
      this.certificateDto = certificate;
      this.logoUrl = environment.API_BASE_URL + this.certificateDto.leavingCertificateDetails.logoUrl!;
      this.imageSource = this._sanitizer.bypassSecurityTrustResourceUrl(this.certificateDto.leavingCertificateDetails?.logoImage);
     }); 
  }
  markGiveAsOriginal(item : any, statusId : number) {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('DO_YOU_WANT_TO_MARK_AS_ORIGINAL_CERTIFICATE')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      this.certificateService.leavingCertificateStatusUpdate(item.leavingCertificateAuditsId,this.studentId,2).subscribe((x:any) =>{
        this.showStatus = 0;
        this.bindGrid();
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle(this.translate.instant('SUCCESS'));
        newToastNotification.setMessage(this.translate.instant('ORIGINAL_LEAVING_CERTIFICATE_ISSUED_SUCCESSFULLY'));
        newToastNotification.openToastNotification$();
      }); 
	 }
    });
    
  }
  markGiveAsDuplicate(item : any, statusId : number) {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('DO_YOU_WANT_TO_MARK_AS_DUPLICATE_CERTIFICATE')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      this.certificateService.leavingCertificateStatusUpdate(item.leavingCertificateAuditsId,this.studentId,3).subscribe((x:any) =>{
        this.showStatus = 0;
        this.bindGrid();
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle(this.translate.instant('SUCCESS'));
        newToastNotification.setMessage(this.translate.instant('DUPLICATE_LEAVING_CERTIFICATE_ISSUED_SUCCESSFULLY'));
        newToastNotification.openToastNotification$();
      }); 
	 }
    });
    
  }
  markAsCancelled(item : any, statusId : number) {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('DO_YOU_WANT_TO_MARK_AS_CANCELLED_CERTIFICATE')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      this.certificateService.leavingCertificateStatusUpdate(item.leavingCertificateAuditsId,this.studentId,4).subscribe((x:any) =>{
        this.showStatus = 0;
        this.bindGrid();
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle(this.translate.instant('SUCCESS'));
        newToastNotification.setMessage(this.translate.instant('LEAVING_CERTIFICATE_CANCELLED_SUCCESSFULLY'));
        newToastNotification.openToastNotification$();
      }); 
	 }
    });
    
  }
  createAsDuplicate(item : any){
    this.showStatus = 3; // create as duplicate
    this.certificateService.leavingCertificatePrintSelect(item.leavingCertificateAuditsId,this.studentId,true).subscribe((certificate : CertificateDto) =>{
      this.certificateDto = certificate;
      this.logoUrl = environment.API_BASE_URL + this.certificateDto.leavingCertificateDetails.logoUrl!;
      this.imageSource = this._sanitizer.bypassSecurityTrustResourceUrl(this.certificateDto.leavingCertificateDetails?.logoImage);
     });
  }

  print(item : any){
    this.certificateService.leavingCertificateStatusUpdate(item.leavingCertificateAuditsId,this.studentId,1).subscribe((x:any) =>{
      this.showStatus = 0;
      this.bindGrid();
      const newToastNotification = new ToastNotificationInitializer();
      newToastNotification.setTitle(this.translate.instant('SUCCESS'));
      newToastNotification.setMessage(this.translate.instant('LEAVING_CERTIFICATE_PRINTED_SUCCESSFULLY'));
      newToastNotification.openToastNotification$();
    }); 
  }

  GenerateAsDuplicate(item : any){
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('DO_YOU_WANT_TO_GENERATE_DUPLICATE_LEAVING_CERTIFICATE')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      this.certificateService.leavingCertificateGenerateAsDuplicate(item.leavingCertificateAuditsId).subscribe((x:any) =>{
        this.showStatus = 0;
        this.bindGrid();
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle(this.translate.instant('SUCCESS'));
        newToastNotification.setMessage(this.translate.instant('DUPLICATE_LEAVING_CERTIFICATE_GENERATED_SUCCESSFULLY'));
        newToastNotification.openToastNotification$();
      }); 
	 }
    });
    
  }

  anyDocGenerated(item : any){
     if(this.leavingCertificateList && this.leavingCertificateList.filter(x=> (x.statusId == 1 || x.statusId == 0)).length > 0){
      return true;
     }
     else{
      return false;
     }
  }
  checkAnyDuplicateLCGiven(){
    if(this.leavingCertificateList && this.leavingCertificateList.filter(x=> (x.statusId == 3 || x.statusId == 2)).length > 0){
      return true;
     }
     else{
      return false;
     }
  }
  resetSelectList(f : any, item : string){
    if(f[item]?.getRawValue() == "null"){
      f[item]?.setValue(null); 
      return;
    }
  }

  editStudent():void{
    
        
  }

  viewLC() {
    debugger
    this.router.navigate(['student-certificates/student-leaving-certificate/view-history-leavingcertificate']);
  }

}
