import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { forkJoin } from 'rxjs';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { CabDriverAppServiceProxy, CountryMasterDto, DistrictMasterDto, MasterServiceProxy, StateMasterDto, 
          TalukaMasterDto} from 'src/app/services/school-api-service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './cabdriver-profile.page.html',
  styleUrls: ['./cabdriver-profile.page.scss'],
})
export class CabDriverProfilePage implements OnInit {
  cabDriverProfileForm: FormGroup;
  submitted: boolean = false;
  cabDriverFullName: string = '';
  cabDriverProfileImageUrl: string = '';
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
    private cabDriverAppServiceService: CabDriverAppServiceProxy,
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
    this.cabDriverProfileForm = this.formBuilder.group({
      cabDriverId: [0],
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

    this.cabDriverProfileImageUrl=image.dataUrl;
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
    this.cabDriverProfileForm.get('countryId')?.valueChanges.subscribe((countryId: string) => {
      this.stateFilteredDropdownList = this.stateDropdownList.filter(state => state.countryId === parseInt(countryId));
      this.cabDriverProfileForm.get('stateId')?.setValue(null);
      this.cabDriverProfileForm.get('districtId')?.setValue(null);
      this.cabDriverProfileForm.get('talukaId')?.setValue(null);

    });

    this.cabDriverProfileForm.get('stateId')?.valueChanges.subscribe((stateId: string) => {
      this.districtFilteredDropdownList = this.districtDropdownList.filter(district => district.stateId === parseInt(stateId));
      this.cabDriverProfileForm.get('districtId')?.setValue(null);
      this.cabDriverProfileForm.get('talukaId')?.setValue(null);
    });


    this.cabDriverProfileForm.get('districtId')?.valueChanges.subscribe((districtId: string) => {
      this.talukaFilteredDropdownList = this.talukaDropdownList.filter(taluka => taluka.districtId === parseInt(districtId));
      this.cabDriverProfileForm.get('talukaId')?.setValue(null);
    });

  

    this.userService.getUserIdByRole().subscribe(userIdResult=>{
      forkJoin([this.masterService.getAddressMasterData(),this.cabDriverAppServiceService.getCabDriverProfile(userIdResult)]).subscribe(result=>{
        const masterData=  result[0];
        const cadriverDetail=result[1];
        this.countryDropdownList = masterData.countryList as CountryMasterDto[];
        this.stateDropdownList = masterData.stateList as StateMasterDto[];
        this.districtDropdownList = masterData.districtList as DistrictMasterDto[];
        this.talukaDropdownList = masterData.talukaList as TalukaMasterDto[];
        this.cabDriverProfileForm.patchValue(cadriverDetail);
        this.cabDriverFullName = cadriverDetail.cabDriverFullName;
        this.cabDriverProfileForm.get('stateId').setValue(cadriverDetail.stateId);
        this.cabDriverProfileForm.get('districtId').setValue(cadriverDetail.districtId);
        this.cabDriverProfileForm.get('talukaId').setValue(cadriverDetail.talukaId);
        if(cadriverDetail.profileBase64Image != undefined && cadriverDetail.profileBase64Image!=null){
          this.cabDriverProfileImageUrl=cadriverDetail.profileBase64Image;
          this.base64ToBlob(cadriverDetail.profileBase64Image as string,
            cadriverDetail.profileImageContentType as string, 
            cadriverDetail.profileImageURL as string,-1).then(file => {
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
    if (this.cabDriverProfileForm.valid) {
      const formData = new FormData();
      for (var i = 0; i < this.files.length; i++) { 
        
        if(this.files[i].lastModified > 0){
          formData.append("file[]", this.files[i]);
        }
      }
      formData.append('cabDriverProfile',JSON.stringify(this.cabDriverProfileForm.getRawValue()))

      this.httpClient.post(`${environment.API_BASE_URL}/api/CabDriverApp/CabDrverProfileUpdate`, formData)
      .subscribe(result => {
        this.toastService.presentToast('Success', 'Profile saved', 'top', 'success', 2000);
        this.router.navigate(['driver-app/cabdriverTab/home']);
      });



    }

  }

  get f() { return this.cabDriverProfileForm.controls; }

  resetSelectList(f : any, item : string){
    if(f[item]?.getRawValue() == "null"){
      f[item]?.setValue(null); 
      return;
    }
  }

}
