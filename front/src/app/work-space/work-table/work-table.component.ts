import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductOutputGetDto } from 'src/app/_Dto/ProductOutputGetDto';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-work-table',
  templateUrl: './work-table.component.html',
  styleUrls: ['./work-table.component.css']
})
export class WorkTableComponent implements OnInit {
  apiUrl: string = environment.apiUrl;
  categoryId: any;
  productsOutputGetDto: ProductOutputGetDto[];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId')!;
    this.getList();
  }

  getList() {
    this.http.get<ProductOutputGetDto[]>(this.apiUrl + "Product/getList?ProductNameFilter=&Status=&DateInFrom=&DateInFrom=&CategoryId=" + this.categoryId).subscribe( response => {
      this.productsOutputGetDto = response;
    }, error => {
      console.log(error);
    })
  }

}
