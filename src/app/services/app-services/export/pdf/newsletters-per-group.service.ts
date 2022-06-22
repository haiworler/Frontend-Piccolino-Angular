import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { logoPiccolinoBase64 } from '../images/logoPiccolinoBase64.js';
import { logoPBase64 } from '../images/logoPBase64.js';
import { logoNBase64 } from '../images/logoNBase64.js';

import "jspdf-barcode";
/**
 * 
 */
import jsPDF from 'jspdf'

@Injectable({
  providedIn: 'root'
})
export class NewslettersPerGroupService {

  positionX: number = 0;
  positionY: number = 0;
  doc: any = {};

  constructor() { }

  /**
* En la libreria el primeri Item representa X y el segundo Y.
* 
*/
  async generatePDF(data: any,cut:any) {
    this.positionY = 0;
    this.positionX = 0;
    this.doc = new jsPDF('l');
    data.forEach(boletin => {
      this.doc.setFont("times", "normal");

      this.positionY = 0;
      this.doc.setDrawColor(0);
      this.doc.setFillColor(255, 255, 255);
      //Ancho X - Largo Y
      this.doc.roundedRect(4, 4, 290, 40, 3, 3, 'FD');// Cuadro principal en la presentación
      this.doc.addImage(logoPBase64, "JPEG", 5, 7, 30, 30); //Imagen Izquierda

      this.doc.addImage(logoNBase64, "JPEG", 270, 7, 20, 30); //Imagen Derecha
      // Cuadro Nombre fundación
      this.doc.roundedRect(31, 5, 237, 5, 1, 1, 'FD');// CUadro principal en la presentación
      // Titulo del documento
      this.doc.setFontSize(10);// Tamaño de letra
      this.doc.text("BOLETÍN ACADÉMICO", 126, 9);
      // Cuadro Nombre Escuela
      this.doc.setDrawColor(0);
      this.doc.roundedRect(31, 11, 237, 7, 1, 1);// Cuadro para el nombre de la escuela
      // Nombre escuela
      this.doc.setFontSize(18);// Tamaño de letra
      this.doc.text('FUNDACIÓN PICCOLINO', 108, 17);

      this.doc.roundedRect(31, 18, 237, 9, 1, 1);// Cuadro para la descripción del informe escolar
      // ------------------Texto de de descripción del informe
      this.doc.setFontSize(9);// Tamaño de letra
      this.doc.text(`Informe de rendimiento escolar - año:  ${boletin.semester.start_date.substring(0, 4)}. Para efectos de validación de la información, puede consultar en la pagina de la fundación`, 53, 22);
      this.doc.text(`www.fundacionpiccolino.com. ingresar con su usuario para validar las notas`, 85, 25);
      // Cuadro nombre de la sede
      // Inicio X, Inicio y, Ancho x, Largo en Y
      this.doc.roundedRect(31, 27, 80, 8, 1, 1);// Cuadro para la descripción del informe escolar
      // --------------------Nombre escuela
      this.doc.setFontSize(7);// Tamaño de letra
      this.doc.text(`SEDE:`, 32, 30);
      this.doc.setFontSize(12);// Tamaño de letra
      this.doc.text(`${boletin.headquarter.name}`, 33, 33);
      // --------------------Jornada
      // Inicio X, Inicio y, Ancho x, Largo en Y
      this.doc.roundedRect(111, 27, 22, 8, 1, 1);// Cuadro para la descripción del informe escolar
      this.doc.setFontSize(7);// Tamaño de letra
      this.doc.text(`JORNADA:`, 112, 30);// Nombre jornada
      this.doc.setFontSize(12);// Tamaño de letra
      this.doc.text(`Domingos`, 113, 33);// Nombre jornada
      // --------------------Grupo
      // Inicio X, Inicio y, Ancho x, Largo en Y
      this.doc.roundedRect(133, 27, 21, 8, 1, 1);// Cuadro para la descripción del informe escolar
      this.doc.setFontSize(7);// Tamaño de letra
      this.doc.text(`GRADO:`, 134, 30);// Nombre jornada
      this.doc.setFontSize(12);// Tamaño de letra
      this.doc.text(`${boletin.grade.code}`, 135, 33);// Nombre jornada
      // --------------------Periodo(Semestre)
      // Inicio X, Inicio y, Ancho x, Largo en Y
      this.doc.roundedRect(154, 27, 27, 8, 1, 1);// Cuadro para la descripción del informe escolar
      this.doc.setFontSize(7);// Tamaño de letra
      this.doc.text(`PERÍODO:`, 155, 30);// Nombre jornada
      this.doc.setFontSize(12);// Tamaño de letra
      this.doc.text(`${boletin.semester.code}`, 156, 33);// Nombre jornada
      // --------------------AÑO
      // Inicio X, Inicio y, Ancho x, Largo en Y
      this.doc.roundedRect(181, 27, 15, 8, 1, 1);// Cuadro para la descripción del informe escolar
      this.doc.setFontSize(7);// Tamaño de letra
      this.doc.text(`Año:`, 182, 30);// Nombre jornada
      this.doc.setFontSize(12);// Tamaño de letra
      this.doc.text(`${boletin.semester.start_date.substring(0, 4)}`, 183, 33);// Nombre jornada

      // --------------------MAtricula
      // Inicio X, Inicio y, Ancho x, Largo en Y
      this.doc.roundedRect(196, 27, 72, 8, 1, 1);// Cuadro para la descripción del informe escolar
      this.doc.setFontSize(7);// Tamaño de letra
      this.doc.text(`Matrícula:`, 197, 30);// Nombre jornada
      this.doc.setFontSize(12);// Tamaño de letra
      this.doc.text(`No.  ${this.padToFour(boletin.id)}  del ${boletin.created_at.substring(0, 10)}`, 197, 33);// Nombre jornada
      // ---------------------IDentificación
      // Inicio X, Inicio y, Ancho x, Largo en Y
      this.doc.roundedRect(31, 35, 80, 8, 1, 1);// Cuadro para la descripción del informe escolar
      // --------------------Nombre escuela
      this.doc.setFontSize(7);// Tamaño de letra
      this.doc.text(`IDENTIFICACIÓN: ${boletin.people.type_document.name}`, 32, 38);
      this.doc.setFontSize(12);// Tamaño de letra
      this.doc.text(`No. ${boletin.people.document_number}`, 33, 42);

      // ---------------------Nombre Estudiante
      // Inicio X, Inicio y, Ancho x, Largo en Y
      this.doc.roundedRect(111, 35, 80, 8, 1, 1);// Cuadro para la descripción del informe escolar
      // --------------------Nombre escuela
      this.doc.setFontSize(7);// Tamaño de letra
      this.doc.text(`ESTUDIANTE:`, 112, 38);
      this.doc.setFontSize(12);// Tamaño de letra
      this.doc.text(`${boletin.people.names} ${boletin.people.surnames}`, 113, 42);

      // ---------------------Director de grupo
      // Inicio X, Inicio y, Ancho x, Largo en Y
      this.doc.roundedRect(191, 35, 77, 8, 1, 1);// Cuadro para la descripción del informe escolar
      // --------------------Nombre escuela
      this.doc.setFontSize(7);// Tamaño de letra
      this.doc.text(`DIRECTOR DE GRUPO:`, 193, 38);
      this.doc.setFontSize(12);// Tamaño de letra
      this.doc.text(`${boletin.groups[0].people.names} ${boletin.groups[0].people.surnames}`, 194, 42);

      //------------------------------------------------------------------------------------------------------------------
      // Cuadro divisor de notas
      this.doc.roundedRect(4, 45, 290, 12, 3, 3);
      // Indicaciones de notas
      this.doc.setFontSize(9);// Tamaño de letra
      this.doc.text(`AREAS`, 7, 50);
      this.doc.setFontSize(10);// Tamaño de letra
      this.doc.text(`ASIGNATURAS`, 20, 53);
      this.doc.setFontSize(12);// Tamaño de letra
      this.doc.setFont("courier", "bolditalic");
      this.doc.text(`LOGROS`, 50, 56);
      this.doc.setFont("helvetica", "bold");

      this.doc.setFontSize(11);// Tamaño de letra
      this.doc.text(`CORTE`, 208, 50);
      this.doc.text(`${cut.id}`, 214, 55);

      this.doc.text(`NOTA`, 228, 50);
      this.doc.text(`VALORACIÓN`, 257, 50);
      this.doc.text(`NACIONAL`, 260, 55);

      //-----------------------------------------NOTAS-----------------------------------------------
      this.assignY(56);
      this.assignX(4);
      boletin.notes.forEach(note => {
        /**
         * Nombre de la asignatura
         */
        this.doc.setFont("helvetica", "bold");
        this.doc.setFontSize(11);// Tamaño de letra
        this.assignY(8);
        this.validatePage();
        this.doc.text(`${note.subject_name.substring(0, 25)}`, (this.positionX + 1), this.positionY);

        this.doc.text(`${note.note}`, 233, this.positionY);// Nota
        this.doc.text(`${this.ratingNote(note.note)}`, 262, this.positionY);// Nota letras rango

        /**
         * Observaciones de cada nota
         */
        this.doc.setFontSize(5);// Tamaño de letra
        this.doc.text((this.positionX + 60), ((note.observations.length >= 500) ? (this.positionY - 5) : (this.positionY - 2)), this.doc.splitTextToSize(note.observations.substring(0, 600), 155));
        this.doc.setFontSize(12);// Tamaño de letra

        /**
        * Linea Horizontal 1
         */
        this.assignY(1);
        this.validatePage();
        this.doc.line(this.positionX, this.positionY, 292, this.positionY);
        // -----------COMPETENCIAS

        note.note_competitions.forEach(competition => {
          this.assignY(5);
          this.validatePage();
          this.doc.text(`${competition.competencie_name.substring(0, 25)}`, (this.positionX + 7), this.positionY);
          this.doc.text(`${competition.note}`, 233, this.positionY);// Nota
          this.doc.text(`${this.ratingNote(competition.note)}`, 262, this.positionY);// Nota letras rango
          /**
        * Linea Horizontal 1
         */
          this.assignY(1);
          this.validatePage();
          this.doc.line(this.positionX + 7, this.positionY, 292, this.positionY);
        });
      });

      this.assignY(15);
      this.validatePage();
      this.doc.line(this.positionX, this.positionY, 292, this.positionY);
      // Observaciones
      this.doc.setFont("helvetica", "bold");
      this.doc.setFontSize(11);// Tamaño de letra
      this.assignY(4);
      this.validatePage();
      this.doc.text(`OBSERVACIONES`, this.positionX, this.positionY);
      this.assignY(3);
      this.validatePage();
      this.doc.line(this.positionX, this.positionY, 292, this.positionY);
      // Firmas
      this.assignY(43);
      this.assignY(2);

      this.validatePage();
      this.doc.setFont("helvetica", "bold");
      this.doc.setFontSize(12);// Tamaño de letra
      this.doc.text(`Firma Coordinador(A) Académico`, 50, this.positionY);

      this.doc.setFont("times", "normal");
      this.doc.text(`${boletin.groups[0].people.names} ${boletin.groups[0].people.surnames}`, 170, ((this.positionY == 0) ? this.assignY(5) : this.positionY - 5));

      this.doc.setFont("helvetica", "bold");
      this.doc.setFontSize(12);// Tamaño de letra
      this.doc.text(`Firma Director(A) de grupo`, 170, this.positionY);

      //-----------------------------------------NOTAS-----------------------------------------------

      this.doc.addPage();
    });


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
    if (this.positionY >= 210) {
      this.doc.addPage();
      this.positionY = 7;
    }
  }
  padToFour(number) { if (number <= 999999) { number = ("00000" + number).slice(-6); } return number; }

  ratingNote(note) {
    var noteInt = parseInt(note);
    if (noteInt < 3) {
      return 'BAJO';
    }
    if (noteInt == 3 || (noteInt > 3 && noteInt <= 3.8)) {
      return 'BÁSICO';
    }
    if (noteInt > 3.8 && noteInt <= 4.5) {
      return 'ALTO';
    }
    if (noteInt >= 4.6) {
      return 'SUPERIOR';
    }
  }

}
