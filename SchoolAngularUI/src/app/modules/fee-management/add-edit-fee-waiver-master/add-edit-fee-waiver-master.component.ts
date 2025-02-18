import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators, required } from '@rxweb/reactive-form-validators';
import { forEach } from 'jszip';
import { FeeWavierTypeSelectDto, FeeWavierTypeServiceProxy, FeeWavierTypeUpsertDto,
   FeeWavierTypesInstallmentsDetailsTypeDto ,CommonSuccessResponseEnum} from 'src/app/services/school-api-service';

@Component({
  selector: 'app-add-edit-fee-waiver-master',
  templateUrl: './add-edit-fee-waiver-master.component.html',
  styleUrls: ['./add-edit-fee-waiver-master.component.scss']
})
export class AddEditFeeWaiverMasterComponent implements OnInit {

  waiverMasterForm: FormGroup;
  submitted = false;

  modelRef:any;
  errorMessage : String;
  feeWavierTypeId:number;
  academicYearId:number;

  isInstallmentUsedInFeePayment = false;
  constructor( private formBuilder: FormBuilder, private feeWavierTypeService:FeeWavierTypeServiceProxy) { }

  ngOnInit(): void {
    
    this.waiverMasterForm = this.formBuilder.group({
      feeWavierTypeId:[0],
      academicYearId:[0],
      feeWavierTypeName:['', Validators.required],
      feeWavierDisplayName:['', Validators.required],
      description:[''],
      numberOfInstallments:[null,[Validators.required,RxwebValidators.range({minimumNumber:0,maximumNumber:100})]],
      discountInPercent: [null,[Validators.required,
        RxwebValidators.range({minimumNumber:0,maximumNumber:100})]],
      latePerDayFeeInPercent: [null,[Validators.required,
        RxwebValidators.range({minimumNumber:0,maximumNumber:100})]],
      isActive:[false],
      feeWavierTypesInstallmentsDetailsTypes: this.formBuilder.array([])
  });
  this.waiverMasterForm.get('academicYearId')?.setValue(this.academicYearId);
  if(this.feeWavierTypeId>0){
    this.getFeewaiverTypeData();
  }

  this.waiverMasterForm.get('numberOfInstallments')?.valueChanges.subscribe((currentValue:any)=>{
      if(this.waiverMasterForm.get('numberOfInstallments')?.valid){
        this.patchFeeWavierTypesInstallmentFormArrayValues([]);
        for(let i=0;i<parseInt(currentValue);i++){
          this.addFeeWavierTypesInstallment();
        }
      }
  });

  this.waiverMasterForm.get('latePerDayFeeInPercent')?.valueChanges.subscribe((value) => {
    for (let index = 0; index < this.feeWavierTypesInstallmentsArray.controls.length; index++) {
      const element = this.feeWavierTypesInstallmentsArray.controls[index];
      const ctrl = element.get('ngbLateFeeStartDate');
    if (value && value != 0) {
      ctrl?.setValidators([Validators.required]);
    } else {
      ctrl?.clearValidators();
      //ctrl?.setValue(null);
    }
    ctrl?.updateValueAndValidity();
    }
  });

  this.waiverMasterForm.get('discountInPercent')?.valueChanges.subscribe((value) => {
    for (let index = 0; index < this.feeWavierTypesInstallmentsArray.controls.length; index++) {
      const element = this.feeWavierTypesInstallmentsArray.controls[index];
      const ctrl = element.get('ngbDiscountEndDate');
    if (value && value != 0) {
      ctrl?.setValidators([Validators.required]);
    } else {
      ctrl?.clearValidators();
      //ctrl?.setValue(null);
    }
    ctrl?.updateValueAndValidity();
    }
  });

  }

  
  getFeewaiverTypeData(){
    this.feeWavierTypeService.getFeeWavierTypeSelect(this.feeWavierTypeId,this.academicYearId)
    .subscribe((feeWavier:FeeWavierTypeSelectDto)=>{
      this.isInstallmentUsedInFeePayment = feeWavier.isInstallmentUsedInFeePayment;
      this.waiverMasterForm.patchValue(feeWavier);
      if(feeWavier.feeWavierTypesInstallmentsDetailsTypes && feeWavier.feeWavierTypesInstallmentsDetailsTypes?.length>0){
        this.patchFeeWavierTypesInstallmentFormArrayValues(feeWavier.feeWavierTypesInstallmentsDetailsTypes);
      }
      this.waiverMasterForm.get('academicYearId')?.setValue(this.academicYearId);
      if(this.isInstallmentUsedInFeePayment == true){
        this.waiverMasterForm.get('isActive')?.disable();
        this.waiverMasterForm.get('numberOfInstallments')?.disable();
        this.waiverMasterForm.get('discountInPercent')?.disable();
        this.waiverMasterForm.get('latePerDayFeeInPercent')?.disable();
      }
    });
  }

