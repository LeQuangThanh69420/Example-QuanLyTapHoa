import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { CategoryCreateOrEditInputDto } from '../_Dto/CategoryCreateOrEditInputDto';
import { ProductSearchInputDto } from '../_Dto/ProductSearchInputDto';
import { ProductCreateOrEditInputDto } from '../_Dto/ProductCreateOrEditInputDto';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  //User

  login(username: string, password: string) {
    return this.http.post<any>(this.apiUrl + "User/login", 
    {
      "username": username,
      "password": password
    });
  }

  //Category

  GetCategory() {
    return this.http.get<any[]>(this.apiUrl + "Category/GetCategory");
  }

  CreateOrEditCategory(input: CategoryCreateOrEditInputDto) {
    return this.http.post<any>(this.apiUrl + "Category/CreateOrEditCategory", input);
  }

  DeleteCategory(categoryId: number) {
    return this.http.delete<any>(this.apiUrl + "Category/DeleteCategory?CategoryId=" + categoryId);
  }

  //Product

  getProductUnitOfMeasure() {
    return this.http.get<any[]>(this.apiUrl + "Product/getProductUnitOfMeasure");
  }

  getProductUnitOfCurrency() {
    return this.http.get<any[]>(this.apiUrl + "Product/getProductUnitOfCurrency");
  }

  getProductStatus() {
    return this.http.get<any[]>(this.apiUrl + "Product/getProductStatus");
  }

  SearchProduct(input: ProductSearchInputDto) {
    return this.http.get<any[]>(this.apiUrl + "Product/SearchProduct" + 
                                              "?ProductName=" + input.productName + 
                                              "&QuantityFrom=" + input.quantityFrom + 
                                              "&QuantityTo=" + input.quantityTo + 
                                              "&UnitOfMeasure=" + input.unitOfMeasure + 
                                              "&Status=" + input.status + 
                                              "&DateFrom=" + input.dateFrom + 
                                              "&DateTo=" + input.dateTo + 
                                              "&CategoryId=" + input.categoryId);
  }

  CreateOrEditProduct(input: ProductCreateOrEditInputDto) {
    return this.http.post<any>(this.apiUrl + "Product/CreateOrEditProduct", input);
  }

  DeleteProduct(productId: number) {
    return this.http.delete<any>(this.apiUrl + "Product/DeleteProduct?ProductId=" + productId);
  }
}
