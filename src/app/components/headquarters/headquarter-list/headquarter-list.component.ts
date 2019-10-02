import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { ModalService } from '../../../services/shared/modal.service';
import { StorageService } from '../../../services/app-services/storage.service';
//import { NotificationsService } from '@services/shared/notifications.service';
import { HeadquarterService } from '../../../services/app-services/headquarter.service';
import { Headquarter } from '../../../interfaces/app/headquarter';
import { MainService } from '../../../services/app-services/main.service';
import swal from 'sweetalert2';
import { HeadquarterCreateComponent } from '../headquarter-create/headquarter-create.component';



@Component({
  selector: 'app-headquarter-list',
  templateUrl: './headquarter-list.component.html',
  styles: []
})
export class HeadquarterListComponent implements OnInit, OnChanges, OnDestroy {

  title = 'Sedes';
  description = 'Listado de SEDES';
  icon = 'fa fa-cogs icon-gradient bg-night-sky';
  headquarter: any;

  headquarterListForm: FormGroup;
  storageSub: any = null;
  searchData: any;

  progressSearch: boolean | number = false;
  loadControl: any = 0;

  constructor(
    private formBuilder: FormBuilder,
    private _modalService: ModalService,
    private _storageService: StorageService,
    //private _notificationService: NotificationsService,
    private _headquarterService: HeadquarterService,
    private _mainService: MainService,
    private router: Router
  ) { }

  ngOnInit() {

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

    this.storageSub = this._storageService.watchStorage().pipe(debounceTime(500)).subscribe((token: any) => {
      if (token) {
        this.searchHeadquarter();
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
    this.searchHeadquarter().then(() => this.progressSearch = false);
  }

  reset = () => {
    this.headquarterListForm.reset();
    this.term.setValue('');
    this.page.setValue(1);
    this.limit.setValue(10);
    this.headquarter = [];
  }

  async searchHeadquarter() {
    this.headquarter = [];
    this.loadControl = 0;
    return await this._headquarterService.search(this.searchData).then((response: any) => {
      this.loadControl = 1;
      this.headquarter = response;
    });
  }

  pageChange = (page: number) => {
    this.page.setValue(page);
    this.search();
  }

  createHeadquarterModal = () => {
		this._modalService.open({
			component: HeadquarterCreateComponent,
			title: 'Registro de una actividad',
			size: 'modal-xl'
		});
	}


  ngOnDestroy() {
    this._storageService.removeItem();
    this.storageSub.unsubscribe();
  }

}
