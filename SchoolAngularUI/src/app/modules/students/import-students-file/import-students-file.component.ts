import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AcademicYear, CountryMasterDto, DistrictMasterDto, DivisionDto, GradeDto, MasterServiceProxy, ResponseImportStudentDataDto, SchoolGradeDivisionMatrixDto, StateMasterDto, StudentsImportServiceProxy, TalukaMasterDto } from 'src/app/services/school-api-service';
import {  utils, writeFile,WorkSheet,read ,write,WorkBook} from 'xlsx-js-style';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user-service';
import { isValid } from 'date-fns';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-import-students-file',
  templateUrl: './import-students-file.component.html',
  styleUrls: ['./import-students-file.component.scss']
})
export class ImportStudentsFileComponent {
 
  responseImportStudentDataDto: ResponseImportStudentDataDto;
  validationErrors: string[] = [];
  FileUploadErrors:string[]=[];
  insertCount :number;
  updateCount :number;
  hasPaymentHistory:any[];
  hasDublicateGenRegNo:any[];
  modalService: any;
  academicYearId:number;
  schoolId:number;
  countryDropdownList : CountryMasterDto[];
  stateDropdownList : StateMasterDto[];
  districtDropdownList : DistrictMasterDto[];
  talukaDropdownList : TalukaMasterDto[];
  academicYearList: AcademicYear[]=[];
  grades:GradeDto[];
  divisions:DivisionDto[];
  divisionGradeMapping:SchoolGradeDivisionMatrixDto[];
  selectedFileName:string;

  

  constructor(  private formBuilder: FormBuilder,
    private studnetImportService:StudentsImportServiceProxy,private httpClient:HttpClient,
    private router:Router ,
    private modalService1: NgbModal,
    public translate: TranslateService,
    private masterService:MasterServiceProxy,
    private userService:UserService) { 
      this.getMasterData();   
    }
  errorMessage : String;
  gradeSubmitted:boolean=false;

  selectedFile: File;
  data: any[] = [];
  sheetData:any[]=[];
  modelRef:any;
 expectedColumns1: { [key: string]: string } = { 
    Student_First_Name:'required' , Student_Middle_Name:'required' ,
    Student_Last_Name:'required' ,
    Gen_Reg_No:'required' ,
    Admission_No:'' ,Roll_No:'' ,Grade:'required' ,Division:'required',
   Admission_Date:'required' , 'CBSC_Student_Id':'' ,
    Gender :'required', Adhaar_No:'required' ,
   Religion:'required' , Category:'required' , Caste :'required', Sub_Caste:'required' , Nationality:'required' ,
    Mother_Tongue:'required' , Emergency_Contact_Person_Name:'required' , Emergency_Contact_No:'required' , Family_Doctor_Name:'' , 
    Family_Doctor_No:'' ,Birth_Place:'required' , Birth_Date:'required', Date_Of_Birth_In_Words :'required', Birth_Country:'required',
    Birth_State:'required' ,  Birth_District:'required' ,   Birth_Taluka:'required', Current_Address_Line_1 :'required',
    Current_Address_Line_2:'' , Current_Pincode:'required' ,   Current_Country:'required' ,
    Current_State:'required' , Current_District:'required' , Current_Taluka:'required' , Blood_Group:'' , Height:'' , Weight :'',
    Medical_History_Notes:'' , Previous_School_Name :'', Previous_School_Standard:'' , Previous_School_Division:'' ,
    Progress_Note_From_Last_School:'' , Conduct_Note_From_Last_School:'' , Reason_of_Leaving_School:'' , Date_of_Leaving_of_Previous_School:'' ,
    Remark:'' , Is_New_Student:'' , Is_Deactive:'' , Is_RTE:'' , Apply_Concession :'', Concession_Fee:'' , Academic_Year:'required' ,PreviousAcademicYearPendingFeeAmount:'',
    Do_you_required_parent_mobile_app_access:'' , Mobile_Number_for_Application_Access:'' ,
    Father_First_Name:'required' , Father_Middle_Name :'required', Father_Last_Name:'required' ,Father_Gender:'required' ,
   Father_Mobile_No :'', Father_Alternate_Contact_No:'' , Father_Email_Id:'' , Father_Address_Line_1 :'', Father_Address_Line_2:'' ,
   Father_Country:'' , Father_State:'' , Father_District:'' , Father_Taluka:'' , Father_Pincode :'', Father_Adhaar_No:'',
   Father_Education :'', Father_Birth_Date:'' , Father_Occupation:'' , Father_Annual_Income:'' , Father_Blood_Group:'' ,
   Mother_First_Name:'required' , Mother_Middle_Name:'required' , Mother_Last_Name :'required', Mother_Gender :'required', Mother_Mobile_No :'',
   Mother_Alternate_Contact_No:'' , Mother_Email_Id:'' , Mother_Address_Line_1:'' , Mother_Address_Line_2:'' , Mother_Country :'',
   Mother_State :'', Mother_District:'' , Mother_Taluka :'', Mother_Pincode:'' , Mother_Adhaar_No :'', Mother_Education :'',
   Mother_Birth_Date :'', Mother_Occupation:'' ,Mother_Annual_Income:'' , Mother_Blood_Group :'',
   Guardian_First_Name:'' , Guardian_Middle_Name:'', Guardian_Last_Name:'', Guardian_Gender:'' ,
   Guardian_Mobile_No:'' ,Guardian_Alternate_Contact_No:'' ,
   Guardian_Email_Id:'', Guardian_Address_Line_1:' ',Guardian_Address_Line_2:'', Guardian_Country:'',Guardian_State:'',
   Guardian_District:'', Guardian_Taluka:'' , Guardian_Pincode :'', Guardian_Adhaar_No:'' , Guardian_Education:'' ,
   Guardian_Birth_Date:'' , Guardian_Occupation :'', Guardian_Annual_Income :'', Guardian_Blood_Group:''  
  } 

