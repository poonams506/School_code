import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { SchoolVacationDto, SchoolVacationServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-edit-school-vacation',
  templateUrl: './add-edit-school-vacation.component.html',
  styleUrls: ['./add-edit-school-vacation.component.scss']
})
export class AddEditSchoolVacationComponent implements OnInit {
  addSchoolVacationForm: FormGroup;
  submitted = false;
  schoolVacationId: any;
  errorMessage: String;
  academicYearId:any
  modelRef: any;
  minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };

  constructor(
    public translate: TranslateService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private user: UserService,
    private httpClient: HttpClient,
    private schoolVacationService: SchoolVacationServiceProxy,
    private calendar: NgbCalendar
  ) {} 

  ngOnInit(): void {
    this.addSchoolVacationForm = this.formBuilder.group({
      schoolVacationId: [0],
      vacationName: ['', Validators.required],
      ngbStartDate: [null, Validators.required],
      startDate: [null],
      ngbEndDate: [null, Validators.required],
      endDate: [null],
    });

    this.route.params.subscribe((data: any) => {
      const queryParamValue = data.schoolVacationId; 
      if (queryParamValue) {
        let decryptedString = CryptoJS.AES.decrypt(queryParamValue, environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
        let decryptedValues = JSON.parse(decryptedString) as any;
        this.schoolVacationId = decryptedValues.schoolVacationId as number;
      }
    });

    this.minDate = this.calendar.getToday();
    
    this.getSchoolVacationSelect();
    this.addSchoolVacationForm.get('academicYearId')?.setValue(this.academicYearId);
    


  }

  getSchoolVacationSelect() {
    debugger;
    if (this.schoolVacationId && this.schoolVacationId > 0) {
      this.schoolVacationService.getSchoolVacationSelect(this.schoolVacationId)
        .subscribe((schoolVacation: SchoolVacationDto) => {
          this.addSchoolVacationForm.patchValue(schoolVacation)
        });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.addSchoolVacationForm.invalid) {
        return;
    }
  }

  get f() {
    return this.addSchoolVacationForm.controls;
  }

  close() {
    this.errorMessage = '';
    this.modelRef.close(false);
  }
  saveSchoolVacationData() {
    debugger;
    this.submitted = true;
    if (this.addSchoolVacationForm.invalid) {
      return;
    }
    const formData = { ...this.addSchoolVacationForm.value, academicYearId: this.academicYearId };
    this.httpClient
      .post(`${environment.API_BASE_URL}/api/SchoolVacation/UpdateSchoolVacation`, formData)
      .subscribe((result: any) => {
        this.modelRef.close(true);
      });
  }

}



