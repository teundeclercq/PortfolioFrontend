import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PortfolioService} from '../../../service/portfolio.service';
import {Observable, Observer, Subscription} from 'rxjs';
import {Portfolio} from '../../../model/portfolio.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from './DialogData';
import {AuthService} from '../../../service/auth.service';
import {NgForm} from '@angular/forms';
import {UserModel} from '../../../model/user.model';
import {Document} from '../../../model/document.model';

@Component({
  selector: 'app-portfolio-edit',
  templateUrl: './portfolio-edit.component.html',
  styleUrls: ['./portfolio-edit.component.css']
})
export class PortfolioEditComponent implements OnInit {
  public portfolios: Portfolio[] = [];
  private subscription: Subscription;
  private title: string;
  private subtitle: string;
  private content: string;

  constructor(private dialog: MatDialog,
              private portfolioService: PortfolioService) {
  }

  ngOnInit() {
    this.portfolioService.getPortfoliosById();
    this.subscription = this.portfolioService.portfoliosChanged
      .subscribe((portfolios: Portfolio[]) => {
        this.portfolios = portfolios;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PortfolioEditOverviewComponent, {
      width: '400px',
      data: {title: this.title, subtitle: this.subtitle, content: this.content},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  deletePortfolio(index: number) {
    this.portfolioService.deletePortfolioById(index)
      .subscribe((response) => { console.log(response); });
  }
}

@Component({
  selector: 'app-portfolio-edit-overview',
  templateUrl: './portfolio-edit-overview.component.html',
})
export class PortfolioEditOverviewComponent implements OnInit, OnDestroy {
  private editMode = false;
  private user: UserModel = new UserModel();
  private portfolio: Portfolio = new Portfolio();
  private document: Document = new Document();
  private subscription: Subscription;
  private editedPortolfioIndex: number;
  private editedPortfolio: Portfolio;
  private selectedFile: Blob = null;
  private base64textStringImage: string;
  private base64textStringDocument: string;

  constructor(private portfolioService: PortfolioService,
              private authService: AuthService,
              public dialogRef: MatDialogRef<PortfolioEditOverviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.portfolioService.startedEditing
      .subscribe((index: number) => {
        this.editedPortolfioIndex = index;
        this.editMode = true;
        this.editedPortfolio = this.portfolioService.getPortfolio(index);
      });
  }

  // unused function. No use for this at the moment.
  public dataFiletoBlob(dataFile): Observable<Blob> {
    return Observable.create((observer: Observer<Blob>) => {
      const byteString = window.atob(dataFile);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], {type: 'image/png'});
      observer.next(blob);
      observer.complete();
    });
  }

  // unused function. No use for this at the moment.
  public onDelete() {
    this.portfolioService.deletePortfolioById(this.editedPortolfioIndex);
    this.onClear();
  }

  // unused function. No use for this at the moment.
  public saveBlob(result: Blob) {
    this.selectedFile = result;
  }

  public onFileSelectedImage(event) {
    let files = event.target.files;
    let file = files[0];

    if (files && file) {
      let reader = new FileReader();
      reader.onload = this.handleFileImage.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  // unused function. No use for this at the moment.
  // public onFileSelectedDocument(event) {
  //   let files = event.target.files;
  //   let file = files[0];
  //
  //   if (files && file) {
  //     let reader = new FileReader();
  //     reader.onload = this.handleFileDocument.bind(this);
  //     reader.readAsBinaryString(file);
  //   }
  // }

  public handleFileImage(event) {
    let binaryString = event.target.result;
    this.base64textStringImage = btoa(binaryString);
    console.log(btoa(binaryString));
  }
  // Function to load in a file. It is not used at the moment.
  // public handleFileDocument(event) {
  //   let binaryString = event.target.result;
  //   this.base64textStringDocument = btoa(binaryString);
  //   console.log(btoa(binaryString));
  // }

  public onSubmit(form: NgForm) {
    this.portfolio.title = form.value.title;
    this.portfolio.subtitle = form.value.subtitle;
    this.portfolio.description = form.value.description;
    this.portfolio.portfolioImage = this.base64textStringImage;
    this.user.id = this.authService.getUser().uid;
    // these fields are not used at the moment. Maybe will be added later.
    // this.document.portfolio = this.portfolio;
    // this.document.data = this.base64textStringDocument;
    // this.document.name = form.value.file;
    // this.portfolio.document = this.document;
    this.portfolio.user = this.user;

    console.log(form);
    console.log(this.portfolio);
    if (this.editMode === true) {
      this.portfolioService.updatePortfolioById(this.editedPortolfioIndex, this.portfolio)
        .subscribe(() => {
          this.portfolioService.getPortfoliosById();
        });
    } else {
      this.portfolioService.addPortfolioById(this.portfolio)
        .subscribe((response) => {
          this.portfolioService.getPortfoliosById();
        }, (error) => console.error(error));
    }
  }

  public onClear() {
    this.editMode = false;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
