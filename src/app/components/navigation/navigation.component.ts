import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public userId;
  public isAdmin;
  constructor(private authService: AuthService, private router: Router) { }
  public userLoggedIn() {
    return this.authService.isLoggedIn;
  }
  ngOnInit() {
    this.getUserID();
  }
  public getUserID() {
    this.authService.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.checkAdmin(user.uid);
      }
    });
  }
  public checkAdmin(id: string) {
    if (this.authService.isAdmin(id)) {
      return this.isAdmin = true;
    } else {
      return this.isAdmin = false;
    }
  }
  public checkIsAdmin(): boolean {
    if (this.isAdmin) {
      return true;
    } else {
      return false;
    }
  }
  public logoutUser() {
    this.authService.logout().then(
      () => this.router.navigate(["login"]));
  }
}
