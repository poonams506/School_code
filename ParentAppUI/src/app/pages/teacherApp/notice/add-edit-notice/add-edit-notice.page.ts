import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Division, Grade, GradeDivisionMasterDto, NoticeFileDto, NoticeServiceProxy, NoticeUpsertDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SchoolNgbDateModel, SubjectMappingDropdownDto, CommonDropdownSelectListItemDto, ProjectMediaContentDto } from 'src/app/services/school-api-service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user-service';
import * as moment from 'moment';

export interface ISelectListItem
{
    id:number;
    value:string;
}

@Component({
  selector: 'add-edit-notice-filter',
  templateUrl: './add-edit-notice.page.html',
  styleUrls: ['./add-edit-notice.page.scss'],
})
export class AddEditNoticePage implements OnInit {
  noticeForm: FormGroup;
  submitted: boolean = false;
  @Input() noticeId: number;
  academicYearId: number;
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  subjectDropdownList: SubjectMappingDropdownDto[] = [];
  // minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };
  noticeToDropdownList: ISelectListItem[]=[];
  studentDropdownList:CommonDropdownSelectListItemDto[]=[];
  public Editor = ClassicEditor;
  gradeId:any;
  divisionId:any;
  classId:any;
  minDate: any; // Set minDate according to your requirement
  minEndDate: any;
  constructor(
    private formBuilder: FormBuilder,
    private actionSheetController: ActionSheetController,
    private masterService: MasterServiceProxy,
    private noticeService: NoticeServiceProxy,
    private httpClient:HttpClient,
    private modalCtrl: ModalController,
    private userService:UserService  ) { }
  ngOnInit() {

    // Setup form
    this.noticeForm = this.formBuilder.group({
      noticeId: [0],
      noticeToType:[null,Validators.required],
      isImportant:[false],
      classId: [[], Validators.required],
      studentId:[[],Validators.required],
      teacherId:[[],Validators.required],
      cabDriverId:[[],Validators.required],
      clerkId:[[],Validators.required],
      noticeTitle: ['', Validators.required],
      noticeDescription: ['', Validators.required],
      ngbStartDate: [null],
      startDate: [null, Validators.required],
      ngbEndDate: [null],
      endDate: [null, Validators.required],
      isPublished:[false],
      noticeTextFileArray: [[]],
      noticeMediaFileArray: [[]],
      academicYearId: [null],
      videoText: this.formBuilder.array([])
    });

    this.noticeToDropdownList=[
      {id:1,value:'STUDENT'},
      {id:2,value:'CLASS'},
    
  ];

    this.userService.getAcademicYear().subscribe(result=>{
      this.academicYearId=result;
      this.noticeForm.get('academicYearId')?.setValue(this.academicYearId);
    this.addVideoText();
    });

    this.getMasterDropdownData();
    
    this.noticeForm
    .get('noticeToType')
    ?.valueChanges.subscribe((noticeToType: string) => {
      this.applyValidationAndClearField(parseInt(noticeToType))
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

      }
      this.noticeForm.updateValueAndValidity();
     
  }

 
  textfiles: File[] = [];
  allowedFileFormats: string[] = ['txt', 'ppt','png','pptx', 'pdf', 'jpg', 'jpeg', 'bmp', 'xls', 'csv', 'doc', 'docx', 'txt', 'svg', 'pptx','xlsx'];
  invalidFileFormatError: string = '';


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
            let noticeDetail = this.noticeForm.getRawValue() as NoticeUpsertDto;
            

// Ensure multiple student IDs are handled
const studentIds = Array.isArray(result.studentId) ? result.studentId : [result.studentId];
this.noticeForm.get('studentId')?.setValue(studentIds);  

           if (result.classId && Array.isArray(result.classId)) {
             this.selectedClasses = result.classId;
           } else if (result.classId) {
             this.selectedClasses = [result.classId];
           }
           
           this.noticeForm.controls['classId'].setValue(this.selectedClasses);

           this.noticeForm.patchValue(result);


            this.noticeTextFileArray=result.noticeTextFileArray;
            result.noticeTextFileArray.forEach((textfile) => {
              this.textfiles.push(
                new File([], textfile.fileName, { lastModified: -1 })
              );
            });

            
          });

        }
      });

      this.masterService.getStudentDropdownData(this.academicYearId).subscribe(result=>{
         this.studentDropdownList=result.lstDropdownValues;
      });
  }
    get f() {
      return this.noticeForm.controls;
    }



  // Update profile picture
  addedFileNames: Set<string> = new Set<string>();
  async uploadFiles() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose existing picture or take new',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Choose from gallery',
          icon: 'images',
          handler: async () => {
            const result = await FilePicker.pickFiles({
              multiple: true,
              readData: true,
              types: this.allowedFileFormats.map(ext => `.${ext}`) 
            });
  
            for (let file of result.files) {
              let contentType = file.mimeType;
              let fileToInsert = await this.base64ToBlob(`data:${file.mimeType};base64,${file.data}`, contentType, file.name, 1);
              
              if (!this.addedFileNames.has(file.name)) {
                this.textfiles.push(fileToInsert);
                this.addedFileNames.add(file.name);
  
                this.compressImage(fileToInsert).then(compressedFile => {
                  if (compressedFile && !this.addedFileNames.has(file.name)) {
                    this.textfiles.push(compressedFile);
                    this.addedFileNames.add(file.name);
                  }
                });
              }
            }
          }
        },
        {
          text: 'Take picture',
          icon: 'camera',
          handler: async () => {
            const image = await Camera.getPhoto({
              resultType: CameraResultType.DataUrl,
              source: CameraSource.Camera,
              quality: 90
            });
            
            let contentType = this.getFileContentTypeFromDataURL(image.dataUrl);
            let fileExtension = this.getFileExtensionFromDataURL(image.dataUrl);
            let uniqueFileName = this.generateUniqueId();
            let fileToInsert = await this.base64ToBlob(image.dataUrl, contentType, `${uniqueFileName}.${fileExtension}`, 1);
            
            if (!this.addedFileNames.has(uniqueFileName)) {
              this.textfiles.push(fileToInsert);
              this.addedFileNames.add(uniqueFileName);
  
              this.compressImage(fileToInsert).then(compressedFile => {
                if (compressedFile && !this.addedFileNames.has(uniqueFileName)) {
                  this.textfiles.push(compressedFile);
                  this.addedFileNames.add(uniqueFileName);
                }
              });
            }
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
  
  async  compressImage(file: File, targetSizeMB: number = 4): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        const maxWidth = 2000;
        const maxHeight = 1500;
    
        let width = image.width;
        let height = image.height;
    
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
    
        canvas.width = width;
        canvas.height = height;
        ctx!.drawImage(image, 0, 0, width, height);
    
        const compressQuality = (callback: (blob: Blob | null) => void, quality: number) => {
          canvas.toBlob(callback, file.type || 'image/jpeg', quality);
        };
  
        const checkSizeAndResolve = (blob: Blob | null, quality: number) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, { type: blob.type, lastModified: Date.now() });
            const sizeMB = compressedFile.size / (1024 * 1024);
            if (sizeMB <= targetSizeMB || quality <= 1) {
              resolve(compressedFile);
            } else {
              quality -= 0.1;
              compressQuality((newBlob) => checkSizeAndResolve(newBlob, quality), quality);
            }
          } else {
            reject(new Error('Failed to compress image.'));
          }
        };
    
        compressQuality((blob) => checkSizeAndResolve(blob, 1.0), 1.0);
      };
      image.src = URL.createObjectURL(file);
    });
  }
  
  
  

  async base64ToBlob(base64Url:string, contentType:string,image:string,lastModified:number) {
    const response = await fetch(base64Url);
    const data = await response.blob();
    return new File([data], image, { type: contentType, lastModified:lastModified });
  }

  
