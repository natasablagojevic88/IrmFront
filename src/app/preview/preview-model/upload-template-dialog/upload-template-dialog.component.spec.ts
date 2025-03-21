import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTemplateDialogComponent } from './upload-template-dialog.component';

describe('UploadTemplateDialogComponent', () => {
  let component: UploadTemplateDialogComponent;
  let fixture: ComponentFixture<UploadTemplateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadTemplateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadTemplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
