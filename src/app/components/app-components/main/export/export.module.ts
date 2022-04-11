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
import { SharedModule } from '../shared/shared.module';
import { ModalService } from '@services/shared/modal.service';

import { ExportRoutingModule } from './export-routing.module';
import { StudentsComponent } from './students/students.component';

/**
 * Para la función del activo o inactivo
 */
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

/**
 * para el excel
 */
import { DatePipe } from './../../../../../../node_modules/@angular/common';
import { GroupComponent } from './group/group.component';
import { IncomeCostsAndExpensesComponent } from './income-costs-and-expenses/income-costs-and-expenses.component';
import { ReportingOptionsComponent } from './reporting-options/reporting-options.component';
import { LicensePlateNumberReportComponent } from './license-plate-number-report/license-plate-number-report.component';

@NgModule({
  declarations: [StudentsComponent, GroupComponent, IncomeCostsAndExpensesComponent, ReportingOptionsComponent, LicensePlateNumberReportComponent],
  imports: [
    CommonModule,
    ExportRoutingModule,
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
		JwBootstrapSwitchNg2Module
  ],
	providers: [DatePipe,ModalService]
})
export class ExportModule { }
