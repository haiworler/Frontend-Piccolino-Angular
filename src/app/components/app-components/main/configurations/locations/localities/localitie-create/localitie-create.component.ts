import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
/**
 * 
 */
import { LocalitieService } from '@services/app-services/configurations/locations//localitie.service';

@Component({
  selector: 'app-localitie-create',
  templateUrl: './localitie-create.component.html',
  styles: [
  ]
})
export class LocalitieCreateComponent implements OnInit {

  localitieCreateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  localitie: any;
  dependences: any;

  constructor(
    private formBuilder: FormBuilder,
    private _modalService: ModalService,
    private _storageService: StorageService,
    private _notificationService: NotificationsService,
    private _localitieService: LocalitieService
  ) { }

  async ngOnInit() {
    this.localitieCreateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: ['', [Validators.required]],
        town: ['', [Validators.required]],
      })
    });
    this.dependences = await this._localitieService.dependences();
  }

  get basicData() {
    return this.localitieCreateForm.get('basic_data');
  }

  createlocalitie = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    const data = {
      name: basicData.name,
      town_id: basicData.town.id
    };
    this._localitieService.create(data).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: `La localidad se ha registrado correctamente.`
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }

}
