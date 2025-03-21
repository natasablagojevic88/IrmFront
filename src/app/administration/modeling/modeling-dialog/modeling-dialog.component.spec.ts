import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelingDialogComponent } from './modeling-dialog.component';

describe('ModelingDialogComponent', () => {
  let component: ModelingDialogComponent;
  let fixture: ComponentFixture<ModelingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
