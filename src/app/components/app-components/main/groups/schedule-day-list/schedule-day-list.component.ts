import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { Headquarter } from '@interfaces/headquarter';
import { MainService } from '@services/app-services/main.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

/**
 * Creados
 */
import { GroupService } from '@services/app-services/schools/group.service';
import { ScheduleHourListComponent } from '../schedule-hour-list/schedule-hour-list.component';
import { ScheduleCreateComponent } from '../schedule-create/schedule-create.component';
import { ScheduleUpdateComponent } from '../schedule-update/schedule-update.component';


@Component({
  selector: 'app-schedule-day-list',
  templateUrl: './schedule-day-list.component.html',
  styles: []
})
export class ScheduleDayListComponent implements OnInit {

  scheduleDayListForm: FormGroup;
  loadControl: any = 0;
  heading = 'Horario';
  subheading = 'Listado';
  icon = 'fa fa-calendar icon-gradient bg-night-sky';
  primaryColour = '#fff';
  secondaryColour = '#ccc';

  buttonsOp: any[] = [];
  permissions: any[];
  currentRoute: any;

  scheduleDayList: any = [];
  scheduleDayLists: any = [];
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
    this.scheduleDayListForm = this.formBuilder.group({

    });
    this.permissions = this._mainService.Permissions;
    this.currentRoute = this.router.url;
    for (const permission in this.permissions) {
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

    this._groupService.getSearchStudent().subscribe(value => {
      if (value) {
        this.searchscheduleDay();
      }
    });
    this.searchscheduleDay();
  }

  selectionOptions(parameters: any = null) {
    switch (parameters.parameters.method) {
      case 'update':
        this.update(parameters.object);
        break;
      case 'activate-deactivate':
        this.updateScheduleDayState(parameters.object);
        break;
      case 'delete':
        this.deleteScheduleDay(parameters.object);
        break;

      default:
        break;
    }
  }

  /**
 * Elimina el Objeto, para este proceso en el backend se debe utilizar el softDelete
 * para que el registro no se pierda realmente.....
 */
  deleteScheduleDay = (scheduleDay: any) => {
    swal.fire({
      title: '¿ Esta seguro(a) ?',
      text: '¿ De eliminar el día del horario ?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._groupService.deleteScheduleDay(scheduleDay.id).then((response: any) => {
          this.searchscheduleDay();
          this._notificationService.success({
            title: 'Información',
            message: 'El día se ha eliminada correctamente.'
          });
        });
      }
    });
  }

  async searchscheduleDay() {
    let response = await this._groupService.groupScheduleList(this.group.id);
    this.scheduleDayLists = response.schedule_days;
    this.loadControl = 1;
  }

  updateScheduleDayState = (scheduleDay: any) => {
    scheduleDay.enabled = (scheduleDay.enabled) ? 0 : 1;
    let data = {
      enabled: scheduleDay.enabled
    }

    this._groupService.stateScheduleDay(scheduleDay.id, data).then((response: any) => {
      this._notificationService.success({
        title: 'Información',
        message: 'El estado del día  se ha actualizado correctamente.'
      });
    });
  }


  update = (schedule: any) => {
    this._groupService.setSchedule(schedule);
    this._modalService.open({
      component: ScheduleUpdateComponent,
      title: 'Actualización de un día',
      size: 'modal-xl'
    });
  }


  /**
	   * Abre el modal seteando el componente groupCreateComponent
	   */
  assignscheduleDay = () => {
    this._modalService.open({
      component: ScheduleCreateComponent,
      title: 'Registrar Horario',
      size: 'modal-xl'
    });
  }


}
