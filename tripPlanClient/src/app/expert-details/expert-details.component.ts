import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expert-details',
  templateUrl: './expert-details.component.html',
  styleUrls: ['./expert-details.component.css']
})
export class ExpertDetailsComponent implements OnInit {

  users: any = {};

    constructor(
    	private router: Router,
    	private route: ActivatedRoute,
      private user: UserService
    ) {}

    ngOnInit() {
      console.log(this.route)
    	this.route.params.subscribe(params => {
        this.getExpertDetails(params['id']);
      });
    }

    getExpertDetails(id) {
      this.user.get(id)
        .subscribe((users) => {
          this.user = users;
        });
    }

  }
