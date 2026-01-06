import { TestBed } from '@angular/core/testing';

import { MapfileStateServiceService } from './mapfile-state-service.service';

describe('MapfileStateServiceService', () => {
  let service: MapfileStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapfileStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
