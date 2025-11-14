import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelJavaClassDialogComponent } from './model-java-class-dialog.component';

describe('ModelJavaClassDialogComponent', () => {
  let component: ModelJavaClassDialogComponent;
  let fixture: ComponentFixture<ModelJavaClassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelJavaClassDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelJavaClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
