import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeacherSchoolEventDetailComponent } from './view-teacher-school-event-detail.component';

describe('ViewTeacherSchoolEventDetailComponent', () => {
  let component: ViewTeacherSchoolEventDetailComponent;
  let fixture: ComponentFixture<ViewTeacherSchoolEventDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTeacherSchoolEventDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTeacherSchoolEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
