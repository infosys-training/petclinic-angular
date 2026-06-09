/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/**
 * @author Vitaliy Fedoriv
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PetsRoutingModule} from './pets-routing.module';
import {PetListComponent} from './pet-list/pet-list.component';
import {PetService} from './pet.service';
import {VisitsModule} from '../visits/visits.module';
import {PetEditComponent} from './pet-edit/pet-edit.component';
import {FormsModule} from '@angular/forms';
import {PetAddComponent} from './pet-add/pet-add.component';

import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MAT_DATE_FORMATS} from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'yyyy/MM/dd',
  },
  display: {
    dateInput: 'yyyy/MM/dd',
    monthYearLabel: 'MM yyyy',
    dateA11yLabel: 'yyyy/MM/dd',
    monthYearA11yLabel: 'MM yyyy',
  },
};


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatDatepickerModule,
        MatDateFnsModule,
        PetsRoutingModule,
        VisitsModule,
        PetListComponent,
        PetEditComponent,
        PetAddComponent
    ],
    exports: [
        PetListComponent,
        PetEditComponent,
        PetAddComponent
    ],
    providers: [
        PetService,
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
    ]
})
export class PetsModule {
}