  ngOnInit(): void {
  
  }
  
 
downloadTemplate(){  
 // this.getMasterData();      
  this.data=[
    ['Student_First_Name','Student_Middle_Name','Student_Last_Name','Gen_Reg_No','Admission_No','Roll_No','Grade','Division','Admission_Date','CBSC_Student_Id','Gender','Adhaar_No','Religion','Category','Caste','Sub_Caste','Nationality','Mother_Tongue','Emergency_Contact_Person_Name','Emergency_Contact_No','Family_Doctor_Name','Family_Doctor_No','Birth_Place','Birth_Date','Date_Of_Birth_In_Words','Birth_Country','Birth_State','Birth_District','Birth_Taluka','Current_Address_Line_1','Current_Address_Line_2','Current_Pincode','Current_Country','Current_State','Current_District','Current_Taluka','Blood_Group','Height','Weight','Medical_History_Notes','Previous_School_Name','Previous_School_Standard','Previous_School_Division','Progress_Note_From_Last_School','Conduct_Note_From_Last_School','Reason_of_Leaving_School','Date_of_Leaving_of_Previous_School','Remark','Is_New_Student','Is_Deactive','Is_RTE','Apply_Concession','Concession_Fee','Academic_Year','PreviousAcademicYearPendingFeeAmount','Do_you_required_parent_mobile_app_access','Mobile_Number_for_Application_Access','Father_First_Name','Father_Middle_Name','Father_Last_Name','Father_Gender','Father_Mobile_No','Father_Alternate_Contact_No','Father_Email_Id','Father_Address_Line_1','Father_Address_Line_2','Father_Country','Father_State','Father_District','Father_Taluka','Father_Pincode','Father_Adhaar_No','Father_Education','Father_Birth_Date','Father_Occupation','Father_Annual_Income','Father_Blood_Group','Mother_First_Name','Mother_Middle_Name','Mother_Last_Name','Mother_Gender','Mother_Mobile_No','Mother_Alternate_Contact_No','Mother_Email_Id','Mother_Address_Line_1','Mother_Address_Line_2','Mother_Country','Mother_State','Mother_District','Mother_Taluka','Mother_Pincode','Mother_Adhaar_No','Mother_Education','Mother_Birth_Date','Mother_Occupation','Mother_Annual_Income','Mother_Blood_Group','Guardian_First_Name','Guardian_Middle_Name','Guardian_Last_Name','Guardian_Gender','Guardian_Mobile_No','Guardian_Alternate_Contact_No','Guardian_Email_Id','Guardian_Address_Line_1','Guardian_Address_Line_2','Guardian_Country','Guardian_State','Guardian_District','Guardian_Taluka','Guardian_Pincode','Guardian_Adhaar_No','Guardian_Education','Guardian_Birth_Date','Guardian_Occupation','Guardian_Annual_Income','Guardian_Blood_Group'],
    ['firstname','middlename','lastname','gen1245','1245','11','2','A','12_10_2024','1234568','F','1551544426','Hindu','Open','Maratha','Kunbi','Indian','Marathi','testName','559565595','DrName','448484488','Sinnar','03_03_1996','Three March nineteen ninety six','India','Maharashtra','Nashik','Sinnar','Adrress1','Addressline 2','4226354','India','Maharashtra','Ahmednagar','Akole','B+','5.4','40','medicalhistory','testschool','3','D','good progress','good','location changed','10_07_2023','remark','Y','N','N','Y',20000,'2023_2024',1500,'Y','2496565976','fatherName','middlename','lastname','M','2682658565','91649744989','father@gmail.com','Adrress1','Adress2','India','Maharashtra','Ahmednagar','Akole','265626','879598998599','graduation','14_02_1969','Farmer',30000,'A+','mothername','middlename','lastname','F','2682658565','91649744989','mother@gmail.com','Adrress1','Adress2','India','Maharashtra','Ahmednagar','Akole','265626','879598998599','12','14_02_1975','Housewife',0,'B+','gaurdianname','middlename','lastname','M','2682658565','91649744989','guardian@gmail.com','Adrress1','Adress2','India','Maharashtra','Ahmednagar','Akole','265626','879598998599','graduation','14_02_1972','Worker',20000,'AB+']]

  const wb = utils.book_new();
  const ws = utils.json_to_sheet([]);
  
  utils.sheet_add_json(ws, this.data, { skipHeader: true});
  //
  // let cell ={v: 'Student_First_Name', s:{}, t: 's'}
  // cell.s ={
  //  font:{
  //    bold:true,
  //    color: {rgb : 'FFFF0000'}
  //  },
   
  // };
  // ws['B1']= cell;
 //

 Object.keys(this.expectedColumns1).forEach((key, index) => {
  // Check if the column is required
  if (this.expectedColumns1[key] === 'required') {
    // Set style for required columns
    let cell = ws[utils.encode_cell({ r: 0, c: index })];
    cell.s = {
      font: {
        bold: true,
        color: { rgb: 'FF0000' } // Red color for required columns
      }
    };
  }
  else{
    let cell = ws[utils.encode_cell({ r: 0, c: index })];
    cell.s = {
      font: {
        bold: true,
     }
    };
  }
});
  utils.book_append_sheet(wb, ws, 'Students');

  const wsCountry: any = utils.json_to_sheet([]);
  this.countryDropdownList.forEach((country, index) => {
  let translatedCountry=this.translate.instant(country.countryKey!);
  utils.sheet_add_aoa(wsCountry, [[translatedCountry]], { origin: `A${index + 1}` });
  });
  utils.book_append_sheet(wb, wsCountry, 'CountryList');


// Add state list sheet
  const wsState: any = utils.json_to_sheet([]);
  this.stateDropdownList.forEach((state, index) => {
  let translatedState=this.translate.instant(state.stateKey!);
  utils.sheet_add_aoa(wsState, [[translatedState]], { origin: `A${index + 1}`});
  });
  utils.book_append_sheet(wb, wsState, 'StateList');
  // Add district list sheet
  const wsDistrict: any = utils.json_to_sheet([]);
  this.districtDropdownList.forEach((district,index) => {
  let translatedDistrict=this.translate.instant(district.districtKey!);
  utils.sheet_add_aoa(wsDistrict, [[translatedDistrict]],{ origin: `A${index + 1}`});
  });
  utils.book_append_sheet(wb, wsDistrict, 'DistrictList');

// Add taluka list sheet
  const wsTaluka: any = utils.json_to_sheet([]);
  this.talukaDropdownList.forEach((taluka,index) => {
  let translatedTaluka=this.translate.instant(taluka.talukaKey!);
  utils.sheet_add_aoa(wsTaluka, [[ translatedTaluka]],{ origin: `A${index + 1}`});
  });
  utils.book_append_sheet(wb, wsTaluka, 'TalukaList');

  const genderList = [
    { name: 'Gender', key: 'M' },
    { name: 'Gender', key: 'F' },
  ];
  const wsGender: any = utils.json_to_sheet([]);
  genderList.forEach((gender,index) => {
  let translatedgender=this.translate.instant(gender.key);
  utils.sheet_add_aoa(wsGender, [[ translatedgender]],{ origin: `A${index + 1}`});
  });
  utils.book_append_sheet(wb, wsGender, 'Gender');

  const checklist = [
    { name: 'check', key: 'Y' },
    { name: 'check', key: 'N' },
  ];
  const wsCheck: any = utils.json_to_sheet([]);
  checklist.forEach((check,index) => {
  let translatedCheck=this.translate.instant(check.key);
  utils.sheet_add_aoa(wsCheck, [[ translatedCheck]],{ origin: `A${index + 1}`});
  });
  utils.book_append_sheet(wb, wsCheck, 'CheckBox');


  writeFile(wb, 'Student_Records.xlsx');
}

handleImport(event: any) {
  //this.getMasterData();
  this.FileUploadErrors=[];
  this.selectedFile = event.target.files[0];
  this.selectedFileName =  this.selectedFile ?  this.selectedFile.name : '';
  if(this.selectedFile)
    {
     this.errorMessage="";
    }
}

onUpload() {
 
this.FileUploadErrors=[];
if(!this.selectedFile)
{
 this.errorMessage="PLEASE_CHOOSE_A_FILE";
}
else{
  this.readExcel(this.selectedFile);
}

}
close() {
this.errorMessage = "";
this.modelRef.close(false);
}
UploadSuccessNotification(insertCount:number,updateCount:number) {
const newToastNotification = new ToastNotificationInitializer();
newToastNotification.setTitle(this.translate.instant('SUCCESS'));
newToastNotification.setMessage(`${this.translate.instant('FILE_UPLOADED_SUCCESSFULLY')}
${insertCount} ${this.translate.instant('STUDENT_INSERTED')}
${updateCount} ${this.translate.instant('STUDENT_UPDATED')}`);
newToastNotification.openToastNotification$();
}


readExcel(file: File) {
 
  this.validationErrors=[];
  const reader: FileReader = new FileReader();

  reader.onload = (e: any) => {
    const data: string = e.target.result;
    const workbook: WorkBook = read(data, { type: 'binary' });
    const firstSheetName: string = workbook.SheetNames[0];
    const worksheet: WorkSheet = workbook.Sheets[firstSheetName];
    const sheetData: any[] = utils.sheet_to_json(worksheet, { header: 1 }).filter(row => row!=null && row!=  undefined && Array.isArray(row) && row.length > 0);

    if (!Array.isArray(sheetData) || sheetData.length === 0) {
      console.error('Invalid file format. No data found in the sheet.');
      return;
    }

    // Extract the header row
    const headerRow: string[] = sheetData[0];
            if (this.columnsMatch(this.expectedColumns1, headerRow)) {
            
              headerRow.push('Current_CountryId', 'Current_StateId', 'Current_DistrictId', 'Current_TalukaId',
              'Birth_CountryId', 'Birth_StateId', 'Birth_DistrictId', 'Birth_TalukaId',
              'Father_CountryId', 'Father_StateId', 'Father_DistrictId', 'Father_TalukaId',
              'Mother_CountryId', 'Mother_StateId', 'Mother_DistrictId', 'Mother_TalukaId',
              'Gaurdian_CountryId', 'Gaurdian_StateId', 'Gaurdian_DistrictId', 'Gaurdian_TalukaId',
           );
      this.validateData(sheetData,headerRow,this.expectedColumns1);
      const genRegNoColumnIndex = headerRow.indexOf('Gen_Reg_No');
       if(this.FileUploadErrors.length > 0){
        this.errorPopUp(this.FileUploadErrors);
       }
      else{
        
        
        console.log(sheetData.slice(1));
      const updatedWorksheet: WorkSheet = utils.aoa_to_sheet(sheetData);
      const updatedWorkbook: WorkBook = utils.book_new();
      updatedWorkbook.SheetNames.push(firstSheetName);
      updatedWorkbook.Sheets[firstSheetName] = updatedWorksheet;
      const updatedData: string = write(updatedWorkbook, { type: 'binary' });
      const formData=new FormData();
      formData.append('file', new Blob([this.s2ab(updatedData)], { type: 'application/octet-stream' }), file.name);

       
      this.httpClient.post(`${environment.API_BASE_URL}/api/StudentsImport/UploadStudentData`,formData).subscribe((response: any) => {
      
        this.responseImportStudentDataDto = response;
        this.insertCount=this.responseImportStudentDataDto.insertedCount;
        this.updateCount=this.responseImportStudentDataDto.updatedCount;
        this.hasPaymentHistory=this.responseImportStudentDataDto.hasPaymentHistoryList;
        this.hasDublicateGenRegNo=this.responseImportStudentDataDto.hasDublicateGenRegNoList;
        if(this.hasPaymentHistory.length>0){
          this.hasPaymentHistory.forEach(student=>{
            if(student.hasPaymentHistory==1){
            this.FileUploadErrors.push(` You can not update this student, there is fee payment associated with this student. Please revert all the fee payment transactions and try again for student ${student.student_First_Name} ${student.student_Middle_Name} ${student.student_Last_Name} `);
              } });
          this.errorPopUp(this.FileUploadErrors);
        }
        if(this.hasDublicateGenRegNo.length>0){
        
          this.hasDublicateGenRegNo.forEach((student,i)=>{
            if(student.genRegNoExist==1){
              //const cellReference = this.getCellReference(i+1, genRegNoColumnIndex);
              const excelColumnName=this.getExcelColumnName(genRegNoColumnIndex)
            this.FileUploadErrors.push(` General registration number is duplicate at position ${excelColumnName}${i+2} for student ${student.student_First_Name} ${student.student_Middle_Name} ${student.student_Last_Name}`);
              } });
          this.errorPopUp(this.FileUploadErrors);
        }
        if( this.insertCount>0 ||this.updateCount>0)
        {
          this.UploadSuccessNotification(this.insertCount,this.updateCount);
          this.modelRef.close(true);
        }
      (error: any) => {
        console.error(error);
      }
     }
     )};
      
    }
    else{
      this.errorPopUp(this.FileUploadErrors);
    }
   
  };

  reader.readAsBinaryString(file);
}
s2ab(s: string): ArrayBuffer {
  const buf: ArrayBuffer = new ArrayBuffer(s.length);
  const view: Uint8Array = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
} 
columnsMatch(expectedColumns1: { [key: string]: string }, actualColumns: string[]): boolean {
  
  const expectedKeys = Object.keys(expectedColumns1);
  //const translateexpectedKeys = expectedKeys.map((key) => this.translate.instant(key));
  const missingRequiredColumns: string[] = [];
  const unexpectedColumns: string[] = [];

  expectedKeys.forEach((key) => {
    const isRequired = expectedColumns1[key] === 'required';
    const isColumnPresent = actualColumns.includes(key);

    if (isRequired && !isColumnPresent) {
      missingRequiredColumns.push(key);
    }
  });

  actualColumns.forEach((column) => {
    const isUnexpected = !expectedKeys.includes(column);
    if (isUnexpected) {
      
      unexpectedColumns.push(column);
    }
  });

  if (missingRequiredColumns.length > 0) {
    this.FileUploadErrors.push(`Missing columns: ${missingRequiredColumns.join(', ')}`);
  }
  if (unexpectedColumns.length > 0) {
    this.FileUploadErrors.push(`Invalid Header: ${unexpectedColumns.join(', ')}`);
  }
  if(missingRequiredColumns.length > 0 || unexpectedColumns.length > 0){
    return false;
  }

  return true;
}

validateData(sheetData: any[], headerRow: string[],expectedColumns1: { [key: string]: string }) {
  for (let i = 1; i < sheetData.length; i++) {
    const rowData = sheetData[i];
    if(rowData && rowData.length > 0){
      this.validateWholeRow(sheetData[i], i, headerRow,expectedColumns1);
    }
  }
}
validateWholeRow(rowData: any[], i: number,headerRow: string[],expectedColumns1: { [key: string]: string }) {
  
  const StudentFName=this.cellValue(rowData,('Student_First_Name'),headerRow);
  const StudentLName=this.cellValue(rowData,('Student_Last_Name'),headerRow);
  const StudentName = StudentFName.concat(' ', StudentLName);

  for (let j = 0; j < headerRow.length; j++) {
    const columnName = headerRow[j];
    const cellValue = rowData[j];
    const excelColumnName = this.getExcelColumnName(j); // Get Excel column name

    if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue === '')) {

      this.FileUploadErrors.push(`'${(columnName)}' is required at position ${(excelColumnName)}${(i + 1)}  for student ${StudentName }`);
      
    } }

  const isValidCurrentCountry = this.validateCountry(rowData,'Current_Country', i,headerRow,expectedColumns1,StudentName);
  const isValidBirthCountry = this.validateCountry(rowData,'Birth_Country', i,headerRow,expectedColumns1,StudentName);
  const isValidFCountry = this.validateCountry(rowData,'Father_Country', i,headerRow,expectedColumns1,StudentName);
  const isValidMCountry = this.validateCountry(rowData,'Mother_Country', i,headerRow,expectedColumns1,StudentName);
  const isValidGCountry = this.validateCountry(rowData, 'Guardian_Country', i,headerRow,expectedColumns1,StudentName);
  
  const isValidCurrentState = this.validateState(rowData, 'Current_State','Current_Country', i,headerRow,expectedColumns1,StudentName);
  const isValidBirthState = this.validateState(rowData,'Birth_State','Birth_Country' ,i,headerRow,expectedColumns1,StudentName);
  const isValidFState = this.validateState(rowData, 'Father_State','Father_Country', i,headerRow,expectedColumns1,StudentName);
  const isValidMState = this.validateState(rowData, 'Mother_State', 'Mother_Country',i,headerRow,expectedColumns1,StudentName);
  const isValidGState = this.validateState(rowData, 'Guardian_State','Guardian_Country', i,headerRow,expectedColumns1,StudentName);
  
  const isValidCurrentDistrict = this.validateDistrict(rowData,'Current_District','Current_State', i,headerRow,expectedColumns1,StudentName);
  const isValidBirthDistrict = this.validateDistrict(rowData, 'Birth_District','Birth_State', i,headerRow,expectedColumns1,StudentName);
  const isValidFDistrict = this.validateDistrict(rowData, 'Father_District', 'Father_State',i,headerRow,expectedColumns1,StudentName);
  const isValidMDistrict = this.validateDistrict(rowData, 'Mother_District', 'Mother_State',i,headerRow,expectedColumns1,StudentName);
  const isValidGDistrict = this.validateDistrict(rowData, 'Guardian_District','Guardian_State', i,headerRow,expectedColumns1,StudentName);

  const isValidCurrentTaluka = this.validateTaluka(rowData, 'Current_Taluka','Current_District', i,headerRow,expectedColumns1,StudentName);
  const isValidBirthTaluka = this.validateTaluka(rowData, 'Birth_Taluka', 'Birth_District',i,headerRow,expectedColumns1,StudentName);
  const isValidFTaluka = this.validateTaluka(rowData, 'Father_Taluka','Father_District', i,headerRow,expectedColumns1,StudentName);
  const isValidMTaluka = this.validateTaluka(rowData, 'Mother_Taluka', 'Mother_District',i,headerRow,expectedColumns1,StudentName);
  const isValidGTaluka = this.validateTaluka(rowData, 'Guardian_Taluka', 'Guardian_District',i,headerRow,expectedColumns1,StudentName);

  const isValidAcademicYear = this.validateAcademicYear(rowData, 'Academic_Year', i,headerRow,expectedColumns1,StudentName);
 // const isvalidateBirthPlace = this.validateBirthPlace(rowData, 'Birth_Place', i,headerRow,expectedColumns1,StudentName);

  const isValidBirthDate =this.validateDate(rowData,'Birth_Date',i,headerRow,expectedColumns1,StudentName);
  const isValidAdmissionDate =this.validateDate(rowData,'Admission_Date',i,headerRow,expectedColumns1,StudentName);
  const isValidSlivingDate =this.validateDate(rowData,'Date_of_Leaving_of_Previous_School',i,headerRow,expectedColumns1,StudentName);
  const isValidFBirthDate =this.validateDate(rowData,'Father_Birth_Date',i,headerRow,expectedColumns1,StudentName);
  const isValidMBirthDate =this.validateDate(rowData,'Mother_Birth_Date',i,headerRow,expectedColumns1,StudentName);
  const isValidGBirthDate =this.validateDate(rowData,'Guardian_Birth_Date',i,headerRow,expectedColumns1,StudentName);

  const isValidIsRTE=this.validateCheck(rowData,'Is_RTE',i,headerRow,expectedColumns1,StudentName);
  const isValidIsNew=this.validateCheck(rowData,'Is_New_Student',i,headerRow,expectedColumns1,StudentName);
  const isValidIsDeactive=this.validateCheck(rowData,'Is_Deactive',i,headerRow,expectedColumns1,StudentName);
  const isValidApplyCncession=this.validateCheck(rowData,'Apply_Concession',i,headerRow,expectedColumns1,StudentName);
   const isValidIsAppAccess=this.validateCheck(rowData,'Do_you_required_parent_mobile_app_access',i,headerRow,expectedColumns1,StudentName);

   const isvalidGrade=this.validateGrade(rowData,'Grade',i,headerRow,expectedColumns1,StudentName);
   const isvalidDivision=this.validateDivision(rowData,'Division',i,headerRow,expectedColumns1,StudentName);

   const isValidGender=this.validateGender(rowData,'Gender',i,headerRow,expectedColumns1,StudentName);
   const isValidFGender=this.validateGender(rowData,'Father_Gender',i,headerRow,expectedColumns1,StudentName);
   const isValidMGender=this.validateGender(rowData,'Mother_Gender',i,headerRow,expectedColumns1,StudentName);
   const isValidGGender=this.validateGender(rowData,'Guardian_Gender',i,headerRow,expectedColumns1,StudentName);

   const isValidRollNo=this.validateRollNo(rowData,'Roll_No',i,headerRow,expectedColumns1,StudentName);

   if(isValidBirthDate == true){
    const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === ('Birth_Date').toLowerCase());
      const cellValue = rowData[colIndex].trim();
      if(cellValue){
    const dateInWord=this.convertDateToWords(cellValue);
    const col = headerRow.findIndex(colName => colName.toLowerCase() === ('Date_Of_Birth_In_Words').toLowerCase());
    
      rowData[col] = dateInWord;
    }

   }

   if (isValidGender || isValidFGender || isValidMGender || isValidGGender) {
    const columnsToCheck = [
      { name: 'Gender', key: 'M' },
      { name: 'Father_Gender', key: 'M' },
      { name: 'Mother_Gender', key: 'M' },
      { name: 'Guardian_Gender', key: 'M' },
      { name: 'Gender', key: 'F' },
      { name: 'Father_Gender', key: 'F' },
      { name: 'Mother_Gender', key: 'F' },
      { name: 'Guardian_Gender', key: 'F' }
    ];
  
    columnsToCheck.forEach(column => {
      const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === (column.name).toLowerCase());
      const cellValue = rowData[colIndex];
      if (cellValue && cellValue.toLowerCase() === this.translate.instant(column.key).toLowerCase())  {
        rowData[colIndex] = column.key;
      }
    });
  }
  
   if(isValidIsRTE ||  isValidIsNew ||  isValidIsDeactive || isValidApplyCncession || isValidIsAppAccess  )
   {
    
    const columnsToCheck = [
      { name: 'Is_RTE', value: 'Y' },
      { name: 'Is_New_Student', value: 'Y' },
      { name: 'Is_Deactive', value: 'Y' },
      { name: 'Apply_Concession', value: 'Y' },
      { name: 'Do_you_required_parent_mobile_app_access', value: 'Y' },
      { name: 'Is_RTE', value: 'N' },
      { name: 'Is_New_Student', value: 'N' },
      { name: 'Is_Deactive', value: 'N' },
      { name: 'Apply_Concession', value: 'N' },
      { name: 'Do_you_required_parent_mobile_app_access', value: 'N' }
    ];
  
    columnsToCheck.forEach(column => {
      const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === (column.name).toLowerCase());
      const cellValue = rowData[colIndex]?.trim();
     
      if (cellValue && cellValue.toLowerCase() === this.translate.instant(column.value).toLowerCase()) {
        rowData[colIndex] = column.value;
      }
    });
  
  }

  if(isValidCurrentCountry|| isValidBirthCountry || isValidFCountry || isValidMCountry || isValidGCountry  )
{

  const countryColumns = ['Current_Country', 'Birth_Country', 'Father_Country', 'Mother_Country', 'Guardian_Country'];
  const idColumns=['Current_CountryId','Birth_CountryId','Father_CountryId','Mother_CountryId','Gaurdian_CountryId']
  countryColumns.forEach((columnName,index) => {
    const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
    const idcolIndex = headerRow.findIndex(colName => colName.toLowerCase() === idColumns[index].toLowerCase());

    const cellValue = rowData[colIndex]?.trim();
    if(cellValue){
    const validCountry = this.countryDropdownList.find(country =>this.translate.instant(country.countryKey!).toLowerCase() === cellValue.toLowerCase());
  
    if (cellValue && validCountry) {
      //rowData[colIndex] = validCountry.countryName;
      rowData[idcolIndex] = validCountry.countryId;

    }}
  });
}
if(isValidCurrentState|| isValidBirthState || isValidFState || isValidMState || isValidGState  )
{
  
  const countryColumns = ['Current_Country', 'Birth_Country', 'Father_Country', 'Mother_Country', 'Guardian_Country'];
  const stateColumns=['Current_State', 'Birth_State', 'Father_State', 'Mother_State', 'Guardian_State'];
  const idColumns=['Current_StateId','Birth_StateId','Father_StateId','Mother_StateId','Gaurdian_StateId']
  

  stateColumns.forEach((columnName,index) => {
    const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
    const idcolIndex = headerRow.findIndex(colName => colName.toLowerCase() === idColumns[index].toLowerCase());

    const cellValue = rowData[colIndex]?.trim();
    if(cellValue){
    const countryIndex = headerRow.findIndex(colName => colName.toLowerCase() === countryColumns[index].toLowerCase());
    const countrycellValue = rowData[countryIndex]?.trim();
      if(countrycellValue){
    const validCountry = this.countryDropdownList.find(d => this.translate.instant(d.countryKey!).toLowerCase() === countrycellValue.toLowerCase());

    const validState = this.stateDropdownList.find(state =>this.translate.instant(state.stateKey!).toLowerCase() === cellValue.toLowerCase() && state.countryId==validCountry?.countryId);

    if (cellValue && validState) {
      rowData[idcolIndex] = validState.stateId;
    }}}
  });
}
if(isValidCurrentDistrict|| isValidBirthDistrict || isValidFDistrict || isValidMDistrict || isValidGDistrict  )
{
  const stateColumns=['Current_State', 'Birth_State', 'Father_State', 'Mother_State', 'Guardian_State'];
  const districtColumns = ['Current_District', 'Birth_District', 'Father_District', 'Mother_District', 'Guardian_District'];
  const idColumns=['Current_DistrictId','Birth_DistrictId','Father_DistrictId','Mother_DistrictId','Gaurdian_DistrictId']

  districtColumns.forEach((columnName,index) => {
    const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
    const idcolIndex = headerRow.findIndex(colName => colName.toLowerCase() === idColumns[index].toLowerCase());

    const cellValue = rowData[colIndex]?.trim();
    if(cellValue){
    const stateIndex = headerRow.findIndex(colName => colName.toLowerCase() === stateColumns[index].toLowerCase());
    const statecellValue = rowData[stateIndex]?.trim();
    if(statecellValue){
    const validState = this.stateDropdownList.find(d => this.translate.instant(d.stateKey!).toLowerCase() === statecellValue.toLowerCase());

    const validDistrict = this.districtDropdownList.find(district =>this.translate.instant( district.districtKey!).toLowerCase() === cellValue.toLowerCase() && district.stateId==validState?.stateId);
  
    if (cellValue && validDistrict) {
      rowData[idcolIndex] = validDistrict.districtId;
    }}}
  });
}

