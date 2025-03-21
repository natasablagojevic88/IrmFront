import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDataDialogComponent } from './create-data-dialog.component';

describe('CreateDataDialogComponent', () => {
  let component: CreateDataDialogComponent;
  let fixture: ComponentFixture<CreateDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDataDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
