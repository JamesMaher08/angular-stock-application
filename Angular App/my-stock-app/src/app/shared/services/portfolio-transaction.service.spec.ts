import { TestBed } from '@angular/core/testing';

import { PortfolioTransactionService } from './portfolio-transaction.service';

describe('PortfolioTransactionService', () => {
  let service: PortfolioTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
