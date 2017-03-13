import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { SessionService } from '../session.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {


  user: Object;

 constructor(
 private session: SessionService,
 private router:  Router,
 private userService: UserService) {
     this.user = JSON.parse(localStorage.getItem("user"));
 }

 ngOnInit() {
   console.log(this.user)
   console.log(localStorage)


   this.userService.booked()
       .subscribe(result => {
           if (result === true) {
               // login successful
               console.log('result ok', result);

           } else {
               console.log('result ko', result);

               // login failed
               // this.error = 'Username or password is incorrect';
           }
       });

   }

 }
