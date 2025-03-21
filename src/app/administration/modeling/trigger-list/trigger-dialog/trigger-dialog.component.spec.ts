import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerDialogComponent } from './trigger-dialog.component';

describe('TriggerDialogComponent', () => {
  let component: TriggerDialogComponent;
  let fixture: ComponentFixture<TriggerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TriggerDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TriggerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
