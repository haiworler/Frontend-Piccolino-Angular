import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { PersonService } from '@services/app-services/person.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { MainService } from '@services/app-services/main.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { PersonCreateComponent } from '../person-create/person-create.component';
import { PersonUpdateComponent } from '../person-update/person-update.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styles: []
})
export class PersonListComponent implements OnInit, OnChanges, OnDestroy {

  heading = 'Personas';
  subheading = 'Listado';
  icon = 'fa fa-cogs icon-gradient bg-night-sky';
  primaryColour = '#fff';
  secondaryColour = '#ccc';
  storageSub: any = null;
  person: any;
  searchData: any;
  progressSearch: boolean | number = false;
  personListForm: FormGroup;
  loadControl: any = 0;
  buttonsOp: any[] = [];
  userData: any;
  permissions: any[];
  currentRoute: any;
  persons: any;

  constructor(
    private formBuilder: FormBuilder,
    private _modalService: ModalService,
    private _storageService: StorageService,
    private _notificationService: NotificationsService,
    private _personService: PersonService,
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

    this.personListForm = this.formBuilder.group({
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
        this.searchPersons();
      }
    });

    this.ngOnChanges();

  }

  ngOnChanges() {
    this.personListForm.valueChanges.subscribe((form: any) => {
      this.searchData = {
        term: form.term,
        page: form.page,
        limit: form.limit
      };
    });

  }

  get term() {
    return this.personListForm.get('term');
  }

  get page() {
    return this.personListForm.get('page');
  }

  get limit() {
    return this.personListForm.get('limit');
  }

  search = () => {
    this.progressSearch = 0;
    this.searchPersons().then(() => this.progressSearch = false);
  }

  async searchbyname() {
    this.persons = [];
    this.loadControl = 0;
    console.log(this.searchData.term);
    return await this._personService.search(this.searchData.term).then((response: any) => {
      this.loadControl = 1;
      this.persons = response;
    });
  }

  reset = () => {
    this.personListForm.reset();
    this.term.setValue('');
    this.page.setValue(1);
    this.limit.setValue(10);
    this.persons = [];
  }

  async searchPersons() {
    this.persons = [];
    this.loadControl = 0;
    return await this._personService.search(this.searchData).then((response: any) => {
      console.log('Data Response Person: ', response);
      this.loadControl = 1;
      this.persons = response;
    });
  }

  pageChange = (page: number) => {
    this.page.setValue(page);
    this.search();
  }

  selectionOptions(parameters: any = null) {
    switch (parameters.parameters.method) {
      case 'update':
        this.updatePerson(parameters.object);
        break;

      default:
        break;
    }
  }

  
	/**
	 * Abre el modal seteando el componente 
	 */
	createPersonModal = () => {
		 this._modalService.open({
		 	component: PersonCreateComponent,
		 	title: 'Registro de una Persona',
		 	size: 'modal-xl'
		 });
	}

	updatePerson = (person: any) => {
		 this._personService.setPerson(person);
		  this._modalService.open({
		  	component: PersonUpdateComponent,
		  	title: 'Actualización de una persona',
		  	size: 'modal-xl'
		  });
	}

	ngOnDestroy() {
		this._storageService.removeItem();
		this.storageSub.unsubscribe();
	}


}
