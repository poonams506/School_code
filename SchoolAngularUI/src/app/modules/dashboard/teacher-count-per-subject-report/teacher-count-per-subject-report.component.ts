import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service';
import { TeacherCountPerSubjectAnalyzerServiceProxy } from 'src/app/services/school-api-service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-teacher-count-per-subject-report',
  templateUrl: './teacher-count-per-subject-report.component.html',
  styleUrls: ['./teacher-count-per-subject-report.component.scss']
})
export class TeacherCountPerSubjectReportComponent implements OnInit {
  academicYearId: number;
  teacherCountList: number[] = [];
  subjectList: string[] = [];
  chartData: ChartDataset[] = [];
  chartLabels: string[] = [];

  constructor(
    private userService: UserService,
    private teacherPerCountSubjectService: TeacherCountPerSubjectAnalyzerServiceProxy
  ) {}

  ngOnInit(): void {
    this.getAcademicYear();
  }

  getAcademicYear(): void {
    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      this.getTeacherPerSubjectCountSelect();
    });
  }

  getTeacherPerSubjectCountSelect(): void {
    this.teacherPerCountSubjectService.teacherCountPerSubjectSelect(this.academicYearId).subscribe((result) => {
      this.teacherCountList = [];
      this.subjectList = [];

      result.getTeacherCountPerSubjects.forEach(item => {
        this.teacherCountList.push(item.teacherCount);
        this.subjectList.push(item.subjectName);
      });

      this.updateChartData();
    });
  }

  updateChartData(): void {
    this.chartData = [
      {
        data: this.teacherCountList,
        label: 'Teacher',
        backgroundColor: '#2caffe',
        borderColor: '#0f81c6',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      }
    ];
    this.chartLabels = this.subjectList;
  }

  public chartColors: any[] = [
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];

  chartOption: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0,
      },
    },
    scales: {
      y: {
        position: 'left',
        stacked: true,
        ticks: {
          stepSize: 2, // Adjust the step size here
        },
        max: 20, 
      },
      x: {
        position: 'bottom'
      }
    }
  };
  

  lineChartType: ChartType = "line";
}
