import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCbseExamResultComponent } from './add-cbse-exam-result.component';

describe('AddCbseExamResultComponent', () => {
  let component: AddCbseExamResultComponent;
  let fixture: ComponentFixture<AddCbseExamResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCbseExamResultComponent]
    });
    fixture = TestBed.createComponent(AddCbseExamResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
