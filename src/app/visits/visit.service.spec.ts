import { TestBed, waitForAsync } from '@angular/core/testing';
import {VisitService} from './visit.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';

describe('VisitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisitService, provideHttpClient(), provideHttpClientTesting()]
    });
  });

  it('should be created', waitForAsync(() => {
    const service = TestBed.inject(VisitService);
    expect(service).toBeTruthy();
  }));
});
