import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, lastValueFrom } from 'rxjs';
import { FileChunkService } from 'src/app/services/file-chunk-service';
import { ClassTeacherDto, ClassTeacherResponseDto, ClassWiseStudentDto, ClassWiseStudentResponseDto, ClassWiseTeacherAndStudentServiceProxy, CommonDropdownSelectListItemDto, Division, Grade, GradeDivisionMasterDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SurveyDto, SurveyFileDto, SurveyQuestionDto, SurveyServiceProxy, TeacherDropdownSelectListDto } from 'src/app/services/school-api-service';
import { ISelectListItem } from 'src/app/shared/ISelectListItem';
import { environment } from 'src/environments/environment';
import { v4 as uuid} from 'uuid';
import { ICustomMediaFileBlob } from '../../homework/add-edit-homework/ICustomMediaFileBlob';

@Component({
  selector: 'app-add-edit-survey',
  templateUrl: './add-edit-survey.component.html',
  styleUrls: ['./add-edit-survey.component.scss']
})
export class AddEditSurveyComponent {
  surveyForm: FormGroup;
  errorMessage: String;
  submitted: boolean = false;
  modelRef: any;
  surveyId: number;
  academicYearId: number;
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  //minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };
  surveyToDropdownList: ISelectListItem[]=[];
  studentDropdownList:CommonDropdownSelectListItemDto[]=[];
  teacherDropdownList:TeacherDropdownSelectListDto[]=[];
  clerkDropdownList:CommonDropdownSelectListItemDto[]=[];
  cabDriverDropdownList:CommonDropdownSelectListItemDto[]=[];
  classTeacherDropdownList:ClassTeacherDto[]=[];
  public Editor = ClassicEditor;
  minDate: any; // Set minDate according to your requirement
  minEndDate: any;
  isViewMode: boolean = false;
  id:any;
  teacherId:any;
  studentId:any;
 
  selectedStudentNames:string[]=[];
  teacherStudentDropdownList:ClassWiseStudentDto[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private surveyService:SurveyServiceProxy,
    private masterService: MasterServiceProxy,
    private httpClient: HttpClient,
    private fileChunkService: FileChunkService,
    private calendar: NgbCalendar,
    private classWiseService: ClassWiseTeacherAndStudentServiceProxy,
    private el: ElementRef,
  ) {}
  

  ngOnInit(): void {
    this.surveyForm = this.formBuilder.group({
      surveyId: [0],
      surveyToType:[null,Validators.required],
      isImportant:[false],
      classId: [null],
      studentId:[null],
      teacherId:[[]],
      cabDriverId:[[]],
      clerkId:[[]],
      classTeacherId:[null],
      surveyTitle: ['', Validators.required],
      surveyDescription: [null, Validators.required],
      ngbStartDate: [null, Validators.required],
      startDate: [null],
      ngbEndDate: [null, Validators.required],
      endDate: [null],
      isPublished:[false],
      surveyTextFileArray: [[]],
      academicYearId: [null],
      surveyText:this.formBuilder.array([]),
      
    });
    this.minEndDate = null;

    this.surveyToDropdownList=[
      {id:1,value:'STUDENT'},
      {id:2,value:'CLASS'},
      {id:3,value:'TEACHER'},
      {id:4,value:'CLERK'},
      {id:5,value:'CAB_DRIVER'},
      {id:6,value:'CLASS_TEACHER'},

  ];

    this.getMasterDropdownData();
 

    this.surveyForm
    .get('surveyToType')
    ?.valueChanges.subscribe((surveyToType: string) => {
      this.applyValidationAndClearField(parseInt(surveyToType))
    });

    this.surveyForm.get('academicYearId')?.setValue(this.academicYearId);
    this.addSurveyQuestion();

     this.fetchFullNames()


  }
  addSurveyQuestion() {
    const itemFormGroup = this.formBuilder.group({
      //SurveyTextFileArray: [[]],
      surveyQuestions: [''],
    });
    this.surveyTextArray.push(itemFormGroup);
  }
 
  get surveyText() {
    let formArray = this.surveyForm.get('surveyText') as FormArray;
     return formArray.controls;
    
  }

  get surveyTextArray() {
    return this.surveyForm.get('surveyText') as FormArray;
  }
  
  patchSurveyTypeArrayValues(values: SurveyQuestionDto[]) {
    while (this.surveyTextArray.length !== 0) {
      this.surveyTextArray.removeAt(0);
    }
    values.forEach((value) => {
      const itemFormGroup = this.formBuilder.group({
       
        surveyQuestions: [value.surveyQuestions]
      });
      this.surveyTextArray.push(itemFormGroup);
    });
  }
 
