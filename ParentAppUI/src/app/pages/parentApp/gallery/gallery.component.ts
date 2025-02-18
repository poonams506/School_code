import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { CommonDropdownSelectListItemDto, GalleryServiceProxy, IParentAppGalleryRequestDto, ParentAppGalleryDto, ParentAppGalleryRequestDto } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import * as moment from 'moment';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { ViewParentGalleryFileDetailPage } from './view-parent-gallery-file-detail/view-parent-gallery-file-detail.page';

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit{
  dateExample = new Date().toISOString();
  content_loaded: boolean = false;
  @ViewChild(IonModal) modal: IonModal;

  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private userService:UserService,
    private galleryService:GalleryServiceProxy,
    private commonMethod:CommonMethodService
  ) { }

 
  requestDto:ParentAppGalleryRequestDto;
  academicYearId:number;
  galleryList:ParentAppGalleryDto[][];
  
  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Gallery');
    this.userService.getAcademicYear().subscribe((academicYearId:number)=>{
      this.academicYearId=academicYearId;
      this.getAllGallerys();
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

  getAllGallerys(){
    let startOfMonth=moment().startOf('month');
      let endOfMonth=moment().endOf('month');
      let galleryRequest:IParentAppGalleryRequestDto={academicYearId:this.academicYearId,
        fromDate:startOfMonth,tillDate:endOfMonth,studentId:this.userService.CurrentSiblingId};
        this.galleryService.getAllGalleryForStudent(galleryRequest as ParentAppGalleryRequestDto).subscribe(result=>{

            this.galleryList = result.galleryList.reduce((groups, item) => {
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


async openGalleryDetail(currentGalleryOnPopup:ParentAppGalleryDto) {
  
  const modal = await this.modalController.create({
    component: ViewParentGalleryFileDetailPage,
    componentProps: { currentGalleryOnPopup : currentGalleryOnPopup }
  });

  await modal.present();
  }

   
  
   
}
