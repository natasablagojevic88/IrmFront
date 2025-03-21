import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JasperDialogComponent } from './jasper-dialog.component';

describe('JasperDialogComponent', () => {
  let component: JasperDialogComponent;
  let fixture: ComponentFixture<JasperDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JasperDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JasperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
