import { TestBed } from '@angular/core/testing';

import { GetAllSymbolNamesService } from './get-all-symbol-names.service';

describe('GetAllSymbolNamesService', () => {
  let service: GetAllSymbolNamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllSymbolNamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
