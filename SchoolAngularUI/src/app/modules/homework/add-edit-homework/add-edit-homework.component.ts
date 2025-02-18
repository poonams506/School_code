import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { FileChunkService } from 'src/app/services/file-chunk-service';
import {
  Division,
  Grade,
  GradeDivisionMasterDto,
  HomeworkFileDto,
  HomeworkMediaContentDto,
  HomeworkServiceProxy,
  MasterServiceProxy,
  SchoolGradeDivisionMatrixDto,
  SubjectMappingDropdownDto,
} from 'src/app/services/school-api-service';
import { environment } from 'src/environments/environment';
import { ICustomMediaFileBlob } from './ICustomMediaFileBlob';
import {v4 as uuid} from 'uuid';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-edit-homework',
  templateUrl: './add-edit-homework.component.html',
  styleUrls: ['./add-edit-homework.component.scss'],
})
export class AddEditHomeworkComponent {
  homeworkForm: FormGroup;
  errorMessage: String;
  submitted: boolean = false;
  modelRef: any;
  homeworkId: number;
  academicYearId: number;
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  subjectDropdownList: SubjectMappingDropdownDto[] = [];
  // minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };
  public Editor = ClassicEditor;
  gradeId:any;
  divisionId:any;
  classId:any;
  minDate: any; // Set minDate according to your requirement
  minEndDate: any;
  isViewMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private homeworkService: HomeworkServiceProxy,
    private masterService: MasterServiceProxy,
    private httpClient: HttpClient,
    private fileChunkService: FileChunkService,
    private calendar: NgbCalendar,
    private el: ElementRef
  ) {
    this.homeworkForm = this.formBuilder.group({
      homeworkId: [0],
      subjectId: [null, Validators.required],
      classId: [null, Validators.required],
      homeworkTitle: ['', Validators.required],
      homeworkDescription: ['', Validators.required],
      ngbStartDate: [null, Validators.required],
      startDate: [null],
      ngbEndDate: [null, Validators.required],
      endDate: [null],
      isPublished:[false],
      homeworkTextFileArray: [[]],
      homeworkMediaFileArray: [[]],
      academicYearId: [null],
      mediaVideoText: this.formBuilder.array([])

    });
    // this.minDate = new Date(); // Set minDate according to your requirement
    this.minEndDate = null;
  }

  ngOnInit(): void {
    this.getMasterDropdownData();

    this.homeworkForm.get('classId')?.valueChanges.subscribe((classId: string) => {
   
      if (classId) {
      const selectedClassId = this.homeworkForm.get('classId')?.value;
      const parsedSelectedClassId = parseInt(selectedClassId);
    const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);
    if (selectedClassMapping) {
      this.gradeId = selectedClassMapping.gradeId;
      this.divisionId = selectedClassMapping.divisionId;
    }
      }    
        this.getSubjects();
      });

    this.homeworkForm.get('academicYearId')?.setValue(this.academicYearId);
    this.addMediaVideoText();

    const today = new Date();
    this.minDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    
    // Subscribe to start date changes
    this.homeworkForm.get('ngbStartDate')?.valueChanges.subscribe(startDate => {
      // Update the minimum selectable end date whenever the start date changes
      this.minEndDate = startDate;
    });
    if (this.isViewMode) {
      this.homeworkForm.disable();
    }
  }

  homeworkTextFileArray:HomeworkFileDto[];
  getMasterDropdownData() {
    this.masterService
      .getGradeDivisionMasterList(this.academicYearId)
      .subscribe((gradeMaster: GradeDivisionMasterDto) => {
        this.gradeDropdownList = gradeMaster.grades as Grade[];
        this.divisionDropdownList = gradeMaster.divisions as Division[];
        this.divisionGradeMapping =
          gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
  
        if (this.homeworkId > 0) {
          this.homeworkService
            .homeworkSelect(this.homeworkId)
            .subscribe((result) => {
              this.homeworkForm.patchValue(result);
              this.classId = result.classId; // Assuming there is a property classId in the result
              this.homeworkTextFileArray = result.homeworkTextFileArray;
  
              result.homeworkTextFileArray.forEach((textfile) => {
                this.textfiles.push(
                  new File([], textfile.fileName, { lastModified: -1 })
                );
              });
  
              result.homeworkMediaFileArray.forEach((textfile) => {
                this.mediafiles.push({
                  FileDetail: new File([], textfile.fileName, {
                    lastModified: -1,
                  }),
                  BlobDetail: [],
                  FilePath:
                    environment.API_BASE_URL +
                    '/Uploads/homework/mediafiles/' +
                    textfile.fileName,
                });
              });
  
              // Clear existing mediaVideoText FormArray to avoid duplicates
              const control = this.homeworkForm.get('mediaVideoText') as FormArray;
              while (control.length !== 0) {
                control.removeAt(0);
              }
  
              // Patch mediaVideoText values if available
              if (result.mediaVideoText) {
                result.mediaVideoText.forEach((videoTextItem: any) => {
                  control.push(this.formBuilder.group({
                    contentUrl: [videoTextItem.contentUrl],
                    // Add other form controls as needed based on your DTO structure
                  }));
                });
              }
            });
        }
      });
  }
  
  