if(isValidCurrentTaluka|| isValidBirthTaluka || isValidFTaluka || isValidMTaluka || isValidGTaluka  )
{
  const districtColumns = ['Current_District', 'Birth_District', 'Father_District', 'Mother_District', 'Guardian_District'];
  const talukaColumns = ['Current_Taluka', 'Birth_Taluka', 'Father_Taluka', 'Mother_Taluka', 'Guardian_Taluka'];
  const idColumns=['Current_TalukaId','Birth_TalukaId','Father_TalukaId','Mother_TalukaId','Gaurdian_TalukaId']

  talukaColumns.forEach((columnName,index) => {
    const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
    const idcolIndex = headerRow.findIndex(colName => colName.toLowerCase() === idColumns[index].toLowerCase());

    const cellValue = rowData[colIndex]?.trim();
    if(cellValue){
    const districtIndex = headerRow.findIndex(colName => colName.toLowerCase() === districtColumns[index].toLowerCase());
    const districtcellValue = rowData[districtIndex]?.trim();
    if(districtcellValue){
    const validDistrict = this.districtDropdownList.find(d => this.translate.instant(d.districtKey!).toLowerCase() === districtcellValue.toLowerCase());

    const validTaluka = this.talukaDropdownList.find(taluka => this.translate.instant(taluka.talukaKey!).toLowerCase() === cellValue.toLowerCase() && taluka.districtId==validDistrict?.districtId);
  
    if (cellValue && validTaluka) {
      rowData[idcolIndex] = validTaluka.talukaId;
    }}}
  });
}
}

