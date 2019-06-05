import {Component, OnInit} from "@angular/core";
import {Subject, Subscription} from "rxjs";
import {UserModel} from "../../../model/user.model";
import {AuthService} from "../../../service/auth.service";
import {UserService} from "../../../service/user.service";
import {Role} from '../../../model/role.model';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  public isAdmin = false;
  public isAdminChanged = new Subject<boolean>();
  public user;
  public userId;
  private users: UserModel[];
  private usersChanged = new Subject<UserModel[]>();
  private subscription: Subscription;
  constructor(private authService: AuthService,
              private userService: UserService) { }

  public ngOnInit() {
    this.userService.getAllUsers();
    this.subscription = this.userService.usersChanged
      .subscribe((users: UserModel[]) => {
        this.users = users;
      });
    this.getUserID();
  }
  public getUserID() {
    this.authService.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.checkUserAdmin(user.uid);
      }
    });
  }
  public checkUserAdmin(id: string) {
    if (this.authService.isAdmin(id)) {
      this.isAdmin = true;
    }
  }
  public checkAdmin(): boolean {
    if (this.isAdmin) {
      return true;
    } else {
      return false;
    }
  }
  public UpdateUser(index: number, userid: string) {
    this.authService.afAuth.authState.subscribe((user) => {
      if (user.uid !== userid) {
        this.userService.UpdateUser(index).subscribe((response: JSON) => {
          this.userService.getAllUsers();
          this.subscription = this.userService.usersChanged
            .subscribe((users: UserModel[]) => {
              this.users = users;
              this.usersChanged.next(this.users.slice());
            });
        });
      } else {
        alert("You can't demote yourself, stupid");
      }
    });
  }
  public isUserAdmin(role: Role) {
    if (role === Role.User) {
      return true;
    } else {
      return false;
    }
  }
  public deleteUser(index: number, userid: string) {
    this.authService.afAuth.authState.subscribe((user) => {
      if (user.uid !== userid) {
        this.userService.deleteUser(index).subscribe((response: JSON) => {
              console.log(response);
              this.authService.deleteUser(userid);
        });
      } else {
        alert("You can't delete yourself, stupid");
      }
    });
  }
}
