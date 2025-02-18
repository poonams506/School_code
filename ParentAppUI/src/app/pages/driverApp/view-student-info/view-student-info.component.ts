import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CabDriverAppTripDetailsDto, StudentInformationDto } from 'src/app/services/school-api-service';

@Component({
  selector: 'app-view-student-info',
  templateUrl: './view-student-info.component.html',
  styleUrl: './view-student-info.component.scss'
})
export class ViewStudentInfoComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController ) { }
  ngOnInit() {
    this.confirm();
  }

  studentPopup:StudentInformationDto;


  
  close() 
  {
    return this.modalCtrl.dismiss(false, 'cancel');
  }
  confirm(){

    return this.modalCtrl.dismiss(this.studentPopup.studentId, 'confirm');
   }

  ScanMore()
  {
    return this.modalCtrl.dismiss(this.studentPopup.studentId, 'scanMore');
  }
  }
  

  
  





