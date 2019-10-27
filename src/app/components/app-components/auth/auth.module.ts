import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import {
	MatButtonModule,
	MatInputModule,
	MatRippleModule,
	MatFormFieldModule,
	MatTooltipModule,
	MatSelectModule
  } from '@angular/material';

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		LaddaModule,
		NgBootstrapFormValidationModule,
		AuthRoutingModule,
		MatButtonModule,
		MatInputModule,
		MatRippleModule,
		MatFormFieldModule,
		MatTooltipModule,
		MatSelectModule
	]
})
export class AuthModule {}
