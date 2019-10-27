import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RequiredFieldComponent } from './required-field/required-field.component';

@NgModule({
	declarations: [RequiredFieldComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule
	],
	exports: [RequiredFieldComponent]
})
export class ValidationModule { }
