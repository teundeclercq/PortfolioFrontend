import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {User} from "firebase";
import {Observable, of} from "rxjs";

@Injectable()
export class AuthService {
  public user: User;
  constructor(public afAuth: AngularFireAuth,
              public router: Router,
              public http: HttpClient) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
      } else {
        localStorage.setItem("user", null);
      }
    });
  }
  public async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(() => this.router.navigate(["portfolio"]));
    } catch (e) {
      alert("Error!"  +  e.message);
    }
  }

  public async register(email: string, password: string) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
      alert("Error!" + e.message);
    }
  }
  public async sendUserCreds() {
    try {
      await this.http.post("http://localhost:8081/User/AddUser" , this.afAuth.auth.currentUser.uid).subscribe();
    } catch (e) {
      alert("error!" + e.message);
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
}
