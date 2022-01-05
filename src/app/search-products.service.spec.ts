import { TestBed } from '@angular/core/testing';

import { SearchProductsService } from './search-products.service';

describe('SearchProductsService', () => {
  let service: SearchProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
