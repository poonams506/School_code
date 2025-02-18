import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMarksGradeRelationComponent } from './add-edit-marks-grade-relation.component';

describe('AddEditMarksGradeRelationComponent', () => {
  let component: AddEditMarksGradeRelationComponent;
  let fixture: ComponentFixture<AddEditMarksGradeRelationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditMarksGradeRelationComponent]
    });
    fixture = TestBed.createComponent(AddEditMarksGradeRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
