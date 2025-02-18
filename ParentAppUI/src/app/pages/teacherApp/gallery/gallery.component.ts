import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import {  CommonDropdownSelectListItemDto, CommonDropdownSelectListItemResponseDto, GalleryDto, GalleryUpsertDto, GradeDivisionMasterDto, MasterServiceProxy, PublishUnpublishGalleryDto, SchoolGradeDivisionMatrixDto, TeacherProfileServiceProxy, UserRoleModulePermissionDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { AddEditGalleryPage } from './add-edit-gallery/add-edit-gallery.page';
import { ViewTeacherGalleryFileDetailPage } from './view-teacher-gallery-file-detail/view-teacher-gallery-file-detail.page';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  dateExample = new Date().toISOString();
  content_loaded: boolean = false;
  galleryList: any[] = [];
  academicYearId: number;
  teacherId: number;
  userId: number;
  galleryDetails: GalleryUpsertDto ;
  galleryTypeId = '1';
  classTeacherGradeDivisionList: SchoolGradeDivisionMatrixDto[] = [];
  studentList :CommonDropdownSelectListItemDto[] = [];
  selectedClassTeacherGradeDivision: SchoolGradeDivisionMatrixDto;
  teacherName;
  buttonDisable:boolean = false;
  @ViewChild(IonModal) modal: IonModal;

  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private teacherProfileService: TeacherProfileServiceProxy,
    private masterService: MasterServiceProxy,
    private userService: UserService,
    private alertController: AlertController,
    private toastService: ToastService,
    public commonMethod: CommonMethodService

  ) {}

  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Gallery');
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
      this.teacherName = result.uname;
      this.loadGalleryList();
      this.getClassTeacherGradeDivisionList();
      this.getStudentList();
    })
  }
  onSentReceiveChange(e: any) {
    let value = e.detail.value;
    this.galleryTypeId = value;
    this.galleryList = [];
    this.loadGalleryList();
  }
  loadGalleryList() {
    this.teacherProfileService.getGalleryGridList(parseInt(this.galleryTypeId), parseInt(this.galleryTypeId) == 1 ? this.userId : this.teacherId).subscribe(result => {
      this.galleryList = result.galleryList;
      this.content_loaded = true;
    });
  }
  getClassTeacherGradeDivisionList() {
    this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe((result: GradeDivisionMasterDto) => {
      this.classTeacherGradeDivisionList = result.schoolGradeDivisionMatrixCascadeList;
    })
  }
  getStudentList() {
    this.masterService.getStudentDropdownData(this.academicYearId).subscribe((result: CommonDropdownSelectListItemResponseDto) => {
      this.studentList = result.lstDropdownValues;
    })
  }


  getFilePath(fileName: string, isTextFile: boolean) {
    if (isTextFile) {
      return
    }
  }


  async openGalleryDetail( galleryId: number) {
       const modal = await this.modalController.create({
        component: ViewTeacherGalleryFileDetailPage,
        componentProps: { galleryId: galleryId }
      });
  
      await modal.present();
  

     
  }
  openDialog(callback: Function, gallery: GalleryDto, action: string) {
    this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure? you want to ' + action + ' gallery?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            callback(gallery, this);
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  Delete(e: Event, gallery: GalleryDto) {
    e.stopPropagation();
    this.openDialog(this.DeleteGallery, gallery, 'delete');
  }
  DeleteGallery(gallery: GalleryDto, context: GalleryComponent) {
    debugger
    context.teacherProfileService.galleryDelete(gallery.galleryId).subscribe(result => {
      context.content_loaded = true;
      context.loadGalleryList();
      context.toastService.presentToast('Success', 'Gallery deleted successfully !', 'top', 'success', 2000);
    });
  }
  Publish(e: Event, gallery: GalleryDto) {
    e.stopPropagation();
    this.openDialog(this.publishGallery, gallery, gallery.isPublished ? 'unpublish' : 'publish');
  }
  publishGallery(gallery: GalleryDto, context: GalleryComponent) {
    let requestWrapper = new PublishUnpublishGalleryDto();
    requestWrapper.galleryId = gallery.galleryId;
    requestWrapper.isPublished = !gallery.isPublished;

    context.teacherProfileService.publishUnpublishGalleryParticular(requestWrapper).subscribe(result => {
      context.content_loaded = true;
      context.loadGalleryList();
      context.toastService.presentToast('Success', 'Gallery changes saved successfully !', 'top', 'success', 2000);
    });
  }

  // Filter
  async filter() {
 this.buttonDisable=true;
    // Open filter modal
    const modal = await this.modalController.create({
      component: AddEditGalleryPage,
      componentProps: { galleryId: 0},
      //swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    await modal.present();

    // Apply filter from modal
    let { data } = await modal.onWillDismiss();

    if (data) {

      this.toastService.presentToast('Success', 'Gallery saved successfully !', 'top', 'success', 2000);
      this.loadGalleryList();
    }
    this.buttonDisable=false;

  }
  async editGallery(e: Event, gallery: GalleryDto) {
    e.stopPropagation();
    this.teacherProfileService.gallerySelect(gallery.galleryId).subscribe(result => {
      this.galleryDetails = result;
      this.openGalleryDialog(this.galleryDetails);
      this.content_loaded = true;
    });

  }
  async openGalleryDialog(gallery: GalleryUpsertDto) {
    // Open filter modal
    const modal = await this.modalController.create({
      component: AddEditGalleryPage,
      componentProps: { galleryId: gallery.galleryId },
      presentingElement: this.routerOutlet.nativeEl
    });

    await modal.present();

    // Apply filter from modal
    let { data } = await modal.onWillDismiss();

    if (data) {

      this.toastService.presentToast('Success', 'Gallery saved successfully !', 'top', 'success', 2000);
      this.loadGalleryList();
    }
  }

}