getSubjects() {
  if (
    this.homeworkForm.get('classId')?.errors 

  ) {
    this.homeworkForm.get('subjectId')?.setValue(null);
    this.subjectDropdownList = [];
  } else {
  
    const selectedClassId = this.homeworkForm.get('classId')?.value;
    const parsedSelectedClassId = parseInt(selectedClassId);
  const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);
  if (selectedClassMapping) {
    this.gradeId = selectedClassMapping.gradeId;
    this.divisionId = selectedClassMapping.divisionId;
  }
    // Update the SubjectService method to accept classId
    this.homeworkService
      .getSubjectMappingDropdown(this.academicYearId, this.gradeId,this. divisionId) 
      .subscribe((result) => {
        this.subjectDropdownList = result.subjectsList
      });
  }
}
  get f() {
    return this.homeworkForm.controls;
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
        `${environment.API_BASE_URL}/api/Homework/UploadHomeworkMediaChunk`,
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

  handleHomeworkMediaUpload(){
    if (this.mediafiles.length > 0) {
      const asynTasks: any = [];
      this.mediafiles.forEach(
        (mediaFile: ICustomMediaFileBlob, index: number) => {
          if (mediaFile.BlobDetail.length > 0) {
            let splittedFileName = mediaFile.FileDetail.name.split('.');
            let extension = splittedFileName[splittedFileName.length - 1];
            let fileName = uuid() + '.' + extension;
            let fileDto = new HomeworkFileDto();
            fileDto.fileName = fileName;
            fileDto.fileType = 2;
            this.homeworkForm
              .get('homeworkMediaFileArray')
              ?.value.push(fileDto);

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
            let fileDto = new HomeworkFileDto();
            fileDto.fileName = mediaFile.FileDetail.name;
            fileDto.fileType = 2;
            this.homeworkForm
              .get('homeworkMediaFileArray')
              ?.value.push(fileDto);
          }
        }
      );
      if (asynTasks.length > 0) {
        this.executeAsyncTasks(asynTasks)
          .then(() => {
            console.log('All tasks executed sequentially');
            this.homeworkUpsert();
          })
          .catch((err) => {
            console.error('An error occurred:', err);
          });
      } else {
        this.homeworkUpsert();
      }
    } else {
      this.homeworkUpsert();
    }
  }

 saveHomeworkData() {
  debugger;
    this.submitted = true;
    this.homeworkForm.get('homeworkTextFileArray')?.setValue([]);
    this.homeworkForm.get('homeworkMediaFileArray')?.setValue([]);
    this.homeworkForm.get('contentUrl')?.setValue([]);

    this.focusToInvalidControl(this.homeworkForm);
    // stop here if form is invalid
    if (this.homeworkForm.invalid) {
      return;
    }
     this.homeworkUpsert();
  }

  homeworkUpsert() {
    debugger;
    this.homeworkForm.get('academicYearId')?.setValue(this.academicYearId);
    const formData = new FormData();
  
    // Handle text files
    for (var i = 0; i < this.textfiles.length; i++) {
      if (this.textfiles[i].lastModified > 0) {
        formData.append(`textfiles${i}`, this.textfiles[i]);
      } else {
        let fileDto = new HomeworkFileDto();
        fileDto.fileName = this.textfiles[i].name;
        fileDto.fileType = 1;
        this.homeworkForm.get('homeworkTextFileArray')?.value.push(fileDto);
      }
    }


    for (var i = 0; i < this.homeworkForm.get('mediaVideoTextArray')?.value.length; i++) {
      formData.append('mediaVideoTextArray', this.homeworkForm.get('mediaVideoTextArray')?.value[i]);
    }
  
    // Handle content URLs
    const contentUrlsArray: any[] = [];
    let fileDto1 = new HomeworkMediaContentDto();
    const mediaVideoTextValue = this.homeworkForm.get('mediaVideoText')?.value;
  
    if (mediaVideoTextValue) {
      mediaVideoTextValue.forEach((item: any, i: number) => {
        if (item) {
          fileDto1.contentUrl = item.contentUrl;
          this.homeworkForm.get('contentUrl')?.value.push(fileDto1.contentUrl);
        }
      });
    }
  
    // Append mediaVideoText content URLs to formData
    let contentUrlsArrayControl = this.homeworkForm.get('mediaVideoText') as FormArray;
    contentUrlsArrayControl.controls.forEach((control, index) => {
      formData.append(`mediaVideoText[${index}].contentUrl`, control.get('contentUrl')!.value);
    });
  
    // Append mediaVideoText as JSON string to formData
    formData.append('mediaVideoText', JSON.stringify(this.homeworkForm.get('mediaVideoText')?.value));
  
    // Append homework detail
    formData.append('homeworkDetail', JSON.stringify(this.homeworkForm.getRawValue()));
  
    // Make the HTTP post request
    this.httpClient
      .post(`${environment.API_BASE_URL}/api/Homework/HomeworkUpsert`, formData)
      .subscribe((result: any) => {
        this.modelRef.close(true);
      });
  }
  

  close() 
  {
    this.errorMessage = '';
    this.modelRef.close(false);
  }

 
  textfiles: File[] = [];
  allowedFileFormats: string[] = ['txt', 'ppt','png','pptx', 'pdf', 'jpg', 'jpeg', 'bmp', 'xls', 'csv', 'doc', 'docx', 'txt', 'svg', 'pptx','xlsx'];
  invalidFileFormatError: string = '';

  onTextFileSelect(event: any) 
  {
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
  
getFileExtension(filename: string): string 
{
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
}

  onTextFileRemove(index: number) 
  {
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

  else
  {

  event.addedFiles.forEach((file: File) => 
  {
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

  showFile(file: File) 
  {
    let url = "";
    if(file.size > 0){
      url = window.URL.createObjectURL(file);
    }
    else{
      let homeworkTextFile= this.homeworkTextFileArray.filter(x=>x.fileName==file.name);
      url = homeworkTextFile[0].fullPath;
    }
    window.open(url, '_blank');
  }

  showMedia(file: ICustomMediaFileBlob) 
  {
    const url = file.FilePath; // Use the FilePath property to get the file path
    if (url) 
    {
      window.open(url, '_blank');
    }
  }

  
patchMediaVideoTextValues(values: HomeworkMediaContentDto[]) {
   
  // Clear the existing controls in the FormArray
  while (this.mediaVideoTextArray.length !== 0) {
    this.mediaVideoTextArray.removeAt(0);
  }

  // Iterate through the values and add them to the FormArray
  values.forEach((value) => {
    const itemFormGroup = this.formBuilder.group({
      // id: [value.id],
      contentUrl: [value.contentUrl],
      // fileType: [value.fileType],
    });
    this.mediaVideoTextArray.push(itemFormGroup);
  });
}

  addMediaVideoText() {
    const itemFormGroup = this.formBuilder.group({
      contentUrl: ['']
      });
      this.mediaVideoTextArray.push(itemFormGroup);
    }

  get mediaVideoText() {
    let formArray = this.homeworkForm.get('mediaVideoText') as FormArray;
    return formArray.controls;
  }

  get mediaVideoTextArray() {
    return this.homeworkForm.get('mediaVideoText') as FormArray;
  }

  removeMediaVideoText(index: number) {
    this.mediaVideoTextArray.removeAt(index);
  }

  openVideoLink(index: number): void {
    const videoControl = this.mediaVideoText.at(index);
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


