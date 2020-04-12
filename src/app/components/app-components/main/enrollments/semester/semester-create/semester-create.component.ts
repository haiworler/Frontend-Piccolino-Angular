import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FORM_REGEX } from '../../../../../../global/form-regex';
/**
 * 
 */
import { SemesterService } from '@services/app-services/schools/semester.service';
/**
 * Multi Select
 */
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';


@Component({
  selector: 'app-semester-create',
  templateUrl: './semester-create.component.html',
  styles: []
})
export class SemesterCreateComponent implements OnInit {

  semesterCreateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  semester: any;

  dependences: any = [];
  cuts: any = [];

  	/**
	  * 
	  */
	dropdownSettings: IDropdownSettings = {}; // Variable para la parametrizacion de los Multi-Select
	ShowFilter = true; // Variable para la parametrización de los Multi-Select
	showAll = true; // Variable para la parametrización de los Multi-Select
	defaultData: any; // Variable para guardar la Data por Default

  constructor(
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _semesterService: SemesterService,
    public calendar: NgbCalendar
  ) { }

  async ngOnInit() {
    this.semesterCreateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        code: [null, [Validators.required]],
        start_date: [null, [Validators.required]],
        end_date: [null, [Validators.required]],
        cuts: [null, [Validators.required]],
        observations: null,
      })
    });

    this.dropdownSettings = {
			singleSelection: false,
			defaultOpen: false,
			idField: 'id',
			textField: 'name',
			selectAllText: 'Seleccionar todo',
			unSelectAllText: 'Remover todo',
			enableCheckAll: this.showAll,
			itemsShowLimit: 15,
			allowSearchFilter: this.ShowFilter
		};

    this.dependences = await this._semesterService.dependences();
    this.cuts = this.dependences.cuts;

  }

  get basicData() {
    return this.semesterCreateForm.get('basic_data');
  }

  createsemester = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    basicData.cuts = basicData.cuts.map((obj:any)=> { return obj.id});
    this._semesterService.create(basicData).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'El semestre se ha registrado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }

}
