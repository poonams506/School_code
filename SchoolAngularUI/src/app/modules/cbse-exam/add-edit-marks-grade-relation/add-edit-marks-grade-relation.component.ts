import { Component, DebugEventListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CBSE_ExamObjectServiceProxy, CBSE_MarksGradeRelationDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 



import { AbstractControl, ValidatorFn } from '@angular/forms';
@Component({
  selector: 'app-add-edit-marks-grade',
  templateUrl: './add-edit-marks-grade-relation.component.html',
})

export class AddEditMarksGradeRelationComponent implements OnInit {
  marksGradeForm: FormGroup;
  submitted: boolean = false;
  academicYearId: number;
  marksGradeRelationId: number;
  modelRef:any;
  errorMessage: string;
  message:string='';
  rangeError:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private CBSE_ExamObjectService: CBSE_ExamObjectServiceProxy,
    private userService: UserService,
    public activeModal: NgbActiveModal 
  ) {
    this.marksGradeForm = this.formBuilder.group({
      marksGradeRelationId: [0],
      maxMark: ['', Validators.required],
      minMark: ['', Validators.required],
      grade: ['', [Validators.required, Validators.pattern('^[A-Z][+ 0-9]?$')]],

      
    });
    {  };
  }

  ngOnInit(): void {
    
    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      console.log(academicYearId)
    });
  }

  get f() {
    return this.marksGradeForm.controls;
  }

  saveMarksGradeRelationData(): void {
    
    this.submitted = true;

    this.checkRangeError()
     if (this.marksGradeForm.invalid || this.rangeError) {
       return;
     }

    
    let cBSE_MarksGradeRelationDto = this.marksGradeForm.getRawValue() as CBSE_MarksGradeRelationDto;
    this.CBSE_ExamObjectService
      .cBSE_MarksGradeRelationUpsert(this.academicYearId, cBSE_MarksGradeRelationDto)
      .subscribe((data) => {
        if (data === -1) {
          this.errorMessage = "Grade already exists";
        } else if (data === -2 ) {
          this.message = "Mark range already exists";
        } else {
          this.modelRef.close(true);
        }
        
      });
  }
  clearErrorMessage() {
    if (this.marksGradeForm.get('grade')?.value == '' || this.marksGradeForm.get('maxMark')?.value == '' || (this.marksGradeForm.get('minMark')?.value == ''))   {
      this.errorMessage = '';
      this.message = '';

    }
  }

  
  removeSpaces() {
    const gradeControl = this.marksGradeForm.get('grade');
    if (gradeControl) {
      const cleanedValue = gradeControl.value.replace(/\s+/g, '');
      gradeControl.setValue(cleanedValue, { emitEvent: false });
    }
  }
  

  close(): void {
     this.errorMessage = "";
     this.modelRef.close(false);
  }

  

  checkRangeError() {
    const minMark = this.marksGradeForm.get('minMark')?.value;
    const maxMark = this.marksGradeForm.get('maxMark')?.value;
  
    if (minMark && maxMark && parseInt(maxMark, 10) < parseInt(minMark, 10)) {
      this.rangeError = true;
      this.errorMessage = "Maximum Marks cannot be less than Minimum Marks";
    } else if (parseInt(maxMark, 10) === parseInt(minMark, 10)) {
      this.rangeError = true;
      this.errorMessage = "Maximum Marks and Minimum Marks cannot be the same";
    } else {
      this.rangeError = false;
      this.errorMessage = "";
    }
  }
}


