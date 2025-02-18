import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { get } from 'jquery';
import { Subject } from 'rxjs';
import { CBSE_ExamResultDto, CBSE_ExamResultRequestDto, CBSE_ExamResultServiceProxy, DatatableResponseModel, Division, ExamResultResponseDto, Grade, GradeDivisionMasterDto, ICBSE_ExamResultRequestDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
import { AddCbseExamResultComponent } from '../add-cbse-exam-result/add-cbse-exam-result.component';

@Component({
  selector: 'app-cbse-exam-result',
  templateUrl: './cbse-exam-result.component.html',
  styleUrls: ['./cbse-exam-result.component.scss']
})
export class CbseExamResultComponent {
  examResultForm: FormGroup;
  saveexamResultForm: FormGroup;
  submitted = false;
  academicYearId: number;
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  examResultGridData: CBSE_ExamResultDto[] = [];
  examNameList:any;
  subjectNameList:any;
  userId: number;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  gradeId: any;
  divisionId: any;
  examMasterId:any;
  subjectMasterId:any;
  errorMessage:string;
  isAccess: boolean = true;
  roleId: number;
  dtTrigger: Subject<any> = new Subject();
  studentList:any[]=[];
  markGradeList:any;
  examResultList:CBSE_ExamResultDto[];

  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private toastEvokeService: ToastEvokeService,
    private userService: UserService,
    private http: HttpClient,
    private masterService: MasterServiceProxy,
    public cBSE_ExamResultService : CBSE_ExamResultServiceProxy,
  ) { }

  ngOnInit(): void {
    this.examResultForm = this.formBuilder.group({
      academicYearId: [0],
      classId: [null, Validators.required],
      examMasterId: [null, Validators.required],
      subjectMasterId: [null, Validators.required],
    });
    const that = this;

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        stateSave: true,
        serverSide: true,
        searchDelay: 1000,
        language: {
          searchPlaceholder:this.translate.instant('SEARCH'),
          search: '<i class="bi bi-search"></i>',
          lengthMenu:this.translate.instant('SHOW_ENTRIES') + "_MENU_",
        },
        ajax: (requestListModel: any, callback : any) => {
          that.http
            .post<DatatableResponseModel>(
              environment.API_BASE_URL+"/api/CBSE_ExamResult/uspCBSE_ExamResultGridSelect",
              {getListModel:requestListModel,academicYearId:this.academicYearId, gradeId:this.gradeId,
                divisionId:this.divisionId, examMasterId:this.examMasterId, subjectMasterId:this.subjectMasterId},{}
            ).subscribe(resp => {
              
              that.examResultList = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
            });
        },order: [[ 0, "asc" ]],
        columns: [
                  { data: 'className', searchable: true, orderable: true },
                  { data: 'examName', searchable: true, orderable: true },
                  { data: 'subjectName', searchable: true, orderable: true },
                  {data:null,searchable:false,orderable:false }]
      };

    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      this.examResultForm.get('academicYearId')?.setValue(this.academicYearId);
    });
    this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe((gradeMaster: GradeDivisionMasterDto) => {
      this.gradeDropdownList = gradeMaster.grades as Grade[];
      this.divisionDropdownList = gradeMaster.divisions as Division[];
      this.divisionGradeMapping = gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
    });

    this.examResultForm.get('classId')?.valueChanges.subscribe((classId: string) => {
      if (classId) {
        const parsedClassId = parseInt(classId);
        const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedClassId);
        if (selectedClassMapping) {
          this.gradeId = selectedClassMapping.gradeId;
          this.divisionId = selectedClassMapping.divisionId;
  
          this.cBSE_ExamResultService.getExamNameList(this.academicYearId, this.gradeId, this.divisionId)
            .subscribe((result: ExamResultResponseDto) => {
              this.examNameList = result.examNameList;
              this.examResultForm.get('examMasterId')?.setValue(null);
              this.examResultForm.get('subjectMasterId')?.setValue(null);
            });
        }
      }
      else {
       this.examNameList = [];
       this.subjectNameList = [];
      }
    });
    
    this.examResultForm.get('examMasterId')?.valueChanges.subscribe((examMasterId: any) => {
      this.examMasterId = examMasterId;
      this.cBSE_ExamResultService.getSubjectNameList(this.academicYearId, examMasterId).subscribe((result: ExamResultResponseDto) => {
        this.subjectNameList = result.subjectNameList;
      });
    });
}
get examResultFormArray() {
  return this.examResultForm.get('studentLists') as FormArray;
}


ngAfterViewInit(): void {
  this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
      this.academicYearId= academicYearId as number;
      this.dtTrigger.next(null);
  });
 
}
onSearch() {
  this.submitted = true;
  if (this.examResultForm.invalid) {
    return;
  }

  const selectedClassId = this.examResultForm.get('classId')?.value;
  const parsedSelectedClassId = parseInt(selectedClassId);
  const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);
  if (selectedClassMapping) {
    this.gradeId = selectedClassMapping.gradeId;
    this.divisionId = selectedClassMapping.divisionId;
    this.examMasterId;
    this.subjectMasterId=this.examResultForm.get('subjectMasterId')?.value
  }
  else{
    this.gradeId = null;
    this.divisionId = null;
    this.examMasterId=null;
    this.subjectMasterId=null;
    
  }
  this.rerender();
}

 examResultSaveSuccessNotification() {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(this.translate.instant('EXAM_RESULT_SAVED_SUCCESSFULLY'));
  newToastNotification.openToastNotification$();
}

  get f() { return this.examResultForm.controls; }

  onReset() {
    this.submitted = false;
    this.gradeId = null;
    this.divisionId = null;
    this.examMasterId=null;
    this.subjectMasterId=null;
    this.examNameList = [];
    this.subjectNameList = [];
    this.examResultForm.reset();
    this.rerender();
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(hardClear: boolean = false): void {
    this.dtElement.dtInstance.then((dtInstance: any) => {
      if (hardClear == true) {
        dtInstance.state.clear();
      }
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }

  resetSelectList(f: any, item: string) {
    if (f[item]?.getRawValue() == "null") {
      f[item]?.setValue(null);
      return;
    }
  }

  addExamResult(examResult:CBSE_ExamResultDto){
    debugger;
    const modalRef = this.modalService.open(AddCbseExamResultComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.gradeId = examResult.gradeId;
    modalRef.componentInstance.divisionId = examResult.divisionId;
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.examMasterId = examResult.examMasterId;
    modalRef.componentInstance.subjectMasterId = examResult.subjectMasterId;
    modalRef.componentInstance.className = examResult.className;
    modalRef.componentInstance.subjectName = examResult.subjectName;
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result) => {
      if(result==true)
      {
        this.rerender();
        this.examResultSaveSuccessNotification();
      }
      
    }, (reason) => {
        
    });
  }
}
