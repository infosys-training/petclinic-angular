import { TestBed } from '@angular/core/testing';
import { VisitService } from './visit.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpErrorHandler } from '../error.service';

describe('VisitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VisitService,
        HttpErrorHandler,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(VisitService);
    expect(service).toBeTruthy();
  });
});
