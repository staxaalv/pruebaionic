import { TestBed } from '@angular/core/testing';

import { EnviarFacturaService } from './enviar-factura.service';

describe('EnviarFacturaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnviarFacturaService = TestBed.get(EnviarFacturaService);
    expect(service).toBeTruthy();
  });
});
