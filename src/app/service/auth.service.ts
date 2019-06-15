import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {User} from "firebase";
import {UserModel} from '../model/user.model';
import {Observable, of, Subject} from 'rxjs';
import {Admin} from "../model/admin.model";
import {ApiurlService} from './apiurl.service';
@Injectable()
export class AuthService {
  public user: User;
  public allowedIdsChanged = new Subject<UserModel[]>();
  public allowedIds: UserModel [] = [
  ];
  constructor(public afAuth: AngularFireAuth,
              public router: Router,
              public http: HttpClient,
              private apiurlService: ApiurlService) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
      } else {
        localStorage.setItem("user", null);
      }
    });
  }
  public getAdmins() {
    return this.http.get(`${this.apiurlService.API_URL}User/roleAdmin/`).subscribe((response: UserModel[]) => {
      this.allowedIds = response;
      this.allowedIdsChanged.next(this.allowedIds.slice());
      console.log(this.allowedIds);
    });
  }
  public async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user = JSON.parse(localStorage.getItem("user"))) => {
          if (this.isAdmin(user.user.uid)) {
            this.router.navigate(["users"]);
          } else {
            this.router.navigate(["portfolio"]);
          }
        });
    } catch (e) {
      alert("Error!"  +  e.message);
    }
  }
  public  deleteUser(userId: string) {
    // nothing happens... yet..
  }
  public async register(email: string, password: string) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.router.navigate(["portfolio"]);
        });
    } catch (e) {
      alert("Error!" + e.message);
    }
  }
  public async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem("user");
  }
  public get isLoggedIn(): any {
    const  user  =  JSON.parse(localStorage.getItem("user"));
    return user !== null;
  }
  public getLoggedInStatus(): Observable<boolean> {
    if (this.user !== null) {
      return of(true);
    } else {
      return of(false);
    }
  }

  public getUser() {
    return this.afAuth.auth.currentUser;
  }
  public async isAdminLoggedIn() {
    await this.afAuth.authState.subscribe((user) => {
      if (this.isAdmin(user.uid)) {
        return true;
      } else {
        return false;
      }
    });
  }
  public isAdmin(id: string): boolean {
    return this.allowedIds.some((element) => {
      return (this.user && id === element.id);
    });
  }
}
