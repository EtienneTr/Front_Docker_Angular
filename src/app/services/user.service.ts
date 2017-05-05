import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

//user
import { User } from "../models/user.model";

//RXJS methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private baseUrl = 'http://localhost:3003/api/';

  constructor(private http: Http){}

  create(user: User) {
    let createUrl = this.baseUrl + 'user/register';
    let bodyString = JSON.stringify({lastname: user.lastname, firstname: user.firstname, username: user.username, mail: user.mail, password: user.password});
    let headers    = new Headers({ 'Content-Type': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    return this.http.post(createUrl, bodyString, options).map((response: Response) => response.json());
  }

  getUser(username: string, token: string){
    let createUrl = this.baseUrl + 'user/' + username;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options    = new RequestOptions({ headers: headers });

    return this.http.get(createUrl, options).map((response: Response) => response.json());
  }

  updateUser(user: User, username: string){
    let createUrl = this.baseUrl + 'user/' + username;
    let bodyString = JSON.stringify({lastname: user.lastname, firstname: user.firstname, username: user.username, mail: user.mail});
    let headers    = new Headers({ 'Content-Type': 'application/json', 'x-access-token': user.token });
    let options    = new RequestOptions({ headers: headers });

    return this.http.put(createUrl, bodyString, options).map((response: Response) => response.json());
  }

  //Admin
  getAllUsers(token: string){
    let getUrl = this.baseUrl + 'admin/all';
    let headers    = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options    = new RequestOptions({ headers: headers });

    return this.http.get(getUrl, options).map((response: Response) => response.json());
  }

  deleteUser(userID: string, token: string){
    let getUrl = this.baseUrl + 'admin/user/' + userID;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options    = new RequestOptions({ headers: headers });

    return this.http.delete(getUrl, options).map((response: Response) => response.json());
  }

  deleteImage(imageID: string, token: string){
    let getUrl = this.baseUrl + 'admin/image/' + imageID;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options    = new RequestOptions({ headers: headers });

    return this.http.delete(getUrl, options).map((response: Response) => response.json());
  }

}
