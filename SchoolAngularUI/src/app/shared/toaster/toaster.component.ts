// import { Component, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-toaster',
//   templateUrl: './toaster.component.html',
//   styleUrls: ['./toaster.component.scss']
// })
// export class ToasterComponent {

//   constructor(private toastr: ToastrService) {}

//   showSuccess(message: string) {
//     this.toastr.success(message);
//   }

//   showError(message: string) {
//     this.toastr.error(message);
//   }

//   showInfo(message: string) {
//     this.toastr.info(message);
//   }

//   showWarning(message: string) {
//     this.toastr.warning(message);
//   }

// }




import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import {Subscription} from 'rxjs';
import {DialogBelonging} from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-dynamic-message',
  templateUrl: './toaster.component.html',
})
export class DynamicMessageComponent {
  @Input() title: string;
  @Input() message: string;

  private subscriptions: Subscription = new Subscription();
    
  // Dependency Injection of the dialogBelonging in constructor is crucial.
  constructor(@Inject('dialogBelonging') public dialogBelonging: DialogBelonging, 
) {}

ngOnInit(): void {
  // Check received data and other available features.
  console.log(this.dialogBelonging);
  
  // Subscribe to button listeners.
  this.subscriptions.add(
      // IDialogEventsController
      this.dialogBelonging.eventsController.onButtonClick$.subscribe((_Button) => {
          if (_Button.ID === 'edit') {
              
              // Do some logic for example edit user.
          } else if (_Button.ID === 'submit') {
              
              // Do some logic and close popup.
              this.dialogBelonging.eventsController.close();
          }
          else if (_Button.ID === 'cancel') {
              
              // Do some logic and close popup.
              this.dialogBelonging.eventsController.close();
          }
      })
  );
  
  // Timeout emulates async data.
  setTimeout(() => {
      // Close the loader after some data is ready.
      // IDialogEventsController
      this.dialogBelonging.eventsController.closeLoader();
  }, 1000);
}

ngOnDestroy(): void {
  // Care about memory and close all subscriptions.
  this.subscriptions.unsubscribe();
}
}