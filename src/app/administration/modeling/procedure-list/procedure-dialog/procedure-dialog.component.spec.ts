import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureDialogComponent } from './procedure-dialog.component';

describe('ProcedureDialogComponent', () => {
  let component: ProcedureDialogComponent;
  let fixture: ComponentFixture<ProcedureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcedureDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcedureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
