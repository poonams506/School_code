import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistoryLeavingcertificateComponent } from './view-history-leavingcertificate.component';

describe('ViewHistoryLeavingcertificateComponent', () => {
  let component: ViewHistoryLeavingcertificateComponent;
  let fixture: ComponentFixture<ViewHistoryLeavingcertificateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewHistoryLeavingcertificateComponent]
    });
    fixture = TestBed.createComponent(ViewHistoryLeavingcertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
