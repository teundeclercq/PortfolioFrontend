import {Injectable} from '@angular/core';

@Injectable()
export class ApiurlService {
  private _API_URL_DEV: string = "http://localhost:8081/";
  private _API_URL_LIVE: string = "https://tomcat.teun-school.nl/BackendPortfolio/";
  get API_URL(): string {
    return this._API_URL_DEV;
  }
}
