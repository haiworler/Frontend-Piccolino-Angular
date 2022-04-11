import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { HeadquarterService } from '@services/app-services/headquarter.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { MainService } from '@services/app-services/main.service';
import { Router } from '@angular/router';

import { HeadquarterCreateExpensesComponent } from './../headquarter-create-expenses/headquarter-create-expenses.component';


@Component({
  selector: 'app-headquarter-list-expenses',
  templateUrl: './headquarter-list-expenses.component.html',
  styles: [
  ]
})
export class HeadquarterListExpensesComponent implements OnInit, OnChanges, OnDestroy {
  heading = 'Gastos';
  subheading = 'Listado';
  //icon = 'fa fa-cogs icon-gradient bg-night-sky';
  icon = 'fa fa-fort-awesome icon-gradient bg-night-sky';
  primaryColour = '#fff';
  secondaryColour = '#ccc';
  storageSub: any = null;
  headquarterCost: any;
  headquarter: any;
  searchData: any;
  progressSearch: boolean | number = false;
  headquarterCostListForm: FormGroup;
  loadControl: any = 0;
  buttonsOp: any[] = [];
  userData: any;
  permissions: any[];
  currentRoute: any;
  headquarterCosts: any;

  constructor(
    private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _headquarterService: HeadquarterService,
		private _mainService: MainService,
		private router: Router
  ) { }

  ngOnInit(): void {
    /**
     * Obtenemos la sede que seteamos
     */
     this.headquarter = this._headquarterService.getheadquarter();

    // this.userData = this._mainService.getUserData();
		// this.permissions = this._mainService.Permissions;
		// this.currentRoute = this.router.url;
		// for (const permission in this.permissions) {
		// 	if (this.permissions[permission].method != 'delete') {
		// 		this.buttonsOp.push(
		// 			{
		// 				title: this.permissions[permission].title,
		// 				secondTitle: this.permissions[permission].secondTitle,
		// 				icon: this.permissions[permission].icon,
		// 				method: this.permissions[permission].method,
		// 				class: this.permissions[permission].class,
		// 				condition: this.permissions[permission].condition,
		// 				parameter: null,
		// 			}
		// 		);

		// 	}

		// }

		// this.buttonsOp.push(
		// 	{ name: 'expenses', title: 'Gastos', secondTitle: null, icon: 'fa fa-money fa-fw mr-2', method: 'expenses', class: 'btn btn-sm btn-pill btn-outline-primary', condition: null, parameter: null, specialCondition: false }
		// );

		this.headquarterCostListForm = this.formBuilder.group({
			term: ['', []],
			page: [1, []],
			limit: [10, []],
		});

		this.searchData = {
			term: this.term.value,
			page: this.page.value,
			limit: this.limit.value,
      headquarter_id: this.headquarter.id

		};

		this.storageSub = this._storageService.watch().pipe(debounceTime(500)).subscribe((token: any) => {
			if (token) {
				this.searchHeadquarterCosts();
			}
		});

		this.ngOnChanges();
  }

  ngOnChanges() {
		this.headquarterCostListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit,
        headquarter_id: this.headquarter.id

			};
		});

	}

	get term() {
		return this.headquarterCostListForm.get('term');
	}

	get page() {
		return this.headquarterCostListForm.get('page');
	}

	get limit() {
		return this.headquarterCostListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchHeadquarterCosts().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.headquarterCostListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.headquarterCosts = [];
	}

	async searchHeadquarterCosts() {
		this.headquarterCosts = [];
		this.loadControl = 0;
		return await this._headquarterService.searchExpenses(this.searchData).then((response: any) => {
			this.loadControl = 1;
      console.log('Obtenemos los gastos', response);
			this.headquarterCosts = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
			//	this.updateHeadquarter(parameters.object);
				break;
			case 'activate-deactivate':
			//	this.updateHeadquarterState(parameters.object);
				break;
			case 'expenses':
			//	this.listOfExpenses(parameters.object);
				break;

			default:
				break;
		}
	}

	/**
	 * Abre el modal seteando el componente HeadquarterCreateComponent
	 */
	createHeadquarterModal = () => {
    this._headquarterService.setheadquarter(this.headquarter);
		this._modalService.open({
			component: HeadquarterCreateExpensesComponent,
			title: 'Registro nuevo',
			size: 'modal-xl'
		});
	}

	// updateHeadquarter = (headquarter: any) => {
	// 	this._headquarterService.setheadquarter(headquarter);
	// 	this._modalService.open({
	// 		component: HeadquarterUpdateComponent,
	// 		title: 'Actualización de una Sede',
	// 		size: 'modal-xl'
	// 	});
	// }

	/**
	 * Abrimos el modal con la lista de gastos de la sede
	 * @param headquarter 
	 */
	 listOfExpenses(headquarter: any){
		this._headquarterService.setheadquarter(headquarter);
		this._modalService.open({
			component: HeadquarterListExpensesComponent,
			title: 'Lista de gastos',
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
