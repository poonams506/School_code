import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CBSE_ExamMasterDto, CBSE_ExamObjectServiceProxy, CBSE_ResponseDto, DropdownResponseDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-add-edit-exam-master',
  templateUrl: './add-edit-exam-master.component.html',
  styleUrls: ['./add-edit-exam-master.component.scss'],
})
export class AddEditExamMasterComponent implements OnInit {
  examMasterForm: FormGroup;
  submitted: boolean = false;
  academicYearId: number;
  examTypeList: any;
  termList: any[];
  modelRef: any;
  
  message:string='';
  errorMessage: string = '';
  marksGradeForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private cBSE_ExamObjectService: CBSE_ExamObjectServiceProxy,
    private userService: UserService,
    public activeModal: NgbActiveModal
  ) {
    this.examMasterForm = this.formBuilder.group({
      examMasterId: [0],
      examTypeId: [null, Validators.required],
      termId: [null, Validators.required],
      examName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    debugger;
    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
    });

    this.cBSE_ExamObjectService.getExamTypeList().subscribe((result: CBSE_ResponseDto) => {
      this.examTypeList = result.examTypeList;
    });

    this.cBSE_ExamObjectService.getTermList().subscribe((result: CBSE_ResponseDto) => {
      this.termList = result.termList;
    });
  }

  get f() {
    return this.examMasterForm.controls;
  }

  saveExamMasterData(): void {
    debugger;
    this.submitted = true;

    if (this.examMasterForm.invalid) {
      return;
    }

    let examMasterDto = this.examMasterForm.getRawValue() as CBSE_ExamMasterDto;
    this.cBSE_ExamObjectService.cBSE_ExamMasterUpsert(this.academicYearId, examMasterDto).subscribe((data) => {
      if(data!=-1)
      this.modelRef.close(true);
      else
      {
        this.errorMessage= "Exam Name already exists";
      }
     
    });
  }

  clearErrorMessage() {
    if (this.examMasterForm.get('examName')?.value == '') {
      this.errorMessage = '';
    }
  }

   
  removeSpaces(): void {
    const examNameControl = this.examMasterForm.get('examName');
    if (examNameControl) {
      const cleanedValue = examNameControl.value.replace(/^\s+/g, '');
      examNameControl.setValue(cleanedValue, { emitEvent: false });
    }
  }
  
  resetSelectList(f : any, item : string){
    if(f[item]?.getRawValue() == "null"){
      f[item]?.setValue(null); 
      return;
    }
  }
  

  close(): void {
    this.modelRef.close(false);
  }
  
}


