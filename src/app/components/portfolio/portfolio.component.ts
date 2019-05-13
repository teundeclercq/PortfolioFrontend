import { Component, OnInit } from '@angular/core';
import {PortfolioModel} from '../../model/portfolio.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  private portfolios: PortfolioModel[] = [];
  constructor() { }

  ngOnInit() {
    this.portfolios.push(new PortfolioModel("kaas", "kees", "content", "linkje"));
    this.portfolios.push(new PortfolioModel("kaas", "kees", "content", "linkje"));

    this.portfolios.push(new PortfolioModel("kaas", "kees", "content", "linkje"));
    this.portfolios.push(new PortfolioModel("kaas", "kees", "content", "linkje"));
    this.portfolios.push(new PortfolioModel("kaas", "kees", "content", "linkje"));
    this.portfolios.push(new PortfolioModel("kaas", "kees", "content", "linkje"));
  }

}
