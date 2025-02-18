import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { FileChunkService } from 'src/app/services/file-chunk-service';
import {
  Division,
  SchoolGradeDivisionMatrixDto,
  Grade,
  NoticeServiceProxy,
  MasterServiceProxy,
  GradeDivisionMasterDto,
  NoticeFileDto,
  CommonDropdownSelectListItemDto,
  TeacherDropdownSelectListDto,
  MediaContentType,
  ProjectMediaContentDto,
} from 'src/app/services/school-api-service';
import { environment } from 'src/environments/environment';
import { ICustomMediaFileBlob } from '../../homework/add-edit-homework/ICustomMediaFileBlob';
import { v4 as uuid} from 'uuid';
import { ISelectListItem } from 'src/app/shared/ISelectListItem';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-edit-notice',
  templateUrl: './add-edit-notice.component.html',
  styleUrls: ['./add-edit-notice.component.scss'],
})
export class AddEditNoticeComponent {
  noticeForm: FormGroup;
  errorMessage: String;
  submitted: boolean = false;
  modelRef: any;
  noticeId: number;
  academicYearId: number;
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  //minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };
  noticeToDropdownList: ISelectListItem[]=[];
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
    private noticeService: NoticeServiceProxy,
    private masterService: MasterServiceProxy,
    private httpClient: HttpClient,
    private fileChunkService: FileChunkService,
    private calendar: NgbCalendar,
    private el: ElementRef
  ) {
    this.noticeForm = this.formBuilder.group({
      noticeId: [0],
      noticeToType:[null,Validators.required],
      isImportant:[false],
      classId: [null],
      studentId:[null],
      teacherId:[[]],
      cabDriverId:[[]],
      clerkId:[[]],
      noticeTitle: ['', Validators.required],
      noticeDescription: [null, Validators.required],
      ngbStartDate: [null, Validators.required],
      startDate: [null],
      ngbEndDate: [null, Validators.required],
      endDate: [null],
      isPublished:[false],
      noticeTextFileArray: [[]],
      noticeMediaFileArray: [[]],
      academicYearId: [null],
      videoText: this.formBuilder.array([])
    });
    this.minEndDate = null;
  }

  ngOnInit(): void {

    this.noticeToDropdownList=[
      {id:1,value:'STUDENT'},
      {id:2,value:'CLASS'},
      {id:3,value:'TEACHER'},
      {id:4,value:'CLERK'},
      {id:5,value:'CAB_DRIVER'},
  ];

    this.getMasterDropdownData();

    this.noticeForm
    .get('noticeToType')
    ?.valueChanges.subscribe((noticeToType: string) => {
      this.applyValidationAndClearField(parseInt(noticeToType))
    });

    this.noticeForm.get('academicYearId')?.setValue(this.academicYearId);
    this.addVideoText();
    const today = new Date();
      this.minDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
      
      // Subscribe to start date changes
      this.noticeForm.get('ngbStartDate')?.valueChanges.subscribe(startDate => {
        // Update the minimum selectable end date whenever the start date changes
        this.minEndDate = startDate;
      });
  }

 
  applyValidationAndClearField(selectedNoticeTo:number)
  {
      this.noticeForm.get('classId')?.clearValidators();
      this.noticeForm.get('classId')?.setValue([]);

      this.noticeForm.get('studentId')?.clearValidators();
      this.noticeForm.get('studentId')?.setValue([]);

      this.noticeForm.get('teacherId')?.clearValidators();
      this.noticeForm.get('teacherId')?.setValue([]);
      
      this.noticeForm.get('clerkId')?.clearValidators();
      this.noticeForm.get('clerkId')?.setValue([]);

      this.noticeForm.get('cabDriverId')?.clearValidators();
      this.noticeForm.get('cabDriverId')?.setValue([]);

      switch(selectedNoticeTo){
        case 1: 
         this.noticeForm.get('studentId')?.addValidators([Validators.required]);
         break;

         case 2:
          this.noticeForm.get('classId')?.addValidators([Validators.required]);
         break;

         case 3:
          this.noticeForm.get('teacherId')?.addValidators([Validators.required]);
         break;

         case 4:
           this.noticeForm.get('clerkId')?.addValidators([Validators.required]);
         break;

         case 5:
           this.noticeForm.get('cabDriverId')?.addValidators([Validators.required]);
         break;
      }
      this.noticeForm.updateValueAndValidity();
      
      if (this.isViewMode) {
        this.noticeForm.disable();
      }
  }
