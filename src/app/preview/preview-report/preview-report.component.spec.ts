import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewReportComponent } from './preview-report.component';

describe('PreviewReportComponent', () => {
  let component: PreviewReportComponent;
  let fixture: ComponentFixture<PreviewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
