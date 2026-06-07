import { TestBed, waitForAsync } from '@angular/core/testing';
import {SpecialtyService} from './specialty.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';

describe('SpecialtyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialtyService, provideHttpClient(), provideHttpClientTesting()]
    });
  });

  it('should be created', waitForAsync(() => {
    const service = TestBed.inject(SpecialtyService);
    expect(service).toBeTruthy();
  }));
});
