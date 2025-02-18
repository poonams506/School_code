import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bonafied-reason-popup',
  templateUrl: './bonafied-reason-popup.component.html',
  styleUrls: ['./bonafied-reason-popup.component.scss']
})
export class BonafiedReasonPopupComponent {
  constructor(  private formBuilder: FormBuilder) { 
      this.bonafiedReasonForm = this.formBuilder.group({
        reason: ['', Validators.required]
      });
    }
    reasonSubmitted:boolean=false;
  bonafiedReasonForm: FormGroup;
  modelRef:any;
  ngOnInit(): void {
   
  }

  get f() { return this.bonafiedReasonForm.controls; }
  generateBonafied() {
    this.reasonSubmitted = true;
    // stop here if form is invalid
    if (this.bonafiedReasonForm.invalid) {
        return;
    }
    let reason=this.bonafiedReasonForm.getRawValue() as string
    this.modelRef.close(reason);
  }
  close() {
    this.modelRef.close(false);
  }
}
