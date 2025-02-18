import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { FileChunkService } from 'src/app/services/file-chunk-service';
import {
  Division,
  Grade,
  GradeDivisionMasterDto,
  HomeworkFileDto,
  HomeworkServiceProxy,
  HomeworkUpsertDto,
  MasterServiceProxy,
  SchoolGradeDivisionMatrixDto,
  SubjectMappingDropdownDto,
} from 'src/app/services/school-api-service';
import { environment } from 'src/environments/environment';
import { blob } from 'stream/consumers';
import {v4 as uuid} from 'uuid';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ICustomMediaFileBlob } from '../add-edit-homework/ICustomMediaFileBlob';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-view-homework',
  templateUrl: './view-homework.component.html',
  styleUrls: ['./view-homework.component.scss']
})
export class ViewHomeworkComponent {
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
  viewMode: boolean = true; 
  gradeId:any;
  divisionId:any;
  classId:any; 
  minDate: any; // Set minDate according to your requirement
  minEndDate: any;

  constructor(
    private formBuilder: FormBuilder,
    private homeworkService: HomeworkServiceProxy,
    private masterService: MasterServiceProxy,
    private httpClient: HttpClient,
    private fileChunkService: FileChunkService,
    private calendar: NgbCalendar
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
    });
    this.minEndDate = null;
  }

  ngOnInit(): void {
    this.getMasterDropdownData();

    this.homeworkForm.get('classId')?.valueChanges.subscribe((classId: string) => {
      debugger;
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
    this.minDate = this.calendar.getToday();

    this.homeworkForm.get('academicYearId')?.setValue(this.academicYearId);

    if (this.viewMode) {
      // Disable form controls in view mode
      this.homeworkForm.disable();
    }
    const today = new Date();
    this.minDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    
    // Subscribe to start date changes
    this.homeworkForm.get('ngbStartDate')?.valueChanges.subscribe(startDate => {
      // Update the minimum selectable end date whenever the start date changes
      this.minEndDate = startDate;
    });
  }

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
                  FilePath: environment.API_BASE_URL + '/Uploads/homework/mediafiles/' + textfile.fileName
                });
              });
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

  async saveHomeworkData() {
    this.submitted = true;
    this.homeworkForm.get('homeworkTextFileArray')?.setValue([]);
    this.homeworkForm.get('homeworkMediaFileArray')?.setValue([]);
    // stop here if form is invalid
    if (this.homeworkForm.invalid) {
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

  homeworkUpsert() {
    this.homeworkForm.get('academicYearId')?.setValue(this.academicYearId);
    const formData = new FormData();
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

    formData.append(
      'homeworkDetail',
      JSON.stringify(this.homeworkForm.getRawValue())
    );

    this.httpClient
      .post(`${environment.API_BASE_URL}/api/Homework/HomeworkUpsert`, formData)

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
      url = environment.API_BASE_URL+'/Uploads/homework/textfiles/'+file.name;
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
