// import { CanActivateFn, CanActivate } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   canActivate(): Observable<boolean> {}
//   return true;
// };

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private toastr:ToastrService){}
  
  canActivate(): boolean { // Observable<boolean>
    return false;
  }
  
}