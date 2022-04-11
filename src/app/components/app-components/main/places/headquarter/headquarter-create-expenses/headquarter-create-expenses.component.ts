import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { HeadquarterService } from '@services/app-services/headquarter.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-headquarter-create-expenses',
  templateUrl: './headquarter-create-expenses.component.html',
  styles: [
  ]
})
export class HeadquarterCreateExpensesComponent implements OnInit {
  headquarterCostCreateForm: FormGroup;

  userData: any;
  countryID: number;

  progress: boolean | number = false;
  semester: any;
  semesters: any;
  headquarter: any;
  dependences: any;

  constructor(
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _headquarterService: HeadquarterService,
    public calendar: NgbCalendar
  ) { }

  async ngOnInit() {
    this.headquarter = this._headquarterService.getheadquarter();

    this.userData = this._mainService.getUserData();
    this.headquarterCostCreateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        value: ['', [Validators.required]],
        purchase_concept: ['', [Validators.required]],
        resources_generated_by: ['', [Validators.required]],
        invoice_url: ['', [Validators.required]],
        date: ['', [Validators.required]],
        semester: [[], [Validators.required]],
        observations: ['', [Validators.required]],
      })
    });
    this.dependences = await this._headquarterService.dependenceExpenses();
    this.semesters = this.dependences.semesters.map((obj: any) => { return { id: obj.id, name: obj.code }; });

  }

  get basicData() {
    return this.headquarterCostCreateForm.get('basic_data');
  }

  assignTodayDate = (control: FormControl) => control.setValue(this.calendar.getToday());
  addLeadingZeroes = (number: number) => (number < 10 ? `0${number}` : number);
  formatJsonDate = (date: any) => (`${date.year}-${this.addLeadingZeroes(date.month)}-${this.addLeadingZeroes(date.day)}`);

  createHeadquarterCost = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    const data = {
      value: basicData.value,
        purchase_concept: basicData.purchase_concept,
        resources_generated_by: basicData.resources_generated_by,
        invoice_url: basicData.invoice_url,
        date: basicData.date,
        semester_id: basicData.semester.id,
        observations: basicData.observations,
        headquarter_id: this.headquarter.id

    }
    this._headquarterService.createExpeneses(data).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'Gasto registrado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }

}
