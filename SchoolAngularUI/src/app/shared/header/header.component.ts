import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NavCollapseService } from 'src/app/services/nav-collapse.service';
import {TranslateService} from '@ngx-translate/core';
import { UserService } from 'src/app/services/user-service';
import { AcademicYear, AuthServiceProxy, MasterServiceProxy } from 'src/app/services/school-api-service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js/';
import { ADMIN_ROLE, CAB_DRIVER_ROLE, CLERK_ROLE, PARENT_ROLE, SUPER_ADMIN_ROLE, TEACHER_ROLE } from 'src/app/utils/app-const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  public uiBasicCollapsed = false;
  public uiBasicCollapsedr = false;

  openSidebar: boolean = true;
    constructor(
      private router: Router, 
      private navservice: NavCollapseService,
      public translate: TranslateService,
      private userSevice:UserService,
      private authServiceProxy:AuthServiceProxy,
      private MasterService:MasterServiceProxy) {  
    
  }  

userName:string;
userRoleName:any;
schoolName : string;
academicYearId:number;
academicYearDropdownList:AcademicYear[];
isSuperAdmin:boolean=false;
showPreviousAcademicYearSelectedMessage="";
  ngOnInit() {
     
  
      this.userSevice.getAcademicYear().subscribe(x=>{
          this.academicYearId=x as number;
          this.getAcademicYearMasterData();
          this.userSevice.getUser().subscribe(x=>{
            this.userName=x?.uname??'';
            this.schoolName=x?.schoolName??'';
            this.userRoleName=x?.roleDetails?.map(x=>x.roleName)??'';
          });
          this.isPreviousYearSelected();
          this.setIsSuperAdmin();
      });
      
    
  }

  isPreviousYearSelected(){
  
      this.userSevice.getUser().subscribe(user => {
        var tempUser = user!;
        var academicYearId = 0;
        this.userSevice.getAcademicYear().subscribe(x=>{
            academicYearId=x as number;
            if(tempUser.academicYearId != academicYearId){
              this.showPreviousAcademicYearSelectedMessage = "You have selected old academic year";
            }
            else{
              this.showPreviousAcademicYearSelectedMessage = "";
            }
         });
      });
  }

  onAcademicYearChange(newAcademicYearId:number){
    this.userSevice.setAcademicYear(newAcademicYearId);
    this.isPreviousYearSelected();
    this.router.navigate(['dashboard'])
  }

  getAcademicYearMasterData(){
    this.MasterService.getAcademicYearData().subscribe(academicYear=>{
      this.academicYearDropdownList=academicYear.academicYears as AcademicYear[];
      this.userSevice.getAcademicYear(false).subscribe(x=>{
        let academicYearId=x as number;
        this.academicYearDropdownList = this.academicYearDropdownList.filter(x=>x.academicYearId <= academicYearId)
    });
      
    })
  }

  // Logout User
  public DoLogout() {
    localStorage.clear();
    sessionStorage.clear();
    
    this.router.navigate(['/login']);
  }

  sidebarToggle(): void {
    this.navservice.sidebarToggle();
    this.navservice.setNavCollapse(false);
  }

  changeLang(language: string) {
    this.translate.use(language)
    this.translate.setDefaultLang(language)
}

setIsSuperAdmin(){
  this.userSevice.getUserIdByRole().subscribe(x=>{
    this.isSuperAdmin= x==SUPER_ADMIN_ROLE;
  })
}

redirectToProfile(){
  let encryptedRoleId=localStorage.getItem('id');
  if(encryptedRoleId){
    let decryptedRoleId=CryptoJS.AES.decrypt(encryptedRoleId?.toString(),environment.ENCRYPTION_PASSWORD).toString(CryptoJS.enc.Utf8);
   this.userSevice.getUserIdByRole().subscribe(x=>{
    if(parseInt(decryptedRoleId)==ADMIN_ROLE){
        let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
          {
            adminId:x,
        }), environment.ENCRYPTION_PASSWORD).toString();
    
        this.router.navigate(['admins/add-edit-admin',encryptedString]);
    }
   else if(parseInt(decryptedRoleId)==CLERK_ROLE){
      let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
        {
          clerkId:x,
      }), environment.ENCRYPTION_PASSWORD).toString();
  
      this.router.navigate(['clerks/add-edit-clerk',encryptedString]);
   }
   else if(parseInt(decryptedRoleId)==TEACHER_ROLE){
      let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
        {
          teacherId:x,
      }), environment.ENCRYPTION_PASSWORD).toString();
  
      this.router.navigate(['teachers/add-edit-teacher',encryptedString]);
   }
   else if(parseInt(decryptedRoleId)==PARENT_ROLE){
    let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
      {
        parentId:x,
    }), environment.ENCRYPTION_PASSWORD).toString();
  
  this.router.navigate(['parents/add-edit-parent',encryptedString]);
 }
 else if(parseInt(decryptedRoleId)==CAB_DRIVER_ROLE){
      let encryptedString=CryptoJS.AES.encrypt(JSON.stringify(
        {
          cabDriverId:x,
      }), environment.ENCRYPTION_PASSWORD).toString();

      this.router.navigate(['cab-drivers/add-edit-driver',encryptedString]);
}

   
  });
    
  }
  
     
}

}
