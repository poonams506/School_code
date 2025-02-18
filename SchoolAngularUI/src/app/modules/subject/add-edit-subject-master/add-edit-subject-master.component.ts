import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectMasterDto, SubjectMasterServiceProxy } from 'src/app/services/school-api-service';

@Component({
  selector: 'app-add-edit-subject-master',
  templateUrl: './add-edit-subject-master.component.html',
  styleUrls: ['./add-edit-subject-master.component.scss']
})
export class AddEditSubjectMasterComponent {
  constructor(  private formBuilder: FormBuilder, 
    private SubjectMasterService: SubjectMasterServiceProxy,) { 
      this.subjectMasterForm = this.formBuilder.group({
        subjectMasterId: [0],
        subjectName: ['', Validators.required]
      });
    }
    errorMessage : String;
  subjectSubmitted:boolean=false;

  subjectMasterForm: FormGroup;

  modelRef:any;

  ngOnInit(): void {
   
  }

  get f() { return this.subjectMasterForm.controls; }
  clearErrorMessage() {
    // Clear the error message when the input is cleared
    if (this.subjectMasterForm.get('subjectName')?.value == '') {
      this.errorMessage = '';
    }
  }
  saveSubjectMasterData() {
    this.subjectSubmitted = true;

    // stop here if form is invalid
    if (this.subjectMasterForm.invalid) {
        return;
    }

    let subjectMasterDto=this.subjectMasterForm.getRawValue() as SubjectMasterDto
    this.SubjectMasterService.subjectMasterUpsert(subjectMasterDto).subscribe(data=>{
      if(data==1){
      this.modelRef.close(true);}
      else{
        this.errorMessage = "This subject is already exist";
       
      }
    });

  }
  close() {
    this.errorMessage = "";
    this.modelRef.close(false);
}

}
