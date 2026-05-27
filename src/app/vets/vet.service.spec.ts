import { TestBed } from '@angular/core/testing';
import { VetService } from './vet.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpErrorHandler } from '../error.service';

describe('VetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VetService,
        HttpErrorHandler,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(VetService);
    expect(service).toBeTruthy();
  });
});
