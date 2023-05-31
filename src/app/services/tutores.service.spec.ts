import { TestBed } from '@angular/core/testing';

import { TutoresService } from './tutores.service';

describe('TutoresService', () => {
  let service: TutoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
