import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGroupDialogComponent } from './report-group-dialog.component';

describe('ReportGroupDialogComponent', () => {
  let component: ReportGroupDialogComponent;
  let fixture: ComponentFixture<ReportGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportGroupDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
