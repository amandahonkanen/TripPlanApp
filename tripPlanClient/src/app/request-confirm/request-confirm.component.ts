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
  booking: any ={};
  myInput;
  value= '';
  user;
  show = false;

  currentUser;


  constructor(
    private router: Router,
    private session: SessionService,
    private route: ActivatedRoute,
    private userService: UserService
    ) {
      this.currentUser =  this.session.currentUser || {}

   }

  ngOnInit() {
    console.log("ngOninit Request Confirm")
    this.route.params.subscribe(params => {
      console.log("request", params);
      this.getRequest(params['requestId']);
      //
      // this.route.params.subscribe(params => {
      //   this.get(params['id']);
      // });

    });
  }

  showComponent() {
    this.show ? this.show = false : this.show = true;
  }

  getRequest(requestId) {
    this.userService.getRequest(requestId)
      .subscribe((request) => {
        this.request = request;
        console.log("setting traveler", request.traveler)
        this.session.setTraveller(request.traveler);
        this.session.setRequest(request._id);
      });
  }


  removeRequest(requestId) {
    console.log("remove Request", this.request._id)
    	this.userService.removeRequest(this.request._id)
      .subscribe(() => {
        this.router.navigate(['']);
      });
	}
  // get(id) {
  //   this.user.get(id)
  //     .subscribe((user) => {
  //       this.currentUser = user;
  //       console.log("user", user)
  //     });
  // }




  }