  removeSurvey(index: number) {
   const surveyTextArray = this.surveyForm.get('surveyText') as FormArray;
   surveyTextArray.removeAt(index);
  }
  
 
  applyValidationAndClearField(selectedSurveyTo:number)
  {
      this.surveyForm.get('classId')?.clearValidators();
      this.surveyForm.get('classId')?.setValue([]);

      this.surveyForm.get('studentId')?.clearValidators();
      this.surveyForm.get('studentId')?.setValue([]);

      this.surveyForm.get('teacherId')?.clearValidators();
      this.surveyForm.get('teacherId')?.setValue([]);
      
      this.surveyForm.get('clerkId')?.clearValidators();
      this.surveyForm.get('clerkId')?.setValue([]);

      this.surveyForm.get('cabDriverId')?.clearValidators();
      this.surveyForm.get('cabDriverId')?.setValue([]);

      this.surveyForm.get('classTeacherId')?.clearValidators();
      this.surveyForm.get('classTeacherId')?.setValue(null);

      switch(selectedSurveyTo){
        case 1: 
         this.surveyForm.get('studentId')?.addValidators([Validators.required]);
         break;

         case 2:
          this.surveyForm.get('classId')?.addValidators([Validators.required]);
         break;

         case 3:
          this.surveyForm.get('teacherId')?.addValidators([Validators.required]);
         break;

         case 4:
           this.surveyForm.get('clerkId')?.addValidators([Validators.required]);
         break;

         case 5:
           this.surveyForm.get('cabDriverId')?.addValidators([Validators.required]);
         break;

         case 6:
          this.surveyForm.get('classTeacherId')?.addValidators([Validators.required]);
        break;
      }
      this.surveyForm.updateValueAndValidity();
      const today = new Date();
      this.minDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
      
      // Subscribe to start date changes
      this.surveyForm.get('ngbStartDate')?.valueChanges.subscribe(startDate => {
        // Update the minimum selectable end date whenever the start date changes
        this.minEndDate = startDate;
      });

      if (this.isViewMode) {
        // Disable form controls in view mode
        this.surveyForm.disable();
      }
  }
surveyTextFileArray:SurveyFileDto[];

  getMasterDropdownData() {
    if (this.surveyId > 0) {
      this.surveyService.surveySelect(this.surveyId).subscribe((result) => {
        this.surveyForm.get('surveyToType')?.setValue(result.surveyToType);
        this.surveyForm.patchValue(result);
        this.patchSurveyTypeArrayValues(result.surveyText);

        this.surveyTextFileArray=result.surveyTextFileArray;
        result.surveyTextFileArray.forEach((textfile) => {
          this.textfiles.push(
            new File([], textfile.fileName, { lastModified: -1 })
          );
        });
      });
      
    }

      forkJoin([
      this.masterService.getGradeDivisionMasterList(this.academicYearId),
      this.masterService.getStudentDropdownData(this.academicYearId),
      this.masterService.getTeacherDropdownWithoutSubject(),
      this.masterService.getCabDriverDropdownData(this.academicYearId),
      this.masterService.getClerkDropdownData(this.academicYearId),
      this.classWiseService.classTeacherSelect(this.academicYearId),

  ]).subscribe(result=>{

   

    const gradeMaster=result[0];
    this.gradeDropdownList = gradeMaster.grades as Grade[];
    this.divisionDropdownList = gradeMaster.divisions as Division[];
    this.divisionGradeMapping =
      gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];

    this.studentDropdownList=result[1].lstDropdownValues;
    this.teacherDropdownList=result[2].lstDropdownValues;
    this.cabDriverDropdownList=result[3].lstDropdownValues;
    this.clerkDropdownList=result[4].lstDropdownValues;
    this.classTeacherDropdownList=result[5].classTeacherList;
  
    
   
    });

      
      this.surveyForm.get('classTeacherId')?.valueChanges.subscribe(classTeacherId => {
        if(this.surveyForm.get('surveyToType')?.value==6 && 
        this.surveyForm.get('classTeacherId')?.valid && 
        classTeacherId){
          
          this.classWiseService
          .classWiseStudentSelect(this.academicYearId,classTeacherId)
          .subscribe(result => {
            this.teacherStudentDropdownList = result.classWiseStudentList;
          });
        }
       
      });
      
      
  }

  


  get f() {
    return this.surveyForm.controls;
  }

  async executeAsyncTasks(tasks: Array<() => Promise<any>>) {
    for (const task of tasks) {
      await task();
    }
  }
  focusToInvalidControl(formName :any){
    for (const key of Object.keys(formName.controls)) {
      if (formName.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
     }
    }
  }

  surveyUpsert() 
  {
    this.surveyForm.get('academicYearId')?.setValue(this.academicYearId);
    const formData = new FormData();
    for (let i = 0; i < this.textfiles.length; i++) {
      if (this.textfiles[i].lastModified > 0) {
        formData.append(`textfiles${i}`, this.textfiles[i]);
      } else {
        let fileDto = new SurveyFileDto();
        fileDto.fileName = this.textfiles[i].name;
        fileDto.fileType = 1;
        this.surveyForm.get('surveyTextFileArray')?.value.push(fileDto);

       

       let fileDto1 = new SurveyQuestionDto();
        const surveyTextValue = this.surveyForm.get('surveyText')?.value;
        if (surveyTextValue && surveyTextValue[i]) {
          fileDto1.surveyQuestions = surveyTextValue[i].surveyQuestions;
    
          this.surveyForm.get('surveyQuestions')?.value.push(fileDto1.surveyQuestions); // Ensure safe access to form control
        }
      }
    }
   
    let surveyTextArray = this.surveyForm.get('surveyText') as FormArray;
  surveyTextArray.controls.forEach((control, index) => {
    formData.append(`surveyText[${index}].surveyQuestions`, control.get('surveyQuestions')!.value);
  });
  formData.append(
    'classTeacherStudentId',
    JSON.stringify(this.surveyForm.get('surveyText')?.value)
  );
  formData.append(
    'surveyText',
    JSON.stringify(this.surveyForm.get('surveyText')?.value)
  );
    formData.append(
      'SurveyDetail',
      JSON.stringify(this.surveyForm.getRawValue())
    );

    this.httpClient
      .post(`${environment.API_BASE_URL}/api/Survey/SurveyUpsert`, formData)

      .subscribe((result: any) => {
        this.modelRef.close(true);
      });
        console.log('Form Data:', this.surveyForm);
  }
    
