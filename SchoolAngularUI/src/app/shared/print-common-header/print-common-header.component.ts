import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CountryMasterDto, DistrictMasterDto, MasterServiceProxy, MediumType, SchoolDto, SchoolServiceProxy, StateMasterDto, TalukaMasterDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-print-common-header',
  templateUrl: './print-common-header.component.html',
  styleUrls: ['./print-common-header.component.scss']
})
export class PrintCommonHeaderComponent implements OnInit {
    mediumTypeDropdownList: MediumType[]=[];
    countryDropdownList : CountryMasterDto[]=[];
    stateDropdownList : StateMasterDto[]=[];
    districtDropdownList : DistrictMasterDto[]=[];
    talukaDropdownList : TalukaMasterDto[]=[];
    schoolDetails : SchoolDto = new SchoolDto();
    logoUrl : string;

  constructor(
    public translate: TranslateService,
    private schoolService:SchoolServiceProxy,
    private masterService:MasterServiceProxy,
    private httpClient:HttpClient,
    private userService:UserService,
    ) {  }  

    ngOnInit(): void {
      this.userService.getSchoolId().subscribe((schoolId:number|undefined)=>{
        this.masterService.getMediumTypeData().subscribe(masterData=>{
          this.mediumTypeDropdownList = masterData.mediumTypes;
          this.schoolService.getSchoolProfile(schoolId).subscribe(schoolProfile=> {
            this.schoolDetails = schoolProfile;
            //this.logoUrl = environment.API_BASE_URL + '/Uploads/school/' + this.schoolDetails.logoUrl;
            if(schoolProfile.base64LogoImage != undefined && schoolProfile.base64LogoImage!=null){
              this.base64ToBlob(schoolProfile.base64LogoImage as string,
                schoolProfile.logoImageContentType as string, 
                schoolProfile.logoUrl as string).then(file => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    this.logoUrl = reader.result as string;
                  };
                  reader.readAsDataURL(file);
                 }).catch(error => {
                   console.error('An error occurred:', error);
                 });
            };
          })
         });
      });
      
    }
    files: File[] = [];
    async base64ToBlob(base64Url:string, contentType:string,image:string) {
      const response = await fetch(base64Url);
      const data = await response.blob();
      return new File([data], image, { type: contentType, lastModified:-1 });
    }
}