cellValue(rowData: any[], columnName: string,headerRow: string[]):any{
  const targetColumnIndex = headerRow.findIndex((colName) =>
        colName.toLowerCase() === columnName.toLowerCase()
    );
   const value=rowData[targetColumnIndex];
   if(!value)
   {
    return('');
   }
   return(value);
}

validateRollNo(rowData: any[], columnName: string, i: number,headerRow: string[],expectedColumns1: { [key: string]: string },StudentName:string): boolean {
 
  const cellValue = this.cellValue(rowData,columnName,headerRow);
  const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
  const excelColumnName=this.getExcelColumnName(colIndex);
  if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
    return true;
}
 const rollNumberPattern = /^[0-9]+$/; // Pattern for numeric only
    if (!rollNumberPattern.test(cellValue) && cellValue != null && cellValue != undefined && cellValue != "") {
      this.FileUploadErrors.push(`Invalid  '${(columnName)}' accept only numeric Value at position ${excelColumnName}${i + 1} for student ${StudentName }`);
      return false;
    }
    return true;
}

validateCountry(rowData: any[], columnName: string, i: number,headerRow: string[],expectedColumns1: { [key: string]: string },StudentName:string): boolean {

  const cellValue = this.cellValue(rowData,columnName,headerRow);
  const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
   const excelColumnName=this.getExcelColumnName(colIndex);
  //   if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue.trim() === '')) {
  //   this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for student ${StudentName }`);
  //   return false;
  // }
  if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
    return true;
}
if(cellValue!=''){
  const validCountryList = this.countryDropdownList.map(country => this.translate.instant(country.countryKey!).toLowerCase());
  if (!validCountryList.includes(cellValue.toLowerCase())) {
    this.FileUploadErrors.push(`Invalid '${(columnName)}' at position ${excelColumnName}${i + 1} for student ${StudentName }`);
    return false;
  }}
  return true;
}
validateState(rowData: any[], columnName: string, countryName:string, i: number,headerRow: string[],expectedColumns1: { [key: string]: string },StudentName:string): boolean {
 
  const cellValue = this.cellValue(rowData,columnName,headerRow);
  const country = this.cellValue(rowData,countryName,headerRow);
  const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
   const excelColumnName=this.getExcelColumnName(colIndex);
  // if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue.trim() === '')) {

  //   this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for student ${StudentName }`);
  //   return false;
  // }
  if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
    return true;
}
if(cellValue!=''){
  const validStateList = this.stateDropdownList.map(state => this.translate.instant(state.stateKey!).toLowerCase());
  if (!validStateList.includes(cellValue.toLowerCase())) {
    this.FileUploadErrors.push(`Invalid '${(columnName)}' at position ${excelColumnName}${i + 1} for student ${StudentName }`);
    return false;
  }
  else{ 
    let selectedcountry = this.countryDropdownList.find(c => this.translate.instant(c.countryKey!).toLowerCase() === country.toLowerCase());
    let selectedState = this.stateDropdownList.find(s => this.translate.instant(s.stateKey!).toLowerCase() === cellValue.toLowerCase() && s.countryId===selectedcountry?.countryId);
    const selectedMapping = this.stateDropdownList.find(mapping => mapping.countryId === selectedcountry?.countryId && mapping.stateId === selectedState?.stateId);
    if(!selectedMapping){
    this.FileUploadErrors.push(`Invalid  mapping between '${(countryName)}'  and '${(columnName)}' at position ${excelColumnName}${i + 1} for student ${StudentName }`);
    return false;}
  }}
  return true;
}

