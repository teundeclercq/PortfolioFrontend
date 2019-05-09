import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AboutComponent} from "./about/about.component";
import {ContactComponent} from "./contact/contact.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {PortfolioComponent} from "./portfolio/portfolio.component";
import {RegisterComponent} from "./register/register.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "home", component: HomeComponent},
  { path: "about", component: AboutComponent},
  { path: "contact", component: ContactComponent},
  { path: "portfolio", component: PortfolioComponent},
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "edit-user", component: EditUserComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // tslint:disable-next-line:object-literal-sort-keys
  exports: [RouterModule],
})
export class AppRoutingModule { }
