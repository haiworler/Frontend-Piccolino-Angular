import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'card-validation',
	templateUrl: './card-validation.component.html',
	styles: []
})
export class CardValidationComponent implements OnInit {

	@Input() control: FormGroup;

	constructor() {}

	ngOnInit() {}

}
