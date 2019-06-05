import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule} from "@angular/common/http";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import {firebaseConfig} from "./app-firebase.module";
import {AppRoutingModule} from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import {PortfolioEditComponent, PortfolioEditOverviewComponent} from "./components/portfolio/portfolio-edit/portfolio-edit.component";
import { PortfolioComponent } from "./components/portfolio/portfolio.component";
import {AuthService} from "./service/auth.service";
import {PortfolioService} from "./service/portfolio.service";
import {UserGuard} from "./service/user.guard";
import { UsersComponent } from './components/admin/users/users.component';
import { DocumentsComponent } from './components/admin/documents/documents.component';
import {RegisterComponent} from './components/register/register.component';
import {UserService} from './service/user.service';
import {DocumentService} from './service/document.service';
import {AdminGuard} from './service/admin.guard';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    ContactComponent,
    NavigationComponent,
    LoginComponent,
    PortfolioEditComponent,
    PortfolioEditOverviewComponent,
    UsersComponent,
    DocumentsComponent,
    RegisterComponent,
  ],
  entryComponents: [PortfolioEditComponent, PortfolioEditOverviewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    NgbCollapseModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService, UserGuard, PortfolioService, UserService, DocumentService, AdminGuard],
})
export class AppModule { }
