import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {UserModel} from '../model/user.model';
import {Subject} from 'rxjs';
import {Role} from '../model/role.model';

@Injectable()
export class UserService {
  public users: UserModel[] = [];
  public usersChanged = new Subject<UserModel[]>();
  public newUser: UserModel;
  private API_URL_LIVE = "https://tomcat.teun-school.nl/PortfolioBackend/User/";
  private API_URL_DEV = "http://localhost:8081/User/";
  private API_URL_DEV_ADMIN = "http://localhost:8081/Admin/";
  constructor(private http: HttpClient,
              private auth: AuthService) {}
  public getAllUsers() {
    this.http.get(`${this.API_URL_DEV}All/` + this.auth.getUser().uid)
      .subscribe((response: UserModel[]) => {
        this.users = response;
        this.usersChanged.next(this.users.slice());
      });
  }
  public deleteUser(index: number) {
    this.newUser = this.users[index];
    this.users.splice(index, 1);
    this.usersChanged.next(this.users.slice());
    console.log(this.newUser.id);
    return this.http.delete(`${this.API_URL_DEV}Delete/` + this.newUser.id);
  }
  public UpdateUser(index: number) {
    this.newUser = this.users[index];
    if (this.newUser.role === Role.Admin) {
      this.newUser.role = Role.User;
    } else {
      this.newUser.role = Role.Admin;
    }
    this.users.splice(index, 1);
    this.usersChanged.next(this.users.slice());
    return this.http.put(`${this.API_URL_DEV}Update/`, this.newUser);
  }
  public removeUserFromAdminGroup(index: number) {
    this.newUser = this.users[index];
    this.users.splice(index, 1);
    this.usersChanged.next(this.users.slice());
    return this.http.delete(`${this.API_URL_DEV_ADMIN}Update/` + this.newUser.id);
  }
  public getUser(index: number) {
    return this.users[index];
  }
}
