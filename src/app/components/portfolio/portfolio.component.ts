import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {PortfolioModel} from '../../model/portfolio.model';
import {AuthService} from '../../service/auth.service';
import {Subscription} from 'rxjs';
import {PortfolioService} from '../../service/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy, OnChanges {
  private portfolios: PortfolioModel[];
  private subscription: Subscription;
  constructor(private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.portfolioService.getPortfoliosById();
    this.subscription = this.portfolioService.portfoliosChanged
      .subscribe((portfolios: PortfolioModel[]) => {
        this.portfolios = portfolios;
      });
  }
  onDeletePortfolio(index: number) {
    this.portfolioService.deletePortfolioById(index).subscribe((response) => {
      console.log(response);
    });
  }
  onEditPortfolio(index: number) {
    this.portfolioService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnChanges() {
  }
}
