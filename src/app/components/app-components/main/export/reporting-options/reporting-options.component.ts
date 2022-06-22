import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

/**
 * 
 */
import { ExportService } from '@services/app-services/export/export.service';
import { ExcelJSService } from '@services/app-services/export/excel-js.service';
/**
 * COmponentes de vistas
 */
import { IncomeCostsAndExpensesComponent } from './../income-costs-and-expenses/income-costs-and-expenses.component';
import { LicensePlateNumberReportComponent } from './../license-plate-number-report/license-plate-number-report.component';
import { NewslettersPerGroupComponent } from './../newsletters-per-group/newsletters-per-group.component';

@Component({
  selector: 'app-reporting-options',
  templateUrl: './reporting-options.component.html',
  styles: [
  ]
})
export class ReportingOptionsComponent implements OnInit {

  heading = 'Reportes';
	subheading = 'Opciones';
	icon = 'fa fa-id-card icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';

  reportingOptionForm: FormGroup;

  userData: any;

  progress: boolean | number = false;


  constructor(
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _exportService: ExportService,
    private _excelJSService: ExcelJSService
  ) { }

  async ngOnInit() {
  }




  /**
	   * Abre el modal seteando el componente IncomeCostsAndExpensesComponent
	   */
   incomeCostsAndExpenses = () => {
		this._modalService.open({
			component: IncomeCostsAndExpensesComponent,
			title: 'INGRESOS, COSTOS Y GASTOS',
			size: 'modal-xl'
		});
	}

  licensePlateNumberReportComponent = () => {
		this._modalService.open({
			component: LicensePlateNumberReportComponent,
			title: 'MATRÍCULAS POR SEMESTRE',
			size: 'modal-xl'
		});
	}

  newslettersPerGroupReportComponent = () => {
		this._modalService.open({
			component: NewslettersPerGroupComponent,
			title: 'BOLETÍN POR GRUPO',
			size: 'modal-xl'
		});
	}

}
