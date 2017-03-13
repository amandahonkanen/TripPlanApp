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

  agenda: any = {};
  booking: any ={};
  myInput;

  newAgenda = {
    request: '',
    breakfast1: '',
    breakfast2: '',
    breakfast3: '',
    lunch1: '',
    lunch2: '',
    lunch3: '',
    dinner1: '',
    dinner2: '',
    dinner3: '',
    morningActivity1: '',
    morningActivity2: '',
    morningActivity3: '',
    afternoonActivity1: '',
    afternoonActivity2: '',
    afternoonActivity3: '',
    eveningActivity1: '',
    eveningActivity2: '',
    eveningActivity3: '',
    //  request
  }

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

    // this.newAgenda.request = this.booking._id

  }

  ngOnChanges() {
    console.log("ngOnChanges");
  }

  get(id) {
    this.user.get(id)
      .subscribe((user) => {
        this.currentUser = user;
        console.log("user", user)
      });
  }

  makeAgenda(bookingId) {

    console.log("new Agenda", this.newAgenda);
    console.log("newAgenda:",this.newAgenda.request)
    this.newAgenda.request = bookingId
    console.log("booking_id", this.booking._id)
    console.log("new Agenda after", this.newAgenda);
    this.user.makeAgenda(this.newAgenda)
      .subscribe(result => {
         console.log("result agenda ", result)
        //  this.router.navigate(['users', this.currentUser]);
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
