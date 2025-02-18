import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  
} from '@angular/forms';
import { MustMatch } from 'src/app/services/must-match.validator';
import {  NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  model: NgbDateStruct;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, 
    @Inject(DOCUMENT) private document: Document
    ) {
}

// add class to login page body

ngOnInit() {
this.document.body.classList.add('login-page-body');

this.registerForm = this.formBuilder.group({
  userType: ['', Validators.required],
  schoolId: ['', Validators.required],
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  mobileNo: ['+91 9865432087', Validators.required],
 // validates date format yyyy-mm-dd
 dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],

  schoolFullName: ['', Validators.required],
  schoolCode: ['sch001', Validators.required],
  medium: ['', Validators.required],
  schoolEmail: ['', Validators.required],
  schoolContact: ['', Validators.required],
  schoolWebsite: [''],
  schoolAlternateContact: [''],
  schoolAddressLineOne: ['',Validators.required],
  schoolAddressLineTwo: [''],
  pincode: ['',Validators.required],
  registerCountry: ['',Validators.required],
  registerState: ['',Validators.required],
  registerDistrict: ['',Validators.required],
  registerTaluka: ['',Validators.required],
  schoolPermission: ['',Validators.required],
  regNo: ['',Validators.required],
  schoolType: [''],
  udiseNo: [''],
  board: ['',Validators.required],
  affiliationNo: [''],
  hscSccIndexNo: [''],
  schoolDescription: [''],
  bankAccountNumber: [''],
  bankName: [''],


  
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  confirmPassword: ['', Validators.required],
  acceptTerms: [false, Validators.requiredTrue],
  status:    ['', Validators.required],
}, 
  {
    validator: MustMatch('password', 'confirmPassword')
  }
)}

 // convenience getter for easy access to form fields
 get f() { return this.registerForm.controls; }

 onSubmit() {
     this.submitted = true;

     // stop here if form is invalid
     if (this.registerForm.invalid) {
         return;
     }

     // display form values on success
     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
 }

 onReset() {
     this.submitted = false;
     this.registerForm.reset();
 }

ngOnDestroy() {
this.document.body.classList.remove('login-page-body');
}

}