import { TestBed } from '@angular/core/testing';
import { PetService } from './pet.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpErrorHandler } from '../error.service';

describe('PetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PetService,
        HttpErrorHandler,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(PetService);
    expect(service).toBeTruthy();
  });
});
