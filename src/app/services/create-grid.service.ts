import { Injectable } from '@angular/core';
import { ModelDTO } from '../model/ModelDTO';

@Injectable({
  providedIn: 'root'
})
export class CreateGridService {

  constructor() { }


  calculateGrid(model: ModelDTO, fields: any[]): any[][] {

    let maxRow: number = fields[fields.length - 1].rowNumber;

    let fieldMap: any[][] = [];

    for (let i = 1; i <= maxRow; i++) {
      fieldMap.push([]);

      for (let k = 1; k <= model.columnsNumber; k++) {
        fieldMap[i - 1].push(i + "." + k);
      }
    }

    for (let i = 0; i < fieldMap.length; i++) {
      let row: any[] = fieldMap[i];
      for (let k = 0; k < row.length; k++) {
        let findIndex: number = fields.findIndex(a => a.rowNumber == (i + 1) && a.columnNumber == (k + 1));

        if (findIndex > -1) {
          fieldMap[i][k] = fields[findIndex];
        } else {
          fieldMap[i][k] = undefined;
        }
      }
    }

    for (let i = fieldMap.length - 1; i >= 0; i--) {
      let row = fieldMap[i];

      let hasItems: boolean = false;
      for (let k = row.length - 1; k >= 0; k--) {
        if (fieldMap[i][k] == undefined) {
          continue;
        }
        hasItems = true;
        for (let q = (row[k].columnNumber + row[k].colspan - 1); q > row[k].columnNumber; q--) {
          if (fieldMap[i][q - 1] == undefined) {

            fieldMap[i].splice(q - 1, 1);
          }
        }

      }

      if (!hasItems) {
        fieldMap.splice(i, 1);
      }
    }

    return fieldMap;
  }
}
