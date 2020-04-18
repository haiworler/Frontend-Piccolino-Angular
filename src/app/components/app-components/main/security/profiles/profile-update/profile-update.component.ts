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
import { ProfileService } from '@services/app-services/security/profile.service';
/**
 * Multi Select
 */
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styles: []
})
export class ProfileUpdateComponent implements OnInit {

  profileUpdateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  profile: any;

  dependences: any = [];
  modules: any = [];

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
    private _profileService: ProfileService,
    public calendar: NgbCalendar
  ) { }

  async ngOnInit() {
    this.profile = this._profileService.getprofile();
    this.profileUpdateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: [null, [Validators.required]],
        modules: [null, [Validators.required]],
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

     this.basicData.patchValue(this.profile);
    this.dependences = await this._profileService.dependences();
    this.modules = this.dependences.modules;

  }

  get basicData() {
    return this.profileUpdateForm.get('basic_data');
  }

  updateProfile = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    basicData.modules = basicData.modules.map((obj:any)=> { return obj.id});
    this._profileService.update(this.profile.id,basicData).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'El perfil se ha actualizado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }


}
