import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { FileChunkService } from 'src/app/services/file-chunk-service';
import { CommonDropdownSelectListItemDto, Division, GalleryFileDto, GalleryMediaContentDto, GalleryServiceProxy, Grade, MasterServiceProxy, SchoolGradeDivisionMatrixDto, TeacherDropdownSelectListDto } from 'src/app/services/school-api-service';
import { ISelectListItem } from 'src/app/shared/ISelectListItem';
import { environment } from 'src/environments/environment';
import { ICustomMediaFileBlob } from '../../homework/add-edit-homework/ICustomMediaFileBlob';
import { forEach } from 'jszip';

@Component({
  selector: 'app-add-edit-gallery',
  templateUrl: './add-edit-gallery.component.html',
  styleUrls: ['./add-edit-gallery.component.scss']
})
export class AddEditGalleryComponent {
  galleryForm: FormGroup;
  errorMessage: String;
  submitted: boolean = false;
  modelRef: any;
  galleryId: number;
  academicYearId: number;
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  //minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };
  galleryToDropdownList: ISelectListItem[]=[];
  studentDropdownList:CommonDropdownSelectListItemDto[]=[];
  teacherDropdownList:TeacherDropdownSelectListDto[]=[];
  clerkDropdownList:CommonDropdownSelectListItemDto[]=[];
  cabDriverDropdownList:CommonDropdownSelectListItemDto[]=[];
  public Editor = ClassicEditor;
  minDate: any; // Set minDate according to your requirement
  minEndDate: any;
  isViewMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private galleryService: GalleryServiceProxy,
    private masterService: MasterServiceProxy,
    private httpClient: HttpClient,
    private fileChunkService: FileChunkService,
    private calendar: NgbCalendar,
    private el: ElementRef
  ) {
    
    // this.minEndDate = null;
  }
  ngOnInit(): void {
  this.galleryForm = this.formBuilder.group({
    galleryId: [0],
    galleryToType:[null,Validators.required],
    // isImportant:[false],
    classId: [null],
    studentId:[null],
    teacherId:[[]],
    cabDriverId:[[]],
    clerkId:[[]],
    galleryTitle: ['', Validators.required],
    description: [null, Validators.required],
    ngbStartDate: [null, Validators.required],
    startDate: [null],
    // ngbEndDate: [null, Validators.required],
    // endDate: [null],
    isPublished:[false],
    galleryTextFileArray: [[]],
    galleryMediaFileArray: [[]],
    academicYearId: [null],
    galleryVideoText:this.formBuilder.array([]),

  }, {
      validators: atLeastOneFieldRequiredValidator(['galleryTextFileArray', 'galleryVideoText'], this)
    });
  this.galleryToDropdownList=[
    {id:1,value:'STUDENT'},
    {id:2,value:'CLASS'},
    {id:3,value:'TEACHER'},
    {id:4,value:'CLERK'},
    {id:5,value:'CAB_DRIVER'},

];

  this.getMasterDropdownData();


  this.galleryForm
  .get('galleryToType')
  ?.valueChanges.subscribe((galleryToType: string) => {
    this.applyValidationAndClearField(parseInt(galleryToType))
  });

  this.galleryForm.get('academicYearId')?.setValue(this.academicYearId);
  this.addContentUrl();

  //  this.fetchFullNames()


}
addContentUrl() {
  const itemFormGroup = this.formBuilder.group({
    //SurveyTextFileArray: [[]],
    contentUrl: [''],
  });
  this.galleryVideoTextArray.push(itemFormGroup);
}

get galleryVideoText() {
  let formArray = this.galleryForm.get('galleryVideoText') as FormArray;
   return formArray.controls;
  
}

get galleryVideoTextArray() {
  return this.galleryForm.get('galleryVideoText') as FormArray;
}

patchGalleryTypeArrayValues(values: GalleryMediaContentDto[]) {
  while (this.galleryVideoTextArray.length !== 0) {
    this.galleryVideoTextArray.removeAt(0);
  }
  values.forEach((value) => {
    const itemFormGroup = this.formBuilder.group({
     
      contentUrl: [value.contentUrl]
    });
    this.galleryVideoTextArray.push(itemFormGroup);
  });
}

