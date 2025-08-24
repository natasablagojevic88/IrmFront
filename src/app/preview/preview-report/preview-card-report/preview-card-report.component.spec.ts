import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCardReportComponent } from './preview-card-report.component';

describe('PreviewCardReportComponent', () => {
  let component: PreviewCardReportComponent;
  let fixture: ComponentFixture<PreviewCardReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewCardReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewCardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
