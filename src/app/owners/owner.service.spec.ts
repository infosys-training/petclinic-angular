import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  HttpResponse,
  provideHttpClient,
} from '@angular/common/http';

import { HttpErrorHandler } from '../error.service';

import { OwnerService } from './owner.service';
import { Owner } from './owner';

describe('OwnerService', () => {
  let httpTestingController: HttpTestingController;
  let ownerService: OwnerService;
  let expectedOwners: Owner[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnerService, HttpErrorHandler, provideHttpClient(), provideHttpClientTesting()],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    ownerService = TestBed.inject(OwnerService);
    expectedOwners = [
      { id: 1, firstName: 'A' },
      { id: 2, firstName: 'B' },
    ] as Owner[];
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return expected owners (called once)', () => {
    ownerService
      .getOwners()
      .subscribe(
        (owners) =>
          expect(owners).toEqual(expectedOwners)
      );

    const req = httpTestingController.expectOne(ownerService.entityUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedOwners);
  });

  it('search the owner by id', () => {
    ownerService.getOwnerById(1).subscribe((owners) => {
      expect(owners).toEqual(expectedOwners[0]);
    });
    const id = '1';
    const req = httpTestingController.expectOne(
      ownerService.entityUrl + '/' + id
    );
    expect(req.request.method).toEqual('GET');
    req.flush(expectedOwners[0]);
  });

  it('add owner', () => {
    const owner = {
      id: 0,
      firstName: 'Mary',
      lastName: 'John',
      address: '110 W. Church St.',
      city: 'Madison',
      telephone: '6085551023',
      pets: []
    };

    ownerService
      .addOwner(owner)
      .subscribe(
        (data) => expect(data).toEqual(owner)
      );

    const req = httpTestingController.expectOne(ownerService.entityUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(owner);

    const expectedResponse = new HttpResponse({
      status: 201,
      statusText: 'Created',
      body: owner,
    });
    req.event(expectedResponse);
  });

  it('updateOwner', () => {
    const owner = {
      id: 1,
      firstName: 'George',
      lastName: 'Franklin',
      address: '110 W. Church St.',
      city: 'Madison',
      telephone: '6085551023',
      pets: []
    };

    ownerService
      .updateOwner(owner.id.toString(), owner)
      .subscribe((data) => expect(data).toEqual(owner));

    const req = httpTestingController.expectOne(ownerService.entityUrl + '/' + owner.id);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(owner);
    const expectedResponse = new HttpResponse({
      status: 204,
      statusText: 'No Content',
      body: owner,
    });
    req.event(expectedResponse);
  });

  it('delete Owner', () => {
    ownerService.deleteOwner('1').subscribe();
    const req = httpTestingController.expectOne(ownerService.entityUrl + '/1');
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toEqual(null);
  });

  it('search for delete Owner', () => {
    ownerService.getOwnerById(1).subscribe({
      next: () => fail('Should have failed with 404 error'),
      error: (error: string) => {
        expect(error).toContain('404');
      }
    });

    const req = httpTestingController.expectOne(
      { method: 'GET', url: ownerService.entityUrl + '/1' });
    req.flush('404 error', { status: 404, statusText: 'Not Found' });
  });
});
