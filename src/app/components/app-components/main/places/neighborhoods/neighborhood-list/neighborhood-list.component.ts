import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { MainService } from '@services/app-services/main.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
/**
 * 
 */
import { NeighborhoodService } from '@services/app-services/places/neighborhood.service';
import { NeighborhoodCreateComponent } from '../neighborhood-create/neighborhood-create.component';
import { NeighborhoodUpdateComponent } from '../neighborhood-update/neighborhood-update.component';

@Component({
	selector: 'app-neighborhood-list',
	templateUrl: './neighborhood-list.component.html',
	styles: []
})
export class NeighborhoodListComponent implements OnInit,OnDestroy {

	heading = 'Listado de barrios';
	subheading = 'Listado';
	icon = 'fa fa-map-marker icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	searchData: any;
	storageSub: any = null;
	progressSearch: boolean | number = false;
	neighborhoodsListForm: FormGroup;
	loadControl: any = 0;

	buttonsOp: any[] = [];
	permissions: any[];
	currentRoute: any;

	neighborhood: any;
	neighborhoods: any;

	constructor(
		private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _neighborhoodService: NeighborhoodService,
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
		/**
		 * 
		 */
		this.neighborhoodsListForm = this.formBuilder.group({
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
				this.searchneighborhoods();
			}
		});

		this.ngOnChanges();

	}

	ngOnChanges() {
		this.neighborhoodsListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.neighborhoodsListForm.get('term');
	}

	get page() {
		return this.neighborhoodsListForm.get('page');
	}

	get limit() {
		return this.neighborhoodsListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchneighborhoods().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.neighborhoodsListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.neighborhoods = [];
	}

	async searchneighborhoods() {
		this.neighborhoods = [];
		this.loadControl = 0;
		return await this._neighborhoodService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.neighborhoods = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.updateNeighborhood(parameters.object);
				break;
				case 'activate-deactivate':
				this.updateNeighborhoodState(parameters.object);
				break;
			default:
				break;
		}
	}

	/**
	   * Abre el modal seteando el componente neighborhoodCreateComponent
	   */
	createneighborhoodModal = () => {
		this._modalService.open({
			component: NeighborhoodCreateComponent,
			title: 'Registro de un nuevo barrio',
			size: 'modal-xl'
		});
	}


	updateNeighborhood = (neighborhood: any) => {
		 this._neighborhoodService.setneighborhood(neighborhood);
		  this._modalService.open({
		  	component: NeighborhoodUpdateComponent,
		  	title: 'Actualización de un barrio',
		  	size: 'modal-xl'
		  });
	}

	updateNeighborhoodState = (neighborhood: any) => {
		neighborhood.enabled = (neighborhood.enabled) ? 0 : 1;
		 this._neighborhoodService.update(neighborhood.id, neighborhood).then((response: any) => {
		 	this._notificationService.success({
		 		title: 'Información',
		 		message: 'El barrio se ha actualizado correctamente.'
		 	});
		 });

	}



	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}



}
