import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'ng2-charts';
import { AcademicYear, CBSE_AcademicAssessmentReportDto, CBSE_AcademicAssessmentReportServiceProxy, CBSE_ExamResultServiceProxy, CertificateServiceProxy, Division, ExamResultResponseDto, Grade, GradeDivisionMasterDto, MasterServiceProxy, ReportCardTemplateDropdownDto, ReportCardTempleteDropdownResponceDto, ResultTempleteReportSearchDto, ResultTempleteReportSearchResponseDto, SchoolGradeDivisionMatrixDto, StudentIdModelResponse, StudentMonthlyAttendanceDto, StudentMonthlyAttendanceResponceDto, StudentNameDto, StudentNameModelResponse } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';


@Component({
  selector: 'app-academic-assessment-report',
  templateUrl: './academic-assessment-report.component.html',
  styleUrls: ['./academic-assessment-report.component.scss']
})
export class AcademicAssessmentReportComponent {
  groupedHeadersTerm1: { [key: string]: { objectName: string; outOfMarks: number; actualMarks: number }[] } = {};
  groupedHeadersTerm2: { [key: string]: { objectName: string; outOfMarks: number; actualMarks: number }[] } = {};
  isPublished:boolean;
  selectedDate:any;
  academicAssessmentForm:FormGroup;
  academicAssessmentSubmitted=false;
  gradeDropdownList:Grade[]=[];
  divisionDropdownList:Division[]=[];
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
  studentId:number;
  examReportCardNameId:any;
  academicYearId:number;
  academicYearDropdownList:AcademicYear[];
  studentRouteDetail: StudentIdModelResponse;
  studentNames: StudentNameModelResponse;
  studentDropdownList: StudentNameDto[] = [];
  reportCardTemplateDropdownList: ReportCardTemplateDropdownDto[] = [];
  divisionId : any;
  gradeId : any;
  dropdownList = Array();
  selectedItems = Array();
  dropdownSettings = {};
  modalService: any;
  academicAssessmentReportContent : any;
  selectedOption: string = '';
  subjectNamesList1:any[]=[];
  subjectNamesList2:any[]=[];
  co_subjectNamesList1:any[]=[];
  co_subjectNamesList2:any[]=[];
  objectList1:any[]=[];
  objectList2:any[]=[];
  typeList:any[]=[];
  uniqueObjects1: any[] = [];
  uniqueObjects2: any[] = [];
  studentMonthlyAttendanceList:StudentMonthlyAttendanceDto[]=[];
  model: NgbDateStruct;
  cBSE_AcademicAssessmentReportDto: CBSE_AcademicAssessmentReportDto;
  cBSE_AcademicAssessmentExamReportDto: ResultTempleteReportSearchDto[];
  examResultListTerm2: ResultTempleteReportSearchDto[];
  reporttemplateName:string;
  items = Array();
  markGradeList:any;
  
    constructor(private academicAssessmentService:CBSE_AcademicAssessmentReportServiceProxy, 
      private certificateService:CertificateServiceProxy,
      private user:UserService,
      private masterService:MasterServiceProxy,
      public translate: TranslateService, 
      private formBuilder: FormBuilder, 
      public sharedPermissionServiceService : SharedPermissionServiceService  ,
      public cBSE_ExamResultService : CBSE_ExamResultServiceProxy,
    )  { }
  
    ngOnInit(): void {
      this.academicAssessmentForm =this.formBuilder.group({
        gradeId:[null],
        gradeName:[null],
        divisionId:[null],
        divisionName:[null],
        classId:[null, Validators.required],
        firstName:[null],
        middleName:[null],
        lastName:[null],
        studentName:[null],
        AcademicAssessmentReportType: [null],
        fullName:[null, Validators.required],
        studentId : [null],
        reportCardName:[null,Validators.required]
      });
 
      this.getMasterDropdownData();

      this.academicAssessmentForm.get('classId')?.valueChanges.subscribe((classId: string) => {
        if (!classId) {
          this.studentDropdownList = [];
          this.reportCardTemplateDropdownList = [];
          this.academicAssessmentForm.patchValue({
            gradeId: null,
            divisionId: null,
            studentId: null,
            reportCardName: null,
            fullName: null
          });
          return;
        }
    
        const parsedSelectedClassId = parseInt(classId);
        const selectedClassMapping = this.divisionGradeMapping.find(
          mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId
        );
    
        if (selectedClassMapping) {
          this.gradeId = selectedClassMapping.gradeId;
          this.divisionId = selectedClassMapping.divisionId;
    
          this.certificateService.getStudentNames(this.academicYearId, this.gradeId, this.divisionId)
            .subscribe((response) => {
              this.studentNames = response;
              this.studentDropdownList = this.studentNames.studentNames;
            });
    
          this.academicAssessmentService.reportCardTemplateDropdown(this.academicYearId, this.gradeId, this.divisionId)
            .subscribe((result: ReportCardTempleteDropdownResponceDto) => {
              this.reportCardTemplateDropdownList = result.reportCardTemplateDropdownList;
            });
    
          this.academicAssessmentForm.patchValue({
            reportCardName: null,
            studentId: null,
            fullName: null
          });
        }
      });
    }
    
