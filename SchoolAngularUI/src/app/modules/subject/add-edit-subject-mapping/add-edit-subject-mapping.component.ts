import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { IUpsertSubjectIndexNumberDetailsDto, MasterServiceProxy, SubjectMappingServiceProxy, UpsertSubjectIndexNumberDetailsDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';

@Component({
  selector: 'app-add-edit-subject-mapping',
  templateUrl: './add-edit-subject-mapping.component.html',
  styleUrls: ['./add-edit-subject-mapping.component.scss']
})
export class AddEditSubjectMappingComponent implements OnInit {
  academicYearId: any;
  gradeId: number;
  divisionId: number;
  className: string = '';
  submitted: boolean = false;
  subjectMasterIndexList: any[] = [];
  subjectMappingIndexForm: FormGroup;
  duplicateErrors: string[] = [];

  constructor(
    public translate: TranslateService,
    private modalService: NgbModal,
    private userService: UserService,
    private router: Router,
    private masterService: MasterServiceProxy,
    private formBuilder: FormBuilder,
    private subjectMappingService: SubjectMappingServiceProxy,
    private toastEvokeService: ToastEvokeService,
    public sharedPermissionServiceService: SharedPermissionServiceService
  ) {
    this.subjectMappingIndexForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      this.loadSubjectIndexNumberDetails();
    });
  }

  loadSubjectIndexNumberDetails(): void {
    this.subjectMappingService.subjectIndexNumberDetailsSelect(this.gradeId, this.divisionId, this.academicYearId).subscribe(
      (data) => {
        this.subjectMasterIndexList = data.subjectMasterIndexList;

        this.subjectMasterIndexList.forEach((subject, index) => {
          this.subjectMappingIndexForm.addControl(
            `indexNumber_${index}`,
            this.formBuilder.control(subject.indexNumber || '', Validators.required)
          );
        });
      },
      (error) => {
        console.error('Error fetching subject details:', error);
      }
    );
  }

  subjectMappingId: any;

  onSubmit(): void {
    this.submitted = true;

    if (this.subjectMappingIndexForm.invalid) {
      return;
    }

    const updatedIndexNumbers = this.subjectMasterIndexList.map((subject, index) => ({
      subjectMasterId: subject.subjectMasterId,
      indexNumber: this.subjectMappingIndexForm.get(`indexNumber_${index}`)?.value,
      subjectName: subject.subjectName
    }));

    const indexMap: { [indexNumber: string]: boolean } = {};
    const duplicates: string[] = [];

    updatedIndexNumbers.forEach(item => {
      if (indexMap[item.indexNumber]) {
        duplicates.push(item.indexNumber);
      } else {
        indexMap[item.indexNumber] = true;
      }
    });

    if (duplicates.length > 0) {
      this.duplicateErrors = duplicates;
      return;
    } else {
      this.duplicateErrors = [];
    }

    const subjectIndexNumberDetails = ({
      subjectMappingId: this.subjectMappingId,
      gradeId: this.gradeId,
      divisionId: this.divisionId,
      academicYearId: this.academicYearId,
      subjectIndexNumbersListUpsert: updatedIndexNumbers
    } as IUpsertSubjectIndexNumberDetailsDto) as UpsertSubjectIndexNumberDetailsDto;

    this.subjectMappingService.upsertSubjectIndexNumberDetails(subjectIndexNumberDetails).subscribe(
      (response) => {
        this.modelRef.close(true);
      },
      (error) => {
        if (Array.isArray(error)) {
          this.duplicateErrors = error.map((item: any) => `Subject Name "${item.SubjectName}" already exists.`);
        } else {
          console.error('Error saving data', error);
        }
      }
    );
  }

  clearErrorMessage(): void {
    this.duplicateErrors = [];
  }

  modelRef: any;

  close(): void {
    this.modelRef.close(false);
  }
}
