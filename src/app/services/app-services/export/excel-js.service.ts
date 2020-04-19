import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as logoFile from './logo.js';
import { DatePipe } from './../../../../../node_modules/@angular/common';



@Injectable({
  providedIn: 'root'
})
export class ExcelJSService {
  /**
   * Cabecera del archivo
   */
  title: string = 'Informe';
  header: any = ["Colum1", "Colum2"]
  name: string = 'Informe';
  footer: string = null;
  worksheetname: string = 'Hoja 1';

  constructor(private datePipe: DatePipe) { }

  setTitle = (title: string) => this.title = title;
  setHeader = (header: any) => this.header = header;
  setName = (name: any) => this.name = name;
  setFooter = (footer: string) => this.footer = footer;
  setWorksheetname = (worksheetname: string) => this.worksheetname = worksheetname;





  generateExcel(data: any) {
    //Crear libro de trabajo y hoja de trabajo
    let workbook = new Workbook();//Libro
    let worksheet = workbook.addWorksheet(this.worksheetname);// Hoja
    worksheet.mergeCells('C1', 'I2');
    worksheet.getCell('E1').value = this.title;
    worksheet.getCell('E1').fill = {
      type: 'gradient',
      gradient: 'path',
      center: { left: 0.5, top: 0.5 },
      stops: [
        { position: 0, color: { argb: 'FF75EAFF' } },
        { position: 1, color: { argb: 'CCFFCC' } }
      ]
    };

    worksheet.getCell('F1', 'I2').alignment = { horizontal: 'center' };//{ wrapText: true };
    worksheet.getCell('C3').value = 'Fecha : ' + this.datePipe.transform(new Date(), 'medium');
    worksheet.mergeCells('C3', 'D3');
    //Añadir fila y formato
    // let titleRow = worksheet.addRow([this.title]);

    // titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true }
    worksheet.addRow([]); // Agrega un fila -----
    // let subTitleRow = worksheet.addRow(['Fecha : ' + this.datePipe.transform(new Date(), 'medium')])
    //Add Image
    let logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });
    worksheet.addImage(logo, 'A1:B3');
    worksheet.mergeCells('A1:B3');
    /**
     * Fila en blanco
     */
    worksheet.addRow([]);
    /**
     * Añadir fila de encabezado
     */
    let headerRow = worksheet.addRow(this.header);
    /**
     * Estilo de celda : Relleno y borde
     */
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF52FF5E' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })
    // worksheet.addRows(data);
    /**
     * Añadir datos y formato condicional
     */
    data.forEach(d => {
      let row = worksheet.addRow(d);
      let qty = row.getCell(5);
      let color = 'FF99FF99';
      // if (+qty.value < 500) { // es papa colocar el color
      //   color = 'FF9999'
      // }
      // qty.fill = {
      //   type: 'pattern',
      //   pattern: 'solid',
      //   fgColor: { argb: color }
      // }
    }
    );
    /**
     * Le da un tamaño por defecto a las columnas |
     */
    let contador = 1;
    this.header.forEach(element => {
      worksheet.getColumn(contador).width = 20;
      contador++;
    });
    // worksheet.getColumn(1).width = 20;
    // worksheet.getColumn(2).width = 20;
    // worksheet.getColumn(3).width = 20;
    // worksheet.getColumn(4).width = 20;
    // worksheet.getColumn(5).width = 20;
    // worksheet.getColumn(6).width = 20;

    worksheet.addRow([]);
    //Footer Row
    if (this.footer) {
      let footerRow = worksheet.addRow([this.footer]);
      footerRow.getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFCCFFE5' }
      };
      footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      //Combinar celdas
      worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
    }

    //Generar Archivo de Excel con nombre dado
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, `${this.name}_${new Date().getTime()}.xlsx`);
    })
  }

  addFooter(worksheet: Workbook) {

  }
}
