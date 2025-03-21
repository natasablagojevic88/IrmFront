import { TestBed } from '@angular/core/testing';

import { PreviewInfoCodebookService } from './preview-info-codebook.service';

describe('PreviewInfoCodebookService', () => {
  let service: PreviewInfoCodebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviewInfoCodebookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