    groupHeadersByExamType(): void {
      this.groupedHeadersTerm1 = this.groupItemsByType(this.cBSE_AcademicAssessmentExamReportDto, '1');
      this.groupedHeadersTerm2 = this.groupItemsByType(this.examResultListTerm2, '1');
    }
  
    private groupItemsByType(items: any[], prefix: string): { [key: string]: any[] } {
        return items
            .filter(item => item.indexNumber?.toString().startsWith(prefix))
            .reduce((acc: { [key: string]: any[] }, item) => {
                if (!acc[item.examName]) {
                    acc[item.examName] = [];
                }
                acc[item.examName].push({
                    objectName: item.objectName,
                    outOfMarks: item.outOfMarks,
                    actualMarks: item.actualMarks,
                });
                return acc;
            }, {});
    }
  
      
    get f(){return this.academicAssessmentForm.controls;}

      getMasterDropdownData(){
        this.user.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
          this.academicYearId=academicYearId as number;
          this.masterService.getAddressMasterData().subscribe(masterData=>{
            this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe((gradeMaster:GradeDivisionMasterDto)=>{
              this.gradeDropdownList=gradeMaster.grades as Grade[];
              this.divisionDropdownList=gradeMaster.divisions as Division[];
              this.divisionGradeMapping=gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
                
            });
          });
        });
    
      
      this.masterService.getAcademicYearData().subscribe(masterData=>{
        this.academicYearDropdownList = masterData.academicYears;

      });

    }

onGenerateAcademicAssessmentReport(): void {
      this.academicAssessmentSubmitted = true;
      if (this.academicAssessmentForm.invalid) {
          return;
      }
      const selectedClassId = this.academicAssessmentForm.get('classId')?.value;
      const parsedSelectedClassId = parseInt(selectedClassId);
      const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);

      if (selectedClassMapping) {
        this.gradeId = selectedClassMapping.gradeId;
        this.divisionId = selectedClassMapping.divisionId;
      }
        this.studentId = parseInt(this.academicAssessmentForm.get('fullName')?.value);
        this.examReportCardNameId = this.academicAssessmentForm.get('reportCardName')?.value;


        this.user.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
         
          this.academicYearId=academicYearId as number;
          this.academicAssessmentService.resultReportSearchSelect(this.academicYearId,this.gradeId,this.divisionId,this.studentId).subscribe((academicAssessmentReport : CBSE_AcademicAssessmentReportDto) =>{
            this.cBSE_AcademicAssessmentReportDto = academicAssessmentReport;
            });

            this.academicAssessmentService.resultTempleteReportSearchSelect(this.studentId,this.academicYearId,this.gradeId,this.divisionId,this.examReportCardNameId).subscribe((result : ResultTempleteReportSearchResponseDto) =>{
              this.cBSE_AcademicAssessmentExamReportDto = result.examResultListTerm1;
              this.examResultListTerm2 = result.examResultListTerm2;
              this.subjectNamesList1 = [
                ...new Set(
                  this.cBSE_AcademicAssessmentExamReportDto
                    .filter((item) => item.indexNumber?.toString().startsWith("1"))
                    .map((item) => item.subjectName)
                ),
              ];
              
              this.subjectNamesList2 = [
                ...new Set(
                  this.examResultListTerm2
                    .filter((item) => item.indexNumber?.toString().startsWith("1"))
                    .map((item) => item.subjectName)
                ),
              ];
              this.co_subjectNamesList1 = [
                ...new Set(
                  this.cBSE_AcademicAssessmentExamReportDto
                    .filter((item) => item.indexNumber?.toString().startsWith("2"))
                    .map((item) => ({subjectName:item.subjectName,grade:item.grade}))
                ),
              ];
              
              this.co_subjectNamesList2 = [
                ...new Set(
                  this.examResultListTerm2
                    .filter((item) => item.indexNumber?.toString().startsWith("2"))
                    .map((item) => ({subjectName:item.subjectName,grade:item.grade}))
                ),
              ];
            this.groupHeadersByExamType();
              const data =this.cBSE_AcademicAssessmentExamReportDto.map(item=>item.reportCardName);
              this.reporttemplateName=data[0];
              this.objectList1 = this.cBSE_AcademicAssessmentExamReportDto.filter((item) => item.indexNumber?.toString().startsWith("1")).map(item =>({
                subjectName: item.subjectName,
                objectName:item.objectName , 
                outOfMarks:item.outOfMarks, 
                actualMarks:item.actualMarks,
                grade:item.grade,
                examTypeName:item.examTypeName,
                examName:item.examName
              }));
              this.objectList2 = this.examResultListTerm2.filter((item) => item.indexNumber?.toString().startsWith("1")).map(item =>({
                subjectName: item.subjectName,
                objectName:item.objectName , 
                outOfMarks:item.outOfMarks, 
                actualMarks:item.actualMarks,
                grade:item.grade,
                examTypeName:item.examTypeName,
                examName:item.examName
              }));
              this.prepareUniqueObjects1();
              this.prepareUniqueObjects2();
              });
              this.academicAssessmentService.studentMonthlyAttendanceSelect(this.studentId,this.academicYearId).subscribe((result : StudentMonthlyAttendanceResponceDto) =>{
                this.studentMonthlyAttendanceList = result.studentMonthlyAttendanceList;
                });
                this.cBSE_ExamResultService.getMarkGradeList(this.academicYearId).subscribe(
                  (response: ExamResultResponseDto) => {
                    this.markGradeList = response.markGradeList.sort((a: any, b: any) => b.minMark - a.minMark);;
                  },
                );
        });
        
}

