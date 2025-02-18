import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Division, Grade, GradeDivisionMasterDto, HomeworkFileDto, HomeworkMediaContentDto, HomeworkServiceProxy, HomeworkUpsertDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SchoolNgbDateModel, SubjectMappingDropdownDto, TeacherClassSubjectDto, TeacherClassSubjectRequestDto, TeacherProfileServiceProxy } from 'src/app/services/school-api-service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user-service';
import * as moment from 'moment';
import ImageCompressor from 'image-compressor.js';


@Component({
  selector: 'add-edit-homework-filter',
  templateUrl: './add-edit-homework.page.html',
  styleUrls: ['./add-edit-homework.page.scss'],
})
export class AddEditHomeworkPage implements OnInit {
  homeworkForm: FormGroup;
  submitted: boolean = false;
  teacherId:number;
  @Input() homeworkId: number;
  academicYearId: number;
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  subjectDropdownList: TeacherClassSubjectDto[] = [];
  // minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };
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
    private homeworkService: HomeworkServiceProxy,
    private httpClient:HttpClient,
    private modalCtrl: ModalController,
    private userService:UserService,
    private  teacherProfileService:TeacherProfileServiceProxy ) { }
  ngOnInit() {

    // Setup form
    this.homeworkForm = this.formBuilder.group({
      homeworkId: [0],
      subjectId: [null, Validators.required],
      classId: [null, Validators.required],
      homeworkTitle: ['', Validators.required],
      homeworkDescription: ['', Validators.required],
      ngbStartDate: [null],
      startDate: [null, Validators.required],
      ngbEndDate: [null],
      endDate: [null, Validators.required],
      isPublished:[false],
      homeworkTextFileArray: [[]],
      homeworkMediaFileArray: [[]],
      academicYearId: [null],
      mediaVideoText: this.formBuilder.array([])

    });

    this.userService.getAcademicYear().subscribe(result=>{
      this.academicYearId=result;
      this.userService.getUserIdByRole().subscribe(teacherId=>{
        this.teacherId=teacherId;
        this.homeworkForm.get('academicYearId')?.setValue(this.academicYearId);
        this.getMasterDropdownData();
        this.addMediaVideoText();

      });
     
    });
   

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

   

  }

 

 
  textfiles: File[] = [];
  allowedFileFormats: string[] = ['txt', 'ppt','png','pptx', 'pdf', 'jpg', 'jpeg', 'bmp', 'xls', 'csv', 'doc', 'docx', 'txt', 'svg', 'pptx','xlsx'];
  invalidFileFormatError: string = '';


  homeworkTextFileArray:HomeworkFileDto[];
  getMasterDropdownData() {
    this.teacherProfileService.classTeacherGradeDivisionList(this.teacherId).subscribe(gradeDivisionMaster => {
      this.divisionGradeMapping = gradeDivisionMaster.classTeacherGradeDivisionList as SchoolGradeDivisionMatrixDto[];
  
      if (this.homeworkId > 0) {
        this.homeworkService.homeworkSelect(this.homeworkId).subscribe((result) => {
          // Patch homeworkForm with retrieved data
          this.homeworkForm.patchValue(result);
  
          // Handle homeworkTextFileArray for file uploads
          this.homeworkTextFileArray = result.homeworkTextFileArray;
          result.homeworkTextFileArray.forEach((textfile) => {
            this.textfiles.push(new File([], textfile.fileName, { lastModified: -1 }));
          });
  
          // Clear existing mediaVideoText FormArray
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
      this.teacherProfileService
        .getSubjectDropdownByClassTeacher({academicYearId:this.academicYearId,teacherId:this.teacherId,classId:selectedClassMapping.schoolGradeDivisionMatrixId} as TeacherClassSubjectRequestDto) 
        .subscribe((result) => {
          this.subjectDropdownList = result.lstSubject
        });
    }
  }
    get f() {
      return this.homeworkForm.controls;
    }

    getFormattedDate(date:any){
      if(date){
        return moment(date).format('DD-MM-yyyy');
      }
      else{
        return date;
      }
     
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
  const timestamp = new Date().getTime().toString(16); // Convert timestamp to hexadecimal
  const randomString = Math.random().toString(16).substr(2, 6); // Generate a random hexadecimal string
  const uniqueId = timestamp + randomString; // Combine timestamp and random string
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


saveHomeworkData() {
  this.submitted = true;
  this.homeworkForm.get('homeworkTextFileArray')?.setValue([]);
  this.homeworkForm.get('homeworkMediaFileArray')?.setValue([]);
  this.homeworkForm.get('contentUrl')?.setValue([]);


  // stop here if form is invalid
  if (this.homeworkForm.invalid) {
    return;
  }
   this.homeworkUpsert();
}

homeworkUpsert() {
  // Set academicYearId in the form
  this.homeworkForm.get('academicYearId')?.setValue(this.academicYearId);

  // Initialize FormData to send multipart/form-data
  const formData = new FormData();

  // Handle textfiles array
  for (let i = 0; i < this.textfiles.length; i++) {
    if (this.textfiles[i].lastModified > 0) {
      formData.append(`textfiles${i}`, this.textfiles[i]);
    } else {
      let fileDto = new HomeworkFileDto();
      fileDto.fileName = this.textfiles[i].name;
      fileDto.fileType = 1;
      this.homeworkForm.get('homeworkTextFileArray')?.value.push(fileDto);
    }
  }

  // Convert dates to NgbDateModel format and clear original date fields
  let homeWorkDetail = this.homeworkForm.getRawValue() as HomeworkUpsertDto;
  homeWorkDetail.ngbStartDate = new SchoolNgbDateModel();
  homeWorkDetail.ngbStartDate.day = moment(homeWorkDetail.startDate, "YYYY-MM-DD").date();
  homeWorkDetail.ngbStartDate.month = moment(homeWorkDetail.startDate, "YYYY-MM-DD").month() + 1;
  homeWorkDetail.ngbStartDate.year = moment(homeWorkDetail.startDate, "YYYY-MM-DD").year();

  homeWorkDetail.ngbEndDate = new SchoolNgbDateModel();
  homeWorkDetail.ngbEndDate.day = moment(homeWorkDetail.endDate, "YYYY-MM-DD").date();
  homeWorkDetail.ngbEndDate.month = moment(homeWorkDetail.endDate, "YYYY-MM-DD").month() + 1;
  homeWorkDetail.ngbEndDate.year = moment(homeWorkDetail.endDate, "YYYY-MM-DD").year();

  homeWorkDetail.startDate = null;
  homeWorkDetail.endDate = null;

  // Append homeworkDetail object as JSON string to FormData
  formData.append('homeworkDetail', JSON.stringify(homeWorkDetail));

  // Handle mediaVideoTextArray if exists
  for (let i = 0; i < this.homeworkForm.get('mediaVideoTextArray')?.value.length; i++) {
    formData.append('mediaVideoTextArray', this.homeworkForm.get('mediaVideoTextArray')?.value[i]);
  }

  // Handle content URLs in mediaVideoText
  const mediaVideoTextValue = this.homeworkForm.get('mediaVideoText')?.value;
  if (mediaVideoTextValue) {
    mediaVideoTextValue.forEach((item: any, i: number) => {
      if (item && item.contentUrl) {
        formData.append(`mediaVideoText[${i}].contentUrl`, item.contentUrl);
      }
    });
  }

  // Append mediaVideoText as JSON string to FormData
  formData.append('mediaVideoText', JSON.stringify(mediaVideoTextValue));

  // Perform HTTP POST request to API endpoint
  this.httpClient
    .post(`${environment.API_BASE_URL}/api/TeacherProfile/HomeworkUpsert`, formData)
    .subscribe((result: any) => {
      return this.modalCtrl.dismiss(true, 'success');
    });
}


// homeworkUpsert() 
// {
//   this.homeworkForm.get('academicYearId')?.setValue(this.academicYearId);
//   const formData = new FormData();
//   for (var i = 0; i < this.textfiles.length; i++) 
//   {
//     if (this.textfiles[i].lastModified > 0) 
//     {
//       formData.append(`textfiles${i}`, this.textfiles[i]);
//     } 
//     else
//     {
//       let fileDto = new HomeworkFileDto();
//       fileDto.fileName = this.textfiles[i].name;
//       fileDto.fileType = 1;
//       this.homeworkForm.get('homeworkTextFileArray')?.value.push(fileDto);
//     }
//   }

//   let homeWorkDetail=this.homeworkForm.getRawValue() as HomeworkUpsertDto;
//       homeWorkDetail.ngbStartDate = new SchoolNgbDateModel();
//       homeWorkDetail.ngbStartDate.day = moment(homeWorkDetail.startDate, "YYYY-MM-DD").date();
//       homeWorkDetail.ngbStartDate.month =  moment(homeWorkDetail.startDate, "YYYY-MM-DD").month() + 1;
//       homeWorkDetail.ngbStartDate.year = moment(homeWorkDetail.startDate, "YYYY-MM-DD").year();

//       homeWorkDetail.ngbEndDate = new SchoolNgbDateModel();
//       homeWorkDetail.ngbEndDate.day = moment(homeWorkDetail.endDate, "YYYY-MM-DD").date();
//       homeWorkDetail.ngbEndDate.month =  moment(homeWorkDetail.endDate, "YYYY-MM-DD").month() + 1;
//       homeWorkDetail.ngbEndDate.year =  moment(homeWorkDetail.endDate, "YYYY-MM-DD").year();

//       homeWorkDetail.startDate=null;
//       homeWorkDetail.endDate=null;
//   formData.append
//   (
//     'homeworkDetail',
//     JSON.stringify(homeWorkDetail)
//   );

//   this.httpClient
//     .post(`${environment.API_BASE_URL}/api/TeacherProfile/HomeworkUpsert`, formData)
//     .subscribe((result: any) => {
//       return this.modalCtrl.dismiss(true, 'success');
//     });
// }

close() 
{
  return this.modalCtrl.dismiss(false, 'cancel');
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
      let homeworkTextFile= this.homeworkTextFileArray.filter(x=>x.fileName==file.name);
      url = homeworkTextFile[0].fullPath;
    }
    window.open(url, '_blank');
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

// Add a new FormGroup to mediaVideoText FormArray
addMediaVideoText() {
  const control = this.homeworkForm.get('mediaVideoText') as FormArray;
  control.push(this.formBuilder.group({
    contentUrl: [''] // Initialize with default values or leave empty
    // Add other form controls as needed based on your DTO structure
  }));
}

// Remove a FormGroup from mediaVideoText FormArray at index i
removeMediaVideoText(index: number) {
  const control = this.homeworkForm.get('mediaVideoText') as FormArray;
  control.removeAt(index);
}


  get mediaVideoText() {
    let formArray = this.homeworkForm.get('mediaVideoText') as FormArray;
    return formArray.controls;
  }

  get mediaVideoTextArray() {
    return this.homeworkForm.get('mediaVideoText') as FormArray;
  }

  // removeMediaVideoText(index: number) {
  //   this.mediaVideoTextArray.removeAt(index);
  // }

  openVideoLink(index: number): void {
    const videoControls = this.mediaVideoText as unknown as FormArray;
    const videoControl = videoControls.at(index) as FormControl;
    if (videoControl) {
      const contentUrl = videoControl.get('contentUrl')?.value;
      if (contentUrl) {
        let modifiedUrl = contentUrl;
  
        // Modify URL for autoplay based on the platform
        if (contentUrl.includes('youtube.com') || contentUrl.includes('vimeo.com')) {
          modifiedUrl = contentUrl.includes('?') ? `${contentUrl}&autoplay=1` : `${contentUrl}?autoplay=1`;
        }
  
        // Open the modified URL in a new tab
        window.open(modifiedUrl, '_blank');
      }
    }
  }


openLink(url: string): void {
  if (url) {
    window.open(url, '_blank');
  }
}

  
  
}
