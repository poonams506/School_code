import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Division, Grade, GradeDivisionMasterDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SchoolNgbDateModel, SubjectMappingDropdownDto, CommonDropdownSelectListItemDto, ProjectMediaContentDto, GalleryServiceProxy, GalleryFileDto, GalleryUpsertDto, GalleryMediaContentDto } from 'src/app/services/school-api-service';
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
  selector: 'add-edit-gallery-filter',
  templateUrl: './add-edit-gallery.page.html',
  styleUrls: ['./add-edit-gallery.page.scss'],
})
export class AddEditGalleryPage implements OnInit {
  galleryForm: FormGroup;
  submitted: boolean = false;
  @Input() galleryId: number;
  academicYearId: number;
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  subjectDropdownList: SubjectMappingDropdownDto[] = [];
  // minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };
  galleryToDropdownList: ISelectListItem[]=[];
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
    private galleryService: GalleryServiceProxy,
    private httpClient:HttpClient,
    private modalCtrl: ModalController,
    private userService:UserService  ) { }
  ngOnInit() {

    // Setup form
    this.galleryForm = this.formBuilder.group({
      galleryId: [0],
      galleryToType:[null,Validators.required],
     // isImportant:[false],
      classId: [[],Validators.required],
      studentId:[[],Validators.required],
      teacherId:[[],Validators.required],
      cabDriverId:[[],Validators.required],
      clerkId:[[],Validators.required],
      galleryTitle: ['', Validators.required],
      description: ['', Validators.required],
      ngbStartDate: [null],
      startDate: [null, Validators.required],
      // ngbEndDate: [null],
      // endDate: [null, Validators.required],
      isPublished:[false],
      galleryTextFileArray: [[]],
      galleryMediaFileArray: [[]],
      academicYearId: [null],
      galleryVideoText: this.formBuilder.array([]),
      
  }, {
    validators: this.atLeastOneFieldRequiredValidator(['galleryTextFileArray', 'galleryVideoText'], this)
  });
    
    this.galleryToDropdownList=[
      {id:1,value:'STUDENT'},
      {id:2,value:'CLASS'},
    
  ];

    this.userService.getAcademicYear().subscribe(result=>{
      this.academicYearId=result;
      this.galleryForm.get('academicYearId')?.setValue(this.academicYearId);
      this.getMasterDropdownData();
      this.addContentUrl();

    });

    
    this.galleryForm
    .get('galleryToType')
    ?.valueChanges.subscribe((galleryToType: string) => {
      this.applyValidationAndClearField(parseInt(galleryToType))
    });


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

      }
      this.galleryForm.updateValueAndValidity();
    
     
  }

 
  textfiles: File[] = [];
  //allowedFileFormats: string[] = ['txt', 'ppt','png','pptx', 'pdf', 'jpg', 'jpeg', 'bmp', 'xls', 'csv', 'doc', 'docx', 'txt', 'svg', 'pptx','xlsx'];
  allowedFileFormats: string[] = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'svg'];
  invalidFileFormatError: string = '';


  galleryTextFileArray:GalleryFileDto[];
  getMasterDropdownData() {
    this.masterService
      .getGradeDivisionMasterList(this.academicYearId)
      .subscribe((gradeMaster: GradeDivisionMasterDto) => {
        this.gradeDropdownList = gradeMaster.grades as Grade[];
        this.divisionDropdownList = gradeMaster.divisions as Division[];
        this.divisionGradeMapping =
          gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
        if (this.galleryId > 0) {
          this.galleryService.gallerySelect(this.galleryId).subscribe((result) => {
            this.galleryForm.patchValue(result);
            this.patchGalleryTypeArrayValues(result.galleryVideoText);

            if(result.studentId.length>0){
              this.f['studentId'].setValue(result.studentId[0]);
            }else{
              this.f['studentId'].setValue(null);
            }
           
            if(result.classId.length>0){
              this.f['classId'].setValue(result.classId[0]);
            }else{
              this.f['classId'].setValue(null);
            }

            this.galleryTextFileArray=result.galleryTextFileArray;
            result.galleryTextFileArray.forEach((textfile) => {
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
      return this.galleryForm.controls;
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
              const fileExtension = this.getFileExtension(file.name);

  
              if (this.allowedFileFormats.includes(fileExtension)) {
                this.invalidFileFormatError = ''; // Reset error message

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
              } else {
                this.invalidFileFormatError = `Invalid file format`;
                break;
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
  
            if (this.allowedFileFormats.includes(fileExtension)) {
              this.invalidFileFormatError = ''; // Reset error message
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
            } else {
              this.invalidFileFormatError = `Invalid file format`;
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


saveGalleryData() {
  this.submitted = true;
  this.galleryForm.get('galleryTextFileArray')?.setValue([]);
   this.galleryForm.get('contentUrl')?.setValue([]);


  // stop here if form is invalid
  if (this.galleryForm.invalid) {
    return;
  }
   this.galleryUpsert();
}

galleryUpsert() {
  this.galleryForm.get('academicYearId')?.setValue(this.academicYearId);
  const formData = new FormData();

  // Append text files if they have been modified
  this.textfiles.forEach((file, index) => {
    if (file.lastModified > 0) {
      formData.append(`textfiles${index}`, file);
    } else {
      let fileDto = new GalleryFileDto();
      fileDto.fileName = file.name;
      fileDto.fileType = 1;
      this.galleryForm.get('galleryTextFileArray')?.value.push(fileDto);
    }
  });

  // Handle gallery video text
  let galleryTextArray = this.galleryForm.get('galleryVideoText') as FormArray;
  galleryTextArray.controls.forEach((control, index) => {
    formData.append(`galleryVideoText[${index}].contentUrl`, control.get('contentUrl')!.value);
  });

  // Prepare gallery detail object
  let galleryDetail = this.galleryForm.getRawValue() as GalleryUpsertDto;
  galleryDetail.studentId = this.f['studentId'].value > 0 ? [this.f['studentId'].value] : [];
  galleryDetail.classId = this.f['classId'].value > 0 ? [this.f['classId'].value] : [];

  // Convert dates to NgbDateModel
  galleryDetail.ngbStartDate = new SchoolNgbDateModel();
  let startDate = moment(galleryDetail.startDate, "YYYY-MM-DD");
  galleryDetail.ngbStartDate.day = startDate.date();
  galleryDetail.ngbStartDate.month = startDate.month() + 1;
  galleryDetail.ngbStartDate.year = startDate.year();
  galleryDetail.startDate = null;

  // Append gallery detail and video text to form data
  formData.append('galleryDetail', JSON.stringify(galleryDetail));
  formData.append('galleryVideoText', JSON.stringify(galleryTextArray.value));

  // Send the form data via HTTP POST
  this.httpClient
    .post(`${environment.API_BASE_URL}/api/TeacherProfile/GalleryUpsert`, formData)
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

  // onTextFileRemove(index: number) 
  // {
  //   this.textfiles.splice(index, 1);
  // }

  onTextFileRemove(index: number): void {
    const file = this.textfiles[index];
    this.textfiles.splice(index, 1);
    this.addedFileNames.delete(file.name);
  }
  showFile(file: File) 
  {
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

  removeGalleryText(index: number) {
    this.galleryVideoTextArray.removeAt(index);
  }
  openVideoLink(index: number): void {
    const videoControl = (this.galleryForm.get('galleryVideoText') as FormArray).controls[index];
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
  
  openLink(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

   atLeastOneFieldRequiredValidator(fields: string[], _this : any): any {
    return (formGroup: FormGroup): { [key: string]: any } | null => {
      // Check if at least one field has a value
      let counter = 0;
      fields.forEach(x=>{
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

}
