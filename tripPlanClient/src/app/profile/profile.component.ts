import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, SessionService]
})
export class ProfileComponent implements OnInit {

  currentUser: Object;

  users;

  constructor(
    private session: SessionService,
    private user: UserService,
    private router: Router,
    private route: ActivatedRoute,
    )
    {
    this.currentUser = this.session.currentUser || {}
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.get(params['id']);
    });

  }

  get(id) {
    this.user.get(id)
      .subscribe((users) => {
        this.user = users;
      });
  }

}
