import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { logoPiccolinoBase64 } from '../images/logoPiccolinoBase64.js';

/**
 * 
 */
import jsPDF from 'jspdf'
//import * as jsPDF from 'jspdf'

@Injectable({
  providedIn: 'root'
})
export class PeopleCertificateService {

  positionX: number = 0;
  positionY: number = 0;
  doc: any = {};

  constructor() { }

  /**
* En la libreria el primeri Item representa X y el segundo Y.
* 
*/
  async generatePDF(people: any) {
    this.positionY = 0;
    this.positionX = 0;
    this.doc = new jsPDF();
    this.doc.addImage(logoPiccolinoBase64, "JPEG", 17, 12, 50, 25); //Imagen OET

    let fecha = new Date();


    this.doc.setFontSize(18);
    this.doc.text("LA FUNDACIÓN PICCOLINO", 63, this.assignY(44));



    this.doc.text("CERTIFICA", 85, this.assignY(25));

    this.doc.setFontSize(12);
    let textConditions = `Que ${people.names} ${people.surnames} identificado con número de documento ${people.document_number}  ${((people.enabled) ? 'hace' : 'hizo')} parte de la fundación, prestando sus servicios con la mayor honradez y compromiso para con la comunidad. A su solicitud  se expide este certificado, dando a conocer  los distintos procesos y acompañamiento realizados.`;
    var splitTitle = this.doc.splitTextToSize(textConditions, 160);
    this.doc.text(25, this.assignY(15), splitTitle);

    let gestions: any[] = people.historys.filter((history: any) => {
      if (history.history_type_id == 1) {
        return history;
      }
    });

    if (gestions.length) {
      this.doc.setFontSize(12);
      this.doc.text("Acompañamientos:", 17, this.assignY(30));
      this.doc.line(15, this.assignY(5), 195, this.positionY);
      this.assignY(8)
      this.doc.setFontSize(12);
      this.doc.text("Proceso:", 22, this.positionY);
      this.doc.text("Horas:", 80, this.positionY);
      this.doc.text("Fecha de inicio:", 110, this.positionY);
      this.doc.text("Fecha de Finalización:", 150, this.positionY);
      this.doc.setFontSize(10);
      gestions.forEach((gestion: any) => {
        this.validatePage();
        this.assignY(5)
        this.doc.text(`${gestion.process}`, 22, this.positionY);
        this.doc.text(`${gestion.hours}`, 85, this.positionY);
        this.doc.text(`${gestion.start_date}`, 116, this.positionY);
        this.doc.text(`${gestion.end_date}`, 162, this.positionY);
      });
    }

    let positions: any[] = people.historys.filter((history: any) => {
      if (history.history_type_id == 2) {
        return history;
      }
    });

    if (positions.length) {
      this.doc.setFontSize(12);
      this.doc.text("Roles desempeñados:", 17, this.assignY(15));
      this.doc.line(15, this.assignY(5), 195, this.positionY);
      this.assignY(8)
      this.doc.setFontSize(12);
      this.doc.text("Rol:", 22, this.positionY);
      this.doc.text("A partir del:", 95, this.positionY);
      this.doc.text("Hasta el:", 165, this.positionY);
      this.doc.setFontSize(10);
      positions.forEach((position: any) => {
        this.validatePage();
        this.assignY(5);
        this.doc.text(`${((position.type_people) ? position.type_people.name : '')}`, 22, this.positionY);
        this.doc.text(`${position.start_date}`, 98, this.positionY);
        this.doc.text(`${position.end_date}`, 164, this.positionY);
      });
    }

    let subjects: any[] = people.historys.filter((history: any) => {
      if (history.history_type_id == 3) {
        return history;
      }
    });

    if (subjects.length) {
      this.doc.setFontSize(12);
      this.doc.text("Asignaturas Dictadas:", 17, this.assignY(15));
      this.doc.line(15, this.assignY(5), 195, this.positionY);
      this.assignY(8)
      this.doc.setFontSize(12);
      this.doc.text("Asignatura:", 22, this.positionY);
      this.doc.text("Semestre:", 80, this.positionY);
      this.doc.text("Fecha de inicio:", 110, this.positionY);
      this.doc.text("Fecha de Finalización::", 150, this.positionY);
      this.doc.setFontSize(10);
      subjects.forEach((subject: any) => {
        this.validatePage();
        this.assignY(5);
        this.doc.text(`${((subject.subject) ? subject.subject.name : '')}`, 22, this.positionY);
        this.doc.text(`${((subject.semester) ? subject.semester.code : '')}`, 84, this.positionY);
        this.doc.text(`${((subject.semester) ? subject.semester.start_date : '')}`, 116, this.positionY);
        this.doc.text(`${((subject.semester) ? subject.semester.end_date : '')}`, 162, this.positionY);
      });
    }







    this.doc.setFontSize(12);
    this.doc.text(`Se entrega el ${fecha.getFullYear()}/${((fecha.getMonth() < 12) ? (fecha.getMonth() + 1) : fecha.getMonth())}/${fecha.getDate()}`, 150, this.assignY(15));





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
}
