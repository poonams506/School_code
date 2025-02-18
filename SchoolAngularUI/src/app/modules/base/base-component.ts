import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppearanceAnimation, ConfirmBoxInitializer, DialogLayoutDisplay, DisappearanceAnimation, ToastEvokeService, ToastNotificationInitializer, ToastPositionEnum, ToastProgressBarEnum, ToastUserViewTypeEnum } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-base',
  template: ``,
  styles: [
  ]
})
export class BaseComponent implements OnInit {
    public searchFilter: boolean;
    public closeResult: string;
  
    public _success = new Subject<string>();
    public staticAlertClosed = false;
    public successMessage: string;
    public modalService: NgbModal;
    public translate: TranslateService;
    public toastEvokeService: ToastEvokeService;
  constructor(public injector: Injector) { 
        this.modalService=this.injector.get(NgbModal);
        this.translate=this.injector.get(TranslateService);
        this.toastEvokeService=this.injector.get(ToastEvokeService);
  }

  ngOnInit(): void {
    setTimeout(() => (this.staticAlertClosed = true), 2000);

    this._success.subscribe((message) => (this.successMessage = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => this.successMessage);
  }

  public changeSuccessMessage() {
    this._success.next(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
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
    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));
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

    newToastNotification.setTitle(this.translate.instant('SUCCESS'));
    newToastNotification.setMessage(this.translate.instant('RECORD_DELETED_SUCCESSFULLY'));

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