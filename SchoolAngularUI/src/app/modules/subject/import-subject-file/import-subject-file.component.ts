import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { MasterServiceProxy, ResponseImportSubjectDataDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import {  utils, writeFile,WorkSheet,read ,write,WorkBook} from 'xlsx-js-style';
import { environment } from 'src/environments/environment';
import { ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { ErrorModalComponent } from '../../students/error-modal/error-modal.component';



@Component({
  selector: 'app-import-subject-file',
  templateUrl: './import-subject-file.component.html',
  styleUrls: ['./import-subject-file.component.scss']
})
export class ImportSubjectFileComponent {
  FileUploadErrors:string[]=[];
  validationErrors: string[] = [];
  responseImportSubjectDataDto: ResponseImportSubjectDataDto;
  dataUpload :number;

    constructor(  private formBuilder: FormBuilder,
    private httpClient:HttpClient,
    private router:Router ,
    private modalService: NgbModal,
    public translate: TranslateService,
    private masterService:MasterServiceProxy,
    private userService:UserService,) { 
      
    }
    errorMessage : String;
    selectedFileName: string;
    selectedFile: File;
    data: any[] = [];
    sheetData:any[]=[];
    modelRef:any;
   expectedColumns: { [key: string]: string } = { 
    Subject_Name:'required' 
    } 

    downloadTemplate(){       
      this.data=[['Subject_Name'],
                  ['testSubject']];
      const wb = utils.book_new();
      const ws = utils.json_to_sheet([]);
                  
       utils.sheet_add_json(ws, this.data, { skipHeader: true});       
      let cell1 ={v: 'Subject_Name', s:{}, t: 's'}
       cell1.s ={
             font:{
                bold:true,
                color: {rgb : 'FFFF0000'}            
              },
                   
          };
                  ws['A1']= cell1;
            
                 
      utils.book_append_sheet(wb, ws, 'Subjects');
      
       writeFile(wb, 'Subject_Records.xlsx');
    }

    handleImport(event: any) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName =  this.selectedFile ?  this.selectedFile.name : '';
     }

     onUpload() {
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
            if (this.columnsMatch(this.expectedColumns, headerRow)) 
            {                        
              this.validateData(sheetData,headerRow,this.expectedColumns);
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
      
             
                this.httpClient.post(`${environment.API_BASE_URL}/api/SubjectImport/UploadSubjectData`,formData).subscribe((response: any) => {
              
                  this.responseImportSubjectDataDto = response;
                  this.dataUpload=this.responseImportSubjectDataDto.suceess;
              
                  if( this.dataUpload==0)
                  {
                  this.UploadSuccessNotification();
                  this.modelRef.close(true);
              }
            (error: any) => {
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
      
      columnsMatch(expectedColumns: { [key: string]: string }, actualColumns: string[]): boolean {
        const expectedKeys = Object.keys(expectedColumns);
        const missingRequiredColumns: string[] = [];
        const unexpectedColumns: string[] = [];
      
        expectedKeys.forEach((key) => {
          const isRequired = expectedColumns[key] === 'required';
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
        if (missingRequiredColumns.length > 0 ||unexpectedColumns.length > 0 ){
          return false;
        }
      
        return true;
      }
    
      validateData(sheetData: any[], headerRow: string[],expectedColumns: { [key: string]: string }) {
      
    const subjectMap: { [key: string]: number[] } = {};

    // Assuming headerRow contains the column names and the subject name is one of the columns
    const subjectIndex = headerRow.indexOf('Subject_Name');

    for (let i = 1; i < sheetData.length; i++) {
        const rowData = sheetData[i];
        const subjectName = rowData[subjectIndex]; // Access subject name using index
        if (subjectName) {
            if (subjectMap[subjectName]) {
                subjectMap[subjectName].push(i);
            } else {
                subjectMap[subjectName] = [i];
            }
        } else {
          this.FileUploadErrors.push(`Subject name ${subjectName} is Null`);
        }
    }

    // for (const subjectName in subjectMap) {
    //     if (subjectMap[subjectName].length > 1) {
    //         this.FileUploadErrors.push(` ${subjectName} subject name is dublicated at position ${subjectMap[subjectName].join(' And ')}`);
    //     }
    //   }
    for (const subjectName in subjectMap) {
      if (subjectMap[subjectName].length > 1) {
          const columnName = this.getExcelColumnName(subjectIndex); // Get Excel column name
          const duplicateRows = subjectMap[subjectName].map(row => `${columnName}${row}`).join(' and ');
          this.FileUploadErrors.push(`${subjectName} subject name is duplicated at position ${duplicateRows}`);
      }
    }
    }

    getExcelColumnName(columnIndex: number): string {
      let columnName = '';
  
      while (columnIndex >= 0) {
          columnName = String.fromCharCode(65 + (columnIndex % 26)) + columnName;
          columnIndex = Math.floor(columnIndex / 26) - 1;
      }
  
      return columnName;
  }

    close() {
      this.errorMessage = "";
      this.modelRef.close(false);
    }
    UploadSuccessNotification() {
      const newToastNotification = new ToastNotificationInitializer();
      newToastNotification.setTitle(this.translate.instant('SUCCESS'));
      newToastNotification.setMessage(this.translate.instant('FILE_UPLOADED_SUCCESSFULLY'));
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
      
      const modalRef = this.modalService.open(ErrorModalComponent, { size: 'lg',backdrop:'static' });
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
}