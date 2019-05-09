import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {Observable, of} from 'rxjs';

@Injectable()
export class AuthService {
  public user: User;
  constructor(public afAuth: AngularFireAuth,
              public router: Router) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
      } else {
        localStorage.setItem("user", null);
      }
    });
  }
  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        // .then(() => this.router.navigate(["boekingen"]));
    } catch (e) {
      alert('Error!'  +  e.message);
    }
  }

  async register(email: string, password: string) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
        // .then(() => this.router.navigate(["boekingen"]));
    } catch (e) {
      alert("Error!" + e.message);
    }
  }

  async logout() {
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
