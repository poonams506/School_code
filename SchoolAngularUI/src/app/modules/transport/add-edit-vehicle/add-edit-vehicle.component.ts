
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DropdownResponseDto, TransportServiceProxy, VehicleDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js'; // Removed the trailing slash



@Component({
  selector: 'app-add-edit-vehicle',
  templateUrl: './add-edit-vehicle.component.html',
  styleUrls: ['./add-edit-vehicle.component.scss']
})
export class AddEditVehicleComponent {
  vehicleForm: FormGroup;
  vehicleId: number;
  cabDriverDropdownList: any;
  academicYearId: number;
  submitted = false;
  errorMessage : String;
  modelRef: any;
  isViewMode:boolean;
  minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 100, month: 1, day: 1 };
   convertDateToWords(date: NgbDateStruct): string {
    if (!date) return '';
    return '';
  }

  constructor(
    private formBuilder: FormBuilder,
    private transportService: TransportServiceProxy,
    private userService: UserService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private httpClient: HttpClient,
    private el: ElementRef,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.vehicleForm = this.formBuilder.group({
      academicYearId: [null],
      vehicleId:[0],
      vehicleNumber: [null],
      totalSeats: ['', Validators.required],
      ragistrationNumber:['', Validators.required],
      chassisNumber:[null],
      ownerName:[null],
      financerName:[null],
      enginNumber:[null],
      companyName:[null],
      tankCapacity:[null],
      model:[null],
      type:['', Validators.required],
      fuelType:[null],
      cabDriverId:[null,Validators.required],
      conductor:[null],
      deviceId:[null],
      providerName:[null],
      isActive:[false],

      vehicleRegistrationStartDate:[null],
      vehicleRegistrationEndDate:[null],
      ngbVehicleRegistrationStartDate:[null],
      ngbVehicleRegistrationEndDate:[null],
      vehiclePermitStartDate:[null],
      ngbVehiclePermitStartDate :[null],
      vehiclePermitEndDate:[null],
      ngbVehiclePermitEndDate:[null],
      vehicleInsuranceStartDate:[null],
      ngbVehicleInsuranceStartDate:[null],
      vehicleInsuranceEndDate:[null],
      ngbVehicleInsuranceEndDate:[null],
      vehiclePollutionStartDate:[null],
      ngbVehiclePollutionStartDate:[null],
      vehiclePollutionEndDate:[null],
      ngbVehiclePollutionEndDate:[null],
      vehicleRoadTaxStartDate:[null],
      ngbVehicleRoadTaxStartDate:[null],
      vehicleRoadTaxEndDate:[null],
      ngbVehicleRoadTaxEndDate:[null],
      vehicleFitnessStartDat:[null],
      ngbVehicleFitnessStartDate:[null],
      vehicleFitnessEndDate:[null],
      ngbVehicleFitnessEndDate:[null],
      description:[null] 
    });

       this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      this.vehicleForm.get('academicYearId')?.setValue(this.academicYearId); // Set academicYearId in the form
    });
  

    this.route.params.subscribe((data: any) => {
      const queryParamValue = data.vehicleId;

      if (queryParamValue) {
        let decryptedString = CryptoJS.AES.decrypt(queryParamValue, environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
        let decryptedValues = JSON.parse(decryptedString) as any;
        this.vehicleId = decryptedValues.vehicleId as number;
        this.academicYearId = decryptedValues.academicYearId as number;
         this.isViewMode=JSON.parse(decryptedString).isViewMode as boolean;
        this.getVehicleSelect(); 
      }
    });
    this.transportService.getCabDriverDropDown().subscribe((result: DropdownResponseDto) => {
      this.cabDriverDropdownList = result.cabDriverDropdownList;
    });
  }

 
preventSpaceAndDot(event: KeyboardEvent) {
  const allowedChars = /^[a-zA-Z0-9]$/;
  if (!allowedChars.test(event.key)) {
    event.preventDefault();
  }
}

  getVehicleSelect() {
    if (this.vehicleId && this.vehicleId > 0) {
      this.transportService.getVehicleSelect(this.vehicleId, this.academicYearId)
        .subscribe((vehicle: VehicleDto) => {
          this.vehicleForm.patchValue(vehicle);
        });
    }
  }

  get f() { return this.vehicleForm.controls; }

  saveVehicleData() {
    this.submitted = true;
    this.focusToInvalidControl(this.vehicleForm);
    if (this.vehicleForm.invalid) {
      return;
    }
    const academicYearId = this.academicYearId;
    this.vehicleForm.patchValue({ academicYearId });
    
    const formData = new FormData();
    formData.append('vehicle', JSON.stringify(this.vehicleForm.getRawValue()));
  
    this.httpClient.post(`${environment.API_BASE_URL}/api/Transport/VehicleUpsert`, formData)
      .subscribe((result: any) => {
        if(result==-1)
          {
            this.errorMessage = "VEHICLE_NUMBER_EXIST";
            if (this.errorMessage || this.vehicleForm.get('vehicleNumber')?.invalid) {
              const vehicleNumberControl = this.el.nativeElement.querySelector('[formcontrolname="vehicleNumber"]');
                vehicleNumberControl.focus();
            }
            return;
          }
        if(this.vehicleId > 0){
          this.vehicleUpdateSuccessNotification();
        }
        else{
          this.vehicleAddedSuccessNotification();
          this.vehicleId = result.vehicleId;
        }
        this.router.navigate(['transport/vehicle']);
      });
  }
  close() {
    this.errorMessage = "";
    this.modelRef.close(false);
}
clearErrorMessage() {
  // Clear the error message when the input is cleared
  if (this.vehicleForm.get('vehicleNumber')?.value == '') {
    this.errorMessage = '';
  }
}
  
  focusToInvalidControl(formName :any){
    for (const key of Object.keys(formName.controls)) {
      if (formName.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
     }
    }
  }

  onReset() {
    const storedId = this.vehicleId;
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('Confirm'));
    newConfirmBox.setMessage(this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_CLEAR_THE_DATA'));
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'),
      declineLabel: this.translate.instant('NO'),
    });
    newConfirmBox.openConfirmBox$().subscribe((resp: any) => {
      if (resp?.success) {
        this.submitted = false;
        this.vehicleForm.reset({ vehicleId: storedId, isActive:false });
        this.resetNotification();
      }
    });
  }

  resetNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DATA_CLEARED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  vehicleAddedSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('VEHICLE_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  

  vehicleUpdateSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('VEHICLE_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  resetSelectList(f : any, item : string){
    if(f[item]?.getRawValue() == "null"){
      f[item]?.setValue(null); 
      return;
    }
  }

}
