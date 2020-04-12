
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { HeadquarterService } from '@services/app-services/headquarter.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { MainService } from '@services/app-services/main.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { HeadquarterUpdateComponent } from './../headquarter-update/headquarter-update.component';
import { HeadquarterCreateComponent } from './../headquarter-create/headquarter-create.component';

@Component({
	selector: 'app-headquarter-list',
	templateUrl: './headquarter-list.component.html',
	styles: []
})
export class HeadquarterListComponent implements OnInit, OnChanges,OnDestroy {

	heading = 'Sedes';
	subheading = 'Listado';
	icon = 'fa fa-cogs icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	storageSub: any = null;
	headquarter: any;
	searchData: any;
	progressSearch: boolean | number = false;
	headquarterListForm: FormGroup;
	loadControl: any = 0;
	buttonsOp: any[] = [];
	userData: any;
	permissions: any[];
	currentRoute: any;
	headquarters: any;


	constructor(
		private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _headquarterService: HeadquarterService,
		private _mainService: MainService,
		private router: Router
	) { }

	ngOnInit() {
		this.userData = this._mainService.getUserData();
		this.permissions = this._mainService.Permissions;
		this.currentRoute = this.router.url;
		for (const permission in this.permissions) {
			if ( this.permissions[permission].method != 'delete') {
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

		this.headquarterListForm = this.formBuilder.group({
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
				this.searchHeadquarters();
			}
		});

		this.ngOnChanges();
	}


	ngOnChanges() {
		this.headquarterListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.headquarterListForm.get('term');
	}

	get page() {
		return this.headquarterListForm.get('page');
	}

	get limit() {
		return this.headquarterListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchHeadquarters().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.headquarterListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.headquarters = [];
	}

	async searchHeadquarters() {
		this.headquarters = [];
		this.loadControl = 0;
		return await this._headquarterService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.headquarters = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.updateHeadquarter(parameters.object);
				break;
				case 'activate-deactivate':
					this.updateHeadquarterState(parameters.object);
					break;
			default:
				break;
		}
	}

	/**
	 * Abre el modal seteando el componente HeadquarterCreateComponent
	 */
	createHeadquarterModal = () => {
		this._modalService.open({
			component: HeadquarterCreateComponent,
			title: 'Registro de una sede',
			size: 'modal-xl'
		});
	}

	updateHeadquarter = (headquarter: any) => {
		this._headquarterService.setheadquarter(headquarter);
		 this._modalService.open({
		 	component: HeadquarterUpdateComponent,
		 	title: 'Actualización de una Sede',
		 	size: 'modal-xl'
		 });
	}

	updateHeadquarterState = (headquarter: any) => {
		headquarter.enabled = (headquarter.enabled) ? 0 : 1;
		 this._headquarterService.update(headquarter.id, headquarter).then((response: any) => {
		 	this._notificationService.success({
		 		title: 'Información',
		 		message: 'La sede se ha actualizado correctamente.'
		 	});
		 });

	}

	setheadquarter = (headquarter: any) => this._headquarterService.setheadquarter(headquarter);


	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}
	

}
