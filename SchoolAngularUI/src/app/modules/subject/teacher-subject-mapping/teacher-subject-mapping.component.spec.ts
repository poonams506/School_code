import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSubjectMappingComponent } from './teacher-subject-mapping.component';

describe('TeacherSubjectMappingComponent', () => {
  let component: TeacherSubjectMappingComponent;
  let fixture: ComponentFixture<TeacherSubjectMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherSubjectMappingComponent]
    });
    fixture = TestBed.createComponent(TeacherSubjectMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
