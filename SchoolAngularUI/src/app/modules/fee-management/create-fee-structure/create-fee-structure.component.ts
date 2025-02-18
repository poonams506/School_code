import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
// import library classes
import { TranslateService } from '@ngx-translate/core';
import { CommonDivisionWithDisabled, FeeStructureDto, FeeParticularServiceProxy, FeeWaiverDto, Grade, 
  GradeDivisionWithDisabledCommonMasterDto, SchoolGradeDivisionMatrixWithDisabledDto, 
  FeeParticularsDto, 
  MasterServiceProxy,
  GradeDivisionMasterDto,
  Division,
  SchoolGradeDivisionMatrixDto} from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { IFeeStructureUrlDto } from '../fee-structure-url-dto.interface';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/';  
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstallmentDetailsPopupComponent } from '../installment-details-popup/installment-details-popup.component';
// import library classes
@Component({
  selector: 'app-create-fee-structure',
  templateUrl: './create-fee-structure.component.html',
  styleUrls: ['./create-fee-structure.component.scss']
})
export class CreateFeeStructureComponent implements OnInit{

  createFeeStructureMasterForm: FormGroup;
  submitted = false;
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  divisionFilteredDropdownList: CommonDivisionWithDisabled[];
  academicYearId:any;
  feeStructureRouteParameter:IFeeStructureUrlDto;
  isEditMode:boolean;
  installmentDetails : FeeWaiverDto[]=[];

  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder,
    private particularService:FeeParticularServiceProxy,
    private userService:UserService,
    private masterService: MasterServiceProxy,

