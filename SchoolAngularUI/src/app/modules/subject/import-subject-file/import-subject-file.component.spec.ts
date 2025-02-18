import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSubjectFileComponent } from './import-subject-file.component';

describe('ImportSubjectFileComponent', () => {
  let component: ImportSubjectFileComponent;
  let fixture: ComponentFixture<ImportSubjectFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportSubjectFileComponent]
    });
    fixture = TestBed.createComponent(ImportSubjectFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
