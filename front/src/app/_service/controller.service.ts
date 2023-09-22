import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { CategoryOutputGetDto } from '../_Dto/CategoryDto/CategoryOutputGetDto';
import { ProductInputPostDto } from '../_Dto/ProductDto/ProductInputPostDto';
import { ProductOutputGetDto } from '../_Dto/ProductDto/ProductOutputGetDto';
import { ProductInputGetDto } from '../_Dto/ProductDto/ProductInputGetDto';
import { AccountLoginInputDto } from '../_Dto/Account/AccountLoginInputDto';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  //Account
  register() {
    
  }

  login(accountLoginInputDto: AccountLoginInputDto) {
    return this.http.post<any>(this.apiUrl + "Account/login", accountLoginInputDto);
  }

  //Category
  getCategoryList() {
    return this.http.get<CategoryOutputGetDto[]>(this.apiUrl + "Category/getCategoryList");
  }

  //Product
  getProductList(productInputGetDto: ProductInputGetDto) {
    return this.http.get<ProductOutputGetDto[]>(this.apiUrl +
      "Product/getProductList" + 
      "?ProductNameFilter=" + productInputGetDto.productNameFilter +
      "&Status=" + productInputGetDto.status +
      "&DateInFrom=" + productInputGetDto.dateInFrom +
      "&DateInTo=" + productInputGetDto.dateInTo +
      "&DateOutFrom=" + productInputGetDto.dateOutFrom +
      "&DateOutTo=" + productInputGetDto.dateOutTo +
      "&CategoryId=" + productInputGetDto.categoryId
    );
  }

  createOrEditProduct(productInputPostDto: ProductInputPostDto) {
    return this.http.post<any>(this.apiUrl + "Product/createOrEditProduct", productInputPostDto);
  }

  deleteProduct(productInputPostDto: ProductInputPostDto) {
    return this.http.delete<any>(this.apiUrl + "Product/deleteProduct?id=" + productInputPostDto.productId)
  }
}
