import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import { Observable } from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class UserGuard implements CanActivate  {
  constructor(private authService: AuthService,
              private router: Router) {}
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      return this.router.parseUrl("login");
    }
  }
}