validateDistrict(rowData: any[], columnName: string, stateName:string,i: number,headerRow: string[],expectedColumns1: { [key: string]: string },StudentName:string): boolean {
 
  const cellValue = this.cellValue(rowData,columnName,headerRow);
  const state = this.cellValue(rowData,stateName,headerRow);
  const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
  const excelColumnName=this.getExcelColumnName(colIndex);
  //     if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue.trim() === '')) {

  //       this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for student ${StudentName }`);
  //       return false;
  // }
  if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
    return true;
}
if(cellValue!=''){
  const validDistrictList = this.districtDropdownList.map(district => this.translate.instant(district.districtKey!).toLowerCase());
  if (!validDistrictList.includes(cellValue.toLowerCase())) {
    this.FileUploadErrors.push(`Invalid '${(columnName)}' at position ${excelColumnName}${i + 1} for student ${StudentName }`);
    return false;}
    else{ 
      let selectedState = this.stateDropdownList.find(s => this.translate.instant(s.stateKey!).toLowerCase() === state.toLowerCase());
      let selectedDistrict = this.districtDropdownList.find(d => this.translate.instant(d.districtKey!).toLowerCase() === cellValue.toLowerCase() && d.stateId===selectedState?.stateId);
      const selectedMapping = this.districtDropdownList.find(mapping => mapping.stateId === selectedState?.stateId && mapping.districtId === selectedDistrict?.districtId);
      if(!selectedMapping){
        this.FileUploadErrors.push(`Invalid  mapping between '${(stateName)}'  and '${(columnName)}' at position ${excelColumnName}${i + 1} for student ${StudentName }`);
        return false;}
    }}

  return true;
}

