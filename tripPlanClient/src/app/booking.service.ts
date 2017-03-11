import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { SessionService } from './session.service'
import { UserService } from './user.service'
import 'rxjs/add/operator/map';
import { Response } from '@angular/http';

@Injectable()
export class BookingService {
  BASE_URL: string = 'http://localhost:3000/api';

  public request: Object;
  error: any;
  constructor(
    private http: Http,
    private SessionService: SessionService,
    private UserService: UserService

  ) {}


  getRequest(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/request/${id}`, options)
      .map((res) => res.json());
  }

  requestPost() {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/request`, options)
    .map((res) => res.json());
  }


  //   .map((response: Response) => {
  //     let request = response.json() && response.json().request
  //     if(request) {
  //       this.request = response.json().request
  //       localStorage.setItem('request', JSON.stringify(this.request) );
  //     } else {
  //     return false;
  //     }
  //   });
  //   // .catch((err) => Observable.throw(err));
  // }

}
