import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
import { UserService} from '../user.service';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
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
    private users: UserService,
    private toastr: ToastsManager

  ) { }

  ngOnInit() {
  }

  signup() {
  	this.session.signup(this.newUser)
      .subscribe(result => {
          if (result === true) {
            let user_id = JSON.parse(localStorage.getItem("user"))._id
              // login successful
              this.router.navigate(['users', user_id]);
              this.toastr.success("You signed up successfully")

          } else {
              // login failed
              this.toastr.error("Username already taken")

          }
      });
  }
}
