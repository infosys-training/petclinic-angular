import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OwnerEditComponent } from './owner-edit.component';
import { FormsModule } from '@angular/forms';
import { OwnerService } from '../owner.service';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from '../../testing/router-stubs';
import { Owner } from '../owner';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { OwnerListComponent } from '../owner-list/owner-list.component';

class OwnserServiceStub {
  getOwnerById(): Observable<Owner> {
    return of({ id: 1, firstName: 'James' } as Owner);
  }
}

describe('OwnerEditComponent', () => {
  let component: OwnerEditComponent;
  let fixture: ComponentFixture<OwnerEditComponent>;
  let router: Router;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OwnerEditComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [FormsModule],
        providers: [
          provideRouter([{ path: 'owners', component: OwnerListComponent }]),
          { provide: OwnerService, useClass: OwnserServiceStub },
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should create OwnerEditComponent', () => {
    expect(component).toBeTruthy();
  });

  it('back button routing', waitForAsync(() => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const backbutton = buttons[0];
    backbutton.triggerEventHandler('click', null);
    spyOn(component, 'gotoOwnerDetail').and.callThrough();
    expect(router.navigate).toHaveBeenCalledWith(['/owners', 1]);
  }));

  it('update owner', waitForAsync(() => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const updateOwnerButton = buttons[1].nativeElement;
    spyOn(component, 'onSubmit');
    updateOwnerButton.click();
    expect(component.onSubmit).toHaveBeenCalled();
  }));

});
