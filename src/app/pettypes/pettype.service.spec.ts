import { TestBed, waitForAsync } from '@angular/core/testing';
import {PetTypeService} from './pettype.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';

describe('PetTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PetTypeService, provideHttpClient(), provideHttpClientTesting()]
    });
  });

  it('should be created', waitForAsync(() => {
    const service = TestBed.inject(PetTypeService);
    expect(service).toBeTruthy();
  }));
});
