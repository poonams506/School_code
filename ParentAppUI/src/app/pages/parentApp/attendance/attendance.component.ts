import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ParentAppServiceProxy, StudentAttendanceMobileDto, StudentAttendanceServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import * as moment from 'moment';
import { CommonMethodService } from 'src/app/services/common-method-service';

@Component({
  selector: 'app-charts',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  currentAttendanceDate: string = moment().format('YYYY-MM-DD');
  content_loaded: boolean = false;
  academicYearId: number;
  studentAttendance: StudentAttendanceMobileDto[] = [];
  lstMonthStudentAttendance: StudentAttendanceMobileDto[] = [];
  currentMonth: number;
  currentYear: number;

  constructor(
    private helperService: HelperService,
    private studentAttendanceService: StudentAttendanceServiceProxy,
    private userService: UserService,
    private commonMethod: CommonMethodService,
    public parentAppService: ParentAppServiceProxy,

  ) {}

  ionViewDidEnter() {
    this.commonMethod.setHeaderTitle('Attendance');
    this.initializePieChart();
    // this.userService.getAcademicYear().subscribe((academicYearId)=>{
    //   this.academicYearId=academicYearId;
      this.parentAppService
        .getAttendanceDetailByStudentId(this.userService.CurrentSiblingId)
        .subscribe((attendanceResult) => {
          this.studentAttendance = attendanceResult.lstStudentAttendance;
          this.onMonthYearChange();
          this.content_loaded = true;
        });
    
  }

  ngOnInit() {}

  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }

  highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  getAllDatesInMonth(): moment.Moment[] {
    const dates: moment.Moment[] = [];
    const lastDay = parseInt(moment({ year: this.currentYear, month: this.currentMonth, day: 1 }).endOf('month').format('DD'));
    for (let day = 1; day <= lastDay; day++) {
      dates.push(moment({ year: this.currentYear, month: this.currentMonth, day: day }));
    }
    return dates;
  }

  onMonthYearChange() {
    this.currentMonth = moment(this.currentAttendanceDate, 'YYYY-MM-DD').month();
    this.currentYear = moment(this.currentAttendanceDate, 'YYYY-MM-DD').year();

    const startDate = moment(this.currentAttendanceDate, 'YYYY-MM-DD').startOf('month').format('YYYY-MM-DD');
    const endDate = moment(this.currentAttendanceDate, 'YYYY-MM-DD').endOf('month').format('YYYY-MM-DD');

    this.parentAppService
      .getAttendanceDetailByStudentId(this.userService.CurrentSiblingId)
      .subscribe((attendanceResult) => {
        this.studentAttendance = attendanceResult.lstStudentAttendance.filter((item) =>
          moment(item.attendanceDateTime).isBetween(startDate, endDate, null, '[]')
        );
        this.calculateAttendance();
      });
  }

  calculateAttendance() {
    // Calculate the total days in the current month
    let totalDays = moment(this.currentAttendanceDate, 'YYYY-MM-DD').daysInMonth();
  
    // Calculate the number of absent, present, half days, and unmarked days
    let absentDays = this.studentAttendance.filter((x) => x.statusId == 3).length;
    let presentDays = this.studentAttendance.filter((x) => x.statusId == 1).length;
    let halfDays = this.studentAttendance.filter((x) => x.statusId == 2).length;
    let unmarkedDays = totalDays - (absentDays + presentDays + halfDays);
  
    // Calculate the percentages
    let absentPercentage = (absentDays / totalDays) * 100;
    let presentPercentage = (presentDays / totalDays) * 100;
    let halfDayPercentage = (halfDays / totalDays) * 100;
    let unmarkedPercentage = (unmarkedDays / totalDays) * 100;
  
    // Update the chart data
    this.chartOptions.series[0]['data'] = [
      { name: 'Absent', color: '#F97794', y: absentPercentage },
      { name: 'Unmarked', color: '#BC89E0', y: unmarkedPercentage },
      { name: 'Present', color: '#44C0B1', y: presentPercentage },
      { name: 'Half Day', color: '#FFA500', y: halfDayPercentage },
    ];
  
    // Update the chart title
    this.chartOptions.title.text = `${this.months[this.currentMonth]} ${this.currentYear}`;
  
    // Update the chart
    this.highcharts.charts[0].update({
      series: this.chartOptions.series,
      title: this.chartOptions.title,
    });
  }
  

  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  initializePieChart() {
    let totalDays = moment(this.currentAttendanceDate, 'YYYY-MM-DD').daysInMonth();
    let absentDays = this.studentAttendance.filter((x) => x.statusId == 3).length;
    let presentDays = this.studentAttendance.filter((x) => x.statusId == 1).length;
    let halfDays = this.studentAttendance.filter((x) => x.statusId == 2).length;
    let unmarkedDays = totalDays - (absentDays + presentDays + halfDays);
  
    let absentPercentage = (absentDays / totalDays) * 100;
    let presentPercentage = (presentDays / totalDays) * 100;
    let halfDayPercentage = (halfDays / totalDays) * 100;
    let unmarkedPercentage = (unmarkedDays / totalDays) * 100;
  
    this.chartOptions = {
      chart: {
        type: 'pie',
        backgroundColor: '#fff',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0,
        },
        style: {
          fontFamily: '"Poppins", sans-serif',
        },
      },
      title: {
        text: `${this.months[this.currentMonth]} ${this.currentYear}`,
        style: { color: '#000' },
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: true,
            format: '{point.name}: <b>{point.percentage:.1f}%</b>',
          },
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Attendance',
          data: [
            { name: 'Absent', color: '#F97794', y: absentPercentage },
            { name: 'Unmarked', color: '#BC89E0', y: unmarkedPercentage },
            { name: 'Present', color: '#44C0B1', y: presentPercentage },
            { name: 'Half Day', color: '#FFA500', y: halfDayPercentage },
          ],
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal',
              },
            },
          },
        ],
      },
      credits: {
        enabled: false,
      },
    };
  }
  
}