generateUniqueId(): string {
  const timestamp = new Date().getTime().toString(16); 
  const randomString = Math.random().toString(16).substr(2, 6); 
  const uniqueId = timestamp + randomString; 
  return uniqueId;
}

 getFileContentTypeFromDataURL(dataURL: string): string {
  const mime = dataURL.split(',')[0].split(':')[1].split(';')[0];
  return mime;
}
 getFileExtensionFromDataURL(dataURL: string): string {
  const mime = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const extension = mime.split('/')[1];
  return extension;
}

resetSelectList(f : any, item : string){
  if(f[item]?.getRawValue() == "null"){
    f[item]?.setValue(null); 
    return;
  }
}


saveNoticeData() {
  this.submitted = true;
  this.noticeForm.get('noticeTextFileArray')?.setValue([]);

  // stop here if form is invalid
  if (this.noticeForm.invalid) {
    return;
  }
   this.noticeUpsert();
}

noticeUpsert() 
{
  this.noticeForm.get('academicYearId')?.setValue(this.academicYearId);
  const formData = new FormData();
  for (var i = 0; i < this.textfiles.length; i++) 
  {
    if (this.textfiles[i].lastModified > 0) 
    {
      formData.append(`textfiles${i}`, this.textfiles[i]);
    } 
    else
    {
      let fileDto = new NoticeFileDto();
      fileDto.fileName = this.textfiles[i].name;
      fileDto.fileType = 1;
      this.noticeForm.get('noticeTextFileArray')?.value.push(fileDto);
    }
  }

  let noticeDetail = this.noticeForm.getRawValue() as NoticeUpsertDto;

  let studentIds = this.f['studentId'].value;
  if (studentIds && studentIds.length > 0) {
    noticeDetail.studentId = studentIds;
  } else {
    noticeDetail.studentId = [];
  }

  let classIds = this.f['classId'].value;
  if (classIds && classIds.length > 0) {
    noticeDetail.classId = classIds;
  } else {
    noticeDetail.classId = [];
  }
     
      noticeDetail.ngbStartDate = new SchoolNgbDateModel();
      noticeDetail.ngbStartDate.day = moment(noticeDetail.startDate, "YYYY-MM-DD").date();
      noticeDetail.ngbStartDate.month =  moment(noticeDetail.startDate, "YYYY-MM-DD").month() + 1;
      noticeDetail.ngbStartDate.year = moment(noticeDetail.startDate, "YYYY-MM-DD").year();

      noticeDetail.ngbEndDate = new SchoolNgbDateModel();
      noticeDetail.ngbEndDate.day = moment(noticeDetail.endDate, "YYYY-MM-DD").date();
      noticeDetail.ngbEndDate.month =  moment(noticeDetail.endDate, "YYYY-MM-DD").month() + 1;
      noticeDetail.ngbEndDate.year =  moment(noticeDetail.endDate, "YYYY-MM-DD").year();

      noticeDetail.startDate=null;
      noticeDetail.endDate=null;
  formData.append
  (
    'noticeDetail',
    JSON.stringify(noticeDetail)
  );

  this.httpClient
    .post(`${environment.API_BASE_URL}/api/TeacherProfile/NoticeUpsert`, formData)
    .subscribe((result: any) => {
      return this.modalCtrl.dismiss(true, 'success');
    });
}

