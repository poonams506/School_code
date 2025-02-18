import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, NavController, ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  dateExample = new Date().toISOString();
  edit_profile_form: FormGroup;
  submit_attempt: boolean = false;

  customPopoverOptions: any = {
    message: 'Select one',
    cssClass: 'popover-in-modal'
  };

  filters: any = ['abc'];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private navController: NavController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {

    // Setup form
    this.edit_profile_form = this.formBuilder.group({
      name_first: [{value: '', disabled: true}, Validators.required],
      name_last:  [{value: '', disabled: true}, Validators.required],
      middle_name:  [{value: '', disabled: true}, Validators.required],
      dateName: ['', Validators.required],
      addressLine1: [''],
      pincode: ['']


    });

    // DEBUG: Prefill inputs
    this.edit_profile_form.get('name_first').setValue('Disha');
    this.edit_profile_form.get('middle_name').setValue('Nitin');
    this.edit_profile_form.get('name_last').setValue('Patil');
  }

  // Update profile picture
  async updateProfilePicture() {

    const actionSheet = await this.actionSheetController.create({
      header: 'Choose existing picture or take new',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Choose from gallery',
          icon: 'images',
          handler: () => {
            // Put in logic ...
          }
        },
        {
          text: 'Take picture',
          icon: 'camera',
          handler: () => {
            // Put in logic ...
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
  }

  // Submit form
  submit() {

    this.submit_attempt = true;

    // If form valid
    if (this.edit_profile_form.valid) {

      // Save form ...

      // Display success message and go back
      this.toastService.presentToast('Success', 'Profile saved', 'top', 'success', 2000);
      this.navController.back();

    } else {

      // Display error message
      this.toastService.presentToast('Error', 'Please fill in all required fields', 'top', 'danger', 2000);
    }
  }

  // Cancel
  cancel() {

    // Dismiss modal
    this.modalController.dismiss();
  }

  // Apply filter
  apply() {

    // Add filter logic here...
    // ...

    // Dismiss modal and apply filters
    this.modalController.dismiss(this.filters);
  }

}
