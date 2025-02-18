import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSchoolEventComponent } from './add-edit-school-event.component';

describe('AddEditSchoolEventComponent', () => {
  let component: AddEditSchoolEventComponent;
  let fixture: ComponentFixture<AddEditSchoolEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSchoolEventComponent]
    });
    fixture = TestBed.createComponent(AddEditSchoolEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
