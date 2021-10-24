import { TestBed } from '@angular/core/testing';

import { DoOrderService } from './do-order.service';

describe('DoOrderService', () => {
  let service: DoOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
