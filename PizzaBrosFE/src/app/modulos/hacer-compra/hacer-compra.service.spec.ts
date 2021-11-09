import { TestBed } from '@angular/core/testing';

import { HacerCompraService } from './hacer-compra.service';

describe('HacerCompraService', () => {
  let service: HacerCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HacerCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
