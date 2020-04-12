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
import { SharedModule } from '../../shared/shared.module';
import { ModalService } from '@services/shared/modal.service';

import { EnrolledRoutingModule } from './enrolled-routing.module';
import { EnrolledListComponent } from './enrolled-list/enrolled-list.component';
import { EnrolledCreateComponent } from './enrolled-create/enrolled-create.component';
import { EnrolledUpdateComponent } from './enrolled-update/enrolled-update.component';
import { NgxCurrencyModule } from "ngx-currency";

export const customCurrencyMaskConfig = {
    align: "right",
    allowNegative: false,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "$ ",
    suffix: "",
    thousands: ".",
    nullable: false
};

@NgModule({
  declarations: [EnrolledListComponent, EnrolledCreateComponent, EnrolledUpdateComponent],
  entryComponents: [EnrolledCreateComponent, EnrolledUpdateComponent],
  imports: [
    CommonModule,
    EnrolledRoutingModule,
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
		NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ],
	providers: [ModalService]
})
export class EnrolledModule { }
