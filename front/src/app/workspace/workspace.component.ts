import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../_service/controller.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoryCreateOrEditInputDto } from '../_Dto/CategoryCreateOrEditInputDto';
import { ProductSearchInputDto } from '../_Dto/ProductSearchInputDto';
import { TableService } from '../_service/table.service';
import { ProductCreateOrEditInputDto } from '../_Dto/ProductCreateOrEditInputDto';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  constructor(private controllerService: ControllerService, private tableService: TableService, private toastr: ToastrService, private router: Router) {

  }

  ngOnInit(): void {
    this.refreshCategory();
    this.getCategory();
    this.getProductUnitOfMeasure();
    this.getProductUnitOfCurrency();
    this.getProductStatus();
    this.refreshProductSearch();
    this.searchProduct();
    this.refreshProduct();
  }

  categories: any[];
  categoryIndex: number = 0;
  categoryCreateOrEditInputDto: CategoryCreateOrEditInputDto;

  getCategory() {
    this.controllerService.GetCategory().subscribe(
      respone => {
        this.categories = respone;
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  sendCategory(i: number, category: any) {
    this.categoryIndex = i;
    this.categoryCreateOrEditInputDto.categoryId = category.categoryId;
    this.categoryCreateOrEditInputDto.categoryName = category.categoryName;
  }

  createOrEditCategory() {
    if (this.categoryCreateOrEditInputDto.categoryName == null || this.categoryCreateOrEditInputDto.categoryName == "") {
      this.toastr.error("Some field are required!");
      return;
    }
    this.controllerService.CreateOrEditCategory(this.categoryCreateOrEditInputDto).subscribe(
      respone => {
        this.toastr.success(respone.message);
        this.ngOnInit();
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  deleteCategory(categoryId: number) {
    if (confirm("Are you sure?") == true) {
      this.controllerService.DeleteCategory(categoryId).subscribe(
        respone => {
          this.toastr.success(respone.message);
          this.ngOnInit();
        },
        error => {
          this.toastr.error(error.error.message);
        }
      );
    }
  }

  refreshCategory() {
    this.categoryIndex = 0;
    this.categoryCreateOrEditInputDto = new CategoryCreateOrEditInputDto();
  }

  ProductUnitOfMeasure: string[];
  getProductUnitOfMeasure() {
    this.controllerService.getProductUnitOfMeasure().subscribe(
      respone => {
        this.ProductUnitOfMeasure = respone;
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  ProductUnitOfCurrency: string[];
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

  ProductStatus: string[];
  getProductStatus() {
    this.controllerService.getProductStatus().subscribe(
      respone => {
        this.ProductStatus = respone;
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  products: any[];
  productSearchInputDto: ProductSearchInputDto;
  productCreateOrEditInputDto: ProductCreateOrEditInputDto;

  searchProduct() {
    this.controllerService.SearchProduct(this.productSearchInputDto).subscribe(
      respone => {
        this.products = respone;
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  refreshProductSearch() {
    this.productSearchInputDto = new ProductSearchInputDto();
    this.searchProduct();
  }

  sendProduct(product: any) {
    this.productCreateOrEditInputDto.productId = product.productId;
    this.productCreateOrEditInputDto.productName = product.productName;
    this.productCreateOrEditInputDto.quantity = product.quantity;
    this.productCreateOrEditInputDto.unitOfMeasure = product.unitOfMeasure;
    this.productCreateOrEditInputDto.unitPrice = product.unitPrice;
    this.productCreateOrEditInputDto.unitOfCurrency = product.unitOfCurrency;
    this.productCreateOrEditInputDto.status = product.status;
    this.productCreateOrEditInputDto.date = product.date;
    this.productCreateOrEditInputDto.categoryId = product.categoryId;
  }

  createOrEditProduct() {
    if (this.productCreateOrEditInputDto.productName == null || this.productCreateOrEditInputDto.productName == "") {
      this.toastr.error("Some field are required!");
      return;
    }
    this.controllerService.CreateOrEditProduct(this.productCreateOrEditInputDto).subscribe(
      respone => {
        this.toastr.success(respone.message);
        this.ngOnInit();
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  deleteProduct() {
    if (confirm("Are you sure?") == true) {
      this.controllerService.DeleteProduct(this.productCreateOrEditInputDto.productId).subscribe(
        respone => {
          this.toastr.success(respone.message);
          this.ngOnInit();
        },
        error => {
          this.toastr.error(error.error.message);
        }
      );
    }
  }

  refreshProduct() {
    this.productCreateOrEditInputDto = new ProductCreateOrEditInputDto();
  }

}
