import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJasperReportsComponent } from './list-jasper-reports.component';

describe('ListJasperReportsComponent', () => {
  let component: ListJasperReportsComponent;
  let fixture: ComponentFixture<ListJasperReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListJasperReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListJasperReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
