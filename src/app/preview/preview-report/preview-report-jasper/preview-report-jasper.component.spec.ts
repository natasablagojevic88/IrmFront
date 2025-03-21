import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewReportJasperComponent } from './preview-report-jasper.component';

describe('PreviewReportJasperComponent', () => {
  let component: PreviewReportJasperComponent;
  let fixture: ComponentFixture<PreviewReportJasperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewReportJasperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewReportJasperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
