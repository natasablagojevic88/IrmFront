import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureListComponent } from './procedure-list.component';

describe('ProcedureListComponent', () => {
  let component: ProcedureListComponent;
  let fixture: ComponentFixture<ProcedureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcedureListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcedureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
