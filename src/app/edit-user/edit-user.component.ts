import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // this.editForm = this.formBuilder.group({
    //   id: [""],
    //   email: ["", Validators.required],
    //   firstName: ["", Validators.required],
    //   lastName: ["", Validators.required],
    // });
    // this.apiService.getUserById(+userId)
    //   .subscribe( (data) => {});
  }
}
