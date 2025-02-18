import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSchoolVacationComponent } from './add-edit-school-vacation.component';

describe('AddEditSchoolVacationComponent', () => {
  let component: AddEditSchoolVacationComponent;
  let fixture: ComponentFixture<AddEditSchoolVacationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSchoolVacationComponent]
    });
    fixture = TestBed.createComponent(AddEditSchoolVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
