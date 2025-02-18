import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSchoolHolidayComponent } from './add-edit-school-holiday.component';

describe('AddEditSchoolHolidayComponent', () => {
  let component: AddEditSchoolHolidayComponent;
  let fixture: ComponentFixture<AddEditSchoolHolidayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSchoolHolidayComponent]
    });
    fixture = TestBed.createComponent(AddEditSchoolHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
