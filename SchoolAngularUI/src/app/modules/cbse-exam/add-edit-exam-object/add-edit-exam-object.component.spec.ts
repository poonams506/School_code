import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditExamObjectComponent } from './add-edit-exam-object.component';

describe('AddEditExamObjectComponent', () => {
  let component: AddEditExamObjectComponent;
  let fixture: ComponentFixture<AddEditExamObjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditExamObjectComponent]
    });
    fixture = TestBed.createComponent(AddEditExamObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
