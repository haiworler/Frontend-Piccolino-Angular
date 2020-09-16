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
import { OccupationsRoutingModule } from './occupations-routing.module';
import { OccupationListComponent } from './occupation-list/occupation-list.component';
import { OccupationCreateComponent } from './occupation-create/occupation-create.component';
import { OccupationUpdateComponent } from './occupation-update/occupation-update.component';


@NgModule({
  declarations: [OccupationListComponent, OccupationCreateComponent, OccupationUpdateComponent],
  entryComponents: [OccupationCreateComponent, OccupationUpdateComponent],
  imports: [
    CommonModule,
    OccupationsRoutingModule,
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
export class OccupationsModule { }