    private router:Router,
    private route: ActivatedRoute,
    private el: ElementRef,
    private modalService1: NgbModal,
  ) {

  }

  ngOnInit(): void {
    
    this.createFeeStructureMasterForm = this.formBuilder.group({
      academicYearId:[null],
      classId: [[]],
      className:[''],
      isPublish:[false],
      feeParticulars:this.formBuilder.array([this.formBuilder.group({
        feeParticularId:[0],
        particularName: ['',Validators.required],
        amount: [null,[Validators.required,RxwebValidators.range({minimumNumber:0,maximumNumber:100000000})]],
        isDiscountApplicable:[true],
        isRTEApplicable:[false],
        isPublish:[false],
        sortBy:[0],
        isFeePaymentAlreadyDone:[false]
      })
    ]),
      feeParticularWaiverMappings:this.formBuilder.array([]),
  });



this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
  this.academicYearId= academicYearId as number;
  this.masterService
    .getGradeDivisionMasterList(this.academicYearId)
    .subscribe((gradeMaster: GradeDivisionMasterDto) => {
      this.divisionGradeMapping =
        gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
        this.particularService.getGradeDivisionFeeParticularMasterList(this.academicYearId).subscribe((gradeMaster:GradeDivisionWithDisabledCommonMasterDto)=>{
         let divisionGradeMappingTemp = gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixWithDisabledDto[];
          
          let processGradeDivisionList : SchoolGradeDivisionMatrixDto[]=[];
          this.divisionGradeMapping.forEach(mainDDL => {
              let divisionMapping=divisionGradeMappingTemp.filter(x=>x.schoolGradeDivisionMatrixId===mainDDL.schoolGradeDivisionMatrixId);
              if(divisionMapping && divisionMapping.length>0){
                if(!divisionMapping[0].isAlreadyExist){
                  processGradeDivisionList.push(mainDDL);
                }
              }
      });
     
      this.route.params.subscribe((data:any) =>{
        const queryParamValue = data.feeStructureRouteParameter; 
        if(queryParamValue){
          let decryptedString=CryptoJS.AES.decrypt(queryParamValue,environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
          this.feeStructureRouteParameter=JSON.parse(decryptedString) as IFeeStructureUrlDto;
          this.getFeeStructureDetail();
          this.isEditMode=true;
        
        }else{
          this.isEditMode=false;
          this.getWaiverMasterData();
          this.divisionGradeMapping = processGradeDivisionList;
          this.createFeeStructureMasterForm.get('classId')?.setValidators([Validators.required]);
          this.createFeeStructureMasterForm.updateValueAndValidity();
        }
      
      });
    });
 
  })

  this.createFeeStructureMasterForm.get('academicYearId')?.setValue(this.academicYearId);
  
});


  }

  getFeeStructureDetail(){
     this.particularService.getFeeParticularSelect(this.feeStructureRouteParameter.classId,this.academicYearId).subscribe(result=>{
    this.installmentDetails = result.installmentDetails!;
    this.createFeeStructureMasterForm.get('classId')?.setValue(result.classId);
     this.createFeeStructureMasterForm.get('className')?.setValue(result.className);
     this.createFeeStructureMasterForm.get('isPublish')?.setValue(result.isPublish);
      if(result.feeParticularWaiverMappings){
        this.patchFeeWaiverFormArrayValues(result.feeParticularWaiverMappings);
      }
     if(result.feeParticulars && result.feeParticulars.length>0)
     {
      this.patchFeeParticularFormArrayValues(result.feeParticulars);
     }
     else
     {
      let feeParticularArray:FeeParticularsDto[]=[];
      let feeParticularDto:FeeParticularsDto=new FeeParticularsDto();
      feeParticularDto.feeParticularId=0;
      feeParticularDto.particularName='';
      feeParticularDto.amount=undefined;
      feeParticularDto.isDiscountApplicable=true;
      feeParticularDto.isRTEApplicable=false,
      feeParticularDto.isPublish=false;
      feeParticularDto.sortBy=0;
      feeParticularDto.isFeePaymentAlreadyDone=false;
      feeParticularArray.push(feeParticularDto);
      this.patchFeeParticularFormArrayValues(feeParticularArray);
     }
   


     });
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



  getWaiverMasterData(){
    this.particularService.getAllApplicableWaiverData(this.academicYearId).subscribe(data=>{
      this.patchFeeWaiverFormArrayValues(data.feeWaivers);
      this.installmentDetails = data.installmentDetails;
    })
  }

  patchFeeWaiverFormArrayValues(values: FeeWaiverDto[]) {
   
    // Clear the existing controls in the FormArray
    while (this.feeParticularWaiverMappingsArray.length !== 0) {
      this.feeParticularWaiverMappingsArray.removeAt(0);
    }
  
    // Iterate through the values and add them to the FormArray
    values.forEach((value) => {
      const itemFormGroup = this.formBuilder.group({
        feeParticularWavierMappingId:[value.feeParticularWavierMappingId],
        feeWavierTypeId: [value.feeWavierTypeId],
        feeWavierTypeName: [value.feeWavierTypeName],
        numberOfInstallments :[value.numberOfInstallments],
        feeWavierDisplayName: [value.feeWavierDisplayName],
        discountInPercent: [value.discountInPercent],
        isAlreadyAdded: [value.isAlreadyAdded],
        isFeePaymentAlreadyDone:[value.isFeePaymentAlreadyDone],
        startDate:[new Date()],
        endDate:[value.discountEndDate]
      });
      this.feeParticularWaiverMappingsArray.push(itemFormGroup);
    });
  }
  

  patchFeeParticularFormArrayValues(values: FeeParticularsDto[]) {
   
    // Clear the existing controls in the FormArray
    while (this.particularsArray.length !== 0) {
      this.particularsArray.removeAt(0);
    }
  
    // Iterate through the values and add them to the FormArray
    values.forEach((value) => {
      const itemFormGroup = this.formBuilder.group({
        
        feeParticularId: [value.feeParticularId],
        particularName: [value.particularName,Validators.required],
        amount: [value.amount,[Validators.required,RxwebValidators.range({minimumNumber:0,maximumNumber:100000000})]],
        isDiscountApplicable: [value.isDiscountApplicable],
        isRTEApplicable: [value.isRTEApplicable],
        isFeePaymentAlreadyDone: [value.isFeePaymentAlreadyDone],
        isPublish: [value.isPublish],
        sortBy: [value.sortBy],
      });
      this.particularsArray.push(itemFormGroup);
    });
  }


    // convenience getter for easy access to form fields
    get f() { return this.createFeeStructureMasterForm.controls; }

    get particulars(){
      let formArray= this.createFeeStructureMasterForm.get('feeParticulars') as FormArray;
      return formArray.controls;
    }

    get particularsArray(){
      return this.createFeeStructureMasterForm.get('feeParticulars') as FormArray;
    
    }

    get feeParticularWaiverMappings(){
      let formArray= this.createFeeStructureMasterForm.get('feeParticularWaiverMappings') as FormArray;
      return formArray.controls;
    }

    get feeParticularWaiverMappingsArray(){
      return this.createFeeStructureMasterForm.get('feeParticularWaiverMappings') as FormArray;
    
    }

    addFeeParticular(){
      const newFormGroup = this.formBuilder.group({
        feeParticularId:[0],
        particularName: ['',Validators.required],
        amount: [null,[Validators.required,RxwebValidators.range({minimumNumber:0,maximumNumber:100000000})]],
        isDiscountApplicable:[true],
        isRTEApplicable:[false],
        isPublish:[false],
        sortBy:[0],
        isFeePaymentAlreadyDone:[false]
      });
      
      this.particularsArray.push(newFormGroup);
    }

    removeFeeParticular(index:number){
      this.particularsArray.removeAt(index);
    }
    focusToInvalidControl(formName :any){
      for (const key of Object.keys(formName.controls)) {
        if (formName.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
      }
    }
    saveFeeStructure(){
      this.submitted=true;
      this.focusToInvalidControl(this.createFeeStructureMasterForm);
    if (this.createFeeStructureMasterForm.invalid) {
      return;
  }

  if(this.feeStructureRouteParameter && this.feeStructureRouteParameter.isAlreadyExist){
    this.particularService.feeParticularUpdate(this.createFeeStructureMasterForm.getRawValue() as FeeStructureDto).subscribe(result=>{
      this.feeStructureUpdateSuccessNotification();
      this.router.navigate(['fee-management/view-fee-structure']);
    });
  }
  else
  {
    this.particularService.feeParticularInsert(this.createFeeStructureMasterForm.getRawValue() as FeeStructureDto).subscribe(result=>{
      this.feeStructureAddSuccessNotification();
      this.router.navigate(['fee-management/view-fee-structure']);
   })
  }
}


feeStructureUpdateSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('FEE_STRUCTURE_DETAIL_UPDATED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}
feeStructureAddSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('FEE_STRUCTURE_DETAIL_ADEDED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}
resetSelectList(f : any, item : string){
  if(f[item]?.getRawValue() == "null"){
    f[item]?.setValue(null); 
    return;
  }
}
onAmountInput(event: any) {
  event.target.value = event.target.value.replace(/[^0-9.]/g, '');

  const dotIndex = event.target.value.indexOf('.');
  if (dotIndex !== -1) {
    const afterDot = event.target.value.substring(dotIndex + 1);
    if (afterDot.includes('.')) {
      event.target.value = event.target.value.substring(0, dotIndex + 1) + afterDot.replace('.', '');
    }
  }
}
}
