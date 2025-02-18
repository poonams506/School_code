import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksGradeRelationComponent } from './marks-grade-relation.component';

describe('MarksGradeRelationComponent', () => {
  let component: MarksGradeRelationComponent;
  let fixture: ComponentFixture<MarksGradeRelationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarksGradeRelationComponent]
    });
    fixture = TestBed.createComponent(MarksGradeRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
