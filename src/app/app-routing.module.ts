import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AboutComponent} from "./components/about/about.component";
import {DocumentsComponent} from "./components/admin/documents/documents.component";
import {UsersComponent} from "./components/admin/users/users.component";
import {ContactComponent} from "./components/contact/contact.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {PortfolioComponent} from "./components/portfolio/portfolio.component";
import {RegisterComponent} from "./components/register/register.component";
import {UserGuard} from "./service/user.guard";
import {AdminGuard} from './service/admin.guard';
const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "home", component: HomeComponent},
  { path: "about", component: AboutComponent},
  { path: "contact", component: ContactComponent},
  { path: "portfolio", component: PortfolioComponent, canActivate: [UserGuard]},
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "documents", component: DocumentsComponent, canActivate: [AdminGuard]},
  { path: "users", component: UsersComponent, canActivate: [AdminGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // tslint:disable-next-line:object-literal-sort-keys
  exports: [RouterModule],
})
export class AppRoutingModule { }
