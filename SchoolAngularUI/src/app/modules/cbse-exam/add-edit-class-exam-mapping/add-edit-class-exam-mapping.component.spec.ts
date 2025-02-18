import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditClassExamMappingComponent } from './add-edit-class-exam-mapping.component';

describe('AddEditClassExamMappingComponent', () => {
  let component: AddEditClassExamMappingComponent;
  let fixture: ComponentFixture<AddEditClassExamMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditClassExamMappingComponent]
    });
    fixture = TestBed.createComponent(AddEditClassExamMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
