import { TestBed } from '@angular/core/testing';

import { OpenDialogService } from './open-dialog.service';

describe('OpenDialogService', () => {
  let service: OpenDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
