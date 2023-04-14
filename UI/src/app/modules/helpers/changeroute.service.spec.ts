import { TestBed } from '@angular/core/testing';

import { ChangerouteService } from './changeroute.service';

describe('ChangerouteService', () => {
  let service: ChangerouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangerouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
