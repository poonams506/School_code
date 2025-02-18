import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBulkAtteandanceComponent } from './add-edit-bulk-atteandance.component';

describe('AddEditBulkAtteandanceComponent', () => {
  let component: AddEditBulkAtteandanceComponent;
  let fixture: ComponentFixture<AddEditBulkAtteandanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditBulkAtteandanceComponent]
    });
    fixture = TestBed.createComponent(AddEditBulkAtteandanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
