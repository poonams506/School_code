import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdhocParticularMasterDto, AdhocParticularMasterServiceProxy } from 'src/app/services/school-api-service';

@Component({
  selector: 'app-add-adhoc-particular',
  templateUrl: './add-adhoc-particular.component.html',
  styleUrls: ['./add-adhoc-particular.component.scss']
})
export class AddAdhocParticularComponent {
  constructor(  private formBuilder: FormBuilder, 
    private adhocParticularMasterService:AdhocParticularMasterServiceProxy) { 
      this.particularForm = this.formBuilder.group({
        adhocParticularMasterId: [0],
        particular: ['', Validators.required]
      });
    }
  errorMessage : String;
  submitted:boolean=false;

  particularForm: FormGroup;

  modelRef:any;
  
  ngOnInit(): void {
   
  }

  get f() { return this.particularForm.controls; }

 
  clearErrorMessage() {
    // Clear the error message when the input is cleared
    if (this.particularForm.get('particular')?.value == '') {
      this.errorMessage = '';
    }
  }
  
  saveParticularData() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.particularForm.invalid) {
        return;
    }

    let adhocParticularMasterDto=this.particularForm.getRawValue() as AdhocParticularMasterDto
    this.adhocParticularMasterService.adhocParticularMasterInsert(adhocParticularMasterDto).subscribe(data=>{
      if(data.exits!=1){
      this.modelRef.close(true);}
      else{
        this.errorMessage = "This particular is already exist";
       
      }
    });

  }
 close() {
    this.errorMessage = "";
    this.modelRef.close(false);
}
}
