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
import { CountryService } from '@services/app-services/configurations/locations/country.service';
import { CountryCreateComponent } from '../country-create/country-create.component';
import { CountryUpdateComponent } from '../country-update/country-update.component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styles: [
  ]
})
export class CountryListComponent implements OnInit,OnDestroy {


  heading = 'Países';
	subheading = 'Listado';
	icon = 'fa fa-map icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	searchData: any;
	storageSub: any = null;
	progressSearch: boolean | number = false;
	cutListForm: FormGroup;
	loadControl: any = 0;

	buttonsOp: any[] = [];
	permissions: any[];
	currentRoute: any;

	countrie: any = [];
	countries: any = [];
  

  constructor(
    private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _countryService: CountryService,
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
		this.cutListForm = this.formBuilder.group({
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
				this.searchcountries();
			}
		});

		this.ngOnChanges();
  }


	ngOnChanges() {
		this.cutListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.cutListForm.get('term');
	}

	get page() {
		return this.cutListForm.get('page');
	}

	get limit() {
		return this.cutListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchcountries().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.cutListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.countries = [];
		this.search();
	}

	async searchcountries() {
		this.countries = [];
		this.loadControl = 0;
		return await this._countryService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.countries = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.updatecut(parameters.object);
				break;
			case 'activate-deactivate':
				this.updatecutState(parameters.object);
				break;
			default:
				break;
		}
	}

	/**
	   * Abre el modal seteando el componente cutCreateComponent
	   */
	createcutModal = () => {
		this._modalService.open({
			component: CountryCreateComponent,
			title: 'Registro de un nuevo país',
			size: 'modal-xl'
		});
	}


	updatecut = (cut: any) => {
		this._countryService.setCountry(cut);
		this._modalService.open({
			component: CountryUpdateComponent,
			title: 'Actualización de un país',
			size: 'modal-xl'
		});
	}

	updatecutState = (country: any) => {
		country.enabled = (country.enabled) ? 0 : 1;
		this._countryService.update(country.id, country).then((response: any) => {
			this._notificationService.success({
				title: 'Información',
				message: 'El país se ha actualizado correctamente.'
			});
		});
	}

	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}


}
