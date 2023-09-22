import { Component, OnInit } from '@angular/core';
import { CategoryOutputGetDto } from 'src/app/_Dto/CategoryDto/CategoryOutputGetDto';
import { ControllerService } from 'src/app/_service/controller.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categorys: CategoryOutputGetDto[];

  constructor(private controllerService: ControllerService) {
  }

  ngOnInit() {
    this.getCategoryList();
  }

  getCategoryList() {
    this.controllerService.getCategoryList().subscribe( response => {
      this.categorys = response;
    }, error => {
      console.log(error);
    })
  }
}
