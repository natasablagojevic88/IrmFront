import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGraphDialogComponent } from './filter-graph-dialog.component';

describe('FilterGraphDialogComponent', () => {
  let component: FilterGraphDialogComponent;
  let fixture: ComponentFixture<FilterGraphDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterGraphDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterGraphDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
