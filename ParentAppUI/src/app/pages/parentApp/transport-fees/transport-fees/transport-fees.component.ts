import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { CommonMethodService } from 'src/app/services/common-method-service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { UserService } from 'src/app/services/user-service';
import * as moment from 'moment';
import { ParentAppServiceProxy, TransportFeePaymentTopSectionDto } from 'src/app/services/school-api-service';

@Component({
  selector: 'app-transport-fees',
  templateUrl: './transport-fees.component.html',
  styleUrl: './transport-fees.component.scss'
})
export class TransportFeesComponent implements OnInit {
  feePaymentDetails = new TransportFeePaymentTopSectionDto();
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
    private parentAppService : ParentAppServiceProxy
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
    this.commonMethod.setHeaderTitle('Transport Fees');
    // Fake timeout
    this.getFeeData();    
  }
  getFeeData() {
    this.parentAppService.getParentTransportFeePaymentDetails(this.userService.CurrentSiblingId).subscribe((data:TransportFeePaymentTopSectionDto)=>{
      this.feePaymentDetails = data;
      this.rerenderChart();
      this.content_loaded = true;
    })
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