validateTaluka(rowData: any[], columnName: string,districtName:string ,i: number,headerRow: string[],expectedColumns1: { [key: string]: string },StudentName:string): boolean {

  const cellValue = this.cellValue(rowData,columnName,headerRow);
  const district = this.cellValue(rowData,districtName,headerRow);
  const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
  const excelColumnName=this.getExcelColumnName(colIndex);
  // if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue.trim() === '')) {

  //   this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for student ${StudentName }`);
  //   return false;
  // }
  if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
    return true;
}
if(cellValue!=''){
  const validTalukaList = this.talukaDropdownList.map(taluka => this.translate.instant(taluka.talukaKey!).toLowerCase());
  if (!validTalukaList.includes(cellValue.toLowerCase())) {
    this.FileUploadErrors.push(`Invalid '${(columnName)}' at position ${excelColumnName}${i + 1} for student ${StudentName }`);
    return false;}
    else{ 
      let selectedDistrict = this.districtDropdownList.find(d => this.translate.instant(d.districtKey!).toLowerCase() === district.toLowerCase());
      let selectedTaluka = this.talukaDropdownList.find(t => this.translate.instant(t.talukaKey!).toLowerCase() === cellValue.toLowerCase() && t.districtId===selectedDistrict?.districtId);
      const selectedMapping = this.talukaDropdownList.find(mapping => mapping.talukaId === selectedTaluka?.talukaId && mapping.districtId === selectedDistrict?.districtId);
      if(!selectedMapping){
        this.FileUploadErrors.push(`Invalid  mapping between '${(districtName)}'  and '${(columnName)}' at position ${excelColumnName}${i + 1} for student ${StudentName }`);
      return false;}
    }}
  return true;
}

