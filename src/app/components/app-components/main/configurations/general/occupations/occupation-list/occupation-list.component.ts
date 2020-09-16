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
import { OccupationsService } from '@services/app-services/configurations/general/occupations.service';
import { OccupationCreateComponent } from '../occupation-create/occupation-create.component';
import { OccupationUpdateComponent } from '../occupation-update/occupation-update.component';
@Component({
  selector: 'app-occupation-list',
  templateUrl: './occupation-list.component.html',
  styles: [
  ]
})
export class OccupationListComponent implements OnInit,OnDestroy {

  heading = 'Ocupaciones';
	subheading = 'Listado';
	icon = 'fa fa-grav icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	searchData: any;
	storageSub: any = null;
	progressSearch: boolean | number = false;
	occupationListForm: FormGroup;
	loadControl: any = 0;

	buttonsOp: any[] = [];
	permissions: any[];
	currentRoute: any;

	occupation: any;
  occupations: any;

  constructor(
    private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _occupationsService: OccupationsService,
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
		this.occupationListForm = this.formBuilder.group({
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
				this.searchoccupations();
			}
		});

		this.ngOnChanges();
  }


	ngOnChanges() {
		this.occupationListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.occupationListForm.get('term');
	}

	get page() {
		return this.occupationListForm.get('page');
	}

	get limit() {
		return this.occupationListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchoccupations().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.occupationListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.occupations = [];
		this.search();
	}

	async searchoccupations() {
		this.occupations = [];
		this.loadControl = 0;
		return await this._occupationsService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.occupations = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.updateoccupation(parameters.object);
				break;
			case 'activate-deactivate':
				this.updateoccupationState(parameters.object);
				break;
			default:
				break;
		}
	}

	/**
	   * Abre el modal seteando el componente IdentificationDocumentCreateComponent
	   */
	createoccupationModal = () => {
		this._modalService.open({
			component: OccupationCreateComponent,
			title: 'Registro de una nueva ocupación',
			size: 'modal-xl'
		});
	}


	updateoccupation = (occupation: any) => {
		this._occupationsService.setoccupation(occupation);
		this._modalService.open({
			component: OccupationUpdateComponent,
			title: 'Actualización de una ocupación',
			size: 'modal-xl'
		});
	}

	updateoccupationState = (occupation: any) => {
		occupation.enabled = (occupation.enabled) ? 0 : 1;
		this._occupationsService.update(occupation.id, occupation).then((response: any) => {
			this._notificationService.success({
				title: 'Información',
				message: 'La ocupación se ha actualizado correctamente.'
			});
		});
	}

	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}

}