saveSurveyData() {
  this.submitted = true;
  this.surveyForm.get('surveyTextFileArray')?.setValue([]);
  this.surveyForm.get('surveyMediaFileArray')?.setValue([]);
   this.surveyForm.get('surveyQuestions')?.setValue([]);
  //  this.surveyForm.get('classTeacherStudentId')?.setValue([]);

  
  this.focusToInvalidControl(this.surveyForm);
  if (this.surveyForm.invalid) {
    return;
  }
   console.log('Form Data:', FormData);
  this.surveyUpsert();
 
}
fetchFullNames() {
  this.selectedStudentNames = this.teacherStudentDropdownList
    .filter(student => this.studentId.includes(student.studentId))
    .map(student => student.fullName);
}
  close() {
    this.errorMessage = '';
    this.modelRef.close(false);
  }

  textfiles: File[] = [];
  allowedFileFormats: string[] = ['txt', 'ppt','png','pptx', 'pdf', 'jpg', 'jpeg', 'bmp', 'xls', 'csv', 'doc', 'docx', 'txt', 'svg', 'pptx','xlsx'];
  invalidFileFormatError: string = '';

  onTextFileSelect(event: any) {

    const rejectedFiles = [];
    const validFiles =[];
  
    
    for (const file of event.rejectedFiles) {
      const fileExtension = this.getFileExtension(file.name);
  
      if (this.allowedFileFormats.includes(fileExtension)) {
        validFiles.push(file);
      } else {
        rejectedFiles.push(file);
      }
    }

    this.invalidFileFormatError = '';
    if (rejectedFiles.length > 0) {
      this.invalidFileFormatError = 'Invalid File Format';
    } else {
      this.textfiles.push(...validFiles);
    }
  }


  
getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
}
  onTextFileRemove(index: number) {
    this.textfiles.splice(index, 1);
  }

  mediafiles: ICustomMediaFileBlob[] = [];
  allowedMediaFileFormats: string[] = ['.mp4,.mp3,.wav,.mpeg,.avi'];
  invalidMediaFileFormatError: string = '';
