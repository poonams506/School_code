import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHolidayComponent } from './school-holiday.component';

describe('SchoolHolidayComponent', () => {
  let component: SchoolHolidayComponent;
  let fixture: ComponentFixture<SchoolHolidayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolHolidayComponent]
    });
    fixture = TestBed.createComponent(SchoolHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
