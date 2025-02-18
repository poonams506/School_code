import { HttpClient } from '@angular/common/http';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, ToastEvokeService, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { NgbAccordion, NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ConsumerByStoppageIdInputDto, ConsumerTransportMappingDto, IConsumerByStoppageIdInputDto, IRouteGridInputRequestDto, RouteDto, RouteGridInputRequestDto, SchoolServiceProxy, StoppageDto, StoppageGridInputDto, TransportServiceProxy, TransportStaffDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { AddEditRouteComponent } from '../add-edit-route/add-edit-route.component';
import { AddEditStoppageComponent } from '../add-edit-stoppage/add-edit-stoppage.component';
import { AddStoppageConsumerMappingComponent } from '../add-stoppage-consumer-mapping/add-stoppage-consumer-mapping.component';
import { EditStoppageConsumerMappingComponent } from '../edit-stoppage-consumer-mapping/edit-stoppage-consumer-mapping.component';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  routeList: RouteDto[] = [];
  isSharedTransport: boolean = false;
  stoppageList: StoppageDto[];
  academicYearId: number;
  dtTrigger: Subject<any> = new Subject();
  selectedRoute: any;

  activeRoutePanel: string[] = [];
  activeStoppagePanel: string[] = [];
  staffList: TransportStaffDto[];
  coOrdinatorName: string;
  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private toastEvokeService: ToastEvokeService,
    private transportService: TransportServiceProxy,
    private http: HttpClient,
    private userService: UserService,
    private schoolService: SchoolServiceProxy,
    private router: Router,
    public sharedPermissionServiceService: SharedPermissionServiceService
  ) { }

  currentSearchTerm:string='';

  ngOnInit(): void {
    this.searchSubscription = this.search(this.searchTerm$)
      .subscribe(searchTerm => {
         this.currentSearchTerm=searchTerm;
          this.GetAllRoutes();
          
      });

    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      this.transportService.getTransportStaffList().subscribe(staffdetail => {
        // Sorting the staff details array by staffName in ascending order
        this.staffList = staffdetail.transportStaffList;
        this.staffList.sort((a, b) => a.staffName.localeCompare(b.staffName));
        this.GetAllRoutes();
      });
    });
    this.userService.getSchoolId().subscribe(schoolId => {
      this.schoolService.getSchoolSettingProfile(schoolId, this.academicYearId).subscribe(setting => {
        this.isSharedTransport = setting.isSharedTransport!;
      });
    });
  }
  GetAllRoutes() {
    
     const inputRequest={ academicYearId:this.academicYearId,consumerName:this.currentSearchTerm } as IRouteGridInputRequestDto 
    this.transportService.getRouteGridListSelect(new RouteGridInputRequestDto(inputRequest)).subscribe(result => {
      this.routeList = result.routeList!;
      if(this.routeList.length>0){
        this.currentRouteId=this.routeList[0].routeId;
        this.getStoppageList(this.currentRouteId);
       
        this.routeList.forEach(route => {
          const coordinator = this.staffList.find(staff => staff.staffId === route.coOrdinatorId);
          if (coordinator) {
            route.coOrdinatorName = coordinator.staffName; // Assign coordinator name to route
          }
        });
  
      }
      
    });

  }



  routeDeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();

  }
  routeDeleteUnSuccessNotification() {
    const title = this.translate.instant('FAILED_TO_DELETE_!');
    const message = this.translate.instant('YOU_CAN_NOT_DELETE_THIS_ROUTE_THIS_IS_ALREADY_ASSOCIATED_WITH_STOPPAGE');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe();

  }

  confirmRouteDelete(route: RouteDto) {
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
    newConfirmBox.openConfirmBox$().subscribe((resp: any) => {
      if (resp?.success) {
        this.transportService.routeDelete(route.routeId, this.academicYearId).subscribe(data => {
          if (data.affectedRows > 0) {
            this.routeDeleteSuccessNotification();
            this.GetAllRoutes();
          }
          else {
            this.routeDeleteUnSuccessNotification();
          }
        }
        );
      }
    });
  }




  routeSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('ROUTE_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  routeAddedSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('ROUTE_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }

  addRoute() {
    const modalRef = this.modalService.open(AddEditRouteComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.isSharedTransport = this.isSharedTransport;
    modalRef.componentInstance.modelRef = modalRef;
    modalRef.result.then((result) => {
      if (result == true) {
        this.routeAddedSuccessNotification();
        this.GetAllRoutes();
      }


    }, (reason) => {

    });
  }

  editRoute(route: RouteDto) {

    const modalRef = this.modalService.open(AddEditRouteComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.routeId = route.routeId;
    modalRef.componentInstance.isSharedTransport = this.isSharedTransport;
    modalRef.componentInstance.modelRef = modalRef;
    modalRef.result.then((result) => {
      if (result == true) {
        this.routeSuccessNotification();
        this.GetAllRoutes();
      }

    }, (reason) => {

    });
  }





  getStoppageList(routeId: number) {
     const request= {academicYearId:this.academicYearId,routeId:routeId,consumerName:this.currentSearchTerm} as StoppageGridInputDto;
    this.transportService.getStoppageGridListSelect(new StoppageGridInputDto(request)).subscribe(result => {
      this.stoppageList = result.stoppageList!;
      
      if(this.stoppageList.length>0 ){
        this.currentStoppageId=this.stoppageList[0].stoppageId;
        this.getStoppageConsumerList(this.stoppageList[0].stoppageId);
      }
     
    });
  }

  consumerForStoppage: ConsumerTransportMappingDto[] = [];
  getStoppageConsumerList(stoppageId: number) {
    this.consumerForStoppage = [];
    const request = {academicYearId:this.academicYearId,stoppageId:stoppageId,consumerName:this.currentSearchTerm} as IConsumerByStoppageIdInputDto;
    this.transportService.getAllConsumerByStoppageId(new ConsumerByStoppageIdInputDto(request)).subscribe(result => {
      this.consumerForStoppage = result.consumers;
    });
  }

  stoppageSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('STOPPAGE_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  
  stoppageAddedSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('STOPPAGE_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }




  addStoppage(route: RouteDto) {
    const modalRef = this.modalService.open(AddEditStoppageComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.routeId = route.routeId;
    modalRef.componentInstance.modelRef = modalRef;
    modalRef.result.then((result) => {

      if (result == true) {
        this.stoppageAddedSuccessNotification();
        this.getStoppageList(this.currentRouteId!);
      }


    }, (reason) => {

    });
  }

  editStoppage(stoppage: StoppageDto, route: RouteDto) {

    const modalRef = this.modalService.open(AddEditStoppageComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.stoppageId = stoppage.stoppageId;
    modalRef.componentInstance.routeId = route.routeId;
    modalRef.componentInstance.modelRef = modalRef;
    modalRef.result.then((result) => {
      if (result == true) {

        this.stoppageSuccessNotification();
        this.getStoppageList(this.currentRouteId!);
      }

    }, (reason) => {

    });
  }

  DeleteSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();

  }
  stoppageDeleteUnSuccessNotification() {
    const title = this.translate.instant('FAILED_TO_DELETE_!');
    const message = this.translate.instant('YOU_CAN_NOT_DELETE_THIS_STOPPAGE_THIS_IS_ASSOCIATED_WITH_CONSUMER');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe();

  }
  ConsumerDeleteUnSuccessNotification() {
    const title = this.translate.instant('FAILED_TO_DELETE_!');
    const message = this.translate.instant('YOU_CAN_NOT_DELETE_THIS_CONSUMER_THIS_IS_ASSOCIATED_WITH_PAYMENT');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe();

  }

  confirmStoppageDelete(stoppage: StoppageDto) {
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
    newConfirmBox.openConfirmBox$().subscribe((resp: any) => {
      if (resp?.success) {
        this.transportService.stoppageDelete(stoppage.stoppageId, this.academicYearId).subscribe(data => {
          if (data.affectedRows > 0) {
            this.DeleteSuccessNotification();
            this.GetAllRoutes();
          }
          else {
            this.stoppageDeleteUnSuccessNotification();
          }
        }
        );
      }
    });
  }


  confirmConsumeDelete(consumer: ConsumerTransportMappingDto) {
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
    newConfirmBox.openConfirmBox$().subscribe((resp: any) => {
      if (resp?.success) {
        this.transportService.deleteStoppageConsumer(consumer.transportConsumerStoppageMappingId, consumer.roleId, this.academicYearId).subscribe(data => {

          if (data.affectedRows > 0) {
            this.DeleteSuccessNotification();
            this.GetAllRoutes();
          }
          else {
            this.ConsumerDeleteUnSuccessNotification();
          }
        }
        );
      }
    });
  }



  consumerMappingSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('CONSUMER_MAPPING_ADDED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }
  consumerMappingUpdatedSuccessNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('CONSUMER_MAPPING_UPDATED_SUCCESSFULLY'));
    newToastNotification.openToastNotification$();
  }




  addConsumer(stoppage: StoppageDto) {

    const modalRef = this.modalService.open(AddStoppageConsumerMappingComponent, { size: 'xl', backdrop: 'static',  scrollable: true, });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.stoppageId = stoppage.stoppageId;
    modalRef.componentInstance.stoppageDetail = stoppage;
    modalRef.componentInstance.modelRef = modalRef;
    modalRef.result.then((result) => {
      if (result == true) {
        this.consumerMappingSuccessNotification();
        this.getStoppageConsumerList(this.currentStoppageId!);
      }

    }, (reason) => {

    });

  }

  editConsumer(stoppage: StoppageDto, consumer: ConsumerTransportMappingDto) {

    const modalRef = this.modalService.open(EditStoppageConsumerMappingComponent, { size: 'lg', backdrop: 'static',  windowClass: 'edit-consum-allow-modal', scrollable: true, });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.stoppageId = stoppage.stoppageId;
    modalRef.componentInstance.stoppageDetail = stoppage;
    modalRef.componentInstance.consumer = consumer;
    modalRef.componentInstance.modelRef = modalRef;
    modalRef.result.then((result) => {
      if (result == true) {
        this.consumerMappingUpdatedSuccessNotification();
        this.getStoppageConsumerList(this.currentStoppageId!);
      }


    }, (reason) => {

    });

  }

  getPickDropTypeName(pickDropId: number) {
    if (pickDropId == 1) {
      return "Pickup";
    }
    else if (pickDropId == 2) {
      return "Drop";
    }
    else if (pickDropId == 3) {
      return "Pickup & Drop";
    }

    return "";
  }


  currentRouteId: number | null = null;

  toggleRouteAccordion(routeId: number) {
    this.currentRouteId = this.currentRouteId === routeId ? null : routeId;
    if (this.currentRouteId === routeId) {
      this.getStoppageList(routeId);
    }
  }

  isRouteOpen(routeId: number): boolean {
    return this.currentRouteId === routeId;
  }

  currentStoppageId: number | null = null;
  toggleStoppageAccordion(stoppageId: number) {
    this.currentStoppageId = this.currentStoppageId === stoppageId ? null : stoppageId;
    if (this.currentStoppageId === stoppageId) {
      this.getStoppageConsumerList(stoppageId);
    }
  }

  isStoppageOpen(stoppageId: number): boolean {
    return this.currentStoppageId === stoppageId;
  }

  search(searchTerm$: Observable<string>): Observable<string> {
    return searchTerm$.pipe(
      debounceTime(500), // Wait for 500ms after last key press
      distinctUntilChanged(), // Ignore if search term hasn't changed
      map(term => term), // Only emit if term meets minimum length
    );
  }

  searchTerm$ = new Subject<string>(); // Subject for search term stream
  searchSubscription: Subscription | undefined;
  onSearch(event: KeyboardEvent) {
   
    this.searchTerm$.next((event.target as HTMLInputElement).value);
  }


  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

}
