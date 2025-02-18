import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditExamMasterComponent } from './add-edit-exam-master.component';

describe('AddEditExamMasterComponent', () => {
  let component: AddEditExamMasterComponent;
  let fixture: ComponentFixture<AddEditExamMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditExamMasterComponent]
    });
    fixture = TestBed.createComponent(AddEditExamMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
