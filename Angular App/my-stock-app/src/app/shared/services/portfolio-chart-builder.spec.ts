import { TestBed } from '@angular/core/testing';

import { PortfolioChartBuilder } from './portfolio-chart-builder';

describe('PortfolioChartService', () => {
  let service: PortfolioChartBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioChartBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
