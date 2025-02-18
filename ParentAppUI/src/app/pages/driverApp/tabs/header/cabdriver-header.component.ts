import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonMenu } from '@ionic/angular';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { FcmService } from 'src/app/services/fcm/fcm.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'cabdriver-app-header',
  templateUrl: './cabdriver-header.component.html',
  styleUrl: './cabdriver-header.component.scss'
})
export class CabdriverHeaderComponent {

  @ViewChild(IonMenu, { static: true }) private ionMenu: IonMenu;
  constructor(public commonMethod :CommonMethodService,
    public userService:UserService,
    public fcmService:FcmService,
    public router:Router,
    private storageService:StorageService){
  }

  currentUserFullName:string;
  profileImageURL:string;
  ngOnInit()
  {
    this.updateUserDetail();
  }

  ionViewDidEnter() {
   this.updateUserDetail();
  }

  updateUserDetail(){
   
    this.userService.getUser(true).subscribe(result=>{
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
    this.storageService.setStorage("ActiveTripId",null);
    this.storageService.setStorage("TOKEN",null);
    this.router.navigate(['signin'])
  }

  GoBack() { this.router.navigate(['driver-app/cabdriverTab/home']); }

  OpenMenu(){
    this.ionMenu.open();
  }
    
}
