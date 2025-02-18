import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  utils, writeFile,WorkSheet,read ,write,WorkBook} from 'xlsx-js-style';
import { environment } from 'src/environments/environment';

// import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { TranslateService } from '@ngx-translate/core';
import { AcademicYear, CountryMasterDto, DistrictMasterDto, ResponseImportTeacherDataDto, StateMasterDto, TalukaMasterDto } from 'src/app/services/school-api-service';
import { ErrorModalComponent } from '../../students/error-modal/error-modal.component';

@Component({
  selector: 'app-import-teacher-file',
  templateUrl: './import-teacher-file.component.html',
  styleUrls: ['./import-teacher-file.component.scss']
})
export class ImportTeacherFileComponent {
 responseImportTeacherDataDto: ResponseImportTeacherDataDto;
  validationErrors: string[] = [];
  FileUploadErrors:string[]=[];
  insertCount :number;
  updateCount :number;
  modalService: any;academicYearId:number;
  schoolId:number;
  countryDropdownList : CountryMasterDto[];
  stateDropdownList : StateMasterDto[];
  districtDropdownList : DistrictMasterDto[];
  talukaDropdownList : TalukaMasterDto[];
  academicYearList: AcademicYear[]=[];
    constructor(  private httpClient:HttpClient,
    private modalService1: NgbModal,
    public translate: TranslateService,) { 
      
    }
  errorMessage : String;
  selectedFileName: string;

  selectedFile: File;
  data: any[] = [];
  sheetData:any[]=[];
  modelRef:any;
 expectedColumns1: { [key: string]: string } = { 
  First_Name:'required' ,Middle_Name :'required',Last_Name:'required' ,Gender:'required' ,
  Mobile_No :'required',Alternate_Contact_No:'' ,Email_Id:'' ,Address_Line_1 :'required',Address_Line_2:'' ,
  Country:'required' ,State:'required' ,District:'required' ,Taluka:'required' ,Pincode :'required',Adhaar_No:'',
  Education :'',Birth_Date:'required' , Blood_Group:'',IsAppAccess:'' , AppAccessMobileNo:'' 
  } 