validateDate(rowData: any[], columnName: string, i: number, headerRow: string[],expectedColumns1: { [key: string]: string },StudentName:string): boolean {

  const cellValue = this.cellValue(rowData,(columnName),headerRow);
  const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
  const excelColumnName=this.getExcelColumnName(colIndex);
  // if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue.trim() === '')) {

  //   this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for student ${StudentName } `);
  //   return false;
  // }
  if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
    return true;
  }
  if(cellValue!=''){
  if(!this.isDateFormatCorrect(cellValue)){
    this.FileUploadErrors.push(`Invalid  ${(columnName)} format at position ${excelColumnName}${i + 1} for student ${StudentName } `);
    return false;

  }
  const convertedDate:string = cellValue.trim().replace(/(\d{2})_(\d{2})_(\d{4})/, '$1-$2-$3');
  //const dateObject = new Date(convertedDate);
  const dateParts = convertedDate.split('-'); 
const day = parseInt(dateParts[0], 10);
const month = parseInt(dateParts[1], 10); // Month is zero-based in JavaScript Date object
const year = parseInt(dateParts[2], 10);
  if (month < 1 ||month > 12|| day < 1 || day > 31
      ) {
    this.FileUploadErrors.push(`Invalid '${(columnName)}' date  at position ${excelColumnName}${i + 1} for student ${StudentName}`);
    return false;
  }}

  return true;
}
isDateFormatCorrect(dateString:string):boolean {
 
const dateRegrex=/^\d{2}_\d{2}_\d{4}$/;
return  dateRegrex.test(dateString);
}

isAcademicFormatCorrect(year:string):boolean {
  const yearRegex=/^\d{4}_\d{4}$/;
  return  yearRegex.test(year);
  }

validateAcademicYear(rowData: any[], columnName: string, i: number, headerRow: string[],expectedColumns1: { [key: string]: string },StudentName:string): boolean 
{
 
  const cellValue = this.cellValue(rowData,columnName,headerRow);
  const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
  const excelColumnName=this.getExcelColumnName(colIndex);
  // if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue.trim() === '')) {

  //   this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for student ${StudentName }`);
  //   return false;
  // }
  
  if(!this.isAcademicFormatCorrect(cellValue)){
    this.FileUploadErrors.push(`Invalid  ${(columnName)} format at position ${excelColumnName}${i + 1}    for student ${StudentName }`);
    return false;

  }
  if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
    return true;
  }
  if(cellValue!=''){
  const convertedYear:string = cellValue.trim().replace(/(\d{4})_(\d{4})/, '$1-$2');
  const validAcademicYear = this.academicYearList.map(year => year.academicYearName!);
  if (!validAcademicYear.includes(convertedYear.trim())) {
    this.FileUploadErrors.push(`Invalid '${(columnName)}' at position ${excelColumnName}${i + 1} for student ${StudentName}`);
    return false;
  }}
  return true;
}

