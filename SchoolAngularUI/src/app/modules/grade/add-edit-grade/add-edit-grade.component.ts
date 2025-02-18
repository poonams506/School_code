import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GradeDto, GradeServiceProxy } from 'src/app/services/school-api-service';

@Component({
  selector: 'app-add-edit-grade',
  templateUrl: './add-edit-grade.component.html',
  styleUrls: ['./add-edit-grade.component.scss']
})
export class AddEditGradeComponent implements OnInit {

  constructor(  private formBuilder: FormBuilder, 
    private gradeService:GradeServiceProxy) { 
      this.gradeForm = this.formBuilder.group({
        gradeId: [0],
        gradeName: ['', Validators.required]
      });
    }
  errorMessage : String;
  gradeSubmitted:boolean=false;

  gradeForm: FormGroup;

  modelRef:any;

  ngOnInit(): void {
   
  }

  get f() { return this.gradeForm.controls; }

 
  clearErrorMessage() {
    
    if (this.gradeForm.get('gradeName')?.value == '') {
      this.errorMessage = '';
    }
  }

  
  
  saveGradeData() {
    
    this.gradeSubmitted = true;

    
    if (this.gradeForm.invalid) {
        return;
    }

    let gradeDto=this.gradeForm.getRawValue() as GradeDto
    this.gradeService.gradeDataUpsert(gradeDto).subscribe(data=>{
      if(data.exits!=1){
      this.modelRef.close(true);}
      else{
        this.errorMessage = "This grade is already exist";
       
      }
    });

  }

  removeSpaces(): void {
    const gradeNameControl = this.gradeForm.controls['gradeName'];
    const value = gradeNameControl.value;
    gradeNameControl.setValue(value.replace(/\s/g, '')); 
  }
  
 close() {
    this.errorMessage = "";
    this.modelRef.close(false);
}
}
