import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PortfolioService} from '../../../service/portfolio.service';
import {Subscription} from 'rxjs';
import {PortfolioModel} from '../../../model/portfolio.model';
import {NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from './DialogData';

@Component({
  selector: 'app-portfolio-edit',
  templateUrl: './portfolio-edit.component.html',
  styleUrls: ['./portfolio-edit.component.css']
})
export class PortfolioEditComponent implements OnInit {


  private title: string;
  private subtitle: string;
  private content: string;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PortfolioEditOverviewComponent, {
      width: "250px",
      data: {title: this.title, subtitle: this.title, content: this.content},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }





}

@Component({
  selector: 'app-portfolio-edit-overview',
  templateUrl: './portfolio-edit-overview.component.html',
})
export class PortfolioEditOverviewComponent implements OnInit, OnDestroy {
  @ViewChild('portfolioForm') private portfolioForm: NgForm;
  private editMode = false;
  private subscription: Subscription;
  private editedPortolfioIndex: number;
  private editedPortfolio: PortfolioModel;
  constructor(private portfolioService: PortfolioService,
              public dialogRef: MatDialogRef<PortfolioEditOverviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.subscription = this.portfolioService.startedEditing
      .subscribe((index: number) => {
        this.editedPortolfioIndex = index;
        // this.editMode = true;
        this.editedPortfolio = this.portfolioService.getPortfolio(index);
        this.portfolioForm.setValue({
          title: this.editedPortfolio.title,
          subtitle: this.editedPortfolio.subtitle,
          image: this.editedPortfolio.image,
          content: this.editedPortfolio.content,
        });
      });
  }
  public onDelete() {
    this.portfolioService.deletePortfolioById(this.editedPortolfioIndex);
    this.onClear();
  }
  public onSubmit(form: NgForm) {
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
  public onClear() {
    this.portfolioForm.reset();
    this.editMode = false;
  }
  public onNoClick(): void {
    this.dialogRef.close();
  }
}