validateCheck(rowData: any[], columnName: string, i: number, headerRow: string[],expectedColumns1: { [key: string]: string },StudentName:string): boolean 
{
  const cellValue = this.cellValue(rowData,(columnName),headerRow);
  const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
  const excelColumnName=this.getExcelColumnName(colIndex);
  // if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue.trim() === '')) {

  //   this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for student ${StudentName }`);
  //   return false;
  // }
  if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
    return true;
}
if(cellValue!=''){
  if(!(cellValue===this.translate.instant('Y') || cellValue===this.translate.instant('N')) ){
    this.FileUploadErrors.push(`Invalid '${(columnName)}' at position ${excelColumnName}${i + 1} for student ${StudentName}`);
    return false;
  }}
  return true;
}
validateGender(rowData: any[], columnName: string, i: number, headerRow: string[],expectedColumns1: { [key: string]: string },StudentName:string): boolean {
 
  const cellValue = this.cellValue(rowData,(columnName),headerRow);
  const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
  const excelColumnName=this.getExcelColumnName(colIndex);
  // if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue.trim() === '')) {

  //   this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for student ${StudentName }`);
  //   return false;
  // }
  if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
    return true;
}
if(cellValue!=''){
  if(!(cellValue===this.translate.instant('F') || cellValue===this.translate.instant('M') )){
    this.FileUploadErrors.push(`Invalid '${(columnName)}' at position ${excelColumnName}${i + 1} for student ${StudentName}`);
    return false;
  }}
  return true;
}

validateGrade(rowData: any[], columnName: string, i: number, headerRow: string[],expectedColumns1: { [key: string]: string },StudentName:string): boolean 
{
  
    const cellValue = this.cellValue(rowData,columnName,headerRow);
    const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
  const excelColumnName=this.getExcelColumnName(colIndex);
    // if (expectedColumns1[columnName] === 'required' && (!cellValue)) {
  
    //   this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for student ${StudentName }`);
    //   return false;
    // }
    if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
      return true;
  }
  if(cellValue!=''){
    const validGrade = this.grades.map(g => g.gradeName);
    if (!validGrade.includes(cellValue.toString())) {
      this.FileUploadErrors.push(`Invalid '${(columnName)}' at position ${excelColumnName}${i + 1}  for student ${StudentName}`);
      return false;
    }}
    return true;
  }
  validateDivision(rowData: any[], columnName: string, i: number, headerRow: string[],expectedColumns1: { [key: string]: string },StudentName:string): boolean 
  {
  
      const cellValue = this.cellValue(rowData,columnName,headerRow);
      const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
  const excelColumnName=this.getExcelColumnName(colIndex);
      const  grade=this.cellValue(rowData,'Grade',headerRow).toString();
      // if (expectedColumns1[columnName] === 'required' && (!cellValue)) {
    
      //   this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for student ${StudentName }`);
      //   return false;
      // }
      if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
        return true;
    }
    if(cellValue!=''){
      let selectedGrade = this.grades.find(g => g.gradeName === grade);
      let selectedDivision = this.divisions.find(d => d.divisionName === cellValue);
      if (!selectedDivision) {
        this.FileUploadErrors.push(`Invalid '${(columnName)}' at position ${excelColumnName}${i + 1}  for student ${StudentName}`);
        return false;
      }
      else{
        const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.gradeId === selectedGrade?.gradeId && mapping.divisionId === selectedDivision?.divisionId);
        if(!selectedClassMapping)
        this.FileUploadErrors.push(`Invalid  mapping between Grade and '${(columnName)}'at position ${excelColumnName}${i + 1}  for student ${StudentName}`);
        return false;
      }}
      return true;
    }
    validateBirthPlace(rowData: any[], columnName: string, i: number, headerRow: string[],expectedColumns1: { [key: string]: string },StudentName:string): boolean {
  
      const cellValue = this.cellValue(rowData,columnName,headerRow);
      const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
      const excelColumnName=this.getExcelColumnName(colIndex);
      if (expectedColumns1[columnName] === 'required' && (!cellValue)) {
    
        this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for student ${StudentName }`);
        return false;
      }
        
      return true;
    }


getMasterData()
{
      this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
            this.academicYearId=academicYearId as number;
    });
}

errorPopUp(FileUploadErrors:string[])
{
  
  const modalRef = this.modalService1.open(ErrorModalComponent, { size: 'lg',backdrop:'static' });
  modalRef.componentInstance.validationErrors=FileUploadErrors;
  modalRef.componentInstance.message = 'DATA_VALIDATION_ERRORS';
  modalRef.componentInstance.title = 'FAILED_TO_UPLOAD_DATA';
  modalRef.componentInstance.modelRef=modalRef;
  modalRef.result.then((result:any) => {
    if(result==true)
    {
    }
});
}


getExcelColumnName(columnIndex: number): string {
  let columnName = '';

  while (columnIndex >= 0) {
      columnName = String.fromCharCode(65 + (columnIndex % 26)) + columnName;
      columnIndex = Math.floor(columnIndex / 26) - 1;
  }

  return columnName;
}

convertDateToWords(date: string): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const numWords = [
    'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
    'Twenty', 'Twenty One', 'Twenty Two', 'Twenty Three', 'Twenty Four', 'Twenty Five', 'Twenty Six', 'Twenty Seven', 'Twenty Eight', 'Twenty Nine',
    'Thirty', 'Thirty One'
  ];

  const tensWords = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  const nth = () => '';

  const convertedDate: string = date.trim().replace(/(\d{2})_(\d{2})_(\d{4})/, '$1-$2-$3');
  const dateParts = convertedDate.split('-');
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10); // Month is zero-based in JavaScript Date object
  const year = parseInt(dateParts[2], 10);
  
  // Convert day into words
  const dayInWords = numWords[day];
  // Convert month into words
  const monthInWords = months[month - 1]; // Months array is zero-based
  // Convert year into words
  const yearInWords = this.convertYearToWords(year, numWords, tensWords);
  
  const dateInWord = `${dayInWords} ${monthInWords} ${yearInWords}`;
  
  return dateInWord;
}
convertYearToWords(
  year: number,
  numWords: string[],
  tensWords: string[]
): string {
  const thousands = Math.floor(year / 1000);
  const hundreds = Math.floor((year % 1000) / 100);
  const tens = Math.floor((year % 100) / 10);
  const ones = year % 10;

  let yearInWords = '';

  if (thousands > 0) {
    yearInWords += numWords[thousands] + ' Thousand ';
  }

  if (hundreds > 0) {
    yearInWords += numWords[hundreds] + ' Hundred ';
  }

  if (tens > 1) {
    yearInWords += tensWords[tens] + ' ';
    if (ones > 0) {
      yearInWords += numWords[ones];
    }
  } else if (tens === 1) {
    yearInWords += numWords[tens * 10 + ones];
  } else if (ones > 0) {
    yearInWords += numWords[ones];
  }

  return yearInWords.trim();
}

}
