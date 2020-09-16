import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationModule } from './validation/validation.module';

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

/**
 * 
 */
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { I18n, CustomDatepickerI18n } from '@services/shared/datepicker-i18n.service';
/**
 * 
 */

import { SelectionOptionsComponent } from '@components/shared/selection-options/selection-options.component';
import { FormPeopleGeneralComponent } from './forms/form-people-general/form-people-general.component';
import { GeneralSelectionRecordsComponent } from './selects/general-selection-records/general-selection-records.component';
/**
 * Imagen
 */
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
const config: InputFileConfig = {};

@NgModule({
	declarations: [SelectionOptionsComponent, FormPeopleGeneralComponent,GeneralSelectionRecordsComponent],
	entryComponents: [GeneralSelectionRecordsComponent],
	imports: [
		CommonModule,
		ValidationModule,
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
		TextMaskModule,
		SweetAlert2Module,
		JwBootstrapSwitchNg2Module,
		InputFileModule.forRoot(config)
	],
	exports: [
		ValidationModule,
		SelectionOptionsComponent,
		FormPeopleGeneralComponent,
		GeneralSelectionRecordsComponent
	],
	providers: [I18n,{provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}],

})
export class SharedModule {}
