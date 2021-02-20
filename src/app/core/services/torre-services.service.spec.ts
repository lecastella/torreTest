import { TestBed } from '@angular/core/testing';

import { TorreServicesService } from './torre-services.service';

describe('TorreServicesService', () => {
  let service: TorreServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TorreServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
