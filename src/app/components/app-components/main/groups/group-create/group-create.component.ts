import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { FORM_REGEX } from '../../../../../global/form-regex';
/**
 * 
 */
import { GroupService } from '@services/app-services/schools/group.service';
/**
 * Componente Pap-up
 */
import { GeneralSelectionRecordsComponent } from '../../shared/selects/general-selection-records/general-selection-records.component'
import { GeneralSelectionRecordsService } from '@services/app-services/shared/general-selection-records.service';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styles: []
})
export class GroupCreateComponent implements OnInit {

  groupCreateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  group: any;

  dependences: any;
  headquarters: any = [];
  semesters: any[] = [];
  people: any[] = [];

  constructor( private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _groupService: GroupService,
    private _generalSelectionRecordsService: GeneralSelectionRecordsService) { }

    async ngOnInit() {
      this.groupCreateForm = this.formBuilder.group({
        basic_data: this.formBuilder.group({
          name:[null, [Validators.required]],
          headquarter: [null, [Validators.required]],
          semester: [null, [Validators.required]],
          people: null,
          people_id: null,
        })
      });
      this.dependences = await this._groupService.dependences();
      this.headquarters = this.dependences.headquarters;
      this.semesters = this.dependences.semesters.map((obj: any) => { return { id: obj.id, name: obj.code }; });
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
    return this.groupCreateForm.get('basic_data');
  }

  creategroup = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    let data = {
      name: basicData.name,
      people_id: basicData.people_id,
      headquarter_id: basicData.headquarter.id,
      semester_id: basicData.semester.id,
    }
    this._groupService.create(data).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'El Grupo se ha registrado correctamente.'
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


}
