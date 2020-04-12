import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { MainService } from '@services/app-services/main.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { GeneralSelectionRecordsService } from '@services/app-services/shared/general-selection-records.service';


@Component({
	selector: 'app-general-selection-records',
	templateUrl: './general-selection-records.component.html',
	styles: []
})
export class GeneralSelectionRecordsComponent implements OnInit, OnDestroy {

	heading = 'Estados logísticos';
	subheading = 'Listado';
	icon = 'fa fa-cogs icon-gradient bg-night-sky';

	primaryColour = '#fff';
	secondaryColour = '#ccc';

	storageSub: any = null;
	generalSelectionRecord: any;
	generalSelectionRecords: any;

	searchData: any;

	progressSearch: boolean | number = false;

	generalSelectionRecordsListForm: FormGroup;
	loadControl: any = 0;

	buttonsOp: any[] = [];
	userData: any;
	permissions: any[];
	currentRoute: any;
	nameColumns: any;
	nameFields: any;

	constructor(
		private formBuilder: FormBuilder,
		private _storageService: StorageService,
		private _generalSelectionRecordsService: GeneralSelectionRecordsService,
		private _modalService: ModalService,
		private _notificationService: NotificationsService,
		private _mainService: MainService,
		private router: Router
	) { }

	ngOnInit() {
		this.nameColumns = this._generalSelectionRecordsService.getNamesColumns();
		this.nameFields = this._generalSelectionRecordsService.getNameFields();

		this.userData = this._mainService.getUserData();
		this.currentRoute = this.router.url;


		this.generalSelectionRecordsListForm = this.formBuilder.group({
			id: this._generalSelectionRecordsService.getId(),
			term: [(this._generalSelectionRecordsService.getTerm() ? this._generalSelectionRecordsService.getTerm() : ''), []],
			page: [1, []],
			limit: [10, []]
		});

		this.searchData = {
			id: this._generalSelectionRecordsService.getId(),
			term: this.term.value,
			page: this.page.value,
			limit: this.limit.value
		};

		this.storageSub = this._storageService.watch().pipe(debounceTime(500)).subscribe((token: any) => {
			if (token) {
				this.searchgeneralSelectionRecords();
			}
		});

		this.ngOnChanges();
	}




	ngOnChanges() {
		this.generalSelectionRecordsListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				id: this._generalSelectionRecordsService.getId(),
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});
	}



	get term() {
		return this.generalSelectionRecordsListForm.get('term');
	}

	get page() {
		return this.generalSelectionRecordsListForm.get('page');
	}

	get limit() {
		return this.generalSelectionRecordsListForm.get('limit');
	}

	search = (type = null) => {
		this.progressSearch = 0;
		this.searchgeneralSelectionRecords(type).then(() => this.progressSearch = false);
	}

	reset = () => {
		this.generalSelectionRecordsListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.generalSelectionRecords = [];
		this.search();
	}

	/**
	   * Realiza las consulta del Objeto
	   */
	async searchgeneralSelectionRecords(type = null) {
		if (type) {
			this.emptyQueryData();
		}
		this.generalSelectionRecords = [];
		this.loadControl = 0;
		return await this._generalSelectionRecordsService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.generalSelectionRecords = response;
		});
	}
	/**
	 * Inciia la consulta desde su punto principal
	 */
	emptyQueryData() {
		this.searchData = {
			id: this._generalSelectionRecordsService.getId(),
			term: this.searchData.term,
			page: 1,
			limit: 10
		};
	}

	/**
	 * Se utiliza para la paginación
	 */
	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}
	/**
	 * 
	 * @param obj 
	 */
	setObj(obj: any) {
		console.log('Seleccionado: ', obj);
		this._generalSelectionRecordsService.settObj(obj);
		this._modalService.close();
	}

	ngOnDestroy() {
		this._generalSelectionRecordsService.removetObj();
	}

}