removeGalleryText(index: number) {
 const galleryTextArray = this.galleryForm.get('galleryVideoText') as FormArray;
 galleryTextArray.removeAt(index);
  }


applyValidationAndClearField(selectedGalleryTo:number)
{
    this.galleryForm.get('classId')?.clearValidators();
    this.galleryForm.get('classId')?.setValue([]);

    this.galleryForm.get('studentId')?.clearValidators();
    this.galleryForm.get('studentId')?.setValue([]);

    this.galleryForm.get('teacherId')?.clearValidators();
    this.galleryForm.get('teacherId')?.setValue([]);
    
    this.galleryForm.get('clerkId')?.clearValidators();
    this.galleryForm.get('clerkId')?.setValue([]);

    this.galleryForm.get('cabDriverId')?.clearValidators();
    this.galleryForm.get('cabDriverId')?.setValue([]);

   

    switch(selectedGalleryTo){
      case 1: 
       this.galleryForm.get('studentId')?.addValidators([Validators.required]);
       break;

       case 2:
        this.galleryForm.get('classId')?.addValidators([Validators.required]);
       break;

       case 3:
        this.galleryForm.get('teacherId')?.addValidators([Validators.required]);
       break;

       case 4:
         this.galleryForm.get('clerkId')?.addValidators([Validators.required]);
       break;

       case 5:
         this.galleryForm.get('cabDriverId')?.addValidators([Validators.required]);
       break;
    }
    this.galleryForm.updateValueAndValidity();
    const today = new Date();
    this.minDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    
    // Subscribe to start date changes
    this.galleryForm.get('ngbStartDate')?.valueChanges.subscribe(startDate => {
      // Update the minimum selectable end date whenever the start date changes
      //this.minEndDate = startDate;
    });

    if (this.isViewMode) {
      // Disable form controls in view mode
      this.galleryForm.disable();
    }
}
galleryTextFileArray:GalleryFileDto[];

getMasterDropdownData() {
  
  if (this.galleryId > 0) {
    this.galleryService.gallerySelect(this.galleryId).subscribe((result) => {
      this.galleryForm.get('galleryToType')?.setValue(result.galleryToType);
      this.galleryForm.patchValue(result);
      this.patchGalleryTypeArrayValues(result.galleryVideoText);

      this.galleryTextFileArray=result.galleryTextFileArray;
      result.galleryTextFileArray.forEach((textfile) => {
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
 
  });

    
}




get f() {
  return this.galleryForm.controls;
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

galleryUpsert() 
{
  this.galleryForm.get('academicYearId')?.setValue(this.academicYearId);
  const formData = new FormData();
  for (var i = 0; i < this.textfiles.length; i++) {
    if (this.textfiles[i].lastModified > 0) {
      formData.append(`textfiles${i}`, this.textfiles[i]);
    } else {
      let fileDto = new GalleryFileDto();
      fileDto.fileName = this.textfiles[i].name;
      fileDto.fileType = 1;
      this.galleryForm.get('galleryTextFileArray')?.value.push(fileDto);

     
      // const galleryTextArray:any[]=[];
     let fileDto1 = new GalleryMediaContentDto();
      const galleryTextValue = this.galleryForm.get('galleryVideoText')?.value;
      if (galleryTextValue && galleryTextValue[i]) {
        fileDto1.contentUrl = galleryTextValue[i].contentUrl;
  
        this.galleryForm.get('contentUrl')?.value.push(fileDto1.contentUrl); // Ensure safe access to form control
      }
    }
  }
 
  let galleryTextArray = this.galleryForm.get('galleryVideoText') as FormArray;
  galleryTextArray.controls.forEach((control, index) => {
  formData.append(`galleryVideoText[${index}].contentUrl`, control.get('contentUrl')!.value);
});


formData.append(
  'galleryVideoText',
  JSON.stringify(this.galleryForm.get('galleryVideoText')?.value)
);
  formData.append(
    'galleryDetail',
    JSON.stringify(this.galleryForm.getRawValue())
  );

  this.httpClient
    .post(`${environment.API_BASE_URL}/api/Gallery/GalleryUpsert`, formData)

    .subscribe((result: any) => {
      this.modelRef.close(true);
    });
      console.log('Form Data:', this.galleryForm);
}

  
saveGalleryData() {
this.submitted = true;
this.galleryForm.get('galleryTextFileArray')?.setValue([]);
this.galleryForm.get('galleryMediaFileArray')?.setValue([]);
 this.galleryForm.get('contentUrl')?.setValue([]);
this.focusToInvalidControl(this.galleryForm);
if (this.galleryForm.invalid) {
  return;
}
 console.log('Form Data:', FormData);
this.galleryUpsert();
}


close() {
  this.errorMessage = '';
  this.modelRef.close(false);
}

textfiles: File[] = [];
// allowedFileFormats: string[] = ['txt', 'ppt','png','pptx', 'pdf', 'jpg', 'jpeg', 'bmp', 'xls', 'csv', 'doc', 'docx', 'txt', 'svg', 'pptx','xlsx'];
allowedFileFormats: string[] = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'svg'];

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
   let galleryTextFile= this.galleryTextFileArray.filter(x=>x.fileName==file.name);
    url = galleryTextFile[0].fullPath;
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
       this.galleryForm.get('classId')?.patchValue(selected);
     }
     else{
       this.galleryForm.get('classId')?.patchValue([]);
     }
   }

   checkSelectAllClass(){
     let selectedClassList= this.galleryForm.get('classId')?.getRawValue() as number[];
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
     this.galleryForm.get('studentId')?.patchValue(selected);
   }
   else{
     this.galleryForm.get('studentId')?.patchValue([]);
   }
 }

 checkSelectAllStudent(){
   let selectedClassList= this.galleryForm.get('studentId')?.getRawValue() as number[];
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
   this.galleryForm.get('teacherId')?.patchValue(selected);
 }
 else{
   this.galleryForm.get('teacherId')?.patchValue([]);
 }
}

