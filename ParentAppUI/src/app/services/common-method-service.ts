import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClassAttendanceMissingReportDto } from './school-api-service';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodService {

  headerTitle: string = "";
  classAttendanceMissing: ClassAttendanceMissingReportDto;
  constructor() { }

  markAllFormgroupDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.markAsDirty();
    });
    return true;
  }

  setHeaderTitle(title) {
    this.headerTitle = title;
  }
  getHeaderTitle() {
    return this.headerTitle;
  }
  setAttendanceDate(classAttendanceMissing: ClassAttendanceMissingReportDto) {
    this.classAttendanceMissing = classAttendanceMissing;
  }
  getAttendanceDate() {
    return this.classAttendanceMissing;
  }

}