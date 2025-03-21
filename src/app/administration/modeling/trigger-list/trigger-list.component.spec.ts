import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerListComponent } from './trigger-list.component';

describe('TriggerListComponent', () => {
  let component: TriggerListComponent;
  let fixture: ComponentFixture<TriggerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TriggerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TriggerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
