import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphReportComponent } from './graph-report.component';

describe('GraphReportComponent', () => {
  let component: GraphReportComponent;
  let fixture: ComponentFixture<GraphReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
