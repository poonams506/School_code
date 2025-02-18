import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamObjectComponent } from './exam-object.component';

describe('ExamObjectComponent', () => {
  let component: ExamObjectComponent;
  let fixture: ComponentFixture<ExamObjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamObjectComponent]
    });
    fixture = TestBed.createComponent(ExamObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
