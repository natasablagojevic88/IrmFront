import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesListDialogComponent } from './user-roles-list-dialog.component';

describe('UserRolesListDialogComponent', () => {
  let component: UserRolesListDialogComponent;
  let fixture: ComponentFixture<UserRolesListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRolesListDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRolesListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
