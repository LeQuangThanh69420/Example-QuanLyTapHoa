import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-work-table',
  templateUrl: './work-table.component.html',
  styleUrls: ['./work-table.component.css']
})
export class WorkTableComponent implements OnInit {
  apiUrl: string = environment.apiUrl;
  categoryId: string;
  products: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId')!;
    this.getList()
  }

  getList() {
    this.http.get(this.apiUrl + "Product/getList?ProductNameFilter=&Status=&DateInFrom=&DateInFrom=&CategoryId=" + this.categoryId).subscribe( response => {
      this.products = response;
    }, error => {
      console.log(error);
    })
  }

}
