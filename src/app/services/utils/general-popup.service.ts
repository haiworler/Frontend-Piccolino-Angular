import { Injectable } from '@angular/core';
import { ModalSizes } from '../../interfaces/own/general-popup/modalSizes.interface';
import { ModalSettings } from '../../interfaces/own/general-popup/modalSettings.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../components/shared/modal/modal.component';


@Injectable({
  providedIn: 'root'
})
export class GeneralPopupService {

  private modalSizes: ModalSizes;
  private dataForComponent: any;
  private shouldReload: boolean;
  
  constructor(private dialog: MatDialog) {
    this.modalSizes = this.defineModalSizes();
    this.dataForComponent = null;
    this.shouldReload = false;
  }
  

  /**
   * Tiene como objetivo establecer los datos que se pasarán al componente
   * @author Heiner Alejandro Gómez Montenegro
   * @param data - el objeto a pasar al componente
   * @returns void 
   */
  public setData(data: any): void {
    this.dataForComponent = data;
  }

  /**
   * Tiene como objetivo obtener los datos que se publicaron para el componente
   * @author Heiner Alejandro Gómez Montenegro
   * @param void
   * @returns data:any los datos publicados para el componente
   */
  public getData(): any {
    return this.dataForComponent;
  }

  /**
   * 
   */
  public setShouldReload(shouldReload: boolean): void {
    this.shouldReload = shouldReload;
  }

  public getShouldReload(): boolean {
    return this.shouldReload;
  }

  /**
   * Tiene como objetivo limpiar los datos publicados para el componente
   * @author Heiner Alejandro Gómez Montenegro
   * @param void 
   * @returns void
   */
  public resetData(): void {
    this.dataForComponent = null;
  }

  /**
   * Tiene como objetivo definir los posibles tamaños de los modales que se podrán utilizar
   * @author Heiner Alejandro Gómez Montenegro
   * @param void
   * @returns Arreglo con los posibles tamaños que tomará el modal
   */
  private defineModalSizes(): ModalSizes {
    return {
        'mini': {
          'width': '350px',
          'height': '350px'
        },
        'small': {
          'width': '500px',
          'height': '450px'
        },
        'medium': {
          'width': '50%',
          'height': '45%'
        },
        'big': {
          'width': '70%',
          'height': '70vh'
        },
        'full': {
          'width': '100vw',
          'height': '99vh'
        }
    };
  }

  /**
   * Tiene como objetivo lanzar/ejecutar el modal en base a la configuracion que se da por parametro 
   * @author Heiner Alejandro Gómez Montenegro
   * @param settings La configuración que se usará para presentar el modal
   * @returns void
   */
  public launchModal(settings: ModalSettings): MatDialogRef<ModalComponent, any> {
    const modalSize = this.modalSizes[settings.size];
    const { component, title, hasFooter, hasButtonCancel, hasButtonConfirm } = settings;
    const refDialog = this.dialog.open(ModalComponent, {
      width: modalSize.width,
      height: modalSize.height,
      data: {
        component,
        title,
        hasFooter, 
        hasButtonCancel,
        hasButtonConfirm
      }
    });
    return refDialog
  }

  /**
   * 
   */
  public closeModal(): void {
    this.dialog.closeAll();
  }
}
