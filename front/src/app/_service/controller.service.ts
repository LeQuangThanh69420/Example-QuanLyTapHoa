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
  register() {
    
  }

  login(userLoginInputDto: UserLoginInputDto) {
    return this.http.post<any>(this.apiUrl + "User/login", userLoginInputDto);
  }

}
