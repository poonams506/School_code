import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolEventComponent } from './school-event.component';

describe('SchoolEventComponent', () => {
  let component: SchoolEventComponent;
  let fixture: ComponentFixture<SchoolEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolEventComponent]
    });
    fixture = TestBed.createComponent(SchoolEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
