import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { SessionService } from "../session.service";

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.css']
})
export class AgendaFormComponent implements OnInit {
  @Input() quote: any;
  @Input() traveler: any;

  agenda: any = {};
  booking: any ={};
  myInput;
  value= '';
  numberValue;
  currentUser;

newAgenda = {
  request: '',
  user: '',
  journeyTitle: '',
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
}



constructor(
  private session: SessionService,
  private user: UserService,
  private router: Router,
  private route: ActivatedRoute,
  )
  {
  // this.currentUser =  this.session.currentUser || {}
 }

ngOnInit() {
  console.log("ngOninit createAgenda Confirm")
  // console.log("USER", this.currentUser);
  console.log("REQ", this.newAgenda.request);
  console.log("agenda-form", this.quote);
}

  // this.newAgenda.request = this.booking._id


ngOnChanges() {
  console.log("ngOnChanges");
}

makeAgenda(bookingId, userId) {
  this.newAgenda.request = bookingId
  this.newAgenda.user = userId
  console.log("booking_id", this.booking._id)
  console.log("user_id", this.quote)
  console.log("new Agenda after", this.newAgenda);
  this.user.makeAgenda(this.newAgenda)
    .subscribe(result => {
       console.log("result agenda ", result)
       console.log("REQ", this.newAgenda.request);

      //  this.router.navigate(['users', this.currentUser]);
     },
     (error) => { console.log(error)}
   );

}


}
