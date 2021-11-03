import { TestBed } from '@angular/core/testing';

import { HacerPedidoService } from './hacer-pedido.service';

describe('HacerPedidoService', () => {
  let service: HacerPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HacerPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
