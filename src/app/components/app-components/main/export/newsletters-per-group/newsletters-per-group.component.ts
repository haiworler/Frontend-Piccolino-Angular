import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { GeneralExportService } from '@services/app-services/export/general/generalExport.service';
import { NewslettersPerGroupService } from '@services/app-services/export/pdf/newsletters-per-group.service';

@Component({
  selector: 'app-newsletters-per-group',
  templateUrl: './newsletters-per-group.component.html',
  styles: [
  ]
})
export class NewslettersPerGroupComponent implements OnInit {

  newslettersPerGroupForm: FormGroup;

  userData: any;

  progress: boolean | number = false;
  group: any;
  dependences: any = [];
  semesters: any = [];
  groups: any = [];
  cuts: any = [];

  constructor(

    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _generalExportService: GeneralExportService,
    private _newslettersPerGroupService: NewslettersPerGroupService

  ) { }

  async ngOnInit() {

    this.userData = JSON.parse(localStorage.getItem('user'));
    this.newslettersPerGroupForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        semester: [null, [Validators.required]],
        group: [null, [Validators.required]],
        cut: [null, [Validators.required]],
      })
    });

    this.dependences = await this._generalExportService.getDependenciesForTheNewsletter();
    this.semesters = this.dependences.data.map((element: any) => { return { name: element.code, id: element.id, cuts: element.cuts, groups: element.groups } });
    this.ngOnChanges();

  }

  /**
* Observo lo que pase en e formulario
*/
  ngOnChanges() {
    this.newslettersPerGroupForm.valueChanges.subscribe((form: any) => {
      if (form.basic_data.semester) {
        this.cuts = form.basic_data.semester.cuts
        this.groups = form.basic_data.semester.groups
      }
    });

  }

  get basicData() {
    return this.newslettersPerGroupForm.get('basic_data');
  }


  async export() {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    const data = {
      semester_id: basicData.semester.id,
      cut_id: basicData.cut.id,
      group_id: basicData.group.id,
    }
    return await this._generalExportService.studentBulletins(data).then((response: any) => {
      this._storageService.setItem('token', localStorage.getItem('token'));
      if (response) {
        this.generatePDF(response,basicData.cut);
      } else {
        this._notificationService.warning({
          title: 'Información',
          message: 'No se encontro información.'
        });
      }
    }).catch((response: any) => {
      this.progress = false;
    });
  }


  generatePDF(data: any,cut: any) {
     this._newslettersPerGroupService.generatePDF(data,cut);
  }


}