close() 
{
  return this.modalCtrl.dismiss(false, 'cancel');
}

getFormattedDate(date:any){
  if(date){
    return moment(date).format('DD-MM-yyyy');
  }
  else{
    return date;
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

  showFile(file: File) 
  {
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
    const videoControl = (this.noticeForm.get('videoText') as FormArray).controls[index];
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
  
isOpen: number | null = null;


openLink(url: string): void {
  if (url) {
    window.open(url, '_blank');
  }
}


 selectedClasses: any[] = [];
 allClassesValue: any[] = [];
 selectAllClass: boolean = false;

toggleSelectAllClasses() {
  if (!this.selectAllClass) {
    // If "Select All" is checked, select all classes
    this.selectedClasses = this.divisionGradeMapping.map(
      (item) => item.schoolGradeDivisionMatrixId
    );
  } else {
    // If "Select All" is unchecked, clear the selection
    this.selectedClasses = [];
  }
  this.selectAllClass = !this.selectAllClass;
}

// Function to check if "Select All" should be checked based on individual selection
checkSelectAllClass() {
  if (this.selectedClasses.length === this.divisionGradeMapping.length) {
    this.selectAllClass = true;
  } else {
    this.selectAllClass = false;
  }
}
selectedAll: boolean = false; // Track if "Select All" is chosen



onSelectAll(event: any) {
  if (event.detail.checked) {
    // Select all students
    const allStudentIds = this.studentDropdownList.map(student => student.id);
    this.noticeForm.get('studentId').setValue(allStudentIds);
    this.selectedAll = true;
  } else {
    // Deselect all students
    this.noticeForm.get('studentId').setValue([]);
    this.selectedAll = false;
  }
}

onSelectChange(event: any) {
  const selectedValues = event.detail.value;

  // Check if all students are selected
  this.selectedAll = selectedValues.length === this.studentDropdownList.length;

  // Update the student selection in the form
  this.noticeForm.get('studentId').setValue(selectedValues);
}


}