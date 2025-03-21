import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardReportComponent } from './standard-report.component';

describe('StandardReportComponent', () => {
  let component: StandardReportComponent;
  let fixture: ComponentFixture<StandardReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StandardReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
