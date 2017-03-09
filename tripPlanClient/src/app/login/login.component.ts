import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { UserService } from './../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, SessionService]
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: ''
  };

  error: string;

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.session.login(this.user)
				        .subscribe(result => {
				            if (result === true) {
                      let user_id = JSON.parse(localStorage.getItem("user"))._id
                      console.log(user_id)
			                // login successful
                      this.router.navigate(['profile', user_id]);
			         			} else {
			                // login failed
			                this.error = 'Username or password is incorrect';
				            }
				        });
  }

}
