import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingLoadAnalyserReportComponent } from './teaching-load-analyser-report.component';

describe('TeachingLoadAnalyserReportComponent', () => {
  let component: TeachingLoadAnalyserReportComponent;
  let fixture: ComponentFixture<TeachingLoadAnalyserReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeachingLoadAnalyserReportComponent]
    });
    fixture = TestBed.createComponent(TeachingLoadAnalyserReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
