import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { FeeInstallmentDetailDto, FeePaymentAndDiscountSectionDto, FeePaymentTopSectionDto, ParentAppServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import * as moment from 'moment';
import { ViewFeeInfoDetailPage } from './fee-installment-info-details/view-fee-info-detail.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrl: './fees.component.scss'
})
export class FeesComponent implements OnInit {
  feePaymentDetails = new FeePaymentTopSectionDto();
  chart : any;
  type = 'dues';

    // Doughnut
    public doughnutChartLabels: string[] = ["Paid Amount", "Due Amount", "Discount Amount"];
    public doughnutChartData: ChartData<'doughnut'> = {
      //labels: this.doughnutChartLabels,
    
      datasets: [
        { 
          data: [350, 450, 450],
          
          backgroundColor: [
            'green',
            'red',
            'blue'
          ],
          borderWidth:0
        },
        
      ],
    }; 
    
    public doughnutChartType: ChartType = "doughnut";
    options = {
      legend: {
        display: true,
        labels: {
          usePointStyle: true
        },
        onClick: (event, legendItem) => {
          console.log("This is working!");
        }
      },
      tooltips: {
        enabled: true
      },
      onClick: (evt, item) => {
        console.log('Clicked!')
      },
      onHover: (evt, item) => {
                  console.log("hover")
      }
    };


  content_loaded: boolean = false;

  constructor(
    private helperService: HelperService,
    private commonMethod:CommonMethodService,
    private userService: UserService,
    private parentAppService : ParentAppServiceProxy,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    // Create bar chart
  
  }

  rerenderChart(){
    this.doughnutChartLabels = ["Paid Amount", "Due Amount", "Discount Amount"];
    this.doughnutChartData = {
      //labels: this.doughnutChartLabels,
    
      datasets: [
        { 
          data: [this.feePaymentDetails.totalPaid, this.feePaymentDetails.totalDue, this.feePaymentDetails.totalDiscount],
          
          backgroundColor: [
            'green',
            'red',
            'blue'
          ],
          borderWidth:0
        },
        
      ],
    }; 
    
    this.doughnutChartType = "doughnut";
    this.options = {
      legend: {
        display: true,
        labels: {
          usePointStyle: true
        },
        onClick: (event, legendItem) => {
          console.log("This is working!");
        }
      },
      tooltips: {
        enabled: true
      },
      onClick: (evt, item) => {
        console.log('Clicked!')
      },
      onHover: (evt, item) => {
                  console.log("hover")
      }
    };
  }
  handleRefresh(event) {
    setTimeout(() => {
    this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }

  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Academic Fees');
    // Fake timeout
    this.getFeeData();    
  }
  getFeeData() {
    this.parentAppService.getParentFeePaymentDetails(this.userService.CurrentSiblingId).subscribe((data:FeePaymentTopSectionDto)=>{
      this.feePaymentDetails = data;
      this.rerenderChart();
      this.content_loaded = true;
    })
  }

  isModalOpen = false;
  installments:FeeInstallmentDetailDto[];
  feeWavierDisplayName : string;
  // setOpen(isOpen: boolean, name : string, typeId : number) {
  //  this.installments = this.feePaymentDetails.feeInstallmentDetailDtoList.filter(x=>x.feeWavierTypeId == typeId)!;
  //  this.feeWavierDisplayName = name;
  //  this.isModalOpen = isOpen;
  // }
  async setOpen(installment: FeePaymentAndDiscountSectionDto, name: string, typeId: number) {
    this.installments = this.feePaymentDetails.feeInstallmentDetailDtoList.filter(x => x.feeWavierTypeId == typeId);
    this.feeWavierDisplayName = name;
    const modal = await this.modalController.create({
      component: ViewFeeInfoDetailPage,
      componentProps: { installments: this.installments }
    });
  
    await modal.present();
  }
  checkDate(addDisc : any){
    let result;
    if(addDisc == null || addDisc == undefined || addDisc.discountEndDate == null || addDisc.discountEndDate == undefined || addDisc.discountEndDate == "")
    {
      result = true;
      return result;
    }
    const firstYear = moment(addDisc.discountEndDate).year();
    const firstMonth = moment(addDisc.discountEndDate).month();
    const firstDay = moment(addDisc.discountEndDate).date();
    const secondYear = new Date().getFullYear();
    const secondMonth = new Date().getMonth();
    const secondDay = new Date().getDate();

    // Compare both date components

    
    switch (true) {
      case firstYear === secondYear && firstMonth === secondMonth && firstDay === secondDay:
        result = true;
        break;
      case firstYear < secondYear || (firstYear === secondYear && firstMonth < secondMonth) || (firstYear === secondYear && firstMonth === secondMonth && firstDay < secondDay):
        result = false;
        break;
      default:
        result = true;
    }
    return result;
  
}

  showDisc(feeParticular : FeePaymentAndDiscountSectionDto){
   var result = false;
   if(feeParticular.feeWavierTypeId == this.feePaymentDetails.feeWavierTypeId){
      result = true;
    }
    else if((this.feePaymentDetails.feeWavierTypeId == 0 ||
      this.feePaymentDetails.feeWavierTypeId == undefined || this.feePaymentDetails.feeWavierTypeId == null)){
        if(this.checkDate(feeParticular.discountEndDate)){
          result = true;
        }
    }
    if(this.feePaymentDetails.totalDue < 1 && (this.feePaymentDetails.feeWavierTypeId == 0 ||
      this.feePaymentDetails.feeWavierTypeId == undefined || this.feePaymentDetails.feeWavierTypeId == null)){
      result = false;
    }
     return result;
  }

  showFullDiscGrid(){
    var count = 0;
    this.feePaymentDetails.feePaymentAndDiscountSectionDtoList.forEach(element => {
      if(element.feeWavierTypeId == this.feePaymentDetails.feeWavierTypeId){
        count += 1;
      }
      else if((this.feePaymentDetails.feeWavierTypeId == 0 ||
        this.feePaymentDetails.feeWavierTypeId == undefined || this.feePaymentDetails.feeWavierTypeId == null)){
          if(this.checkDate(element.discountEndDate)){
            count += 1;
          }
      }
      if(this.feePaymentDetails.totalDue < 1 && (this.feePaymentDetails.feeWavierTypeId == 0 ||
        this.feePaymentDetails.feeWavierTypeId == undefined || this.feePaymentDetails.feeWavierTypeId == null)){
        count -= 1;
      }
    });
    if(count > 0){
       return true;
    }
    else{
      return false;
    }
  }
  getFormattedDate(inputDate : any){
    if(inputDate)
    return moment(inputDate).format("DD/MM/yyyy");
    else
    return "-";
  }
  
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
