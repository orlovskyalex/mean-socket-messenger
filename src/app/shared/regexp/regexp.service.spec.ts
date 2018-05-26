import { TestBed, inject } from '@angular/core/testing';

import { RegexpService } from './regexp.service';

describe('RegexpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegexpService]
    });
  });

  it('should be created', inject([RegexpService], (service: RegexpService) => {
    expect(service).toBeTruthy();
  }));
});
