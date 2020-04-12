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
import { StudentAssignComponent } from '../student-assign/student-assign.component';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styles: []
})
export class StudentListComponent implements OnInit {

  studentListForm: FormGroup;
  loadControl: any = 0;

  buttonsOp: any[] = [];
  permissions: any[];
  currentRoute: any;

  studentList: any = [];
  studentLists: any = [];
  group: any = [];


  constructor(
    private formBuilder: FormBuilder,
    private _modalService: ModalService,
    private _storageService: StorageService,
    private _notificationService: NotificationsService,
    private _groupService: GroupService,
    private _mainService: MainService,
    private router: Router
  ) {
  }

  async  ngOnInit() {
    this.group = this._groupService.getgroup();
    this.studentListForm = this.formBuilder.group({

    });
    this.buttonsOp.push(
      { name: 'remove', title: 'Retirar', secondTitle: null, icon: 'fa fa-times fa-fw mr-2', method: 'remove', class: 'btn btn-sm btn-pill btn-outline-primary', condition: null, parameter: null, specialCondition: false }
    );
    this._groupService.getSearchStudent().subscribe(value => {
      if (value) {
        this.searchStudent();
      }
    });
    this.searchStudent();
  }

  selectionOptions(parameters: any = null) {
    switch (parameters.parameters.method) {
      case 'remove':
        this.removeStudent(parameters.object);
        break;

      default:
        break;
    }
  }

  async searchStudent() {
    let response = await this._groupService.groupStudentList(this.group.id);
    this.studentLists = response.enrolleds;
    this.loadControl = 1;
  }

  removeStudent = (studentList: any) => {
    let data = {
      enrolled_id: studentList.id
    }
    this._groupService.removeStudent(this.group.id, data).then((response: any) => {
      this._notificationService.success({
        title: 'Información',
        message: 'El estudiante fue retirado de la lista correctamente.'
      });
      this.searchStudent();
    });
  }


  /**
	   * Abre el modal seteando el componente groupCreateComponent
	   */
	assignStudent = () => {
    this._groupService.setEnrolleds(this.studentLists.map((obj:any)=> { return obj.id}));
		this._modalService.open({
			component: StudentAssignComponent,
			title: 'Asignar estudiantes',
			size: 'modal-xl'
		});
	}

}
