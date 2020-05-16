import {FormGroup,FormControl,FormArray,Validators,} from "@angular/forms";
import { Component, OnInit, Input } from "@angular/core";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { NotificationsService } from "@services/shared/notifications.service";
import { StorageService } from "@services/app-services/storage.service";
import swal from "sweetalert2";
import { ModalService } from "@services/shared/modal.service";

import { PeopleService } from '@services/app-services/people/people.service';


@Component({
  selector: 'app-form-people-general',
  templateUrl: './form-people-general.component.html',
  styles: []
})
export class FormPeopleGeneralComponent implements OnInit {

  people: any = [];

	@Input() form: FormGroup;
	@Input() title: string;
	@Input() typeDocuments: any[] = [];
	@Input() towns: any[] = [];
	@Input() neighborhoods: any = [];
	@Input() occupations: any[] = [];
	@Input() genders: any[] = [];
    dateMin:any = null;
	dependences:any;

  constructor(private _peopleService:PeopleService) { }

  async ngOnInit() {
	this.dependences = await this._peopleService.dependences();
	this.typeDocuments = this.dependences.typeDocuments;
	this.towns = this.dependences.towns;
	this.neighborhoods = this.dependences.neighborhoods;
	this.occupations = this.dependences.occupations;
	this.genders = this.dependences.genders;

  }

  get basicData() {
    return this.form.get('basic_data');
  }

}
