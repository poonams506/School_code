import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route } from '@angular/router';
import { ActiveTripDto, ActiveTripResponseDto, TransportServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';


class AllRoute {
  routeId: number; 
  routeName: string;
  
}
@Component({
  selector: 'app-track-buses',
  templateUrl: './track-buses.component.html',
  styleUrls: ['./track-buses.component.scss']
})
export class TrackBusesComponent implements OnInit { submitted:boolean=false;
  searchRouteForm:FormGroup;
  academicYearId :number;
  routeIds: number[] = []
ActiveTrip: ActiveTripDto[] = [];
  routeId : number;
  constructor( public sharedPermissionServiceService : SharedPermissionServiceService, private formBuilder:FormBuilder,
    private userService:UserService,private transportService: TransportServiceProxy,
  ) {
    this.searchRouteForm = this.formBuilder.group({
      routeId:[[]],
    });
  }

  ngOnInit() {
   
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
      this.academicYearId= academicYearId as number;
      this.searchRouteForm.get('academicYearId')?.setValue(this.academicYearId);
      this.getRouteDropdownData();
    
  });
  }

  ngAfterViewInit() {  
  }

  selectAllRoutes : boolean = false;
  selectAllOptionRoutes() {
    if(this.selectAllRoutes){
      const selected = this.ActiveTrip.map(item => item.routeId);
      this.searchRouteForm.get('routeId')?.patchValue(selected);
    }
    else{
      this.searchRouteForm.get('routeId')?.patchValue([]);
    }
  }
  checkSelectAllRoute(){
    let selectedClassList= this.searchRouteForm.get('routeId')?.getRawValue() as number[];
  if(selectedClassList.length == this.ActiveTrip.length){
    this.selectAllRoutes = true;
  }
  else{
    this.selectAllRoutes = false;
  }
  }

  searchRoute(){
    this.submitted=true;
    if (this.searchRouteForm.invalid) {
      return;
  }
  this.routeIds = this.searchRouteForm.get('routeId')?.value;
  }

  onReset(){
    this.submitted=false;
    this.searchRouteForm.reset();
    this.searchRouteForm.get('academicYearId')?.setValue(this.academicYearId);
    this.searchRouteForm.get('routeId')?.setValue(this.routeId);
  }

  getRouteDropdownData() {
    this.transportService.getActiveTripForAdminSelect(this.academicYearId).subscribe((x:ActiveTripResponseDto)=> {
      x.activeTripList.forEach(trip => {
        this.ActiveTrip.push(trip);
        // let routes = new AllRoute();
        // routes.routeId = trip.routeId;
        // routes.routeName = trip.routeName;
      // this.routeDropdownList = x.activeTripList.routeId ;
      // this.routeDropdownList = x.activeTripList.routeName;
      });  
    });
  }


  get f() { return this.searchRouteForm.controls; }


}
