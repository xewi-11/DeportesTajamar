import { TestBed } from '@angular/core/testing';

import { CapitanesService } from './capitanes-service';

describe('CapitanesService', () => {
  let service: CapitanesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapitanesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
