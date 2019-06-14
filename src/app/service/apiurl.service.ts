import {Component} from '@angular/core';

@Component({
  selector: "app-apiurl",
  templateUrl: "./apiurl.component.ts",
})
export class ApiurlComponent {
  private _API_URL_DEV: string = "http://localhost:8081/";
  private _API_URL_LIVE: string = "https://tomcat.teun-school.nl/BackendPortfolio/";
  get API_URL(): string {
    return this._API_URL_LIVE;
  }
}
