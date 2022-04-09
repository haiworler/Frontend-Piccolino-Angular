import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { Headquarter } from '@interfaces/headquarter';
import { MainService } from '@services/app-services/main.service';
import { Router } from '@angular/router';
import { PaymentReceiptService } from '@services/app-services/export/pdf/payment-receipt.service';

/**
 * Creados
 */
import { EnrolledService } from '@services/app-services/schools/enrolled.service';
import { PaymentCreateComponent } from '../payment-create/payment-create.component';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styles: [
  ]
})
export class PaymentListComponent implements OnInit, OnDestroy {

  heading = 'Listado de aportes';
  subheading = 'Listado';
  icon = 'fa fa-id-card icon-gradient bg-night-sky';
  primaryColour = '#fff';
  secondaryColour = '#ccc';
  searchData: any;
  storageSub: any = null;
  progressSearch: boolean | number = false;
  paymentListForm: FormGroup;
  loadControl: any = 0;
  enrolled: any;

  buttonsOp: any[] = [];
  permissions: any[];
  currentRoute: any;

  payment: any;
  payments: any;

  constructor(
    private formBuilder: FormBuilder,
    private _modalService: ModalService,
    private _storageService: StorageService,
    private _notificationService: NotificationsService,
    private _enrolledService: EnrolledService,
    private _mainService: MainService,
    private router: Router,
    private _paymentReceiptService: PaymentReceiptService,

  ) { }

  ngOnInit() {
    /**
   * Indica los permisos que sse van  a utilizar
   */
    this.enrolled = this._enrolledService.getenrolled();

    this.permissions = this._mainService.Permissions;
    this.currentRoute = this.router.url;
    this.buttonsOp.push(
      { name: 'Receipt', title: 'Recibo', secondTitle: null, icon: 'fa fa-clipboard fa-fw mr-2', method: 'Receipt', class: 'btn btn-sm btn-pill btn-outline-primary', condition: null, parameter: null, specialCondition: false }
    );

    /**
       * 
       */
    this.paymentListForm = this.formBuilder.group({
      term: ['', []],
      page: [1, []],
      limit: [10, []]
    });

    this.searchData = {
      term: this.term.value,
      page: this.page.value,
      limit: this.limit.value,
      enrolled_id: this.enrolled.id
    };

    this.storageSub = this._storageService.watch().pipe(debounceTime(500)).subscribe((token: any) => {
      if (token) {
        this.searchPayment();
      }
    });

    this.ngOnChanges();
  }



  ngOnChanges() {
    this.paymentListForm.valueChanges.subscribe((form: any) => {
      this.searchData = {
        term: form.term,
        page: form.page,
        limit: form.limit,
        enrolled_id: this.enrolled.id
      };
    });

  }

  get term() {
    return this.paymentListForm.get('term');
  }

  get page() {
    return this.paymentListForm.get('page');
  }

  get limit() {
    return this.paymentListForm.get('limit');
  }

  search = () => {
    this.progressSearch = 0;
    this.searchPayment().then(() => this.progressSearch = false);
  }

  reset = () => {
    this.paymentListForm.reset();
    this.term.setValue('');
    this.page.setValue(1);
    this.limit.setValue(10);
    this.payments = [];
    this.search();
  }

  async searchPayment() {
    this.payments = [];
    this.loadControl = 0;
    return await this._enrolledService.getPaymentEnrolled(this.searchData).then((response: any) => {
      this.loadControl = 1;
      this.payments = response;
    });
  }

  pageChange = (page: number) => {
    this.page.setValue(page);
    this.search();
  }

  selectionOptions(parameters: any = null) {
    switch (parameters.parameters.method) {
      case 'Receipt':
        this.generatePDF(parameters.object);
        //this.updateenrolled(parameters.object);
        break;
      default:
        break;
    }
  }

  /**
     * Abre el modal seteando el componente enrolledCreateComponent
     */
  createPaymentModal = () => {
    this._enrolledService.setenrolled(this.enrolled);
    this._modalService.open({
      component: PaymentCreateComponent,
      title: 'Registro de un nuevo aporte',
      size: 'modal-xl'
    });
  }


  /**
   * Genera el recibo de los pagos realizados por cada estudiante
   * @param payment 
   */
  generatePDF(payment: any) {
    this._paymentReceiptService.generatePDF(payment);
  }




  ngOnDestroy() {
    this.storageSub.unsubscribe();
  }
}
