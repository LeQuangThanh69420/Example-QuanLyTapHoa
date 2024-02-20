import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environment/environment';
import { ControllerService } from '../_service/controller.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  apiUrl: string = environment.apiUrl;
  safeURL: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer, private controllerService: ControllerService, private toastr: ToastrService) {
  }

  year: number = new Date().getFullYear();

  ngOnInit() {
    this.createURL();
    this.getProductUnitOfCurrency();
  }

  createURL() {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.apiUrl + "Stat/getCashChart?Year=" + this.year + "&UnitOfCurrency=" + this.unitOfCurrency);
  }

  ProductUnitOfCurrency: string[];
  unitOfCurrency: string = "VND";
  getProductUnitOfCurrency() {
    this.controllerService.getProductUnitOfCurrency().subscribe(
      respone => {
        this.ProductUnitOfCurrency = respone;
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }
    
}
