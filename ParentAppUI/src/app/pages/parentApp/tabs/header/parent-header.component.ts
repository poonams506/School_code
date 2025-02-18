import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonMenu, IonTabs } from '@ionic/angular';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { FcmService } from 'src/app/services/fcm/fcm.service';
import { CommonAppServiceProxy, StudentDetailMobileDto } from 'src/app/services/school-api-service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'parent-app-header',
  templateUrl: './parent-header.component.html',
  styleUrl: './parent-header.component.scss'
})
export class ParentHeaderComponent {
  constructor(public commonMethod :CommonMethodService,
    public userService:UserService,
    public router:Router,
    public fcmService:FcmService,
    private toastService: ToastService,
    private commonAppService:CommonAppServiceProxy){
  }

  @ViewChild(IonTabs, { static: true }) private ionTabs: IonTabs;
  @ViewChild(IonMenu, { static: true }) private ionMenu: IonMenu;

  currentUserFullName:string;
  profileImageURL:string;
  students:StudentDetailMobileDto[];
  currentStudent:StudentDetailMobileDto;
  logoUrl : string;
  schoolName:string;
  isComponentActive: boolean = true;
  ngOnInit(){
    this.updateHeaderDetail();
  }

  changeSibling(studentId:number,classId:number){
    //check if multiple sibling exist
    if(this.students.length>0 && this.userService?.CurrentSiblingId==studentId){
      return;
    }
    // change sibling
    this.userService.CurrentSiblingId=studentId;
    this.userService.CurrentSiblingClassId=classId;
    this.currentStudent=this.students.filter(x=>x.studentId==studentId)[0];
    this.toastService.presentToast('Success', 'Student switched successfully !', 'top', 'success', 2000);
    this.router.navigate(['parent-app/parentTab/home']);
  }

  ionViewDidEnter() {
    
    this.updateHeaderDetail();
   
  }
  ngOnDestroy() {
    this.isComponentActive = true;
    
   }

  updateHeaderDetail(){
    this.commonAppService.getStudentsByUserId().subscribe(studentResponse=>{
      
      this.students=studentResponse.lstStudents;
      if(this.students.length == 1 || (!this.userService?.CurrentSiblingId || this.userService?.CurrentSiblingId == 0)){
        this.userService.CurrentSiblingId=this.students[0].studentId;
        this.userService.CurrentSiblingClassId=this.students[0].classId;
        this.currentStudent=this.students.filter(x=>x.studentId==this.students[0].studentId)[0];
      }
      else if(this.userService?.CurrentSiblingId && this.userService?.CurrentSiblingId  > 0){
        this.currentStudent=this.students.filter(x=>x.studentId==this.userService?.CurrentSiblingId )[0];
      }
      //this.updateUserDetail();
      this.commonAppService.getSchoolDetail().subscribe(schoolResponse=>{
        this.logoUrl= schoolResponse.logoUrl;
        this.schoolName= schoolResponse.schoolName;
    });
  });
  }

  updateUserDetail(){
    this.userService.getUser().subscribe(result=>{
      this.currentUserFullName=result.userFullNameByRole;
       this.profileImageURL=result.profileImageURL;
    });
  }

  async logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.userService.setAcademicYear(0);
    this.userService.setSchoolId(0);
    this.userService.CurrentSiblingClassId = 0;
    this.userService.CurrentSiblingId = 0;
    this.userService.CurrentUserRoleId = null;
    this.userService.UserToken = null;
    await this.fcmService.clearFCMTokenAndRemoveListener();
    this.router.navigate(['signin']);
   
  }

  GoBack() {
     this.router.navigate(['parent-app/parentTab/home']); }

  OpenMenu(){
    this.ionMenu.open();
    this.updateHeaderDetail();
      
  }
  backButtonVisible(): boolean {
    const defaultHref = '/parent-app/parentTab/home';
    return this.router.url !== defaultHref;
  }
}
