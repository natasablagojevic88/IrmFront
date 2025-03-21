import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewReportKpiComponent } from './preview-report-kpi.component';

describe('PreviewReportKpiComponent', () => {
  let component: PreviewReportKpiComponent;
  let fixture: ComponentFixture<PreviewReportKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewReportKpiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewReportKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
