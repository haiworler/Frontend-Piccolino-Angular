import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { logoPiccolinoBase64 } from '../images/logoPiccolinoBase64.js';
import "jspdf-barcode";
/**
 * 
 */
import jsPDF from 'jspdf'
//import * as jsPDF from 'jspdf'

@Injectable({
  providedIn: 'root'
})
export class LicensePlateNumberReportComponentService {

  positionX: number = 0;
  positionY: number = 0;
  doc: any = {};

  constructor() { }

  /**
* En la libreria el primeri Item representa X y el segundo Y.
* 
*/
  async generatePDF(data: any) {
    this.positionY = 0;
    this.positionX = 0;
    this.doc = new jsPDF();
    this.doc.addImage(logoPiccolinoBase64, "JPEG", 17, 12, 50, 25); //Imagen OET

    let fecha = new Date();


    this.doc.setFontSize(18);
    this.doc.text("INFORME DE MATRÍCULAS", 70, this.assignY(44));
    this.doc.text(`${data.headquarter.name}`, 75, this.assignY(14));

    //   this.doc.setFontSize(12);
    //   let textConditions = `El estudiante ${payment.enrolled.people.names} ${payment.enrolled.people.surnames} identificado con número de documento: ${payment.enrolled.people.document_number}.  ${((payment.enrolled.people.enabled) ? 'Hace' : 'Hizo')} parte de la fundación, y realizo un aporte al pago de su matrícula en la escuela. A continuación se especifican los detalles.`;
    //   var splitTitle = this.doc.splitTextToSize(textConditions, 160);
    //   this.doc.text(25, this.assignY(15), splitTitle);
    /**
     * Primera parte
     */
    this.assignY(20)
    this.doc.setLineWidth(1.5);
    /**
     * Linea Horizontal 1
     */
    this.doc.line(15, this.assignY(5), 195, this.positionY);
    /**
     * Linea vertical
     */
    this.doc.setLineWidth(1);
    //             x Y-arriba x   y-Abajo
    this.doc.line(15, 84, 15, 94); // Izquierda
    this.doc.line(80, 84, 80, 94); // Centro
    this.doc.line(195, 84, 195, 94); // Derecha

    /**
     * Linea
     */
    this.assignY(6)
    this.doc.setFontSize(14);
    this.doc.setFont("Helvetica", "bold")
    this.doc.text(`        MATRÍCULAS :                                            ${data.numberEnrolled}  `, 14, this.positionY);
    /**
     * Linea Horizontal 2
     */
    this.doc.line(15, this.assignY(5), 195, this.positionY);



    this.doc.setFontSize(12);
    this.doc.text(` ${fecha.getFullYear()}/${((fecha.getMonth() < 12) ? (fecha.getMonth() + 1) : fecha.getMonth())}/${fecha.getDate()}`, 150, this.assignY(15));



    /**
     * Imprimir
     */

    this.doc.autoPrint();
    this.doc.output('dataurlnewwindow');

  }

  assignX(position: number) {
    this.positionX = (this.positionX + position);
    return this.positionX;
  }
  assignY(position: number) {
    this.positionY = (this.positionY + position);
    return this.positionY;
  }

  validatePage() {
    if (this.positionY > 250) {
      this.doc.addPage();
      this.positionY = 0;
    }
  }
  padToFour(number) { if (number <= 999999) { number = ("00000" + number).slice(-6); } return number; }


}
