import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { SessionService } from "../session.service";

@Component({
  selector: 'app-request-form',
  templateUrl: './request-confirm.component.html',
  styleUrls: ['./request-confirm.component.css']
})
export class RequestConfirmComponent implements OnInit {


  request: any = {};


  constructor(
    private router: Router,
    private session: SessionService,
    private route: ActivatedRoute,
    private userService: UserService
    ) {
   }

  ngOnInit() {
    console.log("ngOninit Request Confirm")
    this.route.params.subscribe(params => {
      this.getRequest(params['requestId']);

    });
  }

  getRequest(requestId) {
    this.userService.getRequest(requestId)
      .subscribe((request) => {
        this.request = request;
      });
  }

  }
