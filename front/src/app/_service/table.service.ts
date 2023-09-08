import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }
  
  selectTableRow(rows: HTMLCollectionOf<Element> , i: number) {
    for (let j = 0; j < rows.length; j++) {
      rows[j].classList.remove("selected");
    }
    rows[i].classList.add("selected");
  }

  clearTableChoice(rows: HTMLCollectionOf<Element>) {
    for (let j = 0; j < rows.length; j++) {
      rows[j].classList.remove("selected");
    }
  }

}
