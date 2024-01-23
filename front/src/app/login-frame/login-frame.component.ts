import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControllerService } from '../_service/controller.service';
import { UserLoginInputDto } from '../_Dto/UserLoginInputDto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-frame',
  templateUrl: './login-frame.component.html',
  styleUrls: ['./login-frame.component.css']
})
export class LoginFrameComponent implements OnInit {

  constructor(private controllerService: ControllerService, private toastr: ToastrService, private router: Router) {
  }

  user: UserLoginInputDto = new UserLoginInputDto();
  currentUser = "";

  ngOnInit() {
    const storedCurrentUser = window.localStorage.getItem("currentUser");
    if (storedCurrentUser) {
      this.currentUser = storedCurrentUser;
    }
  }

  longIn() {
    if(this.user.username == "" || this.user.username == null || this.user.username == undefined ||
      this.user.password == "" || this.user.password == null || this.user.password == undefined) {
        this.toastr.error("Account info unvalid");
        return;
    }
    this.controllerService.login(this.user).subscribe(response => {
      this.currentUser = response.currentUser;
      window.localStorage.setItem("currentUser", this.currentUser);
    }, error => {
      this.toastr.error(error.error.message);
    });
  }

  logOut() {
    this.user = new UserLoginInputDto();
    this.currentUser = "";
    localStorage.removeItem("currentUser");
    this.router.navigateByUrl("/");
  }

}


