import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from "../session.service";

@Component({
  selector: 'app-expert-details',
  templateUrl: './expert-details.component.html',
  styleUrls: ['./expert-details.component.css']
})
export class ExpertDetailsComponent implements OnInit {

  user: any = {};
  traveler: any ={};
  public token: string;
  currentUser;
  isAuth: boolean = false;


  newRequest = {
    name:'',
    startDate: '',
    endDate: '',
    city: '',
    traveler:'',
    expert: '',
    whoIsTravelling: '',
    mainInterests: '',
    mustKnows: '',

  };



    constructor(
    	private router: Router,
    	private route: ActivatedRoute,
      private userService: UserService,
      private sessionService: SessionService
        ) {
          this.token = localStorage.getItem('token');
          let userFromLocal = localStorage.getItem("user")
          this.currentUser = JSON.parse(userFromLocal);
          console.log("In constructor in service user", userFromLocal);
          // console.log("In constructor in service token", this.token);
          if(this.token != null) {
            // console.log("true");
            this.isAuth = true;
          } else {
            // console.log("false");
            this.isAuth = false;
          }

    }

    ngOnInit() {


     console.log(this.route)
   	  this.route.params.subscribe(params => {
      this.getUserDetails(params['id']);
    })


}


   getUserDetails(id) {

     this.userService.get(id)
       .subscribe((user) => {
         this.user = user;
         console.log("user in getDetails: ", user)
       });

   }



     booking(request) {

       this.traveler = JSON.parse(localStorage.getItem("user"))
       let user = JSON.parse(localStorage.getItem("user"))
       this.newRequest.traveler = this.traveler._id
       this.newRequest.expert = this.user._id


        console.log("user in booking(expert) ", this.user._id)
       this.newRequest.expert = this.user._id
     	 this.userService.booking(this.newRequest)
         .subscribe(result => {
            console.log("result booking ", result)
            this.router.navigate(['booked']);
          },
          (error) => { console.log(error)}
        );

     }


     public isCollapsed:boolean = true;

        public collapsed(event:any):void {

        }

        public expanded(event:any):void {
         //  console.log(event);
        }

 }
