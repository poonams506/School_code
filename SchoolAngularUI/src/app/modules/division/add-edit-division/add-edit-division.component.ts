import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GradeServiceProxy, GradeDto, DivisionServiceProxy, DivisionDto } from 'src/app/services/school-api-service';

@Component({
  selector: 'app-add-edit-division',
  templateUrl: './add-edit-division.component.html',
  styleUrls: ['./add-edit-division.component.scss']
})
export class AddEditDivisionComponent implements OnInit {
  
  constructor(  private formBuilder: FormBuilder, 
    private divisionService:DivisionServiceProxy) { 
      this.divisionForm = this.formBuilder.group({
        divisionId: [0],
        divisionName: ['', Validators.required]
      });
    }
  errorMessage : String;
  divisionSubmitted:boolean=false;

  divisionForm: FormGroup;

  modelRef:any;

  ngOnInit(): void {
   
  }

  get f() { return this.divisionForm.controls; }

 
  clearErrorMessage() {
    
    if (this.divisionForm.get('divisionName')?.value == '') {
      this.errorMessage = '';
    }
  }

  preventSpace(event: KeyboardEvent): void {
    if (event.code === 'Space' || event.key === ' ') {
      event.preventDefault();
    }
  }
  
  
  saveDivisionData() {
    this.divisionSubmitted = true;

    
    if (this.divisionForm.invalid) {
        return;
    }

    let divisionDto=this.divisionForm.getRawValue() as DivisionDto
    this.divisionService.divisionDataUpsert(divisionDto).subscribe(data=>{
      if(data.exits!=1){
        this.modelRef.close(true);}
        else{
          this.errorMessage = "This division is already exist ";
         
        }
    });

  }
  
 close() {
    this.errorMessage = "";
    this.modelRef.close(false);
}

}
