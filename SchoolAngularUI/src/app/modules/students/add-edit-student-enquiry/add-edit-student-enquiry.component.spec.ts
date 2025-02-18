import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStudentEnquiryComponent } from './add-edit-student-enquiry.component';

describe('AddEditStudentEnquiryComponent', () => {
  let component: AddEditStudentEnquiryComponent;
  let fixture: ComponentFixture<AddEditStudentEnquiryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditStudentEnquiryComponent]
    });
    fixture = TestBed.createComponent(AddEditStudentEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
