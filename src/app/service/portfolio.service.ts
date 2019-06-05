import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Portfolio} from "../model/portfolio.model";
import {AuthService} from "./auth.service";

@Injectable()
export class PortfolioService {
  public portfoliosChanged = new Subject<Portfolio[]>();
  public portfolios: Portfolio[] = [];
  public newPortfolio: Portfolio;
  public startedEditing = new Subject<number>();
  private API_URL_LIVE = "https://tomcat.teun-school.nl/BackendPortfolio/Portfolio/";
  private API_URL_DEV = "http://localhost:8081/Portfolio/";
  constructor(private http: HttpClient,
              private auth: AuthService) {}
  public getPortfoliosById() {
    // Use http to connect to backend.
    // Gets the Portfolios by UserModel ID of the user that is logged in with Firebase.
    this.http.get(`${this.API_URL_LIVE}AllByUID/` + this.auth.getUser().uid)
      .subscribe((response: Portfolio[]) => {
        this.portfolios = response;
        this.portfoliosChanged.next(this.portfolios.slice());
      });
  }
  public getPortfolio(index: number) {
    return this.portfolios[index];
  }
  public addPortfolioById(portfolio: Portfolio) {
    // Create a portfolio
    this.portfolios.splice(0, 0, portfolio);
    this.portfoliosChanged.next(this.portfolios.slice());
    return this.http.post(`${this.API_URL_LIVE}AddByUID`,  portfolio);
  }
  public deletePortfolioById(index: number) {
    // Delete a portfolio
    this.newPortfolio = this.portfolios[index];
    console.log(this.newPortfolio);
    this.portfolios.splice(index, 1);
    this.portfoliosChanged.next(this.portfolios.slice());
    return this.http.delete(`${this.API_URL_LIVE}DeleteByUID/` + this.newPortfolio.id);
  }
  public updatePortfolioById(index: number, portfolio: Portfolio) {
    // Update a portfolio
    this.deletePortfolioById(index);
    return this.addPortfolioById(portfolio);
  }

}
