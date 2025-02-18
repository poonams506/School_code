import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { forkJoin } from 'rxjs';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { CountryMasterDto, DistrictMasterDto, MasterServiceProxy, StateMasterDto, 
         StudentProfileServiceProxy, TalukaMasterDto } from 'src/app/services/school-api-service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';
import { ActionSheetController } from '@ionic/angular';
import ImageCompressor from 'image-compressor.js';


@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrl: './parents.component.scss'
})
export class ParentsComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  showOptions: boolean = false;

  fatherProfileForm: FormGroup;
  motherProfileForm: FormGroup;
  guardianProfileForm : FormGroup;

  isFatherSubmitted: boolean = false;
  isMotherSubmitted: boolean = false;
  isGuardianSubmitted: boolean = false;

  fatherFullName: string = '';
  motherFullName: string= '';
  guardianFullName: string='';

  fatherProfileImageUrl: string = '';
  motherProfileImageUrl:string='';
  guardianProfileImageUrl: string='';

  countryDropdownList: CountryMasterDto[] = [];
  stateDropdownList: StateMasterDto[] = [];
  districtDropdownList: DistrictMasterDto[] = [];
  talukaDropdownList: TalukaMasterDto[] = [];
  type:string = 'father';

  stateFatherFilteredDropdownList: StateMasterDto[];
  districtFatherFilteredDropdownList: DistrictMasterDto[];
  talukaFatherFilteredDropdownList: TalukaMasterDto[];

  stateMotherFilteredDropdownList: StateMasterDto[];
  districtMotherFilteredDropdownList: DistrictMasterDto[];
  talukaMotherFilteredDropdownList: TalukaMasterDto[];

  stateGuardianFilteredDropdownList: StateMasterDto[];
  districtGuardianFilteredDropdownList: DistrictMasterDto[];
  talukaGuardianFilteredDropdownList: TalukaMasterDto[];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private studentProfileService: StudentProfileServiceProxy,
    private userService: UserService,
    private masterService: MasterServiceProxy,
    private router: Router,
    private commonMethod:CommonMethodService,
    private httpClient:HttpClient,
    private elementRef: ElementRef,
    private actionSheetController: ActionSheetController

  ) { }

  handleRefresh(event) {
    setTimeout(() => {
    this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Parents');
    this.getMasterDropdownData();
  }
  ngOnInit() {
    this.fatherProfileForm = this.formBuilder.group({
      parentId: [0],
      studentId:[0],
      parentTypeId:[0],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      addressLine1: [''],
      addressLine2: [''],
      countryId: [null],
      stateId: [null],
      districtId: [null],
      talukaId: [null],
      zipcode: [''],
      profileImageURL:['']
    });

    this.motherProfileForm = this.formBuilder.group({
      parentId: [0],
      studentId:[0],
      parentTypeId:[0],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      addressLine1: [''],
      addressLine2: [''],
      countryId: [null],
      stateId: [null],
      districtId: [null],
      talukaId: [null],
      zipcode: [''],
      profileImageURL:['']
    });

    this.guardianProfileForm = this.formBuilder.group({
      parentId: [0],
      studentId:[0],
      parentTypeId:[0],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      addressLine1: [''],
      addressLine2: [''],
      countryId: [null],
      stateId: [null],
      districtId: [null],
      talukaId: [null],
      zipcode: [''],
      profileImageURL:['']
    });
 
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
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

fatherFiles:File[];
  // Update profile picture
  async updateFatherProfilePicture() {

    this.fatherFiles=[];
    const  status=await Camera.requestPermissions();
  
    const image = await Camera.getPhoto({
      quality: 90,
      source:CameraSource.Prompt,
      resultType: CameraResultType.DataUrl,
      

    });

    this.fatherProfileImageUrl=image.dataUrl;
    let contentType= this.getFileContentTypeFromDataURL(image.dataUrl);
    let fileExtension=this.getFileExtensionFromDataURL(image.dataUrl);
    let uniqueFileName=this.generateUniqueId();
    let fileToInsert= await this.base64ToBlob(image.dataUrl,contentType,uniqueFileName+'.'+fileExtension,1);
 
     this.fatherFiles.push(fileToInsert);
     this.compressImage(fileToInsert).then(compressedFile => {
     this.fatherFiles.push(compressedFile);
    });
   }
 
  motherFiles:File[];
  // Update profile picture
  async updateMotherProfilePicture() {

    this.motherFiles=[];
    const  status=await Camera.requestPermissions();
  
    const image = await Camera.getPhoto({
      quality: 90,
      source:CameraSource.Prompt,
      resultType: CameraResultType.DataUrl,
      

    });

    this.motherProfileImageUrl=image.dataUrl;
   let contentType= this.getFileContentTypeFromDataURL(image.dataUrl);
   let fileExtension=this.getFileExtensionFromDataURL(image.dataUrl);
   let uniqueFileName=this.generateUniqueId();
   let fileToInsert= await this.base64ToBlob(image.dataUrl,contentType,uniqueFileName+'.'+fileExtension,1);

    this.motherFiles.push(fileToInsert);
    this.compressImage(fileToInsert).then(compressedFile => {
    this.motherFiles.push(compressedFile);
    });
  }
  

  guardianFiles:File[];
  // Update profile picture
  async updateGuardianProfilePicture() {

    this.guardianFiles=[];
    const  status=await Camera.requestPermissions();
  
    const image = await Camera.getPhoto({
      quality: 90,
      source:CameraSource.Prompt,
      resultType: CameraResultType.DataUrl,
      

    });

    this.guardianProfileImageUrl=image.dataUrl;
   let contentType= this.getFileContentTypeFromDataURL(image.dataUrl);
   let fileExtension=this.getFileExtensionFromDataURL(image.dataUrl);
   let uniqueFileName=this.generateUniqueId();
   let fileToInsert= await this.base64ToBlob(image.dataUrl,contentType,uniqueFileName+'.'+fileExtension,1);

    this.guardianFiles.push(fileToInsert);
    this.compressImage(fileToInsert).then(compressedFile => {
    this.guardianFiles.push(compressedFile);
    });
  }

  getMasterDropdownData() {
    this.fatherProfileForm.get('countryId')?.valueChanges.subscribe((countryId: string) => {
      this.stateFatherFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
      this.fatherProfileForm.get('stateId')?.setValue(null);
      this.fatherProfileForm.get('districtId')?.setValue(null);
      this.fatherProfileForm.get('talukaId')?.setValue(null);

    });

    this.fatherProfileForm.get('stateId')?.valueChanges.subscribe((stateId: string) => {
      this.districtFatherFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
      this.fatherProfileForm.get('districtId')?.setValue(null);
      this.fatherProfileForm.get('talukaId')?.setValue(null);
    });


    this.fatherProfileForm.get('districtId')?.valueChanges.subscribe((districtId: string) => {
      this.talukaFatherFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
      this.fatherProfileForm.get('talukaId')?.setValue(null);
    });

    this.motherProfileForm.get('countryId')?.valueChanges.subscribe((countryId: string) => {
      this.stateMotherFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
      this.motherProfileForm.get('stateId')?.setValue(null);
      this.motherProfileForm.get('districtId')?.setValue(null);
      this.motherProfileForm.get('talukaId')?.setValue(null);

    });

    this.motherProfileForm.get('stateId')?.valueChanges.subscribe((stateId: string) => {
      this.districtMotherFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
      this.motherProfileForm.get('districtId')?.setValue(null);
      this.motherProfileForm.get('talukaId')?.setValue(null);
    });


    this.motherProfileForm.get('districtId')?.valueChanges.subscribe((districtId: string) => {
      this.talukaMotherFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
      this.motherProfileForm.get('talukaId')?.setValue(null);
    });

    this.guardianProfileForm.get('countryId')?.valueChanges.subscribe((countryId: string) => {
      this.stateGuardianFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
      this.guardianProfileForm.get('stateId')?.setValue(null);
      this.guardianProfileForm.get('districtId')?.setValue(null);
      this.guardianProfileForm.get('talukaId')?.setValue(null);

    });

    this.guardianProfileForm.get('stateId')?.valueChanges.subscribe((stateId: string) => {
      this.districtGuardianFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
      this.guardianProfileForm.get('districtId')?.setValue(null);
      this.guardianProfileForm.get('talukaId')?.setValue(null);
    });


    this.guardianProfileForm.get('districtId')?.valueChanges.subscribe((districtId: string) => {
      this.talukaGuardianFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
      this.guardianProfileForm.get('talukaId')?.setValue(null);
    });

    forkJoin([this.masterService.getAddressMasterData(),this.studentProfileService.getParentProfile(this.userService.CurrentSiblingId)]).subscribe(result=>{
        const masterData=  result[0];
        const fatherDetail=result[1].fatherDetail;
        const motherDetail=result[1].motherDetail;
        const guardianDetail=result[1].guardianDetail;
        this.countryDropdownList = masterData.countryList as CountryMasterDto[];
        this.stateDropdownList = masterData.stateList as StateMasterDto[];
        this.districtDropdownList = masterData.districtList as DistrictMasterDto[];
        this.talukaDropdownList = masterData.talukaList as TalukaMasterDto[];

        this.fatherProfileForm.patchValue(fatherDetail);
        this.fatherFullName = fatherDetail.fullName;
        this.fatherProfileForm.get('stateId').setValue(fatherDetail.stateId);
        this.fatherProfileForm.get('districtId').setValue(fatherDetail.districtId);
        this.fatherProfileForm.get('talukaId').setValue(fatherDetail.talukaId);
        if(fatherDetail.profileBase64Image != undefined && fatherDetail.profileBase64Image!=null){
          this.fatherProfileImageUrl=fatherDetail.profileBase64Image;
          this.base64ToBlob(fatherDetail.profileBase64Image as string,
            fatherDetail.profileImageContentType as string, 
            fatherDetail.profileImageURL as string,-1).then(file => {
           this.fatherFiles=[];
           this.fatherFiles.push(file);
          }).catch(error => {
            console.error('An error occurred:', error);
          });
        }


        this.motherProfileForm.patchValue(motherDetail);
        this.motherFullName = motherDetail.fullName;
        this.motherProfileForm.get('stateId').setValue(motherDetail.stateId);
        this.motherProfileForm.get('districtId').setValue(motherDetail.districtId);
        this.motherProfileForm.get('talukaId').setValue(motherDetail.talukaId);
        if(motherDetail.profileBase64Image != undefined && motherDetail.profileBase64Image!=null){
          this.motherProfileImageUrl=motherDetail.profileBase64Image;
          this.base64ToBlob(motherDetail.profileBase64Image as string,
            motherDetail.profileImageContentType as string, 
            motherDetail.profileImageURL as string,-1).then(file => {
           this.motherFiles=[];
           this.motherFiles.push(file);
          }).catch(error => {
            console.error('An error occurred:', error);
          });
        }

        this.guardianProfileForm.patchValue(guardianDetail);
        this.guardianFullName = guardianDetail.fullName;
        this.guardianProfileForm.get('stateId').setValue(guardianDetail.stateId);
        this.guardianProfileForm.get('districtId').setValue(guardianDetail.districtId);
        this.guardianProfileForm.get('talukaId').setValue(guardianDetail.talukaId);
        if(guardianDetail.profileBase64Image != undefined && guardianDetail.profileBase64Image!=null){
          this.guardianProfileImageUrl=guardianDetail.profileBase64Image;
          this.base64ToBlob(guardianDetail.profileBase64Image as string,
            guardianDetail.profileImageContentType as string, 
            guardianDetail.profileImageURL as string,-1).then(file => {
           this.guardianFiles=[];
           this.guardianFiles.push(file);
          }).catch(error => {
            console.error('An error occurred:', error);
          });
        }

    });

   

  }

  async base64ToBlob(base64Url:string, contentType:string,image:string,lastModified:number) {
    const response = await fetch(base64Url);
    const data = await response.blob();
    return new File([data], image, { type: contentType, lastModified:lastModified });
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


 // Submit form
 submitFather() {

  this.isFatherSubmitted = true;

  // If form valid
  if (this.fatherProfileForm.valid) {
    const formData = new FormData();
    for (var i = 0; i < this.fatherFiles.length; i++) { 
      
      if(this.fatherFiles[i].lastModified > 0){
        formData.append("file[]", this.fatherFiles[i]);
      }
    }
    this.fatherProfileForm.get('parentTypeId').setValue(11);
    this.fatherProfileForm.get('studentId').setValue( this.userService.CurrentSiblingId);
   
    formData.append('parentProfile',JSON.stringify(this.fatherProfileForm.getRawValue()))

    this.httpClient.post(`${environment.API_BASE_URL}/api/StudentProfile/ParentProfileUpdate`, formData)
    .subscribe(result => {
      this.toastService.presentToast('Success', 'Profile saved', 'top', 'success', 2000);
      this.router.navigate(['parent-app/parentTab/home']);
    });



  }

}
  
  

  submitMother() {

    this.isMotherSubmitted = true;

    // If form valid
    if (this.motherProfileForm.valid) {
      const formData = new FormData();
      for (var i = 0; i < this.motherFiles.length; i++) { 
        
        if(this.motherFiles[i].lastModified > 0){
          formData.append("file[]", this.motherFiles[i]);
        }
      }
      this.motherProfileForm.get('parentTypeId').setValue(12);
      this.motherProfileForm.get('studentId').setValue( this.userService.CurrentSiblingId);
      formData.append('parentProfile',JSON.stringify(this.motherProfileForm.getRawValue()))

      this.httpClient.post(`${environment.API_BASE_URL}/api/StudentProfile/ParentProfileUpdate`, formData)
      .subscribe(result => {
        this.toastService.presentToast('Success', 'Profile saved', 'top', 'success', 2000);
        this.router.navigate(['parent-app/parentTab/home']);
      });



    }

  }

  submitGuardian() {

    this.isGuardianSubmitted = true;

    // If form valid
    if (this.guardianProfileForm.valid) {
      const formData = new FormData();
      for (var i = 0; i < this.guardianFiles.length; i++) { 
        
        if(this.guardianFiles[i].lastModified > 0){
          formData.append("file[]", this.guardianFiles[i]);
        }
      }
      this.guardianProfileForm.get('parentTypeId').setValue(13);
      this.guardianProfileForm.get('studentId').setValue( this.userService.CurrentSiblingId);
      formData.append('parentProfile',JSON.stringify(this.guardianProfileForm.getRawValue()))

      this.httpClient.post(`${environment.API_BASE_URL}/api/StudentProfile/ParentProfileUpdate`, formData)
      .subscribe(result => {
        this.toastService.presentToast('Success', 'Profile saved', 'top', 'success', 2000);
        this.router.navigate(['parent-app/parentTab/home']);
      });



    }

  }

  
  get ff() { return this.fatherProfileForm.controls; }
  get fm() { return this.motherProfileForm.controls; }
  get fg() { return this.guardianProfileForm.controls; }

  resetSelectList(f : any, item : string){
    if(f[item]?.getRawValue() == "null"){
      f[item]?.setValue(null); 
      return;
    }
  }
}
