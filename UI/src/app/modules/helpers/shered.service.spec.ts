import { TestBed } from '@angular/core/testing';

import { SheredService } from './shered.service';

describe('SheredService', () => {
  let service: SheredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
