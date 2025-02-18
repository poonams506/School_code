import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolUserListingComponent } from './school-user-listing.component';

describe('SchoolUserListingComponent', () => {
  let component: SchoolUserListingComponent;
  let fixture: ComponentFixture<SchoolUserListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolUserListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolUserListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
