import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CertificateServiceProxy, DatatableResponseModel  } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-history-leavingcertificate',
  templateUrl: './view-history-leavingcertificate.component.html',
  styleUrls: ['./view-history-leavingcertificate.component.scss']
})
export class ViewHistoryLeavingcertificateComponent {
  viewLeavingCertificateForm: FormGroup;
  submitted = false;
  viewLeavingHistory : any[]
  minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 10, month: 1, day: 1 };

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
 
  dtTrigger: Subject<any> = new Subject();

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private user: UserService,
    private httpClient: HttpClient,
    private certificateService:CertificateServiceProxy,
    public sharedPermissionServiceService : SharedPermissionServiceService,
    private calendar: NgbCalendar
  ) 
    {}

    ngOnInit(): void {
      
      const that = this;
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
      },
      ajax: (requestListModel: any, callback : any) => {
        that.httpClient
          .post<DatatableResponseModel>(
            environment.API_BASE_URL+"/api/Certificate/GetListLeavingCertificateSelect",
            {getListModel:requestListModel},{}
          ).subscribe(resp => {
            that.viewLeavingHistory = resp.data; 
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },order: [[ 0, "asc" ]],
      columns: [ 
                // { data: 'serialNumber', searchable: true, orderable: true },
                { data: 'studentName', searchable: true, orderable: true },
                { data: 'class', searchable: true, orderable: true },
                { data: 'generalRegistrationNo', searchable: true, orderable: true },
                { data: 'statusId', searchable: true, orderable: true },
                { data: 'dateSignCurrent', searchable: true, orderable: true },
                { data: 'createdDate', searchable: true, orderable: true },
                { data: 'dateOfLeavingTheSchool', searchable: true, orderable: true }
                ]
    };
  }

  rerender(hardClear : boolean = false): void {
    this.dtElement.dtInstance.then((dtInstance: any) => {
      if(hardClear == true){
        dtInstance.state.clear();
      }
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  }
  
  ngAfterViewInit(): void {
        this.dtTrigger.next(null);
    };
   
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
