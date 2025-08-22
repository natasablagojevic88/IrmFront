import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaClassComponent } from './java-class.component';

describe('JavaClassComponent', () => {
  let component: JavaClassComponent;
  let fixture: ComponentFixture<JavaClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JavaClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JavaClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
