import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodService {

  
  constructor() { }

  markAllFormgroupDirty(formGroup:FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
        formGroup.get(key)?.markAsDirty();
      });
      return true;
  }
}