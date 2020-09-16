import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,  } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { FORM_REGEX } from '../../../../../../../global/form-regex';
/**
 * 
 */
import { CountryService } from '@services/app-services/configurations/locations/country.service';

@Component({
  selector: 'app-country-create',
  templateUrl: './country-create.component.html',
  styles: [
  ]
})
export class CountryCreateComponent implements OnInit {

  countrieCreateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  countrie: any;


  constructor(
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.countrieCreateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: [null, [Validators.required]],
      })
    });
  }


  get basicData() {
    return this.countrieCreateForm.get('basic_data');
  }

  createcountrie = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();

    this._countryService.create(basicData).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'El país se ha registrado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }

}
