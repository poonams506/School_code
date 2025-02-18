import { Component, Injector, Input, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AcademicYear, CertificateDto, CertificateServiceProxy, Division, Grade, GradeDivisionMasterDto, MasterServiceProxy, SchoolGradeDivisionMatrixDto, SchoolNgbDateModel, StudentIdModelResponse, StudentNameDto, StudentNameModelResponse } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme-service.service';
import { environment } from 'src/environments/environment';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { BonafiedReasonPopupComponent } from './bonafied-reason-popup/bonafied-reason-popup.component';

@Component({
  selector: 'app-bonafied-certificate',
  templateUrl: './bonafied-certificate.component.html',
  styleUrls: ['./bonafied-certificate.component.scss']
})
export class BonafiedCertificateComponent implements OnInit{
  reason : "";
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
  certificateContent : any;
  selectedOption: string = '';
  
  model: NgbDateStruct;
	date: { year: number; month: number };
  certificateDto: CertificateDto = new CertificateDto();
  bonafiedData : any;
  bonafiedDto : any;
  items = Array();
  currentDate : string;
  imageSource : any;
  profileImageSource : any;

  schoolLogoUrl : string;
  studentLogoUrl : string;

  constructor(injector:Injector, private certificateService:CertificateServiceProxy,private user:UserService, 
    private _sanitizer: DomSanitizer,
    private masterService:MasterServiceProxy,
    public translate: TranslateService, 
    private formBuilder: FormBuilder, 
    private themeService: ThemeService,
    public sharedPermissionServiceService : SharedPermissionServiceService,
    private modalService: NgbModal) 
  {
    
  }

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
    const modalRef = this.modalService.open(BonafiedReasonPopupComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.bonafiedReasonForm.patchValue({reason:''});
    modalRef.componentInstance.modelRef=modalRef;
    modalRef.result.then((result :any) => {
      if(result != false)
      {
        this.reason = result.reason;
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
        this.currentDate = new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear();
        this.user.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
          this.academicYearId=academicYearId as number;
          this.certificateService.bonafiedCertificateSelect(this.academicYearId,this.gradeId,this.divisionId, this.studentId).subscribe((certificate : CertificateDto) =>{ 
            if(certificate != null && certificate.bonafiedDetails)
            this.certificateDto = certificate;
            this.schoolLogoUrl = environment.API_BASE_URL + this.certificateDto.bonafiedDetails?.schoolLogoUrl;
            this.studentLogoUrl = environment.API_BASE_URL + this.certificateDto.bonafiedDetails?.studentLogoUrl;
            this.imageSource = this._sanitizer.bypassSecurityTrustResourceUrl(this.certificateDto.bonafiedDetails?.schoolProfileImage);
            this.profileImageSource = this._sanitizer.bypassSecurityTrustResourceUrl(this.certificateDto.bonafiedDetails?.profileImage);
      
          });
        });
      }
    }, () => {
    });

    
  }

  onCertificateReset(){
    this.certificateSubmitted = false;
    this.certificateForm.reset();
    this.certificateDto = new CertificateDto();
    
  }

  ngOnInit(): void 
  { 

    this.certificateForm =this.formBuilder.group({
      gradeId:[null],
      gradeName:[null],
      divisionId:[null],
      classId:[null, Validators.required],
      divisionName:[null],
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

    this.certificateService
    .getStudentNames(this.academicYearId, this.gradeId, this.divisionId)
    .subscribe((response)=>{
      this.studentNames = response;
        this.studentDropdownList=this.studentNames.studentNames
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

  

}
