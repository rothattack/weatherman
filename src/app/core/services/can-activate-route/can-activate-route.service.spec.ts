import { TestBed } from '@angular/core/testing';

import { CanActivateRouteService } from './can-activate-route.service';

describe('CanActivateRouteService', () => {
  let service: CanActivateRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
