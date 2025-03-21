import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRightComponent } from './no-right.component';

describe('NoRightComponent', () => {
  let component: NoRightComponent;
  let fixture: ComponentFixture<NoRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoRightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
