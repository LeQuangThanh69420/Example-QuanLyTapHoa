import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductOutputGetDto } from 'src/app/_Dto/ProductDto/ProductOutputGetDto';
import { TableService } from 'src/app/_service/table.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-work-table',
  templateUrl: './work-table.component.html',
  styleUrls: ['./work-table.component.css']
})
export class WorkTableComponent implements OnInit {
  apiUrl: string = environment.apiUrl;
  readonly rows = document.getElementsByClassName("selectable") as HTMLCollectionOf<Element>;

  productNameFilter = "";
  dateInFrom = "";
  dateInTo = "";
  categoryId: any;

  products: ProductOutputGetDto[];
  productPost: ProductOutputGetDto = new ProductOutputGetDto();

  constructor(private http: HttpClient, private route: ActivatedRoute, private tableService: TableService) {
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.getList();
  }

  getList() {
    this.http.get<ProductOutputGetDto[]>(this.apiUrl +
      "Product/getList?ProductNameFilter=" + this.productNameFilter +
      "&Status=" + "&DateInFrom=" + this.dateInFrom +
      "&DateInTo=" + this.dateInTo +
      "&CategoryId=" + this.categoryId
    ).subscribe(response => {
      this.products = response;
    }, error => {
      console.log(error);
    })
  }

  truyen(product: ProductOutputGetDto, i: number) {
    this.tableService.selectTableRow(this.rows, i);
    this.productPost = product;
  }

  clearChoice() {
    this.tableService.clearTableChoice(this.rows);
    this.productPost = new ProductOutputGetDto();
  }
}
