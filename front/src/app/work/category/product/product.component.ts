import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInputGetDto } from 'src/app/_Dto/ProductDto/ProductInputGetDto';
import { ProductInputPostDto } from 'src/app/_Dto/ProductDto/ProductInputPostDto';
import { ProductOutputGetDto } from 'src/app/_Dto/ProductDto/ProductOutputGetDto';
import { ControllerService } from 'src/app/_service/controller.service';
import { TableService } from 'src/app/_service/table.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  readonly rows = document.getElementsByClassName("selectable") as HTMLCollectionOf<Element>;
  apiUrl: string = environment.apiUrl;
  categoryId = this.route.snapshot.paramMap.get('categoryId')

  products: ProductOutputGetDto[];
  productInputGetDto: ProductInputGetDto = new ProductInputGetDto();
  productInputPostDto: ProductInputPostDto = new ProductInputPostDto(this.categoryId);

  constructor(private http: HttpClient, private route: ActivatedRoute, private tableService: TableService, private controllerService: ControllerService) {
  }

  ngOnInit() {
    this.productInputGetDto.categoryId = this.categoryId;
    this.getProductList();
  }

  getProductList() {
    this.controllerService.getProductList(this.productInputGetDto).subscribe(response => {
      this.products = response;
    }, error => {
      console.log(error);
    })
  }

  createOrEditProduct() {
    this.controllerService.createOrEditProduct(this.productInputPostDto).subscribe(response => {
      this.getProductList();
      console.log(response);
      alert(response);
      this.productInputPostDto = new ProductInputPostDto(this.categoryId);
    }, (error) => {
      console.log(error);
      alert(error.error.title);
    })
  }

  deleteProduct() {
    if (confirm("Ban co chac muon xoa!!!!") == true) {
      this.controllerService.deleteProduct(this.productInputPostDto).subscribe(response => {
        this.getProductList();
        console.log(response);
        alert(response);
        this.productInputPostDto = new ProductInputPostDto(this.categoryId);
      }, error => {
        console.log(error);
        alert(error.message);
      })
    } else return;
  }

  truyen(product: ProductOutputGetDto, i: number) {
    this.tableService.selectTableRow(this.rows, i);
    this.productInputPostDto = product;
  }

  clearChoice() {
    this.tableService.clearTableChoice(this.rows);
    this.productInputPostDto = new ProductInputPostDto(this.categoryId);
  }

  onStatusChange(event: any) {
    this.productInputPostDto.status = event.target.value === 'true';
  }
}

