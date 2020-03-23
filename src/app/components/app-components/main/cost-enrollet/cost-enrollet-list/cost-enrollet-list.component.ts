import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { CostEnrolletsService } from '@services/app-services/cost-enrollets.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { MainService } from '@services/app-services/main.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { CostEnrolletCreateComponent } from '../cost-enrollet-create/cost-enrollet-create.component';
import { CostEnrolletUpdateComponent } from '../cost-enrollet-update/cost-enrollet-update.component';


@Component({
  selector: 'app-cost-enrollet-list',
  templateUrl: './cost-enrollet-list.component.html',
  styles: []
})
export class CostEnrolletListComponent implements OnInit {

  heading = 'Listado de matrículas';
	subheading = 'Listado';
	icon = 'fa fa-cogs icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	storageSub: any = null;
	costEnrollet: any;
	searchData: any;
	progressSearch: boolean | number = false;
	costEnrolletsListForm: FormGroup;
	loadControl: any = 0;
	buttonsOp: any[] = [];
	userData: any;
	permissions: any[];
	currentRoute: any;
	costEnrollets:any;

  constructor(
    private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _costEnrolletsService: CostEnrolletsService,
		private _mainService: MainService,
    private router: Router
    ) { }

  ngOnInit() {
    this.userData = this._mainService.getUserData();
		this.permissions = this._mainService.Permissions;
		this.currentRoute = this.router.url;
		for (const permission in this.permissions) {
			if (this.permissions[permission].method != 'activate-deactivate' && this.permissions[permission].method != 'delete') {
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

		this.costEnrolletsListForm = this.formBuilder.group({
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
				this.searchcostEnrollets();
			}
		});

		this.ngOnChanges();
  }

  ngOnChanges() {
		this.costEnrolletsListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.costEnrolletsListForm.get('term');
	}

	get page() {
		return this.costEnrolletsListForm.get('page');
	}

	get limit() {
		return this.costEnrolletsListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchcostEnrollets().then(() => this.progressSearch = false);
	}

	async searchbyname() {
		this.costEnrollets = [];
		this.loadControl = 0;
		console.log(this.searchData.term);
		// return await this._costEnrolletService.searchbyname(this.searchData.term).then((response: any) => {
		// 	this.loadControl = 1;
		// 	this.costEnrollets = response;
		// });
	}

	reset = () => {
		this.costEnrolletsListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.costEnrollets = [];
	}

	async searchcostEnrollets() {
		this.costEnrollets = [];
		this.loadControl = 0;
		return await this._costEnrolletsService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.costEnrollets = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.updatecostEnrollet(parameters.object);
				break;

			default:
				break;
		}
	}

	/**
	 * Abre el modal seteando el componente costEnrolletCreateComponent
	 */
	createcostEnrolletModal = () => {
		 this._modalService.open({
		 	component: CostEnrolletCreateComponent,
		 	title: 'Registro de un costo de matrícula',
		 	size: 'modal-xl'
		 });
	}

	updatecostEnrollet = (costEnrollet: any) => {
		// this._costEnrolletService.setcostEnrollet(costEnrollet);
		//  this._modalService.open({
		//  	component: costEnrolletUpdateComponent,
		//  	title: 'Actualización de una Sede',
		//  	size: 'modal-xl'
		//  });
	}

	updateArea = (costEnrollet: any) => {
		// area.is_enabled = (area.is_enabled) ? 0 : 1;
		// this._areasService.update(area.id, area).then((response: any) => {
		// 	this._notificationService.success({
		// 		title: 'Información',
		// 		message: 'Ela área se ha actualizado correctamente.'
		// 	});
		// });

	}




	ngOnDestroy() {
		this._storageService.removeItem();
		this.storageSub.unsubscribe();
	}

}
