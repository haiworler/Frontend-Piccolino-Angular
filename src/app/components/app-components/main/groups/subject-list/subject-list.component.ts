import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { Headquarter } from '@interfaces/headquarter';
import { MainService } from '@services/app-services/main.service';
import { Router } from '@angular/router';

/**
 * Creados
 */
import { GroupService } from '@services/app-services/schools/group.service';
import { SubjectAssignComponent } from '../subject-assign/subject-assign.component';


@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styles: []
})
export class SubjectListComponent implements OnInit {

  subjectListForm: FormGroup;
  loadControl: any = 0;
  heading = 'Listado de Materias';
	subheading = 'Listado';
	icon = 'fa fa-book icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';

  buttonsOp: any[] = [];
  permissions: any[];
  currentRoute: any;

  subjectList: any = [];
  subjectLists: any = [];
  group: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private _modalService: ModalService,
    private _storageService: StorageService,
    private _notificationService: NotificationsService,
    private _groupService: GroupService,
    private _mainService: MainService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.group = this._groupService.getgroup();
    this.subjectListForm = this.formBuilder.group({

    });
    this.buttonsOp.push(
      { name: 'remove', title: 'Retirar', secondTitle: null, icon: 'fa fa-times fa-fw mr-2', method: 'remove', class: 'btn btn-sm btn-pill btn-outline-danger', condition: null, parameter: null, specialCondition: false }
    );
    this._groupService.getSearchStudent().subscribe(value => {
      if (value) {
        this.searchsubject();
      }
    });
    this.searchsubject();
    
  }

  selectionOptions(parameters: any = null) {
    switch (parameters.parameters.method) {
      case 'remove':
        this.removesubject(parameters.object);
        break;

      default:
        break;
    }
  }

  async searchsubject() {
    let response = await this._groupService.subjectStudentList(this.group.id);
    this.subjectLists = response.subjects;
    this.loadControl = 1;
  }

  removesubject = (subjectList: any) => {
    let data = {
      subject_id: subjectList.id
    }
     this._groupService.removeSubject(this.group.id, data).then((response: any) => {
       this._notificationService.success({
         title: 'Información',
         message: 'La asignatura fue retirado de la lista correctamente.'
       });
       this.searchsubject();
     });
  }


  /**
	   * Abre el modal seteando el componente groupCreateComponent
	   */
	assignsubject = () => {
    this._groupService.setSubjects(this.subjectLists.map((obj:any)=> { return obj.id}));
		this._modalService.open({
			component: SubjectAssignComponent,
			title: 'Asignar Materias',
			size: 'modal-xl'
		});
	}


}
