import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSurveyComponent } from './add-edit-survey.component';

describe('AddEditSurveyComponent', () => {
  let component: AddEditSurveyComponent;
  let fixture: ComponentFixture<AddEditSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSurveyComponent]
    });
    fixture = TestBed.createComponent(AddEditSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
