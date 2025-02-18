import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CBSE_ExamNameResponseDto, CBSE_ExamNameSelectDto, CBSE_ExamObjectServiceProxy, CBSE_ExamReportCardNameDto, CBSE_ExamReportCardServiceProxy, CBSE_ResponseDto, Division, ExamNameRequestDto, Grade, GradeDivisionMasterDto, IExamNameRequestDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-add-edit-exam-reportcard-template',
  templateUrl: './add-edit-exam-reportcard-template.component.html',
  styleUrls: ['./add-edit-exam-reportcard-template.component.scss']
})
export class AddEditExamReportcardTemplateComponent {
  examReportCardForm: FormGroup;
  submitted: boolean = false;
  academicYearId: number;
  examList: CBSE_ExamNameSelectDto[]=[];
  termList: any[];
  modelRef: any;
  selectedExams: { [key: number]: number[] } = {};
  examReportCardNameId:number;
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  errorMessage: string = '';
  errorMessage2: string = '';
  classIds: number[] = [];
  isViewFlag:boolean=false;


  constructor(
    private formBuilder: FormBuilder,
    private cBSE_ExamObjectService: CBSE_ExamObjectServiceProxy,
    private cbse_ExamReportCardServiceProxy:CBSE_ExamReportCardServiceProxy,
    private userService: UserService,
    private masterService: MasterServiceProxy,
    public activeModal: NgbActiveModal
  ) {
    this.examReportCardForm = this.formBuilder.group({
      examReportCardNameId: [0],
      reportCardName: ['', [Validators.required,this.noWhitespaceValidator()]],
      classId: [null,Validators.required],
      description: [''],
      termId:[],
      examMasterId:[],
      // isTwoDifferentExamSection:[false],
    });
  }
  
