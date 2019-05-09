import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // addForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    // this.addForm = this.formBuilder.group({
    //   id: [],
    //   email: ["", Validators.required],
    //   password: ["", Validators.required],
    //   firstName: ["", Validators.required],
    //   lastName: ["", Validators.required],
    // });
  }
  async registerUser(username, password) {
    this.authService.register(username, password);
  }

}
