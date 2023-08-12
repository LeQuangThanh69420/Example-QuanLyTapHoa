import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-frame',
  templateUrl: './login-frame.component.html',
  styleUrls: ['./login-frame.component.css']
})
export class LoginFrameComponent {
  constructor(private router: Router) {}
  displaySignUp() {
    this.router.navigate(['/SignUp']);
  }
}
