// import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
// import { ModalDataService } from '../../../services/shared/modal-data.service';

// @Component({
// 	selector: 'app-modal',
// 	templateUrl: './modal.component.html',
// 	styleUrls: ['./modal.component.scss']
// })
// export class ModalComponent implements OnInit, OnDestroy {

// 	@ViewChild('target', { static: true, read: ViewContainerRef }) vcRef: ViewContainerRef;

// 	componentRef: ComponentRef<any>;
// 	data: any;
// 	actions: any;

// 	constructor(
// 		private resolver: ComponentFactoryResolver,
// 		private _modalData: ModalDataService
// 	) {}

// 	ngOnInit(): void {

// 		this.data = this._modalData.getData();
// 		this.actions = this._modalData.getActions();

// 		if (this.data.component) {
// 			const factory = this.resolver.resolveComponentFactory(this.data.component);
// 			this.componentRef = this.vcRef.createComponent(factory);
// 		}

// 	}

// 	ngOnDestroy(): void {
// 		if (this.componentRef) {
// 			this.componentRef.destroy();
// 		}
// 	}

// }


import { Component, OnInit, Inject, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  @ViewChild('templateWrapper', { read: ViewContainerRef, static: true }) viewContaninerRef: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  private component: any;
  public hasButtonCancel: Boolean;
  public hasButtonConfirm: Boolean;
  public hasFooter: Boolean;
  public title: String;

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private resolver: ComponentFactoryResolver
  ) {
    this.component = data.component;
    this.hasButtonCancel = data.hasButtonCancel;
    this.hasButtonConfirm = data.hasButtonConfirm;
    this.hasFooter = data.hasFooter;
    this.title = data.title;
  }

  ngOnInit() {
    if (typeof this.component == 'function') {
      const factory = this.resolver.resolveComponentFactory(this.component);
      this.componentRef = this.viewContaninerRef.createComponent(factory);
    } else {
      console.warn('No se ha proveido un componente valido para mostrar');
    }
  }

  /**
   * Tiene como objetivo cerrar el popup
   * @author Heiner Alejandro Gómez
   * @param void
   * @returns void
   */
  public handleTapCloseButton(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
