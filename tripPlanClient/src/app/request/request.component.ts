import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  request:  any = {};

  constructor(
  	private router: Router,
  	private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getRequest(params['id']);

      console.log(params['id']);
    });
  }

  getRequest(id) {
    this.bookingService.getRequest(id)
      .subscribe((request) => {
        this.request = request;
      });
  }
}
