import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbseExamResultComponent } from './cbse-exam-result.component';

describe('CbseExamResultComponent', () => {
  let component: CbseExamResultComponent;
  let fixture: ComponentFixture<CbseExamResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CbseExamResultComponent]
    });
    fixture = TestBed.createComponent(CbseExamResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
