import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonDivisionWithDisabled, FeeParticularCloneDto, FeeParticularServiceProxy, Grade,
   GradeDivisionWithDisabledCommonMasterDto, SchoolGradeDivisionMatrixWithDisabledDto }
    from 'src/app/services/school-api-service';

@Component({
  selector: 'app-clone-fee-particular-structure',
  templateUrl: './clone-student-kit-fee-particular-structure.component.html',
  styleUrls: ['./clone-student-kit-fee-particular-structure.component.scss']
})
export class CloneStudentKitFeeParticularStructureComponent {
 
  constructor(  private formBuilder: FormBuilder, 
    private paticularService:FeeParticularServiceProxy) { 
      this.cloneFeeParticularForm = this.formBuilder.group({
        fromClassId:[0],
        fromClassName:[''],
        toClassId:[[],Validators.required],
        academicYearId: [null]
      });
    }
  errorMessage : String;
  submitted:boolean=false;

  cloneFeeParticularForm: FormGroup;

  modelRef:any;
  academicYearId:number;
  divisionGradeMapping:SchoolGradeDivisionMatrixWithDisabledDto[]=[];
  ngOnInit(): void {
   this.getMasterDropdownData();

  }

  get f() { return this.cloneFeeParticularForm.controls; }

  
  getMasterDropdownData() {
    this.paticularService.getGradeDivisionStudentKitFeeParticularMasterList(this.academicYearId).subscribe((gradeMaster: GradeDivisionWithDisabledCommonMasterDto) => {
      this.divisionGradeMapping = gradeMaster.schoolGradeDivisionMatrixCascadeList
        ?.filter(x => !x.isAlreadyExist) 
        .sort((a, b) => {
          const [numA, alphaA] = a.className.split('-');
          const [numB, alphaB] = b.className.split('-');
          if (numA !== numB) {
            return parseInt(numA) - parseInt(numB); 
          }
          if (alphaA < alphaB) return -1;
          if (alphaA > alphaB) return 1;
          return 0; 
        }) as SchoolGradeDivisionMatrixWithDisabledDto[];
    });
  }
  
  

  cloneFeeParticular()
  {
    this.submitted = true;

    // stop here if form is invalid
    if (this.cloneFeeParticularForm.invalid) {
        return;
    }

    let cloneFeeParticularDto=this.cloneFeeParticularForm.getRawValue() as FeeParticularCloneDto
    this.paticularService.studentKitFeeParticularClone(cloneFeeParticularDto).subscribe(data=>{
      this.modelRef.close(true);
    });
  }

  
 close() {
  this.errorMessage = "";
  this.modelRef.close(false);
}
}
