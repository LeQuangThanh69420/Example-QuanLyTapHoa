import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-frame',
  templateUrl: './login-frame.component.html',
  styleUrls: ['./login-frame.component.css']
})
export class LoginFrameComponent implements OnInit{

  constructor() {

  }

  account: any = {};
  curraccount: any = {};

  ngOnInit() {

  }

  longin() {
    console.log(this.account.taikhoan)
    this.curraccount.taikhoan = this.account.taikhoan;
  }

  logout() {
    this.curraccount.taikhoan = null;
  }

}


