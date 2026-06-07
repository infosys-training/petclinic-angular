import { TestBed, waitForAsync } from '@angular/core/testing';
import {PetService} from './pet.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';

describe('PetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PetService, provideHttpClient(), provideHttpClientTesting()]
    });
  });

  it('should be created', waitForAsync(() => {
    const service = TestBed.inject(PetService);
    expect(service).toBeTruthy();
  }));
});