   // convenience getter for easy access to form fields
   get f() { return this.waiverMasterForm.controls; }
  
	  
   get feeWavierTypesInstallments(){
    let formArray= this.waiverMasterForm.get('feeWavierTypesInstallmentsDetailsTypes') as FormArray;
    return formArray.controls;
  }

  get feeWavierTypesInstallmentsArray(){
    return this.waiverMasterForm.get('feeWavierTypesInstallmentsDetailsTypes') as FormArray;
  
  }
  
   patchFeeWavierTypesInstallmentFormArrayValues(values: FeeWavierTypesInstallmentsDetailsTypeDto[]) {
 
  // Clear the existing controls in the FormArray
  while (this.feeWavierTypesInstallmentsArray.length !== 0) {
    this.feeWavierTypesInstallmentsArray.removeAt(0);
  }
   
  // Iterate through the values and add them to the FormArray
  values.forEach((value) => {
    const valueLateFee = this.waiverMasterForm.get('latePerDayFeeInPercent')?.value;
  const valueDiscountInPer = this.waiverMasterForm.get('discountInPercent')?.value;
  if(valueLateFee && valueLateFee != 0 && valueDiscountInPer && valueDiscountInPer != 0){
    const itemFormGroup = this.formBuilder.group({
      feeWavierTypesInstallmentsDetailsTypeId:[value.feeWavierTypesInstallmentsDetailsTypeId],
      ngbLateFeeStartDate: [value.ngbLateFeeStartDate, Validators.required],
      ngbDiscountEndDate: [value.ngbDiscountEndDate, Validators.required],
      lateFeeStartDate: [value.lateFeeStartDate],
      discountEndDate: [value.discountEndDate],
    });
    this.feeWavierTypesInstallmentsArray.push(itemFormGroup);
  }
  else if(valueLateFee && valueLateFee != 0 && (!valueDiscountInPer || valueDiscountInPer == 0)){
    const itemFormGroup = this.formBuilder.group({
      feeWavierTypesInstallmentsDetailsTypeId:[value.feeWavierTypesInstallmentsDetailsTypeId],
      ngbLateFeeStartDate: [value.ngbLateFeeStartDate, Validators.required],
      ngbDiscountEndDate: [value.ngbDiscountEndDate],
      lateFeeStartDate: [value.lateFeeStartDate],
      discountEndDate: [value.discountEndDate],
    });
    this.feeWavierTypesInstallmentsArray.push(itemFormGroup);
  }
  else if(valueDiscountInPer && valueDiscountInPer != 0 && (!valueLateFee || valueLateFee == 0)){
    const itemFormGroup = this.formBuilder.group({
      feeWavierTypesInstallmentsDetailsTypeId:[value.feeWavierTypesInstallmentsDetailsTypeId],
      ngbLateFeeStartDate: [value.ngbLateFeeStartDate],
      ngbDiscountEndDate: [value.ngbDiscountEndDate, Validators.required],
      lateFeeStartDate: [value.lateFeeStartDate],
      discountEndDate: [value.discountEndDate],
    });
    this.feeWavierTypesInstallmentsArray.push(itemFormGroup);
  }
  else {
    const itemFormGroup = this.formBuilder.group({
      feeWavierTypesInstallmentsDetailsTypeId:[value.feeWavierTypesInstallmentsDetailsTypeId],
      ngbLateFeeStartDate: [value.ngbLateFeeStartDate],
      ngbDiscountEndDate: [value.ngbDiscountEndDate],
      lateFeeStartDate: [value.lateFeeStartDate],
      discountEndDate: [value.discountEndDate],
    });
    this.feeWavierTypesInstallmentsArray.push(itemFormGroup);
  }
    
  });
}

