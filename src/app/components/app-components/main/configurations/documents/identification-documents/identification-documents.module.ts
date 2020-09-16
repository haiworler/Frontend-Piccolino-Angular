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
import { IdentificationDocumentsRoutingModule } from './identification-documents-routing.module';
import { IdentificationDocumentListComponent } from './identification-document-list/identification-document-list.component';
import { IdentificationDocumentCreateComponent } from './identification-document-create/identification-document-create.component';
import { IdentificationDocumentUpdateComponent } from './identification-document-update/identification-document-update.component';


@NgModule({
  declarations: [IdentificationDocumentListComponent, IdentificationDocumentCreateComponent, IdentificationDocumentUpdateComponent],
  entryComponents: [IdentificationDocumentCreateComponent, IdentificationDocumentUpdateComponent],
  imports: [
    CommonModule,
    IdentificationDocumentsRoutingModule,
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
export class IdentificationDocumentsModule { }
