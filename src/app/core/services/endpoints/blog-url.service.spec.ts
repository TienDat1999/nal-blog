import { TestBed } from '@angular/core/testing';

import { BlogUrlService } from './blog-url.service';

describe('BlogUrlService', () => {
  let service: BlogUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
