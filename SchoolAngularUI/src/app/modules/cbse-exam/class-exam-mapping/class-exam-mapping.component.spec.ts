import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassExamMappingComponent } from './class-exam-mapping.component';

describe('ClassExamMappingComponent', () => {
  let component: ClassExamMappingComponent;
  let fixture: ComponentFixture<ClassExamMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassExamMappingComponent]
    });
    fixture = TestBed.createComponent(ClassExamMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
