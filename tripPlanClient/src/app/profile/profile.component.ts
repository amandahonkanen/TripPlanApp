import { Component, OnInit, OnChanges } from '@angular/core';
import { SessionService } from '../session.service';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  currentUser;



  constructor(
    private session: SessionService,
    private user: UserService,
    private router: Router,
    private route: ActivatedRoute,
    )
    {
    this.currentUser =  this.session.currentUser || {}
   }

  ngOnInit() {
    console.log("ngOninit profile")
    this.route.params.subscribe(params => {
      this.get(params['id']);
    });
  }

  ngOnChanges() {
    console.log("ngOnChanges");
  }

  get(id) {
    this.user.get(id)
      .subscribe((user) => {
        console.log("user: ", user);
        this.currentUser = user;
      });
  }

}
