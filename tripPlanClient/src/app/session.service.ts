import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SessionService implements CanActivate {
  public token: string;
  public currentUser: Object;
  public traveler: Object;
  public request: Object;

  isAuth: EventEmitter<any> = new EventEmitter();

	BASE_URL: string = 'http://localhost:3000';

  constructor(
    private router: Router,
    private http: Http
  ) {
      // set token if saved in local storage
      this.token = localStorage.getItem('token');
      let userFromLocal = localStorage.getItem("user")
      this.currentUser = JSON.parse(userFromLocal);
      // console.log("In constructor in service user", userFromLocal);
      // console.log("In constructor in service token", this.token);
      if(this.token != null) {
        // console.log("true");
        this.isAuth.emit(true);
      } else {
        // console.log("false");
        this.isAuth.emit(false);
      }



  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      // logged in so return true\
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }

  isAuthenticated() {
    return this.token != null ? true : false;
  }

  setTraveller(travelerId) {
    console.log("setTraveller: ", travelerId)
    this.traveler = travelerId;
    console.log("setTraveller: after", travelerId)
  }

  getTraveller() {
    console.log("getTraveller: ", this.traveler)
    return this.traveler;
  }

  setRequest(requestId) {
    console.log("setTraveller: ", requestId)
    this.request = requestId;
    console.log("setRequest: after", requestId)
  }

  getRequest() {
    console.log("getRequest: ", this.request)
    return this.request;
  }

  signup(user) {
  	return this.http.post(`${this.BASE_URL}/signup`, user)
    .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        // console.log(response.json().user)
        if (token) {
          // set token property
          this.currentUser = response.json().user
          this.token = token;
          this.isAuth.emit(true);
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', token );
          localStorage.setItem('user', JSON.stringify(this.currentUser) );
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;

        }
  		})
  .catch((error) => Observable.throw(error));
  }

  login(user) {
    return this.http.post(`${this.BASE_URL}/login`, user)
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let token = response.json() && response.json().token;
            // console.log(response.json().user)
            if (token) {
              // set token property
              this.currentUser = response.json().user
              // console.log(this.currentUser)
              this.token = token;
              this.isAuth.emit(true);
              // store username and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('token', token );
              localStorage.setItem('user', JSON.stringify(this.currentUser) );
              // return true to indicate successful login
              return true;
            } else {
              // return false to indicate failed login
              return false;
            }
        })
        .catch((error) => Observable.throw(error));
  }


  logout() {
      // clear token remove user from local storage to log user out
      this.token = null;
      this.isAuth.emit(false);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
  }


  sendToken(){
    // console.log("sent from session")
    return this.http.post(`${this.BASE_URL}/sendToken`, {token: localStorage.getItem("token")})
    // .map((res) => res.json())
    // .map((res) => {
    //   console.log("receiving something")
  }
}
