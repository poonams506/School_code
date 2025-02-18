import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { RouteDto, TransportServiceProxy, TransportStaffDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-add-edit-route',
  templateUrl: './add-edit-route.component.html',
  styleUrls: ['./add-edit-route.component.scss']
})
export class AddEditRouteComponent {
  routeId:number;
  academicYearId:number;
  isSharedTransport:boolean;
  submitted:boolean=false;
  staffList: TransportStaffDto[];
  vehicleList:any[];
  modelRef:any;
  routeForm: FormGroup;
  constructor(  private formBuilder: FormBuilder, 
    private transportService:TransportServiceProxy,
    private userService:UserService) { 
      this.routeForm = this.formBuilder.group({
        routeId: [0],
        routeName: [null, Validators.required],
        firstPickUpTime:[null],
        isSharedVehicle:[false],
        ngbFirstPickUpTime:[,Validators.required],
        lastPickUpTime:[null],
        ngbLastPickUpTime:[null,Validators.required],
        coOrdinatorId:[null],
        coOrdinatorRoleId:[0],
        vehicleId:[null,Validators.required]

      });
    }
 

  ngOnInit(): void {
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
      this.academicYearId= academicYearId as number;
    });
    this.transportService.getVehicleDropdown().subscribe(response=>{ 
       this.vehicleList=response.vehicleDropdownList;
    });
    this.transportService.getTransportStaffList().subscribe(staffdetail => {
        // Sorting the staff details array by staffName in ascending order
        this.staffList=staffdetail.transportStaffList;
       this.staffList.sort((a, b) => a.staffName.localeCompare(b.staffName));
        
    });
      const sharedRouteIdControl = this.routeForm.get('sharedRouteId');
      if (this.isSharedTransport) {
          sharedRouteIdControl?.setValidators(Validators.required);
      } else {
          sharedRouteIdControl?.clearValidators();
      }

      if (this.routeId > 0) {
  this.transportService.getRouteSelect(this.routeId,this.academicYearId)
    .subscribe((result) => {
      this.routeForm.patchValue(result);
});
}
}

  get f() { return this.routeForm.controls; }

  resetSelectList(f: any, item: string) {
    if (f[item]?.getRawValue() == "null") {
      f[item]?.setValue(null);
      return;
    }
  }
 
  
  saveAreaData() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.routeForm.invalid) {
        return;
    }
    const coOrdinatorId = this.routeForm.get('coOrdinatorId')?.value;
    let coordinatorRoleId: number = 0;

    if (coOrdinatorId) {
        const parts: string[] = coOrdinatorId.split('_');
        if (parts.length > 0) {
            coordinatorRoleId = parseInt(parts[0]);
            if (isNaN(coordinatorRoleId)) {
                coordinatorRoleId = 0;
            }
        }
    }

    this.routeForm.get('coOrdinatorRoleId')?.setValue(coordinatorRoleId);

    let routeDto=this.routeForm.getRawValue() as RouteDto
    this.transportService.routeUpsert(this.academicYearId,routeDto).subscribe(data=>{
              this.modelRef.close(true);
  });

  }
 close() {
    this.modelRef.close(false);
}
getFormattedMinute(hour:number,minute:number){
  return moment({"hour":hour,"minutes": minute}).format('HH:mm');
  }
}
