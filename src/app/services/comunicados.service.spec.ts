import { TestBed } from '@angular/core/testing';

import { ComunicadosService } from './comunicados.service';

describe('ComunicadosService', () => {
  let service: ComunicadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
