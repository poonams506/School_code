import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectMappingComponent } from './subject-mapping.component';

describe('SubjectMappingComponent', () => {
  let component: SubjectMappingComponent;
  let fixture: ComponentFixture<SubjectMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectMappingComponent]
    });
    fixture = TestBed.createComponent(SubjectMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