noticeTextFileArray:NoticeFileDto[];
  getMasterDropdownData() {
    debugger;
    
    this.masterService
      .getGradeDivisionMasterList(this.academicYearId)
      .subscribe((gradeMaster: GradeDivisionMasterDto) => {
        this.gradeDropdownList = gradeMaster.grades as Grade[];
        this.divisionDropdownList = gradeMaster.divisions as Division[];
        this.divisionGradeMapping =
          gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
        if (this.noticeId > 0) {
          this.noticeService.noticeSelect(this.noticeId).subscribe((result) => {
            this.noticeForm.patchValue(result);
            this.patchVideoTextValues(result.videoText);

           

            this.noticeTextFileArray=result.noticeTextFileArray;
            result.noticeTextFileArray.forEach((textfile) => {
              this.textfiles.push(
                new File([], textfile.fileName, { lastModified: -1 })
              );
            });

            // result.noticeMediaFileArray.forEach((textfile) => {
            //   this.mediafiles.push({
            //     FileDetail: new File([], textfile.fileName, {
            //       lastModified: -1,
            //     }),
            //     BlobDetail: [],
            //     FilePath:environment.API_BASE_URL+'/Uploads/notice/mediafiles/'+textfile.fileName
            //   });
            // });
            
          });
        }
      });

      this.masterService.getStudentDropdownData(this.academicYearId).subscribe(result=>{
         this.studentDropdownList=result.lstDropdownValues;
      });

      this.masterService.getTeacherDropdownWithoutSubject().subscribe(result=>{
        this.teacherDropdownList=result.lstDropdownValues;
      });
  
      this.masterService.getCabDriverDropdownData(this.academicYearId).subscribe(result=>{
        this.cabDriverDropdownList=result.lstDropdownValues;
      });

      this.masterService.getClerkDropdownData(this.academicYearId).subscribe(result=>{
        this.clerkDropdownList=result.lstDropdownValues;
      });

  }


  get f() {
    return this.noticeForm.controls;
  }

  async uploadChunk(
    fileChunk: Blob,
    filename: string,
    chunkIndex: number,
    totalChunks: number
  ) {
    const formData = new FormData();
    formData.append('fileChunk', fileChunk, `${filename}.part${chunkIndex}`);
    formData.append('filename', filename);
    formData.append('chunkIndex', chunkIndex.toString());
    formData.append('totalChunks', totalChunks.toString());

    try {
      const response = this.httpClient.post<any>(
        `${environment.API_BASE_URL}/api/Notice/UploadNoticeMediaChunk`,
        formData
      );
      await lastValueFrom(response);
      console.log(`Uploaded chunk ${chunkIndex + 1}/${totalChunks}`);
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
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

  handleNoticeMediaUpload(){
    debugger;
    if (this.mediafiles.length > 0) {
      const asynTasks: any = [];
      this.mediafiles.forEach(
        (mediaFile: ICustomMediaFileBlob, index: number) => {
          if (mediaFile.BlobDetail.length > 0) {
            let splittedFileName = mediaFile.FileDetail.name.split('.');
            let extension = splittedFileName[splittedFileName.length - 1];
            let fileName = uuid() + '.' + extension;
            let fileDto = new NoticeFileDto();
            fileDto.fileName = fileName;
            fileDto.fileType = 2;
            this.noticeForm.get('noticeMediaFileArray')?.value.push(fileDto);

            mediaFile.BlobDetail.forEach(
              async (blobData: Blob, currentIndex: number) => {
                asynTasks.push(
                  async () =>
                    await this.uploadChunk(
                      blobData,
                      fileName,
                      currentIndex,
                      mediaFile.BlobDetail.length
                    )
                );
              }
            );
          } else {
            let fileDto = new NoticeFileDto();
            fileDto.fileName = mediaFile.FileDetail.name;
            fileDto.fileType = 2;
            this.noticeForm.get('noticeMediaFileArray')?.value.push(fileDto);
          }
        }
      );
      if (asynTasks.length > 0) {
        this.executeAsyncTasks(asynTasks)
          .then(() => {
            console.log('All tasks executed sequentially');
            this.noticeUpsert();
          })
          .catch((err) => {
            console.error('An error occurred:', err);
          });
      } else {
        this.noticeUpsert();
      }
    } else {
      this.noticeUpsert();
    }
  }

 saveNoticeData() {
  debugger;
    this.submitted = true;
    this.noticeForm.get('noticeTextFileArray')?.setValue([]);
    this.noticeForm.get('noticeMediaFileArray')?.setValue([]);
    this.noticeForm.get('contentUrl')?.setValue([]);

    this.focusToInvalidControl(this.noticeForm);
    if (this.noticeForm.invalid) {
      return;
    }
    this.noticeUpsert();
   
  }

  noticeUpsert() 
  {
    debugger;
    this.noticeForm.get('academicYearId')?.setValue(this.academicYearId);
    const formData = new FormData();
    for (var i = 0; i < this.textfiles.length; i++) {
      if (this.textfiles[i].lastModified > 0) {
        formData.append(`textfiles${i}`, this.textfiles[i]);
      } else {
        let fileDto = new NoticeFileDto();
        fileDto.fileName = this.textfiles[i].name;
        fileDto.fileType = 1;
        this.noticeForm.get('noticeTextFileArray')?.value.push(fileDto);

        const contentUrlsArray: any[] = [];
        let fileDto1 = new ProjectMediaContentDto();
        const videoTextValue = this.noticeForm.get('videoText')?.value;
        if (videoTextValue && videoTextValue[i]) {
          fileDto1.contentUrl = videoTextValue[i].contentUrl;
    
          this.noticeForm.get('contentUrl')?.value.push(fileDto1.contentUrl); // Ensure safe access to form control
        }
        // videoTextValue.forEach((item: any) => {
        //   let fileDto1 = new ProjectMediaContentDto(); // Assuming ProjectMediaContentDto is your DTO class/interface
    
        //   // Populate fileDto1 with values from videoText item
        //   fileDto1.contentUrl = item.contentUrl; // Example: Assuming contentUrl is a field in your DTO
    
        //   // Push contentUrl into another array or field
        //   contentUrlsArray.push(fileDto1.contentUrl); // Example: Pushing contentUrl into contentUrlsArray
        // });
      }
    }

    let contentUrlsArray = this.noticeForm.get('videoText') as FormArray;
    contentUrlsArray.controls.forEach((control, index) => {
      formData.append(`videoText[${index}].contentUrl`, control.get('contentUrl')!.value);
    });

    formData.append(
      'noticeDetail',
      JSON.stringify(this.noticeForm.getRawValue())
    );
    formData.append(
      'videoText',
      JSON.stringify(this.noticeForm.get('videoText')?.value)
    );


    this.httpClient
      .post(`${environment.API_BASE_URL}/api/Notice/NoticeUpsert`, formData)

      .subscribe((result: any) => {
        this.modelRef.close(true);
      });
  }

  close() {
    this.errorMessage = '';
    this.modelRef.close(false);
  }

  textfiles: File[] = [];
  allowedFileFormats: string[] = ['txt', 'ppt','png','pptx', 'pdf', 'jpg', 'jpeg', 'bmp', 'xls', 'csv', 'doc', 'docx', 'txt', 'svg', 'pptx','xlsx'];
  invalidFileFormatError: string = '';

  onTextFileSelect(event: any) {
    debugger;

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
    debugger
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
     let noticeTextFile= this.noticeTextFileArray.filter(x=>x.fileName==file.name);
      url = noticeTextFile[0].fullPath;
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
         this.noticeForm.get('classId')?.patchValue(selected);
       }
       else{
         this.noticeForm.get('classId')?.patchValue([]);
       }
     }
 
     checkSelectAllClass(){
       let selectedClassList= this.noticeForm.get('classId')?.getRawValue() as number[];
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
       this.noticeForm.get('studentId')?.patchValue(selected);
     }
     else{
       this.noticeForm.get('studentId')?.patchValue([]);
     }
   }

   checkSelectAllStudent(){
     let selectedClassList= this.noticeForm.get('studentId')?.getRawValue() as number[];
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
     this.noticeForm.get('teacherId')?.patchValue(selected);
   }
   else{
     this.noticeForm.get('teacherId')?.patchValue([]);
   }
 }

 checkSelectAllTeacher(){
   let selectedClassList= this.noticeForm.get('teacherId')?.getRawValue() as number[];
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
    this.noticeForm.get('clerkId')?.patchValue(selected);
  }
  else{
    this.noticeForm.get('clerkId')?.patchValue([]);
  }
}

