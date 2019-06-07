import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Document} from '../model/document.model';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
@Injectable()
export class DocumentService {
  public documentsChanged = new Subject<Document[]>();
  public documents: Document[] = [];
  public newDocument: Document;
  public startedEditing = new Subject<number>();
  private API_URL_LIVE = "https://tomcat.teun-school.nl/BackendPortfolio/Document/";
  private API_URL_DEV = "http://localhost:8081/Document/";
  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  // Only for ADMIN
  public getAllDocuments() {
    // Get all the documents from the server
    this.http.get(`${this.API_URL_LIVE}All/` + this.auth.getUser().uid)
      .subscribe((response: Document[]) => {
        this.documents = response;
        this.documentsChanged.next(this.documents.slice());
      });
  }
  public getDocumentsByPortfolioId(id: number) {
    // Get all the documents from the server based on the userId.
    this.http.get(`${this.API_URL_LIVE}ByPortfolio/` + id)
      .subscribe((response: Document[]) => {
        this.documents = response;
        this.documentsChanged.next(this.documents.slice());
      });
  }
  // For admin && for user
  public addDocument(document: Document) {
    // Add a document to the server
    this.documents.splice(0, 0, document);
    this.documentsChanged.next(this.documents.slice());
    return this.http.post(`${this.API_URL_LIVE}Add/`, document);
  }
  // method for user to delete a specific document
  public deleteDocumentAsUser(index: number) {
    // Delete a document
    this.newDocument = this.documents[index];
    this.documents.splice(index, 1);
    this.documentsChanged.next(this.documents.slice());
    return this.http.delete(`${this.API_URL_LIVE}Delete/` + this.newDocument.id);
  }
  public updateDocument(index: number, document: Document) {
    // Update a document
    this.deleteDocumentAsUser(index);
    return this.addDocument(document);
  }
  public getDocument(index: number) {
    // Get a specific document
    return this.documents[index];
  }
}
