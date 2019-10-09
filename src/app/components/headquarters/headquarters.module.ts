import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LaddaModule } from 'angular2-ladda';
import { TextMaskModule } from 'angular2-text-mask';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { DEFAULT_PERFECT_SCROLLBAR_CONFIG } from 'src/app/constants/perfectScrollbar';
import { ComponentsModalModule } from '../shared/modal/components-modal.module';
import { FormModalsModule } from '../shared/modal/form-modals.module';
import { HeadquartersRoutingModule } from './headquarters-routing.module';
import { HeadquarterListComponent } from './headquarter-list/headquarter-list.component';
import { SharedModule } from '../shared/shared.module';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import { ModalService } from '../../services/shared/modal.service';
import { HeadquarterCreateComponent } from './headquarter-create/headquarter-create.component';




@NgModule({
  declarations: [HeadquarterListComponent],
  entryComponents: [HeadquarterCreateComponent],
  imports: [
    CommonModule,
    HeadquartersRoutingModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
    PerfectScrollbarModule,
    LaddaModule,
    TextMaskModule,
    ComponentsModalModule,
    FormModalsModule
  ]
  ,
  providers: [
    {
      provide:
        PERFECT_SCROLLBAR_CONFIG,
      useValue:
        DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ]
})
export class HeadquartersModule { }
