import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortDialogComponent } from './sort-dialog.component';

describe('SortDialogComponent', () => {
  let component: SortDialogComponent;
  let fixture: ComponentFixture<SortDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
