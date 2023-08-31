import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-work-bar',
  templateUrl: './work-bar.component.html',
  styleUrls: ['./work-bar.component.css']
})
export class WorkBarComponent implements OnInit{
  apiUrl: string = environment.apiUrl;
  categorys: any[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.http.get<any[]>(this.apiUrl + "Category/getList").subscribe( response => {
      this.categorys = response;
    }, error => {
      console.log(error);
    })
  }

}
