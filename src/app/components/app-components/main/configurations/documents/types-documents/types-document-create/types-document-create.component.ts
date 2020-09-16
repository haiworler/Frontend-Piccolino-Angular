import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
/**
 * 
 */
import { TypesDocumentService } from '@services/app-services/configurations/documents/types-document.service';

@Component({
  selector: 'app-types-document-create',
  templateUrl: './types-document-create.component.html',
  styles: [
  ]
})
export class TypesDocumentCreateComponent implements OnInit {

  categoryDocumentCreateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  categoryDocument: any;

  constructor(
    private formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _typesDocumentService: TypesDocumentService
  ) { }

  ngOnInit(): void {
    this.categoryDocumentCreateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: [null, [Validators.required]],
      })
    });
  }

  get basicData() {
    return this.categoryDocumentCreateForm.get('basic_data');
  }

  createcategoryDocument = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();

    this._typesDocumentService.create(basicData).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'El tipo de documento se ha registrado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }


}
