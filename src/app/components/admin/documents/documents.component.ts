import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  public isAdmin = false;
  public isAdminChanged = new Subject<boolean>()
  public user;
  public userId;
  constructor(private authService: AuthService) { }

  ngOnInit() {
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
}
