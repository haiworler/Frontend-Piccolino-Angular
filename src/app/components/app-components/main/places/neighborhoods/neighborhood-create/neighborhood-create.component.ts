import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';

import { NeighborhoodService } from '@services/app-services/places/neighborhood.service';


@Component({
  selector: 'app-neighborhood-create',
  templateUrl: './neighborhood-create.component.html',
  styles: []
})
export class NeighborhoodCreateComponent implements OnInit {

  neighborhoodCreateForm: FormGroup;
  neighborhood: any;
  userData: any;
  progress: boolean | number = false;

   /**
   * 
   */
  dependences: any;
  localities:any;

  constructor(
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _neighborhoodService: NeighborhoodService
  ) { }

  async ngOnInit() {

    this.neighborhoodCreateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: [null, [Validators.required]],
        locality: [[], [Validators.required]],
      })
    });


    this.dependences = await this._neighborhoodService.dependences();
    this.localities = this.dependences.localities;

  }

  get basicData() {
    return this.neighborhoodCreateForm.get('basic_data');
  }

  createNeighborhood = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    const data = {
      name: basicData.name,
      locality_id: basicData.locality.id,
    }
    this._neighborhoodService.create(data).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'El barrio se ha registrado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  
  }

}
