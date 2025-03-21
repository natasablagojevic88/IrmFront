import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassowrdDialogComponent } from './change-passowrd-dialog.component';

describe('ChangePassowrdDialogComponent', () => {
  let component: ChangePassowrdDialogComponent;
  let fixture: ComponentFixture<ChangePassowrdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePassowrdDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangePassowrdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
