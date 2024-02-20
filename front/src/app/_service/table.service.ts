import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { 
  }
  
  selectItem(items: HTMLCollectionOf<Element> , i: number) {
    for (let j = 0; j < items.length; j++) {
      items[j].classList.remove("selected");
    }
    items[i].classList.add("selected");
  }

  clearItem(items: HTMLCollectionOf<Element>) {
    for (let j = 0; j < items.length; j++) {
      items[j].classList.remove("selected");
    }
  }

}