onAcadenicAssessmentReportReset(){
  this.academicAssessmentSubmitted = false;
  this.academicAssessmentForm.reset();
  this.cBSE_AcademicAssessmentExamReportDto=[];
  this.examResultListTerm2=[];
  this.objectList1=[];
  this.objectList2=[];
  this.subjectNamesList1=[];
  this.subjectNamesList2=[];
  this.markGradeList=[];
  this.typeList=[];
  this.uniqueObjects1= [];
  this.uniqueObjects2= [];
}



resetSelectList(f : any, item : string){
if(f[item]?.getRawValue() == "null"){
  f[item]?.setValue(null); 
  return;
}
}

prepareUniqueObjects1(): void {
  if (this.objectList1 && this.groupedHeadersTerm1) {
    this.uniqueObjects1 = Object.entries(this.groupedHeadersTerm1).map(
      ([examName, objects]) => {
        const uniqueObjectsForExamType = [
          ...new Map(
            objects.map((item) => [
              item.objectName,
              { objectName: item.objectName, outOfMarks: item.outOfMarks },
            ])
          ).values(),
        ];
        return { examName, uniqueObjects1: uniqueObjectsForExamType };
      }
    );
  }
}
prepareUniqueObjects2(): void {
  if (this.objectList2 && this.groupedHeadersTerm2) {
    this.uniqueObjects2 = Object.entries(this.groupedHeadersTerm2).map(
      ([examName, objects]) => {
        const uniqueObjectsForExamType = [
          ...new Map(
            objects.map((item) => [
              item.objectName,
              { objectName: item.objectName, outOfMarks: item.outOfMarks },
            ])
          ).values(),
        ];
        return { examName, uniqueObjects2: uniqueObjectsForExamType };
      }
    );
  }
}

getMarksForSubjectAndObject(subjectName: string,examName: string,objectName: string,objectList:any,): string | number {
  const record = objectList.find(
    (item:any) =>
      item.subjectName === subjectName &&
      item.examName === examName &&
      item.objectName === objectName
  );
  return record ? record.actualMarks || 0 : 0;
}

calculateTotalOutOfMarks(uniqueObjects: any[],key:string): number {
 
  return uniqueObjects.reduce((total, group) => {
  
    const groupTotal = Array.isArray(group[key])
      ? group[key].reduce(
          (groupSum: number, obj: any) => groupSum + (obj.outOfMarks || 0),
          0
        )
      : 0;
    return total + groupTotal;
  }, 0);
}

calculateSubjectTotalMarks(subjectName: string,objectList:any): number {
 
  return objectList
    .filter((item:any) => item.subjectName === subjectName)
    .reduce((total:any, item:any) => total + (item.actualMarks || 0), 0);
}

calculateReportTemplateColspan(uniqueObjects: any[],key:string): number {
  const totalObjects = uniqueObjects.reduce(
    (sum, group) => sum + (group[key]?.length || 0),
    0
  );
  return totalObjects + 2;
}
calculatePercent(totalObtained: number, totalOutOf: number):any {
  if (totalOutOf === 0) {
    return 'N/A'; 
  }
  
  const percentage = (totalObtained / totalOutOf) * 100;
  return parseFloat(percentage.toFixed(2));
}
calculateGrade(totalObtained: number, totalOutOf: number): string {
  if (totalOutOf === 0) {
    return 'N/A'; 
  }
  
  const percentage = (totalObtained / totalOutOf) * 100;
  const grade = this.markGradeList.find((grade: any) => {
    return percentage >= grade.minMark && percentage <= grade.maxMark;
  });
  return grade ? grade.grade : 'N/A';
}

calculateTotalMarks(uniqueObjects: any, objectList: any, subjectNamesList: any,key:string): number {
  let totalMarks = 0;
  if (Array.isArray(subjectNamesList) && Array.isArray(uniqueObjects)) {
    subjectNamesList.forEach((subject: any) => {
      uniqueObjects.forEach((group: any) => {
        if (Array.isArray(group[key])) {
          group[key].forEach((object: any) => {
            const marks = this.getMarksForSubjectAndObject(
              subject,
              group.examName,
              object.objectName,
              objectList
            );
            totalMarks += marks ? +marks : 0;
          });
        }
      });
    });
  }

  return totalMarks;
}

calculateSumOfOutOfMarks(group: any[], subjectNameList: any[],key:string): number {
   const totaloutof = this.calculateTotalOutOfMarks(group,key);
  return totaloutof * subjectNameList.length;
}

}