  ngOnInit(): void {  
  }

  

downloadTemplate(){  
  //this.getMasterData();      
  this.data=[['First_Name','Middle_Name','Last_Name','Gender','Mobile_No','Alternate_Contact_No','Email_Id','Address_Line_1','Address_Line_2','Country','State','District','Taluka','Pincode','Adhaar_No','Education','Birth_Date','Blood_Group','IsAppAccess','AppAccessMobileNo',],
  ['firstName','middlename','lastname','M','2682658565','91649744989','teacher@gmail.com','Adrress1','Adress2','India','Maharashtra','Ahmednagar','Akole','265626','879598998599','graduation','14_02_1969','A+','Y','219959896']]

 const wb = utils.book_new();
 const ws = utils.json_to_sheet([]);
 
 utils.sheet_add_json(ws, this.data, { skipHeader: true});

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
  utils.book_append_sheet(wb, ws, 'Teachers');

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
  utils.book_append_sheet(wb, wsCheck, 'isAppAccess');



  writeFile(wb, 'Teacher_Records.xlsx');
}


handleImport(event: any) {
 // this.getMasterData();
  this.FileUploadErrors=[];
  this.selectedFile = event.target.files[0];
  this.selectedFileName =  this.selectedFile ?  this.selectedFile.name : '';
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

readExcel(file: File) {

  this.validationErrors=[];
  this.FileUploadErrors=[];
  const reader: FileReader = new FileReader();

  reader.onload = (e: any) => {
    const data: string = e.target.result;
    const workbook: WorkBook = read(data, { type: 'binary' });
    const firstSheetName: string = workbook.SheetNames[0];
    const worksheet: WorkSheet = workbook.Sheets[firstSheetName];
    const sheetData: any[] = utils.sheet_to_json(worksheet, { header: 1 });

    if (!Array.isArray(sheetData) || sheetData.length === 0) {
      console.error('Invalid file format. No data found in the sheet.');
      return;
    }

    // Extract the header row
    const headerRow: string[] = sheetData[0];
      if (this.columnsMatch(this.expectedColumns1, headerRow)) {
        headerRow.push('CountryId', 'StateId', 'DistrictId', 'TalukaId');
      this.validateData(sheetData,headerRow,this.expectedColumns1);
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

       
      this.httpClient.post(`${environment.API_BASE_URL}/api/TeacherImport/UploadTeacherData`,formData).subscribe((response: any) => {
        
        this.responseImportTeacherDataDto = response;
        this.insertCount=this.responseImportTeacherDataDto.insertedCount;
        this.updateCount=this.responseImportTeacherDataDto.updatedCount;
        if( this.insertCount >0 || this.updateCount >0 )
        {
          this.UploadSuccessNotification(this.insertCount,this.updateCount);
          this.modelRef.close(true);
        }
      () => {
        this.UploadUnSuccessNotification();
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
     this.validateWholeRow(sheetData[i], i, headerRow,expectedColumns1);
  }
}
validateWholeRow(rowData: any[], i: number,headerRow: string[],expectedColumns1: { [key: string]: string }) {
  
  const FirstName=this.cellValue(rowData,('First_Name'),headerRow);
  const LastLName=this.cellValue(rowData,('Last_Name'),headerRow);
  const TeacherName = FirstName.concat(' ', LastLName);

  for (let j = 0; j < headerRow.length; j++) {
    
    const columnName = headerRow[j];
    const cellValue = rowData[j];
    const excelColumnName = this.getExcelColumnName(j); // Get Excel column name

    if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue === '')) {

      this.FileUploadErrors.push(`'${(columnName)}' is required at position ${(excelColumnName)}${(i + 1)} for teacher ${TeacherName }`);
      
    } }

  const isValidCountry = this.validateCountry(rowData,'Country', i,headerRow,expectedColumns1,TeacherName);
   const isValidState = this.validateState(rowData, 'State','Country', i,headerRow,expectedColumns1,TeacherName);
   const isValidDistrict = this.validateDistrict(rowData,'District','State', i,headerRow,expectedColumns1,TeacherName);
   const isValidTaluka = this.validateTaluka(rowData, 'Taluka','District', i,headerRow,expectedColumns1,TeacherName);
    const isValidIsAppAccess=this.validateCheck(rowData,'IsAppAccess',i,headerRow,expectedColumns1,TeacherName);
  const isValidGender=this.validateGender(rowData,'Gender',i,headerRow,expectedColumns1,TeacherName);
   if (isValidGender) 
   {
    
    const columnsToCheck = [
      { name: 'Gender', key: 'M' },
      { name: 'Gender', key: 'F' }
     
    ];
  
    columnsToCheck.forEach(column => {
      const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === (column.name).toLowerCase());
      const cellValue = rowData[colIndex];
  
      if (cellValue && cellValue.toLowerCase() === this.translate.instant(column.key).toLowerCase())  {
        rowData[colIndex] = column.key;
      }
    });
  }
  
   if(isValidIsAppAccess)
   {
    
    const columnsToCheck = [
      { name: 'IsAppAccess', value: 'Y' },
      { name: 'IsAppAccess', value: 'N' }
     
    ];
  
    columnsToCheck.forEach(column => {
      const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === (column.name).toLowerCase());
      const cellValue = rowData[colIndex]?.trim();
  
      if (cellValue && cellValue.toLowerCase() === this.translate.instant(column.value).toLowerCase()) {
        rowData[colIndex] = column.value;
      }
    });
  
  }

  if (isValidCountry) {
   
    const columnName = 'Country'; // Modify this with the desired column name
    const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
    const countryId = 'CountryId'; // Modify this with the desired column name
    const idIndex = headerRow.findIndex(colName => colName.toLowerCase() === countryId.toLowerCase());
    const cellValue = rowData[colIndex]?.trim();
  
    const validCountry = this.countryDropdownList.find(country => this.translate.instant(country.countryKey!) === cellValue);
  
    if (cellValue && validCountry) {
      rowData[idIndex]=validCountry.countryId;
    }
  }
if(isValidState)
{
      const columnName = 'State';
      const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
    const cellValue = rowData[colIndex]?.trim();
    const countryName = 'Country';
    const countyrIndex = headerRow.findIndex(colName => colName.toLowerCase() === countryName.toLowerCase());
    const countrycellValue = rowData[countyrIndex]?.trim();

    const stateId = 'StateId'; // Modify this with the desired column name
    const idIndex = headerRow.findIndex(colName => colName.toLowerCase() === stateId.toLowerCase());
    
    const validCountry = this.countryDropdownList.find(d => this.translate.instant(d.countryKey!) === countrycellValue);

    const validState = this.stateDropdownList.find(state =>this.translate.instant(state.stateKey!) === cellValue && state.countryId==validCountry?.countryId);
    if (cellValue && validState) {
      rowData[idIndex]=validState.stateId;
    }
}
if(isValidDistrict)
{
 
    const columnName = 'District';
    const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
    const cellValue = rowData[colIndex]?.trim();

    const stateName = 'State';
    const stateIndex = headerRow.findIndex(colName => colName.toLowerCase() === stateName.toLowerCase());
    const statecellValue = rowData[stateIndex]?.trim();
    const districtId = 'DistrictId'; // Modify this with the desired column name
    const idIndex = headerRow.findIndex(colName => colName.toLowerCase() === districtId.toLowerCase());
    
    const validState = this.stateDropdownList.find(d => this.translate.instant(d.stateKey!) === statecellValue);
    const validDistrict = this.districtDropdownList.find(district =>this.translate.instant( district.districtKey!) === cellValue && district.stateId==validState?.stateId);
  
    if (cellValue && validDistrict) {
      rowData[idIndex]=validDistrict.districtId;
    }
}

if(isValidTaluka)
{
  debugger;
    const columnName = 'Taluka';
    const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
    const cellValue = rowData[colIndex]?.trim();

    const districtName = 'District';
    const districtIndex = headerRow.findIndex(colName => colName.toLowerCase() === districtName.toLowerCase());
    const districtcellValue = rowData[districtIndex]?.trim();

    const talukaId = 'TalukaId'; // Modify this with the desired column name
    const idIndex = headerRow.findIndex(colName => colName.toLowerCase() === talukaId.toLowerCase());
    
  
    const validDistrict = this.districtDropdownList.find(d => this.translate.instant(d.districtKey!) === districtcellValue);
    const validTaluka = this.talukaDropdownList.find(taluka => this.translate.instant(taluka.talukaKey!) === cellValue && taluka.districtId==validDistrict?.districtId);

  
    if (cellValue && validTaluka) {
      rowData[idIndex]=validTaluka.talukaId;
    }

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

validateCountry(rowData: any[], columnName: string, i: number,headerRow: string[],expectedColumns1: { [key: string]: string },TeacherName:string): boolean {

  const cellValue = this.cellValue(rowData,columnName,headerRow);
  const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
   const excelColumnName=this.getExcelColumnName(colIndex);
  //   if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue.trim() === '')) {
  //   this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for teacher ${TeacherName }`);
  //   return false;
  // }
  if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
    return true;
}
if(cellValue!=''){
  const validCountryList = this.countryDropdownList.map(country => this.translate.instant(country.countryKey!));
  if (!validCountryList.includes(cellValue)) {
    this.FileUploadErrors.push(`Invalid '${(columnName)}' at position ${excelColumnName}${i + 1} for teacher ${TeacherName }`);
    return false;
  }}
  return true;
}
validateState(rowData: any[], columnName: string, countryName:string, i: number,headerRow: string[],expectedColumns1: { [key: string]: string },TeacherName:string): boolean {
 
  const cellValue = this.cellValue(rowData,columnName,headerRow);
  const country = this.cellValue(rowData,countryName,headerRow);
  const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
   const excelColumnName=this.getExcelColumnName(colIndex);
  // if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue.trim() === '')) {

  //   this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for teacher ${TeacherName }`);
  //   return false;
  // }
  if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
    return true;
}
if(cellValue!=''){
  const validStateList = this.stateDropdownList.map(state => this.translate.instant(state.stateKey!));
  if (!validStateList.includes(cellValue)) {
    this.FileUploadErrors.push(`Invalid '${(columnName)}' at position ${excelColumnName}${i + 1} for teacher ${TeacherName }`);
    return false;
  }
  else{ 
    let selectedcountry = this.countryDropdownList.find(c => this.translate.instant(c.countryKey!) === country);
    let selectedState = this.stateDropdownList.find(s => this.translate.instant(s.stateKey!) === cellValue && s.countryId===selectedcountry?.countryId);
    const selectedMapping = this.stateDropdownList.find(mapping => mapping.countryId === selectedcountry?.countryId && mapping.stateId === selectedState?.stateId);
    if(!selectedMapping){
    this.FileUploadErrors.push(`Invalid  mapping between '${(countryName)}'  and '${(columnName)}' at position ${excelColumnName}${i + 1} for teacher ${TeacherName }`);
    return false;}
  }}
  return true;
}

validateDistrict(rowData: any[], columnName: string, stateName:string,i: number,headerRow: string[],expectedColumns1: { [key: string]: string },TeacherName:string): boolean {
  
  const cellValue = this.cellValue(rowData,columnName,headerRow);
  const state = this.cellValue(rowData,stateName,headerRow);
  const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
  const excelColumnName=this.getExcelColumnName(colIndex);
  //     if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue.trim() === '')) {

  //       this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for teacher ${TeacherName }`);
  //       return false;
  // }
  if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
    return true;
}
if(cellValue!=''){
  const validDistrictList = this.districtDropdownList.map(district => this.translate.instant(district.districtKey!));
  if (!validDistrictList.includes(cellValue)) {
    this.FileUploadErrors.push(`Invalid '${(columnName)}' at position ${excelColumnName}${i + 1} for teacher ${TeacherName }`);
    return false;}
    else{ 
      let selectedState = this.stateDropdownList.find(s => this.translate.instant(s.stateKey!) === state);
      let selectedDistrict = this.districtDropdownList.find(d => this.translate.instant(d.districtKey!) === cellValue && d.stateId===selectedState?.stateId);
      const selectedMapping = this.districtDropdownList.find(mapping => mapping.stateId === selectedState?.stateId && mapping.districtId === selectedDistrict?.districtId);
      if(!selectedMapping){
        this.FileUploadErrors.push(`Invalid  mapping between '${(stateName)}'  and '${(columnName)}' at position ${excelColumnName}${i + 1} for teacher ${TeacherName }`);
        return false;}
    }}

  return true;
}

validateTaluka(rowData: any[], columnName: string,districtName:string ,i: number,headerRow: string[],expectedColumns1: { [key: string]: string },TeacherName:string): boolean {
  
  const cellValue = this.cellValue(rowData,columnName,headerRow);
  const district = this.cellValue(rowData,districtName,headerRow);
  const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
  const excelColumnName=this.getExcelColumnName(colIndex);
  // if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue.trim() === '')) {

  //   this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for teacher ${TeacherName}`);
  //   return false;
  // }
  if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
    return true;
}
if(cellValue!=''){
  const validTalukaList = this.talukaDropdownList.map(taluka => this.translate.instant(taluka.talukaKey!));
  if (!validTalukaList.includes(cellValue)) {
    this.FileUploadErrors.push(`Invalid '${(columnName)}' at position ${excelColumnName}${i + 1} for teacher ${TeacherName }`);
    return false;}
    else{ 
      let selectedDistrict = this.districtDropdownList.find(d => this.translate.instant(d.districtKey!) === district);
      let selectedTaluka = this.talukaDropdownList.find(t => this.translate.instant(t.talukaKey!) === cellValue && t.districtId===selectedDistrict?.districtId);
      const selectedMapping = this.talukaDropdownList.find(mapping => mapping.talukaId === selectedTaluka?.talukaId && mapping.districtId === selectedDistrict?.districtId);
      if(!selectedMapping){
        this.FileUploadErrors.push(`Invalid  mapping between '${(districtName)}'  and '${(columnName)}' at position ${excelColumnName}${i + 1} for teacher ${TeacherName }`);
      return false;}
    }}
  return true;
}

