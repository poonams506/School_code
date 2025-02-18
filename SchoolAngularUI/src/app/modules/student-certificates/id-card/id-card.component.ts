import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AcademicYear, CertificateDto, CertificateServiceProxy, Division, Grade, GradeDivisionMasterDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, StudentIdModelResponse, StudentNameDto, StudentNameModelResponse } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme-service.service';
import { environment } from 'src/environments/environment';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';

@Component({
  selector: 'app-id-card',
  templateUrl: './id-card.component.html',
  styleUrls: ['./id-card.component.scss']
})
export class IdCardComponent implements OnInit {
  
  certificateForm:FormGroup;
  certificateSubmitted=false;
  gradeDropdownList:Grade[]=[];
  divisionDropdownList:Division[]=[];
  divisionFilteredDropdownList: Division[];
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[]=[];
  studentId:number;
  academicYearId:number;
  studentRouteDetail: StudentIdModelResponse;
  academicYearDropdownList:AcademicYear[];
  studentNames: StudentNameModelResponse;
  studentDropdownList: StudentNameDto[] = [];
  divisionId : any;
  gradeId : any;
  dropdownList = Array();
  selectedItems = Array();
  dropdownSettings = {};
  modalService: any;
  certificateContent : any;
  selectedOption: string = '';

  model: NgbDateStruct;
	date: { year: number; month: number };
  certificateDto: CertificateDto;
  bonafiedData : any;
  idCardDto : any;
  items = Array();
  imageSource: any;
  imageSource1 : any;
  schoolLogoUrl : string;
  studentLogoUrl : string;

  constructor(private certificateService:CertificateServiceProxy,private user:UserService, private _sanitizer: DomSanitizer,
    private masterService:MasterServiceProxy,
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private themeService: ThemeService,
    public sharedPermissionServiceService : SharedPermissionServiceService) 
    { }

    defaultTheme() {
      this.themeService.setDefaultTheme();
    }
  
    theme1() {
      this.themeService.setLightTheme();
    }
  
    theme2() {
      this.themeService.setDarkTheme();
    }
   
  
    onSelectChange(event: any) {
      this.selectedOption = event.target.value;
    }
  
    get f(){return this.certificateForm.controls;}
  
    getMasterDropdownData(){
      this.user.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
        this.academicYearId=academicYearId as number;
        this.masterService.getAddressMasterData().subscribe(masterData=>{
          this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe((gradeMaster:GradeDivisionMasterDto)=>{
            this.gradeDropdownList=gradeMaster.grades as Grade[];
            this.divisionDropdownList=gradeMaster.divisions as Division[];
            this.divisionGradeMapping=gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];
             
            });
          });
    });
      
    
    this.masterService.getAcademicYearData().subscribe(masterData=>{
      this.academicYearDropdownList = masterData.academicYears;
    
    });
    
    }

    onGenerateCertificate(): void {
      this.certificateSubmitted = true;
      if (this.certificateForm.invalid) {
          return;
      }
      const selectedClassId = this.certificateForm.get('classId')?.value;
      const parsedSelectedClassId = parseInt(selectedClassId);
    const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);
  
    if (selectedClassMapping) {
      this.gradeId = selectedClassMapping.gradeId;
      this.divisionId = selectedClassMapping.divisionId;
    }
      // this.gradeId = this.certificateForm.get('gradeId')?.value;
      // this.divisionId = this.certificateForm.get('divisionId')?.value;
      this.studentId = this.certificateForm.get('fullName')?.value;
      this.user.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
        this.academicYearId=academicYearId as number;
        this.certificateService.idCardSelect(this.academicYearId,this.gradeId,this.divisionId, this.studentId).subscribe((certificate : CertificateDto) =>{
          this.certificateDto = certificate;
          //this.schoolLogoUrl = environment.API_BASE_URL + this.certificateDto.idCardDetails?.schoolLogoUrl;
          //this.studentLogoUrl = environment.API_BASE_URL + this.certificateDto.idCardDetails?.studentLogoUrl;

          if(certificate.idCardDetails.logoImage != undefined && certificate.idCardDetails.logoImage!=null){
            this.base64ToBlob(certificate.idCardDetails.logoImage as string,
              certificate.idCardDetails.logoImageContentType as string, 
              certificate.idCardDetails.logoUrl as string).then(file => {
                const reader = new FileReader();
                reader.onload = () => {
                  this.schoolLogoUrl = reader.result as string;
                };
                reader.readAsDataURL(file);
               }).catch(error => {
                 console.error('An error occurred:', error);
               });
          };
          
          if(certificate.idCardDetails.profileImage != undefined && certificate.idCardDetails.profileImage!=null){
            this.base64ToBlob(certificate.idCardDetails.profileImage as string,
              certificate.idCardDetails.profileImageContentType as string, 
              certificate.idCardDetails.profileImageUrl as string).then(f => {
                const reader = new FileReader();
                reader.onload = () => {
                  this.studentLogoUrl = reader.result as string;
                };
                reader.readAsDataURL(f);
               }).catch(error => {
                 console.error('An error occurred:', error);
               });
          };
          this.imageSource = this._sanitizer.bypassSecurityTrustResourceUrl(this.certificateDto.idCardDetails?.logoImage);
          this.imageSource1 = this._sanitizer.bypassSecurityTrustResourceUrl(this.certificateDto.idCardDetails?.profileImage);
         });
      });
  
     
    }
  
    onCertificateReset(){
      this.certificateSubmitted = false;
      this.certificateForm.reset();
      this.certificateDto= new CertificateDto();
    }

  ngOnInit(): void {
    this.certificateForm =this.formBuilder.group({
      gradeId:[null],
      gradeName:[null],
      divisionId:[null],
      divisionName:[null],
      classId:[null, Validators.required],
      firstName:[null],
      middleName:[null],
      lastName:[null],
      studentName:[null],
      certificateType: [null],
      fullName:[null, Validators.required],
      studentId : [null]
    });
    
  this.getMasterDropdownData();

  this.certificateForm.get('classId')?.valueChanges.subscribe((classId:string) => {
   
    if (classId) {
      const selectedClassId = this.certificateForm.get('classId')?.value;
      const parsedSelectedClassId = parseInt(selectedClassId);
    const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);
    if (selectedClassMapping) {
      this.gradeId = selectedClassMapping.gradeId;
      this.divisionId = selectedClassMapping.divisionId;
    }
    this.certificateService.getStudentNames(this.academicYearId, this.gradeId, this.divisionId).subscribe((response)=>{
      this.studentNames = response;
        this.studentDropdownList= this.studentNames.studentNames
    });
   
   this.certificateForm.get('studentId')?.setValue(null); 
   this.certificateForm.get('fullName')?.setValue(null);
}
  });

  this.defaultTheme(); 

    
  }
  resetSelectList(f : any, item : string){
    if(f[item]?.getRawValue() == "null"){
      f[item]?.setValue(null); 
      return;
    }
  }
  // files: File[] = [];
  async base64ToBlob(base64Url:string, contentType:string,image:string) {
    const response = await fetch(base64Url);
    const data = await response.blob();
    return new File([data], image, { type: contentType, lastModified:-1 });
  }


}


