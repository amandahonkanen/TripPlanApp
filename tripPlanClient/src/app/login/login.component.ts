import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { UserService } from './../user.service';
import { Router } from '@angular/router';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: ''
  };

  error: string;

  constructor(
    private session: SessionService,
    private router: Router,
    private users: UserService,
    private toastr: ToastsManager
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
                      this.router.navigate(['users', user_id]);
                      this.toastr.success("You logged in successfully")
			         			} else {
			                // login failed
			                // this.error = "Username or password is incorrect";
                      this.toastr.error("Username or password is incorrect");
				            }
				        });
  }

}
