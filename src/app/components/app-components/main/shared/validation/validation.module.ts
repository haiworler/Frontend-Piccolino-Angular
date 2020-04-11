import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RequiredFieldComponent } from './required-field/required-field.component';
import { CardValidationComponent } from './card-validation/card-validation.component';
import { TabValidationComponent } from './tab-validation/tab-validation.component';

@NgModule({
	declarations: [RequiredFieldComponent,CardValidationComponent,TabValidationComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule
	],
	exports: [RequiredFieldComponent,CardValidationComponent,TabValidationComponent]
})
export class ValidationModule { }
