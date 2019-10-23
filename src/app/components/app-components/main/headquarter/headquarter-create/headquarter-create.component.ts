import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { HeadquarterService } from '@services/app-services/headquarter.service';


@Component({
  selector: 'app-headquarter-create',
  templateUrl: './headquarter-create.component.html',
  styles: []
})
export class HeadquarterCreateComponent implements OnInit {


	headquarterCreateForm: FormGroup;

	userData: any;
	countryID: number;

	progress: boolean | number = false;
	dependences: any;
	headquarter: any;

  constructor() { }

  ngOnInit() {
  }

}
