import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaClassDialogComponent } from './java-class-dialog.component';

describe('JavaClassDialogComponent', () => {
  let component: JavaClassDialogComponent;
  let fixture: ComponentFixture<JavaClassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JavaClassDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JavaClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
