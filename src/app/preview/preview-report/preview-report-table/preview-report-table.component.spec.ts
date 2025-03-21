import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewReportTableComponent } from './preview-report-table.component';

describe('PreviewReportTableComponent', () => {
  let component: PreviewReportTableComponent;
  let fixture: ComponentFixture<PreviewReportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewReportTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
