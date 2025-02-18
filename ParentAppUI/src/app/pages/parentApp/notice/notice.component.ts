import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { CommonDropdownSelectListItemDto, IParentAppNoticeRequestDto, NoticeServiceProxy, ParentAppNoticeDetailDto, ParentAppNoticeDto, ParentAppNoticeRequestDto, SchoolDetailMobileDto, TeacherProfileServiceProxy, UserRoleModulePermissionDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import * as moment from 'moment';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { ViewParentNoticeFileDetailPage } from './view-parent-notice-file-detail/view-parent-notice-file-detail.page';

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss'
})
export class NoticeComponent implements OnInit{
  dateExample = new Date().toISOString();
  content_loaded: boolean = false;
  @ViewChild(IonModal) modal: IonModal;
  months: any[] = [];
  selectedMonth: any;
  schoolDetails: SchoolDetailMobileDto;
  userId;
  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private userService:UserService,
    private noticeService:NoticeServiceProxy,
    private commonMethod:CommonMethodService,
    private teacherProfileService: TeacherProfileServiceProxy,
  ) { }

 
  requestDto:ParentAppNoticeRequestDto;
  academicYearId:number;
  noticeList:ParentAppNoticeDto[][];
  
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Notice');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    this.selectedMonth = currentDate.getMonth() + 1 + ":" + year ;
    this.userService.getAcademicYear().subscribe((academicYearId:number)=>{
      this.academicYearId=academicYearId;
      this.loadMonthHomeworkList();
      this.getUserDetails();
    });
  }

  ngOnInit() {
   
  }
  handleRefresh(event) {
    setTimeout(() => {
    this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }

  getAllNotices(month:number, year:number){
      let noticeRequest:IParentAppNoticeRequestDto={academicYearId:this.academicYearId,
        month, year,studentId:this.userService.CurrentSiblingId};
        this.noticeService.getAllNoticeForStudent(noticeRequest as ParentAppNoticeRequestDto).subscribe(result=>{

            this.noticeList = result.noticeList.reduce((groups, item) => {
              const groupIndex = groups.findIndex(group => group[0].category === item.startDate.format('LL'));
              if (groupIndex !== -1) {
                groups[groupIndex].push(item);
              } else {
                groups.push([item]);
              }
              return groups;
            }, []);


            this.content_loaded = true;
        });
  }
  GetMonths(): any[] {
    this.months = [];
    let fromDate: Date = new Date('2023-01-01');
    if (this.schoolDetails.academicYearStartMonth) {
      fromDate = new Date(this.schoolDetails.academicYearStartMonth.toString());
    }
    let toDate: Date = new Date();

    // set last day of current month
    toDate = new Date(toDate.getFullYear(), toDate.getMonth() + 1, 0);

    const currentDate = new Date(fromDate);
    while (currentDate <= toDate) {
      
      const month = currentDate.toLocaleString('default', { month: 'short' });
      const year = currentDate.getFullYear();
      this.months.push({ text: `${month}-${year}`, value: currentDate.getMonth() + 1 + ":" + year });
      currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
    }
    return this.months;
  }
  GetSchoolBasicDetails() {
    this.teacherProfileService.getSchoolBasicDetails().subscribe(result => {
      this.schoolDetails = result;
      this.GetMonths();
      this.content_loaded = true;
    });
  }
  onMonthChange(e: any) {
    this.loadMonthHomeworkList();
  }
  loadMonthHomeworkList() {
    if (this.selectedMonth) {
      if (this.selectedMonth.length > 1) {
        this.getAllNotices(parseInt(this.selectedMonth.split(":")[0]), parseInt(this.selectedMonth.split(":")[1]));
      }
    } else {
      let currentDate: Date = new Date();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      this. getAllNotices(month, year);
    }
  }

  getUserDetails() {
    this.userService.getUser().subscribe((result: UserRoleModulePermissionDto) => {
      this.academicYearId = result.academicYearId;
      this.userId = result.userId;
      this.GetSchoolBasicDetails();
      
    })
  }

async openNoticeDetail(currentNoticeOnPopup:ParentAppNoticeDto) {
  
  const modal = await this.modalController.create({
    component: ViewParentNoticeFileDetailPage,
    componentProps: { currentNoticeOnPopup : currentNoticeOnPopup }
  });

  await modal.present();
  }

   
  
   
}
