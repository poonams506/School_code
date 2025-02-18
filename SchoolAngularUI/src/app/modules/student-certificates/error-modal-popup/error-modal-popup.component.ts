import { Component } from '@angular/core';

@Component({
  selector: 'app-error-modal-popup',
  templateUrl: './error-modal-popup.component.html',
  styleUrls: ['./error-modal-popup.component.scss']
})
export class ErrorModalPopupComponent {
  requiredItemsArray : string[];
  title : string;
  message : string;
  modelRef: any;
  close() {
    this.modelRef.close(false);
  }
}
