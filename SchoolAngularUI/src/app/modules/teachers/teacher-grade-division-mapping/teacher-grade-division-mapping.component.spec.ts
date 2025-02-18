import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherGradeDivisionMappingComponent } from './teacher-grade-division-mapping.component';

describe('TeacherGradeDivisionMappingComponent', () => {
  let component: TeacherGradeDivisionMappingComponent;
  let fixture: ComponentFixture<TeacherGradeDivisionMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherGradeDivisionMappingComponent]
    });
    fixture = TestBed.createComponent(TeacherGradeDivisionMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