  ngOnInit(): void {
    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      this.cBSE_ExamObjectService.getTermList().subscribe((result: CBSE_ResponseDto) => {
        this.termList = result.termList;
      });
      this.getMasterDropdownData();
    });
    this.examReportCardForm.get('classId')?.valueChanges.subscribe((selectedClassIds: number[]) => {
      this.fetchExamList(selectedClassIds);
    });
  }

  getMasterDropdownData() {
    
    this.fetchExamList(this.examReportCardForm.get('classId')?.value);

    this.masterService
      .getGradeDivisionMasterList(this.academicYearId)
      .subscribe((gradeMaster: GradeDivisionMasterDto) => {
        this.gradeDropdownList = gradeMaster.grades as Grade[];
        this.divisionDropdownList = gradeMaster.divisions as Division[];
        this.divisionGradeMapping =
          gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];

          if(this.examReportCardNameId > 0) {

            this.cbse_ExamReportCardServiceProxy.getExamReportCardSelect(this.examReportCardNameId, this.academicYearId).subscribe((result: CBSE_ExamReportCardNameDto) => {
              let classIds = result.classIds.trim().split(',').map(id => parseInt(id, 10));
              this.examReportCardForm.get('classId')?.setValue(classIds);
              let examMasterIds= result.examIds.trim().split(',').map(id => parseInt(id, 10));
              this.examReportCardForm.get('examMasterId')?.setValue(examMasterIds);
              // if(result.isTwoDifferentExamSection==true){
              //   this.isViewFlag=true;
              // }
              this.selectedExams = {};
    
          examMasterIds.forEach(examMasterId => {
            debugger;
            const exam = this.examList.find(exam=> exam.examMasterId === examMasterId);
            if (exam) {
              if (!this.selectedExams[exam.termId]) {
                this.selectedExams[exam.termId] = [];
              }
              this.selectedExams[exam.termId].push(exam.examMasterId);
            }
          });
              this.examReportCardForm.patchValue(result);
    
            });
          }
      });

    
  }

  get f() {
    return this.examReportCardForm.controls;
  }
  selectAllClass : boolean = false;
  selectAllOptionClass() {
    if(this.selectAllClass){
      const selected = this.divisionGradeMapping.map(item => item.schoolGradeDivisionMatrixId);
      this.examReportCardForm.get('classId')?.patchValue(selected);
    }
    else{
      this.examReportCardForm.get('classId')?.patchValue([]);
    }
    this.fetchExamList(this.examReportCardForm.get('classId')?.value);
  }

  checkSelectAllClass(){
   
    let selectedClassList= this.examReportCardForm.get('classId')?.getRawValue() as number[];
      
    if(selectedClassList.length == this.divisionGradeMapping.length){
      this.selectAllClass = true;
    }
    else{
      this.selectAllClass = false;
    }
  }

  saveExamReportCard(): void {
 
    this.submitted = true;

    if (this.examReportCardForm.invalid) {
      return;
    }
    const examsSelected = this.termList.some(term => 
      this.examList.some(exam => exam.termId === term.termId && 
        this.selectedExams[term.termId]?.includes(exam.examMasterId))
    );
  
    if (!examsSelected) {
      this.errorMessage2 = "PLEASE_SELECT_AT_LEAST_ONE_EXAM";
      return;
    }
    else{
      
    let examMasterDto = this.examReportCardForm.getRawValue() as any;
    this.cbse_ExamReportCardServiceProxy.examReportCardUpsert(this.academicYearId, examMasterDto).subscribe((data) => {
      if(data!=-1)
        {
          this.modelRef.close(true);
        }else
        {
          this.errorMessage= "EXAM_REPORT_CARD_NAME_EXIST";
        }
        
    });
  }
  }

  onOptionChange(termId: number, examMasterId: number, event: any) {
    if (!this.selectedExams[termId]) {
      this.selectedExams[termId] = [];
    }
    if (event.target.checked) {
      if (!this.selectedExams[termId].includes(examMasterId)) {
        this.selectedExams[termId].push(examMasterId);
      }
    } else {
      const index = this.selectedExams[termId].indexOf(examMasterId);
      if (index > -1) {
        this.selectedExams[termId].splice(index, 1);
      }
    }
      const allSelectedExamIds = Object.values(this.selectedExams).flat();
    this.examReportCardForm.get('examMasterId')?.setValue(allSelectedExamIds);
    if(allSelectedExamIds.length>0){
      this.clearErrorMessage();
    }
    //this.updateIsTwoDifferentExamSection();
  }
  
  clearErrorMessage() {
    if (this.examReportCardForm.get('reportCardName')?.value == '') {
      this.errorMessage = '';
    }
    if(this.selectedExams){
      this.errorMessage2 = '';
    }
  }

 close() {
  this.errorMessage = "";
  this.errorMessage2="";
    this.modelRef.close(false);
}
fetchExamList(selectedClassIds: number[]): void {
  debugger;
  if(selectedClassIds==null)
  {
    selectedClassIds=[];
  }
 let examNameRequestDto = ({ 
  academicYearId:this.academicYearId,
    classId: selectedClassIds as number[]
  }  as IExamNameRequestDto ) as ExamNameRequestDto;

  this.cbse_ExamReportCardServiceProxy.getExamMasterListForReport(examNameRequestDto)
    .subscribe((result: CBSE_ExamNameResponseDto) => {
      if(result){
      this.examList = result.examNameList;
      }
    });
}

noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  };
}
// updateIsTwoDifferentExamSection() {
//   debugger;
//     const terms = this.termList.map(term => term.termId);
//       const termsWithExams = Object.keys(this.selectedExams).map(Number);
    
//     const hasAllTerms = terms.every(term => termsWithExams.includes(term));
//     const bothTermsHaveExams = termsWithExams.every(term => this.selectedExams[term].length > 0);
    
//     if (hasAllTerms && bothTermsHaveExams) {
//       //this.examReportCardForm.get('isTwoDifferentExamSection')?.enable();
//       this.isViewFlag=true;
//     } else {
//       //this.examReportCardForm.get('isTwoDifferentExamSection')?.disable();
//       this.isViewFlag=false;
//     }
//   }
}


