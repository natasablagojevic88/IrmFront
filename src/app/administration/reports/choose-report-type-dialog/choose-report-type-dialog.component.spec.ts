import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseReportTypeDialogComponent } from './choose-report-type-dialog.component';

describe('ChooseReportTypeDialogComponent', () => {
  let component: ChooseReportTypeDialogComponent;
  let fixture: ComponentFixture<ChooseReportTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseReportTypeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseReportTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
