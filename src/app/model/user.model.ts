import {Role} from "./role.model";

export class UserModel {
  public id: string;
  public username: string;
  public email: string;
  public role: Role;
  constructor() { }
}
