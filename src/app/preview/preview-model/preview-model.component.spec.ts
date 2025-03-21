import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewModelComponent } from './preview-model.component';

describe('PreviewModelComponent', () => {
  let component: PreviewModelComponent;
  let fixture: ComponentFixture<PreviewModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
