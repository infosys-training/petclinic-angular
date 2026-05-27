import { TestBed } from '@angular/core/testing';
import { PetTypeService } from './pettype.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpErrorHandler } from '../error.service';

describe('PetTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PetTypeService,
        HttpErrorHandler,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(PetTypeService);
    expect(service).toBeTruthy();
  });
});
