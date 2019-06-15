import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {UserModel} from '../model/user.model';
import {Subject} from 'rxjs';
import {Role} from '../model/role.model';
import {ApiurlService} from './apiurl.service';

@Injectable()
export class UserService {
  public users: UserModel[] = [];
  public usersChanged = new Subject<UserModel[]>();
  public newUser: UserModel;
  constructor(private http: HttpClient,
              private auth: AuthService,
              private apiurlService: ApiurlService) {}
  public getAllUsers() {
    this.http.get(`${this.apiurlService.API_URL}User/All/` + this.auth.getUser().uid)
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
    return this.http.delete(`${this.apiurlService.API_URL}User/Delete/` + this.newUser.id);
  }
  public UpdateUser(index: number) {
    this.newUser = this.users[index];
    if (this.newUser.role === Role.ADMIN) {
      this.newUser.role = Role.USER;
    } else {
      this.newUser.role = Role.ADMIN;
    }
    this.usersChanged.next(this.users.slice());
    return this.http.put(`${this.apiurlService.API_URL}User/Update/`, this.newUser);
  }
  public removeUserFromAdminGroup(index: number) {
    this.newUser = this.users[index];
    this.users.splice(index, 1);
    this.usersChanged.next(this.users.slice());
    return this.http.delete(`${this.apiurlService.API_URL}User/Update/` + this.newUser.id);
  }
  public getUser(index: number) {
    return this.users[index];
  }
}
