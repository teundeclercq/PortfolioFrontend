import {UserModel} from './user.model';

export class Portfolio {
  public id?: number;
  public title?: string;
  public subtitle?: string;
  public portfolioImage?: string;
  public description?: string;
  public user?: UserModel;
}
