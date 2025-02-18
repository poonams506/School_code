import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user-service';
import { CabDriverActiveTripRequestDto, CabDriverAppServiceProxy, CabDriverAppTripDetailsDto, CabDriverRouteListDto, CabDriverTripDto, CabdriverAppStoppageStudentDto, ICabDriverActiveTripRequestDto, StudentInformationDto } from 'src/app/services/school-api-service';
import { AlertController, ModalController } from "@ionic/angular";
import { ViewStudentInfoComponent } from '../view-student-info/view-student-info.component';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { GPSLocationService } from 'src/app/services/gps.location.service';
import { isNumber } from 'highcharts/highcharts.src';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pick-up',
  templateUrl: './pick-up.page.html',
  styleUrls: ['./pick-up.page.scss'],
})
export class PickUpPage implements OnInit {


  cabDriverPickUpForm: FormGroup;
  submitted: boolean = false;
  routeId: number;
  routeList: any[] = [];
  stopageList: any[] = [];
  studentList: any[] = [];
  tripType: string;
  academicYearId: number;
  cabDriverId: number;
  vehicleId: number;
  qrCodeVisible: boolean = false;
  showEndPickUpButton: boolean = false;
  pickUpButtonDisabled: boolean = false;
  vehicalId: number;
  qrCode: string;
  tripStartTime: Date
  cabDriverTripDto: CabDriverTripDto = new CabDriverTripDto;
  cabDriverTripdetailDto : CabDriverAppTripDetailsDto = new CabDriverAppTripDetailsDto;
  datepipe: any;
  tripId: number;
  tripDetailId : number;
  matchedStudentId: number;
  qrCodeText:string;
  tracking: boolean = false;
  isLocationEnabled:boolean=true;
  userId:number;
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private userService: UserService,
    private commonMethod: CommonMethodService,
    private cabDriverAppServiceService: CabDriverAppServiceProxy,
    private alertController: AlertController,
    private modalController: ModalController,
    private locationService:GPSLocationService,
    private storageService:StorageService,
    private activatedRoute:ActivatedRoute
  
  ) {
   }


  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Pick up');
    
    this.locationService.testCurrentLocation();
  

    this.userService.getUser().subscribe(result=>{
      this.userId=result.userId;
      this.getRoutes();

    });
   
  }

  ngOnInit() {
    this.cabDriverPickUpForm = this.formBuilder.group({
      routeId: [null, Validators.required],
    });


  }

  getRoutes() {
    this.userService.getUserIdByRole().subscribe((CabDriverId: number) => {
      this.cabDriverId = CabDriverId;

      this.cabDriverAppServiceService.getCabDriverAppRouteSelect(this.cabDriverId).subscribe((result: CabDriverRouteListDto) => {
        this.routeList = result.cabDriverRouteList;
        this.activatedRoute.paramMap.subscribe(params => {
          const tripId = params.get('tripId');
          const routeId = params.get('routeId');
           
           if(tripId && routeId && parseInt(tripId)>0 && parseInt(routeId)>0)
           {
            this.cabDriverPickUpForm.get('routeId').setValue(parseInt(routeId));
            this.tripId=parseInt(tripId);
            this.pickup();
           }
    
          
        });
      });
    });
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }

  pickup() {
    let cabDriverTripDto = new CabDriverTripDto();
    cabDriverTripDto.routeId = this.cabDriverPickUpForm.get('routeId')?.value;
    cabDriverTripDto.tripType = 'PickUp';
    const activeTripRequest ={routeId:cabDriverTripDto.routeId,
      tripType:cabDriverTripDto.tripType,
      userId:this.userId
    } as ICabDriverActiveTripRequestDto;
    this.cabDriverAppServiceService.getActivetripSelect(new CabDriverActiveTripRequestDto(activeTripRequest)).subscribe(activeTripResult=>{
      if(!activeTripResult  || (activeTripResult && activeTripResult?.tripId==0)){
        this.cabDriverAppServiceService.cabDriverTripUpsert(cabDriverTripDto).subscribe(result => {
          this.tripId = result;
          this.pickUpButtonDisabled = this.qrCodeVisible=true; 
          this.startTracking();
          this.stoppageStudentSelect('PickUp');
        });
      }
     else
     {
      this.alertController.create({
        header: 'Confirm',
        message: `Their is already an active trip exist for another route.Please end that trip first to continue this trip.`,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
            }
          }
        ]
      }).then(res => {
        res.present();
      });
     }

    });
    
  }

  endPickup() {
    // save student list for when ending end trip for pickup and drop page 
    let cabDriverTripDto = new CabDriverTripDto();
    cabDriverTripDto.tripId = this.tripId;
    cabDriverTripDto.isTripEnd=true;
    this.cabDriverAppServiceService.cabDriverTripUpsert(cabDriverTripDto).subscribe(() => {
      this.message('success');
      this.performReset();
    });

  }


  get f() {
    return this.cabDriverPickUpForm.controls;
  }

  resetSelectList(f: any, item: string) {
    if (f[item]?.getRawValue() === 'null') {
      f[item]?.setValue(null);
      return;
    }
    if (item === 'route') {
      this.stopageList;
    }
  }

  showQRCode() {
    this.submitted = true;
    if (this.cabDriverPickUpForm.invalid) {
      return;
    }
    if (this.cabDriverPickUpForm.valid) {
      this.qrCodeVisible = true;
    }
  }

  reset() {
    this.openDialog(this.performReset.bind(this), 'reset');

   
  }

  getStudentListByStoppageId(stoppageId: number) {
    const studentListByStoppage= this.studentList.filter(x => x.stoppageId == stoppageId);
    return studentListByStoppage;
  }

  stoppageStudentSelect(tripType: string) {
    const routeId = this.cabDriverPickUpForm.get('routeId')?.value;
    this.cabDriverAppServiceService.getCabDriverAppStoppageStudentSelect(routeId, tripType).subscribe((result: CabdriverAppStoppageStudentDto) => {
      this.tripId=result.tripId;
      this.stopageList = result.cabDriverStoppageList;
      this.studentList = result.cabDriverStudentList;
      if (this.studentList.length > 0)
        this.qrCodeVisible = true;
    });
  }
  getStudentsForStoppage(stoppageId: number): any[] {
    return this.studentList.filter(student => student.stoppageId === stoppageId);
  }


  message(message: string) {
    this.toastService.presentToast('Success', 'End PickUp', 'top', 'success', 2000);
  }

  toggleStudentsVisibility(stoppage: any) {
    stoppage.showStudents = !stoppage.showStudents;
  }

  

  async scanQRCode(): Promise<void> {
    this.invalidQRCodeError=true;
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint:0,
      cameraDirection:1
    });
    this.processQRCode(result.ScanResult);
  }

  invalidQRCodeError:boolean=true;
  isValidQRCode(qrCodeText:string){
    let isValidQrCode=true;
    const splittedText= qrCodeText.split("-");
    if(splittedText.length==2)
    {
      this.userService.getSchoolCode().subscribe(schoolCode=>{
        if(splittedText[0].toLowerCase()==schoolCode.toLowerCase())
        {
            if(isNumber(splittedText[1]) && parseInt(splittedText[1])>0)
            {
              this.processQRCode(qrCodeText);
            }
            else
            {
              isValidQrCode=false;
            }
        }
        else
        {
          isValidQrCode=false;
        }
      })
    }else
    {
      isValidQrCode=false;
    }

    if(isValidQrCode==false)
    {
      //Show QR Code Error
      this.invalidQRCodeError=true;
    }
  }

  processQRCode(qrCodeText: string) {
    this.cabDriverAppServiceService.getStudentSelect(qrCodeText).subscribe((result: StudentInformationDto) => {
      if(result && result.studentId>0){
        this.invalidQRCodeError=false;
        this.openStudentInfo(result);
      }
      else
      {
        this.invalidQRCodeError=true;
      }
      
    
    });
    
  }

  async openStudentInfo(studentInfoDto: StudentInformationDto)
    {
      const modal = await this.modalController.create({
        component: ViewStudentInfoComponent,
        componentProps: { studentPopup: studentInfoDto }
      });
      modal.onDidDismiss().then((data) => {
        
        if (data.role === 'confirm') {
          this.studentConfirm(data.data);
        }
      });
      modal.onDidDismiss().then(async (data) => {
    
        if (data.role === 'scanMore') {
          this.studentConfirm(data.data);
         await this.scanQRCode(); 
        }
      });

      await modal.present();
    }

    

  close() { }
  
 

  studentConfirm(studentId:number) { 
  
    let cabDriverTripDetailDto = new CabDriverAppTripDetailsDto();
    cabDriverTripDetailDto.tripId = this.tripId;
    cabDriverTripDetailDto.studentId = studentId;
    cabDriverTripDetailDto.tripType = this.tripType;
    this.cabDriverAppServiceService.cabDriverTripDetailUpsert(cabDriverTripDetailDto).subscribe(() => 
    {
        this.stoppageStudentSelect('Pickup');
    });
    

  }
  
  openDialog(callback: Function, action: string) {
    this.alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to ${action}? .`,
      buttons: [
        {
          text: 'No',
          handler: () => {
            // Do nothing if 'No' is clicked
          }
        },
        {
          text: 'Yes',
          handler: () => {
            callback();
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  performReset() {
    this.cabDriverPickUpForm.reset();
    this.submitted = false;
    this.qrCodeVisible = false;
    this.stopageList = [];
    this.pickUpButtonDisabled=false;
    this.stopTracking();
  }







   startTracking() {
   this.storageService.setStorage("ActiveTripId",this.tripId.toString());
  }

  stopTracking() {
    this.tracking = false;
    this.storageService.setStorage("ActiveTripId",null);
  }

  ngOnDestroy() 
  {
  }


}
