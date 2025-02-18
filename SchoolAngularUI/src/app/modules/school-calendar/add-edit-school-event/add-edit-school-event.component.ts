import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, lastValueFrom } from 'rxjs';
import {v4 as uuid} from 'uuid';
import * as moment from 'moment';
import { FileChunkService } from 'src/app/services/file-chunk-service';
import { DashBoardServiceProxy, DashBoardStaffDetailsDto, Division, Grade, GradeDivisionMasterDto, MasterServiceProxy, SchoolEventDto, SchoolEventFileDto, SchoolEventServiceProxy, SchoolGradeDivisionMatrixDto } from 'src/app/services/school-api-service';
import { environment } from 'src/environments/environment';
import { ICustomMediaFileBlob } from './ICustomMediaFileBlob';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js/';
import { RxwebValidators } from '@rxweb/reactive-form-validators';


@Component({
  selector: 'app-add-edit-school-event',
  templateUrl: './add-edit-school-event.component.html',
  styleUrls: ['./add-edit-school-event.component.scss']
})
export class AddEditSchoolEventComponent {
  schoolEventForm: FormGroup;
  errorMessage: String;
  submitted: boolean = false;
  startTimeSubscription: Subscription;
  endTimeSubscription: Subscription;
  modelRef: any;
  isViewMode: boolean = false;
   schoolEventId: number;
  academicYearId: number;
  dashBoardStaffDetailsDto: DashBoardStaffDetailsDto;
  timePartXAxis:SchoolEventDto[]=[];
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };
  public Editor = ClassicEditor;
  public editorConfig = {
    mediaEmbed: {
      previewsInData: true
    }
  };
  gradeId:any;
  divisionId:any;
  classId:any;
  constructor(
    private formBuilder: FormBuilder,
    private schoolEventService: SchoolEventServiceProxy,
    private masterService: MasterServiceProxy,
    private httpClient: HttpClient,
    private fileChunkService: FileChunkService,
    private calendar: NgbCalendar,
    private router: Router,
    private dashboardService:DashBoardServiceProxy,
  )
   {
    this.schoolEventForm = this.formBuilder.group({
      schoolEventId: [0],
      classId: [null, Validators.required],
      eventTitle: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventFess: [null,[Validators.required,RxwebValidators.range({minimumNumber:0,maximumNumber:100000000})]],
      eventVenue: ['', Validators.required],
      eventCoordinator: ['', Validators.required],
      ngbStartDate: [null, Validators.required],
      startDate: [null],
      ngbEndDate: [null, Validators.required],
      endDate: [null],
      isCompulsory:[false],
      isPublished:[false],
      fileNameList: [[]],
      MediaFileArray: [[]],
      academicYearId: [null],
      ngbStartTime: [null],
      ngbEndTime: [null]
    });

  }

  ngOnInit(): void {
    this.getMasterDropdownData();

    this.schoolEventForm.get('classId')?.valueChanges.subscribe((classId: string) => {
   
      if (classId) {
      const selectedClassId = this.schoolEventForm.get('classId')?.value;
      const parsedSelectedClassId = parseInt(selectedClassId);
    const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);
    if (selectedClassMapping) {
      this.gradeId = selectedClassMapping.gradeId;
      this.divisionId = selectedClassMapping.divisionId;
    }
      }  
       
      });

      this.minDate = this.calendar.getToday();

    this.schoolEventForm.get('academicYearId')?.setValue(this.academicYearId);
    if (this.isViewMode) {
      // Disable form controls in view mode
      this.schoolEventForm.disable();
    }

   
  }

  fileNameList:SchoolEventFileDto[];
  getMasterDropdownData() {
    debugger;
    this.masterService
    .getGradeDivisionMasterList(this.academicYearId)
    .subscribe((gradeMaster: GradeDivisionMasterDto) => {
      this.gradeDropdownList = gradeMaster.grades as Grade[];
      this.divisionDropdownList = gradeMaster.divisions as Division[];
      this.divisionGradeMapping =
        gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
        if (this.schoolEventId > 0) {
          this.schoolEventService
            .schoolEventSelect(this.schoolEventId)
            .subscribe((result) => {
              this.schoolEventForm.patchValue(result);
              this.classId = result.classId; // Assuming there is a property classId in the result
              if(result.fileNameList && result.fileNameList.length!>0){
                this.fileNameList=  result.fileNameList!;
              }else{
                this.fileNameList=[];
              }
              
              result.fileNameList?.forEach((textfile) => {
                this.textfiles.push(
                  new File([], textfile.fileName, { lastModified: -1 })
                );
              });

              result.mediaFileArray?.forEach((textfile) => {
                this.mediafiles.push({
                  FileDetail: new File([], textfile.fileName, {
                    lastModified: -1,
                  }),
                  BlobDetail: [],
                  FilePath: environment.API_BASE_URL + '/Uploads/schoolevent/mediafiles/' + textfile.fileName
                });
              });
            });
        }
      });
      this.dashboardService.getDashboardStaffDetails().subscribe(dashboardStaffDetailsData => {
        // Sorting the staff details array by staffName in ascending order
        this.dashBoardStaffDetailsDto = dashboardStaffDetailsData;
        if (this.dashBoardStaffDetailsDto && this.dashBoardStaffDetailsDto.dashBoardStaffDetails) {
            this.dashBoardStaffDetailsDto.dashBoardStaffDetails.sort((a, b) => a.staffName.localeCompare(b.staffName));
        }
    });
  }


  get f() {
    return this.schoolEventForm.controls;
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
        `${environment.API_BASE_URL}/api/SchoolEvent/UploadSchoolEventMediaChunk`,
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

 async onMediaFileUpload(){
    if (this.mediafiles.length > 0) {
      const asynTasks: any = [];
      this.mediafiles.forEach(
        (mediaFile: ICustomMediaFileBlob, index: number) => {
          if (mediaFile.BlobDetail.length > 0) {
            let splittedFileName = mediaFile.FileDetail.name.split('.');
            let extension = splittedFileName[splittedFileName.length - 1];
            let fileName = uuid() + '.' + extension;
            let fileDto = new SchoolEventFileDto();
            fileDto.fileName = fileName;
            fileDto.fileType = 2;
            this.schoolEventForm
              .get('mediaFileArray')
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
           } 
           else {
            let fileDto = new SchoolEventFileDto();
            fileDto.fileName = mediaFile.FileDetail.name;
            fileDto.fileType = 2;
            this.schoolEventForm
              .get('mediaFileArray')
              ?.value.push(fileDto);
          }
        }
      );
      if (asynTasks.length > 0) {
        this.executeAsyncTasks(asynTasks)
          .then(() => {
            console.log('All tasks executed sequentially');
            this.schoolEventUpsert();
          })
          .catch((err) => {
            console.error('An error occurred:', err);
          });
      } else {
        this.schoolEventUpsert();
      }
    }
     else {
      this.schoolEventUpsert();
    }
  }

   saveSchoolEventData() {
    debugger;
    this.submitted = true;
    this.schoolEventForm.get('fileNameList')?.setValue([]);
     this.schoolEventForm.get('mediaFileArray')?.setValue([]);
    // stop here if form is invalid
    if (this.schoolEventForm.invalid) {
      return;
    }
    this.schoolEventUpsert();
  }
  

  schoolEventUpsert() {
    this.schoolEventForm.get('academicYearId')?.setValue(this.academicYearId);
    const formData = new FormData();
    for (var i = 0; i < this.textfiles.length; i++) {
      if (this.textfiles[i].lastModified > 0) {
        formData.append(`textfiles${i}`, this.textfiles[i]);
      } else {
        let fileDto = new SchoolEventFileDto();
        fileDto.fileName = this.textfiles[i].name;
        fileDto.fileType = 1;
        this.schoolEventForm.get('fileNameList')?.value.push(fileDto);
      }
    }

    formData.append(
      'schoolevent',
      JSON.stringify(this.schoolEventForm.getRawValue())
    );

    this.httpClient
      .post(`${environment.API_BASE_URL}/api/SchoolEvent/SchoolEventUpsert`, formData)

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
  allowedMediaFileFormats: string[] = ['txt', 'ppt','png','pptx', 'pdf', 'jpg', 'jpeg', 'bmp', 'xls', 'csv', 'doc', 'docx', 'txt', 'svg', 'pptx','xlsx'];
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
      let schoolEventTextFile= this.fileNameList.filter(x=>x.fileName==file.name);
      url = schoolEventTextFile[0].fullPath;
     
    }
    window.open(url, '_blank');
  }

  showMedia(file: ICustomMediaFileBlob) {
    const url = file.FilePath; // Use the FilePath property to get the file path
    if (url) {
      window.open(url, '_blank');
    }
  }
  selectAll : boolean = false;
  selectAllOption() {
    if(this.selectAll){
      const selected = this.divisionGradeMapping.map(item => item.schoolGradeDivisionMatrixId);
      this.schoolEventForm.get('classId')?.patchValue(selected);
    }
    else{
      this.schoolEventForm.get('classId')?.patchValue([]);
    }
  }
  checkSelectAll(){
    let selectedClassList= this.schoolEventForm.get('classId')?.getRawValue() as number[];
    if(selectedClassList.length == this.divisionGradeMapping.length){
      this.selectAll = true;
    }
    else{
      this.selectAll = false;
    }
  }
  getFormattedMinute(hour:number,minute:number){
    return moment({"hour":hour,"minutes": minute}).format('HH:mm');
  }
  onAmountInput(event: any) {
    event.target.value = event.target.value.replace(/[^0-9.]/g, '');
  
    const dotIndex = event.target.value.indexOf('.');
    if (dotIndex !== -1) {
      const afterDot = event.target.value.substring(dotIndex + 1);
      if (afterDot.includes('.')) {
        event.target.value = event.target.value.substring(0, dotIndex + 1) + afterDot.replace('.', '');
      }
    }
  }
 
}
