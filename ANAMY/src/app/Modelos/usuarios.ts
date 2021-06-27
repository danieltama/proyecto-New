export class Usuarios {
  constructor(_d ='', username = '', password = ''){
    this._id = _d;
    this.username = username;
    this.password = password;
  }

  _id: String;
  username: String;
  password: String;
}
