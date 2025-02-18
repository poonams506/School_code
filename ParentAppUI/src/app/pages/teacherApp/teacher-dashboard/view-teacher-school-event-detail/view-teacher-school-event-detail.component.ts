import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OneMonthEventFileDetailsParentAppDto, OneMonthEventFileDetailsTeacherAppDto, OneMonthEventParentAppDto, SchoolMonthEventDto } from 'src/app/services/school-api-service';

@Component({
  selector: 'app-view-teacher-school-event-detail',
  templateUrl: './view-teacher-school-event-detail.component.html',
  styleUrl: './view-teacher-school-event-detail.component.css'
})
export class ViewTeacherSchoolEventDetailComponent implements OnInit{
  constructor(
    private modalCtrl: ModalController ) { }
  ngOnInit() {
  }

  selectedEvent: SchoolMonthEventDto;

  close() 
  {
    return this.modalCtrl.dismiss(false, 'cancel');
  }
  getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
  }

  showFile(file:OneMonthEventFileDetailsTeacherAppDto ) {
    window.open(file.fullPath, '_blank');
  }

}
