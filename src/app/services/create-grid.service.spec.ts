import { TestBed } from '@angular/core/testing';

import { CreateGridService } from './create-grid.service';

describe('CreateGridService', () => {
  let service: CreateGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
