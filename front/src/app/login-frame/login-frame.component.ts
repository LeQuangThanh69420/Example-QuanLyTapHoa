import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControllerService } from '../_service/controller.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-frame',
  templateUrl: './login-frame.component.html',
  styleUrls: ['./login-frame.component.css']
})
export class LoginFrameComponent implements OnInit {

  constructor(private controllerService: ControllerService, private toastr: ToastrService, private router: Router) {
  }


  currentUser: string | null;
  ngOnInit() {
    this.currentUser = window.localStorage.getItem("user");
  }

  username: string;
  password: string;
  logIn() {
    this.controllerService.login(this.username, this.password).subscribe(
      respone => {
        this.toastr.success("Welcome" + respone.currentUser);
        window.localStorage.setItem("user", respone.currentUser);
        this.currentUser = window.localStorage.getItem("user");
        this.router.navigateByUrl("/workspace");
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  logOut() {
    this.currentUser = null;
    localStorage.removeItem("user");
    this.router.navigateByUrl("/");
  }

}


