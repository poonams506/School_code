import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSubjectMappingComponent } from './add-edit-subject-mapping.component';

describe('AddEditSubjectMappingComponent', () => {
  let component: AddEditSubjectMappingComponent;
  let fixture: ComponentFixture<AddEditSubjectMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSubjectMappingComponent]
    });
    fixture = TestBed.createComponent(AddEditSubjectMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
