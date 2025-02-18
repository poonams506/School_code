import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaDto, TransportServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-add-edit-area',
  templateUrl: './add-edit-area.component.html',
  styleUrls: ['./add-edit-area.component.scss']
})
export class AddEditAreaComponent {
  areaId:number;
  academicYearId:number;
  submitted:boolean=false;
  modelRef:any;
  areaForm: FormGroup;
  constructor(  private formBuilder: FormBuilder, 
    private transportService:TransportServiceProxy,
    private userService:UserService) { 
      this.areaForm = this.formBuilder.group({
        areaId: [0],
        areaName: ['', Validators.required],
        pickPrice:[,Validators.required],
        dropPrice:[,Validators.required],
        pickAndDropPrice:[,Validators.required],
        description:['']
      });
    }
 

  ngOnInit(): void {
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
      this.academicYearId= academicYearId as number;
    });
   
  }

  get f() { return this.areaForm.controls; }

 
 
  
  saveAreaData() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.areaForm.invalid) {
        return;
    }

    let areaDto=this.areaForm.getRawValue() as AreaDto
    this.transportService.areaUpsert(this.academicYearId,areaDto).subscribe(data=>{
              this.modelRef.close(true);
  });

  }
 close() {
    this.modelRef.close(false);
}
}
