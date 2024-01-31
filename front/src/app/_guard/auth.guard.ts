// import { CanActivateFn, CanActivate } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   canActivate(): Observable<boolean> {}
//   return true;
// };

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private toastr: ToastrService, private router: Router) {}
  
  canActivate() { 
    const user = window.localStorage.getItem('user');
    if (!user) {
      // Nếu user không tồn tại, chuyển hướng về trang 'home'
      this.router.navigate(['/home']);
      this.toastr.error("Login require!");
      return false;
    }
    // Nếu user tồn tại, cho phép truy cập vào route 'workspace'
    return true;
  }
  
}