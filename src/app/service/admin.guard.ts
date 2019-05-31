import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }
  public canActivate(next: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    const  user  =  JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      if (this.authService.isAdmin(user.uid)) {
        return true;
      } else {
        return this.router.parseUrl("portfolio");
      }
    } else {
      return this.router.parseUrl("portfolio");
    }
  }
}
