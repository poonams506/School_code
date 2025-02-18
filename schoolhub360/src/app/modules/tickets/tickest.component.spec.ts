import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickestComponent } from './tickest.component';

describe('TickestComponent', () => {
  let component: TickestComponent;
  let fixture: ComponentFixture<TickestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TickestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TickestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
