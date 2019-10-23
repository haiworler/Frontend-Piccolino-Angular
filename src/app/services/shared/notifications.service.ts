import { cloneDeep } from 'lodash-es';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})
export class NotificationsService {

	types: any = {
		success: 'success',
		error: 'error',
		info: 'info',
		warning: 'warning'
	};

	toastrOptions: any;
	lastInserted: number[] = [];

	constructor(
		private _toastr: ToastrService
	) {
		this.toastrOptions = this._toastr.toastrConfig;
		this.toastrOptions.timeOut = 4000;
		this.toastrOptions.positionClass = 'toast-top-center';
		this.toastrOptions.progressBar = true;
		this.toastrOptions.progressAnimation = 'increasing';
	}

	info = (data: any): any => this.showNotification(data, this.types.info);
	success = (data: any): any => this.showNotification(data, this.types.success);
	warning = (data: any): any => this.showNotification(data, this.types.warning);
	error = (data: any): any => this.showNotification(data, this.types.error);

	showNotification = (data: any, type: string): any => {
		const { title, message } = data;
		const opt = cloneDeep(this.toastrOptions);
		const inserted = this._toastr.show(message, title, opt, this.toastrOptions.iconClasses[type]);
		if (inserted) {
			this.lastInserted.push(inserted.toastId);
		}
		return inserted;
	}

}
