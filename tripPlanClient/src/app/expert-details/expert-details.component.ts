import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-expert-details',
  templateUrl: './expert-details.component.html',
  styleUrls: ['./expert-details.component.css']
})
export class ExpertDetailsComponent implements OnInit {

  user: any = {};
  traveler: any ={};


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
      private userService: UserService

    ) {}



      ngOnInit() {
     console.log(this.route)
   	  this.route.params.subscribe(params => {
      this.getUserDetails(params['id']);
     });

     this.traveler = JSON.parse(localStorage.getItem("user"))
     let user = JSON.parse(localStorage.getItem("user"))
     this.newRequest.traveler = this.traveler._id
     this.newRequest.expert = this.user._id



     console.log("On ngInit",this.traveler.name,this.traveler._id)

     console.log("traveler",this.newRequest.traveler)
     console.log("expert",this.newRequest.expert)


   }

   getUserDetails(id) {

     this.userService.get(id)
       .subscribe((user) => {
         this.user = user;
         console.log("user in getDetails: ", user)
       });

   }



     booking(request) {
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
         //  console.log(event);
        }

        public expanded(event:any):void {
         //  console.log(event);
        }


 }
