import { Component, OnInit, OnChanges } from '@angular/core';
import { SessionService } from '../session.service';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {

  agenda: any = {};
  request: any ={};

  newAgenda = {
     request: '',
     breakfast: '',
     lunch: '',
     dinner: '',
     morningActivity: '',
     afternoonActivity: '',
     eveningActivity: '',
     received: '',
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

    this.newAgenda.request = this.request._id;

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

  makeAgenda() {
    console.log("AGENDA",this.newAgenda.request)
    this.newAgenda.request = this.request._id
    this.user.makeAgenda(this.newAgenda)
      .subscribe(result => {
         console.log("result agenda ", result)
         this.router.navigate(['users', this.currentUser]);
       },
       (error) => { console.log(error)}
     );

  }

  public isCollapsed:boolean = false;

  public collapsed(event:any):void {
    console.log(event);
  }

  public expanded(event:any):void {
    console.log(event);
  }


}
