import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CBSE_ExamNameResponseDto, CBSE_ExamObjectDto, CBSE_ExamObjectServiceProxy, ExamObjectDeleteRequestDto, ExamObjectDeleteResponseDto, ExamObjectTypeDetailsDto, IExamObjectDeleteRequestDto, SubjectMappingServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-add-edit-exam-object',
  templateUrl: './add-edit-exam-object.component.html',
  styleUrls: ['./add-edit-exam-object.component.scss']
})
export class AddEditExamObjectComponent {
  examObjectId:number;
  academicYearId:number;
  // outOfMarks:number;
  modelRef:NgbModalRef;
  errorMessage: string;
  submitted:boolean=false;
  examNameList:any[];
  subjectDropdownList:any[];
  examObjectForm: FormGroup;
  isViewMode:boolean=false;
  examMasterId:number;
  subjectMasterId:number;
  
  constructor(  
    private formBuilder: FormBuilder, 
    private CBSE_ExamObjectService:CBSE_ExamObjectServiceProxy,
    private subjectMappingService: SubjectMappingServiceProxy,
    private toastEvokeService: ToastEvokeService,
    public translate: TranslateService,
    private userService:UserService,
    public activeModal: NgbActiveModal
  ) { 
      this.examObjectForm = this.formBuilder.group({
        examObjectId: [0],
        examMasterId:  [null, Validators.required],
        subjectMasterId: [null, Validators.required],
       
       
         objectNameDetailsList: this.formBuilder.array([])
      });

    }
 

  ngOnInit(): void {
   
    this.addExamObject();
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
      this.academicYearId= academicYearId as number;
      // console.log(academicYearId)
    });
    this.CBSE_ExamObjectService.getExamNameList(this.academicYearId).subscribe((result: CBSE_ExamNameResponseDto) => {
      this.examNameList = result.examNameList;
    });
    this.subjectMappingService.getSubjectMasterDropDown().subscribe(result => {
    this.subjectDropdownList = result.subjectDropdownList;
    });
    
    this.getExamObject();
    if (this.isViewMode) {
      this.examObjectForm.disable();
    }


    this.examObjectForm.get('subjectMasterId')?.valueChanges.subscribe((subjectMasterId:string) => {
      while (this.objectNameDetailsList.length !== 0) {
        this.objectNameDetailsList.removeAt(0);
      }
        const itemFormGroup = this.formBuilder.group({
          examObjectId: [0],
        objectName: [null,Validators.required],
        outOfMarks: [null,Validators.required]
        });
        this.objectNameDetailsList.push(itemFormGroup);
      this.examMasterId=this.examObjectForm.get('examMasterId')?.value; 
      this.subjectMasterId=parseInt(subjectMasterId);
      this.CBSE_ExamObjectService
      .cBSE_ExamObjectSelect(this.examMasterId,this.subjectMasterId,this.academicYearId)
      .subscribe((result) => {
        this.patchExamObjectValues(result.objectNameDetailsList!);
      })
    });

    
    this.examObjectForm.get('examMasterId')?.valueChanges.subscribe((examMasterId:string) => {
      while (this.objectNameDetailsList.length !== 0) {
        this.objectNameDetailsList.removeAt(0);
      }
        const itemFormGroup = this.formBuilder.group({
          examObjectId: [0],
        objectName: [null,Validators.required],
        outOfMarks: ['']
        });
        this.objectNameDetailsList.push(itemFormGroup);
      this.examMasterId=parseInt(examMasterId);
      this.CBSE_ExamObjectService
      .cBSE_ExamObjectSelect(this.examMasterId,this.subjectMasterId,this.academicYearId)
      .subscribe((result) => {
        this.patchExamObjectValues(result.objectNameDetailsList!);
      })
    });
   
    this.objectNameDetailsList.valueChanges.subscribe(() => {
      this.clearErrorMessage();
    });

  }

 
  get f() { return this.examObjectForm.controls; }

 
 getExamObject(){
    this.CBSE_ExamObjectService
      .cBSE_ExamObjectSelect(this.examMasterId,this.subjectMasterId,this.academicYearId)
      .subscribe((result) => {
        this.examObjectForm.patchValue(result);
        this.patchExamObjectValues(result.objectNameDetailsList!);
      })
    }

  
