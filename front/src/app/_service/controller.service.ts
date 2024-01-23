import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { UserLoginInputDto } from '../_Dto/UserLoginInputDto';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  //User

  login(userLoginInputDto: UserLoginInputDto) {
    return this.http.post<any>(this.apiUrl + "User/login", userLoginInputDto);
  }

  //Category

  GetCategory(userLoginInputDto: UserLoginInputDto) {
    return this.http.post<any>(this.apiUrl + "User/login", userLoginInputDto);
  }

  CreateOrEditCategory(userLoginInputDto: UserLoginInputDto) {
    return this.http.post<any>(this.apiUrl + "User/login", userLoginInputDto);
  }

  DeleteCategory(userLoginInputDto: UserLoginInputDto) {
    return this.http.post<any>(this.apiUrl + "User/login", userLoginInputDto);
  }

  //Product

  getProductUnitOfMeasure(userLoginInputDto: UserLoginInputDto) {
    return this.http.post<any>(this.apiUrl + "User/login", userLoginInputDto);
  }

  getProductUnitOfCurrency(userLoginInputDto: UserLoginInputDto) {
    return this.http.post<any>(this.apiUrl + "User/login", userLoginInputDto);
  }

  getProductStatus(userLoginInputDto: UserLoginInputDto) {
    return this.http.post<any>(this.apiUrl + "User/login", userLoginInputDto);
  }

  SearchProduct(userLoginInputDto: UserLoginInputDto) {
    return this.http.post<any>(this.apiUrl + "User/login", userLoginInputDto);
  }

  CreateOrEditProduct(userLoginInputDto: UserLoginInputDto) {
    return this.http.post<any>(this.apiUrl + "User/login", userLoginInputDto);
  }

  DeleteProduct(userLoginInputDto: UserLoginInputDto) {
    return this.http.post<any>(this.apiUrl + "User/login", userLoginInputDto);
  }
}
