import { TestBed } from '@angular/core/testing';

import { EnviarObjetoService } from './enviar-objeto.service';

describe('EnviarObjetoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnviarObjetoService = TestBed.get(EnviarObjetoService);
    expect(service).toBeTruthy();
  });
});