clearErrorMessage() {
    // Clear the error message when the input is cleared
    
      this.errorMessage = '';
    
  }

  close() {
    this.errorMessage = "";
    this.modelRef.close(false);
    
  }
  
  saveExamObjectData() {
    debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.examObjectForm.invalid) {
        return;
    }

    let cBSE_ExamObjectDto =this.examObjectForm.getRawValue() as CBSE_ExamObjectDto
   // let cbse_ExamObjectDto = new CBSE_ExamObjectDto();
   cBSE_ExamObjectDto.academicYearId = this.academicYearId;

   let objectNames = cBSE_ExamObjectDto.objectNameDetailsList?.map(obj => obj.objectName);
   let duplicateObjects = objectNames?.filter((name, index, arr) => arr.indexOf(name) !== index) || [];

   if (duplicateObjects.length > 0) {
       this.errorMessage = "DUPLICATE_OBJECTS_FOUND"
       return;
   }

    this.CBSE_ExamObjectService.cBSE_ExamObjectUpsert(cBSE_ExamObjectDto).subscribe(result=>{
           if(result.objectExist===0) 
            {
              this.modelRef.close(true);
            }
            else{
              this.errorMessage = `${result.objectNames} object is already exist`;
             
            }
  });
  
  
}

resetSelectList(f : any, item : string){
  if(f[item]?.getRawValue() == "null"){
    f[item]?.setValue(null); 
    return;
  }
}




patchExamObjectValues(values: ExamObjectTypeDetailsDto[]) {
  while (this.objectNameDetailsList.length !== 0) {
    this.objectNameDetailsList.removeAt(0);
  }
  values.forEach((value) => {
    const itemFormGroup = this.formBuilder.group({
      examObjectId: [value.examObjectId],
      objectName: [value.objectName],
      outOfMarks : [value.outOfMarks],
    });
    this.objectNameDetailsList.push(itemFormGroup);
  });
}


  addExamObject() {
    const itemFormGroup = this.formBuilder.group({
      examObjectId: [0],
      objectName: [null,Validators.required],
      outOfMarks: [null,Validators.required]
      });
      this.objectNameDetailsList.push(itemFormGroup);
    }

    get objectNameDetailsList() {
        return this.examObjectForm.get('objectNameDetailsList') as FormArray;
      
    }
  
    get examObjectListArray() {
      return this.examObjectForm.get('objectNameDetailsList') as FormArray;
    }

 
    errorMessage1: string[] = [];

  removeExamObject(index: number) {
    var examObjectId = 0;
    var object = this.objectNameDetailsList?.getRawValue();  // Use getRawValue only if FormArray
  
    if (object != null && object != undefined && object.length > 0) {
      examObjectId = object[index]?.examObjectId;
  
      // Show confirmation dialog before deletion
      this.confirmExamObjectDelete(examObjectId, index);
    }
  }
  
  confirmExamObjectDelete(examObjectId: number, index: number) {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_RECORD')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
  
    newConfirmBox.openConfirmBox$().subscribe((resp: any) => {
      if (resp?.success) {
        var requestDto = ({
          examObjectId: examObjectId,
          examMasterId: this.examMasterId,
          subjectMasterId: this.subjectMasterId,
          academicYearId: this.academicYearId
        } as IExamObjectDeleteRequestDto) as ExamObjectDeleteRequestDto;
  
        this.CBSE_ExamObjectService.cBSE_ObjectDelete(requestDto).subscribe((data: ExamObjectDeleteResponseDto) => {
          if (data?.operationStatus === 1) {
            this.errorMessage1[index] = 'You cannot delete this record, there is association between other entries';
          } else if (data?.operationStatus === 0) {
            this.objectNameDetailsList.removeAt(index);
            this.examObjectDeleteSuccessNotification();
          }
        });
      } else {
        console.log("Deletion canceled.");
      }
    });
  }
  
  examObjectDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  
  examObjectDeleteUnSuccessNotification() {
    const title = this.translate.instant('FAILED_TO_DELETE_!');
    const message = this.translate.instant('YOU_CAN_NOT_DELETE_THIS_EXAM_OBJECT_THERE_IS_EXAM_OBJECT_ALREADY_ASSOCIATED');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe(); 
  }
  

}









