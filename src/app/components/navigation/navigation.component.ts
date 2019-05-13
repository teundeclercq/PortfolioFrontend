import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  public userLoggedIn() {
    return this.authService.isLoggedIn;
  }
  ngOnInit() {
  }
  public logoutUser() {
    this.authService.logout().then(
      () => this.router.navigate(['login']));
  }
}