onMediaFileSelect(event: { addedFiles: File[], rejectedFiles: File[] }) {
  
  const chunkSize = 1024 * 1024 * 25;

  if (event.rejectedFiles.length > 0){
    this.invalidMediaFileFormatError = 'Invalid File Format'
  }

  else{

  event.addedFiles.forEach((file: File) => {
      const newMediaFile: ICustomMediaFileBlob = {
        FileDetail: file,
        BlobDetail: this.fileChunkService.chunkFile(file, chunkSize),
        FilePath: window.URL.createObjectURL(file)
      };
      this.mediafiles.push(newMediaFile);
   });
}
}

  onMediaFileRemove(index: number) {
    this.mediafiles.splice(index, 1);
  }

  resetSelectList(f : any, item : string){
    if(f[item]?.getRawValue() == "null"){
      f[item]?.setValue(null); 
      return;
    }
  }

  showFile(file: File) {
    
    let url = "";
    if(file.size > 0){
      url = window.URL.createObjectURL(file);
    }
    else{
     let surveyTextFile= this.surveyTextFileArray.filter(x=>x.fileName==file.name);
      url = surveyTextFile[0].fullPath;
    }
    window.open(url, '_blank');
  }

  showMedia(file: ICustomMediaFileBlob) {
  
    const url = file.FilePath; // Use the FilePath property to get the file path
    if (url) {
      window.open(url, '_blank');
    }
  }

     // start : code for select all Class
     selectAllClass : boolean = false;
     selectAllOptionClass() {
       if(this.selectAllClass){
         const selected = this.divisionGradeMapping.map(item => item.schoolGradeDivisionMatrixId);
         this.surveyForm.get('classId')?.patchValue(selected);
       }
       else{
         this.surveyForm.get('classId')?.patchValue([]);
       }
     }
 
     checkSelectAllClass(){
       let selectedClassList= this.surveyForm.get('classId')?.getRawValue() as number[];
       if(selectedClassList.length == this.divisionGradeMapping.length){
         this.selectAllClass = true;
       }
       else{
         this.selectAllClass = false;
       }
     }
   // end : code for select all

   // start : code for select all Student
   selectAllStudent : boolean = false;
   selectAllOptionStudent() {
     if(this.selectAllStudent){
       const selected = this.studentDropdownList.map(item => item.id);
       this.surveyForm.get('studentId')?.patchValue(selected);
     }
     else{
       this.surveyForm.get('studentId')?.patchValue([]);
     }
   }

   checkSelectAllStudent(){
     let selectedClassList= this.surveyForm.get('studentId')?.getRawValue() as number[];
     if(selectedClassList.length == this.studentDropdownList.length){
       this.selectAllStudent = true;
     }
     else{
       this.selectAllStudent = false;
     }
   }
 // end : code for select all

 // start : code for select all Teacher
 selectAllTeacher : boolean = false;
 selectAllOptionTeacher() {
   if(this.selectAllTeacher){
     const selected = this.teacherDropdownList.map(item => item.teacherId);
     this.surveyForm.get('teacherId')?.patchValue(selected);
   }
   else{
     this.surveyForm.get('teacherId')?.patchValue([]);
   }
 }

 checkSelectAllTeacher(){
   let selectedClassList= this.surveyForm.get('teacherId')?.getRawValue() as number[];
   if(selectedClassList.length == this.teacherDropdownList.length){
     this.selectAllTeacher = true;
   }
   else{
     this.selectAllTeacher = false;
   }
 }
// end : code for select all

// start : code for select all Clerk
selectAllClerk : boolean = false;
selectAllOptionClerk() {
  if(this.selectAllClerk){
    const selected = this.clerkDropdownList.map(item => item.id);
    this.surveyForm.get('clerkId')?.patchValue(selected);
  }
  else{
    this.surveyForm.get('clerkId')?.patchValue([]);
  }
}

checkSelectAllClerk(){
  let selectedClassList= this.surveyForm.get('clerkId')?.getRawValue() as number[];
  if(selectedClassList.length == this.clerkDropdownList.length){
    this.selectAllClerk = true;
  }
  else{
    this.selectAllClerk = false;
  }
}
// end : code for select all

// start : code for select all Cab Driver
selectAllCabDriver : boolean = false;
selectAllOptionCabDriver() {
  if(this.selectAllCabDriver){
    const selected = this.cabDriverDropdownList.map(item => item.id);
    this.surveyForm.get('cabDriverId')?.patchValue(selected);
  }
  else{
    this.surveyForm.get('cabDriverId')?.patchValue([]);
  }
}

checkSelectAllCabDriver(){
  let selectedClassList= this.surveyForm.get('cabDriverId')?.getRawValue() as number[];
  if(selectedClassList.length == this.cabDriverDropdownList.length){
    this.selectAllCabDriver = true;
  }
  else{
    this.selectAllCabDriver = false;
  }
}



selectAllClassTeacherStudent : boolean = false;
selectAllOptionClassTeacherStudent() {
  debugger;
  if(this.selectAllClassTeacherStudent){
    const selected = this.teacherStudentDropdownList.map(item => item.studentId);
      this.surveyForm.get('studentId')?.patchValue(selected);
  }
  else{
    this.surveyForm.get('studentId')?.patchValue([]);
  }
}

checkSelectAllClassTeacherStudent(){
  debugger;
  let selectedCList= this.surveyForm.get('studentId')?.getRawValue() as number[];
  if(selectedCList.length == this.teacherStudentDropdownList.length){
    this.selectAllClassTeacherStudent = true;
  }
  else{
    this.selectAllClassTeacherStudent = false;
  }
}



// end : code for select all
}
