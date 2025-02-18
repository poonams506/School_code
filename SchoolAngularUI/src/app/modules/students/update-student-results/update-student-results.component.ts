import { Component, Injector, OnInit } from '@angular/core';

// import library classes
import { BaseComponent } from '../../base/base-component';

@Component({
  selector: 'app-update-student-results',
  templateUrl: './update-student-results.component.html',
  styleUrls: ['./update-student-results.component.scss']
})
export class UpdateStudentResultsComponent extends BaseComponent implements OnInit{

  constructor(override injector:Injector) {
    super(injector);
  }

  override ngOnInit(): void {
  }
  importData(importModal: any) {
    this.modalService.open(importModal, { size: 'lg' });
  }


// import data 

files: File[] = [];

onSelect(event: { addedFiles: any; }) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event: File) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

  
}
