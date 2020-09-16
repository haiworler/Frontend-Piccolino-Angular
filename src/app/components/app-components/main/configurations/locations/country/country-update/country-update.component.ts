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
  selector: 'app-country-update',
  templateUrl: './country-update.component.html',
  styles: [
  ]
})
export class CountryUpdateComponent implements OnInit {

  countrieupdateForm: FormGroup;
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
    this.countrie = this._countryService.getCountry();
    this.countrieupdateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: [null, [Validators.required]],
      })
    });
    this.basicData.patchValue(this.countrie);

  }


  get basicData() {
    return this.countrieupdateForm.get('basic_data');
  }

  updatecountrie = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();

    this._countryService.update(this.countrie.id,basicData).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'El país se ha actualizado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }

}
