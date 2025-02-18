import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentResultsComponent } from './update-student-results.component';

describe('UpdateStudentResultsComponent', () => {
  let component: UpdateStudentResultsComponent;
  let fixture: ComponentFixture<UpdateStudentResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStudentResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStudentResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
