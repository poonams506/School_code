import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TreeItem, TreeviewConfig, TreeviewItem } from '@zerot13/ngx-treeview';
import { ConsumerTransportMappingDto, ConsumerTransportMappingUpsertDto, IStoppageConsumerTreeviewRequestDto, StoppageConsumerTreeviewRequestDto, StoppageDto, TransportServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { ISelectListItem } from 'src/app/shared/ISelectListItem';
import { DateRangeValidator } from 'src/app/utils/date-range.validator';
@Component({
  selector: 'app-edit-stoppage-consumer',
  templateUrl: './edit-stoppage-consumer-mapping.component.html',
  styleUrls: ['./edit-stoppage-consumer-mapping.component.scss']
})
export class EditStoppageConsumerMappingComponent {
  
  academicYearId:number;
  submitted:boolean=false;
  modelRef:any;
  consumerMappingForm: FormGroup;
  stoppageDetail:StoppageDto;
  consumer:ConsumerTransportMappingDto
  constructor(  private formBuilder: FormBuilder, 
    private transportService:TransportServiceProxy,
    private userService:UserService) { 
      this.consumerMappingForm = this.formBuilder.group({
        consumers:this.formBuilder.array([])
      });
      
    }

    

  ngOnInit(): void {
   if(this.consumer){
    this.patchConsumerFormArrayValues([this.consumer]);
   }
}


  get f() { return this.consumerMappingForm.controls; }

 
  overlapTransportConsumerError:ConsumerTransportMappingDto[]=[];
  
  saveStoppageConsumerMapping() {
    this.overlapTransportConsumerError=[];
    this.submitted = true;

    // stop here if form is invalid
    if (this.consumerMappingForm.invalid) {
        return;
    }
    
    const consumerList= this.consumerMappingForm.getRawValue() as ConsumerTransportMappingUpsertDto;

    this.transportService.saveTransportConsumerList(consumerList).subscribe(result=>{
      if(!result.isSuccess)
      {
         this.overlapTransportConsumerError = result.lstOverlapPeriod;
      }
      else
      {
        this.modelRef.close(true);
      }
      
    });

  }
 close() {
    this.modelRef.close(false);
}

patchConsumerFormArrayValues(values: ConsumerTransportMappingDto[]) {
   
  // Clear the existing controls in the FormArray
  while (this.consumerMappingsArray.length !== 0) {
    this.consumerMappingsArray.removeAt(0);
  }

  // Iterate through the values and add them to the FormArray
  values.forEach((value) => {
    const itemFormGroup = this.formBuilder.group({
      transportConsumerStoppageMappingId: [value.transportConsumerStoppageMappingId],
      consumerId: [value.consumerId],
      academicYearId: [value.academicYearId],
      roleId: [value.roleId],
      userName: [{value:value.userName,disabled:true}],
      stoppageId: [value.stoppageId],
      ngbFromDate: [value.ngbFromDate,[Validators.required]],
      ngbToDate: [value.ngbToDate,[Validators.required]],
      pickDropId: [value.pickDropId,[Validators.required]],
      pickDropPrice: [value.pickDropPrice,[Validators.required]],
      fromDate: [value.fromDate],
      toDate: [value.toDate],

    }, { validator: this.DateRangeValidation('ngbFromDate', 'ngbToDate') });

    itemFormGroup.get('pickDropId')?.valueChanges.subscribe((pickDropId:any)=>{
      if(parseInt(pickDropId)==1){
        itemFormGroup.get('pickDropPrice')?.setValue(this.stoppageDetail.pickPrice);
      }else if(parseInt(pickDropId)==2){
        itemFormGroup.get('pickDropPrice')?.setValue(this.stoppageDetail.dropPrice);
      }else if(parseInt(pickDropId)==3){
        itemFormGroup.get('pickDropPrice')?.setValue(this.stoppageDetail.pickAndDropPrice);
      }

         
    });

    this.consumerMappingsArray.push(itemFormGroup);
  });
}
DateRangeValidation(fromDate: string, toDate: string) {
  return (formGroup: FormGroup) => {
    const fromDateControl = formGroup.controls[fromDate];
    const toDateControl = formGroup.controls[toDate];

    if (!fromDateControl.value || !toDateControl.value) {
      //toDateControl.setErrors(null);
    } else {
      if (new Date(fromDateControl.value.year, fromDateControl.value.month - 1, fromDateControl.value.day)
        > new Date(toDateControl.value.year, toDateControl.value.month - 1, toDateControl.value.day)) {
        toDateControl.setErrors({ dateRange: true });
      } else {
        toDateControl.setErrors(null);
      }
    }
  }
}
get consumerMappings(){
  let formArray= this.consumerMappingForm.get('consumers') as FormArray;
  return formArray.controls;
}

get consumerMappingsArray(){
  return this.consumerMappingForm.get('consumers') as FormArray;

}

resetSelectList(f : any, item : string){
  if(f[item]?.getRawValue() == "null"){
    f[item]?.setValue(null); 
    return;
  }
}


getPickDropTypeName(pickDropId:number){
  if(pickDropId==1)
 {
    return "Pickup";
 }
 else  if(pickDropId==2)
{
  return "Drop";
}
else if(pickDropId==3)
{
  return "Pickup & Drop";
}

return "";
}
}
