import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { SchoolCalendarDto, SchoolCalendarEventDetailAppDto } from 'src/app/services/school-api-service';

@Component({
  selector: 'app-calendar-event-detail-modal',
  templateUrl: './calendar-event-detail-modal.component.html',
  styleUrl: './calendar-event-detail-modal.component.css'
})
export class CalendarEventDetailModalComponent implements OnInit{
  @Input() currentEventOnPopup: SchoolCalendarDto;
  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  getFormattedEventDuration(){
   let startDate=  moment({year:this.currentEventOnPopup.ngbStartDate.year,
    month:this.currentEventOnPopup.ngbStartDate.month,
  day:this.currentEventOnPopup.ngbStartDate.day,
hour:this.currentEventOnPopup.ngbStartTime.hour,
minute:this.currentEventOnPopup.ngbStartTime.minute});

let endDate=  moment({year:this.currentEventOnPopup.ngbEndDate.year,
  month:this.currentEventOnPopup.ngbEndDate.month,
day:this.currentEventOnPopup.ngbEndDate.day,
hour:this.currentEventOnPopup.ngbEndTime.hour,
minute:this.currentEventOnPopup.ngbEndTime.minute});

return startDate.format('MMMM D, YYYY hh:mm A') + " - "+endDate.format('MMMM D, YYYY hh:mm A');

}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
  }

  showFile(file:SchoolCalendarEventDetailAppDto ) {
    window.open(file.fullPath, '_blank');
  }
}
