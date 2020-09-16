import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { MainService } from '@services/app-services/main.service';
import { Router } from '@angular/router';
/**
 * Creados
 */
import { LocalitieService } from '@services/app-services/configurations/locations/localitie.service';
import { LocalitieCreateComponent } from '../localitie-create/localitie-create.component';
import { LocalitieUpdateComponent } from '../localitie-update/localitie-update.component';


@Component({
	selector: 'app-localitie-list',
	templateUrl: './localitie-list.component.html',
	styles: [
	]
})
export class LocalitieListComponent implements OnInit, OnDestroy {

	heading = 'Localidad';
	subheading = 'Listado';
	icon = 'fa fa-map-pin icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	searchData: any;
	storageSub: any = null;
	progressSearch: boolean | number = false;
	localitieListForm: FormGroup;
	loadControl: any = 0;

	buttonsOp: any[] = [];
	permissions: any[];
	currentRoute: any;

	localitie: any = [];
	localities: any = [];

	constructor(
		private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _localitieService: LocalitieService,
		private _mainService: MainService,
		private router: Router
	) { }

	ngOnInit(): void {
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

		/**
			 * 
			 */
		this.localitieListForm = this.formBuilder.group({
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
				this.searchlocalities();
			}
		});

		this.ngOnChanges();
	}


	ngOnChanges() {
		this.localitieListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.localitieListForm.get('term');
	}

	get page() {
		return this.localitieListForm.get('page');
	}

	get limit() {
		return this.localitieListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchlocalities().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.localitieListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.localities = [];
		this.search();
	}

	async searchlocalities() {
		this.localities = [];
		this.loadControl = 0;
		return await this._localitieService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.localities = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.update(parameters.object);
				break;
			case 'activate-deactivate':
				this.updateState(parameters.object);
				break;
			default:
				break;
		}
	}

	/**
	   * Abre el modal seteando el componente LocalitieCreateComponent
	   */
	createModal = () => {
		this._modalService.open({
			component: LocalitieCreateComponent,
			title: 'Registro de una nueva localidad',
			size: 'modal-xl'
		});
	}


	update = (localitie: any) => {
		this._localitieService.setlocalitie(localitie);
		this._modalService.open({
			component: LocalitieUpdateComponent,
			title: 'Actualización de una localidad',
			size: 'modal-xl'
		});
	}

	updateState = (localitie: any) => {
		localitie.enabled = (localitie.enabled) ? 0 : 1;
		this._localitieService.update(localitie.id, localitie).then((response: any) => {
			this._notificationService.success({
				title: 'Información',
				message: 'La localidad se ha actualizado correctamente.'
			});
		});
	}

	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}


}
