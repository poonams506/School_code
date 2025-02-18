import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSubjectMasterComponent } from './add-edit-subject-master.component';

describe('AddEditSubjectMasterComponent', () => {
  let component: AddEditSubjectMasterComponent;
  let fixture: ComponentFixture<AddEditSubjectMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSubjectMasterComponent]
    });
    fixture = TestBed.createComponent(AddEditSubjectMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
