import { TestBed } from '@angular/core/testing';

import { FilaService } from './fila.service';

describe('FilaService', () => {
  let service: FilaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
