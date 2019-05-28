import {Portfolio} from './portfolio.model';

export class Document {
  public id?: number;
  public name?: string;
  public data?: string;
  public portfolio?: Portfolio;
}
