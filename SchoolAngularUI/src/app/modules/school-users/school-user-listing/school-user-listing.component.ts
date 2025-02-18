import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

// import library classes
import {
  ToastEvokeService,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum,
  ConfirmBoxInitializer,
  ToastNotificationInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  AppearanceAnimation,
  ToastPositionEnum,
} from '@costlydeveloper/ngx-awesome-popup';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-school-user-listing',
  templateUrl: './school-user-listing.component.html',
  styleUrls: ['./school-user-listing.component.scss']
})
export class SchoolUserListingComponent {

  searchFilter: boolean;
  closeResult: string;

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;

  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    //private confirmBoxEvokeService: ConfirmBoxEvokeService,
    private toastEvokeService: ToastEvokeService
  ) {}

  ngOnInit(): void {
    setTimeout(() => (this.staticAlertClosed = true), 2000);

    this._success.subscribe((message) => (this.successMessage = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => this.successMessage);

    // by default open confirm box

    //this.confirmBox();
  }

  public changeSuccessMessage() {
    this._success.next('Record deleted successfully.');
  }

  /*on click search filter hide show on mobile*/

  toggleSearch() {
    this.searchFilter = !this.searchFilter;
  }

  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  openConfim(confirm: any) {
    this.modalService.open(confirm);
  }

  /*confirm box settings*/

  /*alert toast box*/
  toastNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle('Success');
    newToastNotification.setMessage('Record Deleted Successfully!');
    // Simply open the toast
    newToastNotification.openToastNotification$();
  }

  confirmBox() {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    //newConfirmBox.setMessage('Are you sure you want to delete this record?!');
    newConfirmBox.setMessage(
      this.translate.instant('ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_RECORD')
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),
    });
    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe((resp) => {
      this.toastNotification();
    });
  }
  // Create toast the method
  alertToast() {
    const newToastNotification = new ToastNotificationInitializer();

    newToastNotification.setTitle('Success');
    newToastNotification.setMessage('Deleted Successfully');

    // Choose layout color type
    newToastNotification.setConfig({
      autoCloseDelay: 5000, // optional
      textPosition: 'left', // optional
      layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
      progressBar: ToastProgressBarEnum.INCREASE, // INCREASE | DECREASE | NONE
      toastUserViewType: ToastUserViewTypeEnum.STANDARD, // STANDARD | SIMPLE
      animationIn: AppearanceAnimation.SLIDE_IN_RIGHT, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.SLIDE_OUT_RIGHT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
      // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
      toastPosition: ToastPositionEnum.TOP_RIGHT,
      allowHtmlMessage: true,
    });

    // Simply open the popup
    newToastNotification.openToastNotification$();
  }
}
