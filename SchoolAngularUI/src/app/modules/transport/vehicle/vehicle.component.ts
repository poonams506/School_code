import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ActiceInActiveVehicleDto, AuthServiceProxy, DatatableResponseModel, TransportServiceProxy, VehicleDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
import { AddEditVehicleComponent } from '../add-edit-vehicle/add-edit-vehicle.component';
import * as CryptoJS from 'crypto-js/';  

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent {

  vehicleForm:FormGroup
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  vehicleList: VehicleDto[];
  vehicleId:number;
  academicYearId:number;
  isViewMode:boolean;
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public translate: TranslateService,
    private toastEvokeService: ToastEvokeService,
    private transportService:TransportServiceProxy,
    private http: HttpClient,
    private userService:UserService,
    private router:Router,
    public sharedPermissionServiceService : SharedPermissionServiceService
  ) {}

   
  
  ngOnInit(): void {

    
    const that = this;
    

    //this.clearFilter();

    this.dtOptions = {

      pagingType: 'full_numbers',
      pageLength: 10,
      stateSave: true,
      serverSide: true,
      searchDelay: 1000,
      language: {
        searchPlaceholder:this.translate.instant('SEARCH'),
        search: '<i class="bi bi-search"></i>',
        lengthMenu:this.translate.instant('SHOW_ENTRIES') + "_MENU_",
        //lengthMenu:"Show entries MENU",
      },
      ajax: (requestListModel: any, callback : any) => {
        that.http
          .post<DatatableResponseModel>(
            environment.API_BASE_URL+"/api/Transport/GetVehicleList",
            {getListModel:requestListModel,academicYearId:this.academicYearId},{}
          ).subscribe(resp => {
            that.vehicleList = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 0, "asc" ]],
      columns: [
                { data: 'ragistrationNumber', searchable: true, orderable: true },
                { data: 'vehicleNumber', searchable: true, orderable: true },
                { data: 'totalSeats', searchable: true, orderable: true },
                { data: 'cabDriverName', searchable: true, orderable: true },
                { data: 'providerName', searchable: true, orderable: true },
                { data: 'isActive', searchable: true, orderable: true },
                {data:null,searchable:false,orderable:false }]
    };
   
  }
 

 

 
  vehicleDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
    
  }
  vehicleDeleteUnSuccessNotification(VehicleCount:number) {
    const title = this.translate.instant('FAILED_TO_DELETE_!');
    const message = this.translate.instant('VEHICLE_DELETE_UNSUCCESS_MESSAGE');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe();
    
  }

  confirmVehicleDelete(vehicle:VehicleDto) {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_RECORD')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      this.transportService.vehicleDelete(vehicle.vehicleId).subscribe(data=>{
       
        if(data.affectedRows>0){
            this.vehicleDeleteSuccessNotification();
            this.rerender(true); 
         }   
          else{
            this.vehicleDeleteUnSuccessNotification(data.vehicleCount);
          }  
      }
      );
     }
    });
  }
 
  vehicleActiveSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('VEHICLE_ACTIVE_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  vehicleInActiveSuccessNotification(){
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('VEHICLE_INACTIVE_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  
  activeVehicle(vehicleId:number){
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_ACTIVE_VEHICLE')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      let requestDto=new ActiceInActiveVehicleDto();
      requestDto.vehicleId=vehicleId;
      requestDto.isActive = true;
      this.transportService.activeInActiveVehicle(requestDto).subscribe(result=>{
        this.vehicleActiveSuccessNotification();
        this.rerender();
      });
      }
    });
   
  }
  inActiveVehicle(vehicleId:number)
  {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO__INACTIVE_VEHICLE')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp:any) => {
     if(resp?.success){
      let requestDto=new ActiceInActiveVehicleDto();
      requestDto.vehicleId=vehicleId;
      requestDto.isActive = false;
        this.transportService.activeInActiveVehicle(requestDto).subscribe(result=>{
          this.vehicleInActiveSuccessNotification();
          this.rerender();
        });
      }
    });
  
  }
  viewSchoolEventDescription(vehicle:VehicleDto){
    let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
      {
        vehicleId:vehicle.vehicleId,
        academicYearId:this.academicYearId,
        isViewMode:true,
    }), environment.ENCRYPTION_PASSWORD).toString();
  
    this.router.navigate(['transport/add-edit-vehicle',encryptedString]);
 
}



  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.userService.getAcademicYear().subscribe((academicYearId:number|undefined)=>{
        this.academicYearId= academicYearId as number;
        this.dtTrigger.next(null);
    });
  }
  
  rerender(hardClear : boolean = false): void {
    this.dtElement.dtInstance.then((dtInstance: any) => {
      // hard clear table first
      if(hardClear == true){
        dtInstance.state.clear();
      }
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }

 

  

  addVehicle(){
    this.router.navigate(['transport/add-edit-vehicle']);
  }
  
  editVehicle(vehicle:VehicleDto){
    let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
      {
        vehicleId:vehicle.vehicleId,
        academicYearId:this.academicYearId
    }), environment.ENCRYPTION_PASSWORD).toString();
  
    this.router.navigate(['transport/add-edit-vehicle',encryptedString]);
 
}

}
  

  
  



