import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']

})
export class NavbarComponent implements OnInit {
  isAuth: boolean;
  user;

  constructor(
  	private session: SessionService,
  	private router:  Router,
    private route: ActivatedRoute
  ) {
    this.session.isAuth
        .subscribe((isAuth: boolean) => {
        // user will be false if logged out
        // or user object if logged in.
          console.log("in navbar event")

          this.isAuth = isAuth;

        })
        
        this.user = JSON.parse(localStorage.getItem("user"))

  }

  ngOnInit() {
    if (this.session.token != null) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }

  }


  logout() {
  	this.session.logout();
  	this.router.navigate(['/']);
  }
}
