import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {User} from '../model/user.model';
import {Subject} from 'rxjs';

@Injectable()
export class UserService {
  public users: User[] = [];
  public usersChanged = new Subject<User[]>();
  public newUser: User;
  private API_URL_LIVE = "https://tomcat.teun-school.nl/PortfolioBackend/User/";
  private API_URL_DEV = "http://localhost:8081/User/";
  constructor(private http: HttpClient,
              private auth: AuthService) {}
  public getAllUsers() {
    this.http.get(`${this.API_URL_DEV}All/` + this.auth.getUser().uid)
      .subscribe((response: User[]) => {
        this.users = response;
        this.usersChanged.next(this.users.slice());
      });
  }
  public deleteUser(index: number) {
    this.newUser = this.users[index];
    this.users.splice(index, 1);
    this.usersChanged.next(this.users.slice());
    this.http.delete(`${this.API_URL_DEV}Delete/` + this.newUser.id);
  }
  public addUserToAdminGroup(user: User) {
    this.users.splice(0, 0, user);
    this.usersChanged.next(this.users.slice());
    return this.http.post(`${this.API_URL_DEV}Add/`, user);
  }
  public removeUserFromAdminGroup(index: number) {
    this.newUser = this.users[index];
    this.users.splice(index, 1);
    this.usersChanged.next(this.users.slice());
    return this.http.post(`${this.API_URL_DEV}Remove/`, this.newUser);
  }
  public getUser(index: number) {
    return this.users[index];
  }
}
