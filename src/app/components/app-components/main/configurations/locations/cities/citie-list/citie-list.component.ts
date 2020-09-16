import { Component, OnInit,OnDestroy } from '@angular/core';
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
import { CitieService } from '@services/app-services/configurations/locations/citie.service';
import { CitieCreateComponent } from '../citie-create/citie-create.component';
import { CitieUpdateComponent } from '../citie-update/citie-update.component';


@Component({
  selector: 'app-citie-list',
  templateUrl: './citie-list.component.html',
  styles: [
  ]
})
export class CitieListComponent implements OnInit,OnDestroy {

  heading = 'Ciudades';
	subheading = 'Listado';
	icon = 'fa fa-map-o icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	searchData: any;
	storageSub: any = null;
	progressSearch: boolean | number = false;
	townListForm: FormGroup;
	loadControl: any = 0;

	buttonsOp: any[] = [];
	permissions: any[];
	currentRoute: any;

	town: any = [];
	towns: any = [];

  constructor(
    private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _citieService: CitieService,
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
		this.townListForm = this.formBuilder.group({
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
				this.searchtowns();
			}
		});

		this.ngOnChanges();
  }



	ngOnChanges() {
		this.townListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.townListForm.get('term');
	}

	get page() {
		return this.townListForm.get('page');
	}

	get limit() {
		return this.townListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchtowns().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.townListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.towns = [];
		this.search();
	}

	async searchtowns() {
		this.towns = [];
		this.loadControl = 0;
		return await this._citieService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.towns = response;
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
	   * Abre el modal seteando el componente cutCreateComponent
	   */
	createModal = () => {
		this._modalService.open({
			component: CitieCreateComponent,
			title: 'Registro de una nueva ciudad',
			size: 'modal-xl'
		});
	}


	update = (town: any) => {
		this._citieService.setTown(town);
		this._modalService.open({
			component: CitieUpdateComponent,
			title: 'Actualización de una ciudad',
			size: 'modal-xl'
		});
	}

	updateState = (town: any) => {
		town.enabled = (town.enabled) ? 0 : 1;
		this._citieService.update(town.id, town).then((response: any) => {
			this._notificationService.success({
				title: 'Información',
				message: 'La ciudad se ha actualizado correctamente.'
			});
		});
	}

	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}

}
