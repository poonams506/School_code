import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCommonHeaderComponent } from './print-common-header.component';

describe('PrintCommonHeaderComponent', () => {
  let component: PrintCommonHeaderComponent;
  let fixture: ComponentFixture<PrintCommonHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintCommonHeaderComponent]
    });
    fixture = TestBed.createComponent(PrintCommonHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
