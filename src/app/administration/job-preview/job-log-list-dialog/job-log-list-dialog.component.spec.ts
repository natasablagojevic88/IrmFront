import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobLogListDialogComponent } from './job-log-list-dialog.component';

describe('JobLogListDialogComponent', () => {
  let component: JobLogListDialogComponent;
  let fixture: ComponentFixture<JobLogListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobLogListDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobLogListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
