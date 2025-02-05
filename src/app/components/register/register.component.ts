import {HttpClient} from "@angular/common/http";
import {Component} from "@angular/core";
import {Role} from "../../model/role.model";
import {UserModel} from "../../model/user.model";
import {AuthService} from "../../service/auth.service";
import {ApiurlService} from '../../service/apiurl.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  private user: UserModel;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private apiurlService: ApiurlService) {
  }

  public registerUser(username, email, password) {
    this.user = new UserModel();
    this.authService.register(email, password).then(() => {
      this.user.username = username;
      this.user.email = email;
      this.user.id = this.authService.getUser().uid;
      this.user.role = Role.USER;
      console.log(this.user);
      this.http.post(`${this.apiurlService.API_URL}Users/`, this.user).subscribe((result: JSON) => {
        // tslint:disable-next-line:no-console
        console.log(result);
      });
    });
  }

}
