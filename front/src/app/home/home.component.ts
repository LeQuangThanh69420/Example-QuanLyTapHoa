import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) {}
  getCategories:any;
  ngOnInit() {
    this.http.get("http://localhost:5235/api/getCategory").subscribe( response => { // response la luu dong du lieu cua ham get
      this.getCategories = response;
    });

  
  }
  
  apiService: ApiService;
  
}
