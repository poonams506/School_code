import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { SchoolGradeDivisionMatrixDto, ClassTeacherGradeDivisionListDto, DatatableRequestWrapper, HomeworkServiceProxy, StudentTeacherAppDto, TeacherProfileServiceProxy, UserRoleModulePermissionDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent implements OnInit {
  dateExample = new Date().toISOString();
  content_loaded: boolean = false;

  @ViewChild(IonModal) modal: IonModal;
  // homeworkList: any[];
  academicYearId;
  userId;
  classTeacherGradeDivisionList: SchoolGradeDivisionMatrixDto[] = [];
  selectedClassTeacherGradeDivision: SchoolGradeDivisionMatrixDto;
  selectedClass: string;
  teacherId;
  studentList: StudentTeacherAppDto[] = [];
  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    public commonMethod: CommonMethodService,
    private userService: UserService,
    private teacherProfileService: TeacherProfileServiceProxy

  ) {}

  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Students');
    this.getUserDetails();
  }

  ngOnInit() {

   
  }

  handleRefresh(event) {
    setTimeout(() => {
    this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }
  
  getUserDetails() {
    this.userService.getUser().subscribe((result: UserRoleModulePermissionDto) => {
      this.academicYearId = result.academicYearId;
      this.userId = result.userId;
      this.teacherId = result.userIdByRole;
      this.getClassTeacherGradeDivisionList();
    })
  }
  getClassTeacherGradeDivisionList() {
    this.teacherProfileService.classTeacherGradeDivisionList(this.teacherId).subscribe((result: ClassTeacherGradeDivisionListDto) => {
     if(result.classTeacherGradeDivisionList.length>0){
      this.classTeacherGradeDivisionList = result.classTeacherGradeDivisionList;
      this.selectedClassTeacherGradeDivision = this.classTeacherGradeDivisionList[0];
      this.selectedClass = this.selectedClassTeacherGradeDivision.divisionId + ":" + this.selectedClassTeacherGradeDivision.gradeId;
      this.loadStudentList();
     }
     else{
      this.content_loaded = true;
     }
     
    })
  }
  onClassChange(e: any) {
    this.selectedClassTeacherGradeDivision = new SchoolGradeDivisionMatrixDto();
    let value = e.detail.value;
    let valueArray = value.split(':');
    if (valueArray.length > 1) {
      this.selectedClassTeacherGradeDivision.divisionId = parseInt(valueArray[0]);
      this.selectedClassTeacherGradeDivision.gradeId = parseInt(valueArray[1]);
      this.loadStudentList();
    }
  }
  loadStudentList() {
    this.teacherProfileService.studentTeacherAppSelect(this.academicYearId, this.selectedClassTeacherGradeDivision.gradeId,
      this.selectedClassTeacherGradeDivision.divisionId).subscribe(result => {
        this.studentList = result.studentTeacherAppList.sort((a,b) => a.rollNumber?.localeCompare(b.rollNumber));
        this.content_loaded = true;
      });
  }
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


}
