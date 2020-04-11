import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 * 
 */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { NgxLoadingModule } from 'ngx-loading';
import { LaddaModule } from 'angular2-ladda';
import { TextMaskModule } from 'angular2-text-mask';
import { LayoutModule } from '@layout/layout.module';
import { ModalService } from '@services/shared/modal.service';
import { SharedModule } from '../../shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
/**
 * 
 */
import { StudentsRoutingModule } from './students-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentUpdateComponent } from './student-update/student-update.component';
/**
 * 
 */
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

@NgModule({
  declarations: [StudentListComponent, StudentCreateComponent, StudentUpdateComponent],
  entryComponents: [StudentCreateComponent, StudentUpdateComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
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
  providers: [ModalService]

})
export class StudentsModule { }