checkSelectAllClerk(){
  let selectedClassList= this.noticeForm.get('clerkId')?.getRawValue() as number[];
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
    this.noticeForm.get('cabDriverId')?.patchValue(selected);
  }
  else{
    this.noticeForm.get('cabDriverId')?.patchValue([]);
  }
}

checkSelectAllCabDriver(){
  let selectedClassList= this.noticeForm.get('cabDriverId')?.getRawValue() as number[];
  if(selectedClassList.length == this.cabDriverDropdownList.length){
    this.selectAllCabDriver = true;
  }
  else{
    this.selectAllCabDriver = false;
  }
}

patchVideoTextValues(values: ProjectMediaContentDto[]) {
   
  // Clear the existing controls in the FormArray
  while (this.videoTextArray.length !== 0) {
    this.videoTextArray.removeAt(0);
  }

  // Iterate through the values and add them to the FormArray
  values.forEach((value) => {
    const itemFormGroup = this.formBuilder.group({
      // id: [value.id],
      contentUrl: [value.contentUrl],
      // fileType: [value.fileType],
    });
    this.videoTextArray.push(itemFormGroup);
  });
}

// addVideoText() {
//   const itemFormGroup = this.formBuilder.group({
//       // id: 0,
//       // fileType:MediaContentType.TEXT,
//       contentUrl:[''],
//     });
//     this.videoTextArray.push(itemFormGroup);
//   }




  addVideoText() {
    const itemFormGroup = this.formBuilder.group({
      contentUrl: ['']
      });
      this.videoTextArray.push(itemFormGroup);
    }

  get videoText() {
    let formArray = this.noticeForm.get('videoText') as FormArray;
    return formArray.controls;
  }

  get videoTextArray() {
    return this.noticeForm.get('videoText') as FormArray;
  }

  removeVideotext(index: number) {
    this.videoTextArray.removeAt(index);
  }

  openVideoLink(index: number): void {
    const videoControl = this.videoText.at(index);
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
