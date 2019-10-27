import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'required-field',
	templateUrl: './required-field.component.html',
	styles: []
})
export class RequiredFieldComponent implements OnInit {

	@Input() control: FormControl;
	@Input() label: string;

	constructor() {}

	ngOnInit() {}

}
