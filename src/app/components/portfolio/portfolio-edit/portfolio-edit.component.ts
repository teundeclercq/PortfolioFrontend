import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PortfolioService} from '../../../service/portfolio.service';
import {Subscription} from 'rxjs';
import {PortfolioModel} from '../../../model/portfolio.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-portfolio-edit',
  templateUrl: './portfolio-edit.component.html',
  styleUrls: ['./portfolio-edit.component.css']
})
export class PortfolioEditComponent implements OnInit, OnDestroy {
  @ViewChild('portfolioForm') private portfolioForm: NgForm;
  private subscription: Subscription;
  private editMode = false;
  private editedPortolfioIndex: number;
  private editedPortfolio: PortfolioModel;
  constructor(private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.subscription = this.portfolioService.startedEditing
      .subscribe((index: number) => {
        this.editedPortolfioIndex = index;
        this.editMode = true;
        this.editedPortfolio = this.portfolioService.getPortfolio(index);
        this.portfolioForm.setValue({
          title: this.editedPortfolio.title,
          subtitle: this.editedPortfolio.subtitle,
          image: this.editedPortfolio.image,
          content: this.editedPortfolio.content,
        });
      });
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newPortfolio = new PortfolioModel(value.id, value.title, value.subtitle, value.image, value.content);
    if (this.editMode === true) {
      this.portfolioService.updatePortfolioById(this.editedPortolfioIndex, newPortfolio)
        .subscribe(() => {
          this.portfolioService.getPortfoliosById();
          console.log(this.editMode);
        });
    } else {
      this.portfolioService.addPortfolioById(newPortfolio)
        .subscribe((response) => {
          this.portfolioService.getPortfoliosById();
        }, (error) =>
          console.error(error));
      console.log(newPortfolio);
    }
    form.reset();
  }
  onClear() {
    this.portfolioForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.portfolioService.deletePortfolioById(this.editedPortolfioIndex);
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
