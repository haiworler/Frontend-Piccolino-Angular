import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ModalDataService {

	data: any;
	actions: any;

	constructor() { }

	getData = (): any => this.data;
	setData = (data: any): void => this.data = data;

	getActions = (): any => this.actions;
	setActions = (actions: any): void => this.actions = actions;

	resetData = (): void => {
		this.setData(null);
		this.setActions(null);
	}

}
