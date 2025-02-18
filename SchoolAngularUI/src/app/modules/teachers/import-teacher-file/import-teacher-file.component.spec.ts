import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTeacherFileComponent } from './import-teacher-file.component';

describe('ImportTeacherFileComponent', () => {
  let component: ImportTeacherFileComponent;
  let fixture: ComponentFixture<ImportTeacherFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportTeacherFileComponent]
    });
    fixture = TestBed.createComponent(ImportTeacherFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
