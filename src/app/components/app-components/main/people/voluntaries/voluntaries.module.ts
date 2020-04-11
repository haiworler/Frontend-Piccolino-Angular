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

import { VoluntariesRoutingModule } from './voluntaries-routing.module';
import { VoluntaryListComponent } from './voluntary-list/voluntary-list.component';
import { VoluntaryCreateComponent } from './voluntary-create/voluntary-create.component';
import { VoluntaryUpdateComponent } from './voluntary-update/voluntary-update.component';
/**
 * 
 */
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

@NgModule({
  declarations: [VoluntaryListComponent, VoluntaryCreateComponent, VoluntaryUpdateComponent],
  entryComponents: [VoluntaryCreateComponent, VoluntaryUpdateComponent],
  imports: [
    CommonModule,
    VoluntariesRoutingModule,
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
export class VoluntariesModule { }
