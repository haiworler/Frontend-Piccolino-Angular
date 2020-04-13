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

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupUpdateComponent } from './group-update/group-update.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentAssignComponent } from './student-assign/student-assign.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectAssignComponent } from './subject-assign/subject-assign.component';
import { ScheduleDayListComponent } from './schedule-day-list/schedule-day-list.component';
import { ScheduleHourListComponent } from './schedule-hour-list/schedule-hour-list.component';
import { ScheduleCreateComponent } from './schedule-create/schedule-create.component';
import { ScheduleUpdateComponent } from './schedule-update/schedule-update.component';


@NgModule({
  declarations: [GroupListComponent, GroupCreateComponent, GroupUpdateComponent, StudentListComponent, StudentAssignComponent, SubjectListComponent, SubjectAssignComponent, ScheduleDayListComponent, ScheduleHourListComponent, ScheduleCreateComponent, ScheduleUpdateComponent],
  entryComponents: [GroupCreateComponent, GroupUpdateComponent,StudentListComponent,StudentAssignComponent,SubjectListComponent,SubjectAssignComponent,ScheduleDayListComponent,ScheduleHourListComponent,ScheduleCreateComponent,ScheduleUpdateComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
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
		LayoutModule
  ],
	providers: [ModalService]
})
export class GroupsModule { }
