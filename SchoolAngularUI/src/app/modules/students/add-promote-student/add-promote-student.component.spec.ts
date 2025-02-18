import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromoteStudentComponent } from './add-promote-student.component';

describe('AddPromoteStudentComponent', () => {
  let component: AddPromoteStudentComponent;
  let fixture: ComponentFixture<AddPromoteStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPromoteStudentComponent]
    });
    fixture = TestBed.createComponent(AddPromoteStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
