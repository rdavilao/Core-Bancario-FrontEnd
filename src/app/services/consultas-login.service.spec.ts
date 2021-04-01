import { TestBed } from '@angular/core/testing';

import { ConsultasLoginService } from './consultas-login.service';

describe('ConsultasLoginService', () => {
  let service: ConsultasLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultasLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
