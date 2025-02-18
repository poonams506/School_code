import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user-service';
import {  CabDriverActiveTripRequestDto, CabDriverAppServiceProxy, CabDriverAppTripDetailsDto, CabDriverRouteListDto, CabDriverTripDto, CabdriverAppStoppageStudentDto,  ICabDriverActiveTripRequestDto,  MasterServiceProxy,  StudentInformationDto } from 'src/app/services/school-api-service';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewStudentInfoComponent } from '../view-student-info/view-student-info.component';
import  {CapacitorBarcodeScanner, CapacitorBarcodeScannerAndroidScanningLibrary} from '@capacitor/barcode-scanner';
import { GPSLocationService } from 'src/app/services/gps.location.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { isNumber } from 'highcharts';
@Component({
  selector: 'app-drop',
  templateUrl: './drop.page.html',
  styleUrls: ['./drop.page.scss'],
})
export class DropPage implements OnInit {
  tracking: boolean = false;
  isLocationEnabled:boolean=true;
  cabDriverDropForm: FormGroup;
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
  showEndDropButton: boolean = false;
  dropButtonDisabled: boolean = false;
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
  userId:number;
  
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private userService: UserService,
    private masterService: MasterServiceProxy,
    private router: Router,
    private commonMethod: CommonMethodService,
    private httpClient: HttpClient,
    private cabDriverAppServiceService: CabDriverAppServiceProxy,
    private alertController: AlertController,
    private modalController: ModalController,
    private locationService:GPSLocationService,
    private storageService:StorageService,
    private activatedRoute:ActivatedRoute
  ) { }


  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Drop');
    this.userService.getUser().subscribe(result=>{
      this.userId=result.userId;
      this.getRoutes();
    });
  }

  ngOnInit() {
    this.cabDriverDropForm = this.formBuilder.group({
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
            this.cabDriverDropForm.get('routeId').setValue(parseInt(routeId));
            this.tripId=parseInt(tripId);
            this.drop();
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

  drop() {
    let cabDriverTripDto = new CabDriverTripDto();
    cabDriverTripDto.routeId = this.cabDriverDropForm.get('routeId')?.value;
    cabDriverTripDto.tripType = 'Drop';
    const activeTripRequest ={routeId:cabDriverTripDto.routeId,
      tripType:cabDriverTripDto.tripType,
      userId:this.userId
    } as ICabDriverActiveTripRequestDto;

    this.cabDriverAppServiceService.getActivetripSelect(new CabDriverActiveTripRequestDto(activeTripRequest)).subscribe(activeTripResult=>{
      if(!activeTripResult  || (activeTripResult && activeTripResult?.tripId==0)){
        this.cabDriverAppServiceService.cabDriverTripUpsert(cabDriverTripDto).subscribe(result => {
          this.tripId = result;
          this.dropButtonDisabled = this.qrCodeVisible=true; 
          this.startTracking();
          this.stoppageStudentSelect('Drop');
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

  endDrop() {
    let cabDriverTripDto = new CabDriverTripDto();
    cabDriverTripDto.tripId = this.tripId;
    cabDriverTripDto.isTripEnd=true;
    this.cabDriverAppServiceService.cabDriverTripUpsert(cabDriverTripDto).subscribe(result => {
      this.message('success');
        this.performReset();
      
    });

  }


  get f() {
    return this.cabDriverDropForm.controls;
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
    if (this.cabDriverDropForm.invalid) {
      return;
    }
    if (this.cabDriverDropForm.valid) {
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
    const routeId = this.cabDriverDropForm.get('routeId')?.value;
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

  submit() {
    this.submitted = true;
    this.qrCodeVisible = false;
    this.message('success');
  }

  message(message: string) {
    this.toastService.presentToast('Success', 'End Drop', 'top', 'success', 2000);
  }

  toggleStudentsVisibility(stoppage: any) {
    stoppage.showStudents = !stoppage.showStudents;
  }

  
 
  async scanQRCode(): Promise<void> {
   
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
            if( isNumber(splittedText[1]) && parseInt(splittedText[1])>0)
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
      const studentInfo= result;
      this.openStudentInfo(studentInfo);
    
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
    this.cabDriverAppServiceService.cabDriverTripDetailUpsert(cabDriverTripDetailDto).subscribe(result => 
    {
        this.stoppageStudentSelect('Drop');
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
    this.cabDriverDropForm.reset();
    this.submitted = false;
    this.qrCodeVisible = false;
    this.stopageList = [];
    this.dropButtonDisabled=false;
    this.stopTracking();
  }

  
async startTracking() {
  this.storageService.setStorage("ActiveTripId",this.tripId.toString());

 }

 stopTracking() {
   this.tracking = false;
   this.storageService.setStorage("ActiveTripId",null);
 }

 ngOnDestroy() {
 }

}
