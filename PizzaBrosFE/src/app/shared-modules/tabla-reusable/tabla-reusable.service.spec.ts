import { TestBed } from '@angular/core/testing';

import { TablaReusableService } from './tabla-reusable.service';

describe('TablaReusableService', () => {
  let service: TablaReusableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablaReusableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
