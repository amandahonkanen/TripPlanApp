import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../booking.service';
import { SessionService } from "../session.service";

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {


  newRequest = {
    startDate: '',
    endDate: '',
    traveler:'',
    expert: '',
    whoIsTravelling: '',
    mainInterests: '',
    mustKnows: '',

  };

  request: any;
  error: string;

  // error: string;

  constructor(
    private router: Router,
  	private route: ActivatedRoute,
    private bookingService: BookingService
  ) {
    // this.newRequest = localStorage.getItem("request")
  }

  ngOnInit() {
  }

  // this.user.get(id)
  //   .subscribe((user) => {
  //     this.currentUser = user;
  //   });

  requestPost() {
    this.request.requestPost(this.newRequest)
      .subscribe((request) => {
        if (request === true) {
            // login successful
            console.log('result ok', request);
            let request_id = JSON.parse(localStorage.getItem("request"))._id
            console.log(request_id)
            this.router.navigate(['users', request_id]);
        } else {
            console.log('result ko', request);
            // login failed
            // this.error = 'Username or password is incorrect';
        }
    });
}
}
