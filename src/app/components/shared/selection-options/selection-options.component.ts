import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-selection-options',
	templateUrl: './selection-options.component.html',
	styles: []
})
export class SelectionOptionsComponent implements OnInit {

	@Input() iconOp = '';
	@Input() buttonsOp: any = [{
		title: null,
		secondTitle: null,
		icon: null,
		method: null,
		class: null,
		parameter: null,
		condition: false,
	}];


	@Input() buttonSp: any = {
		title: null,
		icon: null,
		method: null,
		parameter: null
	};

	@Input() id: number = null;
	@Input() method: string = null;
	@Output() select: EventEmitter<any>;
	@Input() object: any = null;
	@Input() condition: string;

	constructor() {
		this.select = new EventEmitter();
	}

	ngOnInit() {
		if (this.buttonsOp.length === 0) {
			this.buttonsOp = [
				{
					title: 'No cuenta con los permisos necesarios',
					icon: 'fa fa-exclamation-circle mr-2',
					class: 'btn btn-sm btn-pill btn-outline-secondary',
				}
			];
		}
	}

	/**
   * Es el encargado de emitir el evento al componente que lo invoque
   */
	selectionOptions(parameters: any = null) {
		this.select.emit({ id: this.id, method: this.method, parameters: parameters, object: this.object });
	}
}
