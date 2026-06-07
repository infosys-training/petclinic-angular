import { TestBed, waitForAsync } from '@angular/core/testing';
import {VetService} from './vet.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';

describe('VetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VetService, provideHttpClient(), provideHttpClientTesting()]
    });
  });

  it('should be created', waitForAsync(() => {
    const service = TestBed.inject(VetService);
    expect(service).toBeTruthy();
  }));
});
