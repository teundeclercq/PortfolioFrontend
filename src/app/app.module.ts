import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {AppRoutingModule} from './app-routing.module';
import {MatButtonModule, MatCardModule} from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {firebaseConfig} from './app-firebase.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthService} from './service/auth.service';
import {UserGuard} from './service/user.guard';
import { PortfolioEditComponent } from './components/portfolio/portfolio-edit/portfolio-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    ContactComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    PortfolioEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    NgbCollapseModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [AuthService, UserGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
