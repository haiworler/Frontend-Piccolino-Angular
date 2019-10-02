import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDataService } from '../../../services/shared/modal-data.service';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit, OnDestroy {

	@ViewChild('target', { static: true, read: ViewContainerRef }) vcRef: ViewContainerRef;

	componentRef: ComponentRef<any>;
	data: any;
	actions: any;

	constructor(
		private resolver: ComponentFactoryResolver,
		private _modalData: ModalDataService
	) {}

	ngOnInit(): void {

		this.data = this._modalData.getData();
		this.actions = this._modalData.getActions();

		if (this.data.component) {
			const factory = this.resolver.resolveComponentFactory(this.data.component);
			this.componentRef = this.vcRef.createComponent(factory);
		}

	}

	ngOnDestroy(): void {
		if (this.componentRef) {
			this.componentRef.destroy();
		}
	}

}
