import { AbstractControl, ValidationErrors } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { isAfter } from 'date-fns';

export function DateRangeValidator(control: AbstractControl): ValidationErrors | null {
  const fromDate: NgbDateStruct = control.parent?.get('ngbFromDate')?.value;
  const toDate: NgbDateStruct = control.parent?.get('ngbToDate')?.value;
debugger
  if(fromDate && toDate){
    const fromDateAsDate = new Date(fromDate.year, fromDate.month - 1, fromDate?.day);
    const toDateAsDate = new Date(toDate.year, toDate.month - 1, toDate.day);
   
  
    if (fromDate && toDate && !isAfter(fromDateAsDate, toDateAsDate)) {
      return { dateRange: 'To date must be greater than from date' };
    }
  }

  

  return null;
}
