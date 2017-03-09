import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
import { UserService} from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService, SessionService]
})
export class SignupComponent implements OnInit {

	newUser = {
    username: '',
    password: ''
  };

  user: any;
  error: string;


  constructor(
  	private session: SessionService,
    private router: Router,
    private users: UserService
  ) { }

  ngOnInit() {
  }

  signup() {
  	this.session.signup(this.newUser)
      .subscribe(result => {
          if (result === true) {
            let user_id = JSON.parse(localStorage.getItem("user"))._id
            console.log(user_id)
            // login successful
              // login successful
              console.log('result ok', result);
              this.router.navigate(['users', user_id]);
          } else {
          		console.log('result ko', result);
              // login failed
              // this.error = 'Username or password is incorrect';
          }
      });
  }
}
