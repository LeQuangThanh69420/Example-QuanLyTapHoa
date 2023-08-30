import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-work-bar',
  templateUrl: './work-bar.component.html',
  styleUrls: ['./work-bar.component.css']
})
export class WorkBarComponent implements OnInit{

  url: string = environment.apiUrl;
  categorys: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get(this.url + "Category/getCategory").subscribe( response => {
      this.categorys = response;
    })
  }

  
}
