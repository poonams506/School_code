import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashBoardServiceProxy, DashBoardStaffDetailsDto, StoppageDto, TransportServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-add-edit-stoppage',
  templateUrl: './add-edit-stoppage.component.html',
  styleUrls: ['./add-edit-stoppage.component.scss']
})
export class AddEditStoppageComponent {
  stoppageId:number;
  academicYearId:number;
  routeId:number;
  submitted:boolean=false;
  areaList:any[];
  modelRef:any;
  stoppageForm: FormGroup;
  errorMessage:string;
  constructor(  private formBuilder: FormBuilder, 
    private transportService:TransportServiceProxy,
    private userService:UserService) { 
      this.stoppageForm = this.formBuilder.group({
        stoppageId: [0],
        stoppageName: ['',Validators.required],
        orderNo:[,[Validators.required, Validators.pattern('^[0-9]*$')]],
        areaId:[,Validators.required],  
        routeName: [''],
        pickPrice:[,Validators.required],
        dropPrice:[,Validators.required],
        pickAndDropPrice:[,Validators.required],
        pickUpTime:[],
        ngbPickUpTime:[,Validators.required],
        DropPickUpTime:[],
        ngbDropPickUpTime:[,Validators.required],
        kiloMeter:[,Validators.required],
        stopLat:[''],
        stopLng:[''],
      });
    }
 

  ngOnInit(): void {
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
      this.academicYearId= academicYearId as number;
    });
    this.transportService.getAreaNameDropdown(this.academicYearId).subscribe(response=>{ 
       this.areaList=response.areaNameDropdownList;
    });
    
if (this.stoppageId > 0) {
 
  this.transportService.getStoppageSelect(this.stoppageId,this.academicYearId)
    .subscribe((result) => {
      this.stoppageForm.patchValue(result);
});
}

}

getPriceAreaChange(){
  
    let areaIdvalue=this.stoppageForm.get('areaId')?.getRawValue();
    this.transportService.getAreaSelect(areaIdvalue,this.academicYearId).subscribe(result=>{
      this.stoppageForm.get('pickPrice')?.setValue(result.pickPrice);
    this.stoppageForm.get('dropPrice')?.setValue(result.dropPrice);
    this.stoppageForm.get('pickAndDropPrice')?.setValue(result.pickAndDropPrice); 
    });
 
}
  get f() { return this.stoppageForm.controls; }

 
 
  
  saveStoppageData() {
  debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.stoppageForm.invalid) {
        return;
    }

    let stoppageDto=this.stoppageForm.getRawValue() as StoppageDto
    this.transportService.stoppageUpsert(this.academicYearId,this.routeId,stoppageDto).subscribe(data=>{
      if(data==-1){
        this.errorMessage="This order no is already used for this route "
        return;
      }   
      else{     
        this.modelRef.close(true);
      }
  });

  }
  close() {
    this.errorMessage = "";
    this.modelRef.close(false);
}
clearErrorMessage() {
  // Clear the error message when the input is cleared
  if (this.stoppageForm.get('orderNo')?.value == '') {
    this.errorMessage = '';
  }
}
preventSpaceAndDot(event: KeyboardEvent) {
  const allowedChars = /^[0-9.]$/;
  if (!allowedChars.test(event.key)) {
    event.preventDefault();
  }
}
}
