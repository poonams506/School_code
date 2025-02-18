import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
} from 'src/app/services/school-api-service';
import { environment } from 'src/environments/environment';
import { ICustomMediaFileBlob } from '../../homework/add-edit-homework/ICustomMediaFileBlob';
import { v4 as uuid} from 'uuid';
import { ISelectListItem } from 'src/app/shared/ISelectListItem';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { file } from 'jszip';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-view-notice',
  templateUrl: './view-notice.component.html',
  styleUrls: ['./view-notice.component.scss']
})
export class ViewNoticeComponent {
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
 // minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };
  noticeToDropdownList: ISelectListItem[]=[];
  studentDropdownList:CommonDropdownSelectListItemDto[]=[];
  teacherDropdownList:TeacherDropdownSelectListDto[]=[];
  clerkDropdownList:CommonDropdownSelectListItemDto[]=[];
  cabDriverDropdownList:CommonDropdownSelectListItemDto[]=[];
  public Editor = ClassicEditor;
  viewMode: boolean = true; 
  minDate: any; // Set minDate according to your requirement
  minEndDate: any;

  constructor(
    private formBuilder: FormBuilder,
    private noticeService: NoticeServiceProxy,
    private masterService: MasterServiceProxy,
    private httpClient: HttpClient,
    private fileChunkService: FileChunkService,
    private calendar: NgbCalendar

  ) {
    this.noticeForm = this.formBuilder.group({
      noticeId: [0],
      noticeToType:[null,Validators.required],
      isImportant:[false],
      classId: [[]],
      studentId:[[]],
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
    });
    this.minEndDate = null;
  }

  ngOnInit(): void {

    this.noticeToDropdownList=[
      {id:1,value:'Student'},
      {id:2,value:'Class'},
      {id:3,value:'Teacher'},
      {id:4,value:'Clerk'},
      {id:5,value:'Cab Driver'},
  ];

    this.getMasterDropdownData();

    this.noticeForm
    .get('noticeToType')
    ?.valueChanges.subscribe((noticeToType: string) => {
      this.applyValidationAndClearField(parseInt(noticeToType))
    });

    this.noticeForm.get('academicYearId')?.setValue(this.academicYearId);

      if (this.viewMode) {
        // Disable form controls in view mode
        this.noticeForm.disable();
        this.noticeForm.get('noticeTextFileArray')?.disable(); // Disable the noticeText control
        this.noticeForm.get('noticeMediaFileArray')?.disable();
      }
  
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

      const today = new Date();
    this.minDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    
    // Subscribe to start date changes
    this.noticeForm.get('ngbStartDate')?.valueChanges.subscribe(startDate => {
      // Update the minimum selectable end date whenever the start date changes
      this.minEndDate = startDate;
    });
  }

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

  async saveNoticeData() {
    debugger;
    this.submitted = true;
    this.noticeForm.get('noticeTextFileArray')?.setValue([]);
    this.noticeForm.get('noticeMediaFileArray')?.setValue([]);
    // stop here if form is invalid
    if (this.noticeForm.invalid) {
      return;
    }

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

  noticeUpsert() {
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
      }
    }

    // Add media files
  for (let i = 0; i < this.mediafiles.length; i++) {
    const mediaFileBlob = this.mediafiles[i];
    formData.append(`mediafiles${i}`, mediaFileBlob.FileDetail);
  }

      formData.append('noticeDetail', JSON.stringify(this.noticeForm.getRawValue()));

  this.httpClient.post(`${environment.API_BASE_URL}/api/Notice/NoticeUpsert`, formData)
    .subscribe((result: any) => {
      this.modelRef.close(true);

      // Update file paths after saving
      this.mediafiles.forEach((file, index) => {
        const newFilePath = `${environment.API_BASE_URL}/Uploads/notice/mediafiles/${file.FileDetail.name}`;
        this.mediafiles[index].FilePath = newFilePath;
      });
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
  debugger;
  
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
      url = environment.API_BASE_URL+'/Uploads/notice/textfiles/'+file.name;
    }
    window.open(url, '_blank');
  }
  
  showMedia(file: ICustomMediaFileBlob) {

    const url = file.FilePath; // Use the FilePath property to get the file path
    if (url) {
      window.open(url, '_blank');
    }
  }

}
