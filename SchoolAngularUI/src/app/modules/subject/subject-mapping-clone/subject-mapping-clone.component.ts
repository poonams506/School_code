import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Division, Grade, GradeDivisionMasterDto, GradeDivisionWithDisabledCommonMasterDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SchoolGradeDivisionMatrixWithDisabledDto, SubjectMappingCloneDto, SubjectMappingServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-subject-mapping-clone',
  templateUrl: './subject-mapping-clone.component.html',
  styleUrls: ['./subject-mapping-clone.component.scss']
})
export class SubjectMappingCloneComponent {

  constructor(  
     private formBuilder: FormBuilder, 
     private subjectMappingService:SubjectMappingServiceProxy,) { 
      this.cloneSubjectMappingForm = this.formBuilder.group({
        fromClassId:[0],
        fromClassName:[''],
        toClassId:[[],Validators.required],
        academicYearId: [null]
      });
    }

    errorMessage : String;
    submitted:boolean=false;
    cloneSubjectMappingForm: FormGroup;
    modelRef:any;
    fromClassName:any;
    academicYearId:number;
    fromClassId:any
    divisionGradeMapping:SchoolGradeDivisionMatrixWithDisabledDto[]=[];
  
  ngOnInit(): void {
    this.getMasterDropdownData();
  }


  get f() { return this.cloneSubjectMappingForm.controls; }

  getMasterDropdownData(){
    this.subjectMappingService.getGradeDivisionSubjectMappingMasterList(this.academicYearId).subscribe(
      (gradeMaster: GradeDivisionWithDisabledCommonMasterDto) => {
        this.divisionGradeMapping=gradeMaster.schoolGradeDivisionMatrixCascadeList
          ?.filter(x => !x.isAlreadyExist) 
          .sort((a, b) => {
            const [numA, alphaA] = a.className.split('-');
            const [numB, alphaB] = b.className.split('-');

            
            if (numA !== numB) {
              return parseInt(numA, 10) - parseInt(numB, 10);
            }

            
            if (alphaA < alphaB) return -1;
            if (alphaA > alphaB) return 1;
            return 0;
          }) as SchoolGradeDivisionMatrixWithDisabledDto[];
      },
      error => {
        console.error('Error fetching master dropdown data:', error);
        this.errorMessage = 'Failed to load data. Please try again.';
      }
    );
  }

  cloneSubjectMapping(){
    debugger;
    this.submitted = true;
    if (this.cloneSubjectMappingForm.invalid) {
        return;
    }
    let cloneSubjectMappingDto=this.cloneSubjectMappingForm.getRawValue() as SubjectMappingCloneDto
    this.subjectMappingService.subjectMappingCloneDetails(cloneSubjectMappingDto).subscribe(data=>{
      this.modelRef.close(true);
    });
  }

  
 close() {
  this.errorMessage = "";
  this.modelRef.close(false);
}
}