validateDate(rowData: any[], columnName: string, i: number, headerRow: string[],expectedColumns1: { [key: string]: string },TeacherName:string): boolean {

  const cellValue = this.cellValue(rowData,(columnName),headerRow);
  const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
  const excelColumnName=this.getExcelColumnName(colIndex);
  // if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue.trim() === '')) {

  //   this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for teacher ${TeacherName }`);
  //   return false;
  // }
  if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
    return true;
  }
  if(cellValue!=''){
  if(!this.isDateFormatCorrect(cellValue)){
    this.FileUploadErrors.push(`Invalid  ${(columnName)} format at position ${excelColumnName}${i + 1}  for teacher ${TeacherName }`);
    return false;

  }
  const convertedDate:string = cellValue.trim().replace(/(\d{2})_(\d{2})_(\d{4})/, '$1-$2-$3');
  //const dateObject = new Date(convertedDate);
  const dateParts = convertedDate.split('-'); 
const day = parseInt(dateParts[0], 10);
const month = parseInt(dateParts[1], 10); // Month is zero-based in JavaScript Date object
  if (month < 1 ||month > 12|| day < 1 || day > 31
      ) {
    this.FileUploadErrors.push(`Invalid '${(columnName)}' date  at position ${excelColumnName}${i + 1} for teacher ${TeacherName }`);
    return false;
  }}

  return true;
}
isDateFormatCorrect(dateString:string):boolean {
 
const dateRegrex=/^\d{2}_\d{2}_\d{4}$/;
return  dateRegrex.test(dateString);
}
validateCheck(rowData: any[], columnName: string, i: number, headerRow: string[],expectedColumns1: { [key: string]: string },TeacherName:string): boolean 
{
  const cellValue = this.cellValue(rowData,(columnName),headerRow);
  const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
  const excelColumnName=this.getExcelColumnName(colIndex);
  // if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue.trim() === '')) {

  //   this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for teacher ${TeacherName }`);
  //   return false;
  // }
  if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
    return true;
}
if(cellValue!=''){
  if(!(cellValue===this.translate.instant('Y') || cellValue===this.translate.instant('N')) ){
    this.FileUploadErrors.push(`Invalid '${(columnName)}' at position ${excelColumnName}${i + 1} for teacher ${TeacherName }`);
    return false;
  }}
  return true;
}
validateGender(rowData: any[], columnName: string, i: number, headerRow: string[],expectedColumns1: { [key: string]: string },TeacherName:string): boolean {
 
  const cellValue = this.cellValue(rowData,(columnName),headerRow);
  const colIndex = headerRow.findIndex(colName => colName.toLowerCase() === columnName.toLowerCase());
  const excelColumnName=this.getExcelColumnName(colIndex);
  // if (expectedColumns1[columnName] === 'required' && (!cellValue || cellValue.trim() === '')) {

  //   this.FileUploadErrors.push(` '${(columnName)}' is required at position ${excelColumnName}${i + 1} for teacher ${TeacherName }`);
  //   return false;
  // }
  if (expectedColumns1[columnName] !== 'required' && cellValue === null) {
    return true;
}
if(cellValue!=''){
  if(!(cellValue===this.translate.instant('F') || cellValue===this.translate.instant('M') )){
    this.FileUploadErrors.push(`Invalid '${(columnName)}' at position ${excelColumnName}${i + 1} for teacher ${TeacherName }`);
    return false;
  }}
  return true;
}

close() {
this.errorMessage = "";
this.modelRef.close(false);
}
UploadSuccessNotification(insertCount:number,updateCount:number) {
  const newToastNotification = new ToastNotificationInitializer();
  newToastNotification.setTitle(this.translate.instant('SUCCESS'));
  newToastNotification.setMessage(`${this.translate.instant('FILE_UPLOADED_SUCCESSFULLY')}
  ${insertCount} ${this.translate.instant('TEACHER_INSERTED')}
  ${updateCount} ${this.translate.instant('TEACHER_UPDATED')}`);
  newToastNotification.openToastNotification$();
  }
  UploadUnSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('Failed'));
    newToastNotification.setMessage(this.translate.instant('FAILED_TO_UPLOAD_FILE'));
    newToastNotification.openToastNotification$();
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
}