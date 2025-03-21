import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindDialogComponent } from './find-dialog.component';

describe('FindDialogComponent', () => {
  let component: FindDialogComponent;
  let fixture: ComponentFixture<FindDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
