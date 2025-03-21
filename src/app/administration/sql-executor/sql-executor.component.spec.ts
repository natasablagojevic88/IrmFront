import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlExecutorComponent } from './sql-executor.component';

describe('SqlExecutorComponent', () => {
  let component: SqlExecutorComponent;
  let fixture: ComponentFixture<SqlExecutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SqlExecutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SqlExecutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
