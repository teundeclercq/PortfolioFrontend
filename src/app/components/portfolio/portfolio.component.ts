import {Component, OnChanges, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {PortfolioModel} from "../../model/portfolio.model";
import {AuthService} from "../../service/auth.service";
import {PortfolioService} from "../../service/portfolio.service";

@Component({
  selector: "app-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.css"],
})
export class PortfolioComponent implements OnInit, OnChanges {
  private portfolios: PortfolioModel[];
  private subscription: Subscription;
  constructor(private portfolioService: PortfolioService) { }

  public ngOnInit() {
    // this.portfolioService.getPortfoliosById();
    // this.subscription = this.portfolioService.portfoliosChanged
    //   .subscribe((portfolios: PortfolioModel[]) => {
    //     this.portfolios = portfolios;
    //   });
  }
  public onDeletePortfolio(index: number) {
    this.portfolioService.deletePortfolioById(index).subscribe((response) => {
      console.log(response);
    });
  }
  public onEditPortfolio(index: number) {
    this.portfolioService.startedEditing.next(index);
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
  public ngOnChanges() {
  }
}