 addFeeWavierTypesInstallment(){
  const valueLateFee = this.waiverMasterForm.get('latePerDayFeeInPercent')?.value;
  const valueDiscountInPer = this.waiverMasterForm.get('discountInPercent')?.value;
  if(valueLateFee && valueLateFee != 0 && valueDiscountInPer && valueDiscountInPer != 0){
    const newFormGroup = this.formBuilder.group({
      feeWavierTypesInstallmentsDetailsTypeId:[0],
      ngbLateFeeStartDate: [null,Validators.required],
      ngbDiscountEndDate: [null,Validators.required],
      lateFeeStartDate: [null],
      discountEndDate: [null]
    });
    
    this.feeWavierTypesInstallmentsArray.push(newFormGroup);
  }
  else if(valueLateFee && valueLateFee != 0 && (!valueDiscountInPer || valueDiscountInPer == 0)){
    const newFormGroup = this.formBuilder.group({
      feeWavierTypesInstallmentsDetailsTypeId:[0],
      ngbLateFeeStartDate: [null, Validators.required],
      ngbDiscountEndDate: [null],
      lateFeeStartDate: [null],
      discountEndDate: [null]
    });
    
    this.feeWavierTypesInstallmentsArray.push(newFormGroup);
  }
  else if(valueDiscountInPer && valueDiscountInPer != 0 && (!valueLateFee || valueLateFee == 0)){
    const newFormGroup = this.formBuilder.group({
      feeWavierTypesInstallmentsDetailsTypeId:[0],
      ngbLateFeeStartDate: [null],
      ngbDiscountEndDate: [null, Validators.required],
      lateFeeStartDate: [null],
      discountEndDate: [null]
    });
    
    this.feeWavierTypesInstallmentsArray.push(newFormGroup);
  }
  else {
    const newFormGroup = this.formBuilder.group({
      feeWavierTypesInstallmentsDetailsTypeId:[0],
      ngbLateFeeStartDate: [null],
      ngbDiscountEndDate: [null],
      lateFeeStartDate: [null],
      discountEndDate: [null]
    });
    
    this.feeWavierTypesInstallmentsArray.push(newFormGroup);
  }
    
  }

  removeFeeWavierTypesInstallment(index:number){
    this.feeWavierTypesInstallmentsArray.removeAt(index);
  }


saveFeeWavier() {
  this.errorMessage = '';
  this.submitted = true;

  // stop here if form is invalid
  if (this.waiverMasterForm.invalid) {
      return;
  }

  let wavierDto=this.waiverMasterForm.getRawValue() as FeeWavierTypeUpsertDto;
 
  this.feeWavierTypeService.feeWavierTypeUpsert(wavierDto).subscribe(data=>{
    if(data.statusCode== CommonSuccessResponseEnum.SUCCESS || data.statusCode== CommonSuccessResponseEnum.FEE_WAVIER_ALREADY_USED){
      this.modelRef.close(true);
    }
    else{
      this.errorMessage = data.message;
    }
   
  });

}


onReset() {
    this.errorMessage = "";
    this.submitted = false;
    this.waiverMasterForm.reset();
}


close() {
  this.errorMessage = "";
  this.modelRef.close(null);
}


}
