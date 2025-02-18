import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectMappingCloneComponent } from './subject-mapping-clone.component';

describe('SubjectMappingCloneComponent', () => {
  let component: SubjectMappingCloneComponent;
  let fixture: ComponentFixture<SubjectMappingCloneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectMappingCloneComponent]
    });
    fixture = TestBed.createComponent(SubjectMappingCloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
