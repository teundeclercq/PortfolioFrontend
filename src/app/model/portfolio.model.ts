import {UserModel} from './user.model';
import {Document} from './document.model';

export class Portfolio {
  public id?: number;
  public title?: string;
  public subtitle?: string;
  public portfolioImage?: string;
  public description?: string;
  public user?: UserModel;
  public document?: Document;
}
