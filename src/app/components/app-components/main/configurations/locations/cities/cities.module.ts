import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * 
 */
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
import { SharedModule } from '../../../shared/shared.module';
import { ModalService } from '@services/shared/modal.service';
/**
 * 
 */

import { CitiesRoutingModule } from './cities-routing.module';
import { CitieListComponent } from './citie-list/citie-list.component';
import { CitieCreateComponent } from './citie-create/citie-create.component';
import { CitieUpdateComponent } from './citie-update/citie-update.component';


@NgModule({
  declarations: [CitieListComponent, CitieCreateComponent, CitieUpdateComponent],
  entryComponents: [CitieCreateComponent, CitieUpdateComponent],
  imports: [
    CommonModule,
    CitiesRoutingModule,
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
  ],
	providers: [ModalService]
})
export class CitiesModule { }
