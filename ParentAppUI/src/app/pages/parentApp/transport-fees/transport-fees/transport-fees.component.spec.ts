import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportFeesComponent } from './transport-fees.component';

describe('TransportFeesComponent', () => {
  let component: TransportFeesComponent;
  let fixture: ComponentFixture<TransportFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportFeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransportFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
