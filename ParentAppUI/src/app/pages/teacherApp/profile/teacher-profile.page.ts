import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { forkJoin } from 'rxjs';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { CountryMasterDto, DistrictMasterDto, MasterServiceProxy, StateMasterDto, 
          TalukaMasterDto, TeacherProfileServiceProxy} from 'src/app/services/school-api-service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './teacher-profile.page.html',
  styleUrls: ['./teacher-profile.page.scss'],
})
export class TeacherProfilePage implements OnInit {
  teacherProfileForm: FormGroup;
  submitted: boolean = false;
  teacherFullName: string = '';
  teacherProfileImageUrl: string = '';
  countryDropdownList: CountryMasterDto[] = [];
  stateDropdownList: StateMasterDto[] = [];
  districtDropdownList: DistrictMasterDto[] = [];
  talukaDropdownList: TalukaMasterDto[] = [];

  stateFilteredDropdownList: StateMasterDto[];
  districtFilteredDropdownList: DistrictMasterDto[];
  talukaFilteredDropdownList: TalukaMasterDto[];
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private teacherProfileService: TeacherProfileServiceProxy,
    private userService: UserService,
    private masterService: MasterServiceProxy,
    private router: Router,
    private commonMethod:CommonMethodService,
    private httpClient:HttpClient

  ) { }

 
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Profile');
    this.getMasterDropdownData();
  }
  ngOnInit() {
    this.teacherProfileForm = this.formBuilder.group({
      teacherId: [0],
      firstName: [{ value: '', disabled: true }, Validators.required],
      middleName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      mobileNumber:[{ value: '', disabled: true }],
      emailId:[{ value: '', disabled: true }],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      countryId: [null, Validators.required],
      stateId : [null, Validators.required],
      districtId: [null, Validators.required],
      talukaId: [null, Validators.required],
      zipCode: ['', Validators.required],
      talukaName:[{ value: '', disabled: true }],
      districtName:[{ value: '', disabled: true }],
      stateName:[{ value: '', disabled: true }],
      countryName:[{ value: '', disabled: true }],
      education:[{ value: '', disabled: true }],
      bloodGroup:[{ value: '', disabled: true }],
      profileImageURL:['']
    });

  }

  handleRefresh(event) {
    setTimeout(() => {
    this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
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

  // Update profile picture
  files:File[]=[];
  async updateProfilePicture() {

    this.files=[];
    const  status=await Camera.requestPermissions();
  
    const image = await Camera.getPhoto({
      quality: 90,
      source:CameraSource.Prompt,
      resultType: CameraResultType.DataUrl,
      

    });

    this.teacherProfileImageUrl=image.dataUrl;
   let contentType= this.getFileContentTypeFromDataURL(image.dataUrl);
   let fileExtension=this.getFileExtensionFromDataURL(image.dataUrl);
   let uniqueFileName=this.generateUniqueId();
   let fileToInsert= await this.base64ToBlob(image.dataUrl,contentType,uniqueFileName+'.'+fileExtension,1);
   
   this.files.push(fileToInsert);
   this.compressImage(fileToInsert).then(compressedFile => {
    this.files.push(compressedFile);
  });

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

  getMasterDropdownData() {
    this.teacherProfileForm.get('countryId')?.valueChanges.subscribe((countryId: string) => {
      this.stateFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
      this.teacherProfileForm.get('stateId')?.setValue(null);
      this.teacherProfileForm.get('districtId')?.setValue(null);
      this.teacherProfileForm.get('talukaId')?.setValue(null);

    });

    this.teacherProfileForm.get('stateId')?.valueChanges.subscribe((stateId: string) => {
      this.districtFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
      this.teacherProfileForm.get('districtId')?.setValue(null);
      this.teacherProfileForm.get('talukaId')?.setValue(null);
    });


    this.teacherProfileForm.get('districtId')?.valueChanges.subscribe((districtId: string) => {
      this.talukaFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
      this.teacherProfileForm.get('talukaId')?.setValue(null);
    });

  

    this.userService.getUserIdByRole().subscribe(userIdResult=>{
      forkJoin([this.masterService.getAddressMasterData(),this.teacherProfileService.getTeacherProfile(userIdResult)]).subscribe(result=>{
        const masterData=  result[0];
        const teacherDetail=result[1];
        this.countryDropdownList = masterData.countryList as CountryMasterDto[];
        this.stateDropdownList = masterData.stateList as StateMasterDto[];
        this.districtDropdownList = masterData.districtList as DistrictMasterDto[];
        this.talukaDropdownList = masterData.talukaList as TalukaMasterDto[];
        this.teacherProfileForm.patchValue(teacherDetail);
        this.teacherFullName = teacherDetail.teacherFullName;
        this.teacherProfileForm.get('stateId').setValue(teacherDetail.stateId);
        this.teacherProfileForm.get('districtId').setValue(teacherDetail.districtId);
        this.teacherProfileForm.get('talukaId').setValue(teacherDetail.talukaId);
        if(teacherDetail.profileBase64Image != undefined && teacherDetail.profileBase64Image!=null){
          this.teacherProfileImageUrl=teacherDetail.profileBase64Image;
          this.base64ToBlob(teacherDetail.profileBase64Image as string,
            teacherDetail.profileImageContentType as string, 
            teacherDetail.profileImageURL as string,-1).then(file => {
           this.files=[];
           this.files.push(file);
          }).catch(error => {
            console.error('An error occurred:', error);
          });
        }

    });

    })
  
   

  }

  async base64ToBlob(base64Url:string, contentType:string,image:string,lastModified:number) {
    const response = await fetch(base64Url);
    const data = await response.blob();
    return new File([data], image, { type: contentType, lastModified:lastModified });
  }

 

  // Submit form
  submit() {

    this.submitted = true;

    // If form valid
    if (this.teacherProfileForm.valid) {
      const formData = new FormData();
      for (var i = 0; i < this.files.length; i++) { 
        
        if(this.files[i].lastModified > 0){
          formData.append("file[]", this.files[i]);
        }
      }
      formData.append('teacherProfile',JSON.stringify(this.teacherProfileForm.getRawValue()))

      this.httpClient.post(`${environment.API_BASE_URL}/api/TeacherProfile/TeacherProfileUpdate`, formData)
      .subscribe(result => {
        this.toastService.presentToast('Success', 'Profile saved', 'top', 'success', 2000);
        this.router.navigate(['teacher-app/teacherTab/home']);
      });



    }

  }

  get f() { return this.teacherProfileForm.controls; }

  resetSelectList(f : any, item : string){
    if(f[item]?.getRawValue() == "null"){
      f[item]?.setValue(null); 
      return;
    }
  }

}
