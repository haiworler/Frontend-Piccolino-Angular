import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { Headquarter } from '@interfaces/headquarter';
import { MainService } from '@services/app-services/main.service';
import { Router } from '@angular/router';
/**
 * Creados
 */
import { EnrolledService } from '@services/app-services/schools/enrolled.service';
import { EnrolledCreateComponent } from '../enrolled-create/enrolled-create.component';
import { EnrolledUpdateComponent } from '../enrolled-update/enrolled-update.component';
import { PaymentListComponent } from '../../payments/payment-list/payment-list.component';


@Component({
	selector: 'app-enrolled-list',
	templateUrl: './enrolled-list.component.html',
	styles: []
})
export class EnrolledListComponent implements OnInit, OnDestroy {

	heading = 'Listado de matrículas';
	subheading = 'Listado';
	icon = 'fa fa-id-card icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	searchData: any;
	storageSub: any = null;
	progressSearch: boolean | number = false;
	enrolledListForm: FormGroup;
	loadControl: any = 0;

	buttonsOp: any[] = [];
	permissions: any[];
	currentRoute: any;

	enrolled: any;
	enrolleds: any;

	constructor(
		private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _enrolledService: EnrolledService,
		private _mainService: MainService,
		private router: Router
	) { }

	ngOnInit() {
		/**
	 * Indica los permisos que sse van  a utilizar
	 */
		this.permissions = this._mainService.Permissions;
		this.currentRoute = this.router.url;
		for (const permission in this.permissions) {
			if (this.permissions[permission].method != 'delete') {
				this.buttonsOp.push(
					{
						title: this.permissions[permission].title,
						secondTitle: this.permissions[permission].secondTitle,
						icon: this.permissions[permission].icon,
						method: this.permissions[permission].method,
						class: this.permissions[permission].class,
						condition: this.permissions[permission].condition,
						parameter: null,
					}
				);

			}

		}
		this.buttonsOp.push(
			{ name: 'payments', title: 'Pagos', secondTitle: null, icon: 'fa fa-money fa-fw mr-2', method: 'payments', class: 'btn btn-sm btn-pill btn-outline-primary', condition: null, parameter: null, specialCondition: false }
		);

		/**
			 * 
			 */
		this.enrolledListForm = this.formBuilder.group({
			term: ['', []],
			page: [1, []],
			limit: [10, []]
		});

		this.searchData = {
			term: this.term.value,
			page: this.page.value,
			limit: this.limit.value
		};

		this.storageSub = this._storageService.watch().pipe(debounceTime(500)).subscribe((token: any) => {
			if (token) {
				this.searchenrolleds();
			}
		});

		this.ngOnChanges();
	}



	ngOnChanges() {
		this.enrolledListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.enrolledListForm.get('term');
	}

	get page() {
		return this.enrolledListForm.get('page');
	}

	get limit() {
		return this.enrolledListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchenrolleds().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.enrolledListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.enrolleds = [];
		this.search();
	}

	async searchenrolleds() {
		this.enrolleds = [];
		this.loadControl = 0;
		return await this._enrolledService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.enrolleds = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.updateenrolled(parameters.object);
				break;
			case 'activate-deactivate':
				this.updateenrolledState(parameters.object);
				break;
			case 'payments':
				this.paymentsList(parameters.object);
				break;
			default:
				break;
		}
	}

	/**
	   * Abre el modal seteando el componente enrolledCreateComponent
	   */
	createenrolledModal = () => {
		this._modalService.open({
			component: EnrolledCreateComponent,
			title: 'Registro de una nueva matrícula',
			size: 'modal-xl'
		});
	}


	updateenrolled = (enrolled: any) => {
		this._enrolledService.setenrolled(enrolled);
		this._modalService.open({
			component: EnrolledUpdateComponent,
			title: 'Actualización de una matrícula',
			size: 'modal-xl'
		});
	}

	paymentsList = (enrolled: any) => {
		this._enrolledService.setenrolled(enrolled);
		this._modalService.open({
			component: PaymentListComponent,
			title: 'Lista de pagos realizados',
			size: 'modal-xl'
		});
	}


	updateenrolledState = (enrolled: any) => {
		enrolled.enabled = (enrolled.enabled) ? 0 : 1;
		this._enrolledService.update(enrolled.id, enrolled).then((response: any) => {
			this._notificationService.success({
				title: 'Información',
				message: 'La matrícula se ha actualizado correctamente.'
			});
		});
	}

	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}

	

}
