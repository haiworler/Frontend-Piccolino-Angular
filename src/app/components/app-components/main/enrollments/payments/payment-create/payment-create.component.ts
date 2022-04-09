import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { FORM_REGEX } from '../../../../../../global/form-regex';
/**
 * 
 */
import { EnrolledService } from '@services/app-services/schools/enrolled.service';



@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styles: [
  ]
})
export class PaymentCreateComponent implements OnInit {

  paymentCreateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  enrolled: any;
  payment: any;

  dependences: any;
  headquarters: any = [];

  constructor( private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _enrolledService: EnrolledService,
    ) { }

    async ngOnInit() {
      this.enrolled = this._enrolledService.getenrolled();

    this.paymentCreateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        headquarter: [null, [Validators.required]],
        value: [null, [Validators.required]],
        observations: null
      })
    });
    this.dependences = await this._enrolledService.dependences();
    this.headquarters = this.dependences.headquarters;

    
  }

  get basicData() {
    return this.paymentCreateForm.get('basic_data');
  }

  createPayment = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    let user:any = JSON.parse(localStorage.getItem('user'));

    let data = {
      people_id: user.people[0].id,
      headquarter_id: basicData.headquarter.id,
      value: basicData.value,
      observations: basicData.observations,
      enrolled_id: this.enrolled.id
    }
    this._enrolledService.createPaymentEnrolled(data).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'El aporte se ha registrado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }


}
