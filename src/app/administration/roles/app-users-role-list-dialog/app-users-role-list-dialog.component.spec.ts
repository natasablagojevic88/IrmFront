import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUsersRoleListDialogComponent } from './app-users-role-list-dialog.component';

describe('AppUsersRoleListDialogComponent', () => {
  let component: AppUsersRoleListDialogComponent;
  let fixture: ComponentFixture<AppUsersRoleListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppUsersRoleListDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppUsersRoleListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
