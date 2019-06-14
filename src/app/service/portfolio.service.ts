import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Portfolio} from "../model/portfolio.model";
import {AuthService} from "./auth.service";
import {ApiurlService} from './apiurl.service';

@Injectable()
export class PortfolioService {
  public portfoliosChanged = new Subject<Portfolio[]>();
  public portfolios: Portfolio[] = [];
  public newPortfolio: Portfolio;
  public startedEditing = new Subject<number>();

  constructor(private http: HttpClient,
              private auth: AuthService,
              private apiurlService: ApiurlService) {}
  public getPortfoliosById() {
    // Use http to connect to backend.
    // Gets the Portfolios by UserModel ID of the user that is logged in with Firebase.
    this.http.get(`${this.apiurlService.API_URL}Portfolio/AllByUID/` + this.auth.getUser().uid)
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
    return this.http.post(`${this.apiurlService.API_URL}Portfolio/AddByUID`,  portfolio);
  }
  public deletePortfolioById(index: number) {
    // Delete a portfolio
    this.newPortfolio = this.portfolios[index];
    this.portfolios.splice(index, 1);
    this.portfoliosChanged.next(this.portfolios.slice());
    console.log(this.newPortfolio);
    this.http.delete(`${this.apiurlService.API_URL}Portfolio/DeleteByUID/${this.newPortfolio.id}`).subscribe((response) => { console.log(response); });
  }
  public updatePortfolioById(index: number, portfolio: Portfolio) {
    // Update a portfolio
    this.deletePortfolioById(index);
    return this.addPortfolioById(portfolio);
  }

}
