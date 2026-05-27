import { TestBed } from '@angular/core/testing';
import { SpecialtyService } from './specialty.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpErrorHandler } from '../error.service';

describe('SpecialtyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpecialtyService,
        HttpErrorHandler,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(SpecialtyService);
    expect(service).toBeTruthy();
  });
});