checkSelectAllTeacher(){
 let selectedClassList= this.galleryForm.get('teacherId')?.getRawValue() as number[];
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
  this.galleryForm.get('clerkId')?.patchValue(selected);
}
else{
  this.galleryForm.get('clerkId')?.patchValue([]);
}
}

checkSelectAllClerk(){
let selectedClassList= this.galleryForm.get('clerkId')?.getRawValue() as number[];
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
  this.galleryForm.get('cabDriverId')?.patchValue(selected);
}
else{
  this.galleryForm.get('cabDriverId')?.patchValue([]);
}
}

checkSelectAllCabDriver(){
let selectedClassList= this.galleryForm.get('cabDriverId')?.getRawValue() as number[];
if(selectedClassList.length == this.cabDriverDropdownList.length){
  this.selectAllCabDriver = true;
}
else{
  this.selectAllCabDriver = false;
}
}

openVideoLink(index: number): void {
  const videoControl = this.galleryVideoText.at(index);
  if (videoControl) {
    const contentUrl = videoControl.get('contentUrl')?.value;
    if (contentUrl) {
      let modifiedUrl = contentUrl;

      // Ensure the video link plays automatically (if supported)
      if (contentUrl.includes('youtube.com')) {
        modifiedUrl = contentUrl.includes('?') ? `${contentUrl}&autoplay=1` : `${contentUrl}?autoplay=1`;
      } else if (contentUrl.includes('vimeo.com')) {
        modifiedUrl = contentUrl.includes('?') ? `${contentUrl}&autoplay=1` : `${contentUrl}?autoplay=1`;
      }

      window.open(modifiedUrl, '_blank');
    }
  }
}


}

function atLeastOneFieldRequiredValidator(fields: string[], _this : any): any {
  return (formGroup: FormGroup): { [key: string]: any } | null => {
    // Check if at least one field has a value
    let counter = 0;
    fields.forEach(x=>{
    debugger;
      if(x == 'galleryVideoText'){
        if(formGroup.get(x)?.value && formGroup.get(x)?.value.length > 0){
          let obj = formGroup.get(x)?.value as any[];
          if(obj && obj.some(y=> y.contentUrl && y.contentUrl.trim() != '')){
            counter = 1;
          }
        }
      }
      else{
        if(_this.textfiles.length > 0){
          counter = 1;
        }
      }
    })
    return counter > 0 ? null : { 'atLeastOneFieldRequired': true };
  };
}

