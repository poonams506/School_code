import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmBoxInitializer, DialogLayoutDisplay, ToastNotificationInitializer, ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { TranslateService } from '@ngx-translate/core';
import { AcademicYear, MasterServiceProxy, PromoteGridDto, PromoteServiceProxy, SchoolGradeDivisionMatrixDto } from 'src/app/services/school-api-service';

@Component({
  selector: 'app-add-promote-student',
  templateUrl: './add-promote-student.component.html',
  styleUrls: ['./add-promote-student.component.scss']
})
export class AddPromoteStudentComponent {
  academicYearId : number;
  isPass : boolean;
  promoteStudent : PromoteGridDto[];
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[];
  academicYearDropdownList:AcademicYear[]=[];
  nextAcademicYearId : number;
  nextAcademicYearText : string;
  promoteToForm1: FormGroup;
  promoteSubmitted = false;
  modelRef:any;
  gradeId: any;
  divisionId: any;
  constructor(private promoteService: PromoteServiceProxy, private formBuilder: FormBuilder,
    private masterService:MasterServiceProxy,public translate: TranslateService)
     { 
      this.promoteToForm1= this.formBuilder.group({
        classId: [null, Validators.required]
      });
      this.masterService.getAcademicYearData().subscribe(masterData=>{
        this.academicYearDropdownList = masterData.academicYears;
        this.nextAcademicYearId = this.academicYearDropdownList.filter(x=>x.academicYearId > this.academicYearId)[0].academicYearId;
        this.nextAcademicYearText = this.academicYearDropdownList.filter(x=>x.academicYearId > this.academicYearId)[0].academicYearKey;
      });
     }

     get f() {
      return this.promoteToForm1.controls;
    }
    promoteToSubmit(){
      this.promoteSubmitted = true;
      if (this.promoteToForm1.invalid) {
        return;
      }
      const selectedClassId = this.promoteToForm1.get('classId')?.value;
      const parsedSelectedClassId = parseInt(selectedClassId);
  
      const selectedClassMapping = this.divisionGradeMapping.find(
        (mapping) => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId
      );
       var className = "";
      if (selectedClassMapping) {
        this.gradeId = selectedClassMapping.gradeId;
        this.divisionId = selectedClassMapping.divisionId;
        className = selectedClassMapping.className;
      }
      const newConfirmBox = new ConfirmBoxInitializer();
      newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
      newConfirmBox.setMessage(
        this.translate.instant("Do you want to promote students to class " + className + ' ?')
      );
      newConfirmBox.setConfig({
        confirmLabel: this.translate.instant('YES'), // default confirmation button label
        declineLabel: this.translate.instant('NO'),
      });
      // Simply open the popup and observe button click
      newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
       if(resp?.success){
        this.promoteService.promoteStudentToNextYear(this.nextAcademicYearId,this.academicYearId, this.gradeId, this.divisionId, this.promoteStudent).
        subscribe((result:boolean)=>{
          const newToastNotification = new ToastNotificationInitializer();
            newToastNotification.setTitle(this.translate.instant('SUCCESS'));
            newToastNotification.setConfig({
              toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
              layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER |
          });
            newToastNotification.setMessage(this.translate.instant('Student promoted successfully'));
            newToastNotification.openToastNotification$();
           this. modelRef.close(true);

        });
       }
      });
    }
    close() {
      this. modelRef.close(false);
  }
}
