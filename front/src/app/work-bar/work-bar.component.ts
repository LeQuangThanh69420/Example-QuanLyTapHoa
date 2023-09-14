import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../_service/controller.service';
import { CategoryOutputGetDto } from '../_Dto/CategoryDto/CategoryOutputGetDto';

@Component({
  selector: 'app-work-bar',
  templateUrl: './work-bar.component.html',
  styleUrls: ['./work-bar.component.css']
})
export class WorkBarComponent implements OnInit{
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
