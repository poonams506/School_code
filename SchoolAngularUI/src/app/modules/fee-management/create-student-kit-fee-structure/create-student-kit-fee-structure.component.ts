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
import { CommonDivisionWithDisabled, FeeStructureDto, FeeParticularServiceProxy, 
  SchoolGradeDivisionMatrixWithDisabledDto, 
  FeeParticularsDto, 
  MasterServiceProxy,
  SchoolGradeDivisionMatrixDto,
  StudentKitFeeParticularsDto,
  StudentKitFeeStructureDto} from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { IFeeStructureUrlDto } from '../fee-structure-url-dto.interface';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/';  
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-create-fee-structure',
  templateUrl: './create-student-kit-fee-structure.component.html',
  styleUrls: ['./create-student-kit-fee-structure.component.scss']
})
export class CreateStudentKitFeeStructureComponent implements OnInit{

  createFeeStructureMasterForm: FormGroup;
  submitted = false;
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  divisionFilteredDropdownList: CommonDivisionWithDisabled[];
  academicYearId:any;
  feeStructureRouteParameter:IFeeStructureUrlDto;
  isEditMode:boolean;

  constructor(
    public translate: TranslateService, 
    private formBuilder: FormBuilder,
    private particularService:FeeParticularServiceProxy,
    private userService:UserService,
    private masterService: MasterServiceProxy,

    private router:Router,
    private route: ActivatedRoute,
    private el: ElementRef
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
        isPublish:[false],
        sortBy:[0],
        isFeePaymentAlreadyDone:[false]
      })
    ])
  });


  

this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
  this.academicYearId= academicYearId as number;
  forkJoin([this.masterService.getGradeDivisionMasterList(this.academicYearId), this.particularService.getGradeDivisionStudentKitFeeParticularMasterList(this.academicYearId)]).subscribe(result=>{
    this.divisionGradeMapping =
        result[0].schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
        let divisionGradeMappingTemp = result[1].schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixWithDisabledDto[];
          
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
        this.divisionGradeMapping = processGradeDivisionList;
        this.createFeeStructureMasterForm.get('classId')?.setValidators([Validators.required]);
        this.createFeeStructureMasterForm.updateValueAndValidity();
      }
    
    });
  });

  this.createFeeStructureMasterForm.get('academicYearId')?.setValue(this.academicYearId);
  
});


  }

  getFeeStructureDetail(){
     this.particularService.getStudentKitFeeParticularByClassId(this.feeStructureRouteParameter.classId,this.academicYearId).subscribe(result=>{
    this.createFeeStructureMasterForm.get('classId')?.setValue(result.classId);
     this.createFeeStructureMasterForm.get('className')?.setValue(result.className);
     this.createFeeStructureMasterForm.get('isPublish')?.setValue(result.isPublish);
      
     if(result.feeParticulars && result.feeParticulars.length>0)
     {
      this.patchFeeParticularFormArrayValues(result.feeParticulars);
     }
     else
     {
      let feeParticularArray:StudentKitFeeParticularsDto[]=[];
      let feeParticularDto:StudentKitFeeParticularsDto=new StudentKitFeeParticularsDto();
      feeParticularDto.feeParticularId=0;
      feeParticularDto.particularName='';
      feeParticularDto.amount=undefined;
      feeParticularDto.isPublish=false;
      feeParticularDto.sortBy=0;
      feeParticularDto.isFeePaymentAlreadyDone=false;
      feeParticularArray.push(feeParticularDto);
      this.patchFeeParticularFormArrayValues(feeParticularArray);
     }
   


     });
}





  patchFeeParticularFormArrayValues(values: StudentKitFeeParticularsDto[]) {
   
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
    this.particularService.studentKitFeeParticularUpdate(this.createFeeStructureMasterForm.getRawValue() as StudentKitFeeStructureDto).subscribe(result=>{
      this.feeStructureUpdateSuccessNotification();
      this.router.navigate(['fee-management/view-student-kit-fee-structure']);
    });
  }
  else
  {
    this.particularService.studentKitFeeParticularInsert(this.createFeeStructureMasterForm.getRawValue() as StudentKitFeeStructureDto).subscribe(result=>{
      this.feeStructureCreateSuccessNotification();
      this.router.navigate(['fee-management/view-student-kit-fee-structure']);
   })
  }
}


feeStructureUpdateSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('FEE_STRUCTURE_DETAIL_UPDATED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}
feeStructureCreateSuccessNotification(){
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('FEE_STRUCTURE_DETAIL_CREATE_SUCCESSFULLY'));
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
