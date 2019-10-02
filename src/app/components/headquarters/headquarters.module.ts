import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
//import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { LaddaModule } from 'angular2-ladda';
import { TextMaskModule } from 'angular2-text-mask';
//import { LayoutModule } from '@layout/layout.module';
//import { ModalService } from '@services/shared/modal.service';





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
//import { LayoutModule } from 'src/app/layouts/components/layout.module';
import { ModalService } from '../../services/shared/modal.service';
import { HeadquarterCreateComponent } from './headquarter-create/headquarter-create.component';




@NgModule({
  declarations: [HeadquarterListComponent, HeadquarterCreateComponent],
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
 //   NgBootstrapFormValidationModule,
    LaddaModule,
    TextMaskModule
  ]
  ,
  providers: [ModalService]
})
export class HeadquartersModule { }
