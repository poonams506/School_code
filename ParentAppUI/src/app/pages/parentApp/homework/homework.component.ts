import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import * as moment from 'moment';
import { HomeworkServiceProxy, IParentAppHomeworkRequestDto, ParentAppHomeworkDetailDto, ParentAppHomeworkDto, ParentAppHomeworkRequestDto, SchoolDetailMobileDto, TeacherProfileServiceProxy, UserRoleModulePermissionDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { ViewParentHomeworkFileDetailPage } from './view-parent-homework-detail/view-parent-homework-file-detail.page';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrl: './homework.component.scss'
})
export class HomeworkComponent implements OnInit{
  dateExample = new Date().toISOString();
  content_loaded: boolean = false;
  @ViewChild(IonModal) modal: IonModal;
  months: any[] = [];
  selectedMonth: string;
  userId;
  schoolDetails: SchoolDetailMobileDto;
  constructor(
    private userService:UserService,
    private homeworkService:HomeworkServiceProxy,
    private commonMethod:CommonMethodService,
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private teacherProfileService: TeacherProfileServiceProxy,
  ) { }

  requestDto:ParentAppHomeworkRequestDto;
  academicYearId:number;
  homeworkList:ParentAppHomeworkDto[][];

  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Homework');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    this.selectedMonth = currentDate.getMonth() + 1 + ":" + year ;
    this.userService.getAcademicYear().subscribe((academicYearId:number)=>{
      this.academicYearId=academicYearId;
      this.getUserDetails();
      this.loadMonthHomeworkList();
      
    });
  }

  ngOnInit() {
    // Handle hardware back button
    this.routerOutlet.swipeGesture = false;
    
  }

  getAllHomework(month:number, year:number){
    let noticeRequest:IParentAppHomeworkRequestDto={academicYearId:this.academicYearId,
      month,year,studentId:this.userService.CurrentSiblingId};
      this.homeworkService.getAllHomeworkForStudent(noticeRequest as ParentAppHomeworkRequestDto).subscribe(result=>{

          this.homeworkList = result.homeworkList.reduce((groups, item) => {
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
      if (this.selectedMonth != '') {
        this.getAllHomework(parseInt(this.selectedMonth.split(":")[0]), parseInt(this.selectedMonth.split(":")[1]));
      }
    } else {
      let currentDate: Date = new Date();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      this. getAllHomework(month, year);
    }
  }

  getUserDetails() {
    this.userService.getUser().subscribe((result: UserRoleModulePermissionDto) => {
      this.academicYearId = result.academicYearId;
      this.userId = result.userId;
      this.GetSchoolBasicDetails();
      
    })
  }
  showFile(file: ParentAppHomeworkDetailDto) {
    window.open(file.fullPath, '_blank');
  }

  
  async openHomeworkDetail(currentHomeworkOnPopup:ParentAppHomeworkDto) {

   const modal = await this.modalController.create({
    component: ViewParentHomeworkFileDetailPage,
    componentProps: { currentHomeworkOnPopup : currentHomeworkOnPopup }
  });

  await modal.present();
  }

 

  handleRefresh(event) {
    setTimeout(() => {
    this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
}
