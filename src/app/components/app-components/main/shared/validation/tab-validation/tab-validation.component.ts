import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'tab-validation',
	templateUrl: './tab-validation.component.html',
	styles: []
})
export class TabValidationComponent implements OnInit {

	@Input() control: FormGroup;
	@Input() title: string;

	constructor() {}

	ngOnInit() {}

}
