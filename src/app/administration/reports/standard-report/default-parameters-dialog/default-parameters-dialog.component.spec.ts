import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultParametersDialogComponent } from './default-parameters-dialog.component';

describe('DefaultParametersDialogComponent', () => {
  let component: DefaultParametersDialogComponent;
  let fixture: ComponentFixture<DefaultParametersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultParametersDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultParametersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
