import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
/**
 * 
 */
import { IdentificationDocumentService } from '@services/app-services/configurations/documents/identification-document.service';

@Component({
  selector: 'app-identification-document-update',
  templateUrl: './identification-document-update.component.html',
  styles: [
  ]
})
export class IdentificationDocumentUpdateComponent implements OnInit {

  typeDocumentUpdateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  typeDocument: any;

  constructor(
    private formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _identificationDocumentService: IdentificationDocumentService
  ) { }

  ngOnInit(): void {
    this.typeDocument = this._identificationDocumentService.gettypeDocument();
    this.typeDocumentUpdateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: [null, [Validators.required]],
      })
    });
    this.basicData.patchValue(this.typeDocument);

  }

  get basicData() {
    return this.typeDocumentUpdateForm.get('basic_data');
  }

  UpdatetypeDocument = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();

    this._identificationDocumentService.update(this.typeDocument.id,basicData).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'El documento de identificación se ha actualizado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }


}
