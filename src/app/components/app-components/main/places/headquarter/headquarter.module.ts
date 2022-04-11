import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule,NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
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
import { HeadquarterRoutingModule } from './headquarter-routing.module';
import { HeadquarterListComponent } from './headquarter-list/headquarter-list.component';
import { HeadquarterCreateComponent } from './headquarter-create/headquarter-create.component';
// Service datapiker
import { I18n, CustomDatepickerI18n } from '@services/shared/datepicker-i18n.service';
import { HeadquarterUpdateComponent } from './headquarter-update/headquarter-update.component';
import { HeadquarterListExpensesComponent } from './headquarter-list-expenses/headquarter-list-expenses.component';
import { HeadquarterCreateExpensesComponent } from './headquarter-create-expenses/headquarter-create-expenses.component';
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
	declarations: [HeadquarterListComponent, HeadquarterCreateComponent, HeadquarterUpdateComponent, HeadquarterListExpensesComponent, HeadquarterCreateExpensesComponent],
	entryComponents: [HeadquarterCreateComponent,HeadquarterUpdateComponent,HeadquarterListExpensesComponent,HeadquarterCreateExpensesComponent],
	imports: [
		CommonModule,
		HeadquarterRoutingModule,
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
	providers: [ModalService,I18n,
		{provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class HeadquarterModule { }
