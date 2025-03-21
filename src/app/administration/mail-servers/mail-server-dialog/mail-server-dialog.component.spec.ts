import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailServerDialogComponent } from './mail-server-dialog.component';

describe('MailServerDialogComponent', () => {
  let component: MailServerDialogComponent;
  let fixture: ComponentFixture<MailServerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MailServerDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailServerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
