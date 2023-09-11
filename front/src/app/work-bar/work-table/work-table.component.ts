import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInputGetDto } from 'src/app/_Dto/ProductDto/ProductInputGetDto';
import { ProductInputPostDto } from 'src/app/_Dto/ProductDto/ProductInputPostDto';
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

  products: ProductOutputGetDto[];
  productInputGetDto: ProductInputGetDto = new ProductInputGetDto();
  productInputPost: ProductInputPostDto = new ProductInputPostDto(this.route.snapshot.paramMap.get('categoryId'));

  constructor(private http: HttpClient, private route: ActivatedRoute, private tableService: TableService) {
  }

  ngOnInit() {
    this.productInputGetDto.categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.productInputPost.categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.getProductList();
  }

  getProductList() {
    this.http.get<ProductOutputGetDto[]>(this.apiUrl +
      "Product/getProductList?ProductNameFilter=" + this.productInputGetDto.productNameFilter +
      "&Status=" + this.productInputGetDto.status +
      "&DateInFrom=" + this.productInputGetDto.dateInFrom +
      "&DateInTo=" + this.productInputGetDto.dateInTo +
      "&DateOutFrom=" + this.productInputGetDto.dateOutFrom +
      "&DateOutTo=" + this.productInputGetDto.dateOutTo +
      "&CategoryId=" + this.productInputGetDto.categoryId
    ).subscribe(response => {
      this.products = response;
    }, error => {
      console.log(error);
    })
  }

  createOrEditProduct() {
    this.http.post(this.apiUrl + "Product/createOrEditProduct", this.productInputPost).subscribe(response => {
      console.log(response);
      this.getProductList();
      if (this.productInputPost.productId == null || this.productInputPost.productId == 0) {
        alert("Them thanh cong");
      }
      else {
        alert("Sua thanh cong");
      }
      this.productInputPost = new ProductInputPostDto(this.route.snapshot.paramMap.get('categoryId'));
    }, error => {
      console.log(error);
      alert(error.message);
    })
  }

  deleteProduct() {
    if (confirm("Ban co chac muon xoa!!!!") == true) {
      this.http.delete(this.apiUrl + "Product/deleteProduct?id=" + this.productInputPost.productId).subscribe(response => {
        console.log(response);
        this.getProductList();
        alert("Xoa thanh cong");
        this.productInputPost = new ProductInputPostDto(this.route.snapshot.paramMap.get('categoryId'));
      }, error => {
        console.log(error);
        alert(error.message);
      })
    } else return;
  }

  truyen(product: ProductOutputGetDto, i: number) {
    this.tableService.selectTableRow(this.rows, i);
    this.productInputPost = product;
  }

  clearChoice() {
    this.tableService.clearTableChoice(this.rows);
    this.productInputPost = new ProductInputPostDto(this.route.snapshot.paramMap.get('categoryId'));
  }

  onStatusChange(event: any) {
    this.productInputPost.status = event.target.value === 'true';
  }
}
