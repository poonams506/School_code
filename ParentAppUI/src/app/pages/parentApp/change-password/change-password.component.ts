import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  current_year: number = new Date().getFullYear();

  signin_form: FormGroup;
  submit_attempt: boolean = false;

  constructor(
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {

    // Setup form
    this.signin_form = this.formBuilder.group({
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
      confirmPassword: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });
  }

  // Sign in
  async signIn() {
    this.submit_attempt = true;

    // If email or password empty
    if (
      this.signin_form.value.password == '' ||
      this.signin_form.value.confirmPassword == ''
    ) {
      this.toastService.presentToast(
        'Error',
        'Please enter correct password and confirm password',
        'top',
        'danger',
        2000
      );
    } else {
      // Proceed with loading overlay
      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: 'Signing in....Please be patient.',
        spinner: 'crescent',
      });
      await loading.present();

      // TODO: Add your sign in logic
      // ...

      // Fake timeout
      setTimeout(async () => {
        // Sign in success
        await this.router.navigate(['/role'], { replaceUrl: true });
        loading.dismiss();
      }, 2000);
    }
  }
}
