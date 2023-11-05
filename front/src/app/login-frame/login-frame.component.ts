import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControllerService } from '../_service/controller.service';
import { AccountLoginInputDto } from '../_Dto/Account/AccountLoginInputDto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-frame',
  templateUrl: './login-frame.component.html',
  styleUrls: ['./login-frame.component.css']
})
export class LoginFrameComponent implements OnInit {

  constructor(private controllerService: ControllerService, private toastr: ToastrService, private router: Router) {
  }

  account: AccountLoginInputDto = new AccountLoginInputDto();
  currentUser = "";

  ngOnInit() {
    const storedCurrentUser = window.localStorage.getItem("currentUser");
    if (storedCurrentUser) {
      this.currentUser = storedCurrentUser;
    }
  }

  longIn() {
    this.controllerService.login(this.account).subscribe(response => {
      this.currentUser = response.currentUser;
      window.localStorage.setItem("currentUser", this.currentUser);
    }, error => {
      if(error.status == 400) {
        error.error.errors.Username = error.error.errors.Username ?? "";
        error.error.errors.Password = error.error.errors.Password ?? "";
        this.toastr.error(error.error.errors.Username + " " + error.error.errors.Password);
      }
      else {
        this.toastr.error(error.error);
      }
      //alert(error.error);
    });
  }

  logOut() {
    this.account = new AccountLoginInputDto();
    this.currentUser = "";
    localStorage.removeItem("currentUser");
    this.router.navigateByUrl("/");
  }

}


