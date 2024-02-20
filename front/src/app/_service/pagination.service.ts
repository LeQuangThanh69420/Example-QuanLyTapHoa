import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { 
  }

  pagination(list: any[], page: number, pageSize: number) {
    var newList: any[] = [];
    for(let i = pageSize*(page -1); i < pageSize*page; i++ ) {
      if(!list[i]) {
        break;
      }
      newList.push(list[i]);
    }
    return newList; 
  }
  
}
