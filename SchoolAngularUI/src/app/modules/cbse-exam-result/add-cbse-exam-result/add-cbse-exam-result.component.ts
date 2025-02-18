import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { forEach } from 'jszip';
import { Subject } from 'rxjs';
import { CBSE_ExamResultDto, CBSE_ExamResultObjectDto, CBSE_ExamResultRequestDto, CBSE_ExamResultServiceProxy, CBSE_ExamResultStudentDto, CBSE_ExamResultUpsertListDto, ExamResultResponseDto, ICBSE_ExamResultRequestDto, MasterServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-add-cbse-exam-result',
  templateUrl: './add-cbse-exam-result.component.html',
  styleUrls: ['./add-cbse-exam-result.component.scss']
})
export class AddCbseExamResultComponent {
  examResultForm: FormGroup;
  saveexamResultForm: FormGroup;
  submitted = false;
  academicYearId: number;
  examNameList:any;
  subjectNameList:any;
  userId: number;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  examMasterId:any;
  subjectMasterId:any;
  errorMessage:string;
  isAccess: boolean = true;
  roleId: number;
  dtTrigger: Subject<any> = new Subject();
  studentList:CBSE_ExamResultStudentDto[]=[];
  objectList:CBSE_ExamResultObjectDto[]=[];
  markGradeList:any;
  gradeId: any;
  divisionId: any;
  modelRef: any;
  className: string = ''; 
  subjectName: string = ''; 

  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private toastEvokeService: ToastEvokeService,
    private userService: UserService,
    private masterService: MasterServiceProxy,
    public cBSE_ExamResultService : CBSE_ExamResultServiceProxy,
  ) { }

  ngOnInit(): void {
    this.examResultForm = this.formBuilder.group({
      academicYearId: [0],
      examResultFormArray: this.formBuilder.array([])
    });
    this.getExamResultGridList();
   
  }
  getExamResultGridList(){
    let cBSE_ExamResultRequestDto = ({
      gradeId: this.gradeId,
      divisionId: this.divisionId,
      academicYearId: this.academicYearId,
      examMasterId: this.examMasterId,
      subjectMasterId:this.subjectMasterId
    } as ICBSE_ExamResultRequestDto) as CBSE_ExamResultRequestDto;
  
  this.cBSE_ExamResultService.getExamResultGridList(cBSE_ExamResultRequestDto).subscribe(result => {
    this.studentList = result.studentList;
    this.studentList.forEach(elementStudent => {
        result.headerObjectList.forEach(mainObject =>{
            if(elementStudent.objectList.filter(x=>x.examObjectId == mainObject.examObjectId).length == 0){
              let customEmptyObject = new CBSE_ExamResultObjectDto();
              customEmptyObject.examObjectId = mainObject.examObjectId;
              customEmptyObject.outOfMarks = mainObject.outOfMarks;
              elementStudent.objectList.push(customEmptyObject);
            }
        });
    });
    this.objectList = result.headerObjectList;
    this.cBSE_ExamResultService.getMarkGradeList(this.academicYearId).subscribe(
      (response: ExamResultResponseDto) => {
        this.markGradeList = response.markGradeList;
      },
    );
  });
}

  get examResultFormArray() {
    return this.examResultForm.get('studentLists') as FormArray;
  }

    get f() { return this.examResultForm.controls; }

    calculateTotal(object: CBSE_ExamResultObjectDto[]): number | null {
      if (!object || object.length === 0) {
        return null; // Return null if no data exists
      }
      const totalValue = object.reduce((acc, item) => {
        const actualMarks = item.actualMarks != null ? Number(item.actualMarks) : 0;
        return acc + actualMarks;
      }, 0);
      return totalValue > 0 ? totalValue : null; // Return null if the total is zero
    }
    
  
    calculatePercentage(object: CBSE_ExamResultObjectDto[]): number | null {
      const totalValue = object.reduce((acc, item) => acc + (item.actualMarks || 0), 0);
      const totalOutOfValue = object.reduce((acc, item) => acc + (item.outOfMarks || 0), 0);
    
      if (totalOutOfValue === 0 || totalValue === 0) {
        return null; // Return null if there is no data or the total is zero
      }
    
      return (totalValue / totalOutOfValue) * 100;
    }
    
    
    calculateGrade(object: CBSE_ExamResultObjectDto[]): string {
      const percentage = this.calculatePercentage(object);

      if(percentage == null){
        return'';
      }
      if (!this.markGradeList || this.markGradeList.length === 0) {
        return ''; 
      }
      const grade = this.markGradeList.find((grade: any) => {
        return percentage >= grade.minMark && percentage <= grade.maxMark;
      });
      return grade ? grade.grade : '';
    }
    checkValidateMark(object: any): boolean {
      if (object.actualMarks > object.outOfMarks) {
        return false;
      }
      return true; 
    }
    
    saveExamResults() {
      
      this.submitted = true;
      const examResultList: CBSE_ExamResultUpsertListDto[] = [];
      let hasInvalidMarks = false; 
      this.studentList.forEach(student => {
        student.objectList.forEach(object => {
          if (!this.checkValidateMark(object)) {
            hasInvalidMarks = true; 
          } 
        });
      });
      if (hasInvalidMarks) {
        this.saveUnSuccessNotification();
        return;  
      }
      this.studentList.forEach(student => {
        
        student.objectList.forEach(object => {
          const result = new CBSE_ExamResultUpsertListDto();
          result.studentId = student.studentId;
          result.examObjectId = object.examObjectId;
          result.actualMarks = object.actualMarks;
          result.outOfMarks = object.outOfMarks;
          result.totalMarks = this.calculateTotal(student.objectList) ?? 0;
          result.percentage = this.calculatePercentage(student.objectList) ?? 0;
          result.grade = this.calculateGrade(student.objectList);
          
          examResultList.push(result);
        });
      });
    
      
      let cBSE_ExamResultDto = new CBSE_ExamResultDto();
      cBSE_ExamResultDto.academicYearId = this.academicYearId;
      cBSE_ExamResultDto.cbsE_ExamResultList = examResultList;
    
      
      this.cBSE_ExamResultService.examResultUpsert(cBSE_ExamResultDto).subscribe(
        response => {
          this.modelRef.close(true);
        },
      );
    }

saveUnSuccessNotification() {
      const title = this.translate.instant('FAILED_TO_SAVE_!');
      const message = this.translate.instant('PLEASE_CURRECT_THE_INVALID_MARKS');
      this.toastEvokeService.danger(
        title,
        message
      ).subscribe();
    }    
  
restrictInput(event: KeyboardEvent): void {
  const input = event.target as HTMLInputElement;
  if (input.value.length >= 5 && event.key !== 'Backspace') {
    event.preventDefault();
  }
}

validateMarks(student: any, object: any): void {
  const marks = student[object.objectName.toLowerCase()];
  if (marks > 999) {
    student[object.objectName.toLowerCase()] = 999; 
  } else if (marks < 0) {
    student[object.objectName.toLowerCase()] = 0; 
  }
}
    
  close(): void {
   this.modelRef.close(false);
}

}
