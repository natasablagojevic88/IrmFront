import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaClassListComponent } from './java-class-list.component';

describe('JavaClassListComponent', () => {
  let component: JavaClassListComponent;
  let fixture: ComponentFixture<JavaClassListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JavaClassListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JavaClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
