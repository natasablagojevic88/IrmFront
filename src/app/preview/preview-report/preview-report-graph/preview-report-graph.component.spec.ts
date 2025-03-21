import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewReportGraphComponent } from './preview-report-graph.component';

describe('PreviewReportGraphComponent', () => {
  let component: PreviewReportGraphComponent;
  let fixture: ComponentFixture<PreviewReportGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewReportGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewReportGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
