import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUsersDialogComponent } from './app-users-dialog.component';

describe('AppUsersDialogComponent', () => {
  let component: AppUsersDialogComponent;
  let fixture: ComponentFixture<AppUsersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppUsersDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
