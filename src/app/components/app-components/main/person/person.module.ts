import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { NgxLoadingModule } from 'ngx-loading';
import { LaddaModule } from 'angular2-ladda';
import { TextMaskModule } from 'angular2-text-mask';
import { LayoutModule } from '@layout/layout.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from '../shared/shared.module';
import { ModalService } from '@services/shared/modal.service';
// Service datapiker
import { I18n, CustomDatepickerI18n } from '@services/shared/datepicker-i18n.service';

import { PersonRoutingModule } from './person-routing.module';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonCreateComponent } from './person-create/person-create.component';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { PersonUpdateComponent } from './person-update/person-update.component';
const config: InputFileConfig = {};

@NgModule({
  declarations: [PersonListComponent, PersonCreateComponent, PersonUpdateComponent],
  entryComponents: [PersonCreateComponent,PersonUpdateComponent],
  imports: [
    CommonModule,
    PersonRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
    PerfectScrollbarModule,
    NgBootstrapFormValidationModule,
    NgxLoadingModule.forRoot({}),
    LaddaModule,
    SweetAlert2Module,
    TextMaskModule,
    SharedModule,
    LayoutModule,
    InputFileModule.forRoot(config)
  ],
  providers: [ModalService, I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
})
export class PersonModule { }
