import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  input: string;
  weathers: any;


  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    this.http.get("http://localhost:5235/WeatherForecast").subscribe( response => {
      this.weathers = response;
    })
  }
  
  Chim() :void {
    alert(this.input);
  }
}
