import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FORM_REGEX } from '../../../../../../global/form-regex';
import { MustMatch } from '../../../shared/helpers/must-match-validator';

/**
 * 
 */
import { UserService } from '@services/app-services/security/user.service';
/**
 * Componente Pap-up
 */
import { GeneralSelectionRecordsComponent } from '../../../shared/selects/general-selection-records/general-selection-records.component'
import { GeneralSelectionRecordsService } from '@services/app-services/shared/general-selection-records.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styles: []
})
export class UserCreateComponent implements OnInit {

  userCreateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  user: any;

  dependences: any = [];
  profiles: any = [];
  people:any = [];



  constructor(
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _userService: UserService,
    public calendar: NgbCalendar,
    private _generalSelectionRecordsService: GeneralSelectionRecordsService
  ) { }

  async ngOnInit() {
    this.userCreateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: [null, [Validators.required]],
        profile: [null, [Validators.required]],
        email: [null, [Validators.required,Validators.pattern(`${FORM_REGEX.email}`)]],
        password: ['', [Validators.required]],
				password_confirmation: ['', [Validators.required]],
        people: [null, [Validators.required]],
        people_id: [null, [Validators.required]],
      }, {
				validator: MustMatch('password', 'password_confirmation')
			})
    });

  

    this.dependences = await this._userService.dependences();
    this.profiles = this.dependences.profiles;
    this.basicData.get('people').disable();
    this._generalSelectionRecordsService.getObj().subscribe(value => {
      if (value) {
        this.people = value;
        this.basicData.get('people').setValue(`${value.names} ${value.surnames}`);
        this.basicData.get('people_id').setValue(value.id);
      }
    });

  }

  get basicData() {
    return this.userCreateForm.get('basic_data');
  }

  createuser = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    let data = {
      name: basicData.name,
      email: basicData.email,
      password: basicData.password,
      profile_id: basicData.profile.id,
      people_id: basicData.people_id
    }
    this._userService.create(data).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'El usuario se ha registrado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }

   /**
 * Es para abrir el pop-up
 */
openPapUp() {
  let nameFields = [
    'id',
    'names',
    'surnames'
  ];
  let namesColumns = [
    'Código',
    'Nombres',
    'Apellidos'
  ];
  this._generalSelectionRecordsService.setNameFields(nameFields);
  this._generalSelectionRecordsService.setNamesColumns(namesColumns);
  this._generalSelectionRecordsService.setNameUrl('groups/getTeacher');
  this._modalService.open({
    component: GeneralSelectionRecordsComponent,
    title: 'Lista de voluntarios(Maestro,General) activos',
    size: 'modal-xl'
  });
}

eventValidatePassword() {
  if (this.basicData.get('password').value != this.basicData.get('password_confirmation').value) {
    this._notificationService.warning({
      title: 'Error',
      message: 'Las contraseñas no coinciden. '
    });
  }
}

}
