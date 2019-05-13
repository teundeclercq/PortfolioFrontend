import {Injectable} from '@angular/core';
import {PortfolioModel} from '../model/portfolio.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PortfolioService {
  public portfolios: PortfolioModel[] = [];
  constructor(private http: HttpClient) {}


  // Use http to connect to backend.
  public getPortfolios() {
    // Get all portfolios
  }
  public createPortfolio() {
    // Create a portfolio
  }
  public deletePortfolio() {
    // Delete a portfolio
  }
  public updatePortfolio() {
    // Update a portfolio
  }

}
