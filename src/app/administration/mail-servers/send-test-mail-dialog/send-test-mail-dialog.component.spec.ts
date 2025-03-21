import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendTestMailDialogComponent } from './send-test-mail-dialog.component';

describe('SendTestMailDialogComponent', () => {
  let component: SendTestMailDialogComponent;
  let fixture: ComponentFixture<SendTestMailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendTestMailDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendTestMailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
