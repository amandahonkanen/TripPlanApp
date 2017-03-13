import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { SessionService } from './session.service'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx'

@Injectable()
export class UserService {
  BASE_URL: string = 'http://localhost:3000/api';
  error: any;

  requests: Object;

  constructor(
    private http: Http,
    private SessionService: SessionService
  ) {

  }

  getList() {

    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/users`, options)
      .map((res) => res.json());
  }

  get(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/users/${id}`, options)
      .map((res) => res.json())
  }

  edit(user) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(`${this.BASE_URL}/users/${user.id}`, user, options )
      .map((res) => res.json());
  }

  remove(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(`${this.BASE_URL}/users/${id}`, options)
      .map((res) => res.json());
  }

  search(city) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/users/city?name=${city}`, options)
      .map((res) => res.json())
      .catch((err) => this.error = err)
  }


//Get new Request
   getRequest(requestId) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/request/${requestId}`, options)
      .map((res) => res.json())

  }

//Expert-details page -- request form
  booking(newRequest) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.BASE_URL}/request`, newRequest)
    .map((res) => res.json())
    .catch((err) => Observable.throw(err));
  }

//Request per User
  booked() {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/booked`, options)
      .map((response) => response.json())

  }


}
