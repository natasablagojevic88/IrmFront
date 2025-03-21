import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailServersComponent } from './mail-servers.component';

describe('MailServersComponent', () => {
  let component: MailServersComponent;
  let fixture: ComponentFixture<MailServersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MailServersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
