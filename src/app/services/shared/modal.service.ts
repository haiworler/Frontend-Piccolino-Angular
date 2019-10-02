import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDataService } from '../../services/shared/modal-data.service';
import { ModalComponent } from '../../components/shared/modal/modal.component';

@Injectable({
	providedIn: 'root'
})
export class ModalService {

	modals: any = [];
	priority: number = 0;
	data: any;

	constructor(
		private _modal: NgbModal,
		private _modalData: ModalDataService
	) {}

	open = (data: any): void => {
		this._modalData.setData(data);
		this._modalData.setActions({
			close: this.close
		});
		this.modals.push(this._modal.open(ModalComponent, {
			backdrop: 'static',
			keyboard: false,
			windowClass: data.size
		}));
		this.priority = (this.modals.length - 1);
	}

	close = (): void => {
		this._modalData.resetData();
		this.modals[this.priority].close();
		this.modals.splice(this.priority);
		this.priority = (this.modals.length - 1);
	}

	reset = (): void => {
		this._modal.dismissAll();
		this._modalData.resetData();
	}

}
