import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonafiedCertificateComponent } from './bonafied-certificate.component';

describe('BonafiedCertificateComponent', () => {
  let component: BonafiedCertificateComponent;
  let fixture: ComponentFixture<BonafiedCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonafiedCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonafiedCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
