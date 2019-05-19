import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // addForm: FormGroup;
  constructor(private authService: AuthService,
              private http: HttpClient) { }

  ngOnInit() {

  }
  async registerUser(username, password) {
    this.authService.register(username, password).then(() => {
        let userid = this.authService.getUser().uid;
        console.log(userid);
        this.http.post("http://localhost:8081/User/AddUser/" , userid).subscribe((result: JSON) => {
          // tslint:disable-next-line:no-console
          console.log(result);
        });
    });
  }

}
